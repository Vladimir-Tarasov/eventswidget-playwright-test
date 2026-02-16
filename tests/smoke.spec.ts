import { test, expect } from '@playwright/test';

test.describe('Events widget smoke tests', () => {
  test.describe.configure({ mode: 'serial' });
  const widgetSelector = '.constructor';
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const previewButtonSelector = '.constructor__preview button';
  const previewFrameSelector = '#preview iframe';
  const eventCardSelector = '.event-activity-item';

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

  test('at least one event card exists within the list', async ({ page }) => {
    await page.goto(widgetUrl, { waitUntil: 'load' });
    await expect(page).toHaveURL(/\/eventswidget\/?$/);

    await page.locator(previewButtonSelector).click();
    const previewFrame = page.locator(previewFrameSelector);
    await expect(previewFrame).toBeVisible();

    const frameElement = await previewFrame.elementHandle();
    expect(frameElement, 'Preview iframe should exist in DOM').not.toBeNull();

    const frame = await frameElement!.contentFrame();
    expect(frame, 'Preview iframe should expose a frame context').not.toBeNull();

    await frame!.waitForLoadState('domcontentloaded');
    await frame!.waitForSelector(eventCardSelector);

    const cardsCount = await frame!.locator(eventCardSelector).count();
    expect(cardsCount, 'At least one event card should be present in the widget list').toBeGreaterThan(0);
  });
});
