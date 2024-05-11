export interface Job {
  classificationInfo: ClassificationInfo;
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

export interface Classification {
  id: number;
  title: string;
}

export interface SubClassification {
  classificationId: number;
  id: number;
  title: string;
}
