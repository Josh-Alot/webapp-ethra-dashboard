/// <reference types="vite/client" />

// Typed access to the variables documented in .env.example.
interface ImportMetaEnv {
  readonly VITE_DEFAULT_CHAIN_ID?: string
  readonly VITE_RPC_URL_LOCAL?: string
  readonly VITE_RPC_URL_SEPOLIA?: string
  readonly VITE_RPC_URL_MAINNET?: string
  readonly VITE_ETHERSCAN_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
