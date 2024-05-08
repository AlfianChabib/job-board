import * as jwt from 'jsonwebtoken';
import { AuthJWTPayload } from '../../model/auth-model';

export function generateAccessToken(payload: AuthJWTPayload): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_LIFETIME });
}

export function generateRefreshToken(payload: AuthJWTPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_LIFETIME,
    algorithm: 'HS256',
  });
}

export function generateTokens(
  userId: number,
  email: string,
  role: string,
): { accessToken: string; refreshToken: string } {
  const payload: AuthJWTPayload = { userId: userId, role: role, email: email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw error;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
    });
  } catch (error) {
    throw error;
  }
}
