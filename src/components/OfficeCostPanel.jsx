import { formatNumber, formatUSD } from '../utils/format'

export default function OfficeCostPanel({ office, currentRent, setCurrentRent, proposedRent, setProposedRent }) {
  const saving = proposedRent !== '' && !Number.isNaN(Number(proposedRent))
    ? currentRent - Number(proposedRent)
    : null

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-4 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">A. Office Rent</h3>

      <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 ring-1 ring-amber-200 dark:ring-amber-800 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
        ⚠️ Current rent (${formatNumber(office.current.monthly_rent_usd)}/month for {office.current.area_sqm} m²)
        looks off — possibly a typo (RUB vs USD, or an annual figure). Confirm with the Acting CEO before
        using the saving figure below for any decision.
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 dark:bg-slate-700/50 p-3">
          <p className="text-xs text-slate-400 dark:text-slate-400 mb-2">Current</p>
          <p className="text-slate-600 dark:text-slate-300">Area: {office.current.area_sqm} m²</p>
          <label className="block mt-2 text-xs text-slate-400 dark:text-slate-400">Monthly Rent (USD)</label>
          <input
            type="number"
            value={currentRent}
            onChange={(e) => setCurrentRent(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p className="text-slate-600 dark:text-slate-300 mt-2">Avg Daily Attendance: {office.current.avg_daily_attendance}</p>
          <p className="text-slate-600 dark:text-slate-300">Utilization Rate: {office.current.utilization_rate_pct}%</p>
        </div>

        <div className="rounded-md bg-indigo-50 dark:bg-indigo-950/30 p-3">
          <p className="text-xs text-indigo-400 dark:text-indigo-300 mb-2">Proposed</p>
          <p className="text-slate-600 dark:text-slate-300">Area: {office.proposed.area_sqm} m²</p>
          <p className="text-slate-600 dark:text-slate-300">Function: {office.proposed.function}</p>
          <p className="text-slate-600 dark:text-slate-300">System: {office.proposed.work_system}</p>
          <p className="text-slate-600 dark:text-slate-300">Capacity: {office.proposed.capacity}</p>
          <label className="block mt-2 text-xs text-indigo-400 dark:text-indigo-300">Monthly Rent (USD)</label>
          <input
            type="number"
            placeholder="enter quote"
            value={proposedRent}
            onChange={(e) => setProposedRent(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200 dark:ring-emerald-800 px-3 py-2 flex items-center justify-between">
        <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Potential Monthly Saving</span>
        <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
          {saving === null ? 'enter proposed rent' : formatUSD(saving)}
        </span>
      </div>
    </div>
  )
}
