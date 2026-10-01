import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCopyToClipboard } from './useCopyToClipboard'

const writeText = vi.fn()

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    // jsdom has no clipboard, so give navigator a fake one.
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  it('writes the text and reports copied for 1.5s', async () => {
    writeText.mockResolvedValue(undefined)
    const { result } = renderHook(() => useCopyToClipboard())

    // `copy` awaits the clipboard, so the state update lands after the promise resolves.
    await act(() => result.current.copy('0xabc'))

    expect(writeText).toHaveBeenCalledWith('0xabc')
    expect(result.current.copied).toBe(true)

    act(() => vi.advanceTimersByTime(1499))
    expect(result.current.copied).toBe(true)

    act(() => vi.advanceTimersByTime(1))
    expect(result.current.copied).toBe(false)
  })

  it('stays not copied when the clipboard refuses', async () => {
    writeText.mockRejectedValue(new Error('denied'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useCopyToClipboard())

    await act(() => result.current.copy('0xabc'))

    expect(result.current.copied).toBe(false)
  })
})
