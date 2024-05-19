'use client';

import Loading from '@/app/(root)/loading';
import { companyService } from '@/service/company-service';
import { useQuery } from '@tanstack/react-query';
import CandidateTable from '../table/candidate-table';
import { candidateColumn } from './columns';

export default function CandidateList() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ['company-candidates'],
    queryFn: () => companyService.getCandidates(),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-background">{candidates && <CandidateTable data={candidates} columns={candidateColumn} />}</div>
  );
}
