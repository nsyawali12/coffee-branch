import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { sortedManagersByRevenue, revenueColorCategory, REVENUE_COLOR_HEX, shortName } from '../utils/salesMetrics'
import { chartAxisColor, chartGridColor, chartTooltipStyle, formatRUB } from '../utils/format'

export default function SalesManagerRevenueChart({ data, darkMode }) {
  const managers = sortedManagersByRevenue(data)
  const chartData = managers.map((m) => ({
    label: shortName(m.name),
    fullName: m.name,
    revenue: m.total_revenue_rub,
    color: REVENUE_COLOR_HEX[revenueColorCategory(m.vs_average_pct)],
  }))
  const avg = data.meta.average_revenue_per_manager_rub
  const axisColor = chartAxisColor(darkMode)
  const gridColor = chartGridColor(darkMode)
  const tooltipStyle = chartTooltipStyle(darkMode)

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
        Revenue by Manager (Jan – Jun 2026)
      </h3>
      <p className="text-xs text-slate-400 mb-2">
        🟢 ≥ 100% of average &nbsp; 🟡 50–99% &nbsp; 🔴 &lt; 50% — dashed line = average revenue per manager
      </p>
      <div style={{ height: Math.max(managers.length * 30, 400) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: axisColor }}
              tickFormatter={(v) => `₽${(v / 1e6).toFixed(0)}M`}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={110}
              tick={{ fontSize: 10, fill: axisColor }}
              interval={0}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => formatRUB(value)}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName ?? label}
            />
            <ReferenceLine
              x={avg}
              stroke={axisColor}
              strokeDasharray="4 4"
              label={{ value: 'Average', position: 'top', fill: axisColor, fontSize: 10 }}
            />
            <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.fullName} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
