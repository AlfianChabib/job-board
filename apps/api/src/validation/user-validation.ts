import { z, ZodType } from 'zod';

export class UserValidation {
  static validateUpdateProfile: ZodType = z.object({
    username: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    summary: z.string().optional(),
  });
}
