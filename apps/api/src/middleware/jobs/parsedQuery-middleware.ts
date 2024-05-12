import { JobType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const parsedJobQuery = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, keywords, classificationId, sort, jobType, location } = req.query;
    const parsedPage = parseInt(page as string) || 1;
    const parsedLimit = parseInt(limit as string) || 10;
    const parsedClassificationId = parseInt(classificationId as string) || undefined;
    const keyword = keywords as string | undefined;
    const offset = (parsedPage - 1) * parsedLimit;
    const queries = {
      page: parsedPage,
      limit: parsedLimit,
      offset,
      keywords: keyword,
      classificationId: parsedClassificationId,
      sort: sort as string,
      jobType: jobType as JobType | undefined,
      location: location as string | undefined,
    };
    req.body = { queries };

    next();
  } catch (error) {
    next(error);
  }
};
