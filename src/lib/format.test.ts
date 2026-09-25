import { describe, expect, it } from 'vitest'
import { formatAmount, formatDate, formatUsd, shortenAddress } from './format'

describe('formatUsd', () => {
  it('uses en-US currency format with 2 decimals', () => {
    expect(formatUsd(33217.968)).toBe('$33,217.97')
    expect(formatUsd(0)).toBe('$0.00')
  })
})

describe('formatAmount', () => {
  it('shows up to 4 decimals', () => {
    expect(formatAmount(4218500000000000000n, 18)).toBe('4.2185')
  })

  it('trims trailing zeros past 2 decimals', () => {
    expect(formatAmount(1500000000000000000n, 18)).toBe('1.50')
    expect(formatAmount(1000000n, 6)).toBe('1.00')
    expect(formatAmount(1230000n, 6)).toBe('1.23')
  })

  it('truncates instead of rounding', () => {
    expect(formatAmount(999999n, 6)).toBe('0.9999')
  })

  it('adds thousands separators without losing precision', () => {
    expect(formatAmount(123456789012345678901234567n, 18)).toBe('123,456,789.0123')
  })

  it('marks amounts too small to display', () => {
    expect(formatAmount(1n, 18)).toBe('<0.0001')
    expect(formatAmount(0n, 18)).toBe('0.00')
  })
})

describe('formatDate', () => {
  it('formats local time as "Sep 23 · 14:32"', () => {
    expect(formatDate(new Date(2026, 8, 23, 14, 32))).toBe('Sep 23 · 14:32')
    expect(formatDate(new Date(2026, 0, 5, 9, 7).getTime())).toBe('Jan 5 · 09:07')
  })
})

describe('shortenAddress', () => {
  it('shortens the EVM address to 0x + 4…4', () => {
    expect(shortenAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')).toBe('0x71C7…976F')
  })

  it('preserves the EIP-55 checksum casing', () => {
    expect(shortenAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')).toBe('0xf39F…2266')
  })

  it('returns the short input unchanged', () => {
    expect(shortenAddress('0xf39Fd6e')).toBe('0xf39Fd6e')
  })

  it('returns an empty string when the address is empty', () => {
    expect(shortenAddress('')).toBe('')
  })

  it('returns the shortened address with the EVM address pattern', () => {
    expect(shortenAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')).toMatch(/^0x[0-9a-fA-F]{4}…[0-9a-fA-F]{4}$/)
  })

  it('returns the non-address input unchanged', () => {
    expect(shortenAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb922660')).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb922660')
    expect(shortenAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226')).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226')
    expect(shortenAddress('hello world, this is a verification test')).toBe('hello world, this is a verification test')
  })
})
