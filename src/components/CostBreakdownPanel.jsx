import { useState } from 'react'
import OfficeCostPanel from './OfficeCostPanel'
import PayrollByDepartmentChart from './PayrollByDepartmentChart'
import HrOutsourcingPanel from './HrOutsourcingPanel'
import WorkModeDistributionChart from './WorkModeDistributionChart'
import { computeKpis } from '../utils/metrics'
import { formatPct, formatUSD } from '../utils/format'

export default function CostBreakdownPanel({ employees, operationalCost, showSalary }) {
  const [currentRent, setCurrentRent] = useState(operationalCost.office.current.monthly_rent_usd)
  const [proposedRent, setProposedRent] = useState(operationalCost.office.proposed.monthly_rent_usd ?? '')
  const [flcQuote, setFlcQuote] = useState(operationalCost.hr_outsourcing.flc_estimated_monthly_cost_usd ?? '')

  if (!showSalary) {
    return (
      <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-8 text-center text-slate-400">
        🔒 Cost Breakdown Panel berisi data payroll &amp; rent — klik <span className="font-medium text-slate-500">&quot;Show Salary Data&quot;</span> di header untuk melihatnya.
      </section>
    )
  }

  const { totalPayroll } = computeKpis(employees)
  const totalOperationalCost = currentRent + totalPayroll
  const rentSharePct = totalOperationalCost ? (currentRent / totalOperationalCost) * 100 : 0
  const payrollSharePct = totalOperationalCost ? (totalPayroll / totalOperationalCost) * 100 : 0

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Cost Breakdown — Total Monthly Operational Cost</h2>
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <p className="text-2xl font-semibold text-slate-800">{formatUSD(totalOperationalCost)}</p>
            <p className="text-xs text-slate-400">rent + total payroll</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex h-2 rounded-full overflow-hidden bg-slate-100">
              <div className="bg-amber-400" style={{ width: `${rentSharePct}%` }} />
              <div className="bg-indigo-500" style={{ width: `${payrollSharePct}%` }} />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-slate-500">
              <span>🟧 Office Rent — {formatPct(rentSharePct)}</span>
              <span>🟦 Payroll — {formatPct(payrollSharePct)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OfficeCostPanel
          office={operationalCost.office}
          currentRent={currentRent}
          setCurrentRent={setCurrentRent}
          proposedRent={proposedRent}
          setProposedRent={setProposedRent}
        />
        <PayrollByDepartmentChart employees={employees} />
        <HrOutsourcingPanel
          hrOutsourcing={operationalCost.hr_outsourcing}
          flcQuote={flcQuote}
          setFlcQuote={setFlcQuote}
        />
        <WorkModeDistributionChart employees={employees} />
      </div>
    </section>
  )
}
