import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useChainId, useConnection } from 'wagmi'
import { useActiveNetwork } from './useActiveNetwork'

// Replace the real wagmi hooks with fakes whose return value each test controls.
vi.mock('wagmi', () => ({
  useConnection: vi.fn(),
  useChainId: vi.fn(),
}))

/** Sets what the fake wagmi hooks return. `walletChainId` undefined = no wallet connected. */
function mockWagmi({ configChainId, walletChainId }: { configChainId: number; walletChainId?: number }) {
  vi.mocked(useChainId).mockReturnValue(configChainId)
  vi.mocked(useConnection).mockReturnValue({
    chainId: walletChainId,
    isConnected: walletChainId !== undefined,
  } as ReturnType<typeof useConnection>)
}

describe('useActiveNetwork', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('uses the app network while no wallet is connected', () => {
    mockWagmi({ configChainId: 11155111 })

    const { result } = renderHook(() => useActiveNetwork())

    expect(result.current.status).toBe('supported')
    if (result.current.status === 'supported') {
      expect(result.current.network.key).toBe('sepolia')
    }
  })

  it('uses the wallet network when connected to a supported chain', () => {
    mockWagmi({ configChainId: 31337, walletChainId: 1 })
    const { result } = renderHook(() => useActiveNetwork())
    expect(result.current.status).toBe('supported')
    if (result.current.status === 'supported') {
      expect(result.current.network.key).toBe('mainnet')
    }
  })

  it('reports an unsupported chain with the wallet chain id', () => {
    mockWagmi({ configChainId: 31337, walletChainId: 137 })
    const { result } = renderHook(() => useActiveNetwork())
    expect(result.current).toEqual({ status: 'unsupported', chainId: 137 })
  })
})
