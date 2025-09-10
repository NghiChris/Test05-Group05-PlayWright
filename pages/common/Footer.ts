import { Page } from '@playwright/test';

export class Footer {
  constructor(private page: Page) {}

  async clickLink(linkText: string) {
    await this.page.click(`footer >> text=${linkText}`);
  }
}