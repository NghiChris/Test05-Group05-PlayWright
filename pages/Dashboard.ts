import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly khoaHocMenu: Locator;
    readonly title: Locator;
    readonly suKienMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.khoaHocMenu = page.getByRole('link', { name: "Khóa học" }).first();
        this.title = page.locator("h3").first();
        this.suKienMenu = page.getByRole('link', { name: "Sự kiện" }).first();
    }

    async goToHomePage() {
        await this.page.goto('/', {
            waitUntil: "domcontentloaded", //chờ đến khi trang load hết
            timeout: 15000,
        });
    }

    // Chờ load khi đã ở trang mới
    async waitForDomLoaded() {
        await this.page.waitForLoadState("domcontentloaded", { timeout: 15000});
    }

    async openKhoaHoc() {
        await this.khoaHocMenu.click();
    }

    async isAtKhoaHocPage(): Promise<boolean> {
        return await this.title.isVisible();
    }

    async openSuKien() {
        await this.suKienMenu.click();
    }

    async hoverMouse() {
        await this.suKienMenu.hover();
    }
}