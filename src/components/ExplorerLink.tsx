import { ExternalLinkIcon } from './icons'

interface ExplorerLinkProps {
  href: string
  /** Accessible name, e.g. "View address on explorer". */
  label: string
}

/** Icon link to a block explorer page. Opens in a new tab. */
export function ExplorerLink({ href, label }: ExplorerLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded text-ink-muted transition-colors duration-fast hover:bg-surface-subtle hover:text-ink"
    >
      <ExternalLinkIcon />
    </a>
  )
}
