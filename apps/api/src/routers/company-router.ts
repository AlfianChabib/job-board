import { Router } from 'express';
import { validateRequest, ValidationType } from '../validation/validation';
import { CompanyController } from '../controllers/company-controller';
import { CompanyValidation } from '../validation/company-validation';
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
    this.router.get('/profile', this.companyController.getCompanyProfile);
    this.router.get('/jobs', this.companyController.getCompanyJobs);
    this.router.get('/statistics', this.companyController.getCompanyStatistics);
    this.router.get('/profile/completeness', this.companyController.getCompanyCompleteness);

    this.router.patch('/profile/logo', companylogo, this.companyController.updateCompanyLogo);
    this.router.patch(
      '/profile',
      validateRequest(CompanyValidation.updateCompanySchema, ValidationType.body),
      this.companyController.updateCompanyProfile,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
