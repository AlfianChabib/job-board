import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../service/auth-service';
import { LoginPayload, RegisterCompanyPayload, RegisterUserPayload, RegisterVerifyPayload } from '../model/auth-model';
import { logger } from '../utils/logging';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as RegisterUserPayload;

      const { email } = await AuthService.registerUser(payload);

      if (email) {
        return res
          .status(201)
          .json({ success: true, message: `Register ${email} success, please check your email to verification` });
      }
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async registerCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as RegisterCompanyPayload;

      const { email } = await AuthService.registerCompany(payload);

      if (email) {
        return res
          .status(201)
          .json({ success: true, message: `Register ${email} success, please check your email to verification` });
      }
    } catch (error) {
      next(error);
    }
  }

  async accountVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as RegisterVerifyPayload;

      const { email } = await AuthService.accountVerify(payload);

      if (email) {
        return res.status(201).json({ success: true, message: 'Account verification success', data: { email } });
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as LoginPayload;
    } catch (error) {
      next(error);
    }
  }
}
