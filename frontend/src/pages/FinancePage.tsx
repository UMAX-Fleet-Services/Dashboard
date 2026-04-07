import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RevenueStackedChart } from '@/components/charts/RevenueStackedChart'
import { financePLData, invoices } from '@/lib/mockData'

const invoiceStatusVariant = {
  paid: 'success' as const,
  overdue: 'danger' as const,
  pending: 'warning' as const,
}

export function FinancePage() {
  const total = financePLData[0].value
  const netProfit = financePLData[financePLData.length - 1].value
  const margin = ((netProfit / total) * 100).toFixed(1)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Gross Revenue', value: `$${(187200).toLocaleString()}`, color: 'text-white' },
            { label: 'Total Expenses', value: `$${(144100).toLocaleString()}`, color: 'text-red-400' },
            { label: 'Net Profit', value: `$${(43100).toLocaleString()}`, color: 'text-emerald-400' },
            { label: 'Net Margin', value: `${margin}%`, color: 'text-blue-400' },
          ].map((s) => (
            <Card key={s.label} className="text-center">
              <p className="text-zinc-400 text-sm">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Stacked revenue chart */}
        <div className="grid grid-cols-3 gap-4">
          <RevenueStackedChart />

          {/* P&L Waterfall */}
          <Card>
            <h3 className="text-white font-semibold mb-4">P&amp;L Breakdown</h3>
            <div className="space-y-2">
              {financePLData.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-zinc-800/50 last:border-0">
                  <span className="text-zinc-400 text-sm">{item.name}</span>
                  <span className={`font-semibold text-sm ${
                    item.type === 'total' ? 'text-white' : item.value > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {item.value > 0 ? '+' : ''}${Math.abs(item.value).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Invoice tracker */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Vendor Invoice Tracker</h3>
            <div className="flex gap-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Paid</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Overdue</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Pending</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  {['Invoice', 'Vendor', 'Amount', 'Due Date', 'Status'].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-zinc-400 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="px-3 py-2.5 font-mono text-xs text-zinc-400">{inv.id}</td>
                    <td className="px-3 py-2.5 text-white">{inv.vendor}</td>
                    <td className="px-3 py-2.5 text-white font-semibold">${inv.amount.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-zinc-300">{inv.dueDate}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={invoiceStatusVariant[inv.status]}>{inv.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
