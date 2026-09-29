import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getNetwork } from '../config/chains'
import { NetworkBadge } from './NetworkBadge'

const sepolia = getNetwork(11155111)!

describe('NetworkBadge', () => {
  it('shows the full label in the selector variant', () => {
    render(<NetworkBadge active={{ status: 'supported', network: sepolia }} />)

    const badge = screen.getByRole('button', { name: 'Network: Ethereum Sepolia' })
    expect(badge.textContent).toBe('SEPOLIA · TESTNET')
  })

  it('shows the short label in the compact variant', () => {
    render(<NetworkBadge active={{ status: 'supported', network: sepolia }} variant="compact" />)

    expect(screen.getByRole('button').textContent).toBe('SEPOLIA')
  })

  it('is not interactive in the static variant', () => {
    render(<NetworkBadge active={{ status: 'supported', network: sepolia }} variant="static" />)

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByText('SEPOLIA · TESTNET')).toBeTruthy()
  })

  it('shows the chain id of an unsupported network', () => {
    render(<NetworkBadge active={{ status: 'unsupported', chainId: 137 }} />)

    const badge = screen.getByRole('button', { name: 'Unsupported network (chain 137)' })
    expect(badge.textContent).toBe('UNSUPPORTED · 137')
  })
})
