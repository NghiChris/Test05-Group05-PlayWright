import { Page, Locator, expect } from "@playwright/test";

export default class Statistic {
  readonly page: Page;
  readonly section: Locator;
  readonly stats: Locator;

  constructor(page: Page) {
    this.page = page;
    this.section = page.locator(".boxNumberContainer.mt-5").first();
    this.stats = this.section.locator(".boxNumber");
  }

  async verifyVisible() {
    // Kiểm tra toàn bộ block hiển thị
    await expect(this.section).toBeVisible({ timeout: 10000 });

    // Kiểm tra có đủ 4 box thống kê
    const stats = this.section.locator(".boxNumber");
    await expect(stats).toHaveCount(4);

    // Kiểm tra từng box hiển thị
    for (let i = 0; i < 4; i++) {
      const stat = stats.nth(i);
      await expect(stat).toBeVisible();

      // Icon
      await expect(stat.locator("img.imgIcon")).toBeVisible();

      // Số liệu
      const number = stat.locator(".textNumber span");
      await expect(number).toBeVisible();
      const value = await number.textContent();
      expect(value).not.toBeNull();
      expect(value!.trim()).not.toEqual("");

      // Tiêu đề
      const title = stat.locator(".textNumberTitle");
      await expect(title).toBeVisible();
    }
  }

  async verifyUI() {
    await this.verifyVisible();

    const expectedTitles = ["Học viên", "Khóa học", "Giờ học", "Giảng viên"];
    const count = await this.stats.count();

    for (let i = 0; i < count; i++) {
      const stat = this.stats.nth(i);

      // Icon
      const icon = stat.locator("img.imgIcon");
      await expect(icon).toBeVisible();

      // Number
      const number = stat.locator(".textNumber span");
      await expect(number).toBeVisible();

      // Font size
      const fontSize = await number.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      expect(fontSize).toBeGreaterThan(40);

      // Title phải đúng
      const title = stat.locator(".textNumberTitle");
      await expect(title).toBeVisible();
      await expect(title).toHaveText(expectedTitles[i]);
    }
  }
}
