import { Page, Locator, expect } from "@playwright/test";

export default class PopularCourse {
  readonly page: Page;
  readonly sectionTitle: Locator;
  readonly courseCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.locator(".coursesHome h6 a", {
      hasText: "Khóa học phổ biến",
    });
  }

  async verifyTitleVisible() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
  }

  async verifySectionReady() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
    const firstCardFooter = this.page
      .locator(".row.mt-4 .cardGlobalRes .cardFooter")
      .first();
    await expect(firstCardFooter).toBeVisible({ timeout: 10000 });
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await this.verifySectionReady();
    await fn();
  }

  async verifyTitleLink() {
    return this.withSectionReady(async () => {
      const href = await this.sectionTitle.getAttribute("href");
      expect(href).not.toBeNull();
      expect(href).not.toBe("");
    });
  }

  async verifyCoursesDisplayed() {
    return this.withSectionReady(async () => {
      const courses = this.page.locator(".homePage .row.mt-4 .cardGlobalRes");
      await expect(courses.first()).toBeVisible({ timeout: 10000 });
      const count = await courses.count();
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(10);
    });
  }

  async verifyCourseImages() {
    return this.withSectionReady(async () => {
      const courseImages = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes img"
      );
      await expect(courseImages.first()).toBeVisible({ timeout: 10000 });
      const count = await courseImages.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const img = courseImages.nth(i);
        await expect(img).toBeVisible();
        const src = await img.getAttribute("src");
        expect(src).not.toBeNull();
        expect(src).not.toEqual("");

        // Check link ảnh
        const response = await this.page.request.get(src!);
        expect(response.status()).toBe(200);
      }
    });
  }

  async verifyCourseTitles() {
    return this.withSectionReady(async () => {
      const titles = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes .cardBodyGlobal h6"
      );
      await expect(titles.first()).toBeVisible({ timeout: 10000 });

      const count = await titles.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const title = titles.nth(i);
        await expect(title).toBeVisible();

        const text = await title.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        const fontSize = await title.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14);

        const color = await title.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");
      }
    });
  }

  async verifyCourseCategories() {
    return this.withSectionReady(async () => {
      const categories = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes .stikerCard"
      );

      const count = await categories.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const category = categories.nth(i);
        await expect(category).toBeVisible();

        const text = await category.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        const fontSize = await category.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThan(0);

        const color = await category.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");

        const overflow = await category.evaluate(
          (el) => window.getComputedStyle(el).overflow
        );
        expect(overflow).toBe("hidden");

        const textOverflow = await category.evaluate(
          (el) => window.getComputedStyle(el).textOverflow
        );
        expect(textOverflow).toBe("ellipsis");
      }
    });
  }

  async verifyCourseTeachers() {
    return this.withSectionReady(async () => {
      const teacherBlocks = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes .titleMaker"
      );

      const count = await teacherBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const teacherBlock = teacherBlocks.nth(i);

        // Avatar
        const avatar = teacherBlock.locator("img");
        await expect(avatar).toBeVisible();
        const avatarSrc = await avatar.getAttribute("src");
        expect(avatarSrc).not.toBeNull();
        expect(avatarSrc).not.toEqual("");

        // Tên giáo viên
        const teacherName = teacherBlock.locator(".colorCardTitle");
        await expect(teacherName).toBeVisible();

        const text = await teacherName.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        // Font-size
        const fontSize = await teacherName.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThan(0);

        // Color
        const color = await teacherName.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");
      }
    });
  }

  async verifyCoursePrices() {
    return this.withSectionReady(async () => {
      const priceBlocks = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes .cardFooter div:first-child"
      );

      const count = await priceBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const block = priceBlocks.nth(i);

        // Giá cũ (bắt buộc, gạch ngang, font nhỏ hơn)
        const oldPrice = block.locator("p").nth(0);
        await expect(oldPrice).toBeVisible();
        const oldText = await oldPrice.textContent();
        expect(oldText?.trim().length).toBeGreaterThan(0);

        const oldStyle = await oldPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            textDecoration: s.textDecorationLine,
            fontSize: parseFloat(s.fontSize),
            color: s.color,
          };
        });
        expect(oldStyle.textDecoration).toContain("line-through");
        expect(oldStyle.fontSize).toBeLessThan(16);
        expect(oldStyle.color).not.toBe("");

        // Giá mới
        const newPrice = block.locator("p").nth(1);
        await expect(newPrice).toBeVisible();
        const newText = await newPrice.textContent();
        expect(newText?.trim().length).toBeGreaterThan(0);

        const newStyle = await newPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            fontWeight: s.fontWeight,
            color: s.color,
          };
        });
        expect(Number(newStyle.fontWeight)).toBeGreaterThanOrEqual(500);
        expect(newStyle.color).not.toBe("");
      }
    });
  }

  async verifyCourseOldAndNewPrices() {
    return this.withSectionReady(async () => {
      const priceBlocks = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes .cardFooter div:first-child"
      );
      const count = await priceBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const block = priceBlocks.nth(i);

        // Giá cũ
        const oldPrice = block.locator("p").nth(0);
        await expect(oldPrice).toBeVisible();
        const oldText = await oldPrice.textContent();
        expect(oldText?.trim().length).toBeGreaterThan(0);

        const oldStyle = await oldPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            textDecoration: s.textDecorationLine,
            fontSize: parseFloat(s.fontSize),
            color: s.color,
          };
        });
        expect(oldStyle.textDecoration).toContain("line-through");
        expect(oldStyle.fontSize).toBeLessThan(16);
        expect(oldStyle.color).not.toBe("");

        // Giá mới
        const newPrice = block.locator("p").nth(1);
        await expect(newPrice).toBeVisible();
        const newText = await newPrice.textContent();
        expect(newText?.trim().length).toBeGreaterThan(0);

        const newStyle = await newPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            fontWeight: s.fontWeight,
            color: s.color,
          };
        });
        expect(Number(newStyle.fontWeight)).toBeGreaterThanOrEqual(500);
        expect(newStyle.color).not.toBe("");
      }
    });
  }

  async verifyCourseRatings() {
    return this.withSectionReady(async () => {
      const courseCards = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes"
      );
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);
        const ratingValue = card.locator(".cardFooter span.textStar");
        await expect(ratingValue).toBeVisible();
        const ratingText = await ratingValue.textContent();
        expect(ratingText?.trim().length).toBeGreaterThan(0);
      }
    });
  }

  async verifyCourseReviewCounts() {
    return this.withSectionReady(async () => {
      const courseCards = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes"
      );
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        const reviewCount = card.locator(".cardFooter span.colorCardTitle");
        await expect(reviewCount).toBeVisible();
        const reviewText = await reviewCount.textContent();
        expect(reviewText?.trim().length).toBeGreaterThan(0);

        // Style
        const fontSize = await reviewCount.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThan(0);

        const color = await reviewCount.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");
      }
    });
  }

  async verifyCourseLinks() {
    return this.withSectionReady(async () => {
      const courseCards = this.page.locator(
        ".homePage .row.mt-4 .cardGlobalRes"
      );
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      const courseTitles: string[] = [];

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);
        const link = card.locator("a");

        const href = await link.getAttribute("href");
        expect(href).toBeTruthy();

        // Check đúng format
        expect(href).toMatch(/^\/chitiet/);

        // Lấy title trong card
        const titleText =
          (await link.locator(".cardBodyGlobal h6").textContent())?.trim() ||
          "";
        courseTitles.push(titleText);

        await Promise.all([
          this.page.waitForLoadState("domcontentloaded"),
          link.click(),
        ]);

        // Không phải 404
        const error404 = this.page.locator(".content404");
        await expect(error404).toHaveCount(0);

        // Quay lại home
        await this.page.goto("/");
      }

      // Check không bị trùng title
      const uniqueTitles = new Set(courseTitles);
      expect(uniqueTitles.size).toBe(courseTitles.length);
    });
  }
}
