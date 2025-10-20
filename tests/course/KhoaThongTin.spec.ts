import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/Dashboard";
import { DanhSachPage } from "../../pages/KhoaHoc/DanhSach";
import { ThongTinKhoaPage } from "../../pages/KhoaHoc/ThongTin";
// import { KhoaThamKhaoPage } from "../pages/KhoaHoc/ThamKhao";
import { SuKienList } from "../../pages/SuKien/SuKienList";

test.describe("Test function course information", () => {
    let dashboard: DashboardPage;
    let danhSach: DanhSachPage;
    let thongTinKhoa: ThongTinKhoaPage;
    // let khoaThamKhao: KhoaThamKhaoPage;
    let suKienList: SuKienList;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSach = new DanhSachPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        // khoaThamKhao = new KhoaThamKhaoPage(page);
        suKienList = new SuKienList(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    })

    test("TC-07,08,Mở Khoá học 1 Javascriptt thành công + comeBack", async () => {
        await danhSach.openKhoa1();
        await dashboard.waitForDomLoaded();
        await suKienList.expectAtUrl(/\/chitiet\/?$/i);
        await danhSach.backHome();
    })

    test("TC-09,Trang thông tin các khoá học tên trùng lặp", async () => {
        const expectedTitle = "LẬP TRÌNH FRONT-END CHUYÊN NGHIỆP";
        const cardList = [
            danhSach.pageCard2,
            // danhSach.pageCard3,
            danhSach.pageCard4,
            danhSach.pageCard6,
            danhSach.pageCard7,
            danhSach.pageCard8,
        ];

        for (const card of cardList) {
            await thongTinKhoa.clickCardAndVerifyTitle(card, expectedTitle);
        }
    })

    test("TC-10,So sánh tên khoá học giữa danh sách và trang chi tiết", async () => {
        await danhSach.openPage2();
        const titleOnCard = await danhSach.page2Card1.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard);

        await danhSach.page2Card1.click();
        await dashboard.waitForDomLoaded();

        const titleOnDetailPage = await thongTinKhoa.getAllTitleText(thongTinKhoa.titleKhoa1);
        console.log("🔍 Tiêu đề trang chi tiết:", titleOnDetailPage);

        expect(titleOnDetailPage).toBe(titleOnCard);
    })

    test("TC-11,Kiểm tra UI trang thông tin khóa học Vlearning", async () => {
        await danhSach.pageCard8.click();
        await thongTinKhoa.verifyCourseImage();

    })

    test("TC17 - 18,So sánh tên khoá học danh sách và trang thông tin Trang 2", async ({ page }) => {
        await danhSach.openPage2();

        // Chờ danh sách khoá học hiển thị đầy đủ
        await page.waitForSelector(".cardGlobalRes .stikerCard", { state: "visible" });

        const count = await danhSach.courseCards.count();
        console.log(`📚 Có tổng cộng ${count} khóa học trên trang 2.`);

        let matchCount = 0;
        for (let i = 0; i < count; i++) {
        //  Lấy tên khóa học trên card
        const titleOnCard = await danhSach.getCourseTitle(i);
        console.log(`\n [${i + 1}] Tên trên card: ${titleOnCard}`);

        // Click mở chi tiết
        await danhSach.clickCourse(i);
        await dashboard.waitForDomLoaded();

        //  Lấy tên trong trang thông tin
        const titleOnDetail = await thongTinKhoa.getCourseTitleText();
        console.log(` Tên trên trang thông tin: ${titleOnDetail}`);

        // Chỉ log nếu TRÙNG tên
        if (titleOnDetail.toLowerCase().includes(titleOnCard.toLowerCase())) {
            matchCount++;
            console.log(`\n [${i + 1}] Tên trùng khớp!`);
            console.log(`🔹 Card: ${titleOnCard}`);
            console.log(`🔹 Chi tiết: ${titleOnDetail}`);
        }

        // Quay lại trang danh sách
        await dashboard.openKhoaHoc();
        await dashboard.waitForDomLoaded();

        // ✅ Quay về lại trang 2 nếu bị trở về trang 1
        const currentUrl = page.url();
        if (!currentUrl.includes("page=2")) {
            await danhSach.openPage2();
            await dashboard.waitForDomLoaded();
        }
        }

        console.log(`\n🎯 Tổng cộng ${matchCount}/${count} khóa học trùng tên!`);
    });

    test("TC-89,Giới thiệu thông tin khoá học", async () => {
        await danhSach.openPage2();
        // console.log("✅ In ra sau khi click"); 
        await danhSach.clickAllPage();

    })

    test("TC-90,Thông tin Khoá Học Đăng Ký", async ({ page }) => {
        await danhSach.openKhoa2();
        await thongTinKhoa.nutDangKy();
        await page.goBack({ waitUntil: 'domcontentloaded' });
        await thongTinKhoa.inputMa("akljdasdiu");
    })

    test("TC-91,Nội dung Khoá Học", async ({ page }) => {
        await danhSach.openKhoa2();
        await thongTinKhoa.isAtThongTinTitle();
        await danhSach.scrollToElement(thongTinKhoa.buttonXemTruoc);
        await thongTinKhoa.noiDungKhoaHoc();
        await expect(page.getByText("Nội dung khóa học")).toBeVisible();
    })

    test("TC-92,Bugs vị trí khi chuyển trang", async ({ page }) => {
        // await dashboard.openKhoaHoc();
        await danhSach.openPage2();
        const beforeClick = await danhSach.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại trước khi click:", beforeClick);
        await danhSach.page2Card1.click();
        await page.goBack();
        const afterGoBack = await danhSach.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại sau khi goBack:", afterGoBack);
        // Kiểm tra xem có bị reset về trang đầu hay không
        if (afterGoBack !== beforeClick) {
            console.warn(`Trang đã bị reset từ trang ${beforeClick} → ${afterGoBack}`);
        } else {
            console.log("Vẫn giữ nguyên trang sau khi quay lại.");
        }
        expect(typeof afterGoBack).toBe("string");
    })

    test("TC-93,Bugs lưu giữ trang trước khoá học", async ({ page }) => {
        // await dashboard.openKhoaHoc();
        await danhSach.pageCard5.click();
        await page.goBack();
        const titleOnCard4 = await danhSach.titleCard4.innerText();
        console.log("📄 Tên trên card:", titleOnCard4);
        await danhSach.pageCard4.click();
        await dashboard.waitForDomLoaded();
        const titleOnDetail4 = await thongTinKhoa.getAllTitleText(danhSach.titleDetail4);
        console.log(`🔍 Tên trên chi tiết:`, titleOnDetail4);
    })
    

})