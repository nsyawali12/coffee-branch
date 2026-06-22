import { reviewCandidates } from '../utils/salesMetrics'
import { formatRUB } from '../utils/format'

const RANK_STYLES = [
  'bg-rose-600 text-white',
  'bg-rose-500 text-white',
  'bg-orange-400 text-white',
  'bg-amber-400 text-amber-950',
  'bg-amber-300 text-amber-950',
]

export default function ReviewCandidatesTable({ data }) {
  const candidates = reviewCandidates(data)

  return (
    <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Review Candidates ({candidates.length}) — ranked by cut-off priority
        </h3>
        <p className="text-xs text-slate-400">
          Internal employees below 50% of average revenue, ranked by longest apparent tenure with the fewest
          months of sales first (ties broken by lowest revenue)
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2 text-left font-medium">#</th>
              <th className="px-3 py-2 text-left font-medium">Name</th>
              <th className="px-3 py-2 text-left font-medium">First Active</th>
              <th className="px-3 py-2 text-left font-medium">Tenure (mo.)</th>
              <th className="px-3 py-2 text-left font-medium">Months w/ Sales</th>
              <th className="px-3 py-2 text-left font-medium">Last Sale</th>
              <th className="px-3 py-2 text-left font-medium">Total Revenue (RUB)</th>
              <th className="px-3 py-2 text-left font-medium">vs Average</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {candidates.map((m, index) => (
              <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      RANK_STYLES[index] ?? 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{m.name}</td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {m.activity.firstActiveMonth ?? '—'}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {m.activity.tenureMonths}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {m.activity.monthsWithSales}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {m.activity.lastActiveMonth ?? '—'}
                  {m.activity.monthsSinceLastSale > 0 && (
                    <span className="text-rose-500"> ({m.activity.monthsSinceLastSale}mo silent)</span>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {formatRUB(m.total_revenue_rub)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      m.vs_average_pct < 50
                        ? 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-600/20'
                        : 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                    }`}
                  >
                    {m.vs_average_pct.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
            {candidates.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-slate-400">
                  No review candidates in this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700">
        Tenure and last-sale columns are estimated from monthly sales activity (Jan–Jun 2026), not actual join
        dates — this dataset has no join_date field, so "First Active" is a lower-bound proxy for how long
        someone has been around. Independent contractors (ИП) excluded from review. Single active month is
        still insufficient for a termination decision on its own — recommend manager follow-up and a 3-month
        minimum observation before action.
      </p>
    </section>
  )
}
