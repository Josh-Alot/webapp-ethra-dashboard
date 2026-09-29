import { useEffect, type ReactNode } from 'react'
import { Header } from '../components/Header'
import { useActiveNetwork } from '../data/useActiveNetwork'

interface AppShellProps {
  children: ReactNode
}

/** Frame shared by every screen: header on top, content below. */
export function AppShell({ children }: AppShellProps) {
  const active = useActiveNetwork()
  const network = active.status === 'supported' ? active.network.key : 'unsupported'

  useEffect(() => {
    document.documentElement.dataset.network = network
  }, [network])

  return (
    <div className="flex min-h-screen flex-col bg-surface-canvas">
      <Header />
      <div className="flex min-h-0 grow flex-col lg:flex-row">{children}</div>
    </div>
  )
}
