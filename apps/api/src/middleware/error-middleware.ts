import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../helper/response/error-response';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.issues,
    });
  } else if (error instanceof ResponseError) {
    if (error.message === 'Unauthorized') {
      res.clearCookie('refreshToken');
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    res.status(error.status).json({
      success: false,
      message: error.message,
    });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
};
