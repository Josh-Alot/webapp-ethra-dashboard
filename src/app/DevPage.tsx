import { useState, type ReactNode } from 'react'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { CloseIcon, CopyIcon, ExternalLinkIcon, PowerIcon, RetryIcon, WalletIcon } from '../components/icons'
import { EthraSymbol, EthraWordmark } from '../components/Logo'
import { SegmentedControl } from '../components/SegmentedControl'
import { Skeleton } from '../components/Skeleton'
import { StatusBadge } from '../components/StatusBadge'
import { Toggle } from '../components/Toggle'
import { formatAmount, formatDate, formatUsd, shortenAddress } from '../lib/format'

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'sent', label: 'Sent' },
  { value: 'received', label: 'Received' },
  { value: 'contract', label: 'Contract' },
] as const

const STATUS_OPTIONS = [
  { value: 'any', label: 'Any status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'failed', label: 'Failed' },
] as const

type TxTypeFilter = (typeof TYPE_OPTIONS)[number]['value']
type TxStatusFilter = (typeof STATUS_OPTIONS)[number]['value']

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-line pt-8">
      <h2 className="text-title text-ink">{title}</h2>
      {children}
    </section>
  )
}

function Specimen({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="num text-[10px] uppercase tracking-[0.06em] text-ink-muted">{caption}</span>
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-end gap-6">{children}</div>
}

/** Renders every base component variant from H03 Components Core. Dev only, not linked in the UI. */
export function DevPage() {
  const [txType, setTxType] = useState<TxTypeFilter>('all')
  const [txStatus, setTxStatus] = useState<TxStatusFilter>('any')
  const [hideDust, setHideDust] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)

  function simulateConnect() {
    setIsConnecting(true)
    setTimeout(() => setIsConnecting(false), 2000)
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-2">
        <span className="num text-label uppercase text-brand">Dev · Feature 1</span>
        <h1 className="text-display-sm text-ink">Components</h1>
        <p className="text-body text-ink-muted">Base components and formatters. Tab through the page to check focus rings.</p>
      </header>

      <Section title="Logo">
        <Row>
          <Specimen caption="Wordmark">
            <EthraWordmark size={32} />
          </Specimen>
          <Specimen caption="Symbol · 32">
            <EthraSymbol size={32} />
          </Specimen>
          <Specimen caption="Symbol · 24 (3 bands)">
            <EthraSymbol size={24} />
          </Specimen>
          <Specimen caption="Symbol · 16 (2 bands)">
            <EthraSymbol size={16} />
          </Specimen>
          <Specimen caption="Mono">
            <EthraSymbol size={32} tone="mono" />
          </Specimen>
        </Row>
      </Section>

      <Section title="Button">
        <Row>
          <Specimen caption="Primary · sm 28">
            <Button kind="primary" size="sm">Connect wallet</Button>
          </Specimen>
          <Specimen caption="Primary · md 32">
            <Button kind="primary" size="md">Connect wallet</Button>
          </Specimen>
          <Specimen caption="Primary · lg 44">
            <Button kind="primary" size="lg" icon={<WalletIcon size={16} />}>
              Connect wallet
            </Button>
          </Specimen>
          <Specimen caption="Secondary">
            <Button kind="secondary" icon={<RetryIcon />}>Retry</Button>
          </Specimen>
          <Specimen caption="Secondary + icon">
            <Button kind="secondary" icon={<PowerIcon />}>Disconnect</Button>
          </Specimen>
          <Specimen caption="Ghost">
            <Button kind="ghost">Show hidden</Button>
          </Specimen>
        </Row>
        <Row>
          <Specimen caption="Loading (click me)">
            <Button kind="primary" loading={isConnecting} onClick={simulateConnect}>
              {isConnecting ? 'Connecting…' : 'Connect wallet'}
            </Button>
          </Specimen>
          <Specimen caption="Disabled">
            <Button kind="primary" disabled>Connect wallet</Button>
          </Specimen>
          <Specimen caption="Secondary disabled">
            <Button kind="secondary" disabled>Retry</Button>
          </Specimen>
        </Row>
      </Section>

      <Section title="IconButton">
        <Row>
          <Specimen caption="Ghost · 28">
            <div className="flex gap-2">
              <IconButton label="Copy address" icon={<CopyIcon />} />
              <IconButton label="View on explorer" icon={<ExternalLinkIcon />} />
            </div>
          </Specimen>
          <Specimen caption="Outline · 28">
            <IconButton label="Refresh" kind="outline" icon={<RetryIcon />} />
          </Specimen>
          <Specimen caption="Outline · 44">
            <IconButton label="Close" kind="outline" size={44} icon={<CloseIcon size={18} />} />
          </Specimen>
        </Row>
      </Section>

      <Section title="StatusBadge">
        <Row>
          <StatusBadge status="confirmed" />
          <StatusBadge status="pending" />
          <StatusBadge status="failed" />
        </Row>
      </Section>

      <Section title="SegmentedControl & Toggle">
        <Row>
          <Specimen caption={`Type: ${txType}`}>
            <SegmentedControl label="Transaction type" options={TYPE_OPTIONS} value={txType} onChange={setTxType} />
          </Specimen>
          <Specimen caption={`Status: ${txStatus}`}>
            <SegmentedControl
              label="Transaction status"
              options={STATUS_OPTIONS}
              value={txStatus}
              onChange={setTxStatus}
            />
          </Specimen>
          <Specimen caption={`checked: ${hideDust}`}>
            <Toggle label="Hide dust & spam" checked={hideDust} onChange={setHideDust} />
          </Specimen>
        </Row>
      </Section>

      <Section title="Skeleton">
        <Row>
          <Specimen caption="Text 10">
            <Skeleton width={160} />
          </Specimen>
          <Specimen caption="Display 40">
            <Skeleton shape="block" width={240} height={40} />
          </Specimen>
          <Specimen caption="Icon 24">
            <Skeleton shape="block" width={24} />
          </Specimen>
          <Specimen caption="Circle 24">
            <Skeleton shape="circle" width={24} />
          </Specimen>
          <Specimen caption="Ring 72">
            <Skeleton shape="ring" width={72} />
          </Specimen>
        </Row>
      </Section>

      <Section title="Formatters">
        <dl className="num grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-figure">
          <dt className="text-ink-muted">formatUsd(33217.968)</dt>
          <dd className="text-ink">{formatUsd(33217.968)}</dd>
          <dt className="text-ink-muted">formatAmount(4218500000000000000n, 18)</dt>
          <dd className="text-ink">{formatAmount(4218500000000000000n, 18)}</dd>
          <dt className="text-ink-muted">formatAmount(1n, 18)</dt>
          <dd className="text-ink">{formatAmount(1n, 18)}</dd>
          <dt className="text-ink-muted">shortenAddress(…)</dt>
          <dd className="text-ink">{shortenAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}</dd>
          <dt className="text-ink-muted">formatDate(now)</dt>
          <dd className="text-ink">{formatDate(new Date())}</dd>
        </dl>
      </Section>
    </main>
  )
}
