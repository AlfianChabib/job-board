import { NextFunction, Request, Response } from 'express';

export class Authorization {
  public static user = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  public static company = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(403).send('Unauthorized access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
