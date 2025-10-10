import { Page, Locator, expect } from "@playwright/test";

export default class Banner {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly startButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.locator(".sliderHome .sloganContainer h1");
    this.startButton = page.locator(
      ".sliderHome .sloganContainer button.btnSlider"
    );
  }

  async verifyHeroTitleVisible() {
    await expect(this.heroTitle.first()).toBeVisible({ timeout: 10000 });
  }

  async verifyHeroTitleText(expectedTexts: string[]) {
    const texts = await this.heroTitle.allInnerTexts();
    expect(texts.length).toBe(expectedTexts.length);
    texts.forEach((txt, i) => {
      expect(txt.trim().length).toBeGreaterThan(0);
    });
  }

  async verifyStartButtonVisible() {
    await expect(this.startButton).toBeVisible({ timeout: 10000 });
  }

  async verifyStartButtonColors(expectedBg: string, expectedColor: string) {
    const styles = await this.startButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
      };
    });

    expect(styles.backgroundColor).toBe(expectedBg);
    expect(styles.color).toBe(expectedColor);
  }
}
