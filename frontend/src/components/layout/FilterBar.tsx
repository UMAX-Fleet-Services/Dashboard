import { Search, Filter, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FilterBarProps {
  search?: string
  onSearch?: (v: string) => void
  onRefresh?: () => void
  children?: React.ReactNode
}

export function FilterBar({ search, onSearch, onRefresh, children }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {onSearch !== undefined && (
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            value={search ?? ''}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="bg-zinc-900/80 border border-zinc-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 w-56 transition-all duration-200"
          />
        </div>
      )}
      {children}
      <Button variant="ghost" size="sm">
        <Filter size={14} />
        Filters
      </Button>
      {onRefresh && (
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw size={14} />
        </Button>
      )}
    </div>
  )
}
