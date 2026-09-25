import { EthraWordmark } from '../components/Logo'
import { DevPage } from './DevPage'

// Minimal routing until the app shell (Feature 2) needs more than one real screen.
function App() {
  if (window.location.pathname === '/dev') {
    return <DevPage />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-canvas p-6">
      <EthraWordmark size={40} />
      <p className="text-label uppercase text-ink-muted">Work in progress</p>
    </main>
  )
}

export default App
