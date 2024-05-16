import { JobListFeatures } from '../model/job-model';

export const filterJobService = (payload: JobListFeatures) => ({
  registrationDeadline: { gte: new Date() },
  deleted: false,
  ...(payload.keywords && {
    title: { contains: payload.keywords },
  }),
  ...(payload.location && {
    location: { contains: payload.location },
  }),
  ...(payload.classificationId && {
    classificationInfo: { classificationId: { equals: payload.classificationId } },
  }),
  ...(payload.jobType && {
    jobType: { equals: payload.jobType },
  }),
});
