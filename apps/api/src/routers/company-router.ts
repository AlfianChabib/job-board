import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { CompanyController } from '../controllers/company-controller';
import { CompanyValidation } from '../validation/company-validation';

export class CompanyRouter {
  private router: Router;
  private companyController: CompanyController;

  constructor() {
    this.companyController = new CompanyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/job',
      validateRequest(CompanyValidation.postJobSchema, ValidationType.body),
      this.companyController.postJob,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
