import { NavLink } from 'react-router-dom'
import { Home, Zap, Trophy, CreditCard, DollarSign, Fuel, Users, BarChart2, Sparkles, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/transactions', label: 'Transactions', icon: Zap },
  { to: '/sales', label: 'Sales', icon: Trophy },
  { to: '/finance', label: 'Finance', icon: DollarSign },
  { to: '/cards', label: 'Cards', icon: CreditCard },
  { to: '/fuel-prices', label: 'Fuel Prices', icon: Fuel },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/reports', label: 'Reports', icon: BarChart2 },
  { to: '/ai-insights', label: 'AI Insights', icon: Sparkles },
  { to: '/documents', label: 'Documents', icon: FileText },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800/60 flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Fuel size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-tight">UMAX Fleet</p>
            <p className="text-zinc-500 text-xs">Services Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-zinc-600 text-[10px] font-semibold uppercase tracking-wider px-3 mb-2">Navigation</p>
        <div className="space-y-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-blue-400 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-blue-500" />
                  )}
                  <Icon size={16} className={isActive ? 'text-blue-400' : ''} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/60">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/40 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-purple-600/20">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Admin Johnson</p>
            <p className="text-zinc-500 text-xs">Fleet Manager</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
        </div>
      </div>
    </aside>
  )
}
