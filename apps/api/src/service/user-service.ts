import { userCompleteness } from '../helper/completenes';
import { ResponseError } from '../helper/response/error-response';
import { AddUserEducationPayload, AddUserExperiencePayload, UpdateProfilePayload } from '../model/user-model';
import { prisma } from '../prisma';

export class UserService {
  static async getUserProfile(userId: number) {
    const user = await prisma.userProfile.findUnique({
      where: { userId: userId },
      include: {
        userResume: true,
        userEducation: true,
        userExperience: true,
        userSkill: true,
        userClassification: { include: { classification: true, subClassification: true } },
      },
    });

    return user;
  }

  static async updateProfile(userId: number, data: UpdateProfilePayload) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: { username: data.username, summary: data.summary, phone: data.phone, address: data.address },
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

  static async addUserExperience(userId: number, payload: AddUserExperiencePayload) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: {
        userExperience: {
          create: {
            companyName: payload.companyName,
            jobTitle: payload.jobTitle,
            started: payload.started,
            description: payload.description,
            ended: payload.ended,
            stillInRole: payload.stillInRole,
          },
        },
      },
    });
  }

  static async addUserEducation(userId: number, payload: AddUserEducationPayload) {
    await prisma.userProfile.update({
      where: { userId: userId },
      data: {
        userEducation: {
          create: {
            courseOrQualification: payload.courseOrQualification,
            institution: payload.institution,
            isComplete: payload.isComplete,
            description: payload.description,
            finishedYear: payload.finishedYear,
          },
        },
      },
    });
  }

  static async profileCompleteness(userId: number) {
    const data = await prisma.userProfile.findUnique({
      where: { userId },
      include: { userEducation: true, userExperience: true, userSkill: true },
    });
    if (!data) throw new ResponseError(404, 'User not found');

    return userCompleteness(data);
  }
}
