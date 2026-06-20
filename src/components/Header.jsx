import { DEPARTMENTS } from '../utils/metrics'

export default function Header({
  department,
  setDepartment,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  showSalary,
  setShowSalary,
}) {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200">Kapal Api &middot; Russia Branch</p>
            <h1 className="text-xl sm:text-2xl font-semibold">Employee Performance Dashboard</h1>
            <p className="text-sm text-indigo-200 mt-0.5">Demo view — dummy data, monitoring karyawan vs target</p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col">
              <label className="text-[11px] text-indigo-200 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="rounded-md bg-white/95 text-slate-700 text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-white/60"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] text-indigo-200 mb-1">Joined From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="rounded-md bg-white/95 text-slate-700 text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] text-indigo-200 mb-1">Joined To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="rounded-md bg-white/95 text-slate-700 text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowSalary((v) => !v)}
              className={`rounded-md text-sm px-3 py-1.5 font-medium transition-colors ${
                showSalary
                  ? 'bg-amber-400 text-amber-950 hover:bg-amber-300'
                  : 'bg-white/15 text-white hover:bg-white/25 ring-1 ring-inset ring-white/30'
              }`}
            >
              {showSalary ? '🔓 Hide Salary Data' : '🔒 Show Salary Data'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
