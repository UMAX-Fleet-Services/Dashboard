import { useState, useRef, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Send, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome to UMAX AI Fleet Insights! I can help you analyze your fleet performance, identify trends, forecast revenue, and surface actionable opportunities. What would you like to explore today?',
    timestamp: new Date().toLocaleTimeString(),
  },
]

const quickPrompts = [
  'Summarize this month\'s performance',
  'Which cards are underperforming?',
  'What\'s causing the decline rate spike?',
  'Forecast Q2 revenue',
  'Show me churn risk customers',
  'Compare top vs bottom reps',
]

const aiResponses = [
  'This month\'s performance is strong: 1,247 active cards (+1.9%), 892,400 gallons dispensed (+1.4%), and net profit of $43,100 (+2.6%). Retention rate at 84% is above the 80% benchmark. Key win: 23 new cards issued this month.',
  'Cards with below-average performance: ****4821 (0 activity, 18 days), ****7394 (declined 3x this week), ****2817 (usage 89% below card average). Recommend outreach to these 3 accounts — potential $2,400/month at risk.',
  'The decline rate (3.2%) is slightly elevated vs last week (2.8%). Primary driver: 45% are "insufficient funds" — indicating some customers may be over-extended. 32% are limit-related — you may want to review limit settings for high-volume cards.',
  'Q2 Revenue Forecast: $192,400 (Base case) | $201,800 (Optimistic, +4.5%) | $178,200 (Conservative, -7.4%). Key assumptions: 3% card growth, stable fuel prices, 82%+ retention. Main upside risk: 3 large fleet accounts in pipeline.',
  'Churn risk analysis: 4 customers have declined activity: Alpha Trucking (−40% vs avg), Delta Trucking (last active 21 days ago), Eta Trucking (reduced from 15 to 8 cards). Total at-risk revenue: ~$4,100/month.',
  'Top 3 reps avg: $19,200 revenue, 92% usage rate, 28 active cards. Bottom 3 reps avg: $10,400 revenue, 74% usage rate, 11 active cards. The gap is primarily in card activation follow-through — bottom reps issue cards but don\'t drive activation.',
]

export function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const response = aiResponses[idxRef.current % aiResponses.length]
      idxRef.current++
      setMessages((m) => [...m, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString(),
      }])
      setLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Sidebar with quick prompts */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-white font-semibold text-sm mb-3">Quick Prompts</h3>
            <div className="space-y-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="w-full text-left text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-white font-semibold text-sm mb-3">AI Capabilities</h3>
            <div className="space-y-2 text-xs text-zinc-400">
              {['Fleet analytics', 'Revenue forecasting', 'Churn prediction', 'Performance benchmarking', 'Trend analysis', 'Anomaly detection'].map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat area */}
        <div className="col-span-3 flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Sparkles size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">UMAX AI Fleet Analyst</p>
              <p className="text-zinc-500 text-xs">Powered by fleet intelligence • Always on</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${msg.role === 'user' ? '' : 'flex gap-3'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={13} className="text-blue-400" />
                    </div>
                  )}
                  <div>
                    <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-200'
                    }`}>
                      {msg.content}
                    </div>
                    <p className="text-zinc-600 text-xs mt-1 px-1">{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={13} className="text-blue-400" />
                </div>
                <div className="bg-zinc-800 rounded-xl px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask anything about your fleet..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
            />
            <Button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}>
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
