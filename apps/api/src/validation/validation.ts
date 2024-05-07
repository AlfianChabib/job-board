import { Request, Response, NextFunction } from 'express';
import { z, ZodObject, ZodType } from 'zod';

export enum ValidationType {
  body = 'body',
  query = 'query',
  params = 'params',
}

export const validateRequest =
  (schema: ZodType, type: ValidationType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = z.object({ [type]: schema });
      const data = await result.parseAsync({ [type]: req[type] });
      req[type] = data[type];
      return next();
    } catch (error) {
      next(error);
    }
  };
