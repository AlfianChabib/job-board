import { compareSync, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string): string => {
  return hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
};
