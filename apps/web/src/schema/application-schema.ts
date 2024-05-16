import { ChangeEvent } from 'react';
import { z } from 'zod';

const MAX_FILE_SIZE = 2097152;
const ACCEPTED_PDF_TYPES = ['application/pdf'];

export const applicationSchema = z.object({
  resume: z
    .any()
    .refine((e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0].type === 'application/pdf', 'File is required'),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;

// .refine((e: HTMLInputElement) => e.files?.[0].type === 'application/pdf', 'File is required'),
// .refine((e: HTMLInputElement) => ACCEPTED_PDF_TYPES.includes(e.files?.[0].type), 'Invalid file type')
// .refine((e: HTMLInputElement) => e.files?.[0].size <= MAX_FILE_SIZE, 'File size is too large. Max file size is 2MB'),
