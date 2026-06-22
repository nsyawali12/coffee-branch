export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export function shortName(fullName) {
  const parts = fullName.split(' ').filter(Boolean)
  if (parts.length <= 1) return fullName
  const initials = parts.slice(1).map((p) => `${p[0]}.`).join('')
  return `${parts[0]} ${initials}`
}

export function computeSalesKpis(data) {
  const managers = data.sales_managers
  const totalRevenue = managers.reduce((s, m) => s + m.total_revenue_rub, 0)
  const avgRevenuePerManager = data.meta.average_revenue_per_manager_rub
  const topPerformer = managers.reduce(
    (top, m) => (m.total_revenue_rub > top.total_revenue_rub ? m : top),
    managers[0],
  )
  const reviewCandidatesCount = managers.filter(
    (m) => m.review_candidate && m.employment_type === 'Internal',
  ).length

  return { totalRevenue, avgRevenuePerManager, topPerformer, reviewCandidatesCount }
}

export function sortedManagersByRevenue(data) {
  return [...data.sales_managers].sort((a, b) => b.total_revenue_rub - a.total_revenue_rub)
}

export function revenueColorCategory(vsAveragePct) {
  if (vsAveragePct >= 100) return 'green'
  if (vsAveragePct >= 50) return 'yellow'
  return 'red'
}

export const REVENUE_COLOR_HEX = {
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#f43f5e',
}

export function topNMonthlyTrend(data, n = 5) {
  const top = sortedManagersByRevenue(data).slice(0, n)
  const rows = MONTHS.map((month) => {
    const row = { month }
    top.forEach((m) => {
      row[shortName(m.name)] = m.monthly[month]?.rev ?? 0
    })
    return row
  })
  return { rows, keys: top.map((m) => shortName(m.name)) }
}

/**
 * Approximates tenure/recency from monthly activity since join_date isn't in this dataset.
 * firstActiveMonth = earliest month with a recorded sale (lower-bound tenure proxy).
 * tenureMonths = months from firstActiveMonth through Jun (the most recent month).
 * monthsSinceLastSale = 0 if they sold in Jun, higher = longer gone quiet.
 */
export function activityWindow(manager) {
  const activeIndexes = MONTHS.map((month, i) => (manager.monthly[month]?.qty > 0 ? i : null)).filter(
    (i) => i !== null,
  )
  const lastIndex = MONTHS.length - 1
  if (activeIndexes.length === 0) {
    return { firstActiveMonth: null, lastActiveMonth: null, tenureMonths: 0, monthsWithSales: 0, monthsSinceLastSale: null }
  }
  const firstIndex = activeIndexes[0]
  const lastActiveIndex = activeIndexes[activeIndexes.length - 1]
  return {
    firstActiveMonth: MONTHS[firstIndex],
    lastActiveMonth: MONTHS[lastActiveIndex],
    tenureMonths: lastIndex - firstIndex + 1,
    monthsWithSales: activeIndexes.length,
    monthsSinceLastSale: lastIndex - lastActiveIndex,
  }
}

export function reviewCandidates(data) {
  const candidates = data.sales_managers
    .filter((m) => m.review_candidate && m.employment_type === 'Internal')
    .map((m) => ({ ...m, activity: activityWindow(m) }))

  candidates.sort((a, b) => {
    if (b.activity.tenureMonths !== a.activity.tenureMonths) {
      return b.activity.tenureMonths - a.activity.tenureMonths
    }
    if (a.activity.monthsWithSales !== b.activity.monthsWithSales) {
      return a.activity.monthsWithSales - b.activity.monthsWithSales
    }
    return a.total_revenue_rub - b.total_revenue_rub
  })

  return candidates
}
