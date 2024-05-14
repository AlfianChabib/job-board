import { formatDistanceStrict } from 'date-fns';

export const getDistance = (date1: Date | string, date2: Date | string = new Date()) => {
  return formatDistanceStrict(date1, date2, { roundingMethod: 'ceil', unit: 'year' });
};

export const formatYearMonth = (date: Date | string) => {
  const res = new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
  });
  return res;
};
