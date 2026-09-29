import { useEffect, useRef, useState } from 'react'
import { useSwitchChain } from 'wagmi'
import { NETWORKS, type NetworkKey } from '../config/chains'
import { useActiveNetwork } from '../data/useActiveNetwork'
import { cn } from '../lib/cn'
import { CheckIcon } from './icons'
import { NetworkBadge } from './NetworkBadge'

const markerClass: Record<NetworkKey, string> = {
  mainnet: 'bg-network-mainnet',
  sepolia: 'bg-network-sepolia',
  local: 'bg-network-local',
}

/** Network badge + dropdown to switch networks. Read-only: switching never signs or sends anything. */
export function NetworkMenu() {
  const active = useActiveNetwork()
  const activeChainId = active.status === 'supported' ? active.network.chain.id : undefined
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: switchChain } = useSwitchChain()

  function handleSelect(chainId: number) {
    switchChain({ chainId })
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const container = containerRef.current
      if (!container) {
        return
      }

      if (!container.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <NetworkBadge
        active={active}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((open) => !open)
        }}
      />

      {isOpen && (
        <div
          role="menu"
          aria-label="Choose network"
          className="absolute left-0 top-full z-20 mt-2 flex w-70 flex-col gap-0.5 rounded-md border border-line-strong bg-surface-raised p-1.5 shadow-menu"
        >
          {NETWORKS.map((network) => {
            const isActive = network.chain.id === activeChainId

            return (
              <button
                key={network.chain.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => handleSelect(network.chain.id)}
                className={cn(
                  'flex h-11 cursor-pointer items-center gap-2.5 rounded px-2.5 text-left text-body text-ink',
                  isActive ? 'bg-surface-subtle' : 'hover:bg-surface-subtle',
                )}
              >
                <span aria-hidden="true" className={cn('size-2 shrink-0', markerClass[network.key])} />
                <span className="grow">{network.name}</span>
                <span className="num text-[10px] text-ink-muted">{network.chain.id}</span>
                <span className="flex w-3.5 text-brand">{isActive && <CheckIcon size={14} />}</span>
              </button>
            )
          })}
          <div className="my-1 h-px bg-line" />
          <p className="px-2.5 pb-2 pt-1.5 text-[11px] leading-normal text-ink-muted">
            Switching asks your wallet to change network. Testnet and local funds have no real value.
          </p>
        </div>
      )}
    </div>
  )
}
