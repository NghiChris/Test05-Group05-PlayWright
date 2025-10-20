import { Page, Locator, expect } from "@playwright/test";
import { DashboardPage } from "../Dashboard";

export class SuKienList extends DashboardPage {
    readonly lastYear: Locator;
    readonly giangSinh: Locator;
    readonly noel: Locator;
    readonly errorBug: Locator;
    readonly backTop: Locator;

    constructor (page: Page) {
        super(page);
        this.lastYear = page.getByRole('link', { name: "Sự kiện Sale Cuối Năm" }).first();
        this.giangSinh = page.getByRole('link', { name: "Sự kiện Giáng sinh" }).first();
        this.noel = page.getByRole('link', { name: "Sự kiện Noel" }).first();
        this.errorBug = page.locator("h1.text404");
        this.backTop = page.locator("btn.backTop");
    }

    async openLastYearEvent() {
        await this.lastYear.click();
    }

    async openGiangSinhEvent() {
        await this.suKienMenu.hover();
        await this.giangSinh.click();
    }
    
    async openNoelEvent() {
        await this.suKienMenu.hover();
        await this.noel.click();
    }

    async isAtErrorBug() {
        await expect(this.errorBug).toBeVisible();
    }

    async headPage() {
        await this.backTop.click();
    }

    //Kiểm tra đang ở đúng URL
    async expectAtUrl(regex: RegExp) {
        await expect(this.page).toHaveURL(regex);
    }

    //Cuộn nhanh xuống cuối trang
    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        })
    }
}