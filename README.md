# eventswidget-playwright-test

Playwright-based UI smoke test project for:

- https://dev.3snet.info/eventswidget/

## What is covered

- Main page opens successfully.
- Widget page renders visible content in the DOM.
- No browser `pageerror` is thrown during initial load.

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

- The test intentionally keeps selectors generic to stay resilient if widget internals change.
