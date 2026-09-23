# Ethra — Implementation plan (MVP 1, read-only)

Design: “Instrument” direction, dark theme only. Screens, components and tokens are on the design canvas (pages 1–5).
Build the features in order. Each one is independently shippable.

## Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with handoff/tailwind.preset.js + handoff/tokens.css
- **Web3:** wagmi v2 + viem (read-only: useAccount, useBalance, useReadContracts, useEnsName, useSwitchChain)
- **Data:** TanStack Query (bundled with wagmi) for caching, retries and refetch
- **Chart:** Hand-written SVG donut (stroke-dasharray), same technique as the design; no chart library needed
- **Chains:** foundry (31337), sepolia (11155111), mainnet (1) from wagmi/chains

## Files in this bundle

- `handoff/tokens.css`: CSS custom properties (colors, type, spacing, radii, shadows)
- `handoff/tailwind.preset.js`: Tailwind preset mapping the tokens (`bg-surface-panel`, `text-ink-muted`, `border-line`, `bg-brand`…)
- `handoff/brand/*.svg`: symbol, favicon, app icon, logo lockups

## Project structure (suggested)

```
src/
  app/            AppShell, routes
  components/     Button, NetworkBadge, BalanceCard, …
  data/           read-only hooks: usePortfolio, usePrices, useTransactions
  actions/        (empty) reserved for MVP 2/3 write hooks
  config/chains.ts
  lib/format.ts   formatUsd, formatAmount, shortenAddress, formatDate
```

## Feature 1 — Design tokens & base components

**Goal:** Put the Ethra foundation in code so every later feature only composes existing pieces.

**Components**

- tokens.css + tailwind.preset.js (from handoff/)
- Logo (Wordmark, Symbol, 2-band small symbol)
- Button, IconButton
- StatusBadge
- SegmentedControl, Toggle
- Skeleton (text, block, circle, ring)
- formatters: formatUsd, formatAmount, shortenAddress, formatDate

**States to cover**

- Button: default, hover, focus-visible, loading, disabled
- Skeleton: pulse and reduced-motion
- StatusBadge: confirmed, pending, failed

**Acceptance criteria**

- [ ] No raw hex values in components; everything uses tokens.
- [ ] All figures use font-mono + tabular-nums (.num).
- [ ] Every interactive element shows the gold focus ring on keyboard focus.
- [ ] Button sizes are exactly 28 / 32 / 44px high.
- [ ] A /dev route (or Storybook) renders every variant from the Components board.
- [ ] shortenAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F") returns "0x71C7…976F".

## Feature 2 — Layout & header with network badge

**Goal:** Build the app shell: header, 380px summary panel and data column, with the active network always visible.

**Components**

- AppShell, Header, SummaryPanel, DataColumn
- NetworkBadge (selector, static, compact, unsupported)
- NetworkMenu
- chains.ts registry: id, name, label, color token, explorerUrl?, isTestnet

**States to cover**

- Mainnet, Sepolia, Anvil
- Network menu open
- Unsupported chain

**Acceptance criteria**

- [ ] Header shows the 2px network line and the badge on every screen, connected or not.
- [ ] <html data-network> drives --color-network; no per-component network logic.
- [ ] Choosing a network in the menu calls switchChain; the badge updates when the wallet confirms.
- [ ] An unsupported chainId shows the red UNSUPPORTED badge and the menu to switch.
- [ ] Adding a network means editing chains.ts only.

## Feature 3 — Wallet connection & disconnected state

**Goal:** Connect one wallet (read-only) and show the Ethra welcome screen when none is connected.

**Components**

- WelcomeScreen
- ConnectButton (wagmi injected connector; WalletConnect optional)
- AddressChip + CopyButton + ExplorerLink
- DisconnectButton
- AccountSheet (mobile)

**States to cover**

- Disconnected
- Connecting (button loading)
- Connection rejected (inline message, button enabled again)
- Connected with ENS / without ENS
- Copied (1.5s)

**Acceptance criteria**

- [ ] No code path ever requests a signature or sends a transaction.
- [ ] ENS is resolved with useEnsName on mainnet only; falls back to the short address.
- [ ] Copy writes the full checksummed address to the clipboard and shows COPIED for 1.5s.
- [ ] The explorer link uses chains.ts; Anvil hides it.
- [ ] Disconnect returns to the welcome screen and clears cached wallet data.

## Feature 4 — Total balance card

**Goal:** Show the portfolio total in USD with the 24h change.

**Components**

- BalanceCard
- ChangeIndicator
- usePortfolio(address, chainId): balances + prices

**States to cover**

- Default gain / loss / flat
- Partial prices (“Excludes N tokens without a USD price”)
- No prices (“—”)
- Loading, empty ($0.00), error

**Acceptance criteria**

- [ ] Total = Σ(amount × price) over priced tokens only.
- [ ] Unpriced tokens are never counted as $0 silently; the note says how many are excluded.
- [ ] Change shows ▲/▼ and a sign as well as color.
- [ ] USD uses Intl.NumberFormat("en-US", currency USD, 2 decimals).
- [ ] Layout doesn’t shift between loading and loaded.

## Feature 5 — Allocation chart

**Goal:** Donut of the portfolio distribution by USD value.

**Components**

- AllocationChart (SVG)
- ChartLegend

**States to cover**

