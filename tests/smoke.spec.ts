import { test, expect } from '@playwright/test';

test.describe('Events widget smoke tests', () => {
  test.describe.configure({ mode: 'serial' });
  const widgetSelector = '.constructor';
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';

  test('page loads and renders visible content', async ({ page }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Main page response should exist').not.toBeNull();
    expect(response?.ok(), 'Main page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(/\/eventswidget\/?$/);

    await expect(page.locator('body')).toBeVisible();

    const visibleBlocks = await page.locator('body *:visible').count();
    expect(visibleBlocks, 'Widget should render visible DOM nodes').toBeGreaterThan(5);

    expect(pageErrors, `Browser page errors found: ${pageErrors.join(' | ')}`).toHaveLength(0);
  });

  test('widget container is visible', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'load' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);

    const widgetContainer = page.locator(widgetSelector).first();
    await expect(widgetContainer).toBeVisible();
    await expect(widgetContainer).toBeInViewport();
  });

  test('header container exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);
    await expect(page.locator('.header-container').first()).toBeVisible();
  });

  test('constructor exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);
    await expect(page.locator('.constructor')).toHaveCount(1);
  });

  test('promocodes carousel exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);
    await expect(page.locator('.promocodes-carousel').first()).toBeVisible();
  });
});
