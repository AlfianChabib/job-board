import { JobListFeatures, PostJobPayload, UpdateJobPayload } from '../model/job-model';
import { prisma } from '../prisma';
import { filterJobService } from '../utils/filter';

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
          create: { classificationId: data.classificationId, subClassificationId: data.subClassificationId },
        },
      },
    });
  }

  static async getJob(jobId: number) {
    return prisma.job.findUnique({
      where: { id: jobId },
      include: {
        classificationInfo: { include: { subClassification: true, classification: true } },
        CompanyProfile: { include: { _count: { select: { job: true } } } },
      },
    });
  }

  static async appliedJob(jobId: number, userId: number) {
    const applied = await prisma.application.findFirst({
      where: {
        UserProfile: { userId },
        jobId,
      },
    });

    return applied;
  }

  static async getCompanyJobs(userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });

    if (!existCompany) throw new Error('Company not found');

    return prisma.job.findMany({
      where: { companyProfileId: existCompany.id, deleted: false },
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

  static async getJobs() {
    return prisma.job.findMany({
      where: { deleted: false },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        requirements: true,
        jobType: true,
        registrationDeadline: true,
        classificationInfo: {
          select: { classification: true, subClassification: { select: { title: true, id: true } } },
        },
        CompanyProfile: { select: { companyName: true, logo: true, id: true } },
        companyProfileId: true,
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
          update: { classificationId: data.classificationId, subClassificationId: data.subClassificationId },
        },
      },
    });
  }

  static async deleteJob(jobId: number) {
    await prisma.job.update({ where: { id: jobId }, data: { deleted: true } });
  }

  static async jobListFeatures(payload: JobListFeatures) {
    const data = await prisma.job.findMany({
      where: filterJobService(payload),
      skip: payload.offset,
      take: payload.limit,
      orderBy: { createdAt: payload.sort === 'asc' ? 'asc' : 'desc' },
      include: {
        classificationInfo: { include: { subClassification: true, classification: true } },
        CompanyProfile: true,
      },
    });

    const total = await prisma.job.count({ where: filterJobService(payload) });

    return { data, total, payload };
  }
}
