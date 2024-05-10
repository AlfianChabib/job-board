import { api, authApi } from '@/lib/axios';
import { initialSession } from '@/lib/constants';
import { ErrorHandler } from '@/lib/error-handler';
import { LoginSchema, RegisterCompanySchema, RegisterUserSchema } from '@/schema/auth-schema';
import { SessionData } from '@/types';

export const authService = {
  signIn: async (payload: LoginSchema, type: string) => {
    try {
      const response = await api.post(`/auth/login/${type}`, payload);
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  registerCompany: async (payload: RegisterCompanySchema) => {
    try {
      const response = await api.post('/auth/register/company', payload);
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  registerUser: async (payload: RegisterUserSchema) => {
    try {
      const response = await api.post('/auth/register/user', payload);
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  verifyAccount: async (token: string) => {
    try {
      const response = await authApi.post('/auth/register/verify', { token });
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  session: async (): Promise<SessionData> => {
    try {
      const response = await authApi.get('/auth/session');
      const data = response.data.data;
      return {
        ...data,
        isAuthenticated: true,
      };
    } catch (error) {
      return initialSession;
    }
  },

  logOut: async () => {
    try {
      const response = await authApi.post('/auth/logout');
      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
