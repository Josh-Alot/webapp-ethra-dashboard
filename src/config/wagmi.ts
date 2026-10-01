import type { Chain } from 'viem'
import { createConfig, http, injected, type Transport } from 'wagmi'
import { NETWORKS, getNetwork } from './chains'

// wagmi uses the first chain in the config while no wallet is connected,
// so the default network goes first and the rest keep the menu order.
const defaultNetwork = getNetwork(Number(import.meta.env.VITE_DEFAULT_CHAIN_ID ?? 31337)) ?? NETWORKS[0]
const otherNetworks = NETWORKS.filter((network) => network !== defaultNetwork)
const chains: [Chain, ...Chain[]] = [defaultNetwork.chain, ...otherNetworks.map((network) => network.chain)]

const transports: Record<number, Transport> = {}
for (const network of NETWORKS) {
  // An empty VITE_RPC_URL_* comes through as "", which viem would treat as a real URL.
  transports[network.chain.id] = http(network.rpcUrl || undefined)
}

// `injected` talks to the browser wallet (MetaMask, Rabby, …) through window.ethereum.
// WalletConnect can be added to this list later without touching the UI.
export const wagmiConfig = createConfig({ chains, transports, connectors: [injected()] })
