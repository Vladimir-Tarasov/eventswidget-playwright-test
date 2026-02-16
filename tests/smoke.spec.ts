import { test, expect } from '@playwright/test';

test.describe('Events widget smoke tests', () => {
  test('page loads and renders visible content', async ({ page }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response, 'Main page response should exist').not.toBeNull();
    expect(response?.ok(), 'Main page should return successful response').toBeTruthy();

    await expect(page.locator('body')).toBeVisible();

    const visibleBlocks = await page.locator('body *:visible').count();
    expect(visibleBlocks, 'Widget should render visible DOM nodes').toBeGreaterThan(5);

    expect(pageErrors, `Browser page errors found: ${pageErrors.join(' | ')}`).toHaveLength(0);
  });
});
