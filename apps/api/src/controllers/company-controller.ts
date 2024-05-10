import { NextFunction, Request, Response } from 'express';
import { PostJobPayload } from '../model/company-model';
import { CompanyService } from '../service/company-service';

export class CompanyController {
  async postJob(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as PostJobPayload;

      await CompanyService.postJob(data, req.user.userId);

      return res.status(201).json({ success: true, message: 'Post job success' });
    } catch (error) {
      next(error);
    }
  }
}
