import express from 'express'

const router = express.Router()

const aiResponses = [
  "Based on the dashboard data, I can see that total gallons fueled this month is 892,400 — up 8.7% from last month. The top performing employee is Marcus Johnson with 94,200 gallons generated from his card portfolio.",
  "Looking at the fuel price trends, Loves Travel Center is currently offering the best discount at $0.42/gallon, while Pilot Flying J is at $0.38/gallon. With today's fuel price at $3.84/gal, our discount revenue should increase by approximately $4,200 this week.",
  "I've identified 4 customers who haven't swiped in 10+ days — this is a retention risk. I'd recommend having their assigned reps reach out proactively. The accounts at highest risk are: Alpha Trucking LLC (last active 14 days ago) and Zeta Trucking LLC (last active 11 days ago).",
  "The P&L for this month shows gross revenue of $187,200 with net profit of $43,100 (23% margin). The main cost driver is vendor payouts at $89,300. Compared to last month, revenue is up 12.4% but profit is slightly down due to higher operational costs.",
  "Card utilization is currently at 84% retention rate. I recommend focusing on the 16% inactive cards — reaching out to those drivers could recover an estimated $12,400 in monthly revenue based on average card usage patterns.",
]

router.post('/chat', (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  // Set SSE headers for streaming
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  // Pick a contextual response based on keywords, else random
  let fullResponse
  const lower = message.toLowerCase()
  if (lower.includes('fuel') || lower.includes('price')) {
    fullResponse = aiResponses[1]
  } else if (lower.includes('customer') || lower.includes('retention') || lower.includes('risk')) {
    fullResponse = aiResponses[2]
  } else if (lower.includes('profit') || lower.includes('revenue') || lower.includes('finance')) {
    fullResponse = aiResponses[3]
  } else if (lower.includes('card') || lower.includes('usage')) {
    fullResponse = aiResponses[4]
  } else {
    fullResponse = aiResponses[0]
  }

  const words = fullResponse.split(' ')
  let i = 0

  const interval = setInterval(() => {
    if (i < words.length) {
      res.write(`data: ${JSON.stringify({ token: words[i] + ' ' })}\n\n`)
      i++
    } else {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      clearInterval(interval)
      res.end()
    }
  }, 50)

  req.on('close', () => clearInterval(interval))
})

export default router
