import { CompanyProfile, UserEducation, UserExperience, UserProfile, UserSkill } from '@prisma/client';

interface IUserProfile extends UserProfile {
  userEducation: UserEducation[];
  userSkill: UserSkill[];
  userExperience: UserExperience[];
}

interface ICompanyProfile extends CompanyProfile {}

interface StrengthResult {
  strength: number;
  empty: string[];
}

export const userCompleteness = (data: IUserProfile): StrengthResult => {
  const profile: { strength: number; empty: string[] } = { strength: 6, empty: Array() };
  if (data.userEducation && data.userEducation.length === 0) {
    profile.strength--;
    profile.empty.push('education');
  }
  if (data.userExperience && data.userExperience.length === 0) {
    profile.strength--;
    profile.empty.push('experience');
  }
  if (data.userSkill && data.userSkill.length === 0) {
    profile.strength--;
    profile.empty.push('skill');
  }
  if (!data.address) {
    profile.strength--;
    profile.empty.push('address');
  }
  if (!data.phone) {
    profile.strength--;
    profile.empty.push('phone');
  }
  if (!data.summary) {
    profile.strength--;
    profile.empty.push('summary');
  }

  return profile;
};

export const companyCompleteness = (data: ICompanyProfile): StrengthResult => {
  const profile: { strength: number; empty: string[] } = { strength: 5, empty: Array() };
  if (!data.address) {
    profile.strength--;
    profile.empty.push('address');
  }
  if (!data.companyName) {
    profile.strength--;
    profile.empty.push('companyName');
  }
  if (!data.description) {
    profile.strength--;
    profile.empty.push('description');
  }
  if (!data.phone) {
    profile.strength--;
    profile.empty.push('phone');
  }
  if (!data.logo) {
    profile.strength--;
    profile.empty.push('logo');
  }
  return profile;
};
