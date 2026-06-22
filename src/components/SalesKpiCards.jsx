import KpiCard from './KpiCard'
import { computeSalesKpis, shortName } from '../utils/salesMetrics'
import { formatRUB } from '../utils/format'

export default function SalesKpiCards({ data }) {
  const { totalRevenue, avgRevenuePerManager, topPerformer, reviewCandidatesCount } = computeSalesKpis(data)

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Total Revenue YTD" value={formatRUB(totalRevenue)} sublabel={data.meta.period} accent="indigo" />
      <KpiCard
        label="Average Revenue per Manager"
        value={formatRUB(avgRevenuePerManager)}
        sublabel={`${data.meta.total_managers} managers`}
        accent="violet"
      />
      <KpiCard
        label="Top Performer"
        value={shortName(topPerformer.name)}
        sublabel={formatRUB(topPerformer.total_revenue_rub)}
        accent="sky"
      />
      <KpiCard
        label="Review Candidates"
        value={reviewCandidatesCount}
        sublabel="Internal, < 50% of average"
        accent="rose"
      />
    </section>
  )
}
