import { z, ZodType } from 'zod';

export class UserValidation {
  static validateUpdateProfile: ZodType = z.object({
    username: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    summary: z.string().optional(),
  });

  static validateAddUserExperience: ZodType = z.object({
    jobTitle: z.string({ required_error: "Job title can't be empty" }),
    companyName: z.string({ required_error: "Company name can't be empty" }),
    description: z.string().optional().nullable(),
    started: z.string({ required_error: "Start date can't be empty" }),
    ended: z.string().optional().nullable(),
    stillInRole: z.boolean().default(false),
  });
}
