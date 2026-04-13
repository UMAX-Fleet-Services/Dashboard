import { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import Papa from 'papaparse'

interface ExportButtonProps {
  data?: object[]
  filename?: string
  chartRef?: React.RefObject<HTMLDivElement | null>
}

export function ExportButton({ data, filename = 'export', chartRef }: ExportButtonProps) {
  const [open, setOpen] = useState(false)

  const exportCSV = () => {
    if (!data) return
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const exportPNG = async () => {
    if (!chartRef?.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(chartRef.current)
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.png`
      a.click()
    } catch {
      console.error('PNG export failed')
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        <Download size={14} />
        Export
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/60 rounded-xl shadow-2xl shadow-black/40 z-50 min-w-[140px] overflow-hidden">
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
            onClick={exportCSV}
          >
            Export CSV
          </button>
          <div className="h-px bg-zinc-800/60" />
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
            onClick={exportPNG}
          >
            Export PNG
          </button>
        </div>
      )}
    </div>
  )
}
