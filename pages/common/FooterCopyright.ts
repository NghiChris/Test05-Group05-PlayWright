import { Page, Locator, expect } from "@playwright/test";

export default class FooterCopyright {
  readonly page: Page;
  readonly root: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("section.footerPages .extraFooter");
    this.copyrightText = this.root.locator(".textCardTitle p");
  }

  async verifyVisible() {
    await expect(this.root).toBeVisible({ timeout: 10000 });
    await expect(this.copyrightText).toBeVisible({ timeout: 10000 });
  }

  async verifyCenteredVertically() {
    const container = this.page.locator(".extraFooter");
    await container.scrollIntoViewIfNeeded();

    const titleWrapper = container.locator(".textCardTitle");
    const textP = titleWrapper.locator("p");

    const [titleWrapperBox, textPBox] = await Promise.all([
      titleWrapper.boundingBox(),
      textP.boundingBox(),
    ]);

    if (!titleWrapperBox || !textPBox) {
      throw new Error(
        "Không lấy được bounding box của các phần tử cần kiểm tra."
      );
    }

    // 🧮 Tính chiều cao & khoảng cách
    const containerHeight = titleWrapperBox.height;
    const textHeight = textPBox.height;
    const topSpacing = textPBox.y - titleWrapperBox.y;
    const bottomSpacing =
      titleWrapperBox.y +
      titleWrapperBox.height -
      (textPBox.y + textPBox.height);

    // ✅ Tính sai lệch dự kiến (tổng chênh / 2)
    const expectedMargin = (containerHeight - textHeight) / 2;
    const diffTop = Math.abs(topSpacing - expectedMargin);
    const diffBottom = Math.abs(bottomSpacing - expectedMargin);

    // ✅ Cho phép lệch trong phạm vi 1–2px quanh giá trị lý thuyết
    const tolerance = 1.5;
    expect(
      diffTop,
      `Thẻ <p> không canh giữa dọc (topSpacing=${topSpacing.toFixed(
        2
      )}px, expected=${expectedMargin.toFixed(2)}px)`
    ).toBeLessThanOrEqual(tolerance);

    expect(
      diffBottom,
      `Thẻ <p> không canh giữa dọc (bottomSpacing=${bottomSpacing.toFixed(
        2
      )}px, expected=${expectedMargin.toFixed(2)}px)`
    ).toBeLessThanOrEqual(tolerance);
  }
}
