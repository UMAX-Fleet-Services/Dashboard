import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { cardUsageData } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'
import type { CustomTooltipProps } from '@/lib/chartTypes'

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/60 rounded-xl p-3 text-sm shadow-2xl shadow-black/40">
      <p style={{ color: payload[0]?.color }} className="font-medium">
        {String(payload[0]?.dataKey ?? payload[0]?.name)}: {payload[0]?.value}
      </p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = CustomTooltip as any

const total = cardUsageData.reduce((s, d) => s + d.value, 0)

export function CardUsageDonut() {
  return (
    <Card>
      <h3 className="text-white font-semibold mb-4">Card Status Distribution</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={cardUsageData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {cardUsageData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<TooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <span className="text-3xl font-bold text-white tracking-tight">{total}</span>
          <span className="text-xs text-zinc-500 font-medium">Total Cards</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {cardUsageData.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs p-1.5 rounded-lg hover:bg-zinc-800/30 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}40` }} />
            <span className="text-zinc-400">{d.name}</span>
            <span className="text-white font-semibold ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
