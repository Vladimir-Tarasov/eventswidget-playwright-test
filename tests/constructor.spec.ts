import { test, expect } from './fixtures';

test.describe('Constructor section tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const constructorTypeSelector = '[data-name="type"]';
  const typeCheckselectSelector = '.checkselect:has(input[name="type"])';
  const typeDropdownControlSelector = `${typeCheckselectSelector} .checkselect-control`;
  const typeFirstOptionCheckboxSelector = `${typeCheckselectSelector} input[name="type"][value]:not([value=""])`;
  const typeFirstOptionLabelSelector = `${typeCheckselectSelector} label:has(input[name="type"][value]:not([value=""]))`;
  const typeClearSelector = '.checkselect-clear[data-name="type"]';

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

  test('first type checkbox enables active clear control', async ({ page }) => {
    const typeDropdownControl = page.locator(typeDropdownControlSelector).first();
    await expect(typeDropdownControl, 'Type dropdown control should be visible').toBeVisible();
    await typeDropdownControl.click();

    const firstTypeOptionLabel = page.locator(typeFirstOptionLabelSelector).first();
    await expect(firstTypeOptionLabel, 'First type option label should be visible in dropdown').toBeVisible();
    await firstTypeOptionLabel.click();

    const firstTypeCheckbox = page.locator(typeFirstOptionCheckboxSelector).first();
    await expect(firstTypeCheckbox, 'First type checkbox should be checked after click').toBeChecked();

    const typeClearControl = page.locator(typeClearSelector).first();
    await expect(typeClearControl, 'Type clear control should be visible').toBeVisible();
    await expect(typeClearControl, 'Type clear control should have active state').toHaveClass(/active/);
  });

  test('dropdown checkbox can be selected and cleared', async ({ page }) => {
    const typeDropdownControl = page.locator(typeDropdownControlSelector).first();
    await expect(typeDropdownControl, 'Type dropdown control should be visible').toBeVisible();
    await typeDropdownControl.click();

    const randomTypeCheckbox = page.locator(typeFirstOptionCheckboxSelector).nth(1);
    const randomTypeOptionLabel = page.locator(typeFirstOptionLabelSelector).nth(1);

    await expect(randomTypeOptionLabel, 'Random type option label should be visible').toBeVisible();
    await randomTypeOptionLabel.click();
    await expect(randomTypeCheckbox, 'Random type checkbox should be selected').toBeChecked();

    const typeClearControl = page.locator(typeClearSelector).first();
    await expect(typeClearControl, 'Type clear control should be visible').toBeVisible();
    await typeClearControl.click();

    await expect(randomTypeCheckbox, 'Random type checkbox should be unselected after clear').not.toBeChecked();
  });
});
