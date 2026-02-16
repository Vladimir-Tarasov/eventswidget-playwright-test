import { test as base, expect, type Page } from '@playwright/test';

export const test = base.extend<{ page: Page }>({
  page: async ({ playwright, browserName }, use, testInfo) => {
    const projectUse = testInfo.project.use as {
      headless?: boolean;
      viewport?: { width: number; height: number } | null;
    };

    const browser = await playwright[browserName].launch({
      headless: projectUse.headless,
    });

    const context = await browser.newContext({
      viewport: projectUse.viewport ?? undefined,
    });

    const page = await context.newPage();
    await use(page);

    await context.close();
    await browser.close();
  },
});

export { expect };
