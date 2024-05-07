import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest, ValidationType } from '../validation/validation';
import { AuthValidation } from '../validation/auth-validation';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register/user',
      validateRequest(AuthValidation.registerUserSchema, ValidationType.body),
      this.authController.registerUser,
    );

    this.router.post(
      '/register/company',
      validateRequest(AuthValidation.registerCompanySchema, ValidationType.body),
      this.authController.registerCompany,
    );

    this.router.post(
      '/register/verify',
      validateRequest(AuthValidation.registerVerifySchema, ValidationType.body),
      this.authController.accountVerify,
    );

    this.router.post(
      '/login',
      validateRequest(AuthValidation.loginSchema, ValidationType.body),
      this.authController.login,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
