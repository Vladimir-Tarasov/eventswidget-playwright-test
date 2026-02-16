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
npm.cmd install
```

2. Install Playwright browser(s):

```bash
npx.cmd playwright install
```

3. Run test(s):

```bash
npm.cmd test
```

4. Optional: open HTML report:

```bash
npm.cmd run report
```

## Notes

- If PowerShell execution policy blocks `npm`, use `npm.cmd` and `npx.cmd` commands.
- The test intentionally keeps selectors generic to stay resilient if widget internals change.
