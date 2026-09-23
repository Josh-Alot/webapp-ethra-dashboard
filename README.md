# Ethra

A read-only web dashboard for an EVM wallet: address, total balance in USD, token list and transaction history.

> Portfolio project. MVP 1 is read-only: it never requests signatures or sends transactions.

## Stack

- React + TypeScript (strict) + Vite
- Tailwind CSS v4 with the Ethra preset (`tailwind.preset.cjs`) and design tokens (`src/styles/tokens.css`)
- Planned: wagmi + viem (blockchain reads), Vitest + Testing Library (tests), Foundry (local contracts)

## Getting started

```bash
cp .env.example .env   # fill in RPC URLs and API keys
npm install
npm run dev
```

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Preview the production build |

## Project structure

```
src/
  app/          App shell and routes
  components/   Base and feature components
  data/         Read-only data hooks (usePortfolio, usePrices, useTransactions)
  actions/      Reserved for write hooks (MVP 2/3), empty in MVP 1
  config/       Chain registry (chains.ts)
  lib/          Formatters (formatUsd, formatAmount, shortenAddress, formatDate)
  styles/       tokens.css + Tailwind entry
  assets/brand/ Logo and symbol SVGs
docs/handoff/   Design handoff: implementation plan, tokens and screen boards
```

## Design

The design reference lives in `docs/handoff/`. Open the files in `docs/handoff/design/` in a browser to see every screen and component board. The feature order is defined in `docs/handoff/IMPLEMENTATION_PLAN.md`.

Rules: dark theme only, tokens only (no raw hex values in components), figures use `.num` (mono + tabular numbers).
