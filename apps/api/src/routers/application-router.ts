import { Router } from 'express';
import { ApplicationController } from '../controllers/application-controller';
import { resumeFile } from '../middleware/file/file-middleware';
import { Authorization } from '../middleware/auth/authorization';
import { validateRequest, ValidationType } from '../validation/validation';
import { ApplicationValidator } from '../validation/application-validator';

export class ApplicationRouter {
  private router: Router;
  private applicationController: ApplicationController;

  constructor() {
    this.applicationController = new ApplicationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/apply', Authorization.user, resumeFile, this.applicationController.apply);
    this.router.patch('/accept/:applicationId', Authorization.company, this.applicationController.acceptOffer);

    this.router.patch(
      '/schedule/:interviewId/accept/job-seeker',
      Authorization.user,
      this.applicationController.acceptScheduleJobSeeker,
    );

    this.router.patch(
      '/schedule/:interviewId/accept/company',
      Authorization.company,
      this.applicationController.acceptScheduleCompany,
    );

    this.router.patch(
      '/schedule/:interviewId/decline/company',
      Authorization.company,
      this.applicationController.declineRescheduleCompany,
    );

    this.router.patch(
      '/schedule/:interviewId/reschedule',
      Authorization.user,
      validateRequest(ApplicationValidator.rescheduleSchema, ValidationType.body),
      this.applicationController.reschedule,
    );

    this.router.patch(
      '/schedule/:interviewId/finish',
      Authorization.user,
      this.applicationController.finishInterviewCompany,
    );

    this.router.patch(
      '/schedule/:interviewId/cancel',
      Authorization.user,
      this.applicationController.cancelInterviewCompany,
    );

    this.router.patch('/:applicationId/hire', Authorization.user, this.applicationController.hireJobSeeker);

    this.router.patch(
      '/schedule',
      Authorization.company,
      validateRequest(ApplicationValidator.setInterviewSchema, ValidationType.body),
      this.applicationController.scheduleInterview,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
