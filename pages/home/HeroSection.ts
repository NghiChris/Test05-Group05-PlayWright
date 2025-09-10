import { Page } from '@playwright/test';

export class HeroSection {
  constructor(private page: Page) {}

  async getTitle() {
    return this.page.textContent('.hero h1');
  }
}
