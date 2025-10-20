import { Page, Locator, expect } from "@playwright/test";

export default class StudentReview {
  readonly page: Page;
  readonly reviewCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reviewCards = page.locator(".reviewStudent");
  }

  async verifySectionReady() {
    const firstCard = this.reviewCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await this.verifySectionReady();
    await fn();
  }

  async verifyReviewsVisible() {
    return this.withSectionReady(async () => {
      const count = await this.reviewCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        await expect(this.reviewCards.nth(i)).toBeVisible();
      }
    });
  }

  async verifyReviewsUI() {
    return this.withSectionReady(async () => {
      const count = await this.reviewCards.count();

      for (let i = 0; i < count; i++) {
        const card = this.reviewCards.nth(i);

        const textQuote = card.locator(".textQoute q");
        const studentName = card.locator("p");
        const studentRole = card.locator("span");

        // Kiểm tra hiển thị
        await expect(textQuote).toBeVisible();
        await expect(studentName).toBeVisible();
        await expect(studentRole).toBeVisible();

        // Kiểm tra font size
        const quoteFontSize = parseFloat(await textQuote.evaluate(el => getComputedStyle(el).fontSize));
        const nameFontSize = parseFloat(await studentName.evaluate(el => getComputedStyle(el).fontSize));
        const roleFontSize = parseFloat(await studentRole.evaluate(el => getComputedStyle(el).fontSize));

        expect(quoteFontSize).toBeGreaterThan(12);
        expect(nameFontSize).toBeGreaterThan(12);
        expect(roleFontSize).toBeGreaterThan(10);

        // Kiểm tra alignment của quote
        const textAlign = await textQuote.evaluate(el => getComputedStyle(el).textAlign);
        expect(textAlign).toBe("left");
      }
    });
  }
}
