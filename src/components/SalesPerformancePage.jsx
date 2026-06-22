import SalesKpiCards from './SalesKpiCards'
import SalesManagerRevenueChart from './SalesManagerRevenueChart'
import SalesMonthlyTrendChart from './SalesMonthlyTrendChart'
import ReviewCandidatesTable from './ReviewCandidatesTable'
import SalesExportButtons from './SalesExportButtons'

export default function SalesPerformancePage({ data, darkMode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 ring-1 ring-amber-200 dark:ring-amber-800 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-300">
        💰 All revenue figures on this page are in <strong>Russian Ruble (RUB)</strong>, sourced from{' '}
        {data.meta.source} · Period: {data.meta.period}
      </div>

      <SalesKpiCards data={data} />
      <SalesManagerRevenueChart data={data} darkMode={darkMode} />
      <SalesMonthlyTrendChart data={data} darkMode={darkMode} />
      <ReviewCandidatesTable data={data} />
      <SalesExportButtons data={data} />
    </div>
  )
}
