import { z } from 'zod';

export const userProfilePayloadSchema = z.object({
  username: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  summary: z.string().optional(),
});

export const userExperienceSchema = z.object({
  jobTitle: z.string({ required_error: "Job title can't be empty" }),
  companyName: z.string({ required_error: "Company name can't be empty" }),
  description: z.string().optional(),
  startedDate: z.object({
    month: z.string(),
    year: z.string(),
  }),
  endedDate: z
    .object({
      month: z.string().optional(),
      year: z.string().optional(),
    })
    .optional()
    .nullable(),
  stillInRole: z.boolean().default(false),
});

export const userEducationSchema = z.object({
  courseOrQualification: z.string({ required_error: "School name can't be empty" }),
  institution: z.string({ required_error: "Institution name can't be empty" }),
  description: z.string().optional(),
  finishedYear: z.string({ required_error: "Finished year can't be empty" }).optional(),
  isComplete: z.boolean().default(true),
});

export type UserProfilePayloadSchema = z.infer<typeof userProfilePayloadSchema>;
export type UserExperienceSchema = z.infer<typeof userExperienceSchema>;
export type UserEducationSchema = z.infer<typeof userEducationSchema>;
