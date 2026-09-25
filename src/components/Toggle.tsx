import { useId } from 'react'
import { cn } from '../lib/cn'

interface ToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

/**
 * Controlled checkbox: the parent owns `checked` and updates it in `onChange`.
 * Angular equivalent: [(ngModel)] split into [checked] + (change).
 */
export function Toggle({ label, checked, onChange, className }: ToggleProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={cn('inline-flex cursor-pointer items-center gap-2 whitespace-nowrap text-caption text-ink-secondary', className)}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="m-0 size-3.5 cursor-pointer accent-brand"
      />
      {label}
    </label>
  )
}
