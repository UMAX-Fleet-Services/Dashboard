import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

// GET /api/finance/pl
router.get('/pl', (req, res) => {
  const period = req.query.period || 'month'
  res.json({ period, data: mockDb.financePL })
})

// GET /api/finance/invoices
router.get('/invoices', (req, res) => {
  const status = req.query.status || ''
  let data = [...mockDb.invoices]
  if (status) data = data.filter(inv => inv.status === status)

  const summary = {
    totalOwed: data.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0),
    totalOverdue: data.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
    totalPaid: data.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
  }

  res.json({ data, summary })
})

export default router
