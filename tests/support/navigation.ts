import { expect, type Page } from '@playwright/test';

export const WIDGET_PATH = '/';
export const WIDGET_URL_PATTERN = /\/eventswidget\/?$/;

export async function gotoWidgetAndAssert(page: Page): Promise<void> {
  const response = await page.goto(WIDGET_PATH, { waitUntil: 'domcontentloaded' });
  expect(response, 'Widget page response should exist').not.toBeNull();
  expect(response?.ok(), 'Widget page should return successful response').toBeTruthy();
  await expect(page).toHaveURL(WIDGET_URL_PATTERN);
}
