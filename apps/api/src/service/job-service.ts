import { JobListFeatures, PostJobPayload, UpdateJobPayload } from '../model/job-model';
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

  static async getCompanyJobs(userId: number) {
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

  static async getJobs() {
    return prisma.job.findMany({
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

  static async jobListFeatures(payload: JobListFeatures) {
    const data = await prisma.job.findMany({
      where: {
        registrationDeadline: { gte: new Date() },
        deleted: false,
        ...(payload.keywords && {
          title: { contains: payload.keywords },
        }),
        ...(payload.location && {
          location: { contains: payload.location },
        }),
        ...(payload.classificationId && {
          classificationInfo: { classificationId: { equals: payload.classificationId } },
        }),
        ...(payload.jobType && {
          jobType: { equals: payload.jobType },
        }),
      },
      skip: payload.offset,
      take: payload.limit,
      orderBy: { createdAt: payload.sort === 'asc' ? 'asc' : 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        requirements: true,
        jobType: true,
        registrationDeadline: true,
        createdAt: true,
        classificationInfo: { select: { classification: true, subClassification: true } },
        CompanyProfile: { select: { companyName: true, logo: true, id: true } },
      },
    });

    const total = await prisma.job.count({
      where: {
        registrationDeadline: { gte: new Date() },
        deleted: false,
        ...(payload.keywords && {
          title: { contains: payload.keywords },
        }),
        ...(payload.location && {
          location: { contains: payload.location },
        }),
        ...(payload.classificationId && {
          classificationInfo: { classificationId: { equals: payload.classificationId } },
        }),
        ...(payload.jobType && {
          jobType: { equals: payload.jobType },
        }),
      },
    });

    return { data, total, payload };
  }
}
