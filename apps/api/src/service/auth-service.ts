import dayjs from 'dayjs';
import { prisma } from '../prisma';
import { hashToken } from '../helper/crypto/hash-token';
import { genTokenUrl, verifyToken } from '../helper/jsonwebtoken/verify-token';
import { comparePassword, hashPassword } from '../helper/bcrypt/password-helper';
import { ResponseError } from '../helper/response/error-response';
import { EmailType, sendEmail } from '../helper/email/email-helper';
import {
  AuthJWTPayload,
  LoginPayload,
  LoginServiceResponse,
  RegisterCompanyPayload,
  RegisterUserPayload,
  RegisterVerifyPayload,
  TokenServiceResponse,
} from '../model/auth-model';
import { generateTokens, verifyRefreshToken } from '../helper/jsonwebtoken/auth-token';
import { Response } from 'express';

export class AuthService {
  static async registerUser(payload: RegisterUserPayload): Promise<{ email: string }> {
    const existUser = await prisma.user.count({ where: { email: payload.email } });
    if (existUser > 0) throw new ResponseError(400, 'Email already exist');

    const hashedPassword = hashPassword(payload.password);
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.username,
        AuthDetail: { create: { email: payload.email, hashPassword: hashedPassword } },
        UserProfile: { create: { username: payload.username } },
      },
    });
    const expiryToken = dayjs().add(1, 'hour').toDate();
    const { token, url } = genTokenUrl({
      email: user.email,
      userId: user.id,
      userType: user.role,
      expiry: expiryToken,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { AuthDetail: { update: { verificationCode: hashToken(token) } } },
    });

    await sendEmail(EmailType.VERIFICATION, { email: user.email, url });

    return { email: user.email };
  }

  static async registerCompany(payload: RegisterCompanyPayload): Promise<{ email: string }> {
    const existEmail = await prisma.user.count({ where: { email: payload.email } });
    if (existEmail > 0) throw new ResponseError(400, 'Email already exist');

    const hashedPassword = hashPassword(payload.password);
    const company = await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.companyName,
        role: 'Company',
        AuthDetail: { create: { email: payload.email, hashPassword: hashedPassword } },
        CompanyProfile: { create: { companyName: payload.companyName } },
      },
    });
    const expiryToken = dayjs().add(1, 'hour').toDate();
    const { token, url } = genTokenUrl({
      email: company.email,
      userId: company.id,
      userType: company.role,
      expiry: expiryToken,
    });

    const updatedCompany = await prisma.user.update({
      where: { id: company.id },
      data: { AuthDetail: { update: { verificationCode: hashToken(token) } } },
    });

    await sendEmail(EmailType.VERIFICATION, { email: company.email, url });

    return { email: updatedCompany.email };
  }

  static async accountVerify(payload: RegisterVerifyPayload): Promise<{ email: string }> {
    const { expiry, email } = verifyToken(payload.token);
    const user = await prisma.user.findUnique({ where: { email }, include: { AuthDetail: true } });

    if (!user || !user.AuthDetail) throw new ResponseError(400, 'Token not found');

    if (dayjs(expiry).isBefore(dayjs())) throw new ResponseError(400, 'Token expired');

    if (user.AuthDetail.verified) throw new ResponseError(400, 'Account already verified');

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { AuthDetail: { update: { verified: true } } },
    });

    return { email: updatedUser.email };
  }

  static async loginUser(payload: LoginPayload): Promise<LoginServiceResponse> {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email }, include: { AuthDetail: true } });

    if (!existUser) throw new ResponseError(400, 'Account not found, please register');
    if (!existUser.AuthDetail || !existUser.AuthDetail.verified) {
      throw new ResponseError(400, 'Please verify your account');
    }
    if (existUser.role === 'Company') throw new ResponseError(400, 'Please login with company account');

    const isMatch = comparePassword(payload.password, existUser.AuthDetail.hashPassword!);
    if (!isMatch) throw new ResponseError(400, 'Password not match');

    return { userId: existUser.id, email: existUser.email, role: existUser.role };
  }

  static async loginCompany(payload: LoginPayload): Promise<LoginServiceResponse> {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email }, include: { AuthDetail: true } });

    if (!existUser) throw new ResponseError(400, 'Account not found, please register');
    if (!existUser.AuthDetail || !existUser.AuthDetail.verified) {
      throw new ResponseError(400, 'Please verify your account');
    }
    if (existUser.role === 'JobSeeker') throw new ResponseError(400, 'Please login with job seeker account');

    const isMatch = comparePassword(payload.password, existUser.AuthDetail.hashPassword!);
    if (!isMatch) throw new ResponseError(400, 'Password not match');

    return { userId: existUser.id, email: existUser.email, role: existUser.role };
  }

  static async createToken(payload: LoginServiceResponse): Promise<TokenServiceResponse> {
    const { refreshToken, accessToken } = generateTokens(payload.userId, payload.email, payload.role);

    const expiry = dayjs().add(7, 'days').toDate();
    await prisma.authDetail.update({
      where: { userId: payload.userId },
      data: { refreshToken: { create: { hashToken: hashToken(refreshToken), expiry } } },
    });

    return { refreshToken, accessToken };
  }

  static async refreshToken(refreshToken: string) {
    const { userId, email, role } = verifyRefreshToken(refreshToken) as AuthJWTPayload;
    const hashedToken = hashToken(refreshToken);

    const existToken = await prisma.authDetail.findUnique({
      where: { userId },
      select: { refreshToken: { where: { hashToken: hashedToken } } },
    });

    if (existToken?.refreshToken.length === 0) {
      return { accessToken: '', authorized: false };
    }

    const { accessToken } = generateTokens(userId, email, role);
    return { accessToken, authorized: true };
  }

  static async logOut(userId: number, hashToken: string) {
    await prisma.authDetail.update({
      where: { userId },
      data: { refreshToken: { deleteMany: { hashToken } } },
    });
  }

  static async getSession(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { AuthDetail: true, UserProfile: true, CompanyProfile: true },
    });

    return {
      username: user?.username,
      email: user?.email,
      role: user?.role,
      image: user?.role === 'Company' ? user?.CompanyProfile?.logo : user?.UserProfile?.image,
    };
  }

  static async sendToken(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      path: '/',
    });
  }
}
