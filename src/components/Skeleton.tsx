import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

type SkeletonShape = 'text' | 'block' | 'circle' | 'ring'

interface SkeletonProps {
  shape?: SkeletonShape
  /** px or any CSS length. Match the final content size so nothing shifts on load. */
  width?: number | string
  height?: number | string
  /** Ring only: stroke thickness in px (the donut chart uses 8). */
  thickness?: number
  className?: string
}

const TEXT_HEIGHT = 10

/** Placeholder with the `.skeleton` pulse from tokens.css (disabled with prefers-reduced-motion). */
export function Skeleton({ shape = 'text', width, height, thickness = 8, className }: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height: height ?? (shape === 'text' ? TEXT_HEIGHT : width),
  }

  // `.skeleton` in tokens.css is unlayered, so it beats Tailwind utilities like `rounded-full`.
  // Round shapes set their radius inline instead.
  if (shape === 'circle' || shape === 'ring') {
    style.borderRadius = 'var(--radius-full)'
  }

  if (shape === 'ring') {
    // Outline only: transparent inside, border in the skeleton color.
    style.borderWidth = thickness
    style.background = 'transparent'
  }

  return (
    <div
      aria-hidden="true"
      className={cn('skeleton shrink-0', shape === 'ring' && 'border-solid border-surface-muted', className)}
      style={style}
    />
  )
}
