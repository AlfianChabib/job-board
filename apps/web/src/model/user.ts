import { Job } from './job';

export type IUserProfile = {
  address: string;
  email: string;
  id: number;
  image: string;
  phone: string;
  summary: string;
  userClassification: any[];
  userEducation: IUserEducation[];
  userExperience: IUserExperience[];
  userResume: string;
  userSkill: IUserSkill[];
  username: string;
};

export interface IUserSkill {
  id: number;
  skillTitle: string;
  userId: number;
}

export interface IUserExperience {
  id: number;
  userProfileId: number;
  jobTitle: string;
  companyName: string;
  description: string;
  started: string | Date;
  ended: string | Date;
  stillInRole: boolean;
}

export interface UserExperiencePayload {
  jobTitle: string;
  companyName: string;
  description: string | undefined;
  started: Date;
  ended: Date | undefined;
  stillInRole: boolean;
}

export interface IUserEducation {
  id: number;
  profileId: number;
  courseOrQualification: string;
  description: string;
  finishedYear: string;
  institution: string;
  isComplete: boolean;
}

export interface IAppliedJob {
  Job: Job;
  id: number;
  interview: IInterview | null;
  jobId: number;
  resume: string;
  status: string;
  userProfileId: number;
}

export interface IInterview {
  applicationId: number;
  id: number;
  interviewLocation: string;
  interviewSchedule: Date;
  interviewStatus: string;
  interviewType: string;
  interviewUrl: string;
  rescheduleInterview: Date;
}

export interface IInterviewJob {
  Application: IAppliedJob;
  applicationId: number;
  id: number;
  interviewLocation: string;
  interviewSchedule: Date;
  interviewStatus: string;
  interviewType: string;
  interviewUrl: string;
  rescheduleInterview: null;
}
