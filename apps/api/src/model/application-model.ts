import { InterviewType } from '@prisma/client';

export type InterviewPayload = {
  applicationId: number;
  interviewSchedule: string;
  interviewType: InterviewType;
  interviewUrl: string | null;
  interviewLocation: string | null;
};

export type ReschedulePayload = {
  rescheduleDate: Date;
};
