export type UserProfile = {
  address: string;
  email: string;
  id: number;
  image: string;
  phone: string;
  summary: string;
  userClassification: any[];
  userEducation: any[];
  userExperience: any[];
  userResume: null;
  userSkill: UserSkill[];
  username: string;
};

export interface UserSkill {
  id: number;
  skillTitle: string;
  userId: number;
}
