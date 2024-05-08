import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const refreshToken = async (): Promise<string | null> => {
  return api.post('/auth/refresh').then((res) => {
    return res.data.accessToken;
  });
};

authApi.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest.sent) {
      originalRequest.sent = true;
      try {
        const accessToken = await refreshToken();
        if (accessToken) {
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          localStorage.setItem('accessToken', accessToken);
          return authApi(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
