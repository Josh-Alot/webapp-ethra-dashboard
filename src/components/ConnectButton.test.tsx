import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useWallet, type Wallet } from '../data/useWallet'
import { ConnectButton } from './ConnectButton'

vi.mock('../data/useWallet', () => ({
  useWallet: vi.fn(),
}))

/** A disconnected wallet; each test overrides only the fields it cares about. */
function mockWallet(overrides: Partial<Wallet> = {}) {
  const wallet: Wallet = {
    address: undefined,
    ensName: undefined,
    isConnected: false,
    isConnecting: false,
    isReconnecting: false,
    connectError: null,
    connect: vi.fn(),
    disconnect: vi.fn(),
    ...overrides,
  }
  vi.mocked(useWallet).mockReturnValue(wallet)
  return wallet
}

/** wagmi errors are told apart by `name`, so a plain Error with that name is enough. */
function namedError(name: string): Error {
  const error = new Error('failed')
  error.name = name
  return error
}

describe('ConnectButton', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('connects on click', async () => {
    const wallet = mockWallet()
    render(<ConnectButton />)

    await userEvent.click(screen.getByRole('button', { name: 'Connect wallet' }))

    expect(wallet.connect).toHaveBeenCalledOnce()
  })

  it('shows a busy, disabled button while the wallet popup is open', () => {
    mockWallet({ isConnecting: true })
    render(<ConnectButton />)

    const button = screen.getByRole('button', { name: 'Connecting…' })
    expect(button.hasAttribute('disabled')).toBe(true)
    expect(button.getAttribute('aria-busy')).toBe('true')
  })

  it('shows no message before any attempt failed', () => {
    mockWallet()
    render(<ConnectButton />)

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it.each([
    ['UserRejectedRequestError', "Connection rejected. Try again when you're ready."],
    ['ProviderNotFoundError', 'No wallet found. Install a browser wallet such as MetaMask.'],
    ['SomethingElseError', "Couldn't connect. Try again."],
  ])('explains a %s and keeps the button enabled', (errorName, message) => {
    mockWallet({ connectError: namedError(errorName) })
    render(<ConnectButton />)

    expect(screen.getByRole('alert').textContent).toBe(message)
    expect(screen.getByRole('button', { name: 'Connect wallet' }).hasAttribute('disabled')).toBe(false)
  })
})
