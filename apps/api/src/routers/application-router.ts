import { Router } from 'express';
import { ApplicationController } from '../controllers/application-controller';
import { resumeFile } from '../middleware/file/file-middleware';
import { Authorization } from '../middleware/auth/authorization';

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
  }

  getRouter(): Router {
    return this.router;
  }
}
