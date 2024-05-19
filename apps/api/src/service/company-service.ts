import { companyCompleteness } from '../helper/completenes';
import { ResponseError } from '../helper/response/error-response';
import { CompanyProfilePayload, CompanyStatistic } from '../model/company-model';
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

  static async getStatistics(userId: number): Promise<CompanyStatistic> {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });

    if (!existCompany) throw new ResponseError(404, 'Company not found');

    const totalJobs = await prisma.job.count({ where: { companyProfileId: userId } });
    const totalApplications = await prisma.application.count({
      where: { Job: { companyProfileId: existCompany?.id } },
    });
    const totalInterviews = await prisma.interview.count({
      where: { Application: { Job: { companyProfileId: existCompany?.id } } },
    });

    return { totalJobs, totalApplications, totalInterviews, companyId: existCompany?.id };
  }

  static async getCompanyProfile(userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });

    if (!existCompany) throw new Error('Company not found');

    return existCompany;
  }

  static async updateCompanyProfile(userId: number, data: CompanyProfilePayload) {
    await prisma.companyProfile.update({
      where: { userId },
      data: { address: data.address, companyName: data.companyName, description: data.description, phone: data.phone },
    });
  }

  static async updateCompanyLogo(userId: number, logo: string) {
    await prisma.companyProfile.update({ where: { userId }, data: { logo } });
  }

  static async getCandidates(userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!existCompany) throw new Error('Company not found');

    return prisma.application.findMany({
      where: { Job: { companyProfileId: existCompany.id } },
      include: { Job: true, UserProfile: { include: { userSkill: true, userEducation: true, userExperience: true } } },
    });
  }

  static async companyProfileCompleteness(userId: number) {
    const data = await prisma.companyProfile.findUnique({
      where: { userId },
    });
    if (!data) throw new ResponseError(404, 'Company not found');

    return companyCompleteness(data);
  }

  static async getInterviews(userId: number) {
    const company = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!company) throw new ResponseError(404, 'Company not found');
    const data = await prisma.interview.findMany({
      where: { Application: { Job: { companyProfileId: company.id } } },
      include: { Application: { include: { Job: true, UserProfile: true } } },
    });

    return data;
  }

  static async getCandidateProfile(userId: number, candidateProfileId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!existCompany) throw new ResponseError(404, 'Company not found');

    const data = await prisma.userProfile.findUnique({
      where: { id: candidateProfileId },
      include: { userSkill: true, userEducation: true, userExperience: true },
    });

    return data;
  }
}
