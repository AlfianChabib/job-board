import { prisma } from '../prisma';

export class CompanyService {
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

  static async getStatistics(userId: number) {
    const totalJobs = await prisma.job.count({ where: { companyProfileId: userId } });
    const totalApplications = await prisma.companyProfile.count({
      where: { userId },
    });
  }
}
