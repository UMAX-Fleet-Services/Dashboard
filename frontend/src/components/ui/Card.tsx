import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn('bg-zinc-900 border border-zinc-800 rounded-xl p-4', className)}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'
