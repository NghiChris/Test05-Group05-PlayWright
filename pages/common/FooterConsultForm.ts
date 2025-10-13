import { Page, Locator, expect } from "@playwright/test";

export default class FooterConsultForm {
  readonly page: Page;
  readonly root: Locator;
  readonly inputs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("section.footerPages");
    this.inputs = this.root.locator("form input.formFooter");
    this.nameInput = this.inputs.nth(0);
    this.emailInput = this.inputs.nth(1);
    this.phoneInput = this.inputs.nth(2);
    this.submitBtn = this.root.locator("button.custom-btn.btnGlobal");
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await expect(this.root).toBeVisible({ timeout: 10000 });
    await fn();
  }

  async verifyVisible(locator: Locator) {
    await this.withSectionReady(async () => {
      await expect(locator).toBeVisible({ timeout: 10000 });
    });
  }

  async verifyPlaceholders() {
    await this.withSectionReady(async () => {
      expect(await this.nameInput.getAttribute("placeholder")).toBe("Họ và tên");
      expect(await this.emailInput.getAttribute("placeholder")).toBe("Email");
      expect(await this.phoneInput.getAttribute("placeholder")).toBe("Số điện thoại");
    });
  }

  async clickSubmit() {
    await this.withSectionReady(async () => {
      await this.submitBtn.click();
    });
  }
}
