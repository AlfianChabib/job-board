import { NextFunction, Request, Response } from 'express';
import { DataService } from '../service/data-service';

export class DataController {
  async classification(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DataService.getClassification();
      return res.status(201).json({ success: true, message: 'Success', data });
    } catch (error) {
      next(error);
    }
  }

  async subClassification(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DataService.getSubClassification();
      return res.status(201).json({ success: true, message: 'Success', data });
    } catch (error) {
      next(error);
    }
  }

  async getSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const text = req.params.text as string;
      if (!text) return res.status(201).json({ success: true, message: 'No data', data: [] });
      const data = await DataService.getSkill({ text });
      return res.status(201).json({ success: true, message: 'Success', data });
    } catch (error) {
      next(error);
    }
  }
}
