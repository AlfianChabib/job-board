import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { CompanyController } from '../controllers/company-controller';
import { CompanyValidation } from '../validation/company-validation';
import { Authorization } from '../middleware/auth/authorization';
import { companylogo } from '../middleware/file/file-middleware';

export class CompanyRouter {
  private router: Router;
  private companyController: CompanyController;

  constructor() {
    this.companyController = new CompanyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/profile', Authorization.company, this.companyController.getCompanyProfile);
    this.router.patch(
      '/profile',
      Authorization.company,
      validateRequest(CompanyValidation.updateCompanySchema, ValidationType.body),
      this.companyController.updateCompanyProfile,
    );
    this.router.patch('/profile/logo', Authorization.company, companylogo, this.companyController.updateCompanyLogo);
    this.router.get('/jobs', Authorization.company, this.companyController.getCompanyJobs);
    this.router.get('/statistics', Authorization.company, this.companyController.getCompanyStatistics);
  }

  getRouter(): Router {
    return this.router;
  }
}
