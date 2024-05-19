import { z } from 'zod';

export const scheduleInterviewSchema = z
  .object({
    applicationId: z.number({ required_error: "Application id can't be empty" }),
    interviewSchedule: z.date({ required_error: 'Select an interview date' }),
    interviewType: z.enum(['Online', 'Offline'], { required_error: 'Select an interview type' }).default('Online'),
    interviewLocation: z.string(),
    interviewUrl: z.string(),
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

export const rescheduleSchema = z.object({
  interviewId: z.number({ required_error: "Interview id can't be empty" }),
  rescheduleDate: z.date({ required_error: 'Select a reschedule date' }),
});

export type ScheduleInterviewPayload = z.infer<typeof scheduleInterviewSchema>;
export type ReschedulePayload = z.infer<typeof rescheduleSchema>;
