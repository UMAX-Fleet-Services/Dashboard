import { subDays, format } from 'date-fns'

const today = new Date()

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function sparkline(base: number, count = 7): number[] {
  const arr: number[] = []
  let v = base
  for (let i = 0; i < count; i++) {
    v = v + randBetween(-Math.floor(base * 0.05), Math.floor(base * 0.05))
    arr.push(Math.max(0, v))
  }
  return arr
}

export const kpiData = [
  { id: 'activeCards', title: 'Active Cards', value: 1247, delta: 23, deltaPercent: 1.88, suffix: '', prefix: '', sparklineData: sparkline(1200), threshold: 1300, criticalThreshold: 900 },
  { id: 'totalGallons', title: 'Total Gallons', value: 892400, delta: 12400, deltaPercent: 1.41, suffix: '', prefix: '', sparklineData: sparkline(880000), threshold: 950000, criticalThreshold: 700000 },
  { id: 'totalTransactions', title: 'Total Transactions', value: 14823, delta: 342, deltaPercent: 2.36, suffix: '', prefix: '', sparklineData: sparkline(14000), threshold: 16000, criticalThreshold: 10000 },
  { id: 'avgGallons', title: 'Avg Gal/Card', value: 715, delta: -8, deltaPercent: -1.1, suffix: '', prefix: '', sparklineData: sparkline(720), threshold: 800, criticalThreshold: 600 },
  { id: 'grossRevenue', title: 'Gross Revenue', value: 187200, delta: 4200, deltaPercent: 2.29, suffix: '', prefix: '$', sparklineData: sparkline(182000), threshold: 200000, criticalThreshold: 150000 },
  { id: 'netProfit', title: 'Net Profit', value: 43100, delta: 1100, deltaPercent: 2.62, suffix: '', prefix: '$', sparklineData: sparkline(41000), threshold: 50000, criticalThreshold: 30000 },
  { id: 'retentionRate', title: 'Retention Rate', value: 84, delta: 2, deltaPercent: 2.44, suffix: '%', prefix: '', sparklineData: sparkline(82), threshold: 90, criticalThreshold: 70 },
  { id: 'newCards', title: 'New Cards', value: 23, delta: 5, deltaPercent: 27.8, suffix: '', prefix: '', sparklineData: sparkline(18), threshold: 30, criticalThreshold: 10 },
]

export const transactionVolumeData = Array.from({ length: 30 }, (_, i) => {
  const d = subDays(today, 29 - i)
  return {
    date: format(d, 'MMM d'),
    count: randBetween(380, 620),
    revenue: randBetween(4800, 7200),
  }
})

export const fuelPriceData = Array.from({ length: 30 }, (_, i) => {
  const d = subDays(today, 29 - i)
  return {
    date: format(d, 'MMM d'),
    loves: +(3.4 + Math.random() * 0.4).toFixed(3),
    pilot: +(3.45 + Math.random() * 0.4).toFixed(3),
    ta: +(3.42 + Math.random() * 0.4).toFixed(3),
    fleetOne: +(3.38 + Math.random() * 0.4).toFixed(3),
  }
})

export const revenueBarData = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  revenue: randBetween(14000, 22000),
  discount: randBetween(800, 1800),
  vendorPayout: randBetween(2000, 4000),
  netProfitMargin: randBetween(20, 32),
}))

export const cardUsageData = [
  { name: 'Active', value: 1247, color: '#3B82F6' },
  { name: 'Inactive', value: 234, color: '#52525B' },
  { name: 'Suspended', value: 45, color: '#EF4444' },
  { name: 'Pending', value: 89, color: '#F59E0B' },
]

const employeeNames = ['Marcus Johnson', 'Sarah Chen', 'David Williams', 'Emily Rodriguez', 'James Thompson', 'Ashley Davis', 'Robert Martinez', 'Jessica Lee', 'Christopher Brown', 'Amanda Wilson']

export const employees = employeeNames.map((name, i) => ({
  id: `EMP-${String(i + 1).padStart(3, '0')}`,
  name,
  cardsSold: randBetween(8, 35),
  activeCards: randBetween(80, 180),
  gallonsGenerated: randBetween(45000, 120000),
  revenue: randBetween(8000, 25000),
  usageRate: randBetween(72, 96),
  sparkline: sparkline(randBetween(100, 200)),
}))

const truckStops = ['Loves #432', 'Pilot #198', 'TA Dallas', 'Flying J Houston', 'Petro Loves', 'Pilot Memphis', 'TA Oklahoma', 'Loves Amarillo', 'Flying J Denver', 'Pilot Nashville']
const driverNames = ['John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones', 'Dan Brown', 'Paul Miller', 'Steve Anderson', 'Kevin Taylor', 'Brian Jackson', 'Gary White']
const statusValues = ['completed', 'declined', 'pending'] as const
type TxStatus = typeof statusValues[number]

