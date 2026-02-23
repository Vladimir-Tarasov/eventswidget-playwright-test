import { type Locator, type Page } from '@playwright/test';

export class EventsWidgetPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  navigation(): Locator {
    return this.page.getByRole('navigation').first();
  }

  headerMenuLink(name: RegExp): Locator {
    return this.navigation().getByRole('link', { name }).first();
  }

  newsLink(): Locator {
    return this.headerMenuLink(/^news$/i);
  }

  reviewsLink(): Locator {
    return this.headerMenuLink(/^reviews$/i);
  }

  sportScheduleLink(): Locator {
    return this.headerMenuLink(/sport.*schedule/i);
  }

  constructorSection(): Locator {
    return this.page.locator('.constructor').first();
  }

  constructorPreviewSection(): Locator {
    return this.page.locator('.constructor__preview').first();
  }

  generatePreviewButton(): Locator {
    return this.constructorPreviewSection().getByRole('button').first();
  }

  widthInput(): Locator {
    return this.page.getByRole('spinbutton', { name: /width/i }).first();
  }

  heightInput(): Locator {
    return this.page.getByRole('spinbutton', { name: /height/i }).first();
  }

  typeField(): Locator {
    return this.page.getByTestId('type').first();
  }

  countryField(): Locator {
    return this.page.getByTestId('country').first();
  }
}
