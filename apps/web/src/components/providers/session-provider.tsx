'use client';

import { createContext, useContext } from 'react';
import { authService } from '@/service/auth-service';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/(root)/loading';
import { SessionData } from '@/types';
import { initialSession } from '@/lib/constants';

const CurrentSessionContext = createContext<SessionData | undefined>(initialSession);

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => authService.session(),
  });
};

export const CurrentSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isLoading } = useSession();

  if (isLoading) return <Loading />;

  return <CurrentSessionContext.Provider value={session}>{children}</CurrentSessionContext.Provider>;
};

export const useCurrentSession = () => {
  if (!useContext(CurrentSessionContext)) {
    throw new Error('useCurrentSession must be used within a CurrentSessionContextProvider');
  }
  return useContext(CurrentSessionContext);
};
