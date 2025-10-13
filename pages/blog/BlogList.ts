import { Page, Locator, expect } from "@playwright/test";

export default class BlogList {
  readonly page: Page;
  readonly sectionTitle: Locator;
  readonly blogCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.locator(".titleCourse h3", { hasText: "Blog" });
    this.blogCards = page.locator(".blogItemLeft .cardBlog");
  }

  async verifyTitleVisible() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
  }

  async verifySectionReady() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
    await expect(this.blogCards.first()).toBeVisible({ timeout: 10000 });
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await this.verifySectionReady();
    await fn();
  }

  async verifyBlogListVisible() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);
    });
  }

  async verifyAllBlogImages() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const img = this.blogCards.nth(i).locator("img");
        await expect(img).toBeVisible();

        const src = await img.getAttribute("src");
        if (!src) throw new Error(`❌ Bài viết ${i}: không có image src`);

        const response = await this.page.request.get(src);
        expect(response.status()).toBe(200);
      }
    });
  }

  async verifyImageLinks() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const img = this.blogCards.nth(i).locator(".imgCardBlog img");
        await expect(img).toBeVisible();

        // Lấy thẻ cha trực tiếp
        const parentTag = await img.evaluate((el) => el.parentElement?.tagName);

        if (!parentTag || parentTag.toLowerCase() !== "a") {
          throw new Error(
            `❌ Bài viết ${i}: Ảnh không được bọc trực tiếp trong thẻ <a>`
          );
        }

        const href = await img.evaluate((el) =>
          el.parentElement?.getAttribute("href")
        );

        if (!href || href.trim() === "" || href === "#") {
          throw new Error(
            `❌ Bài viết ${i}: Thẻ <a> bọc ảnh có href không hợp lệ: "${href}"`
          );
        }
      }
    });
  }

  async verifyAllBlogTitles() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const title = this.blogCards.nth(i).locator("h6");
        await expect(title).toBeVisible({ timeout: 10000 });

        const text = await title.textContent();
        if (!text || text.trim() === "") {
          throw new Error(`❌ Bài viết ${i}: Không có tiêu đề`);
        }
      }
    });
  }

  async verifyBlogTitleLinks() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const title = this.blogCards.nth(i).locator("h6");
        await expect(title).toBeVisible();

        // Kiểm tra xem tiêu đề có nằm trong thẻ <a> không
        const parentTag = await title.evaluate(
          (el) => el.parentElement?.tagName
        );

        if (!parentTag || parentTag.toLowerCase() !== "a") {
          throw new Error(
            `❌ Bài viết ${i}: Tiêu đề không được bọc trong thẻ <a>`
          );
        }

        const href = await title.evaluate((el) =>
          el.parentElement?.getAttribute("href")
        );

        if (!href || href.trim() === "" || href === "#") {
          throw new Error(
            `❌ Bài viết ${i}: Thẻ <a> bọc tiêu đề có href không hợp lệ: "${href}"`
          );
        }
      }
    });
  }

  async verifyBlogLikes() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const likeSpan = this.blogCards
          .nth(i)
          .locator(".reviewBlog span")
          .first();

        await expect(likeSpan).toBeVisible({ timeout: 10000 });

        // Kiểm tra có icon like
        const hasIcon = await likeSpan.locator("i.far.fa-thumbs-up").count();
        if (hasIcon === 0) {
          throw new Error(`❌ Bài viết ${i}: Không có icon like`);
        }

        // Kiểm tra số lượt like hiển thị
        const text = await likeSpan.textContent();
        const number = text?.replace(/\D/g, "");
        if (!number || isNaN(Number(number))) {
          throw new Error(
            `❌ Bài viết ${i}: Không hiển thị số lượt like hợp lệ`
          );
        }
      }
    });
  }

  async verifyBlogComments() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const commentSpan = this.blogCards
          .nth(i)
          .locator(".reviewBlog span")
          .nth(1);

        await expect(commentSpan).toBeVisible({ timeout: 10000 });

        // Kiểm tra có icon bình luận
        const hasIcon = await commentSpan.locator("i.far.fa-comment").count();
        if (hasIcon === 0) {
          throw new Error(`❌ Bài viết ${i}: Không có icon bình luận`);
        }

        // Kiểm tra số bình luận hiển thị
        const text = await commentSpan.textContent();
        const number = text?.replace(/\D/g, "");
        if (!number || isNaN(Number(number))) {
          throw new Error(
            `❌ Bài viết ${i}: Không hiển thị số bình luận hợp lệ`
          );
        }
      }
    });
  }

  async verifyBlogViews() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const viewSpan = this.blogCards
          .nth(i)
          .locator(".reviewBlog span")
          .nth(2);

        await expect(viewSpan).toBeVisible({ timeout: 10000 });

        // Kiểm tra có icon lượt xem
        const hasIcon = await viewSpan.locator("i.fas.fa-eye").count();
        if (hasIcon === 0) {
          throw new Error(`❌ Bài viết ${i}: Không có icon lượt xem`);
        }

        // Kiểm tra số lượt xem hiển thị
        const text = await viewSpan.textContent();
        const number = text?.replace(/\D/g, "");
        if (!number || isNaN(Number(number))) {
          throw new Error(
            `❌ Bài viết ${i}: Không hiển thị số lượt xem hợp lệ`
          );
        }
      }
    });
  }

  async verifyBlogAuthors() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const author = this.blogCards.nth(i).locator(".timeBlogCourse p span");

        await expect(author).toBeVisible({ timeout: 10000 });

        const text = await author.textContent();
        if (!text || text.trim() === "") {
          throw new Error(`❌ Bài viết ${i}: Không hiển thị tên tác giả`);
        }
      }
    });
  }

  async verifyBlogAuthorUI() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const author = this.blogCards.nth(i).locator(".timeBlogCourse p span");
        await expect(author).toBeVisible();

        const styles = await author.evaluate((el) => {
          const cs = window.getComputedStyle(el);
          return {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            color: cs.color,
          };
        });

        expect(styles.fontFamily.toLowerCase()).toContain("roboto");
        expect(styles.fontSize).toBe("16px");
        expect(styles.color).toBe("rgb(237, 133, 171)");
      }
    });
  }

  async verifyBlogDescriptions() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const description = this.blogCards.nth(i).locator(".colorCardTitle");

        await expect(description).toBeVisible({ timeout: 10000 });

        const text = await description.textContent();
        if (!text || text.trim() === "") {
          throw new Error(`❌ Bài viết ${i}: Không hiển thị mô tả ngắn`);
        }
      }
    });
  }

  async verifyBlogDescriptionUI() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const description = this.blogCards.nth(i).locator(".colorCardTitle");

        await expect(description).toBeVisible({ timeout: 10000 });

        const fontFamily = await description.evaluate(
          (el) => getComputedStyle(el).fontFamily
        );
        const fontSize = await description.evaluate(
          (el) => getComputedStyle(el).fontSize
        );
        const color = await description.evaluate(
          (el) => getComputedStyle(el).color
        );

        if (!fontFamily.includes("Roboto")) {
          throw new Error(
            `❌ Bài viết ${i}: Font mô tả không đúng (thấy: ${fontFamily})`
          );
        }
        if (fontSize !== "16px") {
          throw new Error(
            `❌ Bài viết ${i}: Kích thước chữ mô tả không đúng (thấy: ${fontSize})`
          );
        }
        if (color !== "rgb(140, 140, 140)") {
          throw new Error(
            `❌ Bài viết ${i}: Màu chữ mô tả không đúng (thấy: ${color})`
          );
        }
      }
    });
  }

  async verifyBlogReadMoreButtons() {
    return this.withSectionReady(async () => {
      const count = await this.blogCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const readMoreBtn = this.blogCards.nth(i).locator(".btnCardBlog a");

        await expect(readMoreBtn).toBeVisible({ timeout: 10000 });

        const text = await readMoreBtn.textContent();
        if (!text || !text.toLowerCase().includes("xem thêm")) {
          throw new Error(
            `❌ Bài viết ${i}: Không hiển thị đúng nút [Xem thêm]`
          );
        }
      }
    });
  }

  async verifyBlogReadMoreButtonsUI() {
    return this.withSectionReady(async () => {
      const readMoreBtns = this.page.locator(".btnCardBlog a");

      const count = await readMoreBtns.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const btn = readMoreBtns.nth(i);

        await expect(btn).toHaveText(/xem thêm/i);

        const fontSize = await btn.evaluate(
          (el) => getComputedStyle(el).fontSize
        );
        expect(fontSize).toBe("15px");

        const color = await btn.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe("rgb(255, 255, 255)");

        const fontFamily = await btn.evaluate(
          (el) => getComputedStyle(el).fontFamily
        );
        expect(fontFamily.toLowerCase()).toContain("roboto");

        const btnBox = await btn.boundingBox();
        const desc = await this.page
          .locator(".colorCardTitle")
          .nth(i)
          .boundingBox();
        expect(btnBox!.y).toBeGreaterThan(desc!.y);
      }
    });
  }

  async verifyBlogReadMoreLinks() {
    return this.withSectionReady(async () => {
      const readMoreBtns = this.page.locator(".btnCardBlog a");
      const count = await readMoreBtns.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const btn = readMoreBtns.nth(i);

        await expect(btn).toBeVisible();

        const href = await btn.getAttribute("href");
        if (!href || href.trim() === "" || href === "#") {
          throw new Error(
            `❌ Bài viết ${i}: Nút [Xem Thêm] không có link hợp lệ`
          );
        }
      }
    });
  }
}
