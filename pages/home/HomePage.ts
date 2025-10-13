import { Page, expect } from "@playwright/test";

export default class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Truy cập trang chủ */
  async gotoHome() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  /** Verify trang chủ đã load */
  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/V Learning|Cybersoft/i, { timeout: 10000 });
  }

  /** Scroll từ top xuống bottom để kiểm tra tổng thể giao diện */
  async scrollThroughPage() {
    const scrollStep = 200;
    const scrollDelay = 100;
    let previousHeight = 0;

    while (true) {
      const currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight) break; // đã scroll tới cuối
      previousHeight = currentHeight;
      await this.page.evaluate((step) => window.scrollBy(0, step), scrollStep);
      await this.page.waitForTimeout(scrollDelay);
    }

    const lastElement = this.page.locator(".footerPages");
    await expect(lastElement).toBeVisible();
  }
}
