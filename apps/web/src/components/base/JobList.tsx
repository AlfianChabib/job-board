'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { jobService } from '@/service/job-service';
import JobSkeletonCard from './JobSkeletonCard';
import JobCard from './JobCard';
import Link from 'next/link';

export default function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const page = searchParams.get('page') || '';
  const keywords = searchParams.get('keywords') || '';
  const location = searchParams.get('location') || '';
  const classificationId = searchParams.get('classificationId') || '';
  const jobType = searchParams.get('jobType') || '';
  const sort = searchParams.get('sort') || '';
  const limit = searchParams.get('limit') || '';

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', page, keywords, location, classificationId, jobType, sort, limit],
    queryFn: () => jobService.jobsListFeature({ page, keywords, location, classificationId, jobType, limit, sort }),
  });

  const handleClick = (jobId: number) => {
    if (window.innerWidth < 768) {
      router.push(`/job-details/${jobId}`);
    } else {
      params.set('jobId', jobId.toString());
      router.replace(`?${params.toString()}#job-details`);
    }
  };

  return (
    <div className="flex flex-col col-span-2 gap-4">
      <div className="flex items-center justify-between px-4 py-2 border bg-background rounded-md">
        <h1 className="font-medium text-foreground/60">{jobs?.total} Jobs</h1>
      </div>
      <div className="flex relative flex-col items-center gap-4 min-h-jobs overflow-y-scroll">
        <div className="absolute flex flex-col w-full gap-4 top-0">
          {isLoading && <JobSkeletonCard length={10} />}
          {jobs?.data.map((job) => (
            <div key={job.id} onClick={() => handleClick(job.id)}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
