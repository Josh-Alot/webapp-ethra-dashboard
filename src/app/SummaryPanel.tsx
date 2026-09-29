import type { ReactNode } from 'react'

/** Left column (380px on desktop): balance card and allocation chart. */
export function SummaryPanel({ children }: { children?: ReactNode }) {
  return (
    <aside className="flex shrink-0 flex-col gap-7 border-line bg-surface-panel px-6 py-7 lg:w-95 lg:border-r">
      {children}
    </aside>
  )
}
