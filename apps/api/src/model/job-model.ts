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

export type JobListFeatures = {
  page: number;
  limit: number;
  keywords: string | '';
  location: string | '';
  sort: 'asc' | 'desc';
  offset: number;
  classificationId: number | undefined;
  jobType: JobType | undefined;
};

export type UpdateJobPayload = PostJobPayload & { id: number };
