# CLAUDE.md

## Language

- **Talk to me in Brazilian Portuguese** (explanations, questions, reviews).
- **Everything produced in the project must be in English:** code, variable and function names, comments, UI text, documentation, commit messages, branch names, PR descriptions, and tests.

## Project overview

**Ethra** is a web dashboard for an EVM crypto wallet. Portfolio project for Web3 job applications.

- App name: **Ethra** (always capitalized this way in UI and docs).
- Domain: `ethra.app`.
- Repository and package name: `ethra`.

- **MVP 1 (current):** read-only. A single connected wallet, with the address at the top, total balance in USD, token list (amount, unit price, and USD value), and transaction history.
- **MVP 2:** token transfers.
- **MVP 3:** swaps.
- **Future:** multi-wallet support.

Do not implement anything from future MVPs now. Just keep the code ready for them (components and hooks that are easy to extend).

The design comes from the Claude Design handoff, extracted to `docs/handoff/` (plan in `docs/handoff/IMPLEMENTATION_PLAN.md`, screen boards in `docs/handoff/design/`). Follow the design tokens, components, and the feature-based implementation plan included in it.

## Environments and networks

The project evolves in three stages, in this order:

1. **Local:** Anvil (Foundry), chainId 31337. Used for development and testing with test ERC-20 contracts deployed via Forge.
2. **Testnet:** Ethereum Sepolia (chainId 11155111).
3. **Production:** Ethereum Mainnet (chainId 1), only when I authorize it.

Rules:
- The active network must always be visible in the UI, with a distinct visual identity per environment.
- RPC URLs, API keys, and contract addresses live in environment variables (`.env`), never in the code.
- Testnet and local tokens usually have no USD price. The app must handle this gracefully (display "No price").
- Transaction history does not come directly from the RPC. On Sepolia and Mainnet, use an indexing API (e.g., Etherscan). On Anvil, read local blocks. Hide this logic behind a single interface so the data source can be swapped per network.

## Suggested stack

If I haven't defined it yet, propose it and confirm with me before installing anything:

- React + TypeScript + Vite
- wagmi + viem for blockchain interaction (TanStack Query comes with it)
- A wagmi-compatible wallet connection library
- Vitest + Testing Library for tests
- Foundry (Forge + Anvil) for test contracts

Before adding any new dependency, explain why it is needed and whether there is a simpler alternative.

## About me and how I want to learn

- I have a JavaScript background and previous experience with **Angular**, but I've been away from coding for a while and I'm **learning React**.
- **I don't want you to build the whole app for me.** I want to learn by building, with you guiding and reviewing my work.

## How to work with me

1. **One feature at a time.** Follow the order of the handoff plan and only move on when I ask.
2. **Explain before coding.** Describe the approach and the React concepts involved (components, props, state, hooks, effects, context).
3. **Compare with Angular** when it helps. Examples: `useEffect` vs `ngOnInit`/`ngOnDestroy`, props vs `@Input`, callbacks vs `@Output`, Context vs services with dependency injection, custom hooks vs services.
4. **Leave key parts to me.** Use `TODO(human)` markers in the pieces that teach something important, with a hint of what to do.
5. **Review my code** when I finish a `TODO(human)`: point out bugs, bad practices, and improvements, always explaining why.
6. **Don't rewrite my code without telling me.** Suggest the change, explain it, and wait for my confirmation.
7. **Keep explanations short and to the point.** If I want to go deeper, I'll ask.

## Code conventions

- TypeScript in strict mode. Avoid `any`.
- Functional components with hooks.
- Blockchain and API logic in custom hooks (e.g., `useTokenBalances`, `useTransactions`), outside visual components.
- Centralized formatting utilities (shortened addresses, USD, token amounts with correct decimals).
- Never use `number` for on-chain values. Use `bigint` and format only for display.
- Every component that fetches data must handle loading, empty, and error states.

## Git

- One branch per feature (e.g., `feat/token-table`).
- Small commits following Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
- At the end of each feature, suggest the commit message and a PR summary.
- **Never push** to any remote. Pushing is always done by me.
- **Never commit without my approval.** Show me the staged changes and the proposed commit message first, and only commit after I approve.

## Security

- This MVP is read-only. Never request signatures or send transactions.
- Never put private keys, seed phrases, or API keys in the code or in commits.
- Make sure `.env` is in `.gitignore` and keep an up-to-date `.env.example`.
- Anvil account private keys may only be used in local scripts, never in the front-end.

## Tests

- At the end of each feature, propose tests for the main utilities and hooks.
- Let me write at least one test per feature, with your review.
