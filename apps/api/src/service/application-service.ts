import { prisma } from '../prisma';

export class ApplicationService {
  static async apply(userId: number, jobId: number, filePath: string) {
    return await prisma.application.create({
      data: { jobId, userProfileId: userId, resume: filePath },
    });
  }

  static async getApplications(companyId: number) {
    const applications = await prisma.application.findMany({
      where: { Job: { companyProfileId: companyId } },
    });
    return applications;
  }
}
