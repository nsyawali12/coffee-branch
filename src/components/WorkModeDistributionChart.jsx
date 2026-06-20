import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { workModeDistribution } from '../utils/metrics'
import { WORK_MODE_COLORS } from '../utils/format'

export default function WorkModeDistributionChart({ employees }) {
  const data = workModeDistribution(employees)

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 mb-2">D. Work Mode Distribution</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="mode" innerRadius={45} outerRadius={75} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.mode} fill={WORK_MODE_COLORS[entry.mode]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={24} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
