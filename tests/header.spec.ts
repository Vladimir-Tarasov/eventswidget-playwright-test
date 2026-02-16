import { test, expect } from './fixtures';

test.describe('Events widget header tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const headerNavSelector = 'header nav';
  const headerSearchSelector = 'header .header-search button.search-toggle';
  const headerLanguageSelector = '.header-lang .desktop-lang, .desktop-lang';

  test.beforeEach(async ({ page }) => {
    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Header page response should exist').not.toBeNull();
    expect(response?.ok(), 'Header page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(widgetUrlPattern);
  });

  test('header nav menu exists', async ({ page }) => {
    await expect(page.locator(headerNavSelector).first()).toBeVisible();
  });

  test('header search exists', async ({ page }) => {
    await expect(page.locator(headerSearchSelector).first()).toBeVisible();
  });

  test('header language selector exists', async ({ page }) => {
    await expect(page.locator(headerLanguageSelector).first()).toBeVisible();
  });
});
