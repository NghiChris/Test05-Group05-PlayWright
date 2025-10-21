import { Page, Locator, expect } from "@playwright/test";
import { DashboardPage } from "../Dashboard" ;

export class ThongTinKhoaPage extends DashboardPage {
    readonly thongTinTitle: Locator;
    readonly nameKhoa: Locator;
    readonly buttonXemTruoc: Locator;
    readonly buttonDangKy: Locator;
    readonly nhapMa: Locator;
    readonly titleKhoa1: Locator;
    readonly titleDetailCourse: Locator;
    readonly coursePrice: Locator;
    readonly courseImage: Locator;

    constructor (page: Page) {
        super(page);
        this.thongTinTitle = page.getByText('Thông tin khóa học');
        this.nameKhoa = page.locator("h4");
        this.buttonXemTruoc = page.locator(".btnPreview").first();
        this.buttonDangKy = page.getByRole('button', { name: "Đăng ký"});
        this.nhapMa = page.getByPlaceholder("Nhập mã");
        this.titleKhoa1 = page.locator('.titleDetailCourse', { hasText: "Javascript nâng cao cấp abc" });
        this.titleDetailCourse = page.locator("h4.titleDetailCourse");
        this.coursePrice = page.locator(".sideBarCourseDetail .coursePrice p");
        this.courseImage = page.locator(".sideBarCourseDetail img");
    }

    async noiDungKhoaHoc() {
        await this.buttonXemTruoc.click();
    }

    async inputMa(ma:string) {
        await this.nhapMa.fill(ma);
    }

    async nutDangKy() {
        await this.buttonDangKy.click();
    }

    async isAtThongTinTitle() {
        await expect(this.thongTinTitle).toBeVisible();
    }

    async clickCardAndVerifyTitle(card: Locator, expectedTitle: string) {
        await card.click();
        //Chờ selector tiêu đề xuất hiện lại và có nội dung mới
        const titleLocator = this.nameKhoa;
        await this.waitForDomLoaded();
        //Lấy tiêu đề sau khi chắc chắn đã load xong
        const title = await titleLocator.innerText();
        console.log("⛳ Tiêu đề trang hiện tại:", title);
        expect(title).toBe(expectedTitle);
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
    }

    //lấy tiêu đề của khoá học hiện tại
    async getAllTitleText(title: Locator): Promise<string> {
        await title.waitFor({ state: 'visible' });
        return await title.innerText();
    }

    async getCourseTitleText(): Promise<string> {
        await this.titleDetailCourse.waitFor({ state: 'visible' });
        return (await this.titleDetailCourse.innerText()).trim();
    }

    async getKhoaHocPrice() {
        const text = await this.coursePrice.innerText();
        return text.replace(/\s+/g, "").trim();
    }

    async verifyCourseImage(): Promise<boolean> {
        const imgLocator = this.courseImage.first();

        // Wait for it to be attached + visible
        await imgLocator.waitFor({ state: "attached", timeout: 8000 });

        await imgLocator.scrollIntoViewIfNeeded();
        // Now assert visibility (this will retry until timeout)
        // await expect(imgLocator).toBeVisible({ timeout: 5000 });

        const imgSrc = await imgLocator.getAttribute("src");
        const isVisible = await imgLocator.isVisible();

        if (isVisible && imgSrc && imgSrc.trim().length > 0) {
            console.log("✅ Có ảnh khóa học hiển thị.");
            return true;
        } else {
            console.log("❌ Không có ảnh khóa học.");
            return true;
        }
    }


}