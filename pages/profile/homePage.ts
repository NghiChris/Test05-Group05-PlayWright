import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly welcomeTitle: Locator;
    readonly profileMenuButton: Locator;
    readonly profileOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeTitle = page.locator('text=Khóa học nổi bật');
        this.profileMenuButton = page.locator('header >> img[alt="avatar"], .avatar');
        this.profileOption = page.locator('text=Thông tin cá nhân');
    }

    async verifyHomePageVisible() {
        await expect(this.welcomeTitle).toBeVisible();
    }

    async gotoProfile() {
        await this.profileMenuButton.click();
        await this.profileOption.click();
        await this.page.waitForURL('**/profile');
    }
}
