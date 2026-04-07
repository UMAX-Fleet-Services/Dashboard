import { Layout } from '@/components/layout/Layout'
import { KPICard } from '@/components/ui/KPICard'
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart'
import { FuelPriceChart } from '@/components/charts/FuelPriceChart'
import { CardUsageDonut } from '@/components/charts/CardUsageDonut'
import { RetentionFunnel } from '@/components/charts/RetentionFunnel'
import { kpiData } from '@/lib/mockData'

export function OverviewPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <KPICard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              delta={kpi.delta}
              deltaPercent={kpi.deltaPercent}
              sparklineData={kpi.sparklineData}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
            />
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
