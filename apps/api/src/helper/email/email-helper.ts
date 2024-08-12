import Handlebars from 'handlebars';
import * as path from 'path';
import fs from 'fs';
import { resend } from '../../utils/resend';

export enum EmailType {
  NOTIFICATION = 'notification',
  REGISTERED_NOTIFICATION = 'registered-notification',
  VERIFICATION = 'verification',
  INTERVIEW_SCHEDULE = 'interview-schedule',
  ACCEPTED = 'accepted',
}

interface IEmailPayload {
  email: string;
  url?: string;
  scheduleDate?: string;
  companyName?: string;
  job?: string;
  rescheduleUrl?: string;
  acceptUrl?: string;
}

export async function resendEmail(type: EmailType, payload: IEmailPayload) {
  try {
    const html = fs.readFileSync(path.join(__dirname, `../../template/${type}.hbs`), 'utf-8');
    const template = Handlebars.compile(html);

    return await resend.emails.send({
      to: payload.email,
      from: 'I-Need <ineed@ineed.my.id>',
      subject: `I-Need ${type}`,
      html: template({
        email: payload.email,
        url: payload.url,
        scheduleDate: payload.scheduleDate,
        companyName: payload.companyName,
        job: payload.job,
        rescheduleUrl: payload.rescheduleUrl,
        acceptUrl: payload.acceptUrl,
      }),
    });
  } catch (error) {
    throw error;
  }
}
