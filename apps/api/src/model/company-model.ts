export type Company = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyStatistic = {
  companyId: number;
  totalJobs: number;
  totalApplications: number;
  totalInterviews: number;
};

export type CompanyProfilePayload = {
  address: string | null;
  companyName: string | null;
  description: string | null;
  phone: string | null;
};
