import { cn } from '@/lib/utils'

const variantClasses = {
  default: 'bg-zinc-700 text-zinc-200',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
}

interface BadgeProps {
  variant?: keyof typeof variantClasses
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variantClasses[variant], className)}>
      {children}
    </span>
  )
}
