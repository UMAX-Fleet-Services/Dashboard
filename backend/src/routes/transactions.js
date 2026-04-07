import express from 'express'
import { mockDb } from '../data/mockDb.js'

const router = express.Router()

router.get('/', (req, res) => {
  const page   = Math.max(1, parseInt(req.query.page  || '1', 10))
  const limit  = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)))
  const status = req.query.status   || ''
  const vendor = req.query.vendor   || ''
  const employee = req.query.employee || ''

  let data = [...mockDb.transactions]

  if (status)   data = data.filter(t => t.status === status)
  if (vendor)   data = data.filter(t => t.vendor.toLowerCase().includes(vendor.toLowerCase()))
  if (employee) data = data.filter(t => t.employeeId === employee || t.employeeName.toLowerCase().includes(employee.toLowerCase()))

  const total = data.length
  const start = (page - 1) * limit
  const items = data.slice(start, start + limit)

  res.json({
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: start + limit < total,
      hasPrev: page > 1,
    },
  })
})

export default router
