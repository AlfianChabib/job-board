import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import JobsList from '@/components/company/lists/JobsList';

export default function Jobs() {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <h1>Jobs</h1>
        <JobsList />
      </div>
    </MaxWidthWrapper>
  );
}
