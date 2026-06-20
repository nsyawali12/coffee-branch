export function formatUSD(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPct(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(digits)}%`
}

export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const STATUS_STYLES = {
  Exceeded: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  'On Track': 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  'Below Target': 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-600/20',
}

export function statusBadgeClass(status) {
  return STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-400/20'
}

export const DEPARTMENT_COLORS = {
  Sales: '#6366f1',
  Warehouse: '#0ea5e9',
  Admin: '#a855f7',
  Management: '#4338ca',
}
