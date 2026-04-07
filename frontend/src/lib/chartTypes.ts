export interface TooltipEntry {
  dataKey?: string | number
  name?: string
  value?: number | string | readonly (number | string)[]
  color?: string
  payload?: Record<string, unknown>
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string | number
}
