import { Page, Locator, expect } from "@playwright/test";

export class DanhSachPage {
    readonly page: Page;
    readonly comeBack: Locator;
    readonly pageCard1: Locator;
    readonly pageCard2: Locator;
    // readonly pageCard3: Locator;
    readonly pageCard4: Locator;
    readonly titleCard4: Locator;
    readonly titleDetail4: Locator;
    readonly pageCard5: Locator;
    readonly pageCard6: Locator;
    readonly pageCard7: Locator;
    readonly pageCard8: Locator;
    readonly pageCard12: Locator;
    readonly nextPage2: Locator;
    readonly moPageAn: Locator;
    readonly nutTruoc: Locator;
    readonly nutSau: Locator;
    readonly page2Card1: Locator;
    readonly atPage2: Locator;
    readonly pageLink: Locator;
    readonly courseCards: Locator;
    readonly courseTitles: Locator;
    readonly khoaTitles: Locator;
    readonly khoaAuthors: Locator;
    readonly khoaPrices: Locator;
    readonly khoaRatings: Locator;
    readonly phanTrang: Locator;

    
    constructor (page: Page) {
        this.page = page;
        this.comeBack = page.getByRole('link', { name: "Quay về trang chủ" });
        this.pageCard1 = page.locator("a[href='/chitiet/']");
        this.pageCard2 = page.locator("a[href='/chitiet/100999']");
        // this.pageCard3 = page.locator("a[href='/chitiet/1009991']");
        this.pageCard4 = page.locator("a[href='/chitiet/10099924']");
        this.titleCard4 = page.locator('.stikerCard', { hasText: 'Javascripttasaasdsazxcxz' });
        this.titleDetail4 = page.locator("h4");
        this.pageCard5 = page.locator("a[href='/chitiet/111111111111']");
        this.pageCard6 = page.locator("a[href='/chitiet/12343554654546456456']");
        this.pageCard7 = page.locator("a[href='/chitiet/10099924']");
        this.pageCard8 = page.locator("a[href='/chitiet/100999999']");
        this.pageCard12 = page.locator("a[href='/chitiet/15054']");
        this.nextPage2 = page.getByRole('button', { name: 'Page 2' });
        this.moPageAn = page.getByRole('button', { name: '...' });
        this.nutTruoc = page.getByRole('button', { name: 'Previous page' });
        this.nutSau = page.getByRole('button', { name: 'Next page' });
        this.page2Card1 = page.locator('.stikerCard', { hasText: 'Javascript nâng cao cấp abc' });
        this.atPage2 = page.getByRole('button', { name: 'Page 2 is your current page' });
        this.pageLink = page.locator(".pageLinkPages");
        this.courseCards = page.locator(".cardGlobalRes")
        this.courseTitles = page.locator(".cardGlobalRes .stikerCard")
        this.khoaTitles = page.locator('.cardGlobalRes h6');
        this.khoaAuthors = page.locator('.cardGlobalRes .titleMaker .colorCardTitle');
        this.khoaPrices = page.locator('.cardGlobalRes .cardFooter div:first-child p:last-child');
        this.khoaRatings = page.locator('.cardGlobalRes .cardFooter span.textStar');
        this.phanTrang = page.locator('.paginationPages');
    }

    async backHome() {
        await this.comeBack.click();
    }

    //Mở danh sách khoá học
    async openKhoa1() {
        await this.pageCard1.click();
    }

    async openKhoa2() {
        await this.pageCard2.click();
    }

    async openPage2() {
        await this.nextPage2.click();
    }

    async openPageAn() {
        await this.moPageAn.click();
    }

    //Chuyển trang theo số (VD: 1, 8)
    async goToPage(pageNumber: number) {
        //Đợi phần tử trang xuất hiện
        await this.page.waitForSelector(".pageLinkPages", { state: "visible" });
        //Tìm page có text tương ứng
        const target = this.pageLink.filter({ hasText: pageNumber.toString() });

        const count = await target.count();
        if (count === 0) {
            console.warn(`⚠️ Không tìm thấy nút trang ${pageNumber}. Bỏ qua thao tác.`);
            return;
        }
        const targetEl = target.first();
        await targetEl.scrollIntoViewIfNeeded();
        await expect(targetEl).toBeVisible();

        //Kiểm tra trạng thái có disabled ko
        const ariaDisabled = await targetEl.getAttribute("aria-disabled");
        if (ariaDisabled === "true") {
            console.warn(`⚠️ Trang ${pageNumber} bị vô hiệu hóa (aria-disabled=true).`);
            return;
        }

        await targetEl.click();
        console.log(`📄 Đã chuyển đến trang ${pageNumber}`);

    }

