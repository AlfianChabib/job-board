'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { companyService } from '@/service/company-service';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';

export default function ButtonAddJob() {
  const router = useRouter();
  const { data: companyCompleteness } = useQuery({
    queryKey: ['company-completeness'],
    queryFn: companyService.getCompanyCompleteness,
  });
  const handleAddJob = () => {
    if (companyCompleteness && companyCompleteness.strength < 5) {
      router.push('/company/account');
      toast.error('Please complete your profile first to create a job');
    } else {
      router.push('/company/jobs/create');
    }
  };
  return (
    <Button size="lg" onClick={handleAddJob}>
      Create a job
    </Button>
  );
}
