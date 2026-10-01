import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AddressChip } from './AddressChip'

const ADDRESS = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

describe('AddressChip', () => {
  it('shows the short address and links to the explorer', () => {
    render(<AddressChip address={ADDRESS} explorerUrl={`https://etherscan.io/address/${ADDRESS}`} />)

    expect(screen.getByText('0x71C7…976F')).toBeTruthy()
    const link = screen.getByRole('link', { name: 'View address on explorer' })
    expect(link.getAttribute('href')).toBe(`https://etherscan.io/address/${ADDRESS}`)
  })

  it('hides the explorer link on networks without one (Anvil)', () => {
    render(<AddressChip address={ADDRESS} />)

    expect(screen.queryByRole('link')).toBeNull()
  })

  it('shows the ENS name next to the short address', () => {
    render(<AddressChip address={ADDRESS} ensName="vitalik.eth" />)

    expect(screen.getByText('vitalik.eth')).toBeTruthy()
    expect(screen.getByText('0x71C7…976F')).toBeTruthy()
  })

  it('copies the full checksummed address', async () => {
    // `setup()` installs a fake clipboard we can read back.
    const user = userEvent.setup()
    render(<AddressChip address={ADDRESS} />)

    await user.click(screen.getByRole('button', { name: 'Copy address' }))

    expect(await navigator.clipboard.readText()).toBe(ADDRESS)
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy()
  })
})
