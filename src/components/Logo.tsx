import { useId } from 'react'
import { cn } from '../lib/cn'

type LogoTone = 'brand' | 'mono'

interface SymbolProps {
  /** Rendered size in px. Below 24px the simplified 2-band symbol is used automatically. */
  size?: number
  tone?: LogoTone
  className?: string
}

// Horizon bands on a 32-unit grid (see H01 Brand Guidelines).
const BANDS_FULL = [
  { y: 17, height: 1.6 },
  { y: 20.8, height: 2 },
  { y: 24.8, height: 2.6 },
]
const BANDS_SMALL = [
  { y: 18, height: 3 },
  { y: 24, height: 3.6 },
]
const SMALL_SYMBOL_MAX_SIZE = 24

const toneClass: Record<LogoTone, string> = {
  brand: 'text-brand',
  mono: 'text-ink',
}

/** The sun sliced by horizon lines. Decorative: pair it with a visible "Ethra" or an aria-label. */
export function EthraSymbol({ size = 32, tone = 'brand', className }: SymbolProps) {
  // Each <svg> needs its own mask id, otherwise two logos on the same page would clash.
  const maskId = `ethra-mask-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  const isSmall = size < SMALL_SYMBOL_MAX_SIZE
  const bands = isSmall ? BANDS_SMALL : BANDS_FULL

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('shrink-0', toneClass[tone], className)}
    >
      <defs>
        <mask id={maskId}>
          <rect width="32" height="32" fill="white" />
          {bands.map((band) => (
            <rect key={band.y} x="0" y={band.y} width="32" height={band.height} fill="black" />
          ))}
        </mask>
      </defs>
      <circle cx="16" cy="16" r={isSmall ? 13 : 12} fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

interface WordmarkProps {
  /** Symbol size in px; the text scales with it. */
  size?: number
  className?: string
}

/** Symbol + "Ethra". Below 72px wide, use EthraSymbol alone. */
export function EthraWordmark({ size = 24, className }: WordmarkProps) {
  return (
    <span
      className={cn('inline-flex items-center font-semibold tracking-[0.01em] text-ink', className)}
      style={{ gap: size * 0.4, fontSize: size * 0.75 }}
    >
      <EthraSymbol size={size} />
      Ethra
    </span>
  )
}
