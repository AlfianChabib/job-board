import { NextFunction, Request, Response } from 'express';
import { AuthJWTPayload } from '../../model/auth-model';

export class Authorization {
  public static user = (
    req: Request extends { user: AuthJWTPayload } ? Request : any,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as AuthJWTPayload;
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  public static company = (
    req: Request extends { user: AuthJWTPayload } ? Request : any,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as AuthJWTPayload;
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
