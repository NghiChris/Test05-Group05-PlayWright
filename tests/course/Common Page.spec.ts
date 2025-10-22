import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/Dashboard";
import { DanhSachPage, logTheoMoTa } from "../../pages/Course/DanhSach";
import { ThongTinKhoaPage } from "../../pages/Course/ThongTin";
import { SuKienList } from "../../pages/Event/SuKienList";

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
        await dashboard.openKhoaHoc();
    })

    test ("(TC-14),Các khoá trùng tiêu đề trang 2", async () => {
        const pageToLog = await danhSach.goAllPage(3);
        console.log(`\n ---Trang ${pageToLog}:`);
        
        const tongKhoa = await danhSach.getTongKhoa();
        const titles: string[] = [];
        const descriptions: string[] = [];
        const moTaList = await danhSach.getTieuDeKhoa();
        for (let i = 0; i < tongKhoa; i++) {
            const titleInList = await danhSach.getTenKhoaAt(i);
            titles.push(titleInList);
            descriptions.push(moTaList[i]);
        }
        // ✅ Log kết quả nhóm
        logTheoMoTa(titles, descriptions);
    })

    test ("(TC-23,24,25),Các khoá trùng tiêu đề theo trang", async () => {
        
        const pageToLog = await danhSach.goAllPage(3); 
        console.log(`\n ---Trang ${pageToLog}:`);

        const tongKhoa = await danhSach.getTongKhoa();
        const titles: string[] = [];
        const descriptions: string[] = [];
        const moTaList = await danhSach.getTieuDeKhoa();
        for (let i = 0; i < tongKhoa; i++) {
            const titleInList = await danhSach.getTenKhoaAt(i);
            // const moTa = await dSPage.getTieuDeKhoa();
            titles.push(titleInList);
            descriptions.push(moTaList[i]);
        }
        // ✅ Log kết quả nhóm
        logTheoMoTa(titles, descriptions);
    })

    test("(TC19,20),Kiểm tra UI trang thông tin tầng khoá theo trang", async ({ page }) => {
        test.setTimeout(120_000);

        //thay đổi theo trang cần test
        const pageToLog = await danhSach.goAllPage(6); 
        const tongKhoa = await danhSach.getTongKhoa();
        console.log(`\n 📄 Trang ${pageToLog} tổng khoá học:`, tongKhoa);

        for(let i = 0; i < tongKhoa; i++) {
            try{
                const tenKhoa = await danhSach.getTenKhoaAt(i);
                console.log(`\n 👉 Đang kiểm tra khóa [${i + 1}]: ${tenKhoa}`);

                await danhSach.clickCourse(i); // Click vào khóa học

                // Kiểm tra trang có hiển thị nội dung khóa học không (404 hay không)
                const contentVisible = await page.locator('.sideBarCourseDetail').isVisible({ timeout: 3000 });
                if (!contentVisible) {
                    console.log(`⚠️ [${i + 1}] Lỗi mở khóa học (404 hoặc không hiển thị)`);
                    await page.goto('/khoahoc');
                    continue;
                }

                //kiểm tra ảnh
                // const takeImg = await thongTinKhoa.courseImage.first();
                // const hasImage = await thongTinKhoa.verifyImageVisible(takeImg);
                const hasImage = await thongTinKhoa.verifyCourseImage();
                if (hasImage) {
                    console.log(`✅ [${i + 1}]  Khoá học có ảnh`);
                }else {
                    console.log(`❌ [${i + 1}] Ảnh bị ẩn hoặc lỗi`);
                }
                await page.goto('/khoahoc',{ waitUntil: 'domcontentloaded' });
                await danhSach.goAllPage(6);
            } catch {
                console.log(`⚠️ [${i + 1}] Lỗi khi kiểm tra khóa học 404`);
                if (!page.isClosed()) {
                    await page.goto('/khoahoc'); // Đảm bảo luôn quay lại
                    await danhSach.goAllPage(6);
                }
                continue;
            }  
        }
    });
    
    test("(TC-15,16),Các khoá UI trang danh sách trùng và không trùng", async () => {

        const pageToLog = await danhSach.goAllPage(5);
        const tongKhoa = await danhSach.getTongKhoa();
        console.log(`-- Trang ${pageToLog} tổng khoá học:`, tongKhoa);

        const { duplicates, uniques } = await danhSach.getDuplicateAndUniqueTitles();

        console.log("🔁 Khóa học TRÙNG hình:", duplicates);
        console.log("✅ Khóa học KHÔNG trùng hình:", uniques);
    })

    test("Kiểm tra trang thông tin giảng viên vs nội dung", async () => {
        
        const tenKhoa = await danhSach.onlyCard(5);
        console.log(`** Tên khoá học: ${tenKhoa}`);
        await thongTinKhoa.logCourseIntro();
        await thongTinKhoa.logCourseLearn(); 

        console.log(` ** Nội dung khoá học ${tenKhoa} :`)
        await thongTinKhoa.logCourseContent();
    });

    test("Kiểm tra trang thông tin giảng viên vs nội dung theo trang", async () => {
        
        const pageToLog = await danhSach.goAllPage(7);
        const tenKhoa = await danhSach.onlyCard(5);
        console.log(`** Trang ${pageToLog}, Tên khoá học: ${tenKhoa}`);
        await thongTinKhoa.logCourseIntro();
        await thongTinKhoa.logCourseLearn(); 

        console.log(` ** Nội dung khoá học ${tenKhoa} :`)
        await thongTinKhoa.logCourseContent();
    });

});