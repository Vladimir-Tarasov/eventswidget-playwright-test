import { test, expect } from '@playwright/test';

test.describe('Events widget header tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';

  test('header nav menu exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);
    await expect(page.locator('header nav').first()).toBeVisible();
  });
});
