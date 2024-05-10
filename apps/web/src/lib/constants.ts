import { SessionData } from '@/types';

export const initialSession: SessionData = {
  isAuthenticated: false,
  userId: 0,
  username: '',
  email: '',
  role: '',
  image: null,
};

export const companyMenuLinks = [
  { name: 'Account', href: '/company/account', icon: 'CircleUser' },
  { name: 'Dashboard', href: '/company/dashboard', icon: 'LayoutDashboard' },
  { name: 'Jobs', href: '/company/jobs', icon: 'FolderKanban' },
];

export const userMenuLinks = [
  { name: 'Account', href: '/account', icon: 'CircleUser' },
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Jobs', href: '/jobs', icon: 'FolderKanban' },
];

export const workType = [
  { name: 'Full-time', value: 'full-time' },
  { name: 'Part-time', value: 'part-time' },
  { name: 'Contract', value: 'contract' },
];
