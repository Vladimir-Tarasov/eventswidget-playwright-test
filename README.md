# eventswidget-playwright-test

Playwright-based UI test project for `https://dev.3snet.info/eventswidget/`.

## Project architecture

The suite uses Playwright's standard fixture model from `@playwright/test` and a shared test layer:

- `tests/fixtures.ts`: re-exports standard `test` and `expect` (no custom browser/page lifecycle override).
- `tests/support/navigation.ts`: shared navigation/assertion helper for widget entry.
- `tests/pages/events-widget.page.ts`: page object with reusable locators and actions.
- `tests/*.spec.ts`: test intent and assertions only.

This keeps setup logic centralized and makes the suite easier to extend with new specs without copy/pasting navigation and locator code.

## Test structure

### Specs

- `tests/smoke.spec.ts`: page load and core widget visibility checks.
- `tests/header.spec.ts`: header presence checks.
- `tests/header-menu.spec.ts`: top-menu link presence and navigation behavior.
- `tests/constructor.spec.ts`: constructor field presence and filter interactions.
- `tests/constructor-behavior.spec.ts`: preview-generation behavior and generated iframe/code consistency.

### Locator strategy

- Prefer `getByRole(...)` for interactive UI where accessible roles/names are available.
- Prefer `getByTestId(...)` for stable test hooks.
- `testIdAttribute` is configured as `data-name` in `playwright.config.ts`, so existing `data-name` attributes are used as test ids.
- Native Playwright actions are used (`click()`), and direct DOM click via `evaluate(...)` is avoided.

## Tech stack

- Node.js
- Playwright Test
- TypeScript test files

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browser(s):

```bash
npx playwright install
```

3. Run the full suite:

```bash
npm test
```

4. Run a single spec:

```bash
npx playwright test tests/constructor-behavior.spec.ts
```

5. Run in headed mode:

```bash
npm run test:headed
```

6. Run in Playwright UI mode:

```bash
npm run test:ui
```

7. Open HTML report:

```bash
npm run report
```

## Result output format

The run produces multiple reporter outputs:

- Console list reporter for quick local feedback.
- HTML report at `playwright-report/index.html` for human-readable debugging.
- JSON report at `test-results/results.json` for CI parsing/integrations.
- JUnit report at `test-results/results.xml` for CI test summary views.

Minimum expected run summary:

- Total tests, passed, failed, skipped.
- Failed test titles and error messages.
- Trace/artifact availability for retried/failed tests (configured via `trace: 'on-first-retry'`).
