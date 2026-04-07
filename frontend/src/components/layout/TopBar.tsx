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
    <header className="sticky top-0 h-14 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 flex items-center px-6 gap-4 z-20">
      <h1 className="text-white font-semibold text-lg flex-1">{title}</h1>

      {/* Date range tabs */}
      <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1">
        {dateRanges.map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors cursor-pointer ${
              dateRange === range
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* AI button */}
      <button
        onClick={toggleAIPanel}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-colors cursor-pointer"
      >
        <Sparkles size={13} />
        AI Analyst
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <button
        onClick={toggleNotifDrawer}
        className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
        )}
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
        AJ
      </div>
    </header>
  )
}
