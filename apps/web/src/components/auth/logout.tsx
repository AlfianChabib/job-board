'use client';

import React from 'react';
import { Button } from '../ui/button';
import { authService } from '@/service/auth-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logOut(),
    onSuccess: () => {
      queryClient.resetQueries();
      localStorage.removeItem('accessToken');
      router.push('/');
    },
  });

  return (
    <Button onClick={() => mutate()} className="w-full">
      Logout
    </Button>
  );
}
