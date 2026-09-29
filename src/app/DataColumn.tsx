import type { ReactNode } from 'react'

/** Right column: token table and transaction list. */
export function DataColumn({ children }: { children?: ReactNode }) {
  return <main className="flex min-w-0 grow flex-col">{children}</main>
}
