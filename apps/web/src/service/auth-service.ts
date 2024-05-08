import { api, authApi, refreshToken } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';
import { LoginSchema, RegisterCompanySchema, RegisterUserSchema } from '@/schema/auth-schema';

export const authService = {
  signIn: async (payload: LoginSchema, type: string) => {
    try {
      const response = await api.post(`/auth/login/${type}`, payload).then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  registerCompany: async (payload: RegisterCompanySchema) => {
    try {
      const response = await api.post('/auth/register/company', payload).then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  registerUser: async (payload: RegisterUserSchema) => {
    try {
      const response = await api.post('/auth/register/user', payload).then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  verifyAccount: async (token: string) => {
    try {
      const response = await authApi.post('/auth/register/verify', { token }).then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh').then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  session: async () => {
    try {
      const response = await authApi.get('/auth/session').then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  logOut: async () => {
    try {
      const response = await authApi.post('/auth/logout').then((res) => res.data);
      return response;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
