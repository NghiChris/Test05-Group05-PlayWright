import { Page, Locator, expect } from "@playwright/test";

export default class BackToTop {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("btn.backTop");
  }

  /** Scroll xuống 1 đoạn để button hiện ra */
  async scrollIntoView() {
    await this.page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" });
    });
    // Chờ button hiện ra
    await this.root.waitFor({ state: "visible", timeout: 5000 });
  }

  async verifyVisible() {
    await this.scrollIntoView();
    await expect(this.root).toBeVisible();
  }

  async verifyUI() {
    await this.scrollIntoView();
    const box = await this.root.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.x + box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  }

  async clickAndVerifyScrollTop() {
    await this.scrollIntoView();
    await this.root.click();
    await this.page.waitForTimeout(5000);
    const scrollY = await this.page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  }
}
