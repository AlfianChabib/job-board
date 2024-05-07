import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: [process.env.BASE_FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
