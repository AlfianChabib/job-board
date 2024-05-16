import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../helper/response/error-response';
import { ApplicationService } from '../service/application-service';
import { AuthJWTPayload } from '../model/auth-model';

export class ApplicationController {
  async apply(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { jobId } = req.body;
      const { file } = req;
      if (!file) throw new ResponseError(404, 'File not found');
      const filePath: string = process.env.BASE_API_URL + file.path;

      await ApplicationService.apply(userId, parseInt(jobId, 10), filePath);
      res.status(201).json({ success: true, message: 'success' });
    } catch (error) {
      next(error);
    }
  }
}
