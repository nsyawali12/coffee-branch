import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { payrollByDepartment } from '../utils/metrics'
import { DEPARTMENT_COLORS, formatUSD } from '../utils/format'

export default function PayrollByDepartmentChart({ employees }) {
  const data = payrollByDepartment(employees)

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 mb-2">B. Payroll by Department</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="department" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(value) => formatUSD(value)} />
            <Bar dataKey="totalSalary" name="Total Salary" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.department} fill={DEPARTMENT_COLORS[entry.department]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
