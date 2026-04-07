import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import { revenueBarData } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'
import type { CustomTooltipProps } from '@/lib/chartTypes'

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-zinc-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.name === 'Margin' ? `${p.value}%` : `$${(p.value as number)?.toLocaleString()}`}
        </p>
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = CustomTooltip as any

export function RevenueBarChart() {
  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Weekly Revenue Breakdown</h3>
        <span className="text-zinc-500 text-xs">12-week rolling</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={revenueBarData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
          <XAxis dataKey="week" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<TooltipContent />} />
          <Legend wrapperStyle={{ color: '#A1A1AA', fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="discount" name="Discount" fill="#EF4444" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="vendorPayout" name="Vendor Payout" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="netProfitMargin" name="Margin" stroke="#10B981" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
