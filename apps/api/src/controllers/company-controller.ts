import { NextFunction, Request, Response } from 'express';
import { CompanyService } from '../service/company-service';

export class CompanyController {
  async getCompanyJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = await CompanyService.getCompanyJobs(userId);

      return res.status(201).json({ success: true, message: 'Get company jobs success', data });
    } catch (error) {
      next(error);
    }
  }
}
