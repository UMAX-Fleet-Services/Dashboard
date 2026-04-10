import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { revenueStackedData } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'
import type { CustomTooltipProps } from '@/lib/chartTypes'

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/60 rounded-xl p-3 text-sm shadow-2xl shadow-black/40">
      <p className="text-zinc-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} style={{ color: p.color }} className="font-medium">
          {p.name}: ${(p.value as number)?.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = CustomTooltip as any

export function RevenueStackedChart() {
  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Revenue Streams (12 Months)</h3>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={revenueStackedData}>
          <defs>
            <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="feesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="premGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A855F7" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#A855F7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<TooltipContent />} />
          <Legend wrapperStyle={{ color: '#A1A1AA', fontSize: 12 }} />
          <Area type="monotone" dataKey="fuel" name="Fuel Revenue" stackId="1" stroke="#3B82F6" fill="url(#fuelGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="fees" name="Service Fees" stackId="1" stroke="#10B981" fill="url(#feesGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="premiums" name="Premium Services" stackId="1" stroke="#A855F7" fill="url(#premGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
