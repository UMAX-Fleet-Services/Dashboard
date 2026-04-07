import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

router.get('/', (req, res) => {
  const latest = mockDb.fuelPrices[mockDb.fuelPrices.length - 1]

  res.json({
    business: {
      name: 'UMAX Fleet Services',
      currentMonth: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      totalCards: 1247,
      totalGallons: 892400,
      grossRevenue: 187200,
      netProfit: 43100,
      retentionRate: 84,
    },
    fuelPrices: {
      current: latest,
      bestVendor: 'Loves',
      bestDiscount: 0.42,
    },
    topEmployees: mockDb.employees.slice(0, 3).map(e => ({
      name: e.name,
      gallonsGenerated: e.gallonsGenerated,
      revenue: e.revenue,
    })),
    atRiskCustomers: mockDb.customers
      .filter(c => c.riskScore === 'high')
      .map(c => ({ id: c.id, company: c.company, lastActivity: c.lastActivity })),
    recentAlerts: mockDb.alerts.filter(a => !a.read),
    invoices: {
      overdueCount: mockDb.invoices.filter(i => i.status === 'overdue').length,
      overdueAmount: mockDb.invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
      pendingCount: mockDb.invoices.filter(i => i.status === 'pending').length,
    },
  })
})

export default router
