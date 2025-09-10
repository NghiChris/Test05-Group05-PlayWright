import { Page } from '@playwright/test';

export class SidebarSection {
  constructor(private page: Page) {}

  async clickCategory(category: string) {
    await this.page.click(`.sidebar >> text=${category}`);
  }
}
