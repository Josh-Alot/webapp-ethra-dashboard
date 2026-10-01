import type { Address } from 'viem'
import { cn } from '../lib/cn'
import { shortenAddress } from '../lib/format'
import { CopyButton } from './CopyButton'
import { ExplorerLink } from './ExplorerLink'

interface AddressChipProps {
  /** Full checksummed address. Shown shortened, copied in full. */
  address: Address
  ensName?: string
  /** Explorer page for this address. Omitted on networks without an explorer (Anvil). */
  explorerUrl?: string
}

/**
 * The connected account in the header: ENS name (when there is one), short address, copy, explorer.
 * Extension point: becomes <WalletSwitcher> for multi-wallet (same footprint, adds a chevron and a menu).
 */
export function AddressChip({ address, ensName, explorerUrl }: AddressChipProps) {
  return (
    <div className="flex h-8 items-center gap-2 rounded border border-line bg-surface-subtle pr-0.5 pl-3">
      {ensName && <span className="text-body font-medium text-ink">{ensName}</span>}
      <span className={cn('num text-caption', ensName ? 'text-ink-muted' : 'text-ink')}>{shortenAddress(address)}</span>
      <CopyButton value={address} label="Copy address" />
      {explorerUrl && <ExplorerLink href={explorerUrl} label="View address on explorer" />}
    </div>
  )
}
