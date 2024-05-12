import { z, ZodType } from 'zod';

export class CompanyValidation {
  static readonly updateCompanySchema: ZodType = z.object({
    companyName: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
  });

  static readonly updateCompanyLogoSchema: ZodType = z.object({
    logo: z.string().optional(),
  });
}
