import { test, expect } from './fixtures';

test.describe('Constructor section tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const constructorTypeSelector = '[data-name="type"]';

  test.beforeEach(async ({ page }) => {
    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Constructor page response should exist').not.toBeNull();
    expect(response?.ok(), 'Constructor page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(widgetUrlPattern);
  });

  test('type field exists', async ({ page }) => {
    const typeFieldCount = await page.locator(constructorTypeSelector).count();
    expect(typeFieldCount, 'data-name="type" should exist in DOM').toBeGreaterThan(0);
  });
});
