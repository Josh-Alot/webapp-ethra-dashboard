import { useChainId, useConnection } from 'wagmi'
import { getNetwork, type NetworkConfig } from '../config/chains'

/**
 * The network the app is showing right now.
 * A discriminated union: check `status` first and TypeScript narrows the rest.
 */
export type ActiveNetwork =
  | { status: 'supported'; network: NetworkConfig }
  | { status: 'unsupported'; chainId: number }

/** Single source of truth for "which network are we on?". Components never read chain ids directly. */
export function useActiveNetwork(): ActiveNetwork {
  const connection = useConnection()
  const configChainId = useChainId()
  const chainId = connection.chainId ?? configChainId
  const networkConfig = getNetwork(chainId)

  if (networkConfig) {
    return { status: 'supported', network: networkConfig }
  }

  return { status: 'unsupported', chainId }
}
