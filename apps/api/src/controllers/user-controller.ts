import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { ResponseError } from '../helper/response/error-response';
import { UpdateProfilePayload } from '../model/user-model';
import { AuthJWTPayload } from '../model/auth-model';

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;

      const data = await UserService.getUserProfile(userId);
      if (!data) throw new ResponseError(404, 'Get profile failed');

      return res.status(201).json({ success: true, message: 'Get profile success', data });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const data = req.body as UpdateProfilePayload;

      await UserService.updateProfile(userId, data);

      return res.status(201).json({ success: true, message: 'Update profile success' });
    } catch (error) {
      next(error);
    }
  }

  async addUserSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { skill } = req.body;

      await UserService.addUserSkill(userId, skill);

      return res.status(201).json({ success: true, message: 'Update user skill success' });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const { skillId } = req.params;

      await UserService.deleteUserSkill(userId, parseInt(skillId, 10));

      return res.status(201).json({ success: true, message: 'Delete user skill success' });
    } catch (error) {
      next(error);
    }
  }

  async addUserExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const data = req.body;

      await UserService.addUserExperience(userId, data);

      return res.status(201).json({ success: true, message: 'Update user experience success' });
    } catch (error) {
      next(error);
    }
  }

  async addUserEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const data = req.body;

      await UserService.addUserEducation(userId, data);

      return res.status(201).json({ success: true, message: 'Update user education success' });
    } catch (error) {
      next(error);
    }
  }

  async profileCompleteness(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const data = await UserService.profileCompleteness(userId);
      return res.status(201).json({ success: true, message: 'Get profile completeness success', data });
    } catch (error) {
      next(error);
    }
  }

  async getAppliedJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;

      const data = await UserService.getAppliedJobs(userId);

      return res.status(201).json({ success: true, message: 'Get applied jobs success', data });
    } catch (error) {
      next(error);
    }
  }

  async getinterviewsJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as AuthJWTPayload;
      const data = await UserService.getInterviewsJobs(userId);

      return res.status(201).json({ success: true, message: 'Get interviews jobs success', data });
    } catch (error) {
      next(error);
    }
  }
}