- Default (top 5 + Other)
- Partial prices (unpriced listed as “No price”)
- No prices
- Empty
- Loading (ring skeleton)

**Acceptance criteria**

- [ ] Top 5 tokens by value get chart-1…5; the rest merge into “Other” (chart-6).
- [ ] Legend percentages add up to 100.0% (largest-remainder rounding).
- [ ] Slices under 0.5% still render a minimum visible arc.
- [ ] The SVG has role="img" and an aria-label summary; the legend is the text equivalent.

## Feature 6 — Token table

**Goal:** List the wallet’s tokens with amount, price, value and share, sorted by USD value.

**Components**

- TokenTable, TokenRow (desktop)
- TokenIcon (image with letter fallback)
- HideDustToggle
- SpamTag
- Token list: native balance + ERC-20 balances via multicall (useReadContracts) from a per-chain token list

**States to cover**

- Default
- Loading (5 skeleton rows)
- Empty
- Error
- No price row
- Hidden count footer
- Suspected spam (visible only when the toggle is off)

**Acceptance criteria**

- [ ] Sorted by USD value descending; unpriced tokens follow, sorted by name.
- [ ] Dust = value under $1.00; hidden by default together with suspected spam.
- [ ] The toggle state persists in localStorage.
- [ ] No price shows “No price” in Price and “—” in Value and %.
- [ ] Amounts show up to 4 decimals, trimming trailing zeros past 2.

## Feature 7 — Transaction list with filters

**Goal:** Show the wallet’s history with type and status filters.

**Components**

- TransactionList, TransactionRow
- SegmentedControl ×2 (type, status)
- StatusBadge
- LoadMore
- useTransactions(address, chainId): Etherscan-compatible API for mainnet/Sepolia; block scan via viem for Anvil

**States to cover**

- Default
- Pending row
- Failed row
- Filtered to nothing (“No transactions match these filters” + Clear filters)
- Loading, empty, error

**Acceptance criteria**

- [ ] Type: from = wallet → Sent; to = wallet → Received; non-empty input → Contract.
- [ ] Type and status filters combine with AND.
- [ ] Gas fee shows only for transactions the wallet sent; otherwise “—”.
- [ ] Dates are local time, “Sep 23 · 14:32”.
- [ ] Each row links to the chain’s explorer (hidden on Anvil).
- [ ] Pages of 20 with Load more.

## Feature 8 — Loading, empty & error states

**Goal:** Make every section handle all four data states consistently.

**Components**

- Skeleton variants
- EmptyState
- SectionError
- ErrorBanner
- TestnetNotice

**States to cover**

- RPC/network failure (banner + section errors)
- Partial failure (e.g. prices fail, balances load)
- Empty wallet
- Testnet / local notice

**Acceptance criteria**

- [ ] Balance, chart, tokens and transactions each implement loading / empty / error / success.
- [ ] Retry refetches the failed queries only.
- [ ] A price API failure degrades to the “No price” UI, never to an error screen.
- [ ] Errors are announced via an aria-live="polite" region.
- [ ] Skeletons match final dimensions (no layout shift).

## Feature 9 — Mobile responsiveness

**Goal:** Adapt every screen to 390px width.

**Components**

- MobileHeader (symbol, compact badge, account button)
- AccountSheet, NetworkSheet
- TokenCard, TransactionCard
- FilterChips

**States to cover**

- All states from features 3–8 at 390px

**Acceptance criteria**

- [ ] ≥1024px: two columns. <1024px: single column (balance, chart, tokens, transactions).
- [ ] <640px: the token table becomes TokenCards and transactions become TransactionCards.
- [ ] Every touch target is ≥44px.
- [ ] No horizontal page scroll at 360px.
- [ ] Copy, explorer and disconnect move into the AccountSheet.

## Extension points (roadmap)

| Where | How to prepare in MVP 1 | Unlocks |
|---|---|---|
| Header · actions slot | Header accepts an `actions` node between the network badge and the account. Empty in MVP 1. | MVP 2/3: global Send / Swap entry points. |
| AddressChip → WalletSwitcher | Keep `wallets: Wallet[]` and `activeWalletId` in the store from day one, even with one wallet. AddressChip reads the active one. | Multi-wallet: same footprint, adds chevron + menu. |
| BalanceCard · actions slot | `actions?: ReactNode` renders under the change row. Reserve the 32px row in layout only when present. | MVP 2: Send. MVP 3: Swap. |
| TokenRow · trailing slot | `trailing?: ReactNode` as a 28px last column (a ⋯ menu). | MVP 2/3: send or swap this token. |
| Transaction type map | `TX_TYPES` config maps type → icon + label. Adding a type is a config change. | MVP 3: `swap`, `approve`. |
| Read vs write layers | All data hooks live in `src/data/` and are read-only. Create an empty `src/actions/` folder for future write hooks (useSendToken, useSwap). | Keeps MVP 1 verifiably read-only. |
| chains.ts capabilities | Each chain entry has `capabilities: { transfers: false, swaps: false }`. | Turn features on per network. |

## Global rules

- Read-only: no `writeContract`, `sendTransaction` or `signMessage` anywhere in MVP 1.
- The active network is always visible (badge + 2px header line). Never show testnet amounts next to a USD figure without a price.
- Gain/loss colors are only for changes and statuses; network colors only for networks; gold only for brand, primary action and focus.
- Copy: short, clear, confident. No crypto slang, no hype. All UI text in English.
