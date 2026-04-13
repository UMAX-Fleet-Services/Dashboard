import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { AIPanel } from '@/components/ai/AIPanel'
import { NotificationDrawer } from '@/components/notifications/NotificationDrawer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-950 relative">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-3xl pointer-events-none" />

      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px] relative">
        <TopBar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <AIPanel />
      <NotificationDrawer />
    </div>
  )
}
