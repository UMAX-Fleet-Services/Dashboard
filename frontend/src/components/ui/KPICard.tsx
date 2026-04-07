import { useState, useEffect } from 'react'
import { Card } from './Card'
import { DeltaBadge } from './DeltaBadge'
import { Sparkline } from './Sparkline'

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

  return (
    <Card className="flex flex-col gap-3 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-zinc-400 text-sm font-medium">{title}</span>
        <DeltaBadge delta={delta} deltaPercent={deltaPercent} />
      </div>
      <div className="text-2xl font-bold text-white">
        {prefix}{formatted}{suffix}
      </div>
      <div className="h-12">
        <Sparkline
          data={sparklineData}
          color={delta >= 0 ? '#10B981' : '#EF4444'}
          height={48}
        />
      </div>
    </Card>
  )
}
