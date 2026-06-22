import { useEffect, useMemo, useState } from 'react'
import employeesData from './data/employees.json'
import operationalCostData from './data/operational-cost.json'
import salesData from './data/sales-managers-real-data.json'
import Header from './components/Header'
import TabNav from './components/TabNav'
import KpiCards from './components/KpiCards'
import ChartsSection from './components/ChartsSection'
import EmployeeTable from './components/EmployeeTable'
import CostBreakdownPanel from './components/CostBreakdownPanel'
import PayrollSimulationTool from './components/PayrollSimulationTool'
import SalesPerformancePage from './components/SalesPerformancePage'
import { filterEmployees } from './utils/metrics'

export default function App() {
  const [activeTab, setActiveTab] = useState('employees')
  const [department, setDepartment] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showSalary, setShowSalary] = useState(false)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const filteredEmployees = useMemo(
    () => filterEmployees(employeesData, { department, dateFrom, dateTo }),
    [department, dateFrom, dateTo],
  )

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header
        activeTab={activeTab}
        department={department}
        setDepartment={setDepartment}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        showSalary={showSalary}
        setShowSalary={setShowSalary}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {activeTab === 'employees' ? (
          <>
            <KpiCards employees={filteredEmployees} showSalary={showSalary} />
            <ChartsSection employees={filteredEmployees} darkMode={darkMode} />
            <EmployeeTable employees={filteredEmployees} showSalary={showSalary} />
            <CostBreakdownPanel
              employees={filteredEmployees}
              operationalCost={operationalCostData}
              showSalary={showSalary}
              darkMode={darkMode}
            />
            <PayrollSimulationTool employees={filteredEmployees} showSalary={showSalary} />
          </>
        ) : (
          <SalesPerformancePage data={salesData} darkMode={darkMode} />
        )}

        <footer className="text-center text-xs text-slate-400 dark:text-slate-500 py-4 print:hidden">
          Kapal Api Russia Branch — Performance Dashboard Demo · Dummy data for illustration purposes only
        </footer>
      </main>
    </div>
  )
}
