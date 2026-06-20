import { formatUSD } from '../utils/format'

export default function HrOutsourcingPanel({ hrOutsourcing, flcQuote, setFlcQuote }) {
  const internalCost = hrOutsourcing.internal_hr_position.monthly_cost_usd
  const saving = flcQuote !== '' && !Number.isNaN(Number(flcQuote))
    ? internalCost - Number(flcQuote)
    : null

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-slate-700">C. HR Outsourcing (Internal vs FLC)</h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs text-slate-400 mb-1">Internal ({hrOutsourcing.internal_hr_position.role})</p>
          <p className="text-lg font-semibold text-slate-700">{formatUSD(internalCost)}</p>
          <p className="text-xs text-slate-400">per month</p>
        </div>

        <div className="rounded-md bg-violet-50 p-3">
          <p className="text-xs text-violet-400 mb-1">FLC (Outsource) Quote</p>
          <input
            type="number"
            placeholder="enter vendor quote"
            value={flcQuote}
            onChange={(e) => setFlcQuote(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-violet-400"
          />
          <p className="text-xs text-violet-400 mt-1">per month</p>
        </div>
      </div>

      <div
        className={`rounded-md px-3 py-2 flex items-center justify-between ring-1 ${
          saving === null
            ? 'bg-slate-50 ring-slate-200'
            : saving >= 0
              ? 'bg-emerald-50 ring-emerald-200'
              : 'bg-rose-50 ring-rose-200'
        }`}
      >
        <span className={`text-sm font-medium ${saving === null ? 'text-slate-500' : saving >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
          {saving === null ? 'Saving from switching to FLC' : saving >= 0 ? 'Saving from switching to FLC' : 'Extra cost if switching to FLC'}
        </span>
        <span className={`text-lg font-semibold ${saving === null ? 'text-slate-400' : saving >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
          {saving === null ? 'enter FLC quote' : formatUSD(Math.abs(saving))}
        </span>
      </div>
    </div>
  )
}
