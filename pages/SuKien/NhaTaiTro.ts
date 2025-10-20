import { Page, Locator, expect } from "@playwright/test";

export class NhaTaiTroPage {
    readonly page: Page;
    readonly sponsorTitle: Locator;
    readonly sponsorCards: Locator;
    readonly sponsorImages: Locator;
    readonly sponsorNames: Locator;

    constructor (page: Page) {
        this.page = page;
        this.sponsorTitle = page.locator("h6", { hasText: "Nhà tài trợ chương trình" });
        this.sponsorCards = page.locator(".donors .itemDonors");
        this.sponsorImages = this.sponsorCards.locator("img");
        this.sponsorNames = this.sponsorCards.locator("p");
    }

    async verifySponsorsSection() {
        //Kiểm tra tiêu đề hiển thị
        await expect(this.sponsorTitle).toBeVisible();

        const count = await this.sponsorCards.count();
        console.log(`🎯 Tổng số nhà tài trợ tìm thấy: ${count}`);
        expect(count).toBeGreaterThanOrEqual(4);

        //Duyệt qua từng card
        for (let i = 0; i < count; i++) {
            const img = this.sponsorImages.nth(i);
            const nameEl = this.sponsorNames.nth(i);

            //Kéo ảnh vào tầm nhìn để load (nếu lazy-load)
            await img.scrollIntoViewIfNeeded();
            await img.waitFor({ state: 'visible' });

            //Đảm bảo ảnh đã load hoàn toàn trước khi kiểm tra
            await img.evaluate(async (el: HTMLImageElement) => {
                if (!el.complete || el.naturalWidth === 0) {
                    await new Promise<void>((resolve, reject) => {
                        el.addEventListener('load', () => resolve(), { once: true });
                        el.addEventListener('error', () => reject('❌ Lỗi load ảnh: ' + el.src), { once: true });
                    })
                }
            });

            //Lấy thông tin ảnh và tên
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            const name = (await nameEl.textContent())?.trim() || "Không có tên";
            console.log(`🖼️ Ảnh ${i + 1}: ${naturalWidth}px   💼 ${name}`);

            //Kiểm tra
            expect(naturalWidth, `Ảnh ${i + 1} chưa load thành công`).toBeGreaterThan(0);
            await expect(nameEl).toBeVisible();
        }
    }
}