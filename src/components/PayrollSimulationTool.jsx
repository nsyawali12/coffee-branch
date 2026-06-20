import { useMemo, useState } from 'react'
import { formatUSD } from '../utils/format'
import { isReductionCandidate } from '../utils/metrics'

export default function PayrollSimulationTool({ employees, showSalary }) {
  const [uncheckedIds, setUncheckedIds] = useState(() => new Set())
  const [reductionOnly, setReductionOnly] = useState(false)

  const visibleEmployees = useMemo(
    () => (reductionOnly ? employees.filter(isReductionCandidate) : employees),
    [employees, reductionOnly],
  )

  const totalCurrent = employees.reduce((s, e) => s + e.salary_monthly_usd, 0)
  const totalAfter = employees.reduce(
    (s, e) => (uncheckedIds.has(e.employee_id) ? s : s + e.salary_monthly_usd),
    0,
  )
  const savingMonthly = totalCurrent - totalAfter
  const savingYearly = savingMonthly * 12

  function toggleEmployee(id) {
    setUncheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (!showSalary) {
    return (
      <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-8 text-center text-slate-400">
        🔒 Payroll Simulation Tool contains salary data — click <span className="font-medium text-slate-500 dark:text-slate-300">&quot;Show Salary Data&quot;</span> in the header to use it.
      </section>
    )
  }

  return (
    <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-700 rounded-t-xl">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Payroll Simulation Tool</h3>
        <button
          type="button"
          onClick={() => setReductionOnly((v) => !v)}
          className={`rounded-md text-xs font-medium px-3 py-1.5 transition-colors ${
            reductionOnly
              ? 'bg-rose-500 text-white hover:bg-rose-400'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {reductionOnly ? '✕ Showing Reduction Candidates Only' : 'Show Reduction Candidates Only'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Include</th>
              <th className="px-3 py-2 text-left font-medium">Name</th>
              <th className="px-3 py-2 text-left font-medium">Department</th>
              <th className="px-3 py-2 text-left font-medium">Position</th>
              <th className="px-3 py-2 text-left font-medium">Salary (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {visibleEmployees.map((employee) => {
              const checked = !uncheckedIds.has(employee.employee_id)
              const flagged = isReductionCandidate(employee)
              return (
                <tr
                  key={employee.employee_id}
                  className={flagged ? 'border-l-2 border-l-rose-400 bg-rose-50/40 dark:bg-rose-950/30' : ''}
                >
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEmployee(employee.employee_id)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                    {employee.name} {flagged && <span title="Reduction candidate">⚠️</span>}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{employee.department}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{employee.position}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                    {formatUSD(employee.salary_monthly_usd)}
                  </td>
                </tr>
              )
            })}
            {visibleEmployees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
                  No employees match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-wrap gap-4 justify-between rounded-b-xl shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <div>
          <p className="text-xs text-slate-400">Total Payroll Now</p>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{formatUSD(totalCurrent)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Payroll After Simulation</p>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{formatUSD(totalAfter)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Saving / Month</p>
          <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">{formatUSD(savingMonthly)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Saving / Year</p>
          <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">{formatUSD(savingYearly)}</p>
        </div>
      </div>
    </section>
  )
}
