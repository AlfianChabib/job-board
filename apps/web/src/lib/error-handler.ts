import { AxiosError } from 'axios';

export const axiosErrorHandler = (error: AxiosError) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};

export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    return axiosErrorHandler(error);
  } else if (error instanceof Error) {
    return error;
  }
};

export class ErrorHandler {
  constructor(error: unknown) {
    const { message } = errorHandler(error);
    throw new Error(message);
  }
}
