import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { notifications as initialNotifications } from '@/lib/mockData'

const iconMap = {
  warning: <AlertTriangle size={16} className="text-amber-400" />,
  success: <CheckCircle size={16} className="text-emerald-400" />,
  danger: <XCircle size={16} className="text-red-400" />,
  info: <Info size={16} className="text-blue-400" />,
}

const bgMap = {
  warning: 'border-amber-500/15',
  success: 'border-emerald-500/15',
  danger: 'border-red-500/15',
  info: 'border-blue-500/15',
}

export function NotificationDrawer() {
  const { notifDrawerOpen, toggleNotifDrawer } = useStore()
  const [notifs, setNotifs] = useState(initialNotifications)

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })))
  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <AnimatePresence>
      {notifDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleNotifDrawer}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[380px] bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800/60 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/60">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-white" />
                <span className="text-white font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm shadow-blue-600/20">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllRead}
                  className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer font-medium transition-colors"
                >
                  Mark all read
                </button>
                <button onClick={toggleNotifDrawer} className="text-zinc-400 hover:text-white cursor-pointer p-1.5 hover:bg-zinc-800/50 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {notifs.map((n) => (
                <div
                  key={n.id}
                  className={`bg-zinc-900/60 border rounded-2xl p-3.5 flex gap-3 transition-all duration-200 hover:bg-zinc-900/80 ${bgMap[n.type]} ${!n.read ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className="mt-0.5 flex-shrink-0">{iconMap[n.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-medium truncate">{n.title}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm shadow-blue-500/50" />}
                    </div>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-zinc-600 text-xs mt-1.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
