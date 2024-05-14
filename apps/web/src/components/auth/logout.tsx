'use client';

import React from 'react';
import { Button } from '../ui/button';
import { authService } from '@/service/auth-service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    authService.logOut().then(() => {
      queryClient.resetQueries();
      localStorage.removeItem('accessToken');
      router.push('/');
    });
  };

  return (
    <Button onClick={handleLogout} className="w-full">
      Logout
    </Button>
  );
}
