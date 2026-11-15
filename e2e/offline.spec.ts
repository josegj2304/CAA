import { expect, test, type Page } from '@playwright/test';
import { esMX } from '../app/src/i18n/es-MX';

/** Resolves once the service worker is active, i.e. the app shell is precached. */
async function waitForServiceWorker(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
}

test('loads with network and shows the app name', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: esMX.appName })).toBeVisible();
});

test('starts without network once the service worker is ready', async ({ page, context }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: esMX.appName })).toBeVisible();
  await waitForServiceWorker(page);

  await context.setOffline(true);
  await page.reload();

  await expect(page.getByRole('heading', { name: esMX.appName })).toBeVisible();
  expect(await page.evaluate(() => navigator.serviceWorker.controller !== null)).toBe(true);
});

test('sends no request to any other origin', async ({ page, context, baseURL }) => {
  const ownOrigin = new URL(baseURL ?? '').origin;
  const foreign: string[] = [];
  context.on('request', (request) => {
    const url = new URL(request.url());
    if (url.protocol === 'data:' || url.protocol === 'blob:') {
      return;
    }
    if (url.origin !== ownOrigin) {
      foreign.push(request.url());
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: esMX.appName })).toBeVisible();
  await waitForServiceWorker(page);
  await page.waitForLoadState('networkidle');

  expect(foreign).toEqual([]);
});
