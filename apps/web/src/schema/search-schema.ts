import { z } from 'zod';

export const searchSchema = z.object({
  keywords: z.string().optional(),
  location: z.string().optional(),
  classification: z.string().optional(),
  jobType: z.string().optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
