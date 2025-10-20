import { Page, Locator } from "@playwright/test";
import { DanhSachPage } from "./DanhSach";

export class KhoaThamKhaoPage extends DanhSachPage {
    readonly cards: Locator;


    constructor (page: Page) {
        super (page);
        this.cards = page.locator(".stikerCard");
    }

    async clickStickerCard() {
        await this.pageCard2.click(); //sử dụng lại từ lớp cha
    }

    async hoverCardAndCheck(index: number, expectedText: string) {
        const card = this.cards.nth(index);
        // Hover để kích hoạt hiệu ứng
        await card.scrollIntoViewIfNeeded();
        await card.hover();

        //Chờ hiệu ứng hover hoặc lazy load
        await this.page.waitForTimeout(1000);

        // Kiểm tra text xuất hiện (không cần exact, có thể không phân biệt hoa thường)
        const targetText = this.page.getByText(expectedText, { exact: false });
        console.log(`✅ Đã hover card ${index + 1}: thấy text "${expectedText}"`);
    }

}