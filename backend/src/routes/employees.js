import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

// GET /api/employees/leaderboard
router.get('/leaderboard', (req, res) => {
  const sortBy = req.query.sortBy || 'gallonsGenerated'
  const order  = req.query.order  || 'desc'
  const team   = req.query.team   || ''

  const allowed = ['gallonsGenerated', 'revenue', 'activeCards', 'cardsSold', 'usageRate']
  const field   = allowed.includes(sortBy) ? sortBy : 'gallonsGenerated'

  let data = [...mockDb.employees]
  if (team) data = data.filter(e => e.team.toLowerCase().includes(team.toLowerCase()))

  data.sort((a, b) => order === 'asc' ? a[field] - b[field] : b[field] - a[field])

  res.json({ data, total: data.length })
})

// GET /api/employees/:id/detail
router.get('/:id/detail', (req, res) => {
  const emp = mockDb.employees.find(e => e.id === req.params.id)
  if (!emp) return res.status(404).json({ error: 'Employee not found' })

  const empTxns = mockDb.transactions.filter(t => t.employeeId === emp.id)
  const empCustomers = mockDb.customers.filter(c =>
    c.assignedRep === emp.name,
  )

  res.json({
    ...emp,
    transactions: empTxns.slice(0, 20),
    customers: empCustomers,
    stats: {
      totalTransactions: empTxns.length,
      completedTransactions: empTxns.filter(t => t.status === 'completed').length,
      declinedTransactions: empTxns.filter(t => t.status === 'declined').length,
      avgGallonsPerTransaction: empTxns.length
        ? +(empTxns.reduce((s, t) => s + t.gallons, 0) / empTxns.length).toFixed(1)
        : 0,
    },
  })
})

export default router
