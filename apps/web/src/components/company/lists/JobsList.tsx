'use client';

import { useQuery } from '@tanstack/react-query';
import JobsTable from '../table/jobs-table';
import Loading from '@/app/(root)/loading';
import { jobsColumns } from './columns';
import { companyService } from '@/service/company-service';

export default function JobsList() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['company-jobs'],
    queryFn: () => companyService.getCompanyJobs(),
  });

  if (isLoading) return <Loading />;

  return <div className="bg-background">{jobs && <JobsTable data={jobs} columns={jobsColumns} />}</div>;
}
