import { test, expect } from './fixtures';
import { EventsWidgetPage } from './pages/events-widget.page';
import { gotoWidgetAndAssert } from './support/navigation';

test.describe('Events widget smoke tests', () => {
  const bodySelector = 'body';
  const visibleElementsSelector = 'body *:visible';

  test.beforeEach(async ({ page }) => {
    await gotoWidgetAndAssert(page);
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
    const widget = new EventsWidgetPage(page);
    const widgetContainer = widget.constructorSection();
    await expect(widgetContainer).toBeVisible();
    await expect(widgetContainer).toBeInViewport();
  });

  test('header navigation exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.navigation()).toBeVisible();
  });

  test('constructor exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.constructorSection()).toHaveCount(1);
  });

  test('promocodes carousel exists', async ({ page }) => {
    await expect(page.getByRole('region', { name: /promo/i }).first()).toBeVisible();
  });

  test('footer exists', async ({ page }) => {
    await expect(page.getByRole('contentinfo').first()).toBeVisible();
  });
});
