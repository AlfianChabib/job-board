import { SessionData } from '@/types';

export const initialSession: SessionData = {
  isAuthenticated: false,
  userId: 0,
  username: '',
  email: '',
  role: '',
  image: null,
};

export const defaultJobValue = {
  title: '',
  description: '',
  requirements: '',
  type: '',
  location: '',
  registrationDeadline: undefined,
  classificationId: 0,
  subClassificationId: 0,
};

export const companyMenuLinks = [
  { name: 'Account', href: '/company/account', icon: 'CircleUser' },
  { name: 'Dashboard', href: '/company/dashboard', icon: 'LayoutDashboard' },
  { name: 'Jobs', href: '/company/jobs', icon: 'FolderKanban' },
  { name: 'Application', href: '/company/application', icon: 'Users' },
  { name: 'Interview', href: '/company/interview', icon: 'FolderClock' },
];

export const userMenuLinks = [
  { name: 'Account', href: '/account', icon: 'CircleUser' },
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Jobs', href: '/jobs', icon: 'FolderKanban' },
];

export const workType = [
  { name: 'Full-time', value: 'FullTime' },
  { name: 'Part-time', value: 'PartTime' },
  { name: 'Contract', value: 'Contract' },
];
