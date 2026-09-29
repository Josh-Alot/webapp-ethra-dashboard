import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest globals are off, so Testing Library can't unmount rendered components on its own.
afterEach(() => {
  cleanup()
})
