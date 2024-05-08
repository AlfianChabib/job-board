'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/service/auth-service';

interface SessionData {
  isAuthenticated: boolean;
  userId: number;
  email: string;
  role: string;
  image: string;
}

const initialSession: SessionData = {
  isAuthenticated: false,
  userId: 0,
  email: '',
  role: '',
  image: '',
};

export const getSession = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }
  try {
    const data = await authService.session().then((res) => res);
    return data.data;
  } catch (error) {
    return null;
  }
};

const SessionContext = createContext<SessionData>(initialSession);

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData>(initialSession);

  useEffect(() => {
    getSession().then((data) => {
      if (data) {
        setSession({ ...data, isAuthenticated: true });
      }
    });
  }, []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export const useSession = () => {
  return useContext(SessionContext);
};
