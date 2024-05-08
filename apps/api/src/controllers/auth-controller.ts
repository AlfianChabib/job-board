import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../service/auth-service';
import {
  AuthJWTPayload,
  LoginPayload,
  RegisterCompanyPayload,
  RegisterUserPayload,
  RegisterVerifyPayload,
} from '../model/auth-model';
import { logger } from '../utils/logging';
import { ResponseError } from '../helper/response/error-response';
import { verifyRefreshToken } from '../helper/jsonwebtoken/auth-token';
import { hashToken } from '../helper/crypto/hash-token';

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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as LoginPayload;

      const resData = await AuthService.loginUser(payload);
      const { refreshToken, accessToken } = await AuthService.createToken(resData);

      await AuthService.sendToken(res, refreshToken);
      return res.status(201).json({ success: true, message: 'Login success', accessToken });
    } catch (error) {
      next(error);
    }
  }

  async loginCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as LoginPayload;

      const resData = await AuthService.loginCompany(payload);
      const { refreshToken, accessToken } = await AuthService.createToken(resData);

      await AuthService.sendToken(res, refreshToken);
      return res.status(201).json({ success: true, message: 'Login success', accessToken });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new ResponseError(401, 'Refresh token not found');
      const { accessToken, authorized } = await AuthService.refreshToken(refreshToken);

      if (!authorized) {
        res.clearCookie('refreshToken');
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      return res.status(201).json({ success: true, message: 'Refresh token success', accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { userId } = req.user;
      if (!refreshToken) throw new ResponseError(401, 'Refresh token not found');

      await AuthService.logOut(userId, hashToken(refreshToken));

      res.clearCookie('refreshToken');
      return res.status(201).json({ success: true, message: 'Logout success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async session(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const data = await AuthService.getSession(userId);
      return res.status(201).json({ success: true, message: 'Session success', data });
    } catch (error) {
      next(error);
    }
  }
}
