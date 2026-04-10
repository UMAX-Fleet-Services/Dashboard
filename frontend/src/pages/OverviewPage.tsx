import { Layout } from '@/components/layout/Layout'
import { KPICard } from '@/components/ui/KPICard'
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart'
import { FuelPriceChart } from '@/components/charts/FuelPriceChart'
import { CardUsageDonut } from '@/components/charts/CardUsageDonut'
import { RetentionFunnel } from '@/components/charts/RetentionFunnel'
import { kpiData } from '@/lib/mockData'
import { Activity } from 'lucide-react'

export function OverviewPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Section header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
            <Activity size={16} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm">Key Metrics</h2>
            <p className="text-zinc-500 text-xs">Real-time fleet performance indicators</p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiData.map((kpi, i) => (
            <div key={kpi.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <KPICard
                title={kpi.title}
                value={kpi.value}
                delta={kpi.delta}
                deltaPercent={kpi.deltaPercent}
                sparklineData={kpi.sparklineData}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
              />
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <TransactionVolumeChart />
          <CardUsageDonut />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <FuelPriceChart />
          <RetentionFunnel />
        </div>
      </div>
    </Layout>
  )
}
