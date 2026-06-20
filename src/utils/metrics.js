export const DEPARTMENTS = ['Sales', 'Warehouse', 'Admin', 'Management']
export const EMPLOYMENT_TYPES = ['Internal', 'FLC']
export const WORK_MODES = ['Office', 'Hybrid', 'Remote']

export function filterEmployees(employees, { department, dateFrom, dateTo }) {
  return employees.filter((e) => {
    if (department && department !== 'All' && e.department !== department) return false
    if (dateFrom && e.join_date < dateFrom) return false
    if (dateTo && e.join_date > dateTo) return false
    return true
  })
}

export function isReductionCandidate(employee) {
  if (employee.performance_score < 3.0) return true
  if (employee.achievement_pct != null && employee.achievement_pct < 80) return true
  return false
}

export function computeKpis(employees) {
  const total = employees.length
  const avgPerformance = total
    ? employees.reduce((s, e) => s + e.performance_score, 0) / total
    : 0

  const salesWithTarget = employees.filter(
    (e) => e.department === 'Sales' && e.target_revenue_usd != null,
  )
  const totalTarget = salesWithTarget.reduce((s, e) => s + e.target_revenue_usd, 0)
  const totalCurrent = salesWithTarget.reduce((s, e) => s + e.current_revenue_usd, 0)
  const revenueAchievementPct = totalTarget ? (totalCurrent / totalTarget) * 100 : null

  const highPerformers = employees.filter((e) => e.performance_score >= 4.0).length
  const highPerformerRatio = total ? (highPerformers / total) * 100 : 0

  const avgAttendance = total
    ? employees.reduce((s, e) => s + e.attendance_pct, 0) / total
    : 0

  const totalPayroll = employees.reduce((s, e) => s + e.salary_monthly_usd, 0)

  const salesPayroll = employees
    .filter((e) => e.department === 'Sales')
    .reduce((s, e) => s + e.salary_monthly_usd, 0)
  const costPerRevenuePct = totalCurrent ? (salesPayroll / totalCurrent) * 100 : null

  return {
    total,
    avgPerformance,
    revenueAchievementPct,
    totalTarget,
    totalCurrent,
    highPerformerRatio,
    avgAttendance,
    totalPayroll,
    costPerRevenuePct,
    salesPayroll,
  }
}

export function goalAchievementData(employees) {
  const achieved = employees.filter((e) => e.goal_achieved).length
  const notAchieved = employees.length - achieved
  return [
    { name: 'Goal Achieved', value: achieved },
    { name: 'Not Achieved', value: notAchieved },
  ]
}

export function revenueByExecutiveData(employees) {
  return employees
    .filter((e) => e.department === 'Sales' && e.target_revenue_usd != null)
    .map((e) => ({
      name: e.name,
      target: e.target_revenue_usd,
      current: e.current_revenue_usd,
    }))
}

export function avgPerformanceByDepartment(employees) {
  return DEPARTMENTS.map((department) => {
    const list = employees.filter((e) => e.department === department)
    const avgScore = list.length
      ? Number((list.reduce((s, e) => s + e.performance_score, 0) / list.length).toFixed(2))
      : 0
    return { department, avgScore, count: list.length }
  }).filter((d) => d.count > 0)
}

export function payrollByDepartment(employees) {
  return DEPARTMENTS.map((department) => {
    const list = employees.filter((e) => e.department === department)
    const totalSalary = list.reduce((s, e) => s + e.salary_monthly_usd, 0)
    return { department, totalSalary, count: list.length }
  }).filter((d) => d.count > 0)
}

export function workModeDistribution(employees) {
  return WORK_MODES.map((mode) => ({
    mode,
    count: employees.filter((e) => e.work_mode === mode).length,
  })).filter((d) => d.count > 0)
}
