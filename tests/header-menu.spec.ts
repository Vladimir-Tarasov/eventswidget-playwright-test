import { test, expect } from './fixtures';

test.describe('Header menu tests', () => {
  const widgetUrl = 'https://dev.3snet.info/eventswidget/';
  const widgetUrlPattern = /\/eventswidget\/?$/;
  const topLevelHeaderMenuLinkSelector = 'header nav > ul > li > a[href]';
  const newsUrlPattern = /^https:\/\/dev\.3snet\.info\/news\/?$/;
  const reviewsRedirectUrlPattern = /^https:\/\/dev\.3snet\.info\/(?:\?.*)?$/;
  const sportScheduleUrl = 'https://dev.3snet.info/sport-events-schedule/';
  const newsHref = '/news/';
  const newsLinkSelector = `${topLevelHeaderMenuLinkSelector}[href='${newsHref}']`;
  const reviewsHref = '/reviews/';
  const reviewsLinkSelector = `${topLevelHeaderMenuLinkSelector}[href='${reviewsHref}']`;
  const sportScheduleHref = '/sport-events-schedule/';
  const sportScheduleLinkSelector = `${topLevelHeaderMenuLinkSelector}[href='${sportScheduleHref}']`;

  test.beforeEach(async ({ page }) => {
    const response = await page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });
    expect(response, 'Header menu page response should exist').not.toBeNull();
    expect(response?.ok(), 'Header menu page should return successful response').toBeTruthy();
    await expect(page).toHaveURL(widgetUrlPattern);
  });

  test('news menu item navigates to the correct page', async ({ page }) => {
    const link = page.locator(newsLinkSelector).first();
    await expect(link, 'News menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', newsHref);

    await Promise.all([
      page.waitForURL(newsUrlPattern, { waitUntil: 'commit' }),
      link.evaluate((element: HTMLAnchorElement) => {
        element.click();
      }),
    ]);
  });

  test('reviews menu item points to /reviews/ and currently redirects to home', async ({ page }) => {
    const link = page.locator(reviewsLinkSelector).first();
    await expect(link, 'Reviews menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', reviewsHref);

    await Promise.all([
      page.waitForURL(reviewsRedirectUrlPattern, { waitUntil: 'commit' }),
      link.evaluate((element: HTMLAnchorElement) => {
        element.click();
      }),
    ]);
  });

  test('sport schedule menu item navigates to the correct page', async ({ page }) => {
    const link = page.locator(sportScheduleLinkSelector).first();
    await expect(link, 'Sport schedule menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', sportScheduleHref);

    await Promise.all([
      page.waitForURL(sportScheduleUrl, { waitUntil: 'domcontentloaded' }),
      link.evaluate((element: HTMLAnchorElement) => {
        element.click();
      }),
    ]);
  });
  // proceed for next items
});
