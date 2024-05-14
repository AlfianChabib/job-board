'use client';

import { Job } from '@/model/job';
import { Building, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="flex group flex-col w-full bg-background rounded-lg cursor-pointer p-2 md:p-4 gap-2 border-2 hover:border-primary transition-all">
      <Image
        src={job.CompanyProfile.logo}
        alt={job.CompanyProfile.companyName}
        width={50}
        height={50}
        className="rounded-xl"
      />
      <div>
        <h1 className="text-xl font-bold text-foreground/80 group-hover:underline underline-offset-4">{job.title}</h1>
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
        <div className="flex items-start gap-2">
          <Building size={18} />
          <div>
            <p>{job.classificationInfo.subClassification.title}</p>
            <p>({job.classificationInfo.classification.title})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
