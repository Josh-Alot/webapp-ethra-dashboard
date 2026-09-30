import { NETWORKS, type NetworkKey } from '../config/chains'
import { ConnectButton } from './ConnectButton'

const markerClass: Record<NetworkKey, string> = {
  mainnet: 'bg-network-mainnet',
  sepolia: 'bg-network-sepolia',
  local: 'bg-network-local',
}

/**
 * Sun setting on the horizon, from the D02 board. Purely decorative.
 * Sits in the normal flow, below the content, so the text can never land on top of the sun.
 * The lower half of the sun is hidden by the footer strip that comes right after.
 */
function Horizon() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-auto h-[180px] w-full shrink-0">
      <div className="absolute top-[-190px] left-1/2 size-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,180,41,0.18)_0%,rgba(240,180,41,0.05)_40%,rgba(240,180,41,0)_68%)]" />
      <div className="absolute top-0 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-brand" />
      <div className="absolute inset-x-0 top-[90px] h-1.5 bg-surface-canvas" />
      <div className="absolute inset-x-0 top-[126px] h-[9px] bg-surface-canvas" />
      <div className="absolute inset-x-0 top-[156px] h-[13px] bg-surface-canvas" />
    </div>
  )
}

/** Shown while no wallet is connected. */
export function WelcomeScreen() {
  return (
    <main className="relative flex grow flex-col items-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-5 px-4 pt-20 pb-8 text-center">
        <span className="num text-label text-brand">READ-ONLY WALLET DASHBOARD</span>
        <h1 className="max-w-[760px] text-hero text-ink">See your on-chain assets clearly.</h1>
        <p className="max-w-[560px] text-[17px] leading-[1.6] text-ink-secondary">
          Connect an Ethereum wallet to view balances, allocation and transaction history. Ethra only reads data. It
          never asks to move funds.
        </p>
        {/* Tall enough for the button plus its error line, so a failed attempt doesn't push the page down. */}
        <div className="min-h-[81px] pt-2">
          <ConnectButton />
        </div>
        <ul aria-label="Supported networks" className="-mt-2 flex flex-wrap justify-center gap-2">
          {NETWORKS.map((network) => (
            <li
              key={network.key}
              className="inline-flex h-7 items-center gap-2 rounded border border-line px-2.5 text-caption text-ink-secondary"
            >
              <span aria-hidden="true" className={`size-2 ${markerClass[network.key]}`} />
              {network.name}
            </li>
          ))}
        </ul>
      </div>

      <Horizon />

      <footer className="num relative z-10 flex h-16 w-full shrink-0 items-center justify-between border-t border-line bg-surface-canvas px-6 text-label text-ink-muted">
        <span>ETHRA.APP</span>
        <span>NO KEYS · NO SIGNATURES · NO TRANSACTIONS</span>
      </footer>
    </main>
  )
}
