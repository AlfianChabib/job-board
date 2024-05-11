import { JobType } from '@prisma/client';

export type PostJobPayload = {
  title: string;
  description: string;
  location: string;
  requirements: string;
  type: JobType;
  registrationDeadline: Date;
  classificationId: number;
  subClassificationId: number;
};

export type UpdateJobPayload = PostJobPayload & { id: number };
