import type { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { useConnect, useConnection, useConnectors, useEnsName } from 'wagmi'
import { useActiveNetwork } from './useActiveNetwork'

export interface Wallet {
  /** Checksummed address. `undefined` while no wallet is connected. */
  address: Address | undefined
  /** Primary ENS name of the address. Only looked up on mainnet; `undefined` everywhere else. */
  ensName: string | undefined
  isConnected: boolean
  /** True while the wallet popup is open, after the user clicked connect. */
  isConnecting: boolean
  /** True while wagmi restores the previous session on page load. */
  isReconnecting: boolean
  /** Why the last connect attempt failed (user rejected, no wallet installed, …). Cleared on retry. */
  connectError: Error | null
  connect: () => void
  /** Ends the session and drops every cached query, so the next wallet never sees this one's data. */
  disconnect: () => void
}

/**
 * Everything the UI needs to know about the connected wallet.
 * Read-only by design: it connects and exposes the address, never signs or sends.
 */
export function useWallet(): Wallet {
  const connection = useConnection()
  const [connector] = useConnectors()
  const connectMutation = useConnect()

  const active = useActiveNetwork()
  const isMainnet = active.status === 'supported' && active.network.key === 'mainnet'
  const ens = useEnsName({
    address: connection.address,
    chainId: mainnet.id,
    query: { enabled: isMainnet && connection.address !== undefined },
  })

  return {
    address: connection.address,
    // A disabled query still returns what it has cached, so check the network again here.
    ensName: isMainnet ? (ens.data ?? undefined) : undefined,
    isConnected: connection.status === 'connected',
    isConnecting: connectMutation.isPending,
    isReconnecting: connection.status === 'reconnecting',
    connectError: connectMutation.error,
    connect: () => connectMutation.mutate({ connector }),
    // TODO(human): implement `disconnect`. Two hooks, called at the top of `useWallet` with the others:
    //
    // - `useDisconnect()` from 'wagmi': a mutation, same shape as `connectMutation` above.
    // - `useQueryClient()` from '@tanstack/react-query': the app's query cache (the QueryClient
    //   created in main.tsx, reached through Context).
    //
    // Then `disconnect` calls the mutation's `mutate`. It takes two arguments here:
    //   1st: the variables. Disconnect needs none, so pass `undefined`.
    //   2nd: `{ onSuccess: () => ... }`, a callback that runs only if the disconnect worked.
    // Inside `onSuccess`, call `removeQueries()` on the query client: with no arguments it
    // removes every cached query.
    disconnect: () => {},
  }
}
