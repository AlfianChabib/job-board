export type RegisterUserPayload = {
  username: string;
  email: string;
  password: string;
};

export type RegisterCompanyPayload = {
  companyName: string;
  email: string;
  password: string;
};

export type RegisterVerifyPayload = {
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface AuthJWTPayload {
  userId: number;
  role: string;
  email: string;
}

export type TokenServiceResponse = {
  refreshToken: string;
  accessToken: string;
};

export type LoginServiceResponse = {
  userId: number;
  email: string;
  role: string;
};
