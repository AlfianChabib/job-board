import { api, authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { queryBuilder } from '@/lib/query-builder';
import { Application } from '@/model/company';
import { Job } from '@/model/job';
import { PostJobSchema } from '@/schema/job-schema';
import { QueryParams, ResponseSuccess } from '@/types';

export const jobService = {
  getJobs: async (): Promise<Job[]> => {
    try {
      const res = await authApi.get('/jobs');
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  deleteJob: async (jobId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.delete(`/jobs/${jobId}`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getJobId: async (jobId: string | undefined): Promise<Job> => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  postJob: async (payload: PostJobSchema) => {
    try {
      const res = await authApi.post('/jobs', {
        ...payload,
        registrationDeadline: new Date(payload.registrationDeadline),
      });

      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  jobsListFeature: async (payload: QueryParams): Promise<{ data: Job[]; total: number }> => {
    try {
      const query = queryBuilder(payload);
      const res = await api.get('/jobs/feature?' + query);
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  getAppliedJob: async (jobId: number): Promise<Application> => {
    try {
      const res = await authApi.get('/jobs/applied/' + jobId);
      return res.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
