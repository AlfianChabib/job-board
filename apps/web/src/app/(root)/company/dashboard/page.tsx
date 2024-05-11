import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import DashboardHeader from '@/components/company/DashboardHeader';
import DashboardMain from '@/components/company/DashboardMain';
import DashboardStatistic from '@/components/company/DashboardStatistic';

export default function Dashboard() {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <DashboardHeader />
        <DashboardStatistic />
        <DashboardMain />
      </div>
    </MaxWidthWrapper>
  );
}
