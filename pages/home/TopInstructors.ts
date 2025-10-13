import { Page, Locator, expect } from "@playwright/test";

export default class TopInstructors {
  readonly page: Page;
  readonly sectionTitle: Locator;
  readonly instructorCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.locator(".instrutorContainer h6 a", {
      hasText: "Giảng viên hàng đầu",
    });
    this.instructorCards = page.locator(
      ".instrutorContainer .instrutorItem .instrutorContent"
    );
  }

  async verifyTitleVisible() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
  }

  async verifySectionReady() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
    const firstCard = this.instructorCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await this.verifySectionReady();
    await fn();
  }

  async verifyInstructorsVisible() {
    return this.withSectionReady(async () => {
      const count = await this.instructorCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = this.instructorCards.nth(i);
        await expect(card.locator("img")).toBeVisible();
        await expect(card.locator("h6")).toBeVisible();
        await expect(card.locator(".textReviewRole")).toBeVisible();
        await expect(card.locator(".reviewMentor")).toBeVisible();
        await expect(card.locator(".textReviewBot")).toBeVisible();
      }
    });
  }

  async verifyInstructorsUI() {
    return this.withSectionReady(async () => {
      const count = await this.instructorCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = this.instructorCards.nth(i);
        const img = card.locator("img");
        const h6 = card.locator("h6");
        const roleText = card.locator(".textReviewRole");

        // kiểm tra hiển thị, màu sắc, font-size, position có thể mở rộng
        await expect(img).toBeVisible();
        await expect(h6).toBeVisible();
        await expect(roleText).toBeVisible();
      }
    });
  }

  async verifyInstructorsFontSize() {
    return this.withSectionReady(async () => {
      const count = await this.instructorCards.count();
      for (let i = 0; i < count; i++) {
        const card = this.instructorCards.nth(i);
        const name = card.locator("h6");
        const role = card.locator(".textReviewRole p");

        const nameFontSize = parseFloat(
          await name.evaluate((el) => getComputedStyle(el).fontSize)
        );
        const roleFontSize = parseFloat(
          await role.first().evaluate((el) => getComputedStyle(el).fontSize)
        );

        expect(nameFontSize).toBeGreaterThan(roleFontSize); // tên giảng viên lớn hơn lĩnh vực
      }
    });
  }

  async verifyInstructorsSpacing() {
    return this.withSectionReady(async () => {
      const count = await this.instructorCards.count();
      for (let i = 0; i < count; i++) {
        const card = this.instructorCards.nth(i);
        const img = card.locator("img");
        const name = card.locator("h6");
        const role = card.locator(".textReviewRole");

        const imgBottom = await img.evaluate(
          (el) => el.getBoundingClientRect().bottom
        );
        const nameTop = await name.evaluate(
          (el) => el.getBoundingClientRect().top
        );
        const roleTop = await role.evaluate(
          (el) => el.getBoundingClientRect().top
        );

        expect(nameTop - imgBottom).toBeGreaterThan(0); // avatar cách tên > 0
        expect(roleTop - nameTop).toBeGreaterThan(0); // tên cách role > 0
      }
    });
  }

  async verifySliderButtonsVisible() {
    return this.withSectionReady(async () => {
      const leftButton = this.page.locator(".sliderDot .dotLeft label");
      const rightButton = this.page.locator(".sliderDot .dotRight label");
      await expect(leftButton).toBeVisible();
      await expect(rightButton).toBeVisible();
    });
  }

  async verifySliderButtonFunction() {
    return this.withSectionReady(async () => {
      const rightButton = this.page.locator(".sliderDot .dotRight label");
      const firstCard = this.instructorCards.first();

      // Lấy tên giảng viên đầu tiên
      const firstName = await firstCard.locator("h6").textContent();

      await rightButton.click();
      await this.page.waitForTimeout(500);

      const newFirstName = await this.instructorCards
        .first()
        .locator("h6")
        .textContent();
      expect(newFirstName).not.toBe(firstName);
    });
  }
}
