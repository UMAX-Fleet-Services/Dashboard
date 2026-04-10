import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const suggestedPrompts = [
  'What cards have the highest gallons this month?',
  'Show decline trends for last 7 days',
  'Which employees need attention?',
  'Forecast next month revenue',
]

const aiResponses = [
  'Based on your fleet data, the top 3 cards by gallons this month are ****4821 (2,340 gal), ****7392 (2,180 gal), and ****1093 (1,970 gal). All are trending above the 715 gal average.',
  'Decline rate analysis: The past 7 days show a 3.2% decline rate, up slightly from 2.8% last week. Primary reasons: insufficient funds (45%), card limits (32%), vendor restrictions (23%).',
  'Attention needed: 3 employees have cards with 0 activity in 14+ days. Marcus Johnson has 8 inactive cards out of 42 assigned. Recommend follow-up.',
  'Revenue forecast for next month: Based on current velocity and seasonal trends, projected gross revenue is $194,800 ± $8,200. This represents a 4.1% increase from current month.',
  'I analyzed your fleet data. Here are the key insights: Active card utilization is at 77.2%, retention is strong at 84%, and net profit margin is holding at 23%. Main risk: 42 dormant cards costing ~$840/mo in overhead.',
]

export function AIPanel() {
  const { aiPanelOpen, toggleAIPanel } = useStore()
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: 'Hi! I\'m your UMAX AI Fleet Analyst. Ask me anything about your fleet performance, transactions, or trends.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const responseIdxRef = useRef(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const response = aiResponses[responseIdxRef.current % aiResponses.length]
      responseIdxRef.current++
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }])
      setLoading(false)
    }, 1200 + Math.random() * 800)
  }

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleAIPanel}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[400px] bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800/60 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/60">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">UMAX AI Analyst</p>
                  <p className="text-zinc-500 text-xs">Powered by fleet intelligence</p>
                </div>
              </div>
              <button onClick={toggleAIPanel} className="text-zinc-400 hover:text-white cursor-pointer p-1.5 hover:bg-zinc-800/50 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Proactive insights */}
            <div className="p-3 border-b border-zinc-800/60 bg-gradient-to-b from-blue-950/20 to-transparent">
              <p className="text-xs text-zinc-400 mb-2 font-semibold uppercase tracking-wider">Proactive Insights</p>
              <div className="flex flex-col gap-2">
                <div className="bg-amber-500/10 border border-amber-500/15 rounded-xl p-2.5">
                  <p className="text-amber-400 text-xs font-medium">⚠ Revenue Opportunity</p>
                  <p className="text-zinc-400 text-xs mt-0.5">42 dormant cards could generate ~$12K/mo if reactivated.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-2.5">
                  <p className="text-emerald-400 text-xs font-medium">✓ Performance Up</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Net profit margin increased 2.1% vs last month.</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm shadow-blue-600/10'
                      : 'bg-zinc-800/60 text-zinc-200 border border-zinc-700/40'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-2xl px-3.5 py-2.5 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 px-2.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 border border-zinc-700/30 hover:border-zinc-600/50"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800/60 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about your fleet..."
                className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
              />
              <Button size="sm" onClick={() => sendMessage(input)} disabled={!input.trim() || loading}>
                <Send size={14} />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
