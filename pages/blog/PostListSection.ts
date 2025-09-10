import { Page } from '@playwright/test';

export class PostListSection {
  constructor(private page: Page) {}

  async getPostTitles() {
    return this.page.locator('.post-title').allTextContents();
  }
}
