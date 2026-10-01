import { useWallet } from '../data/useWallet'
import { Button } from './Button'
import { PowerIcon } from './icons'

/** Ends the session and returns to the welcome screen. */
export function DisconnectButton() {
  const { disconnect } = useWallet()

  return (
    <Button kind="secondary" icon={<PowerIcon />} onClick={disconnect}>
      Disconnect
    </Button>
  )
}
