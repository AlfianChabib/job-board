import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { transporter } from '../../utils/nodemailer';

export enum EmailType {
  NOTIFICATION = 'notification',
  REGISTERED_NOTIFICATION = 'registered-notification',
  VERIFICATION = 'verification',
  UPDATE_EMAIL = 'update-email',
  UPDATE_PASSWORD = 'update-password',
  FORGOT_PASSWORD = 'forgot-password',
}

interface IEmailPayload {
  email: string;
  url?: string;
}

export async function sendEmail(type: EmailType, payload: IEmailPayload) {
  try {
    const html = fs.readFileSync(path.join(__dirname, `../../template/${type}.hbs`), 'utf-8');
    const template = Handlebars.compile(html);

    return await transporter.sendMail({
      from: 'I-Need <alfianchabib109@gmail.com>',
      to: payload.email,
      subject: `I-Need ${type}`,
      html: template({ email: payload.email, url: payload.url }),
    });
  } catch (error) {
    throw error;
  }
}
