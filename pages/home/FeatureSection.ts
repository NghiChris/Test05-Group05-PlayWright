import { Page } from '@playwright/test';

export class FeatureSection {
  constructor(private page: Page) {}

  async getFeatures() {
    return this.page.locator('.feature-item').allTextContents();
  }
}
