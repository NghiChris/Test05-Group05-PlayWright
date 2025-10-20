import { Page, Locator, expect } from "@playwright/test";

export default class CourseInfo {
  readonly page: Page;
  readonly courseSection: Locator;
  readonly roadmapSection: Locator;
  readonly systemSection: Locator;
  readonly instructorSection: Locator;
  readonly certificateSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseSection = page.locator(
      ".infoCourseHome h3:has-text('Khóa học')"
    );
    this.roadmapSection = page.locator(
      ".infoCourseHome h3:has-text('Lộ trình phù hợp')"
    );
    this.systemSection = page.locator(
      ".infoCourseHome h3:has-text('Hệ thống học tập')"
    );
    this.instructorSection = page.locator(
      ".infoCourseHome h3:has-text('Giảng viên')"
    );
    this.certificateSection = page.locator(
      ".infoCourseHome h3:has-text('Chứng nhận')"
    );
  }

  async verifyAllSectionsVisible() {
    await expect(this.courseSection).toBeVisible({ timeout: 10000 });
    await expect(this.roadmapSection).toBeVisible({ timeout: 10000 });
    await expect(this.systemSection).toBeVisible({ timeout: 10000 });
    await expect(this.instructorSection).toBeVisible({ timeout: 10000 });
    await expect(this.certificateSection).toBeVisible({ timeout: 10000 });
  }

  async verifyUI() {
    const sections = [
      this.courseSection,
      this.roadmapSection,
      this.systemSection,
      this.instructorSection,
      this.certificateSection,
    ];

    for (const section of sections) {
      const style = await section.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          color: s.color,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
        };
      });

      expect(style.color).toBe("rgb(255, 255, 255)");
      expect(style.fontSize).toBe("28px");
      expect(style.fontWeight).toBe("500");

      const items = section.locator("xpath=../ul/li/span");
      const count = await items.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const itemStyle = await items.nth(i).evaluate((el) => {
          const s = window.getComputedStyle(el);
          return { color: s.color, fontSize: s.fontSize };
        });
        expect(itemStyle.color).toBe("rgb(255, 255, 255)");
        expect(itemStyle.fontSize).toBe("16px");
      }
    }
  }

  async verifyContent() {
    const sections = [
      this.courseSection,
      this.roadmapSection,
      this.systemSection,
      this.instructorSection,
      this.certificateSection,
    ];

    for (const section of sections) {
      const titleStyle = await section.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return { fontSize: s.fontSize, fontWeight: s.fontWeight };
      });

      expect(parseInt(titleStyle.fontSize)).toBeGreaterThanOrEqual(20);
      expect(parseInt(titleStyle.fontWeight)).toBeGreaterThanOrEqual(500);

      const descParagraphs = section.locator("xpath=../p");
      const descItems = section.locator("xpath=../ul/li/span");

      const descCount = await descParagraphs.count();
      const itemCount = await descItems.count();

      expect(descCount + itemCount).toBeGreaterThan(0);

      for (let i = 0; i < descCount; i++) {
        const descStyle = await descParagraphs.nth(i).evaluate((el) => {
          const s = window.getComputedStyle(el);
          return { fontSize: s.fontSize };
        });
        expect(parseInt(descStyle.fontSize)).toBeLessThan(
          parseInt(titleStyle.fontSize)
        );
      }

      for (let i = 0; i < itemCount; i++) {
        const itemStyle = await descItems.nth(i).evaluate((el) => {
          const s = window.getComputedStyle(el);
          return { fontSize: s.fontSize };
        });
        expect(parseInt(itemStyle.fontSize)).toBeLessThan(
          parseInt(titleStyle.fontSize)
        );
      }
    }
  }
}
