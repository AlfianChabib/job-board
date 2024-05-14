'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { jobService } from '@/service/job-service';
import Loading from '@/app/(root)/loading';
import InitialJobDetails from './InitialJobDetails';
import JobDetails from './JobDetails';

export default function Job() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');

  return (
    <div className="md:flex hidden flex-col col-span-3 gap-4">
      {jobId ? <JobDetails jobId={jobId} /> : <InitialJobDetails />}
    </div>
  );
}
