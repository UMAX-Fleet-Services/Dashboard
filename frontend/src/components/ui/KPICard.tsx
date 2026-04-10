import { useState, useEffect } from 'react'
import { Card } from './Card'
import { DeltaBadge } from './DeltaBadge'
import { Sparkline } from './Sparkline'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: number
  delta: number
  deltaPercent: number
  sparklineData: number[]
  prefix?: string
  suffix?: string
}

export function KPICard({ title, value, delta, deltaPercent, sparklineData, prefix = '', suffix = '' }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 1500
    const step = 16
    const increment = end / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [value])

  const formatted = displayValue >= 1000
    ? displayValue >= 1000000
      ? (displayValue / 1000000).toFixed(1) + 'M'
      : displayValue >= 10000
        ? (displayValue / 1000).toFixed(0) + 'K'
        : displayValue.toLocaleString()
    : displayValue.toString()

  const isPositive = delta >= 0

  return (
    <Card className="group flex flex-col gap-3 hover:border-zinc-600/60 overflow-hidden relative">
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-60 ${isPositive ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0' : 'bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0'}`} />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
            {isPositive ? <TrendingUp size={14} className="text-emerald-400" /> : <TrendingDown size={14} className="text-red-400" />}
          </div>
          <span className="text-zinc-400 text-sm font-medium">{title}</span>
        </div>
        <DeltaBadge delta={delta} deltaPercent={deltaPercent} />
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">
        {prefix}{formatted}{suffix}
      </div>
      <div className="h-12 opacity-80 group-hover:opacity-100 transition-opacity">
        <Sparkline
          data={sparklineData}
          color={delta >= 0 ? '#10B981' : '#EF4444'}
          height={48}
        />
      </div>
    </Card>
  )
}
