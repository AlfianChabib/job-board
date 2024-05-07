import { Router } from 'express';
import { AuthRouter } from './auth.router';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', this.authRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
