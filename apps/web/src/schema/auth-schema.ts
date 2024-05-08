import { z } from 'zod';

export const registerUserSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: 'custom', message: 'Password does not match.', path: ['confirmPassword'] });
    }
  });

export const registerCompanySchema = z
  .object({
    companyName: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: 'custom', message: 'Password does not match.', path: ['confirmPassword'] });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type RegisterCompanySchema = z.infer<typeof registerCompanySchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
