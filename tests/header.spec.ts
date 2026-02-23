import { test, expect } from './fixtures';
import { EventsWidgetPage } from './pages/events-widget.page';
import { gotoWidgetAndAssert } from './support/navigation';

test.describe('Events widget header tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWidgetAndAssert(page);
  });

  test('header nav menu exists', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    await expect(widget.navigation()).toBeVisible();
  });

  test('header search exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: /search/i }).first()).toBeVisible();
  });

  test('header language selector exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: /(lang|english|en)/i }).first()).toBeVisible();
  });
});
