import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OverviewPage } from './pages/OverviewPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { SalesPage } from './pages/SalesPage'
import { FinancePage } from './pages/FinancePage'
import { CardsPage } from './pages/CardsPage'
import { FuelPricesPage } from './pages/FuelPricesPage'
import { CustomersPage } from './pages/CustomersPage'
import { ReportsPage } from './pages/ReportsPage'
import { AIInsightsPage } from './pages/AIInsightsPage'
import { DocumentsPage } from './pages/DocumentsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/fuel-prices" element={<FuelPricesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai-insights" element={<AIInsightsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
