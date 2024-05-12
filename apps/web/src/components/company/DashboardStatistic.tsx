'use client';

import { useQuery } from '@tanstack/react-query';
import StatisticCard from './lists/StatisticCard';
import { companyService } from '@/service/company-service';
import Loading from '@/app/(root)/loading';

export default function DashboardStatistic() {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['company-statistic'],
    queryFn: () => companyService.getCompanyStatistics(),
  });

  if (isLoading) return <Loading />;

  return (
    <section className="flex flex-col w-full gap-4 bg-background rounded-md p-4 transition-all">
      <h1 className="text-xl font-semibold text-foreground/80">Statistic</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticCard title="Total Jobs" link="/company/jobs">
          <span className="text-6xl font-semibold">{statistics?.totalJobs}</span>
          <p className="text-sm">Jobs Posted</p>
        </StatisticCard>
        <StatisticCard title="Total Application" link="/company/application">
          <span className="text-6xl font-semibold">{statistics?.totalApplications}</span>
          <p className="text-sm">Candidate Applied</p>
        </StatisticCard>
        <StatisticCard title="Interview" link="/company/interview">
          <span className="text-6xl font-semibold">{statistics?.totalInterviews}</span>
          <p className="text-sm">Interview Scheduled</p>
        </StatisticCard>
      </div>
    </section>
  );
}
