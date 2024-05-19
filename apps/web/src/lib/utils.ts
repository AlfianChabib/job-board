import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setInterviewStatus(status: string) {
  switch (status) {
    case 'Sending':
      return 'Scheduling';
    case 'Canceled':
      return 'Canceled';
    case 'Accept':
      return 'Accepted';
    case 'Finished':
      return 'Finished';
    case 'Rescheduling':
      return 'Rescheduling';
    default:
      return 'Pending';
  }
}
