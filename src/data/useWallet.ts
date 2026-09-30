import type { Address } from 'viem'
import { useConnect, useConnection, useConnectors } from 'wagmi'

export interface Wallet {
  /** Checksummed address. `undefined` while no wallet is connected. */
  address: Address | undefined
  isConnected: boolean
  /** True while the wallet popup is open, after the user clicked connect. */
  isConnecting: boolean
  /** True while wagmi restores the previous session on page load. */
  isReconnecting: boolean
  /** Why the last connect attempt failed (user rejected, no wallet installed, …). Cleared on retry. */
  connectError: Error | null
  connect: () => void
}

/**
 * Everything the UI needs to know about the connected wallet.
 * Read-only by design: it connects and exposes the address, never signs or sends.
 */
export function useWallet(): Wallet {
  const connection = useConnection()
  const [connector] = useConnectors()
  const connectMutation = useConnect()

  return {
    address: connection.address,
    isConnected: connection.status === 'connected',
    isConnecting: connectMutation.isPending,
    isReconnecting: connection.status === 'reconnecting',
    connectError: connectMutation.error,
    connect: () => connectMutation.mutate({ connector }),
  }
}
