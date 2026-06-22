import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { topNMonthlyTrend } from '../utils/salesMetrics'
import { chartAxisColor, chartGridColor, chartTooltipStyle, formatRUB } from '../utils/format'

const LINE_COLORS = ['#6366f1', '#0ea5e9', '#a855f7', '#10b981', '#f59e0b']

export default function SalesMonthlyTrendChart({ data, darkMode }) {
  const { rows, keys } = topNMonthlyTrend(data, 5)
  const axisColor = chartAxisColor(darkMode)
  const gridColor = chartGridColor(darkMode)
  const tooltipStyle = chartTooltipStyle(darkMode)

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
        Monthly Revenue Trend — Top 5 Managers
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor }} />
            <YAxis tick={{ fontSize: 10, fill: axisColor }} tickFormatter={(v) => `₽${(v / 1e6).toFixed(0)}M`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatRUB(value)} />
            <Legend wrapperStyle={{ color: axisColor, fontSize: 12 }} />
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={LINE_COLORS[index % LINE_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
