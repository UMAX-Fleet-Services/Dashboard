import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cron from 'node-cron'
import kpisRouter from './routes/kpis.js'
import transactionsRouter from './routes/transactions.js'
import employeesRouter from './routes/employees.js'
import financeRouter from './routes/finance.js'
import fuelPricesRouter from './routes/fuelPrices.js'
import customersRouter from './routes/customers.js'
import dashboardContextRouter from './routes/dashboardContext.js'
import aiRouter from './routes/ai.js'
import exportRouter from './routes/export.js'

const app = express()
const httpServer = createServer(app)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:80']

const io = new Server(httpServer, {
  cors: { origin: allowedOrigins, methods: ['GET', 'POST'] }
})

app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.use('/api/kpis', kpisRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/finance', financeRouter)
app.use('/api/fuel-prices', fuelPricesRouter)
app.use('/api/customers', customersRouter)
app.use('/api/dashboard-context', dashboardContextRouter)
app.use('/api/ai', aiRouter)
app.use('/api/export', exportRouter)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id))
})

setInterval(() => {
  const vendors = ['Loves', 'Pilot', 'TA', 'FleetOne']
  const statuses = ['completed', 'completed', 'completed', 'declined']
  const drivers = ['Marcus Johnson', 'Sarah Chen', 'Mike Rodriguez', 'Tom Wallace']
  io.emit('new_transaction', {
    id: Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    cardMasked: `****${Math.floor(1000 + Math.random() * 9000)}`,
    driverName: drivers[Math.floor(Math.random() * drivers.length)],
    truckStop: vendors[Math.floor(Math.random() * vendors.length)],
    gallons: +(Math.random() * 150 + 50).toFixed(1),
    pricePerGal: +(Math.random() * 0.8 + 3.6).toFixed(3),
    totalAmount: +(Math.random() * 600 + 200).toFixed(2),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  })
}, 15000)

cron.schedule('0 9 * * *', () => {
  console.log('Running daily fuel price sync...')
  io.emit('fuel_price_update', { message: 'Fuel prices updated', timestamp: new Date().toISOString() })
}, { timezone: 'America/New_York' })

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`UMAX Dashboard API running on port ${PORT}`)
})

export { io }
