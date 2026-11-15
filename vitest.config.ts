import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: 'jsdom',
    include: ['app/src/**/*.test.{ts,tsx}', 'tests/**/*.test.ts'],
    // Windows workaround: when the shell starts in "c:\CAA" (lower-case drive,
    // as VS Code often does) the default "forks" pool loads Vitest twice, once
    // as file:///c:/... and once as file:///C:/..., and every suite fails with
    // "Cannot read properties of undefined (reading 'config')". The vm-based
    // pool does not hit this. Revisit when Vitest fixes drive-letter handling.
    pool: 'vmForks',
  },
});
