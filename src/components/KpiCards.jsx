import KpiCard from './KpiCard'
import { computeKpis } from '../utils/metrics'
import { formatPct, formatUSD } from '../utils/format'

export default function KpiCards({ employees, showSalary }) {
  const kpis = computeKpis(employees)

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <KpiCard
        label="Avg Performance Score"
        value={kpis.total ? kpis.avgPerformance.toFixed(2) : '—'}
        sublabel="scale 1 - 5"
        accent="indigo"
      />
      <KpiCard
        label="Total Revenue Achievement"
        value={formatPct(kpis.revenueAchievementPct)}
        sublabel={`${formatUSD(kpis.totalCurrent)} / ${formatUSD(kpis.totalTarget)}`}
        accent="violet"
      />
      <KpiCard
        label="High-performing Employees"
        value={formatPct(kpis.highPerformerRatio)}
        sublabel="score ≥ 4.0"
        accent="sky"
      />
      <KpiCard
        label="Avg Attendance Rate"
        value={formatPct(kpis.avgAttendance)}
        sublabel="this month"
        accent="blue"
      />
      <KpiCard
        label="Total Monthly Payroll"
        value={showSalary ? formatUSD(kpis.totalPayroll) : '••••••'}
        sublabel={showSalary ? 'all employees' : 'click "Show Salary Data"'}
        accent="amber"
        locked={!showSalary}
      />
      <KpiCard
        label="Cost per Revenue"
        value={showSalary ? formatPct(kpis.costPerRevenuePct) : '••••••'}
        sublabel={showSalary ? 'sales payroll / sales revenue' : 'click "Show Salary Data"'}
        accent="rose"
        locked={!showSalary}
      />
    </section>
  )
}
