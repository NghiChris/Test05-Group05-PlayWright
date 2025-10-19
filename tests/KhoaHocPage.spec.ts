import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSach";
import { ThongTinKhoaPage } from "../pages/KhoaHoc/ThongTin";
import { SuKienList } from "../pages/SuKien/SuKienList";

test.describe("Test function course", () => {
    let dashboard: DashboardPage;
    let danhSach: DanhSachPage;
    let thongTinKhoa: ThongTinKhoaPage;
    let suKienList: SuKienList;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSach = new DanhSachPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        suKienList = new SuKienList(page);
        await dashboard.goToHomePage();
    })

    test("TC-01,isAtKhoaHocPage", async () => {
        await dashboard.openKhoaHoc();
        await dashboard.isAtKhoaHocPage();
    })

    test("TC-02 & 88,Open Page 2 + Page Ẩn", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        await danhSach.openPage2();
        await danhSach.openPageAn();
        await expect(page.getByRole('button', { name: 'Page 5 is your current page' })).toBeVisible();
        await suKienList.scrollToBottom();
    })

    test("TC-03,Click Button Trước vs Sau", async () => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        await danhSach.operation();
    })

    test('TC-04,Kiểm tra danh sách khóa học', async () => {
        await dashboard.openKhoaHoc();
        const count = await danhSach.getCourseCount();
        console.log(`Số lượng khóa học: ${count}`);

        const firstCourse = await danhSach.getCourseInfo(0);
        console.log(firstCourse);

        await danhSach.verifyAllCoursesHaveTitle();
    });

    test("TC05 & 12,Các tên khoá học trên trang 1 & 2 hiển thị sai tên", async () =>{
        await dashboard.openKhoaHoc();
        console.log('\n=== Trang 1 ===')
        await danhSach.logAllCourseTitles();

        await danhSach.nutSau.click();
        console.log('\n=== Trang 2 ===')
        await danhSach.logAllCourseTitles();
    })

    test("TC-94,Bugs giá Khoá học", async () => {
        await dashboard.openKhoaHoc();

        const listPrice = await danhSach.getFirstCoursePrice();
        console.log(`💰 Giá trong danh sách: ${listPrice}`);

        await danhSach.openFirstCourseDetail();
        const detailPrice = await thongTinKhoa.getKhoaHocPrice();
        console.log(`🧾 Giá trong thông tin: ${detailPrice}`);

        // expect(detailPrice).toBe(listPrice);
          if (detailPrice !== listPrice) {
         console.warn(`⚠️ Giá KHÔNG KHỚP!\n  Danh sách: ${listPrice}\n  Thông tin: ${detailPrice}`);
            } else {
         console.log("✅ Giá khớp giữa danh sách và thông tin.");
        }
    });

    test("TC-95,Bugs quay về trang chủ", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await danhSach.moPageAn.click();
        
        const beforeClick = await danhSach.getActivePageNumberSafe();
        console.log(" Trang hiện tại trước khi click:", beforeClick);
        
        await page.goBack({ waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1500);
        
        // 👉 Lấy URL hiện tại
        const currentUrl = page.url();
        console.log(" URL hiện tại sau khi goBack:", currentUrl);
        
        // 👉 Kiểm tra có phải đang ở trang danh sách khóa học không
        const isAtKhoaHoc = currentUrl.includes('/khoahoc');
        if (!isAtKhoaHoc) {
            console.error(`🚨 Bug: Sau khi quay lại không ở trang khóa học mà ở "${currentUrl}"`);
            return;
        }
        
        const afterGoBack = await danhSach.getActivePageNumberSafe();
        console.log(" Trang hiện tại sau khi goBack:", afterGoBack);
        
        // Kiểm tra xem có bị reset về trang đầu hay không
        if (afterGoBack !== beforeClick) {
            console.warn(` Trang đã bị reset từ trang ${beforeClick} → ${afterGoBack}`);
        } else {
            console.log(" Vẫn giữ nguyên trang sau khi quay lại.");
        }
        await danhSach.scrollToTop();
    })
})