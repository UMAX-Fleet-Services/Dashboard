import { Layout } from '@/components/layout/Layout'
import { FuelPriceChart } from '@/components/charts/FuelPriceChart'
import { Card } from '@/components/ui/Card'
import { fuelPriceData } from '@/lib/mockData'

const vendors = ['loves', 'pilot', 'ta', 'fleetOne'] as const
type VendorKey = typeof vendors[number]

const vendorNames: Record<VendorKey, string> = {
  loves: "Love's Travel Stops",
  pilot: 'Pilot Flying J',
  ta: 'TravelCenters of America',
  fleetOne: 'Fleet One',
}

const vendorColors: Record<VendorKey, string> = {
  loves: '#3B82F6',
  pilot: '#10B981',
  ta: '#F59E0B',
  fleetOne: '#A855F7',
}

export function FuelPricesPage() {
  const latest = fuelPriceData[fuelPriceData.length - 1]
  const prev = fuelPriceData[fuelPriceData.length - 2]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Current price cards */}
        <div className="grid grid-cols-4 gap-4">
          {vendors.map((v) => {
            const curr = latest[v]
            const change = curr - prev[v]
            return (
              <Card key={v} className="text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${vendorColors[v]}, transparent)` }} />
                <div className="w-4 h-4 rounded-full mx-auto mb-2 shadow-sm" style={{ backgroundColor: vendorColors[v], boxShadow: `0 0 10px ${vendorColors[v]}40` }} />
                <p className="text-zinc-400 text-xs mb-1">{vendorNames[v]}</p>
                <p className="text-2xl font-bold text-white tracking-tight">${curr.toFixed(3)}</p>
                <p className={`text-xs mt-1 font-medium ${change >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {change >= 0 ? '+' : ''}{change.toFixed(3)} vs yesterday
                </p>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4">
          <FuelPriceChart />
        </div>

        {/* Price table */}
        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/50">
            <h3 className="text-white font-semibold">Price History (Last 7 Days)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800/60">
                <tr>
                  <th className="text-left px-4 py-2.5 text-zinc-400 font-medium text-xs">Date</th>
                  {vendors.map((v) => (
                    <th key={v} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: vendorColors[v] }}>
                      {vendorNames[v].split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fuelPriceData.slice(-7).reverse().map((d) => (
                  <tr key={d.date} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-2.5 text-zinc-300">{d.date}</td>
                    {vendors.map((v) => (
                      <td key={v} className="px-4 py-2.5 text-white font-medium">${d[v].toFixed(3)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
