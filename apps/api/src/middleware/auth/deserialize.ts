import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthJWTPayload } from '../../model/auth-model';
import { ResponseError } from '../../helper/response/error-response';

export interface RequestWithUser {
  user: AuthJWTPayload;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthJWTPayload;
    }
  }
}

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (accessToken === undefined) {
      return next();
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, function (err, decoded) {
      if (err instanceof jwt.TokenExpiredError) {
        if (err.name === 'TokenExpiredError') {
          throw new ResponseError(403, 'Token expired');
        }
        throw new ResponseError(401, 'Invalid token');
      } else {
        req.user = decoded as AuthJWTPayload;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};
