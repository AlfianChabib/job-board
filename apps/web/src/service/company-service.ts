import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { Job } from '@/model/job';

export const companyService = {
  getCompanyJobs: async (): Promise<Job[]> => {
    try {
      const res = await authApi.get('/company/jobs');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
