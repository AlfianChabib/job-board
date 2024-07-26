import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: [process.env.BASE_FRONTEND_URL],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
