'use client';

import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { jobService } from '@/service/job-service';
import Loading from '@/app/(root)/loading';
import Image from 'next/image';
import InitialJobDetails from './InitialJobDetails';
import { Building, Clock, MapPin } from 'lucide-react';

interface JobDetailsProps {
  jobId: string;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
  const { data: job, isLoading } = useQuery({
    queryKey: ['job-details', jobId],
    queryFn: () => jobService.getJobId(jobId),
  });

  const handleApply = (jobId: number) => {
    console.log('apply');
    // TODO: Apply
  };

  if (isLoading) return <Loading />;

  return (
    <div className="md:flex hidden flex-col col-span-3 gap-4">
      <div className="flex items-center justify-between px-4 py-2 border bg-background rounded-md" id="job-details">
        <Button variant="link" size="sm">
          Share
        </Button>
      </div>
      {job ? (
        <div className="flex relative flex-col items-center justify-center border bg-background min-h-jobs rounded-lg overflow-y-scroll">
          <div className="flex flex-col w-full absolute top-0 p-4 gap-4">
            <Image src={job.CompanyProfile.logo} alt="logo" width={100} height={100} className="rounded-xl" />
            <div>
              <h1 className="text-xl font-bold text-foreground/80 group-hover:underline underline-offset-4">
                {job.title}
              </h1>
              <p className="text-foreground/70 font-semibold text-sm">{job.CompanyProfile.companyName}</p>
            </div>
            <div className="flex flex-col gap-2 text-foreground/70 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <p>{job.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <p>{job.jobType}</p>
              </div>
              <div className="flex items-center gap-2">
                <Building size={18} />
                <p>
                  {job.classificationInfo.subClassification.title} ({job.classificationInfo.classification.title})
                </p>
              </div>
            </div>
            <div>
              <Button className="w-40" onClick={() => handleApply(job.id)}>
                Apply
              </Button>
            </div>
            <div className="flex flex-col">
              <h3 className="text-foreground/80 font-semibold">Description:</h3>
              <p className="text-foreground/70">{job.description}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-foreground/80 font-semibold">Requirements:</h3>
              <p className="text-foreground/70">{job.requirements}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-foreground/80 font-semibold">Be careful</h3>
              <p className="text-foreground/70">
                Don&apos;t give out your bank or credit card details when sending a job application.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <InitialJobDetails />
      )}
    </div>
  );
}
