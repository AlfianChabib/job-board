import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { JobController } from '../controllers/job-controller';
import { JobValidation } from '../validation/job-validation';
import { Authorization } from '../middleware/auth/authorization';

export class JobRouter {
  private router: Router;
  private jobController: JobController;

  constructor() {
    this.jobController = new JobController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', Authorization.company, this.jobController.getJobs);
    this.router.patch('/:jobId', Authorization.company, this.jobController.updateJob);
    this.router.delete('/:jobId', Authorization.company, this.jobController.deleteJob);
    this.router.post(
      '/',
      Authorization.company,
      validateRequest(JobValidation.postJobSchema, ValidationType.body),
      this.jobController.postJob,
    );

    this.router.get('/:jobId', this.jobController.getJob);
  }

  getRouter(): Router {
    return this.router;
  }
}
