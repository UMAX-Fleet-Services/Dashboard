import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

router.get('/', (req, res) => {
  const period = req.query.period || 'month'

  const deltas = {
    week:    { activeCards: 0.8, totalGallons: 2.1, totalTransactions: 1.4, avgGallonsPerCard: -0.5, grossRevenue: 3.2, netProfit: -0.4, retentionRate: 0.1,  newCards: 5.0  },
    month:   { activeCards: 3.2, totalGallons: 8.7, totalTransactions: 5.1, avgGallonsPerCard: -2.1, grossRevenue: 12.4, netProfit: -1.8, retentionRate: -0.5, newCards: 15.0 },
    quarter: { activeCards: 9.4, totalGallons: 22.3,totalTransactions: 18.6,avgGallonsPerCard: -4.8, grossRevenue: 31.2, netProfit: 6.3,  retentionRate: 2.1,  newCards: 42.0 },
  }

  const d = deltas[period] || deltas.month

  res.json({
    period,
    activeCards:        { value: 1247,   delta: d.activeCards,        deltaType: d.activeCards        >= 0 ? 'up' : 'down', benchmark: 1300, criticalThreshold: 900 },
    totalGallons:       { value: 892400, delta: d.totalGallons,       deltaType: d.totalGallons       >= 0 ? 'up' : 'down', benchmark: 950000, criticalThreshold: 700000 },
    totalTransactions:  { value: 14823,  delta: d.totalTransactions,  deltaType: d.totalTransactions  >= 0 ? 'up' : 'down', benchmark: 16000, criticalThreshold: 10000 },
    avgGallonsPerCard:  { value: 715,    delta: d.avgGallonsPerCard,  deltaType: d.avgGallonsPerCard  >= 0 ? 'up' : 'down', benchmark: 600, criticalThreshold: 400 },
    grossRevenue:       { value: 187200, delta: d.grossRevenue,       deltaType: d.grossRevenue       >= 0 ? 'up' : 'down', benchmark: 200000, criticalThreshold: 150000 },
    netProfit:          { value: 43100,  delta: d.netProfit,          deltaType: d.netProfit          >= 0 ? 'up' : 'down', benchmark: 50000, criticalThreshold: 30000 },
    retentionRate:      { value: 84,     delta: d.retentionRate,      deltaType: d.retentionRate      >= 0 ? 'up' : 'down', benchmark: 90, criticalThreshold: 70 },
    newCards:           { value: 23,     delta: d.newCards,           deltaType: d.newCards           >= 0 ? 'up' : 'down', benchmark: 30, criticalThreshold: 10 },
    retentionFunnel: mockDb.retentionFunnel,
    alerts: mockDb.alerts,
  })
})

export default router
