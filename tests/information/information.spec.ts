import { test, expect } from "@playwright/test";
import { InformationPage } from "../../pages/information/informationPage";

test.describe("Trang Thông tin", () => {
    test("TC-001 Xác minh người dùng có thể điều hướng thành công đến trang THÔNG TIN", async ({ page }) => {
        const informationPage = new InformationPage(page);
        await informationPage.goto();

        await informationPage.gotoThongTin();

        await informationPage.verifyThongTinPageVisible();
    });

    test("TC-003 Đảm bảo nội dung trong mỗi phần trên trang THÔNG TIN", async ({ page }) => {
        const informationPage = new InformationPage(page);
        await informationPage.goto();
        await informationPage.gotoThongTin();
        await informationPage.verifyBodyContentVisible();
    });

    test("TC-005 Xác minh tất cả các liên kết ở footer có hoạt động", async ({ page }) => {
        const informationPage = new InformationPage(page);
        await informationPage.goto();
        await informationPage.gotoThongTin();
        await informationPage.verifyFooterLinksAndContacts();
    });

});
