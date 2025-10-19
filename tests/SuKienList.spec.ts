import { test } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { SuKienList } from "../pages/SuKien/SuKienList";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSach";

test.describe("Test function event", () => {
    let dashboard: DashboardPage;
    let suKienList: SuKienList;
    let danhSach: DanhSachPage;
    
    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        suKienList = new SuKienList(page);
        danhSach = new DanhSachPage(page);
        await dashboard.goToHomePage();
        await dashboard.openSuKien();
    })

    test("Mở Event Sale Cuối Năm + Quay về", async () => {
        await dashboard.waitForDomLoaded();
        await dashboard.hoverMouse();
        await suKienList.openLastYearEvent();
        //Kiểm tra trang mở đúng
        await suKienList.expectAtUrl(/\/sukien\/lastYear$/);
        await danhSach.backHome();
    })

    test("Mở Event Giáng Sinh", async () => {
        await dashboard.waitForDomLoaded();
        await suKienList.openGiangSinhEvent();
        await suKienList.expectAtUrl(/\/sukien\/Noel$/);
    })

    test("Mở Event Noel", async () => {
        await dashboard.waitForDomLoaded();
        await suKienList.openNoelEvent();
        await suKienList.isAtErrorBug();
    })

})