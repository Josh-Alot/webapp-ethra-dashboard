import { cn } from '../lib/cn'

export type TxStatus = 'confirmed' | 'pending' | 'failed'

interface StatusBadgeProps {
  status: TxStatus
  className?: string
}

// Shape + label, never color alone: filled square = final, hollow pulsing square = pending.
const statusStyles: Record<TxStatus, { badge: string; marker: string; label: string }> = {
  confirmed: { badge: 'bg-gain-bg text-gain', marker: 'bg-gain', label: 'Confirmed' },
  pending: {
    badge: 'bg-pending-bg text-pending',
    marker: 'border-[1.5px] border-pending animate-[ethra-pulse_1.2s_ease-in-out_infinite] motion-reduce:animate-none',
    label: 'Pending',
  },
  failed: { badge: 'bg-loss-bg text-loss', marker: 'bg-loss', label: 'Failed' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = statusStyles[status]

  return (
    <span
      className={cn(
        'num inline-flex h-5.5 items-center gap-1.5 rounded px-2 text-[11px] uppercase tracking-[0.06em]',
        styles.badge,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5', styles.marker)} />
      {styles.label}
    </span>
  )
}
