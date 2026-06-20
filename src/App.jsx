import { useMemo, useState } from 'react'
import employeesData from './data/employees.json'
import operationalCostData from './data/operational-cost.json'
import Header from './components/Header'
import KpiCards from './components/KpiCards'
import ChartsSection from './components/ChartsSection'
import EmployeeTable from './components/EmployeeTable'
import CostBreakdownPanel from './components/CostBreakdownPanel'
import PayrollSimulationTool from './components/PayrollSimulationTool'
import { filterEmployees } from './utils/metrics'

export default function App() {
  const [department, setDepartment] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showSalary, setShowSalary] = useState(false)

  const filteredEmployees = useMemo(
    () => filterEmployees(employeesData, { department, dateFrom, dateTo }),
    [department, dateFrom, dateTo],
  )

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        department={department}
        setDepartment={setDepartment}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        showSalary={showSalary}
        setShowSalary={setShowSalary}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <KpiCards employees={filteredEmployees} showSalary={showSalary} />
        <ChartsSection employees={filteredEmployees} />
        <EmployeeTable employees={filteredEmployees} showSalary={showSalary} />
        <CostBreakdownPanel
          employees={filteredEmployees}
          operationalCost={operationalCostData}
          showSalary={showSalary}
        />
        <PayrollSimulationTool employees={filteredEmployees} showSalary={showSalary} />

        <footer className="text-center text-xs text-slate-400 py-4">
          Kapal Api Russia Branch — Performance Dashboard Demo · Dummy data for illustration purposes only
        </footer>
      </main>
    </div>
  )
}
