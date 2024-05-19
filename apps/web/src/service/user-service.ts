import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { IAppliedJob, IInterviewJob, IUserProfile, UserExperiencePayload } from '@/model/user';
import { UserEducationSchema, UserProfilePayloadSchema } from '@/schema/user-schema';
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

  addUserEducation: async (payload: UserEducationSchema): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.post('/user/profile/education', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  profileCompleteness: async (): Promise<{ strength: number; empty: string[] }> => {
    try {
      const res = await authApi.get('/user/profile/completeness');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getAppliedJobs: async (): Promise<IAppliedJob[]> => {
    try {
      const res = await authApi.get('/user/activity/applied');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getInterviewsJobs: async (): Promise<IInterviewJob[]> => {
    try {
      const res = await authApi.get('/user/activity/interview');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
