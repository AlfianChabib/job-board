import { z, ZodType } from 'zod';

export class JobValidation {
  static readonly postJobSchema: ZodType = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    location: z.string().min(3),
    requirements: z.string().min(3),
    type: z.string().min(3),
    registrationDeadline: z.string().transform((value) => new Date(value)),
    classificationId: z.number().int().positive(),
    subClassificationId: z.number().int().positive(),
  });
}
