import { formatNumber, formatUSD } from '../utils/format'

export default function OfficeCostPanel({ office, currentRent, setCurrentRent, proposedRent, setProposedRent }) {
  const saving = proposedRent !== '' && !Number.isNaN(Number(proposedRent))
    ? currentRent - Number(proposedRent)
    : null

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-slate-700">A. Office Rent</h3>

      <div className="rounded-md bg-amber-50 ring-1 ring-amber-200 px-3 py-2 text-xs text-amber-800">
        ⚠️ Rent saat ini (${formatNumber(office.current.monthly_rent_usd)}/bulan untuk {office.current.area_sqm} m²)
        terlihat tidak wajar — kemungkinan typo (RUB vs USD, atau angka tahunan). Konfirmasi ke Acting CEO sebelum
        memakai angka saving di bawah untuk keputusan apapun.
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs text-slate-400 mb-2">Current</p>
          <p className="text-slate-600">Area: {office.current.area_sqm} m²</p>
          <label className="block mt-2 text-xs text-slate-400">Monthly Rent (USD)</label>
          <input
            type="number"
            value={currentRent}
            onChange={(e) => setCurrentRent(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p className="text-slate-600 mt-2">Avg Daily Attendance: {office.current.avg_daily_attendance}</p>
          <p className="text-slate-600">Utilization Rate: {office.current.utilization_rate_pct}%</p>
        </div>

        <div className="rounded-md bg-indigo-50 p-3">
          <p className="text-xs text-indigo-400 mb-2">Proposed</p>
          <p className="text-slate-600">Area: {office.proposed.area_sqm} m²</p>
          <p className="text-slate-600">Function: {office.proposed.function}</p>
          <p className="text-slate-600">System: {office.proposed.work_system}</p>
          <p className="text-slate-600">Capacity: {office.proposed.capacity}</p>
          <label className="block mt-2 text-xs text-indigo-400">Monthly Rent (USD)</label>
          <input
            type="number"
            placeholder="enter quote"
            value={proposedRent}
            onChange={(e) => setProposedRent(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="rounded-md bg-emerald-50 ring-1 ring-emerald-200 px-3 py-2 flex items-center justify-between">
        <span className="text-sm text-emerald-700 font-medium">Potential Monthly Saving</span>
        <span className="text-lg font-semibold text-emerald-700">
          {saving === null ? 'enter proposed rent' : formatUSD(saving)}
        </span>
      </div>
    </div>
  )
}
