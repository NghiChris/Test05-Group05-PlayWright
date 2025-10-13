import { test, expect, Locator, Page } from "@playwright/test";

export default class FooterSocials {
  readonly page: Page;
  readonly root: Locator;
  readonly icons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator(".extraFooter .divGlobal");
    this.icons = this.root.locator("i.iconFooter");
  }

  async verifyVisible() {
    await expect(this.root).toBeVisible({ timeout: 10000 });
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

  async verifyIconsCount(expectedCount: number) {
    const count = await this.icons.count();
    expect(count).toBe(expectedCount);
  }

  async verifyIconsStyle() {
    const count = await this.icons.count();
    for (let i = 0; i < count; i++) {
      const icon = this.icons.nth(i);

      // Kiểm tra hiển thị
      await expect(icon).toBeVisible({ timeout: 5000 });

      // Kiểm tra màu sắc
      const color = await icon.evaluate((el) => getComputedStyle(el).color);
      expect(color).toBe("rgb(255, 255, 255)");

      // Kiểm tra kích thước icon (width = height)
      const box = await icon.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
      expect(box?.width).toBeCloseTo(box?.height, 1);
    }
  }

  async verifyIconsSpacing(expectedSpacing: number) {
    const count = await this.icons.count();
    for (let i = 0; i < count - 1; i++) {
      const box1 = await this.icons.nth(i).boundingBox();
      const box2 = await this.icons.nth(i + 1).boundingBox();
      if (!box1 || !box2) throw new Error("Không lấy được bounding box icon");
      const spacing = box2.x - (box1.x + box1.width);
      expect(spacing).toBeCloseTo(expectedSpacing, 1);
    }
  }

  async verifyIconsLinks() {
    const count = await this.icons.count();

    for (let i = 0; i < count; i++) {
      const icon = this.icons.nth(i);
      const parentLinkHandle = await icon.evaluateHandle((el) =>
        el.closest("a")
      );
      const href = parentLinkHandle
        ? await parentLinkHandle.evaluate((el: any) => el.getAttribute("href"))
        : null;

      expect(href).not.toBeNull();
      expect(href).not.toBe("");
    }
  }
}
