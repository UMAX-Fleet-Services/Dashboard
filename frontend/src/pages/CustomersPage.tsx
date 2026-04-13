import { useState } from 'react'
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
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FilterBar } from '@/components/layout/FilterBar'
import { customers } from '@/lib/mockData'
import { Users, UserCheck, DollarSign } from 'lucide-react'

type Customer = typeof customers[number]

const col = createColumnHelper<Customer>()

const columns = [
  col.accessor('id', { header: 'ID', cell: (i) => <span className="text-zinc-500 text-xs font-mono">{i.getValue()}</span> }),
  col.accessor('company', { header: 'Company', cell: (i) => <span className="text-white font-medium">{i.getValue()}</span> }),
  col.accessor('contactName', { header: 'Contact' }),
  col.accessor('cards', { header: 'Cards', cell: (i) => <span className="font-semibold">{i.getValue()}</span> }),
  col.accessor('monthlyGallons', { header: 'Monthly Gallons', cell: (i) => <span>{i.getValue().toLocaleString()}</span> }),
  col.accessor('monthlyRevenue', { header: 'Monthly Revenue', cell: (i) => <span className="text-white font-semibold">${i.getValue().toLocaleString()}</span> }),
  col.accessor('status', {
    header: 'Status',
    cell: (i) => <Badge variant={i.getValue() === 'active' ? 'success' : 'default'}>{i.getValue()}</Badge>,
  }),
  col.accessor('joinDate', { header: 'Joined', cell: (i) => <span className="text-zinc-400 text-xs">{i.getValue()}</span> }),
]

export function CustomersPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: customers,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const active = customers.filter((c) => c.status === 'active').length
  const totalRevenue = customers.reduce((s, c) => s + c.monthlyRevenue, 0)

  const summaryItems = [
    { label: 'Total Customers', value: customers.length, icon: Users, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
    { label: 'Active', value: active, icon: UserCheck, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10', valueColor: 'text-emerald-400' },
    { label: 'Total Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
  ]

  return (
    <Layout>
      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {summaryItems.map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                    <Icon size={16} className={s.iconColor} />
                  </div>
                </div>
                <p className="text-zinc-400 text-sm">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 tracking-tight ${'valueColor' in s ? s.valueColor : 'text-white'}`}>{s.value}</p>
              </Card>
            )
          })}
        </div>

        <FilterBar search={globalFilter} onSearch={setGlobalFilter} />

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800/60 bg-zinc-900/50">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((h) => (
                      <th
                        key={h.id}
                        className="text-left px-4 py-3 text-zinc-400 font-medium text-xs cursor-pointer hover:text-white transition-colors"
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
                  <tr key={row.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
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
          <div className="px-4 py-2.5 border-t border-zinc-800/60 text-xs text-zinc-500 bg-zinc-900/30">
            {table.getFilteredRowModel().rows.length} customers
          </div>
        </Card>
      </div>
    </Layout>
  )
}
