export default function KpiCard({ label, value, sublabel, accent = 'indigo', locked = false }) {
  const accentBar = {
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }[accent]

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col gap-1">
      <span className={`absolute left-0 top-0 h-full w-1 ${accentBar}`} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {locked && <span className="text-[10px] text-amber-600">🔒 hidden</span>}
      </div>
      <span className="text-2xl font-semibold text-slate-800">{value}</span>
      {sublabel && <span className="text-xs text-slate-400">{sublabel}</span>}
    </div>
  )
}
