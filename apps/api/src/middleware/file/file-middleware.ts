import { uploadCv, uploadLogo, uploadUserProfile } from '../../utils/multer';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { ResponseError } from '../../helper/response/error-response';

export const companylogo = (req: Request, res: Response, next: NextFunction) => {
  try {
    uploadLogo(req, res, function (err) {
      if (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
          throw new ResponseError(400, 'File size too large');
        }
        if (err.message === 'File type not allowed') throw new ResponseError(400, 'File type not allowed');
        throw new ResponseError(500, 'Internal server error');
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const userImage = (req: Request, res: Response, next: NextFunction) => {
  try {
    uploadUserProfile(req, res, function (err) {
      if (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
          throw new ResponseError(400, 'File size too large');
        }
        if (err.message === 'File type not allowed') throw new ResponseError(400, 'File type not allowed');
        throw new ResponseError(500, 'Internal server error');
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const resumeFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    uploadCv(req, res, function (err) {
      if (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
          throw new ResponseError(400, 'File size too large');
        }
        if (err.message === 'File type not allowed') throw new ResponseError(400, 'File type not allowed');
        throw new ResponseError(500, 'Internal server error');
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};
