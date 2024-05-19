import { z, ZodType } from 'zod';

export class ApplicationValidator {
  static readonly setInterviewSchema: ZodType = z
    .object({
      applicationId: z.number({ required_error: "Application id can't be empty" }),
      interviewSchedule: z.string({ required_error: "Interview date can't be empty" }),
      interviewType: z.enum(['Online', 'Offline'], { required_error: "Interview type can't be empty" }),
      interviewUrl: z.string(),
      interviewLocation: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.interviewType === 'Online' && !data.interviewUrl) {
        ctx.addIssue({
          code: 'custom',
          message: 'Interview url is required when interview type is online',
          path: ['interviewUrl'],
        });
      }
      if (data.interviewType === 'Offline' && !data.interviewLocation) {
        ctx.addIssue({
          code: 'custom',
          message: 'Interview location is required when interview type is offline',
          path: ['interviewLocation'],
        });
      }
    });

  static readonly rescheduleSchema: ZodType = z.object({
    rescheduleDate: z.string({ required_error: 'Select an interview date' }).transform((value) => new Date(value)),
  });
}
