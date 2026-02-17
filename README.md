# eventswidget-playwright-test

Playwright-based UI test project for:

- https://dev.3snet.info/eventswidget/

## What is covered

- `smoke.spec.ts`
- Main page opens successfully.
- Widget page renders visible content in the DOM.
- No browser `pageerror` is thrown during initial load.

- `header.spec.ts`
- Header is visible on the widget page.

- `header-menu.spec.ts`
- Header menu links are present and validated (`/news/`, `/reviews/`, `/sport-events-schedule/`).
- Navigation checks are covered for news, reviews redirect behavior, and sport schedule (`https://dev.3snet.info/sport-events-schedule/`).

- `constructor.spec.ts`
- Constructor fields exist (`type`, `country`, `width`, `height`, preview area, color/theme step).
- Constructor filter behavior is covered:
  - select type/country options
  - clear selected options
  - verify active clear state for type filter
- Generate preview button in constructor preview area is present.

- `constructor-behavior.spec.ts`
- Clicking the constructor preview button (`button.button.green-bg.fw-bold.text-md`) generates iframe preview.
- Iframe appearance is validated via `iframe[id="3snet-frame"]`.
- Generated iframe HTML is validated against the generated code text in `textarea#code`.

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

3. Run test(s):

```bash
npm test
```

Run a single spec:

```bash
npx playwright test tests/constructor-behavior.spec.ts
```

4. Run in headed mode (visible browser):

```bash
npm run test:headed
```

5. Run with Playwright UI mode:

```bash
npm run test:ui
```

6. Optional: open HTML report:

```bash
npm run report
```

## Notes

- Tests prefer stable, scoped locators (for example, container-scoped button locators and explicit `id`/`href` assertions).
- Constructor preview iframe selector uses attribute syntax (`iframe[id="3snet-frame"]`) because CSS `#3snet-frame` is invalid for ids starting with a digit.
