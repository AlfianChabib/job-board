import { authApi } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { ReschedulePayload, ScheduleInterviewPayload } from '@/schema/application-schema';
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

  acceptOffer: async (applicationId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/accept/${applicationId}`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  scheduleInterview: async (payload: ScheduleInterviewPayload): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/`, payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  agreeInterviewUser: async (interviewId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${interviewId}/accept/job-seeker`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  rescheduleInterview: async (paylaod: ReschedulePayload): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${paylaod.interviewId}/reschedule`, {
        rescheduleDate: paylaod.rescheduleDate,
      });
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  acceptRescheduleCompany: async (interviewId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${interviewId}/accept/company`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  declineRescheduleCompany: async (interviewId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${interviewId}/decline/company`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  finishInterviewCompany: async (interviewId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${interviewId}/finish`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  cancelInterview: async (interviewId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/schedule/${interviewId}/cancel`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  hireCandidate: async (applicationId: number): Promise<ResponseSuccess> => {
    try {
      const res = await authApi.patch(`/application/${applicationId}/hire`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
