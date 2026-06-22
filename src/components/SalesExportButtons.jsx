function toCsvValue(value) {
  const str = String(value ?? '')
  return `"${str.replace(/"/g, '""')}"`
}

function exportCsv(data) {
  const headers = [
    'ID',
    'Name',
    'Employment Type',
    'Total Qty',
    'Total Revenue (RUB)',
    'Active Months',
    'vs Average (%)',
    'Review Candidate',
    'Note',
  ]
  const rows = data.sales_managers.map((m) => [
    m.id,
    m.name,
    m.employment_type,
    m.total_qty,
    m.total_revenue_rub,
    m.active_months,
    m.vs_average_pct,
    m.review_candidate ? 'Yes' : 'No',
    m.note,
  ])
  const csv = [headers, ...rows].map((row) => row.map(toCsvValue).join(',')).join('\n')
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sales-managers-report.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function SalesExportButtons({ data }) {
  return (
    <section className="print:hidden flex flex-wrap gap-3 justify-end">
      <button
        type="button"
        onClick={() => exportCsv(data)}
        className="rounded-md text-sm px-4 py-2 font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 ring-1 ring-inset ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        ⬇️ Export CSV
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-md text-sm px-4 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
      >
        🖨️ Download Report (PDF)
      </button>
    </section>
  )
}
