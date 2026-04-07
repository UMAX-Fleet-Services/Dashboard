import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { fuelPriceData } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'
import type { CustomTooltipProps } from '@/lib/chartTypes'

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-zinc-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} style={{ color: p.color }} className="font-medium">
          {vendorLabels[String(p.dataKey)] ?? p.dataKey}: ${typeof p.value === 'number' ? p.value.toFixed(3) : p.value}
        </p>
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = CustomTooltip as any

const vendorColors: Record<string, string> = {
  loves: '#3B82F6',
  pilot: '#10B981',
  ta: '#F59E0B',
  fleetOne: '#A855F7',
}

const vendorLabels: Record<string, string> = {
  loves: "Love's",
  pilot: 'Pilot',
  ta: 'TA',
  fleetOne: 'Fleet One',
}

export function FuelPriceChart() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Fuel Price Comparison</h3>
        <span className="text-zinc-500 text-xs">Price per gallon (30d)</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={fuelPriceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
          <XAxis dataKey="date" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} interval={6} />
          <YAxis domain={['auto', 'auto']} tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v.toFixed(2)}`} />
          <Tooltip content={<TooltipContent />} />
          <Legend formatter={(v) => vendorLabels[v] || v} wrapperStyle={{ color: '#A1A1AA', fontSize: 12 }} />
          {Object.keys(vendorColors).map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={key}
              stroke={vendorColors[key]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
