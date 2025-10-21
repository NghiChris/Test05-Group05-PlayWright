import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/Dashboard";
import { KhoaThamKhaoPage } from "../../pages/Course/ThamKhao";

test.describe("Test function reference course", () => {
    let dashboard: DashboardPage;
    let khoaThamKhao: KhoaThamKhaoPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        khoaThamKhao = new KhoaThamKhaoPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    })

    test("TC-97,Khoá học Tham Khảo", async ({ page }) => {
        await khoaThamKhao.clickStickerCard();
        await expect(page.getByText("Khóa học tham khảo")).toBeVisible();

        const testData = [
            { text: "Xem Chi Tiết" },
            { text: "Yêu Thích" },
            { text: "Elun Musk Ricard" },
            { text: "BOOTCAMP - LẬP TRÌNH FULL STACK TỪ ZERO ĐẾN CÓ VIỆC" },
        ];

        for (let i = 0; i < testData.length; i++) {
            await khoaThamKhao.hoverCardAndCheck(i, testData[i].text);
        }
    })
})