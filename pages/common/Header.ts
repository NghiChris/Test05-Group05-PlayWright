import { Page, Locator, expect } from "@playwright/test";

export default class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly menus: Locator;
  readonly searchBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator("section.header .textLogo");
    this.menus = page.locator("section.header ul.menuHeader > li");
    this.searchBox = page.locator("section.header input.searchForm");
    this.loginButton = page.locator(
      "section.header button.btnGlobal a:has-text('Đăng nhập')"
    );
  }

  async verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 10000 });
  }

  async verifyHasLink(locator: Locator, expectedHref: string) {
    await expect(locator).toHaveAttribute("href", expectedHref);
  }

  async getMenus() {
    return this.menus.allInnerTexts();
  }

  async clickMenu(name: string) {
    await this.page
      .locator(`section.header ul.menuHeader li a:has-text("${name}")`)
      .click();
  }

  async searchCourse(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchBox.press("Enter");
  }

  async getMenuCount() {
    return await this.menus.count();
  }

  async verifySearchBoxUI() {
    await expect(this.searchBox).toBeVisible({ timeout: 10000 });

    const color = await this.searchBox.evaluate(
      (el) => getComputedStyle(el).color
    );
    const fontSize = await this.searchBox.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    const fontFamily = await this.searchBox.evaluate(
      (el) => getComputedStyle(el).fontFamily
    );

    expect(color).toBe("rgb(0, 0, 0)");
    expect(fontSize).toBe("16px");
    expect(fontFamily).toContain("Roboto");

    const box = await this.searchBox.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  }
}
