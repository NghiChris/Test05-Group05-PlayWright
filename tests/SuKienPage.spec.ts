import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { TimeAndStartUp } from "../pages/SuKien/Time&StartUp";
import { SuKienList } from "../pages/SuKien/SuKienList";
import { CreatorsPage } from "../pages/SuKien/Creators";
import { NhaTaiTroPage } from "../pages/SuKien/NhaTaiTro";

test.describe("Test Function Event", () => {
    let dashboard: DashboardPage;
    let timeAndStartUp: TimeAndStartUp;
    let suKienList: SuKienList;
    let creators: CreatorsPage;
    let nhaTaiTro: NhaTaiTroPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        timeAndStartUp = new TimeAndStartUp(page);
        suKienList = new SuKienList(page);
        creators = new CreatorsPage(page);
        nhaTaiTro = new NhaTaiTroPage(page);
        await dashboard.goToHomePage();
    })

    test("TNV-4,Click Sự Kiện thành công + Hiển thị banner", async () => {
        await dashboard.openSuKien();
        await suKienList.scrollToBottom();
        await suKienList.headPage();
        const titleBanner = await timeAndStartUp.bannerTitle.innerText();
        console.log("Hiển thị banner: ", titleBanner);
    })

    test("Lấy giá trị Ngày - Giờ - Phút - Giây từ banner sự kiện", async () => {
        await dashboard.openSuKien();
        const { dayVal, hourVal, minVal, secVal } = await timeAndStartUp.getCountDownValues();

        //Kiểm tra chúng tồn tại và đúng định dạng 2 chữ số
        expect(dayVal).toMatch(/^\d{2}$/);
        expect(hourVal).toMatch(/^\d{2}$/);
        expect(minVal).toMatch(/^\d{2}$/);
        expect(secVal).toMatch(/^\d{2}$/);

        await timeAndStartUp.verifyBannerVisible();
    })

    test("TNV-6,Sự Kiện StartUp Tham Gia & Tim Hieu Them", async () => {
        await dashboard.openSuKien();
        await timeAndStartUp.clickThamGia();
        await timeAndStartUp.clickTimHieuThem();
        await timeAndStartUp.verifyBannerVisible();
    })

    test("Kiểm tra phần 'Các nhà đồng sáng tạo", async () => {
        await dashboard.openSuKien();
        await creators.verifyCreatorsSection();
    })

    test("Các Nhà tài trợ chương trình", async () => {
        await dashboard.openSuKien();
        await nhaTaiTro.verifySponsorsSection();
    })

})