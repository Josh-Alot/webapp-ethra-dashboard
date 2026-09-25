import { formatUnits, isAddress } from 'viem'

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 1234.5 -> "$1,234.50". USD values come from price APIs, so `number` is fine here. */
export function formatUsd(value: number): string {
  return usdFormatter.format(value)
}

const AMOUNT_MIN_DECIMALS = 2
const AMOUNT_MAX_DECIMALS = 4

/**
 * Formats an on-chain amount for display: up to 4 decimals, trailing zeros trimmed past 2.
 * Works on strings end to end, so large balances never lose precision.
 * Truncates instead of rounding, so the UI never shows more than the wallet holds.
 *
 * formatAmount(4218500000000000000n, 18) -> "4.2185"
 * formatAmount(1000000n, 6)              -> "1.00"
 */
export function formatAmount(value: bigint, decimals: number): string {
  const negative = value < 0n
  const [integerPart, fractionPart = ''] = formatUnits(negative ? -value : value, decimals).split('.')

  const fraction = fractionPart
    .slice(0, AMOUNT_MAX_DECIMALS)
    .padEnd(AMOUNT_MIN_DECIMALS, '0')
    .replace(/0+$/, '')
    .padEnd(AMOUNT_MIN_DECIMALS, '0')

  const isTiny = value !== 0n && BigInt(integerPart) === 0n && /^0+$/.test(fraction)
  if (isTiny) return `${negative ? '-' : ''}<0.${'0'.repeat(AMOUNT_MAX_DECIMALS - 1)}1`

  const integer = BigInt(integerPart).toLocaleString('en-US')
  return `${negative ? '-' : ''}${integer}.${fraction}`
}

/** "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" -> "0x71C7…976F" */
export function shortenAddress(address: string): string {
  if (!isAddress(address, { strict: false })) {
    return address
  }
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Local time, "Sep 23 · 14:32". Accepts a Date or a Unix timestamp in milliseconds. */
export function formatDate(value: Date | number): string {
  const date = typeof value === 'number' ? new Date(value) : value
  return `${dateFormatter.format(date)} · ${timeFormatter.format(date)}`
}
