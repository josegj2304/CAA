import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// Provisional minimum Android WebView (decision D3 in tasks/plan/T-01.md).
// chrome61 is the first Chrome with native ES modules. Replace it with the
// minimum WebView measured in docs/spike-voz/RESULTADOS.md (T-00d), at the
// latest in T-10.
const BUILD_TARGET = 'chrome61';

export default defineConfig({
  root: 'app',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: BUILD_TARGET,
  },
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'SAAC-MX',
        short_name: 'SAAC-MX',
        lang: 'es-MX',
        start_url: '.',
        display: 'standalone',
        icons: [],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webmanifest}'],
      },
    }),
  ],
});
