import type { Chain } from 'viem'
import { foundry, mainnet, sepolia } from 'viem/chains'

/**
 * Environment key. Also used as the `<html data-network>` value and as the
 * suffix of the network color tokens (`bg-network-local-bg`, …).
 */
export type NetworkKey = 'mainnet' | 'sepolia' | 'local'

export interface NetworkConfig {
  chain: Chain
  key: NetworkKey
  /** Full name, used in the menu and in aria-labels: "Anvil (local)". */
  name: string
  /** Badge text for the selector and static variants: "ANVIL · LOCAL". */
  label: string
  /** Badge text for the compact (mobile) variant: "ANVIL". */
  shortLabel: string
  /** Falls back to the chain's public RPC when undefined. */
  rpcUrl?: string
  /** Block explorer base URL. Omitted where there is none (Anvil). */
  explorerUrl?: string
  isTestnet: boolean
  /** Extension point for MVP 2/3: turn write features on per network. */
  capabilities: { transfers: boolean; swaps: boolean }
}

/**
 * Every network Ethra supports, in menu order.
 * Adding a network means adding an entry here and nothing else.
 */
export const NETWORKS: readonly NetworkConfig[] = [
  {
    chain: mainnet,
    key: 'mainnet',
    name: 'Ethereum Mainnet',
    label: 'MAINNET · 1',
    shortLabel: 'MAINNET',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: import.meta.env.VITE_RPC_URL_MAINNET,
    isTestnet: false,
    capabilities: { transfers: false, swaps: false },
  },
  {
    chain: sepolia,
    key: 'sepolia',
    name: 'Ethereum Sepolia',
    label: 'SEPOLIA · TESTNET',
    shortLabel: 'SEPOLIA',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: import.meta.env.VITE_RPC_URL_SEPOLIA,
    isTestnet: true,
    capabilities: { transfers: false, swaps: false },
  },
  {
    chain: foundry,
    key: 'local',
    name: 'Anvil (local)',
    label: 'ANVIL · LOCAL',
    shortLabel: 'ANVIL',
    rpcUrl: import.meta.env.VITE_RPC_URL_LOCAL,
    isTestnet: true,
    capabilities: { transfers: false, swaps: false },
  },
]

/** Looks up a supported network by chain id. `undefined` means Ethra doesn't support it. */
export function getNetwork(chainId: number): NetworkConfig | undefined {
  return NETWORKS.find((network) => network.chain.id === chainId)
}

/** Explorer page for an address. `undefined` on networks without an explorer (Anvil). */
export function explorerAddressUrl(network: NetworkConfig, address: string): string | undefined {
  return network.explorerUrl ? `${network.explorerUrl}/address/${address}` : undefined
}
