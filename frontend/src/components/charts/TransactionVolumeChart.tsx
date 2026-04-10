import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { transactionVolumeData } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'
import type { CustomTooltipProps } from '@/lib/chartTypes'

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/60 rounded-xl p-3 text-sm shadow-2xl shadow-black/40">
      <p className="text-zinc-400 mb-1 font-medium">{label}</p>
      <p className="text-blue-400 font-semibold">{payload[0]?.value} transactions</p>
      <p className="text-emerald-400">${(payload[1]?.value as number)?.toLocaleString()} revenue</p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = CustomTooltip as any

export function TransactionVolumeChart() {
  const [view, setView] = useState<'daily' | 'weekly'>('daily')

  const weeklyData = transactionVolumeData.reduce<{date: string; count: number; revenue: number}[]>((acc, d, i) => {
    const week = Math.floor(i / 7)
    if (!acc[week]) acc[week] = { date: `Week ${week + 1}`, count: 0, revenue: 0 }
    acc[week].count += d.count
    acc[week].revenue += d.revenue
    return acc
  }, [])

  const chartData = view === 'daily' ? transactionVolumeData : weeklyData

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Transaction Volume</h3>
        <div className="flex gap-1 bg-zinc-800/50 rounded-xl p-1">
          {(['daily', 'weekly'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                view === v ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="countGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<TooltipContent />} />
          <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="url(#countGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="url(#revenueGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
