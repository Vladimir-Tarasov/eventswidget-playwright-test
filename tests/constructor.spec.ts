import { type Page } from '@playwright/test';
import { test, expect } from './fixtures';
import { EventsWidgetPage } from './pages/events-widget.page';
import { gotoWidgetAndAssert } from './support/navigation';

test.describe('Constructor section tests', () => {
  const constructorPreviewSelector = '#preview';
  const typeCheckselectSelector = '.checkselect:has(input[name="type"])';
  const typeDropdownControlSelector = `${typeCheckselectSelector} .checkselect-control`;
  const typeFirstOptionCheckboxSelector = `${typeCheckselectSelector} input[name="type"][value]:not([value=""])`;
  const typeFirstOptionLabelSelector = `${typeCheckselectSelector} label:has(input[name="type"][value]:not([value=""]))`;
  const typeClearSelector = '.checkselect-clear[data-name="type"]';
  const countryCheckselectSelector = '.checkselect:has(input[name="country"])';
  const countryDropdownControlSelector = `${countryCheckselectSelector} .checkselect-control`;
  const countryOptionCheckboxSelector = `${countryCheckselectSelector} input[name="country"]`;
  const countryOptionLabelSelector = `${countryCheckselectSelector} label:has(input[name="country"])`;
  const countryClearSelector = '.checkselect-clear[data-name="country"]';

  const verifyDropdownSelectAndClear = async (
    page: Page,
    {
      dropdownControlSelector,
      optionLabelSelector,
      optionCheckboxSelector,
      clearSelector,
      optionIndex,
      entityName,
    }: {
      dropdownControlSelector: string;
      optionLabelSelector: string;
      optionCheckboxSelector: string;
      clearSelector: string;
      optionIndex: number;
      entityName: string;
    },
  ) => {
    const dropdownControl = page.locator(dropdownControlSelector).first();
    await expect(dropdownControl, `${entityName} dropdown control should be visible`).toBeVisible();
    await dropdownControl.click();

    const optionLabel = page.locator(optionLabelSelector).nth(optionIndex);
    const optionCheckbox = page.locator(optionCheckboxSelector).nth(optionIndex);

    await expect(optionLabel, `${entityName} option label should be visible`).toBeVisible();
    await optionLabel.click();
    await expect(optionCheckbox, `${entityName} checkbox should be selected`).toBeChecked();

    const clearControl = page.locator(clearSelector).first();
    await expect(clearControl, `${entityName} clear control should be visible`).toBeVisible();
    await clearControl.click();

    await expect(optionCheckbox, `${entityName} checkbox should be unselected after clear`).not.toBeChecked();
  };

  test.beforeEach(async ({ page }) => {
    await gotoWidgetAndAssert(page);
  });

  test('type field exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.typeField(), 'data-name="type" should exist in DOM').toBeVisible();
  });

  test('country field exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.countryField(), 'data-name="country" should exist in DOM').toBeVisible();
  });

  test('preview field exists', async ({ page }) => {
    const previewFieldCount = await page.locator(constructorPreviewSelector).count();
    expect(previewFieldCount, 'id="preview" should exist in DOM').toBeGreaterThan(0);
  });

  test('width input exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.widthInput(), 'Width input should exist in DOM').toBeVisible();
  });

  test('height input exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.heightInput(), 'Height input should exist in DOM').toBeVisible();
  });

  test('accent-color step exists', async ({ page }) => {
    await expect(page.getByText(/step\s*4/i).first(), 'accent-color step should exist in DOM').toBeVisible();
  });

  test('generate preview button exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.generatePreviewButton(), '"Generate preview" button should exist in DOM').toBeVisible();
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
    await verifyDropdownSelectAndClear(page, {
      dropdownControlSelector: typeDropdownControlSelector,
      optionLabelSelector: typeFirstOptionLabelSelector,
      optionCheckboxSelector: typeFirstOptionCheckboxSelector,
      clearSelector: typeClearSelector,
      optionIndex: 1,
      entityName: 'Type',
    });
  });

  test('country checkbox can be selected and cleared', async ({ page }) => {
    await verifyDropdownSelectAndClear(page, {
      dropdownControlSelector: countryDropdownControlSelector,
      optionLabelSelector: countryOptionLabelSelector,
      optionCheckboxSelector: countryOptionCheckboxSelector,
      clearSelector: countryClearSelector,
      optionIndex: 0,
      entityName: 'Country',
    });
  });
});
