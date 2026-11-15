import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'preact';
import { App } from './app';
import { esMX } from './i18n/es-MX';

describe('App', () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    if (container) {
      render(null, container);
      container.remove();
      container = undefined;
    }
  });

  it('renders the app name from the es-MX strings', () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    render(<App />, container);

    expect(container.textContent).toContain(esMX.appName);
  });
});
