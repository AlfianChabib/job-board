import { NextFunction, Request, Response } from 'express';
import { CompanyService } from '../service/company-service';
import { ResponseError } from '../helper/response/error-response';
import { CompanyProfilePayload } from '../model/company-model';

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

  async getCompanyStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = await CompanyService.getStatistics(userId);

      if (!data) throw new ResponseError(404, 'Get company statistics failed');

      return res.status(201).json({ success: true, message: 'Get company statistics success', data });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = await CompanyService.getCompanyProfile(userId);
      return res.status(201).json({ success: true, message: 'Get company profile success', data });
    } catch (error) {
      next(error);
    }
  }

  async updateCompanyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = req.body as CompanyProfilePayload;
      await CompanyService.updateCompanyProfile(userId, data);
      return res.status(201).json({ success: true, message: 'Update company profile success' });
    } catch (error) {
      next(error);
    }
  }

  async updateCompanyLogo(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const { file } = req;

      const fileUrl = process.env.BASE_API_URL + file?.path;
      console.log(req.file);

      await CompanyService.updateCompanyLogo(userId, fileUrl);

      return res.status(201).json({ success: true, message: 'Update company logo success' });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyCompleteness(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = await CompanyService.companyProfileCompleteness(userId);

      return res.status(201).json({ success: true, message: 'Get company completeness success', data });
    } catch (error) {
      next(error);
    }
  }
}
