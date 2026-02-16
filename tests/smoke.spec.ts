import { test, expect } from './fixtures';

test.describe('Events widget smoke tests', () => {
  test.describe.configure({ mode: 'serial' });
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const bodySelector = 'body';
  const visibleElementsSelector = 'body *:visible';
  const widgetSelector = '.constructor';
  const headerContainerSelector = '.header-container';
  const promocodesCarouselSelector = '.promocodes-carousel';
  const footerSelector = 'footer';

  test.beforeEach(async ({ page }) => {
    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Main page response should exist').not.toBeNull();
    expect(response?.ok(), 'Main page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(widgetUrlPattern);
  });

  test('page loads and renders visible content', async ({ page }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await expect(page.locator(bodySelector)).toBeVisible();

    const visibleBlocks = await page.locator(visibleElementsSelector).count();
    expect(visibleBlocks, 'Widget should render visible DOM nodes').toBeGreaterThan(5);

    expect(pageErrors, `Browser page errors found: ${pageErrors.join(' | ')}`).toHaveLength(0);
  });

  test('widget container is visible', async ({ page }) => {
    const widgetContainer = page.locator(widgetSelector).first();
    await expect(widgetContainer).toBeVisible();
    await expect(widgetContainer).toBeInViewport();
  });

  test('header container exists', async ({ page }) => {
    await expect(page.locator(headerContainerSelector).first()).toBeVisible();
  });

  test('constructor exists', async ({ page }) => {
    await expect(page.locator(widgetSelector)).toHaveCount(1);
  });

  test('promocodes carousel exists', async ({ page }) => {
    await expect(page.locator(promocodesCarouselSelector).first()).toBeVisible();
  });

  test('footer exists', async ({ page }) => {
    await expect(page.locator(footerSelector).first()).toBeVisible();
  });
});
