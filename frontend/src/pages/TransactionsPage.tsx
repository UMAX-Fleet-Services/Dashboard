import { useState, useEffect, useRef } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
} from '@tanstack/react-table'
import { Layout } from '@/components/layout/Layout'
import { FilterBar } from '@/components/layout/FilterBar'
import { Badge } from '@/components/ui/Badge'
import { ExportButton } from '@/components/ui/ExportButton'
import { Card } from '@/components/ui/Card'
import { transactions as initialTx } from '@/lib/mockData'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { format } from 'date-fns'

type TxStatus = 'completed' | 'declined' | 'pending'

interface Transaction {
  id: string
  timestamp: string
  cardMasked: string
  driverName: string
  truckStop: string
  gallons: number
  pricePerGal: number
  totalAmount: number
  status: TxStatus
}

const statusBadge: Record<TxStatus, 'success' | 'danger' | 'warning'> = {
  completed: 'success',
  declined: 'danger',
  pending: 'warning',
}

const col = createColumnHelper<Transaction>()

const columns = [
  col.accessor('id', { header: 'ID', cell: (i) => <span className="text-zinc-400 font-mono text-xs">{i.getValue()}</span> }),
  col.accessor('timestamp', {
    header: 'Time',
    cell: (i) => <span className="text-zinc-300 text-xs">{format(new Date(i.getValue()), 'MMM d, HH:mm')}</span>,
  }),
  col.accessor('cardMasked', { header: 'Card', cell: (i) => <span className="font-mono text-sm text-white">{i.getValue()}</span> }),
  col.accessor('driverName', { header: 'Driver' }),
  col.accessor('truckStop', { header: 'Location' }),
  col.accessor('gallons', { header: 'Gallons', cell: (i) => <span className="font-medium">{i.getValue()}</span> }),
  col.accessor('pricePerGal', { header: 'PPG', cell: (i) => <span>${i.getValue().toFixed(3)}</span> }),
  col.accessor('totalAmount', { header: 'Amount', cell: (i) => <span className="font-semibold text-white">${i.getValue().toFixed(2)}</span> }),
  col.accessor('status', {
    header: 'Status',
    cell: (i) => <Badge variant={statusBadge[i.getValue()]}>{i.getValue()}</Badge>,
  }),
]

const mockNewTx = (): Transaction => {
  const stops = ['Loves #432', 'Pilot #198', 'TA Dallas', 'Flying J Houston']
  const drivers = ['John Smith', 'Mike Davis', 'Tom Wilson', 'Chris Jones']
  const gallons = Math.floor(Math.random() * 150) + 50
  const ppg = +(3.4 + Math.random() * 0.4).toFixed(3)
  return {
    id: `TX-${String(Math.floor(Math.random() * 90000) + 10000)}`,
    timestamp: new Date().toISOString(),
    cardMasked: `****${String(Math.floor(Math.random() * 9000) + 1000)}`,
    driverName: drivers[Math.floor(Math.random() * drivers.length)],
    truckStop: stops[Math.floor(Math.random() * stops.length)],
    gallons,
    pricePerGal: ppg,
    totalAmount: +(gallons * ppg).toFixed(2),
    status: Math.random() > 0.15 ? 'completed' : 'pending',
  }
}

export function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>(initialTx as Transaction[])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [live, setLive] = useState(true)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!live) return
    const timer = setInterval(() => {
      setData((prev) => [mockNewTx(), ...prev.slice(0, 99)])
    }, 4000)
    return () => clearInterval(timer)
  }, [live])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FilterBar search={globalFilter} onSearch={setGlobalFilter} />
          <div className="flex items-center gap-2">
            <Button
              variant={live ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLive(!live)}
            >
              {live ? <Pause size={14} /> : <Play size={14} />}
              {live ? 'Live' : 'Paused'}
            </Button>
            <ExportButton data={data} filename="transactions" chartRef={tableRef} />
          </div>
        </div>

        <Card className="p-0 overflow-hidden" ref={tableRef}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((h) => (
                      <th
                        key={h.id}
                        className="text-left px-4 py-3 text-zinc-400 font-medium text-xs cursor-pointer select-none hover:text-white"
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getIsSorted() === 'asc' ? ' ↑' : h.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2.5 text-zinc-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span>{table.getFilteredRowModel().rows.length} transactions</span>
            {live && <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live</span>}
          </div>
        </Card>
      </div>
    </Layout>
  )
}
