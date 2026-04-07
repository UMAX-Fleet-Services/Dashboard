import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

router.get('/', (req, res) => {
  const days    = Math.min(90, Math.max(1, parseInt(req.query.days || '30', 10)))
  const vendors = (req.query.vendors || 'loves,pilot,ta,fleetOne').split(',')

  const data = mockDb.fuelPrices.slice(-days).map(row => {
    const filtered = { date: row.date, dateLabel: row.dateLabel }
    vendors.forEach(v => {
      if (row[v] !== undefined) filtered[v] = row[v]
    })
    return filtered
  })

  // Current prices (latest day)
  const latest = data[data.length - 1] || {}
  const discounts = {
    loves: +(latest.loves ? (mockDb.fuelPrices[0].loves - latest.loves + 0.42).toFixed(3) : 0.42),
    pilot: +(latest.pilot ? 0.38 : 0.38),
    ta:    +(latest.ta    ? 0.35 : 0.35),
    fleetOne: +(latest.fleetOne ? 0.40 : 0.40),
  }

  res.json({ data, currentPrices: latest, discounts })
})

export default router
