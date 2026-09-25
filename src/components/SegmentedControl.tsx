import { cn } from "../lib/cn";

interface SegmentedControlProps<T extends string> {
  label: string,
  options: ReadonlyArray<{ value: T; label: string }>,
  value: T,
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div
      className="flex border border-line rounded overflow-hidden"
      role="group"
      aria-label={label}
    >
      {options.map(option => {
        const isButtonPressed = option.value === value

        return (
          <button
            type="button"
            key={option.value}
            aria-pressed={isButtonPressed}
            onClick={() => onChange(option.value)}
            className={cn(
              'h-7.5 px-3 text-caption whitespace-nowrap cursor-pointer',
              isButtonPressed ? 'bg-line text-ink' : 'bg-transparent text-ink-muted hover:text-ink',
              'not-first:border-l not-first:border-line'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
