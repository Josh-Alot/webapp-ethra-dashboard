import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"
import { Spinner } from "./icons"

type ButtonKind = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const kindClass: Record<ButtonKind, string> = {
  primary: 'bg-brand border-brand text-brand-on font-semibold enabled:hover:bg-brand-hover enabled:hover:border-brand-hover',
  secondary: 'bg-transparent border-line text-ink-secondary enabled:hover:bg-surface-subtle enabled:hover:border-line-strong enabled:hover:text-ink',
  ghost: 'bg-transparent border-transparent text-ink-secondary enabled:hover:bg-surface-subtle enabled:hover:text-ink',
}

const sizeClass: Record<ButtonSize, string> = {
  'sm': 'h-7 px-2.5 text-caption',
  'md': 'h-8 px-3 text-body',
  'lg': 'h-11 px-4.5 text-body-lg',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind,
  size?: ButtonSize,
  icon?: ReactNode,
  loading?: boolean
}

export function Button({
  kind = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center gap-2 rounded border cursor-pointer',
        'transition-colors duration-fast',
        'disabled:cursor-not-allowed disabled:opacity-40',
        kindClass[kind],
        sizeClass[size],
        className
      )}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  )
}
