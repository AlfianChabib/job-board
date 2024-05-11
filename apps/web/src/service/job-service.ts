import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { Job } from '@/model/job';
import { PostJobSchema } from '@/schema/job-schema';

export const jobService = {
  getJobs: async (): Promise<Job[]> => {
    try {
      const res = await authApi.get('/jobs');
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
};
