import type { ReactNode } from 'react'
import { EthraWordmark } from './Logo'
import { NetworkMenu } from './NetworkMenu'

interface HeaderProps {
  /** Extension point for MVP 2/3 (global Send / Swap). Empty in MVP 1. */
  actions?: ReactNode
  /** Account area (address chip, disconnect). Filled in Feature 3. */
  account?: ReactNode
}

/** The 2px top line comes from `--color-network`, so the header has no per-network logic. */
export function Header({ actions, account }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface-panel px-6 shadow-[var(--ring-network)]">
      <div className="flex items-center gap-5">
        <EthraWordmark size={24} />
        <span aria-hidden="true" className="h-6 w-px shrink-0 bg-line" />
        <NetworkMenu />
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {account}
      </div>
    </header>
  )
}
