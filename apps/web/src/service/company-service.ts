import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { ICandidate } from '@/model/candidate';
import { CompanyProfileData, CompanyStatistic, IInterviewCompany } from '@/model/company';
import { Job } from '@/model/job';
import { IUserProfile } from '@/model/user';
import { CompanyProfilePayloadSchema } from '@/schema/company-scehema';
import { ResponseSuccess } from '@/types';

export const companyService = {
  getConmpanyProfile: async (): Promise<CompanyProfileData> => {
    try {
      const res = await authApi.get('/company/profile');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  updateCompanyProfile: async (data: CompanyProfilePayloadSchema): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch('/company/profile', data);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  updateCompanyLogo: async (formData: FormData): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch('/company/profile/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCompanyJobs: async (): Promise<Job[]> => {
    try {
      const res = await authApi.get('/company/jobs');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCompanyStatistics: async (): Promise<CompanyStatistic> => {
    try {
      const res = await authApi.get('/company/statistics');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCompanyCompleteness: async (): Promise<{ strength: number; empty: string[] }> => {
    try {
      const res = await authApi.get('/company/profile/completeness');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCandidates: async (): Promise<ICandidate[]> => {
    try {
      const res = await authApi.get('/company/candidates');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCompanyInterviews: async (): Promise<IInterviewCompany[]> => {
    try {
      const res = await authApi.get('/company/interviews');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getCandidateProfile: async (candidateId: number): Promise<IUserProfile> => {
    try {
      const res = await authApi.get(`/company/candidates/${candidateId}`);
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
