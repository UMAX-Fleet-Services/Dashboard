import { retentionFunnel } from '@/lib/mockData'
import { Card } from '@/components/ui/Card'

export function RetentionFunnel() {
  const maxCount = retentionFunnel[0].count
  return (
    <Card>
      <h3 className="text-white font-semibold mb-4">Retention Funnel</h3>
      <div className="flex flex-col gap-3">
        {retentionFunnel.map((stage, i) => {
          const width = (stage.count / maxCount) * 100
          return (
            <div key={stage.stage} className="relative group">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400 font-medium">{stage.stage}</span>
                <span className="text-white font-semibold">{stage.count.toLocaleString()} <span className="text-zinc-500 font-normal">({stage.percentage}%)</span></span>
              </div>
              <div className="h-8 bg-zinc-800/50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center justify-center transition-all duration-700 group-hover:brightness-110"
                  style={{
                    width: `${width}%`,
                    background: `linear-gradient(135deg, hsl(${220 - i * 20}, 70%, ${55 - i * 5}%), hsl(${220 - i * 20}, 80%, ${45 - i * 5}%))`,
                    boxShadow: `0 0 12px hsl(${220 - i * 20}, 70%, ${55 - i * 5}%, 0.15)`,
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
