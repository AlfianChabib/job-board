import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { IUserProfile, UserExperiencePayload } from '@/model/user';
import { UserProfilePayloadSchema } from '@/schema/user-schema';
import { ResponseSuccess } from '@/types';

export const userService = {
  userProfile: async (): Promise<IUserProfile> => {
    try {
      const res = await authApi.get('/user/profile');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  updateUserProfile: async (payload: UserProfilePayloadSchema): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch('/user/profile', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  addUserSkill: async (skill: string): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.post('/user/profile/skills', { skill });
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  deleteUserSkill: async (skillId: number) => {
    try {
      const res = await authApi.delete(`/user/profile/skills/${skillId}`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  addUserExperience: async (payload: UserExperiencePayload): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.post('/user/profile/experience', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
