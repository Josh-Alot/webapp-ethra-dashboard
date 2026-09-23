// Ethra Tailwind preset — import tokens.css once in your entry file.
// Usage: tailwind.config.js -> presets: [require('./tailwind.preset.js')]
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // bg-surface-canvas, bg-surface-panel …
        surface: { canvas: 'var(--color-bg-canvas)', panel: 'var(--color-bg-panel)', raised: 'var(--color-bg-raised)', subtle: 'var(--color-bg-subtle)', muted: 'var(--color-bg-muted)' },
        // border-line, border-line-subtle …
        line: { DEFAULT: 'var(--color-border-default)', subtle: 'var(--color-border-subtle)', strong: 'var(--color-border-strong)' },
        // text-ink, text-ink-muted …
        ink: { DEFAULT: 'var(--color-text-primary)', secondary: 'var(--color-text-secondary)', muted: 'var(--color-text-muted)', disabled: 'var(--color-text-disabled)' },
        brand: { DEFAULT: 'var(--color-brand)', hover: 'var(--color-brand-hover)', muted: 'var(--color-brand-muted)', on: 'var(--color-on-brand)' },
        gain: { DEFAULT: 'var(--color-gain)', bg: 'var(--color-gain-bg)' },
        loss: { DEFAULT: 'var(--color-loss)', bg: 'var(--color-loss-bg)' },
        pending: { DEFAULT: 'var(--color-pending)', bg: 'var(--color-pending-bg)' },
        chart: { 1: 'var(--color-chart-1)', 2: 'var(--color-chart-2)', 3: 'var(--color-chart-3)', 4: 'var(--color-chart-4)', 5: 'var(--color-chart-5)', 6: 'var(--color-chart-6)' },
        // Active network accent (follows <html data-network>), plus fixed per-network sets for the selector menu
        network: { DEFAULT: 'var(--color-network)',
          mainnet: { DEFAULT: 'var(--color-network-mainnet)', fg: 'var(--color-network-mainnet-fg)', bg: 'var(--color-network-mainnet-bg)', border: 'var(--color-network-mainnet-border)' },
          sepolia: { DEFAULT: 'var(--color-network-sepolia)', fg: 'var(--color-network-sepolia-fg)', bg: 'var(--color-network-sepolia-bg)', border: 'var(--color-network-sepolia-border)' },
          local: { DEFAULT: 'var(--color-network-local)', fg: 'var(--color-network-local-fg)', bg: 'var(--color-network-local-bg)', border: 'var(--color-network-local-border)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'display': ['44px', { lineHeight: '1.05', fontWeight: '500', letterSpacing: '-0.03em' }],
        'display-sm': ['36px', { lineHeight: '1.05', fontWeight: '500', letterSpacing: '-0.03em' }],
        'hero': ['56px', { lineHeight: '1.05', fontWeight: '600', letterSpacing: '-0.03em' }],
        'title': ['15px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0' }],
        'body': ['13px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
        'body-lg': ['14px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
        'figure': ['13px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0' }],
        'label': ['11px', { lineHeight: '1.3', fontWeight: '400', letterSpacing: '0.1em' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0' }],
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        menu: 'var(--shadow-menu)',
        sheet: 'var(--shadow-sheet)',
        focus: 'var(--ring-focus)',
      },
      transitionDuration: { fast: '120ms', base: '200ms' },
      screens: { sm: '640px', lg: '1024px', xl: '1440px' },
    },
  },
};
// Spacing: Tailwind's default 4px scale already matches Ethra's spacing tokens (1 = 4px … 14 = 56px).
