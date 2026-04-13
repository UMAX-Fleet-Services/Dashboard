import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Sparkline } from '@/components/ui/Sparkline'
import { Badge } from '@/components/ui/Badge'
import { employees } from '@/lib/mockData'
import { Trophy, Crown, Medal } from 'lucide-react'

export function SalesPage() {
  const sorted = [...employees].sort((a, b) => b.revenue - a.revenue)

  const podiumIcons = [
    <Crown key="crown" size={24} className="text-amber-400" />,
    <Medal key="silver" size={22} className="text-zinc-400" />,
    <Medal key="bronze" size={22} className="text-orange-500" />,
  ]

  const podiumGradients = [
    'from-amber-500/20 to-amber-600/5 border-amber-500/30',
    'from-zinc-400/10 to-zinc-500/5 border-zinc-400/20',
    'from-orange-500/10 to-orange-600/5 border-orange-500/20',
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4">
          {sorted.slice(0, 3).map((emp, i) => (
            <Card key={emp.id} className={`text-center bg-gradient-to-b ${podiumGradients[i]} overflow-hidden relative`}>
              {i === 0 && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0" />}
              <div className="flex justify-center mb-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  i === 0 ? 'bg-amber-500/20 shadow-lg shadow-amber-500/10' : i === 1 ? 'bg-zinc-400/10' : 'bg-orange-600/10'
                }`}>
                  {podiumIcons[i]}
                </div>
              </div>
              <p className="text-white font-semibold text-base">{emp.name}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{emp.id}</p>
              <p className="text-3xl font-bold text-white mt-3 tracking-tight">${emp.revenue.toLocaleString()}</p>
              <p className="text-zinc-500 text-xs mt-1">Monthly Revenue</p>
              <div className="mt-4 flex justify-center gap-6 text-xs">
                <div className="text-center">
                  <p className="text-white font-semibold text-base">{emp.cardsSold}</p>
                  <p className="text-zinc-500">Cards</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-base">{emp.usageRate}%</p>
                  <p className="text-zinc-500">Usage</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Full leaderboard */}
        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center gap-2 bg-zinc-900/50">
            <Trophy size={16} className="text-zinc-400" />
            <h3 className="text-white font-semibold">Full Leaderboard</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800/60">
              <tr>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Rank</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Employee</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Cards Sold</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Active Cards</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Gallons</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Revenue</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Usage Rate</th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((emp, i) => (
                <tr key={emp.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-zinc-400' : i === 2 ? 'text-orange-500' : 'text-zinc-600'}`}>
                      #{i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{emp.name}</p>
                    <p className="text-zinc-500 text-xs">{emp.id}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{emp.cardsSold}</td>
                  <td className="px-4 py-3 text-zinc-300">{emp.activeCards}</td>
                  <td className="px-4 py-3 text-zinc-300">{emp.gallonsGenerated.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white font-semibold">${emp.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge variant={emp.usageRate >= 85 ? 'success' : emp.usageRate >= 75 ? 'warning' : 'danger'}>
                      {emp.usageRate}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 w-24">
                    <Sparkline data={emp.sparkline} height={32} color="#3B82F6" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  )
}
