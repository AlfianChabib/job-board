'use client';

import JobDetails from '@/components/base/JobDetails';
import JobList from '@/components/base/JobList';
import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import SearchContainer from '@/components/base/SearchContainer';
import { useCurrentSession } from '@/components/providers/session-provider';

export default function Home() {
  const session = useCurrentSession();

  console.log(session);

  return (
    <MaxWidthWrapper className="flex min-h-default flex-col py-4">
      <SearchContainer />
      <div className="grid md:grid-cols-5 grid-cols-2 gap-4 my-4">
        <JobList />
        <JobDetails />
      </div>
    </MaxWidthWrapper>
  );
}
