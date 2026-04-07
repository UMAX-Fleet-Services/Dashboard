import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { FileText, Upload } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const docs = [
  { id: '1', name: 'Fleet Card Agreement 2024.pdf', type: 'PDF', size: '2.4 MB', date: '2024-01-15', category: 'Contracts' },
  { id: '2', name: 'Vendor Terms - Loves.pdf', type: 'PDF', size: '1.1 MB', date: '2024-02-08', category: 'Contracts' },
  { id: '3', name: 'Q1 2024 P&L Statement.xlsx', type: 'Excel', size: '340 KB', date: '2024-04-01', category: 'Financial' },
  { id: '4', name: 'Driver Policy Manual v3.pdf', type: 'PDF', size: '4.2 MB', date: '2023-12-01', category: 'Policies' },
  { id: '5', name: 'Card Issuance Guidelines.docx', type: 'Word', size: '890 KB', date: '2024-03-10', category: 'Policies' },
  { id: '6', name: 'Monthly Report Feb 2024.pdf', type: 'PDF', size: '1.8 MB', date: '2024-03-01', category: 'Reports' },
]

const typeColor: Record<string, string> = {
  PDF: 'text-red-400',
  Excel: 'text-emerald-400',
  Word: 'text-blue-400',
}

export function DocumentsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Manage contracts, reports, and policy documents.</p>
          <Button size="sm">
            <Upload size={14} />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {['Contracts', 'Financial', 'Policies', 'Reports'].map((cat) => {
            const count = docs.filter((d) => d.category === cat).length
            return (
              <Card key={cat} className="text-center">
                <FileText size={24} className="text-zinc-400 mx-auto mb-2" />
                <p className="text-zinc-400 text-sm">{cat}</p>
                <p className="text-white font-bold text-xl mt-1">{count}</p>
              </Card>
            )
          })}
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800">
            <h3 className="text-white font-semibold">All Documents</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800">
              <tr>
                {['Name', 'Type', 'Size', 'Category', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-zinc-400 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-zinc-500" />
                      <span className="text-white">{d.name}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 font-medium ${typeColor[d.type] ?? 'text-zinc-400'}`}>{d.type}</td>
                  <td className="px-4 py-3 text-zinc-400">{d.size}</td>
                  <td className="px-4 py-3 text-zinc-400">{d.category}</td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{d.date}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-400 hover:text-blue-300 text-xs cursor-pointer">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  )
}
