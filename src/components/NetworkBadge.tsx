import type { ButtonHTMLAttributes } from 'react'
import type { NetworkKey } from '../config/chains'
import type { ActiveNetwork } from '../data/useActiveNetwork'
import { cn } from '../lib/cn'
import { ChevronDownIcon, WarningIcon } from './icons'

type BadgeVariant = 'selector' | 'static' | 'compact'

interface NetworkBadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: ActiveNetwork
  /** selector: 32px button with chevron · static: 32px label · compact: 44px mobile button, short label */
  variant?: BadgeVariant
}

// Full class names so Tailwind can find them at build time (no string interpolation).
const toneClass: Record<NetworkKey | 'unsupported', { badge: string; marker: string }> = {
  mainnet: { badge: 'bg-network-mainnet-bg border-network-mainnet-border text-network-mainnet-fg', marker: 'bg-network-mainnet' },
  sepolia: { badge: 'bg-network-sepolia-bg border-network-sepolia-border text-network-sepolia-fg', marker: 'bg-network-sepolia' },
  local: { badge: 'bg-network-local-bg border-network-local-border text-network-local-fg', marker: 'bg-network-local' },
  unsupported: { badge: 'bg-loss-bg border-loss/45 text-loss', marker: '' },
}

/** Always shows color + label + chain id, never color alone. */
export function NetworkBadge({ active, variant = 'selector', className, ...buttonProps }: NetworkBadgeProps) {
  const isSupported = active.status === 'supported'
  const tone = toneClass[isSupported ? active.network.key : 'unsupported']
  const isCompact = variant === 'compact'

  let label: string
  let accessibleName: string
  if (isSupported) {
    label = isCompact ? active.network.shortLabel : active.network.label
    accessibleName = `Network: ${active.network.name}`
  } else {
    label = isCompact ? 'UNSUPPORTED' : `UNSUPPORTED · ${active.chainId}`
    accessibleName = `Unsupported network (chain ${active.chainId})`
  }

  const content = (
    <>
      {isSupported ? (
        <span aria-hidden="true" className={cn('size-2 shrink-0', tone.marker)} />
      ) : (
        <WarningIcon size={12} />
      )}
      <span className="num text-caption font-medium">{label}</span>
      {variant !== 'static' && <ChevronDownIcon size={12} />}
    </>
  )

  const baseClass = cn(
    'inline-flex items-center gap-2 rounded border',
    isCompact ? 'h-11 px-3' : 'h-8 px-2.5',
    tone.badge,
    className,
  )

  if (variant === 'static') {
    // Plain text badge: screen readers read the visible label.
    return <span className={baseClass}>{content}</span>
  }

  return (
    <button type="button" aria-label={accessibleName} className={cn(baseClass, 'cursor-pointer')} {...buttonProps}>
      {content}
    </button>
  )
}
