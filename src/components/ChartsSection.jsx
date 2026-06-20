import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  goalAchievementData,
  revenueByExecutiveData,
  avgPerformanceByDepartment,
} from '../utils/metrics'
import { DEPARTMENT_COLORS, chartAxisColor, chartGridColor, chartTooltipStyle, formatUSD } from '../utils/format'

const GOAL_COLORS = ['#6366f1', '#e2e8f0']

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  )
}

export default function ChartsSection({ employees, darkMode }) {
  const goalData = goalAchievementData(employees)
  const revenueData = revenueByExecutiveData(employees)
  const deptScoreData = avgPerformanceByDepartment(employees)
  const axisColor = chartAxisColor(darkMode)
  const gridColor = chartGridColor(darkMode)
  const tooltipStyle = chartTooltipStyle(darkMode)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartCard title="Goal Achievement Rate">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={goalData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {goalData.map((entry, index) => (
                <Cell key={entry.name} fill={GOAL_COLORS[index % GOAL_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend verticalAlign="bottom" height={24} wrapperStyle={{ color: axisColor }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Revenue Target vs Current (Sales Executives)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: axisColor }}
              tickFormatter={(name) => name.split(' ')[0]}
              interval={0}
            />
            <YAxis tick={{ fontSize: 10, fill: axisColor }} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(value) => formatUSD(value)} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: axisColor }} />
            <Bar dataKey="target" name="Target" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current" name="Current" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Avg Performance Score by Department">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deptScoreData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="department" tick={{ fontSize: 11, fill: axisColor }} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: axisColor }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="avgScore" name="Avg Score" radius={[4, 4, 0, 0]}>
              {deptScoreData.map((entry) => (
                <Cell key={entry.department} fill={DEPARTMENT_COLORS[entry.department]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}
