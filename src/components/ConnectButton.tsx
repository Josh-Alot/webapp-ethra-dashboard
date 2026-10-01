import { useWallet } from '../data/useWallet'
import { Button } from './Button'
import { WalletIcon } from './icons'

interface ConnectButtonProps {
  size?: 'md' | 'lg'
}

function connectionErrorMessage(error: Error): string {
  if (error.name === 'UserRejectedRequestError') {
    return 'Connection rejected. Try again when you\'re ready.'
  } else if (error.name === 'ProviderNotFoundError') {
    return 'No wallet found. Install a browser wallet such as MetaMask.'
  } else {
    return 'Couldn\'t connect. Try again.'
  }
}

/** Opens the browser wallet. Loading while the popup is open; inline message if it fails. */
export function ConnectButton({ size = 'lg' }: ConnectButtonProps) {
  const { connect, isConnecting, connectError } = useWallet()
  return (
    <div className="flex flex-col items-center gap-3">
      <Button size={size} icon={<WalletIcon size={16} />} loading={isConnecting} onClick={connect}>
        {isConnecting ? 'Connecting…' : 'Connect wallet'}
      </Button>
      {connectError && (
        <p role="alert" className="text-caption text-loss">{connectionErrorMessage(connectError)}</p>
      )}
    </div>
  )
}
