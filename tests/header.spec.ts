import { test, expect } from '@playwright/test';

test.describe('Events widget header tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const headerNavSelector = 'header nav';
  const headerSearchSelector = 'header .header-search button.search-toggle';
  const headerLanguageSelector = '.header-lang .desktop-lang, .desktop-lang';

  test('header nav menu exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(widgetUrlPattern);
    await expect(page.locator(headerNavSelector).first()).toBeVisible();
  });

  test('header search exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(widgetUrlPattern);
    await expect(page.locator(headerSearchSelector).first()).toBeVisible();
  });

  test('header language selector exists', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(widgetUrlPattern);
    await expect(page.locator(headerLanguageSelector).first()).toBeVisible();
  });
});
