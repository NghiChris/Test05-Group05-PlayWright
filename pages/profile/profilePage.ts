import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly studentInfoTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.studentInfoTab = page.locator('text=Thông tin học viên');
    }

    async verifyStudentInfoVisible() {
        await expect(this.studentInfoTab).toBeVisible();
    }
}
