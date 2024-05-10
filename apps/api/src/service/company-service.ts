import { PostJobPayload } from '../model/company-model';
import { prisma } from '../prisma';

export class CompanyService {
  static async postJob(data: PostJobPayload, userId: number) {
    const existCompany = await prisma.companyProfile.findUnique({ where: { userId } });
    if (!existCompany) throw new Error('Company not found');

    await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        requirements: data.requirements,
        registrationDeadline: data.registrationDeadline,
        companyProfileId: existCompany.id,
      },
    });
  }
}
