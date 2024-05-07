import dayjs from 'dayjs';
import { prisma } from '../prisma';
import { hashToken } from '../helper/crypto/hash-token';
import { genTokenUrl, verifyToken } from '../helper/jsonwebtoken/verify-token';
import { hashPassword } from '../helper/bcrypt/password-helper';
import { ResponseError } from '../helper/response/error-response';
import { EmailType, sendEmail } from '../helper/email/email-helper';
import { LoginPayload, RegisterCompanyPayload, RegisterUserPayload, RegisterVerifyPayload } from '../model/auth-model';

export class AuthService {
  static async registerUser(payload: RegisterUserPayload): Promise<{ email: string }> {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existUser) throw new ResponseError(400, 'Email already exist');

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
    const { token, url } = genTokenUrl({ email: user.email, userId: user.id, expiry: expiryToken });

    await prisma.user.update({
      where: { id: user.id },
      data: { AuthDetail: { update: { verificationCode: hashToken(token) } } },
    });

    await sendEmail(EmailType.VERIFICATION, { email: user.email, url });

    return { email: user.email };
  }

  static async registerCompany(payload: RegisterCompanyPayload): Promise<{ email: string }> {
    const existCompany = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existCompany) throw new ResponseError(400, 'Email already exist');

    const hashedPassword = hashPassword(payload.password);
    const company = await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.companyName,
        role: 'Company',
        AuthDetail: { create: { email: payload.email, hashPassword: hashedPassword, verified: true } },
        CompanyProfile: { create: { companyName: payload.companyName } },
      },
    });
    const expiryToken = dayjs().add(1, 'hour').toDate();
    const { token, url } = genTokenUrl({ email: company.email, userId: company.id, expiry: expiryToken });

    await prisma.user.update({
      where: { id: company.id },
      data: { AuthDetail: { update: { verificationCode: hashToken(token) } } },
    });

    await sendEmail(EmailType.VERIFICATION, { email: company.email, url });

    return { email: company.email };
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

  static async login(payload: LoginPayload): Promise<void> {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email }, include: { AuthDetail: true } });

    if (!existUser) throw new ResponseError(400, 'Account not found, please register');
    if (!existUser.AuthDetail || !existUser.AuthDetail.verified) {
      throw new ResponseError(400, 'Please verify your account');
    }

    const isMatch = existUser.AuthDetail.hashPassword === hashPassword(payload.password);
    if (!isMatch) throw new ResponseError(400, 'Password not match');

    return;
  }
}
