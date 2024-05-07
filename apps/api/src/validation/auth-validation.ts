import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly registerUserSchema: ZodType = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  static readonly registerCompanySchema: ZodType = z.object({
    companyName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  static readonly registerVerifySchema: ZodType = z.object({
    token: z.string(),
  });

  static readonly loginSchema: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
}
