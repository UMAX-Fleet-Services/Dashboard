import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { AIPanel } from '@/components/ai/AIPanel'
import { NotificationDrawer } from '@/components/notifications/NotificationDrawer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
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
