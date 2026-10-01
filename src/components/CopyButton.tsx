import { cn } from '../lib/cn'
import { useCopyToClipboard } from '../lib/useCopyToClipboard'
import { CheckIcon, CopyIcon } from './icons'

interface CopyButtonProps {
  /** Text written to the clipboard. */
  value: string
  /** Accessible name, e.g. "Copy address". */
  label: string
}

/** Icon button that copies `value` and confirms with COPIED for 1.5s. */
export function CopyButton({ value, label }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  // One <button> for both states, so keyboard focus stays put when the label swaps in.
  return (
    <button
      type="button"
      aria-label={copied ? 'Copied' : label}
      title={copied ? undefined : label}
      onClick={() => copy(value)}
      className={cn(
        'inline-flex h-7 shrink-0 cursor-pointer items-center justify-center rounded border border-transparent bg-transparent',
        'transition-colors duration-fast',
        copied ? 'num gap-1 px-1.5 text-[11px] text-gain' : 'w-7 text-ink-muted hover:bg-surface-subtle hover:text-ink',
      )}
    >
      {copied ? (
        <>
          <CheckIcon size={12} />
          COPIED
        </>
      ) : (
        <CopyIcon />
      )}
    </button>
  )
}
