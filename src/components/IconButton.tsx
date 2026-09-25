import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type IconButtonSize = 28 | 44
type IconButtonKind = 'ghost' | 'outline'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name. Required because the button has no visible text. */
  label: string
  icon: ReactNode
  /** 28px on desktop, 44px on touch screens. */
  size?: IconButtonSize
  kind?: IconButtonKind
}

const sizeClass: Record<IconButtonSize, string> = {
  28: 'size-7',
  44: 'size-11',
}

const kindClass: Record<IconButtonKind, string> = {
  ghost: 'border-transparent text-ink-muted hover:bg-surface-subtle hover:text-ink',
  outline: 'border-line text-ink-secondary hover:border-line-strong hover:bg-surface-subtle hover:text-ink',
}

export function IconButton({
  label,
  icon,
  size = 28,
  kind = 'ghost',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded border bg-transparent',
        'transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-40',
        sizeClass[size],
        kindClass[kind],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  )
}
