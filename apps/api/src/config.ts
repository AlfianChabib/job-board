import { config } from 'dotenv';
import { resolve } from 'path';
import * as z from 'zod';

export const NODE_ENV = process.env.NODE_ENV || 'development';
const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(8000),
  BASE_FRONTEND_URL: z.string().url(),
  BASE_API_URL: z.string().url(),
  JWT_ACCESS_LIFETIME: z.string().trim(),
  JWT_ACCESS_SECRET: z.string().trim(),
  JWT_REFRESH_LIFETIME: z.string().trim(),
  JWT_REFRESH_SECRET: z.string().trim(),
  JWT_VERIFIVATION_SECRET: z.string().trim(),
  JWT_VERIFIVATION_LIFETIME: z.string().trim(),
  NODEMAILER_PASS: z.string().trim(),
  NODEMAILER_USER: z.string().trim(),
  NODEMAILER_HOST: z.string().trim(),
  NODEMAILER_PORT: z.string().trim(),
});

const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;
