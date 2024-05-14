export type IUserProfile = {
  address: string;
  email: string;
  id: number;
  image: string;
  phone: string;
  summary: string;
  userClassification: any[];
  userEducation: any[];
  userExperience: IUserExperience[];
  userResume: null;
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

export interface IUserEducation {
  id: number;
  userProfileId: number;
  degree: string;
  major: string;
  institution: string;
  started: string | Date;
  ended: string | Date;
}

export interface UserExperiencePayload {
  jobTitle: string;
  companyName: string;
  description: string | undefined;
  started: Date;
  ended: Date | undefined;
  stillInRole: boolean;
}
