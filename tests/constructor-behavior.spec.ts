import { test, expect } from './fixtures';

test.describe('Constructor behavior tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const constructorPreviewSectionSelector = '.constructor__preview';
  const generatePreviewButtonSelector = 'button.button.green-bg.fw-bold.text-md';
  const generatedIframeSelector = 'iframe[id="3snet-frame"]';

  test('clicking generate preview button shows iframe with id "3snet-frame"', async ({ page }) => {
    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Constructor page response should exist').not.toBeNull();
    expect(response?.ok(), 'Constructor page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(widgetUrlPattern);

    const previewSection = page.locator(constructorPreviewSectionSelector).first();
    await expect(previewSection, 'Constructor preview section should be visible').toBeVisible();

    const generatePreviewButton = previewSection.locator(generatePreviewButtonSelector).first();
    await expect(generatePreviewButton, 'Generate preview button should be visible').toBeVisible();
    await expect(generatePreviewButton, 'Generate preview button should be enabled').toBeEnabled();
    await generatePreviewButton.click();

    await expect(page.locator(generatedIframeSelector), 'Generated iframe should appear after click').toHaveCount(1, {
      timeout: 15000,
    });
  });
});
