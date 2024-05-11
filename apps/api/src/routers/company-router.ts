import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { CompanyController } from '../controllers/company-controller';
import { CompanyValidation } from '../validation/company-validation';
import { Authorization } from '../middleware/auth/authorization';

export class CompanyRouter {
  private router: Router;
  private companyController: CompanyController;

  constructor() {
    this.companyController = new CompanyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/jobs', Authorization.company, this.companyController.getCompanyJobs);
  }

  getRouter(): Router {
    return this.router;
  }
}
