import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { JobController } from '../controllers/job-controller';
import { JobValidation } from '../validation/job-validation';
import { Authorization } from '../middleware/auth/authorization';
import { parsedJobQuery } from '../middleware/jobs/parsedQuery-middleware';

export class JobRouter {
  private router: Router;
  private jobController: JobController;

  constructor() {
    this.jobController = new JobController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/company', Authorization.company, this.jobController.getCompanyJobs);
    this.router.get('/', this.jobController.getJobs);
    this.router.patch('/:jobId', Authorization.company, this.jobController.updateJob);
    this.router.delete('/:jobId', Authorization.company, this.jobController.deleteJob);
    this.router.post(
      '/',
      Authorization.company,
      validateRequest(JobValidation.postJobSchema, ValidationType.body),
      this.jobController.postJob,
    );

    this.router.get('/feature', parsedJobQuery, this.jobController.jobListFeature);
    this.router.get('/:jobId', this.jobController.getJob);
    this.router.get('/applied/:jobId', Authorization.user, this.jobController.getAppliedJob);
  }

  getRouter(): Router {
    return this.router;
  }
}
