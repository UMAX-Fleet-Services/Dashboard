import { useLocation } from 'react-router-dom'
import { Bell, Sparkles, Sun, Moon } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { notifications } from '@/lib/mockData'

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/transactions': 'Transactions',
  '/sales': 'Sales Leaderboard',
  '/finance': 'Finance & P&L',
  '/cards': 'Card Management',
  '/fuel-prices': 'Fuel Prices',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/ai-insights': 'AI Insights',
  '/documents': 'Documents',
}

const dateRanges = ['today', 'week', 'month'] as const

export function TopBar() {
  const location = useLocation()
  const { darkMode, toggleDarkMode, dateRange, setDateRange, toggleAIPanel, toggleNotifDrawer } = useStore()
  const title = pageTitles[location.pathname] ?? 'Dashboard'
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 flex items-center px-6 gap-4 z-20">
      <div className="flex-1">
        <h1 className="text-white font-semibold text-lg tracking-tight">{title}</h1>
      </div>

      {/* Date range tabs */}
      <div className="flex items-center gap-1 bg-zinc-900/80 rounded-xl p-1 border border-zinc-800/50">
        {dateRanges.map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 cursor-pointer ${
              dateRange === range
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm shadow-blue-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* AI button */}
      <button
        onClick={toggleAIPanel}
        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600/15 to-purple-600/15 hover:from-blue-600/25 hover:to-purple-600/25 border border-blue-500/25 text-blue-400 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm shadow-blue-500/5"
      >
        <Sparkles size={13} />
        AI Analyst
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <button
        onClick={toggleNotifDrawer}
        className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-zinc-950 shadow-sm shadow-blue-500/50" />
        )}
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-purple-600/20 ring-2 ring-zinc-800">
        AJ
      </div>
    </header>
  )
}
