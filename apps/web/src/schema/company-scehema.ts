import { z } from 'zod';

export const companyProfilePayloadSchema = z.object({
  companyName: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type CompanyProfilePayloadSchema = z.infer<typeof companyProfilePayloadSchema>;
