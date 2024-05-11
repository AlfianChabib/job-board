import { z } from 'zod';

export const postJobSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters.' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters.' }),
  requirements: z.string().min(3, { message: 'Requirements must be at least 3 characters.' }),
  type: z.string().min(3, { message: 'Select a job type' }),
  registrationDeadline: z.date({ required_error: 'Select a registration deadline' }),
  classificationId: z.string({ required_error: 'Select a job classification' }).transform((value) => parseInt(value)),
  subClassificationId: z
    .string({ required_error: 'Select a job sub classification' })
    .transform((value) => parseInt(value)),
});

export type PostJobSchema = z.infer<typeof postJobSchema>;
