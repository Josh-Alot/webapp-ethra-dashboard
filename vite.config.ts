/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // jsdom gives tests a browser-like DOM so Testing Library can render components.
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
