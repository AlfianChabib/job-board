export interface Job {
  classificationInfo: ClassificationInfo;
  CompanyProfile: CompanyProfile;
  description: string;
  id: number;
  jobType: string;
  location: string;
  registrationDeadline: Date;
  requirements: string;
  title: string;
}

export interface ClassificationInfo {
  classification: Classification;
  subClassification: SubClassification;
}

export interface CompanyProfile {
  companyName: string;
  id: number;
  logo: string;
}

export interface Classification {
  id: number;
  title: string;
}

export interface SubClassification {
  classificationId: number;
  id: number;
  title: string;
}
