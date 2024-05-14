export type UpdateProfilePayload = {
  username: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  summary: string | undefined;
};

export type AddUserExperiencePayload = {
  jobTitle: string;
  companyName: string;
  description: string | undefined;
  started: Date;
  ended: Date | undefined;
  stillInRole: boolean;
};
