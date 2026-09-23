# Ethra — handoff for Claude Code

Contents
- IMPLEMENTATION_PLAN.md — 9 ordered features (goal, components, states, acceptance criteria) + extension points
- tokens.css, tailwind.preset.js — design tokens (dark theme only)
- brand/ — symbol, favicon, app icon, logo lockups (SVG)
- design/ — every screen and component board as self-contained HTML (open in a browser as visual reference):
  D01–D06 desktop 1440 · M01–M08 mobile 390 · H01 brand · H02 tokens · H03 components · H04 extension points · H05 plan

## First prompt (feature 1)

Read START_HERE.md and IMPLEMENTATION_PLAN.md in ./ethra-handoff. Scaffold a Vite + React + TypeScript project with
Tailwind, wagmi v2 and viem. Install tokens.css and tailwind.preset.js as described. Then implement ONLY Feature 1
(design tokens & base components), matching design/H02-Design-Tokens and design/H03-Components-Core.
Check every acceptance criterion of Feature 1 and stop. Do not start Feature 2.

## Next features

Implement Feature N from ethra-handoff/IMPLEMENTATION_PLAN.md. Use design/<relevant boards> as the visual
reference. Cover every listed state, check every acceptance criterion, and stop when done.

Rules for every feature: MVP 1 is read-only (no writeContract, sendTransaction or signMessage); all UI copy in English;
use tokens only, never raw hex values; keep the extension-point slots as optional props.
