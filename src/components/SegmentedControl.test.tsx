import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'sent', label: 'Sent' },
] as const

describe('SegmentedControl', () => {
  it('marks only the selected option as pressed', () => {
    render(<SegmentedControl label="Type" options={OPTIONS} value="sent" onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Sent' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('calls onChange with the clicked value', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl label="Type" options={OPTIONS} value="all" onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Sent' }))
    expect(onChange).toHaveBeenCalledWith('sent')
  })

  it('exposes the group label to assistive tech', () => {
    render(<SegmentedControl label="Type" options={OPTIONS} value="all" onChange={vi.fn()} />)

    expect(screen.getByRole('group', { name: 'Type' })).toBeTruthy()
  })
})
