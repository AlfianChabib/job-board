'use client';

import Loading from '@/app/(root)/loading';
import { userService } from '@/service/user-service';
import { useQuery } from '@tanstack/react-query';
import { Building2, Clock8, MapPin } from 'lucide-react';

export default function AppliedList() {
  const { data: appliedJobs, isLoading } = useQuery({
    queryKey: ['user-applied'],
    queryFn: () => userService.getAppliedJobs(),
  });

  if (isLoading) return <Loading />;

  console.log(appliedJobs);

  return (
    <div className="flex flex-col md:gap-4 gap-2 my-4">
      {appliedJobs?.map((applied, index) => (
        <div key={index} className="flex flex-col md:p-4 p-2 gap-2 border rounded-md">
          <h2 className="text-2xl font-semibold text-foreground/90">{applied.Job.title}</h2>
          <div className="text-foreground/80 space-y-1">
            <div className="flex gap-4 items-center">
              <Building2 size={20} />
              <p>{applied.Job.CompanyProfile.companyName}</p>
            </div>
            <div className="flex gap-4 items-center">
              <MapPin size={20} />
              <p>{applied.Job.location}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Clock8 size={20} />
              <p>{applied.Job.jobType}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <h3 className="text-foreground/70">Status :</h3>
            <p>{applied.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
