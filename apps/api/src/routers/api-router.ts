import { Router } from 'express';
import { AuthRouter } from './auth-router';
import { CompanyRouter } from './company-router';
import { Authorization } from '../middleware/auth/authorization';
import { DataRouter } from './data-router';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;
  private companyRouter: CompanyRouter;
  private dataRouter: DataRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.companyRouter = new CompanyRouter();
    this.dataRouter = new DataRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/company', Authorization.company, this.companyRouter.getRouter());
    this.router.use('/data', this.dataRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
