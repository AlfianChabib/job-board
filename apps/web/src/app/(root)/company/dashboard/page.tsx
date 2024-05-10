import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import DashboardHeader from '@/components/company/DashboardHeader';
import DashboardMain from '@/components/company/DashboardMain';

export default function Dashboard() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <DashboardMain />
      </div>
    </MaxWidthWrapper>
  );
}
