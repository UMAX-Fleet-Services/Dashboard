import { retentionFunnel } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'

export function RetentionFunnel() {
  const maxCount = retentionFunnel[0].count
  return (
    <Card>
      <h3 className="text-white font-semibold mb-4">Retention Funnel</h3>
      <div className="flex flex-col gap-2">
        {retentionFunnel.map((stage, i) => {
          const width = (stage.count / maxCount) * 100
          return (
            <div key={stage.stage} className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">{stage.stage}</span>
                <span className="text-white font-medium">{stage.count.toLocaleString()} <span className="text-zinc-500">({stage.percentage}%)</span></span>
              </div>
              <div className="h-7 bg-zinc-800 rounded overflow-hidden">
                <div
                  className="h-full rounded flex items-center justify-center transition-all duration-700"
                  style={{
                    width: `${width}%`,
                    background: `hsl(${220 - i * 20}, 70%, ${55 - i * 5}%)`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
