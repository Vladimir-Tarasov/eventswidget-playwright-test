import { test, expect } from './fixtures';
import { EventsWidgetPage } from './pages/events-widget.page';
import { gotoWidgetAndAssert } from './support/navigation';

test.describe('Header menu tests', () => {
  const newsUrlPattern = /^https:\/\/dev\.3snet\.info\/news\/?$/;
  const reviewsRedirectUrlPattern = /^https:\/\/dev\.3snet\.info\/(?:\?.*)?$/;
  const sportScheduleUrl = 'https://dev.3snet.info/sport-events-schedule/';

  test.beforeEach(async ({ page }) => {
    await gotoWidgetAndAssert(page);
  });

  test('news menu item navigates to the correct page', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    const link = widget.newsLink();
    await expect(link, 'News menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', '/news/');

    await Promise.all([
      page.waitForURL(newsUrlPattern, { waitUntil: 'commit' }),
      link.click(),
    ]);
  });

  test('reviews menu item points to /reviews/ and currently redirects to home', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    const link = widget.reviewsLink();
    await expect(link, 'Reviews menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', '/reviews/');

    await Promise.all([
      page.waitForURL(reviewsRedirectUrlPattern, { waitUntil: 'commit' }),
      link.click(),
    ]);
  });

  test('sport schedule menu item navigates to the correct page', async ({ page }) => {
    const widget = new EventsWidgetPage(page);
    const link = widget.sportScheduleLink();
    await expect(link, 'Sport schedule menu item should be visible').toBeVisible();
    await expect(link).toHaveAttribute('href', '/sport-events-schedule/');

    await Promise.all([
      page.waitForURL(sportScheduleUrl, { waitUntil: 'domcontentloaded' }),
      link.click(),
    ]);
  });
});
