import { z } from 'zod';

export const userProfilePayloadSchema = z.object({
  username: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  summary: z.string().optional(),
});

export type UserProfilePayloadSchema = z.infer<typeof userProfilePayloadSchema>;
