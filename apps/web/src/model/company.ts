import { Job } from './job';
import { IUserProfile } from './user';

export interface CompanyStatistic {
  companyId: number;
  totalApplications: number;
  totalInterviews: number;
  totalJobs: number;
}

export interface CompanyProfileData {
  address: string | undefined;
  companyName: string;
  description: string | undefined;
  email: string;
  id: number;
  logo: string | undefined;
  phone: string | undefined;
  userId: number;
}

export interface IInterviewCompany {
  Application: Application;
  applicationId: number;
  id: number;
  interviewLocation: string;
  interviewSchedule: Date;
  interviewStatus: string;
  interviewType: string;
  interviewUrl: string;
  rescheduleInterview: Date;
}

export interface Application {
  Job: Job;
  id: number;
  jobId: number;
  resume: string;
  status: string;
  userProfileId: number;
  UserProfile: IUserProfile;
}
