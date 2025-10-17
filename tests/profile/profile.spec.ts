import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../pages/profile/profilePage';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/profile/homePage';

test.describe('Profile Page Tests', () => {
    test('Kiểm tra xem có thể truy cập trang Thông tin cá nhân sau khi đăng nhập', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);

        // ✅ Step 1: Đến trang đăng nhập
        await loginPage.goto();

        // ✅ Step 2: Đăng nhập với tài khoản hợp lệ (dùng hàm login đã xử lý đợi)
        console.log('Đã nhấn nút login, chờ chuyển trang...');
        await loginPage.login('TuongHan', '0308@Han');

        // ✅ Step 3: Xác nhận đã ở trang chủ
        await expect(page).toHaveURL(/trangchu/);
        await expect(page.locator('text=Khóa học nổi bật')).toBeVisible();

        // ✅ Step 4: Đi đến trang Thông tin cá nhân
        await homePage.gotoProfile();

        // ✅ Step 5: Kiểm tra "Thông tin học viên" hiển thị
        await profilePage.verifyStudentInfoVisible();
    });
});