export const transactions = Array.from({ length: 50 }, (_, i) => {
  const ts = subDays(today, randBetween(0, 14))
  const gallons = randBetween(50, 200)
  const ppg = +(3.4 + Math.random() * 0.4).toFixed(3)
  return {
    id: `TX-${String(10000 + i).padStart(6, '0')}`,
    timestamp: new Date(ts.getTime() - randBetween(0, 86400000)).toISOString(),
    cardMasked: `****${String(randBetween(1000, 9999))}`,
    driverName: driverNames[i % driverNames.length],
    truckStop: truckStops[i % truckStops.length],
    gallons,
    pricePerGal: ppg,
    totalAmount: +(gallons * ppg).toFixed(2),
    status: statusValues[i % 3] as TxStatus,
  }
})

export const financePLData = [
  { name: 'Gross Revenue', value: 187200, type: 'total' as const },
  { name: 'Discounts', value: -12400, type: 'decrease' as const },
  { name: 'Vendor Payouts', value: -89300, type: 'decrease' as const },
  { name: 'Processing Fees', value: -8200, type: 'decrease' as const },
  { name: 'Operating Costs', value: -34200, type: 'decrease' as const },
  { name: 'Net Profit', value: 43100, type: 'total' as const },
]

export const invoices = [
  { id: 'INV-001', vendor: 'Loves Travel Stops', amount: 24300, dueDate: format(subDays(today, 5), 'yyyy-MM-dd'), status: 'overdue' as const },
  { id: 'INV-002', vendor: 'Pilot Flying J', amount: 18700, dueDate: format(subDays(today, -3), 'yyyy-MM-dd'), status: 'pending' as const },
  { id: 'INV-003', vendor: 'TravelCenters of America', amount: 31200, dueDate: format(subDays(today, 10), 'yyyy-MM-dd'), status: 'paid' as const },
  { id: 'INV-004', vendor: 'Fleet One', amount: 9800, dueDate: format(subDays(today, -7), 'yyyy-MM-dd'), status: 'pending' as const },
  { id: 'INV-005', vendor: 'Flying J', amount: 15600, dueDate: format(subDays(today, 2), 'yyyy-MM-dd'), status: 'overdue' as const },
  { id: 'INV-006', vendor: 'Petro', amount: 22100, dueDate: format(subDays(today, 15), 'yyyy-MM-dd'), status: 'paid' as const },
]

export const customers = Array.from({ length: 20 }, (_, i) => ({
  id: `CUST-${String(i + 1).padStart(4, '0')}`,
  company: `${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon'][i]} Trucking LLC`,
  contactName: driverNames[i % driverNames.length],
  cards: randBetween(5, 45),
  monthlyGallons: randBetween(8000, 80000),
  monthlyRevenue: randBetween(2000, 18000),
  status: i % 5 === 0 ? 'inactive' as const : 'active' as const,
  joinDate: format(subDays(today, randBetween(30, 720)), 'yyyy-MM-dd'),
}))

export const retentionFunnel = [
  { stage: 'Total Cards', count: 1615, percentage: 100 },
  { stage: 'Active (30d)', count: 1247, percentage: 77.2 },
  { stage: 'High Usage', count: 892, percentage: 55.2 },
  { stage: 'Loyal (6mo+)', count: 634, percentage: 39.3 },
  { stage: 'Top Tier', count: 201, percentage: 12.4 },
]

export const notifications = [
  { id: '1', type: 'warning' as const, title: 'High Decline Rate', message: 'Card ****4821 has 3 declines today', time: '5m ago', read: false },
  { id: '2', type: 'success' as const, title: 'Invoice Paid', message: 'TravelCenters payment confirmed $31,200', time: '1h ago', read: false },
  { id: '3', type: 'danger' as const, title: 'Overdue Invoice', message: 'Loves Travel Stops INV-001 overdue by 5 days', time: '2h ago', read: false },
  { id: '4', type: 'info' as const, title: 'New Card Activated', message: '5 new cards activated this morning', time: '4h ago', read: true },
  { id: '5', type: 'warning' as const, title: 'Low Usage Alert', message: '42 cards with 0 transactions this week', time: '6h ago', read: true },
]

export const revenueStackedData = Array.from({ length: 12 }, (_, i) => ({
  month: format(subDays(today, (11 - i) * 30), 'MMM'),
  fuel: randBetween(120000, 160000),
  fees: randBetween(8000, 15000),
  premiums: randBetween(5000, 12000),
}))
