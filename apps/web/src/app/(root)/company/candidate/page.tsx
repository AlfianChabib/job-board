'use client';

import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { companyService } from '@/service/company-service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '../../loading';
import CandidateList from '@/components/company/lists/CandidateList';

export default function Candidate() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => companyService.getCandidates(),
  });

  if (isLoading) return <Loading />;

  console.log(candidates);

  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <div className="flex w-full my-4 p-4 items-center justify-between bg-background rounded-md">
          <div>
            <h1 className="text-xl font-semibold text-foreground/80">Candidate List</h1>
            <p className="text-sm text-foreground/70">Manage your candidate here</p>
          </div>
          <Link href="/company/jobs" className={buttonVariants({ size: 'lg' })}>
            Jobs List
          </Link>
        </div>
      </div>
      <CandidateList />
    </MaxWidthWrapper>
  );
}
