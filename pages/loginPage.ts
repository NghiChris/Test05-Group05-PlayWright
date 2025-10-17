import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // ✅ Form đăng nhập thật
        const loginForm = page.locator('form.formLoginUser');
        this.usernameInput = loginForm.getByPlaceholder('Tài khoản');
        this.passwordInput = loginForm.getByPlaceholder('Mật khẩu');
        this.loginButton = loginForm.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('https://demo2.cybersoft.edu.vn/login', { waitUntil: 'domcontentloaded' });
    }

    async login(username: string, password: string) {
        // Điền thông tin với thời gian đợi giữa các thao tác
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill('');
        await this.page.waitForTimeout(300);
        await this.usernameInput.fill(username);

        await this.page.waitForTimeout(300);
        await this.passwordInput.fill('');
        await this.page.waitForTimeout(300);
        await this.passwordInput.fill(password);

        await this.page.waitForTimeout(300);

        // Nhấn nút đăng nhập và đợi response API thành công
        const [response] = await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/api/QuanLyNguoiDung/DangNhap') && res.status() === 200
            ),
            this.loginButton.click(),
        ]);

        // Thêm kiểm tra accessToken và reload trang
        const token = await this.page.evaluate(() => localStorage.getItem('accessToken'));
        console.log('AccessToken:', token);

        await this.page.reload();

        // Đợi redirect sang trang chủ (có thể mất vài giây)
        await this.page.waitForURL('**/trangchu', { timeout: 15000 });

        // Kiểm tra đã vào đúng trang chủ
        await expect(this.page).toHaveURL(/trangchu/);
        await expect(this.page.locator('text=Khóa học nổi bật')).toBeVisible();
    }
}