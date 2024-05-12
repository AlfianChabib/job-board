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
