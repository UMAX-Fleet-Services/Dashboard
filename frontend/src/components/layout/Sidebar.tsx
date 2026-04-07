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
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-zinc-950 border-r border-zinc-800 flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Fuel size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">UMAX Fleet</p>
            <p className="text-zinc-500 text-xs">Services Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            AJ
          </div>
          <div>
            <p className="text-white text-xs font-medium">Admin Johnson</p>
            <p className="text-zinc-500 text-xs">Fleet Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