    //Kiểm tra nút có thể click hay ko
    async clickIfEnabled(locator: Locator, label: string) {
        if (await locator.isEnabled() && !(await locator.getAttribute("aria-disabled") === "true")) {
            await locator.click();
            console.log(`✅ Click nút ${label} thành công`);
        } else {
            console.log(`⚠️ Nút ${label} đang bị vô hiệu hóa, bỏ qua.`);
        }
    }

    async operation() {
        await this.openPageAn();
        await this.clickIfEnabled(this.nutTruoc, "Trước");
        await this.goToPage(13);
        await this.clickIfEnabled(this.nutSau, "Sau");
        await this.goToPage(1);
        await this.clickIfEnabled(this.nutTruoc, "Trước");
    }

    //Promise<boolean> bắt buộc trả về true và false
    async isAtKhoaHocPage2(): Promise<boolean> {
        return await this.atPage2.isVisible();
    }

    //Cuộn đến 1 phần tử cụ thể
    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    //cuộn lên đầu trang
    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        })
    }

    async getCourseTitle(index: number): Promise<string> {
        const titleEl = this.courseTitles.nth(index);
        await titleEl.waitFor({ state: "visible" });
        return (await titleEl.innerText()).trim();
    }

    async clickCourse(index: number) {
        const card = this.courseCards.nth(index).locator("a.cardGlobal");
        await card.scrollIntoViewIfNeeded();
        await card.click();
        // console.log(`Click vào khóa học thứ ${index + 1}`);
    }

    // Đếm số lượng khóa học trên trang
    async getCourseCount() {
        await this.courseCards.first().waitFor({ state: 'visible' });
        return await this.courseCards.count();
    }

    async getCourseInfo(index: number) {
        const title = await this.khoaTitles.nth(index).innerText();
        const author = await this.khoaAuthors.nth(index).innerText();
        const price = await this.khoaPrices.nth(index).innerText();
        const rating = await this.khoaRatings.nth(index).innerText();
        return { title, author, price, rating };
    }

    //Xác minh tất cả khóa học có tiêu đề
    async verifyAllCoursesHaveTitle() {
        const count = await this.getCourseCount();
        for (let i = 0; i < count; i++) {
            const title = await this.courseTitles.nth(i).innerText();
            expect(title.trim()).not.toBe('');
        }
    }

    // Log tên khoá học
    async logAllCourseTitles() {
      const count = await this.getCourseCount();
       console.log(`📚 Tổng số khóa học : ${count}`);

      for (let i = 0; i < count; i++) {
      const title = await this.courseTitles.nth(i).innerText();
      console.log(`   ${i + 1}. ${title.trim()}`);
      }
    }

    async getActivePageNumberSafe() {
        const activeLocator = this.page.locator('.paginationPages .page-item.active');
        if (await activeLocator.count() === 0) {
            return 'Không tìm thấy phân trang';
        }
        return await activeLocator.innerText();
    }
    
    // Lấy giá của khóa học đầu tiên
    async getFirstCoursePrice() {
        const priceText = await this.khoaPrices.first().innerText();
        return priceText.replace(/\s+/g, "").trim();
    }

    async openFirstCourseDetail() {
        await this.pageCard2.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async clickAllPage() {
        
        console.log("🛠 Bắt đầu chạy clickAllPage");

        const khoaCount = await this.courseTitles.count();

        for (let i = 0; i < khoaCount; i++) {
            // Phải lấy lại danh sách sau mỗi lần reload page
            const titles = this.courseTitles;
            const titleText = await titles.nth(i).innerText();
            console.log(`\n 📚 Đang mở khóa học thứ ${i + 1}: ${titleText}`);

            await titles.nth(i).click();
            await this.page.waitForLoadState("domcontentloaded");

            // Nếu muốn in ra mô tả:
            const courseKhoa = await this.page.locator('h4.titleDetailCourse').innerText();
            const description = await this.page.locator('p.textDiscripts').innerText();
            console.log(`Thông tin tên khoá học: ${courseKhoa}`);
            console.log(`📝 Mô tả: ${description.substring(0, 100)}...`);

            // Quay lại danh sách
            await this.page.goBack();
            await this.page.waitForLoadState("domcontentloaded");
        }
    }
}