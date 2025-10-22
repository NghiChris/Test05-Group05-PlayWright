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

    //Kiểm tra ảnh hiển thị trên màn hình khi ảnh bị ẩn
    async verifyCourseImage(): Promise<boolean> {
        try {
            const img = this.courseImage.first();
            // Wait for it to be attached + visible
            await img.waitFor({ state: "attached", timeout: 5000 });

            const imgSrc = await img.getAttribute("src");
            expect(imgSrc).not.toBeNull();
            
            const isLoad = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
            expect(isLoad).toBeTruthy();

            console.log("\n ✅ Có ảnh khóa học hiển thị.");
            return true;
        } catch (err) {
            console.log("\n ❌ Không có ảnh khóa học.");
            return false;
        }
    }

    // Lấy dữ liệu phần giảng viên
    async logCourseIntro() {
        const introBlocks = this.page.locator('.detailCourseIntro');

        // Giảng viên
        const gvParas = await introBlocks.nth(0).locator('p').allInnerTexts();
        const tenGv = gvParas[0] || 'Giảng viên';
        const gv = gvParas[1] || '(Chưa có dữ liệu)';

        // Lĩnh vực (đọc toàn bộ block, rồi tách theo dòng)
        await this.page.waitForTimeout(5000);
        const lvLabel = await introBlocks.nth(1).locator('p').nth(0).innerText();
        const lv = (await introBlocks.nth(1).locator('.instrutorTitle p').nth(1).textContent())?.trim() || '(Chưa có dữ liệu)';

        // Đánh giá
        const danhGia = await introBlocks.nth(2).locator('span, p').allInnerTexts();
        const rating = danhGia[0] || '0.0';
        const soDanhGia = danhGia[1] || '0 đánh giá';

        // In kết quả
        console.log(` ${tenGv}: ${gv}`);
        console.log(` ${lvLabel}: ${lv}`);
        console.log(` ${rating}: (${soDanhGia})`);
    }

    // log phần "Những gì bạn sẽ học"
    async logCourseLearn() {
        const mucHoc = this.page.locator('.boxCourseLearn li a');
        const count = await mucHoc.count();

        console.log('\n🎯 NHỮNG GÌ BẠN SẼ HỌC:');
        for (let i = 0; i < count; i++) {
            const text = (await mucHoc.nth(i).innerText()).trim();
            console.log(`   ${i + 1}. ${text}`);
        }
    }

        // Lấy dữ liệu toàn bộ phần nội dung khóa học
    async logCourseContent() {

        const sections = this.page.locator(".courseDetailItem");
        const count = await sections.count();

        for (let i = 0; i < count; i++) {
            const section = sections.nth(i);
            const title = (await section.locator(".sectionCourse span").innerText()).trim();

            console.log(`📚 ${title}`);

            const lessons = section.locator(".lessonContainer .lessonContent");

            const lessonCount = await lessons.count();
            for (let j = 0; j < lessonCount; j++) {
                const lesson = lessons.nth(j);
                const name = (await lesson.locator("span:first-child").innerText()).trim().replace(/\s+/g, " ");
                const time = (await lesson.locator("span:last-child").innerText()).trim().replace(/\s+/g, " ");

                console.log(`   ${j + 1}. ${name} — 🕒 ${time}`);
            }
        }
    }
}