import { Page, Locator, expect } from "@playwright/test";

export default class Footer {
  readonly page: Page;
  readonly root: Locator;
  readonly logo: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly address: Locator;
  readonly menus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("section.footerPages");
    this.logo = this.root.locator(".textLogo");
    this.phone = this.root.locator(".menuFooter li").filter({ hasText: "1800" });
    this.email = this.root.locator(".menuFooter li").filter({ hasText: "@gmail.com" });
    this.address = this.root.locator(".menuFooter li").filter({ hasText: "Đà Nẵng" });
    this.menus = this.root.locator("h3.textFooterTitle + ul.menuFooter li");
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await expect(this.root).toBeVisible({ timeout: 10000 });
    await fn();
  }

  async verifyVisible(locator: Locator) {
    await this.withSectionReady(async () => {
      await expect(locator).toBeVisible({ timeout: 10000 });
    });
  }

  async verifyHasLink(locator: Locator, expectedHref: string) {
    await this.withSectionReady(async () => {
      const href = await locator.getAttribute("href");
      expect(href).not.toBeNull();
      if (expectedHref) expect(href).toBe(expectedHref);
    });
  }

  async verifyPhoneLink(locator: Locator) {
    await this.withSectionReady(async () => {
      const href = await locator.locator("a").getAttribute("href");
      expect(href).toMatch(/^tel:/);
    });
  }

  async verifyEmailLink(locator: Locator) {
    await this.withSectionReady(async () => {
      const href = await locator.locator("a").getAttribute("href");
      expect(href).toMatch(/^mailto:/);
    });
  }

  async getMenus(): Promise<Locator[]> {
    await this.withSectionReady(async () => {});
    return this.menus.all();
  }
}
