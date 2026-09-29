import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { getNetwork } from '../config/chains'
import { useActiveNetwork } from '../data/useActiveNetwork'
import { NetworkMenu } from './NetworkMenu'

vi.mock('wagmi', () => ({ useSwitchChain: vi.fn() }))
vi.mock('../data/useActiveNetwork', () => ({ useActiveNetwork: vi.fn() }))

const switchChain = vi.fn()

function renderMenu() {
  render(
    <div>
      <p>Outside</p>
      <NetworkMenu />
    </div>,
  )
  return userEvent.setup()
}

describe('NetworkMenu', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(useActiveNetwork).mockReturnValue({ status: 'supported', network: getNetwork(31337)! })
    vi.mocked(useSwitchChain).mockReturnValue({ mutate: switchChain } as unknown as ReturnType<typeof useSwitchChain>)
  })

  it('opens and closes from the badge', async () => {
    const user = renderMenu()
    const badge = screen.getByRole('button', { name: 'Network: Anvil (local)' })

    await user.click(badge)
    expect(screen.getByRole('menu')).toBeTruthy()
    expect(badge.getAttribute('aria-expanded')).toBe('true')

    await user.click(badge)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('marks the active network', async () => {
    const user = renderMenu()
    await user.click(screen.getByRole('button', { name: 'Network: Anvil (local)' }))

    expect(screen.getByRole('menuitemradio', { name: /Anvil/ }).getAttribute('aria-checked')).toBe('true')
    expect(screen.getByRole('menuitemradio', { name: /Sepolia/ }).getAttribute('aria-checked')).toBe('false')
  })

  it('closes on Escape', async () => {
    const user = renderMenu()
    await user.click(screen.getByRole('button', { name: 'Network: Anvil (local)' }))

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('closes on a click outside', async () => {
    const user = renderMenu()
    await user.click(screen.getByRole('button', { name: 'Network: Anvil (local)' }))

    await user.click(screen.getByText('Outside'))
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('asks to switch chain and closes when a network is chosen', async () => {
    const user = renderMenu()
    await user.click(screen.getByRole('button', { name: 'Network: Anvil (local)' }))

    await user.click(screen.getByRole('menuitemradio', { name: /Sepolia/ }))
    expect(switchChain).toHaveBeenCalledWith({ chainId: 11155111 })
    expect(screen.queryByRole('menu')).toBeNull()
  })
})
