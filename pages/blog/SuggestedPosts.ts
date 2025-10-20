import { expect, Page, Locator } from "@playwright/test";

export class SuggestedPosts {
  constructor(private page: Page) {}

  private section = this.page.locator(".blogRightBox").nth(1);

  async withSectionReady(fn: () => Promise<void>) {
    await expect(this.section).toBeVisible({ timeout: 10000 });
    return fn();
  }

  async verifyTitle() {
    return this.withSectionReady(async () => {
      const title = this.section.locator("> h6");

      await expect(title).toBeVisible({ timeout: 10000 });

      const text = await title.textContent();
      if (!text || text.trim() !== "Bài đăng được đề xuất") {
        throw new Error(
          `❌ Sai tiêu đề [Bài đăng được đề xuất], tìm thấy: "${text}"`
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

  async verifyPostsVisible() {
    return this.withSectionReady(async () => {
      const posts: Locator = this.section.locator(".postBlog");
      const count = await posts.count();
      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        await expect(posts.nth(i)).toBeVisible({ timeout: 10000 });
      }
    });
  }

  async verifyPostTitlesVisible() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();
      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        const title = posts.nth(i).locator("h6");
        await expect(title).toBeVisible({ timeout: 10000 });
      }
    });
  }

  async verifyPostTitlesUI() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      for (let i = 0; i < count; i++) {
        const title = posts.nth(i).locator("h6");
        await expect(title).toBeVisible();

        const style = await title.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            fontSize: s.fontSize,
            color: s.color,
          };
        });

        if (!style.fontSize || !style.color) {
          throw new Error(`❌ Bài đăng ${i} thiếu style cho tên bài viết`);
        }
      }
    });
  }

  async verifyPostTitlesLinks() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      for (let i = 0; i < count; i++) {
        const title = posts.nth(i).locator("h6");
        const link = title.locator("a");

        // Kiểm tra có thẻ <a> bọc hay không
        if ((await link.count()) === 0) {
          throw new Error(`❌ Bài đăng ${i} không có thẻ <a> cho tiêu đề`);
        }

        const href = await link.getAttribute("href");
        if (!href || href.trim() === "" || href === "#") {
          throw new Error(`❌ Bài đăng ${i} có href không hợp lệ: "${href}"`);
        }
      }
    });
  }

  async verifyPostDescriptionsVisible() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        const desc = posts.nth(i).locator("p.colorCardTitle");
        await expect(desc).toBeVisible({ timeout: 10000 });
      }
    });
  }

  async verifyPostDescriptionsUI() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        const title = posts.nth(i).locator("h6");
        const desc = posts.nth(i).locator("p.colorCardTitle");

        await expect(title).toBeVisible();
        await expect(desc).toBeVisible();

        // Lấy style của mô tả
        const style = await desc.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            fontSize: s.fontSize,
            color: s.color,
          };
        });

        if (!style.fontSize || !style.color) {
          throw new Error(`❌ Bài đăng ${i} thiếu style cho mô tả ngắn`);
        }

        // Lấy font-size để so sánh với tiêu đề
        const [titleSize, descSize] = await Promise.all([
          title.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
          desc.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
        ]);

        if (!(descSize < titleSize)) {
          throw new Error(
            `❌ Bài đăng ${i}: font-size của mô tả (${descSize}px) không nhỏ hơn tiêu đề (${titleSize}px)`
          );
        }
      }
    });
  }

  async verifyPostAuthorsVisible() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        const avatar = posts.nth(i).locator(".imgPost img");
        const authorName = posts.nth(i).locator(".imgPost span.colorCardTitle");

        await expect(avatar).toBeVisible({ timeout: 10000 });
        await expect(authorName).toBeVisible({ timeout: 10000 });

        const text = (await authorName.innerText()).trim();
        if (!text) {
          throw new Error(`❌ Bài đăng ${i} không có tên tác giả`);
        }
      }
    });
  }

  async verifyPostAuthorsUI() {
    return this.withSectionReady(async () => {
      const posts = this.section.locator(".postBlog");
      const count = await posts.count();

      if (count === 0) {
        throw new Error("❌ Không tìm thấy bài đăng nào trong phần đề xuất");
      }

      for (let i = 0; i < count; i++) {
        const authorName = posts.nth(i).locator(".imgPost span.colorCardTitle");
        await expect(authorName).toBeVisible();

        const style = await authorName.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            fontSize: s.fontSize,
            color: s.color,
          };
        });

        if (!style.fontSize || !style.color) {
          throw new Error(`❌ Bài đăng ${i} thiếu style cho tên tác giả`);
        }
      }
    });
  }
}
