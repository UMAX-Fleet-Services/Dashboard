import { cn } from '@/lib/utils'

const variantClasses = {
  default: 'bg-zinc-700/60 text-zinc-200 border border-zinc-600/30',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-sm shadow-emerald-500/5',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow-sm shadow-amber-500/5',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/25 shadow-sm shadow-red-500/5',
  info: 'bg-blue-500/15 text-blue-400 border border-blue-500/25 shadow-sm shadow-blue-500/5',
}

interface BadgeProps {
  variant?: keyof typeof variantClasses
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide',
      variantClasses[variant],
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        variant === 'success' && 'bg-emerald-400',
        variant === 'warning' && 'bg-amber-400',
        variant === 'danger' && 'bg-red-400',
        variant === 'info' && 'bg-blue-400',
        variant === 'default' && 'bg-zinc-400',
      )} />
      {children}
    </span>
  )
}
