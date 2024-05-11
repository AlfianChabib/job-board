import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import DashboardHeader from '@/components/company/DashboardHeader';
import DashboardMain from '@/components/company/DashboardMain';
import JobsList from '@/components/company/lists/JobsList';

export default function Dashboard() {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <DashboardHeader />
        <JobsList />
        <DashboardMain />
      </div>
    </MaxWidthWrapper>
  );
}
