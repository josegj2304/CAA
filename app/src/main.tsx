import { render } from 'preact';
import { registerSW } from 'virtual:pwa-register';
import { App } from './app';

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}

// The service worker precaches the app shell so it starts without network.
registerSW({ immediate: true });
