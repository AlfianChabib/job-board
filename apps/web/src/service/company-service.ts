import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { CompanyProfileData, CompanyStatistic } from '@/model/company';
import { Job } from '@/model/job';
import { CompanyProfilePayloadSchema } from '@/schema/company-scehema';

export const companyService = {
  getConmpanyProfile: async (): Promise<CompanyProfileData> => {
    try {
      const res = await authApi.get('/company/profile');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  updateCompanyProfile: async (data: CompanyProfilePayloadSchema): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await authApi.patch('/company/profile', data);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  updateCompanyLogo: async (formData: FormData): Promise<{ success: boolean; message: string }> => {
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
};
