'use client';

import Loading from '@/app/(root)/loading';
import { companyService } from '@/service/company-service';
import { useQuery } from '@tanstack/react-query';
import InterviewTable from '../table/interview-table';
import { interviewColumn } from './columns';

export default function InterviewList() {
  const { data: interviews, isLoading } = useQuery({
    queryKey: ['company-interviews'],
    queryFn: () => companyService.getCompanyInterviews(),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-background">{interviews && <InterviewTable data={interviews} columns={interviewColumn} />}</div>
  );
}
