import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

router.get('/', (req, res) => {
  const status = req.query.status || 'all'
  const page   = Math.max(1, parseInt(req.query.page  || '1', 10))
  const limit  = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)))

  let data = [...mockDb.customers]

  if (status === 'at_risk') data = data.filter(c => c.riskScore === 'high' || c.status === 'inactive')
  else if (status === 'active') data = data.filter(c => c.status === 'active')
  else if (status === 'inactive') data = data.filter(c => c.status === 'inactive')

  const total = data.length
  const start = (page - 1) * limit
  const items = data.slice(start, start + limit)

  res.json({
    data: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    summary: {
      total: mockDb.customers.length,
      active: mockDb.customers.filter(c => c.status === 'active').length,
      inactive: mockDb.customers.filter(c => c.status === 'inactive').length,
      atRisk: mockDb.customers.filter(c => c.riskScore === 'high').length,
    },
  })
})

export default router
