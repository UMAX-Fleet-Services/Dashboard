import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CardUsageDonut } from '@/components/charts/CardUsageDonut'
import { cardUsageData } from '@/lib/mockData'
import { CreditCard, Plus, Search } from 'lucide-react'

interface CardRecord {
  id: string
  masked: string
  driver: string
  employee: string
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  gallons: number
  lastUsed: string
  limit: number
}

const cardStatusVariant: Record<CardRecord['status'], 'success' | 'default' | 'danger' | 'warning'> = {
  active: 'success',
  inactive: 'default',
  suspended: 'danger',
  pending: 'warning',
}

const demoCards: CardRecord[] = Array.from({ length: 20 }, (_, i) => ({
  id: `CARD-${String(i + 1).padStart(4, '0')}`,
  masked: `****${String(1000 + i * 47)}`,
  driver: ['John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones', 'Dan Brown'][i % 5],
  employee: ['Marcus Johnson', 'Sarah Chen', 'David Williams', 'Emily Rodriguez'][i % 4],
  status: (['active', 'active', 'active', 'inactive', 'suspended', 'pending'] as const)[i % 6],
  gallons: Math.floor(Math.random() * 2000) + 100,
  lastUsed: `${Math.floor(Math.random() * 14) + 1}d ago`,
  limit: [500, 750, 1000][i % 3],
}))

export function CardsPage() {
  const [search, setSearch] = useState('')
  const filtered = demoCards.filter(
    (c) => c.masked.includes(search) || c.driver.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {cardUsageData.map((d) => (
            <Card key={d.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: d.color + '20' }}>
                <CreditCard size={18} style={{ color: d.color }} />
              </div>
              <div>
                <p className="text-zinc-400 text-xs">{d.name}</p>
                <p className="text-white font-bold text-xl">{d.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            {/* Search bar */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cards..."
                  className="bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 w-56"
                />
              </div>
              <Button size="sm">
                <Plus size={14} />
                Issue Card
              </Button>
            </div>

            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-zinc-800">
                    <tr>
                      {['Card', 'Driver', 'Rep', 'Status', 'Gallons', 'Last Used', 'Limit'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="px-4 py-2.5 font-mono text-sm text-white">{c.masked}</td>
                        <td className="px-4 py-2.5 text-zinc-300">{c.driver}</td>
                        <td className="px-4 py-2.5 text-zinc-400 text-xs">{c.employee}</td>
                        <td className="px-4 py-2.5"><Badge variant={cardStatusVariant[c.status]}>{c.status}</Badge></td>
                        <td className="px-4 py-2.5 text-zinc-300">{c.gallons.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-zinc-400 text-xs">{c.lastUsed}</td>
                        <td className="px-4 py-2.5 text-zinc-300">{c.limit} gal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <CardUsageDonut />
        </div>
      </div>
    </Layout>
  )
}
