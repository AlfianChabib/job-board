import { EmailType, sendEmail } from '../helper/email/email-helper';
import { ResponseError } from '../helper/response/error-response';
import { InterviewPayload, ReschedulePayload } from '../model/application-model';
import { prisma } from '../prisma';

export class ApplicationService {
  static async apply(userId: number, jobId: number, filePath: string) {
    const userProfile = await prisma.userProfile.findUnique({ where: { userId } });
    if (!userProfile) throw new ResponseError(404, 'User not found');

    return await prisma.application.create({
      data: { jobId, userProfileId: userProfile.id, resume: filePath },
    });
  }

  static async getApplications(companyId: number) {
    const applications = await prisma.application.findMany({
      where: { Job: { companyProfileId: companyId } },
    });
    return applications;
  }

  static async getApplication(applicationId: number) {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { Job: true, UserProfile: true },
    });
    return application;
  }

  static async acceptOffer(userId: number, applicationId: number) {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { UserProfile: true },
    });

    if (!application) throw new ResponseError(404, 'Application not found');

    await prisma.application.update({ where: { id: application.id }, data: { status: 'Accepted' } });

    await sendEmail(EmailType.ACCEPTED, { email: application.UserProfile?.email as string });
  }

  static async scheduleInterview(userId: number, payload: InterviewPayload) {
    const company = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!company) throw new ResponseError(404, 'Company not found');
    const application = await prisma.application.findUnique({
      where: { id: payload.applicationId },
      include: { UserProfile: true, Job: true },
    });
    if (!application) throw new ResponseError(404, 'Application not found');

    const sendSchedule = await sendEmail(EmailType.INTERVIEW_SCHEDULE, {
      email: application.UserProfile?.email as string,
      companyName: company.companyName as string,
      scheduleDate: new Date(payload.interviewSchedule).toDateString(),
      job: application.Job?.title as string,
    });

    return await prisma.application.update({
      where: { id: payload.applicationId },
      data: {
        status: 'Interview',
        interview: {
          create: {
            interviewSchedule: new Date(payload.interviewSchedule),
            interviewType: payload.interviewType,
            interviewLocation: payload.interviewLocation,
            interviewUrl: payload.interviewUrl,
            interviewStatus: 'Sending',
          },
        },
      },
    });
  }

  static async acceptScheduleJobSeeker(userId: number, interviewId: number) {
    const user = await prisma.userProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({ where: { id: interviewId }, data: { interviewStatus: 'Accept' } });
  }

  static async acceptRescheduleCompany(userId: number, interviewId: number) {
    const user = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({
      where: { id: interviewId },
      data: { interviewStatus: 'Accept', rescheduleInterview: null },
    });
  }

  static async declineRescheduleCompany(userId: number, interviewId: number) {
    const user = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({
      where: { id: interviewId },
      data: { interviewStatus: 'Accept', rescheduleInterview: null },
    });
  }

  static async reschedule(userId: number, interviewId: number, payload: ReschedulePayload) {
    const user = await prisma.userProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({
      where: { id: interviewId },
      data: { interviewStatus: 'Rescheduling', rescheduleInterview: new Date(payload.rescheduleDate) },
    });
  }

  static async finishInterviewCompany(userId: number, interviewId: number) {
    const user = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({ where: { id: interviewId }, data: { interviewStatus: 'Finished' } });
  }

  static async cancelInterviewCompany(userId: number, interviewId: number) {
    const user = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });

    if (!interview) throw new ResponseError(404, 'Interview not found');
    await prisma.interview.update({
      where: { id: interviewId },
      data: { interviewStatus: 'Canceled', Application: { update: { status: 'Unsuccessful' } } },
    });
  }

  static async hireJobSeeker(userId: number, interviewId: number) {
    const user = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!user) throw new ResponseError(404, 'User not found');

    await prisma.application.update({ where: { id: interviewId }, data: { status: 'Successful' } });
  }
}
