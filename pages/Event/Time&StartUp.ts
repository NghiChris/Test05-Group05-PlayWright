import { Page, Locator, expect } from "@playwright/test";

export class TimeAndStartUp {
    readonly page: Page;
    readonly bannerTitle: Locator;
    readonly day: Locator;
    readonly hour: Locator;
    readonly minute: Locator;
    readonly second: Locator;
    readonly bannerDate: Locator;
    readonly nutThamGia: Locator;
    readonly nutTimHieuThem: Locator;
    readonly startupImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bannerTitle = page.locator('.sliderEvent h4', { hasText: /sự kiện công nghệ lớn nhất 2021/i }); //i giúp bỏ qua hoa/thường.
        this.day = page.locator(".timeEvents .dayEvent");
        this.hour = page.locator(".timeEvents .hoursEvent");
        this.minute = page.locator(".timeEvents .minEvent");
        this.second = page.locator(".timeEvents .secondEvent");
        this.bannerDate = page.locator(".timeEvents h6");
        this.nutThamGia = page.locator("button:has-text('THAM GIA')");
        this.nutTimHieuThem = page.locator("button:has-text('TÌM HIỂU THÊM')");
        this.startupImage = page.locator(".imgEvent img");
    }

    async getCountDownValues() {
        await this.page.waitForSelector(".timeEvents .countDownEvent");

        const dayVal = await this.day.innerText();
        const hourVal = await this.hour.innerText();
        const minVal = await this.minute.innerText();
        const secVal = await this.second.innerText();

        console.log(`Ngày: ${dayVal}, Giờ: ${hourVal}, Phút: ${minVal}, Giây: ${secVal}`);
        return { dayVal, hourVal, minVal, secVal };
    }

    async verifyBannerVisible() {
        await expect(this.bannerDate).toBeVisible();
        await expect(this.bannerDate).toContainText(/20 - 25 tháng 12, 2022/i);

        const titleDate = await this.bannerDate.innerText();
        console.log("Sự Kiện diễn ra vào: ", titleDate);
    }
    
    async clickThamGia() {
        await this.nutThamGia.click();
        await this.page.waitForTimeout(500);
        console.log("Clicked 'Tham gia' successfully");
    }

    async clickTimHieuThem() {
        await this.nutTimHieuThem.click();
        await this.page.waitForTimeout(500);
        console.log("Clicked 'Tìm hiểu thêm' successfully");
    }

    //Kiểm tra ảnh có hiển thị và đã load thành công
    async verifyStartupImageVisible() {
        await this.page.waitForTimeout(500);
        await expect(this.startupImage).toBeVisible();

        // Kiểm tra thêm thuộc tính naturalWidth > 0 => ảnh load thành công
        // naturalWidth : Là chiều rộng thật (tự nhiên) của hình ảnh sau khi trình duyệt tải ảnh thành công, chỉ đọc (read-only) của đối tượng HTMLImageElement
        // img.complete : Là boolean cho biết ảnh đã tải xong (hoặc bị lỗi). 
        const isLoaded = await this.startupImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
        expect(isLoaded).toBeTruthy();
        console.log("✅ Ảnh minh họa Startup hiển thị thành công.");
    }
}