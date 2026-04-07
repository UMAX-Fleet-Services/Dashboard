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
      'inline-flex items-center gap-1 text-xs font-medium',
      isPositive ? 'text-emerald-400' : 'text-red-400',
      className
    )}>
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {isPositive ? '+' : ''}{deltaPercent.toFixed(1)}%
    </span>
  )
}
