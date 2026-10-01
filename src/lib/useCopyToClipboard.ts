import { useEffect, useState } from "react"

interface CopyToClipboard {
  /** True for `resetAfterMs` after a successful copy, then back to false. */
  copied: boolean
  copy: (text: string) => void
}

/** Copies text to the clipboard and reports "copied" for a short while, so the UI can confirm it. */
export function useCopyToClipboard(resetAfterMs = 1500): CopyToClipboard {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (err) {
      console.error(err)
      setCopied(false)
    }
  }

  useEffect(() => {
    if (!copied) {
      return
    }

    const timer = setTimeout(() => setCopied(false), resetAfterMs)
    return () => clearTimeout(timer)
  }, [copied, resetAfterMs])

  return { copied, copy }
}
