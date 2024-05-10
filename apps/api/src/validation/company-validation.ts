import { z, ZodType } from 'zod';

export class CompanyValidation {
  static readonly postJobSchema: ZodType = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    location: z.string().min(3),
    requirements: z.string().min(3),
    registrationDeadline: z.string().date(),
    classification: z.string().min(3),
  });
}
