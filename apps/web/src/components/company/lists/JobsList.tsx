'use client';

import { useQuery } from '@tanstack/react-query';
import JobsTable from './jobs-table';
import { jobService } from '@/service/job-service';
import Loading from '@/app/(root)/loading';
import { jobsColumns } from './columns';

export default function JobsList() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['company-jobs'],
    queryFn: () => jobService.getJobs(),
  });

  return (
    <div className="bg-background">
      {isLoading && <Loading />}
      {jobs && <JobsTable data={jobs} columns={jobsColumns} />}
    </div>
  );
}
