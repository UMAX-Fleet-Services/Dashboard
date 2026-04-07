// Mock database - mirrors frontend mockData.ts with stable (non-random) values

function subDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() - days)
  return d
}

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

const today = new Date()

function sparkline(base, count = 7) {
  const arr = []
  let v = base
  const seeds = [0.02, -0.03, 0.04, -0.01, 0.03, -0.02, 0.05]
  for (let i = 0; i < count; i++) {
    v = Math.round(v * (1 + seeds[i % seeds.length]))
    arr.push(Math.max(0, v))
  }
  return arr
}

// ─── Employees ──────────────────────────────────────────────────────────────
const employeeNames = [
  'Marcus Johnson', 'Sarah Chen', 'David Williams', 'Emily Rodriguez',
  'James Thompson', 'Ashley Davis', 'Robert Martinez', 'Jessica Lee',
  'Christopher Brown', 'Amanda Wilson',
]

const employeeRoles = [
  'Senior Sales Rep', 'Sales Rep', 'Senior Sales Rep', 'Sales Rep',
  'Account Manager', 'Sales Rep', 'Account Manager', 'Sales Rep',
  'Senior Sales Rep', 'Sales Rep',
]

const employeeTeams = ['Team Alpha', 'Team Alpha', 'Team Beta', 'Team Beta', 'Team Alpha', 'Team Beta', 'Team Alpha', 'Team Beta', 'Team Alpha', 'Team Beta']

const gallonsBase = [94200, 88500, 76300, 71200, 68900, 65400, 61800, 58200, 54700, 51300]
const revenueBase = [23800, 21200, 18900, 17400, 16800, 15600, 14900, 13800, 12700, 11900]

export const employees = employeeNames.map((name, i) => ({
  id: `EMP-${String(i + 1).padStart(3, '0')}`,
  name,
  role: employeeRoles[i],
  team: employeeTeams[i],
  startDate: formatDate(subDays(today, 180 + i * 45)),
  cardsSold: 28 - i * 2,
  activeCards: 165 - i * 9,
  gallonsGenerated: gallonsBase[i],
  revenue: revenueBase[i],
  usageRate: 96 - i * 2,
  weeklyTrend: sparkline(gallonsBase[i] / 4),
}))

// ─── Customers ───────────────────────────────────────────────────────────────
const companyPrefixes = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
  'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho',
  'Sigma', 'Tau', 'Upsilon',
]

const contactNames = [
  'John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones', 'Dan Brown',
  'Paul Miller', 'Steve Anderson', 'Kevin Taylor', 'Brian Jackson', 'Gary White',
  'John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones', 'Dan Brown',
  'Paul Miller', 'Steve Anderson', 'Kevin Taylor', 'Brian Jackson', 'Gary White',
]

const cardCounts = [42, 38, 31, 28, 25, 22, 19, 17, 15, 14, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5]
const monthlyGallons = [78000, 71000, 64000, 58000, 52000, 47000, 43000, 38000, 34000, 31000, 27000, 24000, 21000, 18000, 16000, 14000, 12000, 10000, 9000, 8000]
const monthlyRevenues = [17600, 16000, 14400, 13100, 11700, 10600, 9700, 8600, 7700, 7000, 6100, 5400, 4700, 4100, 3600, 3200, 2700, 2300, 2000, 1800]

export const customers = companyPrefixes.map((prefix, i) => ({
  id: `CUST-${String(i + 1).padStart(4, '0')}`,
  company: `${prefix} Trucking LLC`,
  contactName: contactNames[i],
  cards: cardCounts[i],
  monthlyGallons: monthlyGallons[i],
  monthlyRevenue: monthlyRevenues[i],
  status: i % 5 === 0 ? 'inactive' : 'active',
  lastActivity: formatDate(subDays(today, i % 5 === 0 ? 12 + i : i + 1)),
  joinDate: formatDate(subDays(today, 60 + i * 32)),
  assignedRep: employees[i % employees.length].name,
  riskScore: i % 5 === 0 ? 'high' : i % 3 === 0 ? 'medium' : 'low',
}))

// ─── Fuel Cards ───────────────────────────────────────────────────────────────
const cardStatuses = ['active', 'active', 'active', 'active', 'inactive', 'suspended', 'pending']

export const fuelCards = Array.from({ length: 50 }, (_, i) => ({
  id: `CARD-${String(i + 1).padStart(5, '0')}`,
  masked: `****${String(1000 + i * 17).slice(-4)}`,
  customerId: customers[i % customers.length].id,
  driverName: contactNames[i % contactNames.length],
  status: cardStatuses[i % cardStatuses.length],
  issuedDate: formatDate(subDays(today, 30 + i * 6)),
  lastUsed: formatDate(subDays(today, (i % 7) + 1)),
  monthlyGallons: 400 + (i % 10) * 60,
  limit: 1000,
}))

