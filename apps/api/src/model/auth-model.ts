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
