import type { ReactNode } from 'react'
import { useWallet } from '../data/useWallet'
import { WelcomeScreen } from '../components/WelcomeScreen'
import { AppShell } from './AppShell'
import { DataColumn } from './DataColumn'
import { DevPage } from './DevPage'
import { SummaryPanel } from './SummaryPanel'

// Minimal routing: /dev renders the component board, everything else the dashboard.
function App() {
  const { isConnected, isReconnecting } = useWallet()

  if (window.location.pathname === '/dev') {
    return <DevPage />
  }

  let content: ReactNode
  if (isConnected) {
    content = (<>
      <SummaryPanel>
        <p className="text-label uppercase text-ink-muted">Summary · Feature 4</p>
      </SummaryPanel>
      <DataColumn>
        <p className="px-6 py-7 text-label uppercase text-ink-muted">Tokens and transactions · Features 6–7</p>
      </DataColumn>
    </>)
  } else if (isReconnecting) {
    content = null
  } else {
    content = <WelcomeScreen />
  }

  return (
    <AppShell>
      {content}
    </AppShell>
  )
}

export default App
