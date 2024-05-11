import StatisticCard from './lists/StatisticCard';

export default function DashboardStatistic() {
  return (
    <section className="flex flex-col w-full gap-4 bg-background rounded-md p-4">
      <h1 className="text-xl font-semibold text-foreground/80">Statistic</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticCard title="Total Jobs" link="/company/jobs">
          <span className="text-6xl font-semibold">18</span>
          <p className="text-sm">Jobs Posted</p>
        </StatisticCard>
        <StatisticCard title="Total Candidate" link="/company/candidate">
          <span className="text-6xl font-semibold">191</span>
          <p className="text-sm">Candidate Applied</p>
        </StatisticCard>
        <StatisticCard title="Employees" link="/company/jobs">
          <span className="text-6xl font-semibold">23</span>
          <p className="text-sm">Employee Registered</p>
        </StatisticCard>
      </div>
    </section>
  );
}
