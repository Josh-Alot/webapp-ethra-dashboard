import { useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useConnect, useConnection, useConnectors, useDisconnect, useEnsName } from 'wagmi'
import { getNetwork } from '../config/chains'
import { useActiveNetwork } from './useActiveNetwork'
import { useWallet } from './useWallet'

// Replace every hook useWallet depends on with fakes whose return value each test controls.
vi.mock('wagmi', () => ({
  useConnection: vi.fn(),
  useConnectors: vi.fn(),
  useConnect: vi.fn(),
  useDisconnect: vi.fn(),
  useEnsName: vi.fn(),
}))
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}))
vi.mock('./useActiveNetwork', () => ({
  useActiveNetwork: vi.fn(),
}))

const ADDRESS = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
const connector = { id: 'injected' }

/**
 * Sets what the fake hooks return and hands back the spies a test may want to inspect.
 * `chainId` picks the active network; `ensName` is what the ENS query has (or had) cached.
 */
function mockWallet({ chainId = 31337, ensName }: { chainId?: number; ensName?: string } = {}) {
  const connectMutate = vi.fn()
  const disconnectMutate = vi.fn()
  const removeQueries = vi.fn()

  vi.mocked(useConnection).mockReturnValue({
    address: ADDRESS,
    status: 'connected',
  } as unknown as ReturnType<typeof useConnection>)
  vi.mocked(useConnectors).mockReturnValue([connector] as unknown as ReturnType<typeof useConnectors>)
  vi.mocked(useConnect).mockReturnValue({
    mutate: connectMutate,
    isPending: false,
    error: null,
  } as unknown as ReturnType<typeof useConnect>)
  vi.mocked(useDisconnect).mockReturnValue({
    mutate: disconnectMutate,
  } as unknown as ReturnType<typeof useDisconnect>)
  vi.mocked(useEnsName).mockReturnValue({ data: ensName } as ReturnType<typeof useEnsName>)
  vi.mocked(useQueryClient).mockReturnValue({ removeQueries } as unknown as ReturnType<typeof useQueryClient>)
  vi.mocked(useActiveNetwork).mockReturnValue({ status: 'supported', network: getNetwork(chainId)! })

  return { connectMutate, disconnectMutate, removeQueries }
}

describe('useWallet', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('connects with the first available connector', () => {
    const { connectMutate } = mockWallet()

    const { result } = renderHook(() => useWallet())
    result.current.connect()

    expect(connectMutate).toHaveBeenCalledWith({ connector })
  })

  it('exposes the ENS name on mainnet', () => {
    mockWallet({ chainId: 1, ensName: 'vitalik.eth' })

    const { result } = renderHook(() => useWallet())

    expect(result.current.ensName).toBe('vitalik.eth')
    expect(vi.mocked(useEnsName).mock.lastCall?.[0]?.query?.enabled).toBe(true)
  })
{  }
  it('hides a cached ENS name and skips the lookup off mainnet', () => {
    mockWallet({ chainId: 11155111, ensName: 'vitalik.eth' })

    const { result } = renderHook(() => useWallet())

    expect(result.current.ensName).toBeUndefined()
    expect(vi.mocked(useEnsName).mock.lastCall?.[0]?.query?.enabled).toBe(false)
  })

  it('clears the query cache only after a successful disconnect', () => {
    const { disconnectMutate, removeQueries } = mockWallet()
    const { result } = renderHook(() => useWallet())
    result.current.disconnect()

    expect(disconnectMutate).toHaveBeenCalled()
    expect(removeQueries).not.toHaveBeenCalled()

    const options = disconnectMutate.mock.calls[0][1]
    options.onSuccess()

    expect(removeQueries).toHaveBeenCalledOnce()
  })
})
