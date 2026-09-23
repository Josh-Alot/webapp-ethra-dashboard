import logo from '../assets/brand/ethra-logo-on-dark.svg'

// Temporary placeholder: confirms tokens, fonts and Tailwind preset are wired.
// Feature 1 replaces this with the base components and a /dev showcase route.
function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-canvas p-6">
      <img src={logo} alt="Ethra" width={200} height={56} />
      <p className="text-label uppercase text-ink-muted">Boilerplate ready</p>
      <p className="num text-display text-ink">$0.00</p>
      <button
        type="button"
        className="h-8 rounded bg-brand px-4 text-body font-medium text-brand-on transition-colors duration-fast hover:bg-brand-hover"
      >
        Connect wallet
      </button>
    </main>
  )
}

export default App
