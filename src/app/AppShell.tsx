import { useEffect, type ReactNode } from 'react'
import { AddressChip } from '../components/AddressChip'
import { DisconnectButton } from '../components/DisconnectButton'
import { Header } from '../components/Header'
import { explorerAddressUrl } from '../config/chains'
import { useActiveNetwork } from '../data/useActiveNetwork'
import { useWallet } from '../data/useWallet'

interface AppShellProps {
  children: ReactNode
}

/** Frame shared by every screen: header on top, content below. */
export function AppShell({ children }: AppShellProps) {
  const active = useActiveNetwork()
  const network = active.status === 'supported' ? active.network.key : 'unsupported'
  const { address, ensName, isConnected } = useWallet()

  useEffect(() => {
    document.documentElement.dataset.network = network
  }, [network])

  return (
    <div className="flex min-h-screen flex-col bg-surface-canvas">
      <Header
        account={
          isConnected &&
          address && (
            <>
              <AddressChip
                address={address}
                ensName={ensName}
                explorerUrl={active.status === 'supported' ? explorerAddressUrl(active.network, address) : undefined}
              />
              <DisconnectButton />
            </>
          )
        }
      />
      <div className="flex min-h-0 grow flex-col lg:flex-row">{children}</div>
    </div>
  )
}
