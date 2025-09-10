import { Page } from '@playwright/test';

export class Header {
  constructor(private page: Page) {}

  async clickLogo() {
    await this.page.click('header a.logo');
  }

  async navigateTo(menu: string) {
    await this.page.click(`header >> text=${menu}`);
  }
}