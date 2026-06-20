import { useMemo, useState } from 'react'
import {
  employmentTypeBadgeClass,
  formatDate,
  formatNumber,
  formatPct,
  formatUSD,
  statusBadgeClass,
} from '../utils/format'
import { EMPLOYMENT_TYPES, WORK_MODES, isReductionCandidate } from '../utils/metrics'

const COLUMNS = [
  { key: 'employee_id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  { key: 'join_date', label: 'Join Date' },
  { key: 'employment_type', label: 'Employment' },
  { key: 'work_mode', label: 'Work Mode' },
  { key: 'target_revenue_usd', label: 'Target Revenue' },
  { key: 'current_revenue_usd', label: 'Current Revenue' },
  { key: 'achievement_pct', label: 'Achievement' },
  { key: 'status', label: 'Status' },
  { key: 'customer_visits', label: 'Visits' },
  { key: 'new_customers', label: 'New Customers' },
  { key: 'units_sold_kg', label: 'Units Sold (kg)' },
  { key: 'attendance_pct', label: 'Attendance' },
  { key: 'performance_score', label: 'Perf. Score' },
  { key: 'goal_achieved', label: 'Goal Achieved' },
]

const STATUS_OPTIONS = ['Exceeded', 'On Track', 'Below Target']

function renderCell(key, employee) {
  const value = employee[key]
  switch (key) {
    case 'target_revenue_usd':
    case 'current_revenue_usd':
      return formatUSD(value)
    case 'achievement_pct':
    case 'attendance_pct':
      return formatPct(value)
    case 'customer_visits':
    case 'new_customers':
      return value ?? '—'
    case 'units_sold_kg':
      return value != null ? `${formatNumber(value)} kg` : '—'
    case 'join_date':
      return formatDate(value)
    case 'performance_score':
      return value.toFixed(1)
    case 'employment_type':
      return (
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${employmentTypeBadgeClass(value)}`}>
          {value}
        </span>
      )
    case 'status':
      return value ? (
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(value)}`}>
          {value}
        </span>
      ) : (
        <span className="text-slate-400">—</span>
      )
    case 'goal_achieved':
      return value ? (
        <span className="text-emerald-600">✓ Yes</span>
      ) : (
        <span className="text-rose-500">✕ No</span>
      )
    case 'name':
      return (
        <span className="inline-flex items-center gap-1.5">
          {value}
          {isReductionCandidate(employee) && (
            <span title="Reduction candidate: performance score < 3.0 or achievement < 80%">⚠️</span>
          )}
        </span>
      )
    default:
      return value ?? '—'
  }
}

export default function EmployeeTable({ employees, showSalary }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('All')
  const [workModeFilter, setWorkModeFilter] = useState('All')
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' })

  const columns = showSalary
    ? [...COLUMNS, { key: 'salary_monthly_usd', label: 'Salary (USD)' }]
    : COLUMNS

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      if (statusFilter !== 'All' && e.status !== statusFilter) return false
      if (employmentTypeFilter !== 'All' && e.employment_type !== employmentTypeFilter) return false
      if (workModeFilter !== 'All' && e.work_mode !== workModeFilter) return false
      return true
    })
  }, [employees, statusFilter, employmentTypeFilter, workModeFilter])

  const sorted = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'string') {
        return sort.direction === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sort.direction === 'asc' ? av - bv : bv - av
    })
    return list
  }, [filtered, sort])

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    )
  }

  return (
    <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">All Employees ({sorted.length})</h3>
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-slate-200 text-sm px-2 py-1 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={employmentTypeFilter}
            onChange={(e) => setEmploymentTypeFilter(e.target.value)}
            className="rounded-md border border-slate-200 text-sm px-2 py-1 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="All">All Employment Types</option>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="rounded-md border border-slate-200 text-sm px-2 py-1 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="All">All Work Modes</option>
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-indigo-600"
                >
                  {col.label}
                  {sort.key === col.key && (
                    <span className="ml-1 text-indigo-500">{sort.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((employee) => (
              <tr
                key={employee.employee_id}
                className={`hover:bg-slate-50 ${
                  isReductionCandidate(employee) ? 'border-l-2 border-l-rose-400 bg-rose-50/40' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 whitespace-nowrap text-slate-700">
                    {renderCell(col.key, employee)}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-slate-400">
                  No employees match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-2 text-xs text-slate-400 border-t border-slate-100">
        ⚠️ next to a name = reduction candidate (performance score below 3.0, or achievement below 80%).
      </p>
    </section>
  )
}
