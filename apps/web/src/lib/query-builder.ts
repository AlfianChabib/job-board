import { QueryParams } from '@/types';

export const queryBuilder = (payload: QueryParams) => {
  let queryString = '';
  for (const [key, value] of Object.entries(payload)) {
    if (value) queryString += `&${key}=${value}`;
  }
  return queryString;
};
