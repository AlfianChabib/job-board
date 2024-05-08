import { UserType } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';

interface VerifyTokenData {
  email: string;
  userId: number;
  userType: UserType;
  expiry: Date;
}

export const generateVerifycationToken = (data: VerifyTokenData): string => {
  return sign(data, process.env.JWT_VERIFIVATION_SECRET, {
    expiresIn: String(process.env.JWT_VERIFIVATION_LIFETIME),
    algorithm: 'HS256',
  });
};

export const verifyToken = (token: string): VerifyTokenData => {
  return verify(token, process.env.JWT_VERIFIVATION_SECRET, {
    algorithms: ['HS256'],
  }) as VerifyTokenData;
};

export const verificationUrl = (token: string): string => {
  return `${process.env.BASE_FRONTEND_URL}/register/verification?token=${token}`;
};

export const genTokenUrl = (data: VerifyTokenData): { url: string; token: string } => {
  const token = generateVerifycationToken(data);
  const url = verificationUrl(token);
  return { url, token };
};
