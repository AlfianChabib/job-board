import { PostJobPayload, UpdateJobPayload } from '../model/job-model';
import { prisma } from '../prisma';

export class JobService {
  static async postJob(data: PostJobPayload, userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!existCompany) throw new Error('Company not found');

    await prisma.job.create({
      include: { classificationInfo: true },
      data: {
        companyProfileId: existCompany.id,
        title: data.title,
        description: data.description,
        location: data.location,
        requirements: data.requirements,
        jobType: data.type,
        registrationDeadline: data.registrationDeadline,
        classificationInfo: {
          create: {
            classificationId: data.classificationId,
            subClassificationId: data.subClassificationId,
          },
        },
      },
    });
  }

  static async getJob(jobId: number) {
    return prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        requirements: true,
        jobType: true,
        registrationDeadline: true,
        classificationInfo: { select: { classification: true, subClassification: true } },
        CompanyProfile: { select: { companyName: true, logo: true, id: true } },
      },
    });
  }

  static async getJobs(userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });

    if (!existCompany) throw new Error('Company not found');

    return prisma.job.findMany({
      where: { companyProfileId: existCompany.id },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        requirements: true,
        jobType: true,
        registrationDeadline: true,
        classificationInfo: { select: { classification: true, subClassification: true } },
      },
    });
  }

  static async updateJob(jobId: number, data: UpdateJobPayload) {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        requirements: data.requirements,
        jobType: data.type,
        registrationDeadline: data.registrationDeadline,
        classificationInfo: {
          update: {
            classificationId: data.classificationId,
            subClassificationId: data.subClassificationId,
          },
        },
      },
    });
  }

  static async deleteJob(jobId: number) {
    await prisma.job.delete({ where: { id: jobId } });
  }
}
