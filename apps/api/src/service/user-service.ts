import { ResponseError } from '../helper/response/error-response';
import { UpdateProfilePayload } from '../model/user-model';
import { prisma } from '../prisma';

export class UserService {
  static async getUserProfile(userId: number) {
    const user = await prisma.userProfile.findUnique({
      where: { userId: userId },
      select: {
        id: true,
        username: true,
        image: true,
        summary: true,
        email: true,
        phone: true,
        address: true,
        userResume: { select: { resumeUrl: true, id: true } },
        userEducation: {
          select: {
            courseOrQualification: true,
            institution: true,
            isComplete: true,
            description: true,
            finishedYear: true,
          },
        },
        userExperience: {
          select: {
            jobTitle: true,
            companyName: true,
            description: true,
            started: true,
            ended: true,
            stillInRole: true,
          },
        },
        userSkill: { select: { skillTitle: true, id: true } },
        userClassification: { select: { classification: true, subClassification: true, id: true } },
      },
    });

    return user;
  }

  static async updateProfile(userId: number, data: UpdateProfilePayload) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: {
        username: data.username,
        summary: data.summary,
        phone: data.phone,
        address: data.address,
      },
    });
  }

  static async addUserSkill(userId: number, skill: string) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: { userSkill: { create: { skillTitle: skill } } },
    });
  }

  static async deleteUserSkill(userId: number, skillId: number) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: { userSkill: { delete: { id: skillId } } },
    });
  }
}