// ─── Transactions ─────────────────────────────────────────────────────────────
const truckStops = [
  'Loves #432', 'Pilot #198', 'TA Dallas', 'Flying J Houston',
  'Petro Loves', 'Pilot Memphis', 'TA Oklahoma', 'Loves Amarillo',
  'Flying J Denver', 'Pilot Nashville',
]

const driverNames = [
  'John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones', 'Dan Brown',
  'Paul Miller', 'Steve Anderson', 'Kevin Taylor', 'Brian Jackson', 'Gary White',
]

const gallonsArr = [180, 95, 142, 168, 78, 201, 115, 88, 155, 133, 170, 92, 148, 162, 75, 195, 108, 85, 160, 140, 175, 99, 145, 158, 82, 188, 112, 90, 152, 136, 185, 96, 138, 165, 79, 198, 118, 87, 157, 143, 172, 101, 148, 161, 76, 191, 115, 89, 154, 138, 178, 97, 141, 163, 80, 194, 116, 88, 158, 141, 176, 99, 145, 160, 78, 192, 117, 86, 156, 142, 174, 100, 147, 162, 77, 190, 115, 87, 157, 140, 173, 98, 144, 161, 79, 193, 116, 88, 156, 141, 175, 99, 146, 162, 78, 191, 114, 86, 155, 139]
const ppgArr = [3.642, 3.821, 3.734, 3.698, 3.812, 3.657, 3.789, 3.743, 3.698, 3.821, 3.634, 3.798, 3.712, 3.674, 3.834, 3.621, 3.756, 3.801, 3.689, 3.745, 3.628, 3.812, 3.724, 3.668, 3.843, 3.615, 3.778, 3.819, 3.695, 3.731, 3.641, 3.787, 3.716, 3.682, 3.829, 3.624, 3.763, 3.808, 3.692, 3.742, 3.635, 3.796, 3.719, 3.671, 3.838, 3.618, 3.774, 3.815, 3.688, 3.736, 3.638, 3.791, 3.722, 3.676, 3.831, 3.621, 3.768, 3.811, 3.694, 3.739, 3.632, 3.798, 3.718, 3.673, 3.835, 3.617, 3.772, 3.813, 3.691, 3.737, 3.636, 3.794, 3.721, 3.675, 3.833, 3.619, 3.769, 3.812, 3.693, 3.738, 3.634, 3.796, 3.720, 3.674, 3.834, 3.618, 3.771, 3.813, 3.692, 3.737, 3.636, 3.795, 3.720, 3.675, 3.832, 3.619, 3.770, 3.812, 3.692, 3.738]
const txStatuses = ['completed', 'completed', 'completed', 'completed', 'completed', 'declined', 'completed', 'completed', 'pending', 'completed']

export const transactions = Array.from({ length: 100 }, (_, i) => {
  const gallons = gallonsArr[i]
  const ppg = ppgArr[i]
  const ts = subDays(today, Math.floor(i / 7))
  ts.setHours(6 + (i % 16), (i * 13) % 60, 0, 0)
  return {
    id: `TX-${String(10000 + i).padStart(6, '0')}`,
    timestamp: ts.toISOString(),
    cardMasked: fuelCards[i % fuelCards.length].masked,
    cardId: fuelCards[i % fuelCards.length].id,
    driverName: driverNames[i % driverNames.length],
    employeeId: employees[i % employees.length].id,
    employeeName: employees[i % employees.length].name,
    truckStop: truckStops[i % truckStops.length],
    vendor: truckStops[i % truckStops.length].split(' ')[0],
    gallons,
    pricePerGal: ppg,
    totalAmount: +(gallons * ppg).toFixed(2),
    status: txStatuses[i % txStatuses.length],
  }
})

// ─── Fuel Prices ─────────────────────────────────────────────────────────────
const lovesBase   = [3.421, 3.435, 3.412, 3.448, 3.467, 3.453, 3.441, 3.462, 3.478, 3.491, 3.484, 3.469, 3.452, 3.438, 3.461, 3.475, 3.489, 3.502, 3.518, 3.531, 3.524, 3.510, 3.496, 3.482, 3.471, 3.485, 3.498, 3.512, 3.526, 3.540]
const pilotBase   = [3.468, 3.481, 3.455, 3.492, 3.511, 3.498, 3.487, 3.506, 3.521, 3.534, 3.527, 3.513, 3.499, 3.485, 3.507, 3.521, 3.536, 3.548, 3.562, 3.575, 3.569, 3.556, 3.543, 3.529, 3.518, 3.531, 3.544, 3.557, 3.571, 3.584]
const taBase      = [3.445, 3.458, 3.432, 3.469, 3.488, 3.475, 3.463, 3.483, 3.499, 3.512, 3.505, 3.491, 3.477, 3.463, 3.485, 3.498, 3.512, 3.525, 3.539, 3.552, 3.546, 3.533, 3.520, 3.507, 3.495, 3.508, 3.521, 3.534, 3.548, 3.561]
const fleetOneBase= [3.398, 3.411, 3.385, 3.422, 3.441, 3.428, 3.416, 3.437, 3.452, 3.465, 3.458, 3.444, 3.431, 3.417, 3.439, 3.452, 3.466, 3.479, 3.493, 3.506, 3.499, 3.486, 3.473, 3.460, 3.448, 3.461, 3.475, 3.488, 3.501, 3.515]

