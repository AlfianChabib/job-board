import { api } from '@/lib/axios';
import { ErrorHandler } from '@/lib/error-handler';

export type Classification = {
  id: number;
  title: string;
};

export type SubClassification = {
  id: number;
  title: string;
  classificationId: number;
};

export const dataService = {
  classification: async (): Promise<Classification[]> => {
    try {
      const response = await api.get('/data/classification');

      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },

  subClassification: async (): Promise<SubClassification[]> => {
    try {
      const response = await api.get('/data/sub-classification');

      return response.data.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  },
};
