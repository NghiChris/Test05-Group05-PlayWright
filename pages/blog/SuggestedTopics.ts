import { expect, Page } from "@playwright/test";

export class SuggestedTopics {
  constructor(private page: Page) {}

  private section = this.page.locator(".blogRightBox").nth(0);

  async withSectionReady(fn: () => Promise<void>) {
    await expect(this.section).toBeVisible({ timeout: 10000 });
    return fn();
  }

  async verifyTitle() {
    return this.withSectionReady(async () => {
      const title = this.section.locator("> h6");

      await expect(title).toBeVisible({ timeout: 10000 });

      const text = await title.textContent();
      if (!text || text.trim() !== "Các chủ đề được đề xuất") {
        throw new Error(
          `❌ Sai tiêu đề [Các chủ đề được đề xuất], tìm thấy: "${text}"`
        );
      }
    });
  }

  async verifyTitleUI() {
    return this.withSectionReady(async () => {
      const title = this.section.locator("> h6");

      await expect(title).toBeVisible({ timeout: 10000 });

      // Font size
      const fontSize = await title.evaluate(
        (el) => getComputedStyle(el).fontSize
      );
      if (fontSize !== "16px") {
        throw new Error(`❌ Font size sai, tìm thấy: ${fontSize}`);
      }

      // Màu sắc
      const color = await title.evaluate((el) => getComputedStyle(el).color);
      if (color !== "rgb(37, 37, 37)") {
        throw new Error(`❌ Màu sắc sai, tìm thấy: ${color}`);
      }

      // Font family
      const fontFamily = await title.evaluate(
        (el) => getComputedStyle(el).fontFamily
      );
      if (!fontFamily.toLowerCase().includes("roboto")) {
        throw new Error(`❌ Font không đúng, tìm thấy: ${fontFamily}`);
      }
    });
  }

  async verifyTopicsListVisible() {
    return this.withSectionReady(async () => {
      const topics = this.section.locator("ul li a");
      const count = await topics.count();
      if (count === 0) {
        throw new Error("❌ Không tìm thấy bất kỳ chủ đề nào trong danh sách.");
      }

      for (let i = 0; i < count; i++) {
        const topic = topics.nth(i);
        await expect(topic).toBeVisible({ timeout: 10000 });
        const text = await topic.textContent();
        if (!text || text.trim() === "") {
          throw new Error(`❌ Chủ đề thứ ${i} không có text hiển thị.`);
        }
      }
    });
  }

  async verifyTopicsListUI() {
    return this.withSectionReady(async () => {
      const topics = this.section.locator("ul li a");
      const count = await topics.count();
      if (count === 0) {
        throw new Error("❌ Không tìm thấy bất kỳ chủ đề nào trong danh sách.");
      }

      for (let i = 0; i < count; i++) {
        const topic = topics.nth(i);
        await expect(topic).toBeVisible({ timeout: 10000 });

        // Font size
        const fontSize = await topic.evaluate(
          (el) => getComputedStyle(el).fontSize
        );
        if (fontSize !== "16px") {
          throw new Error(`❌ Font size sai, tìm thấy: ${fontSize}`);
        }

        // Màu sắc
        const color = await topic.evaluate((el) => getComputedStyle(el).color);
        if (color !== "rgb(140, 140, 140)") {
          throw new Error(`❌ Màu sắc sai, tìm thấy: ${color}`);
        }

        // Font family
        const fontFamily = await topic.evaluate(
          (el) => getComputedStyle(el).fontFamily
        );
        if (!fontFamily.toLowerCase().includes("roboto")) {
          throw new Error(`❌ Font không đúng, tìm thấy: ${fontFamily}`);
        }
      }
    });
  }

  async verifyTopicsLinks() {
    return this.withSectionReady(async () => {
      const topics = this.section.locator("ul li a");
      const count = await topics.count();
      if (count === 0) {
        throw new Error("❌ Không tìm thấy bất kỳ chủ đề nào trong danh sách.");
      }

      for (let i = 0; i < count; i++) {
        const topic = topics.nth(i);
        await expect(topic).toBeVisible({ timeout: 10000 });

        const href = await topic.getAttribute("href");
        if (!href || href.trim() === "" || href === "#") {
          throw new Error(
            `❌ Chủ đề ${i} không có liên kết hợp lệ (href="${href}")`
          );
        }

        // Kiểm tra cursor pointer khi hover
        const cursor = await topic.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.cursor;
        });
        if (cursor !== "pointer") {
          throw new Error(
            `❌ Chủ đề ${i} hover không có cursor pointer, hiện tại là "${cursor}"`
          );
        }
      }
    });
  }
}
