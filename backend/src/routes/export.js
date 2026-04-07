import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

// GET /api/export/powerbi — returns all data in a flat structure suitable for Power BI / Excel
router.get('/powerbi', (req, res) => {
  res.json({
    exportedAt: new Date().toISOString(),
    kpis: {
      activeCards: 1247,
      totalGallons: 892400,
      totalTransactions: 14823,
      avgGallonsPerCard: 715,
      grossRevenue: 187200,
      netProfit: 43100,
      retentionRate: 84,
      newCards: 23,
    },
    transactions: mockDb.transactions,
    employees: mockDb.employees.map(e => ({
      id: e.id,
      name: e.name,
      role: e.role,
      team: e.team,
      cardsSold: e.cardsSold,
      activeCards: e.activeCards,
      gallonsGenerated: e.gallonsGenerated,
      revenue: e.revenue,
      usageRate: e.usageRate,
    })),
    customers: mockDb.customers,
    fuelPrices: mockDb.fuelPrices,
    financePL: mockDb.financePL,
    invoices: mockDb.invoices,
  })
})

export default router