export const fuelPrices = Array.from({ length: 30 }, (_, i) => {
  const d = subDays(today, 29 - i)
  return {
    date: formatDate(d),
    dateLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    loves: lovesBase[i],
    pilot: pilotBase[i],
    ta: taBase[i],
    fleetOne: fleetOneBase[i],
  }
})

// ─── Finance / P&L ────────────────────────────────────────────────────────────
export const financePL = [
  { name: 'Gross Revenue', value: 187200, type: 'total', cumulative: 187200 },
  { name: 'Discounts',     value: -12400, type: 'decrease', cumulative: 174800 },
  { name: 'Vendor Payouts',value: -89300, type: 'decrease', cumulative: 85500 },
  { name: 'Processing Fees',value: -8200, type: 'decrease', cumulative: 77300 },
  { name: 'Operating Costs',value: -34200, type: 'decrease', cumulative: 43100 },
  { name: 'Net Profit',    value: 43100,  type: 'total', cumulative: 43100 },
]

// ─── Invoices ─────────────────────────────────────────────────────────────────
export const invoices = [
  { id: 'INV-001', vendor: 'Loves Travel Stops',       amount: 24300, dueDate: formatDate(subDays(today, 5)),  status: 'overdue',  paidDate: null },
  { id: 'INV-002', vendor: 'Pilot Flying J',           amount: 18700, dueDate: formatDate(subDays(today, -3)), status: 'pending',  paidDate: null },
  { id: 'INV-003', vendor: 'TravelCenters of America', amount: 31200, dueDate: formatDate(subDays(today, 10)), status: 'paid',     paidDate: formatDate(subDays(today, 12)) },
  { id: 'INV-004', vendor: 'Fleet One',                amount: 9800,  dueDate: formatDate(subDays(today, -7)), status: 'pending',  paidDate: null },
  { id: 'INV-005', vendor: 'Flying J',                 amount: 15600, dueDate: formatDate(subDays(today, 2)),  status: 'overdue',  paidDate: null },
  { id: 'INV-006', vendor: 'Petro',                    amount: 22100, dueDate: formatDate(subDays(today, 15)), status: 'paid',     paidDate: formatDate(subDays(today, 17)) },
  { id: 'INV-007', vendor: 'Loves Travel Stops',       amount: 19400, dueDate: formatDate(subDays(today, -10)),status: 'pending',  paidDate: null },
  { id: 'INV-008', vendor: 'Pilot Flying J',           amount: 27800, dueDate: formatDate(subDays(today, 20)), status: 'paid',     paidDate: formatDate(subDays(today, 22)) },
]

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const alerts = [
  { id: '1', type: 'warning', title: 'High Decline Rate',  message: 'Card ****4821 has 3 declines today', time: '5m ago', read: false },
  { id: '2', type: 'success', title: 'Invoice Paid',       message: 'TravelCenters payment confirmed $31,200', time: '1h ago', read: false },
  { id: '3', type: 'danger',  title: 'Overdue Invoice',    message: 'Loves Travel Stops INV-001 overdue by 5 days', time: '2h ago', read: false },
  { id: '4', type: 'info',    title: 'New Card Activated', message: '5 new cards activated this morning', time: '4h ago', read: true },
  { id: '5', type: 'warning', title: 'Low Usage Alert',    message: '42 cards with 0 transactions this week', time: '6h ago', read: true },
]

// ─── Retention Funnel ─────────────────────────────────────────────────────────
export const retentionFunnel = [
  { stage: 'Total Cards',    count: 1615, percentage: 100 },
  { stage: 'Active (30d)',   count: 1247, percentage: 77.2 },
  { stage: 'High Usage',     count: 892,  percentage: 55.2 },
  { stage: 'Loyal (6mo+)',   count: 634,  percentage: 39.3 },
  { stage: 'Top Tier',       count: 201,  percentage: 12.4 },
]

export const mockDb = {
  employees,
  customers,
  fuelCards,
  transactions,
  fuelPrices,
  financePL,
  invoices,
  alerts,
  retentionFunnel,
}
