import { test, expect } from './fixtures';
import { EventsWidgetPage } from './pages/events-widget.page';
import { gotoWidgetAndAssert } from './support/navigation';

test.describe('Constructor behavior tests', () => {
  const generatedIframeSelector = 'iframe[id="3snet-frame"]';
  const generatedCodeTextareaSelector = 'textarea#code';

  const normalizeHtml = (value: string): string =>
    value
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

  test('clicking generate preview button shows iframe with id "3snet-frame"', async ({ page }) => {
    await gotoWidgetAndAssert(page);
    const widget = new EventsWidgetPage(page);
    const previewSection = widget.constructorPreviewSection();
    await expect(previewSection, 'Constructor preview section should be visible').toBeVisible();

    const generatePreviewButton = widget.generatePreviewButton();
    await expect(generatePreviewButton, 'Generate preview button should be visible').toBeVisible();
    await expect(generatePreviewButton, 'Generate preview button should be enabled').toBeEnabled();
    await generatePreviewButton.click();

    await expect(page.locator(generatedIframeSelector), 'Generated iframe should appear after click').toHaveCount(1, {
      timeout: 15000,
    });
  });

  test('generated iframe html equals textarea#code text', async ({ page }) => {
    await gotoWidgetAndAssert(page);
    const widget = new EventsWidgetPage(page);
    const generatePreviewButton = widget.generatePreviewButton();
    await expect(generatePreviewButton, 'Generate preview button should be visible').toBeVisible();
    await generatePreviewButton.click();

    const iframe = page.locator(generatedIframeSelector).first();
    await expect(iframe, 'Generated iframe should appear after click').toBeVisible();

    const codeTextarea = page.locator(generatedCodeTextareaSelector).first();
    await expect(codeTextarea, 'Generated code textarea should be visible').toBeVisible();

    const iframeOuterHtml = await iframe.evaluate((element) => element.outerHTML);
    const textareaCode = await codeTextarea.inputValue();

    expect(normalizeHtml(iframeOuterHtml), 'Generated iframe html should match textarea#code text').toBe(
      normalizeHtml(textareaCode),
    );
  });
});
