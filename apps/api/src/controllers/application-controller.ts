import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../helper/response/error-response';
import { ApplicationService } from '../service/application-service';
import { AuthJWTPayload } from '../model/auth-model';
import { InterviewPayload } from '../model/application-model';

export class ApplicationController {
  async apply(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { jobId } = req.body;
      const { file } = req;
      if (!file) throw new ResponseError(404, 'File not found');
      const filePath: string = process.env.BASE_API_URL + file.path;

      await ApplicationService.apply(userId, parseInt(jobId, 10), filePath);
      return res.status(201).json({ success: true, message: 'Apply to job success' });
    } catch (error) {
      next(error);
    }
  }

  async acceptOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { applicationId } = req.params;
      await ApplicationService.acceptOffer(userId, parseInt(applicationId as string, 10));
      return res.status(201).json({ success: true, message: 'Accept offer success' });
    } catch (error) {
      next(error);
    }
  }

  async scheduleInterview(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;

      const payload = req.body as InterviewPayload;

      const application = await ApplicationService.getApplication(payload.applicationId);
      if (!application) throw new ResponseError(404, 'Application not found');

      await ApplicationService.scheduleInterview(userId, payload);

      return res.status(201).json({ success: true, message: 'Set interview schedule success' });
    } catch (error) {
      next(error);
    }
  }

  async acceptScheduleJobSeeker(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;

      await ApplicationService.acceptScheduleJobSeeker(userId, parseInt(interviewId as string, 10));

      return res.status(201).json({ success: true, message: 'Accept interview schedule success' });
    } catch (error) {
      next(error);
    }
  }

  async acceptScheduleCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;

      await ApplicationService.acceptRescheduleCompany(userId, parseInt(interviewId as string, 10));

      return res.status(201).json({ success: true, message: 'Accept interview schedule success' });
    } catch (error) {
      next(error);
    }
  }

  async declineRescheduleCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;

      await ApplicationService.declineRescheduleCompany(userId, parseInt(interviewId as string, 10));

      return res.status(201).json({ success: true, message: 'Decline interview schedule success' });
    } catch (error) {
      next(error);
    }
  }

  async finishInterviewCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;

      await ApplicationService.finishInterviewCompany(userId, parseInt(interviewId as string, 10));

      return res.status(201).json({ success: true, message: 'Finish interview success' });
    } catch (error) {
      next(error);
    }
  }

  async cancelInterviewCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;

      await ApplicationService.cancelInterviewCompany(userId, parseInt(interviewId as string, 10));

      return res.status(201).json({ success: true, message: 'Cancel interview success' });
    } catch (error) {
      next(error);
    }
  }

  async reschedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { interviewId } = req.params;
      const payload = req.body;

      await ApplicationService.reschedule(userId, parseInt(interviewId as string, 10), payload);

      return res.status(201).json({ success: true, message: 'Reschedule interview success' });
    } catch (error) {
      next(error);
    }
  }

  async hireJobSeeker(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { applicationId } = req.params;

      await ApplicationService.hireJobSeeker(userId, parseInt(applicationId as string, 10));

      return res.status(201).json({ success: true, message: 'Hire job seeker success' });
    } catch (error) {
      next(error);
    }
  }
}
