import { cn } from '@/lib/utils'

const variantClasses = {
  default: 'bg-blue-600 hover:bg-blue-700 text-white',
  outline: 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-transparent',
  ghost: 'hover:bg-zinc-800 text-zinc-400 hover:text-white bg-transparent',
  destructive: 'bg-red-600 hover:bg-red-700 text-white',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  children: React.ReactNode
}

export function Button({ variant = 'default', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
