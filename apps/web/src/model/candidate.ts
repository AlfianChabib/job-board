import { Job } from './job';
import { IUserProfile } from './user';

export type ICandidate = {
  Job: Job;
  UserProfile: IUserProfile;
  id: number;
  jobId: number;
  resume: string;
  status: string;
  userProfileId: number;
};
