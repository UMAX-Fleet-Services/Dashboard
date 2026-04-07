import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, FileText, BarChart2, Users, CreditCard, DollarSign } from 'lucide-react'
import Papa from 'papaparse'
import { transactions, employees, customers, invoices } from '@/lib/mockData'

const reportTypes = [
  {
    id: 'transactions',
    title: 'Transaction Report',
    description: 'All transactions with status, gallons, and amounts',
    icon: BarChart2,
    color: '#3B82F6',
    getData: () => transactions,
  },
  {
    id: 'employees',
    title: 'Sales Performance',
    description: 'Employee leaderboard and KPIs',
    icon: Users,
    color: '#10B981',
    getData: () => employees,
  },
  {
    id: 'customers',
    title: 'Customer Report',
    description: 'All customer accounts with monthly metrics',
    icon: CreditCard,
    color: '#F59E0B',
    getData: () => customers,
  },
  {
    id: 'invoices',
    title: 'Invoice Report',
    description: 'Vendor invoices and payment status',
    icon: DollarSign,
    color: '#A855F7',
    getData: () => invoices,
  },
  {
    id: 'summary',
    title: 'Monthly Summary',
    description: 'High-level KPI summary for the month',
    icon: FileText,
    color: '#EF4444',
    getData: () => [
      { metric: 'Active Cards', value: 1247 },
      { metric: 'Total Gallons', value: 892400 },
      { metric: 'Total Transactions', value: 14823 },
      { metric: 'Gross Revenue', value: 187200 },
      { metric: 'Net Profit', value: 43100 },
      { metric: 'Retention Rate', value: '84%' },
    ],
  },
]

function downloadCSV(data: object[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function ReportsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <p className="text-zinc-400 text-sm">Generate and download reports for your fleet data.</p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((r) => {
            const Icon = r.icon
            return (
              <Card key={r.id} className="hover:border-zinc-700 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.color + '20' }}>
                    <Icon size={18} style={{ color: r.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{r.title}</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">{r.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => downloadCSV(r.getData(), r.id)}
                  >
                    <Download size={13} />
                    CSV
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <FileText size={13} />
                    Preview
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Scheduled reports section */}
        <Card>
          <h3 className="text-white font-semibold mb-3">Scheduled Reports</h3>
          <div className="space-y-2">
            {[
              { name: 'Weekly Performance Summary', frequency: 'Every Monday, 8:00 AM', status: 'active' },
              { name: 'Monthly P&L Report', frequency: '1st of each month, 9:00 AM', status: 'active' },
              { name: 'Daily Transaction Log', frequency: 'Daily, 11:59 PM', status: 'paused' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-zinc-800/50 last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{s.name}</p>
                  <p className="text-zinc-500 text-xs">{s.frequency}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  s.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  )
}
