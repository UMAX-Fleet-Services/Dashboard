import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeltaBadgeProps {
  delta: number
  deltaPercent: number
  className?: string
}

export function DeltaBadge({ delta, deltaPercent, className }: DeltaBadgeProps) {
  const isPositive = delta >= 0
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
      isPositive
        ? 'text-emerald-400 bg-emerald-500/10'
        : 'text-red-400 bg-red-500/10',
      className
    )}>
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {isPositive ? '+' : ''}{deltaPercent.toFixed(1)}%
    </span>
  )
}
