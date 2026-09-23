import ethraPreset from './tailwind.preset.cjs'

// Loaded from src/styles/index.css via `@config`.
// All design tokens live in the Ethra preset; keep this file for project-level overrides only.
/** @type {import('tailwindcss').Config} */
export default {
  presets: [ethraPreset],
}
