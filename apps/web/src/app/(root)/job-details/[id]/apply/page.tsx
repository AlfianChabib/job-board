import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import Image from 'next/image';
import Link from 'next/link';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UploadDocument from '@/components/apply/UploadDocument';
import { jobService } from '@/service/job-service';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ApplyProps {
  params: { id: string };
}

export default async function Apply({ params }: ApplyProps) {
  const job = await jobService.getJobId(params.id);

  return (
    <MaxWidthWrapper className="min-h-default max-w-3xl">
      <div className="flex items-center md:my-4 my-2 p-4 bg-background rounded-md mx-auto h-32 gap-4">
        <div className="rounded-md border-2 border-primary/50 overflow-hidden">
          <Image src={job.CompanyProfile.logo} alt={job.CompanyProfile.companyName} width={100} height={100} />
        </div>
        <div className="h-full flex flex-col justify-between">
          <p className="text-sm text-foreground/50">Applying for</p>
          <h1 className="text-2xl font-bold text-foreground/80">{job.title}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex w-max">
                <Link href={`/companies/${job.CompanyProfile.id}`} className="hover:underline underline-offset-2">
                  {job.CompanyProfile.companyName}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show company details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ProfileCard />
      <UploadDocument jobId={params.id} />
    </MaxWidthWrapper>
  );
}
