import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { ResponseSuccess } from '@/types';

export const applicationService = {
  uploadResume: async (data: FormData): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.post('/application/apply', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
