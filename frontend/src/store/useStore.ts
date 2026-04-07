import { create } from 'zustand'

interface DashboardStore {
  darkMode: boolean
  toggleDarkMode: () => void
  dateRange: 'today' | 'week' | 'month' | 'custom'
  setDateRange: (r: string) => void
  filterEmployee: string | null
  setFilterEmployee: (e: string | null) => void
  aiPanelOpen: boolean
  toggleAIPanel: () => void
  notifDrawerOpen: boolean
  toggleNotifDrawer: () => void
}

export const useStore = create<DashboardStore>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  dateRange: 'month',
  setDateRange: (r) => set({ dateRange: r as 'today' | 'week' | 'month' | 'custom' }),
  filterEmployee: null,
  setFilterEmployee: (e) => set({ filterEmployee: e }),
  aiPanelOpen: false,
  toggleAIPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  notifDrawerOpen: false,
  toggleNotifDrawer: () => set((s) => ({ notifDrawerOpen: !s.notifDrawerOpen })),
}))
