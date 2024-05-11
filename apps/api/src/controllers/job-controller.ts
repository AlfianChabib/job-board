import { NextFunction, Request, Response } from 'express';
import { PostJobPayload, UpdateJobPayload } from '../model/job-model';
import { JobService } from '../service/job-service';

export class JobController {
  async getJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobId } = req.params;
      const data = await JobService.getJob(parseInt(jobId, 10));
      return res.status(201).json({ success: true, message: 'Get job success', data });
    } catch (error) {
      next(error);
    }
  }

  // Get all company jobs
  async getCompanyJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const data = await JobService.getCompanyJobs(userId);

      if (!data) throw new Error('Get jobs failed');

      return res.status(201).json({ success: true, message: 'Get jobs success', data });
    } catch (error) {
      next(error);
    }
  }

  async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JobService.getJobs();
      return res.status(200).json({ success: true, message: 'Get jobs success', data });
    } catch (error) {
      next(error);
    }
  }

  async postJob(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as PostJobPayload;

      await JobService.postJob(data, req.user.userId);

      return res.status(201).json({ success: true, message: 'Post job success' });
    } catch (error) {
      next(error);
    }
  }

  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobId } = req.params;
      const data = req.body as UpdateJobPayload;
      await JobService.updateJob(parseInt(jobId, 10), data);
      return res.status(201).json({ success: true, message: 'Update job success' });
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobId } = req.params;
      await JobService.deleteJob(parseInt(jobId, 10));
      return res.status(201).json({ success: true, message: 'Delete job success' });
    } catch (error) {
      next(error);
    }
  }

  async jobPagination(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json({ success: true, message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}
