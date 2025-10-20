import { test, expect } from '@playwright/test';
import { CourseCategoryPage } from '../../pages/coursecategory/CourseCategoryPage';

test.describe('Danh mục khóa học', () => {

    test('TC_DANHMUC_1 Xác minh danh sách danh mục khoá học', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.hoverCategoryMenu();

        const visible = await coursePage.isCategoryListVisible();
        expect(visible).toBeTruthy();
    });

    test('TC_DANHMUC_2 Xác minh chọn danh mục khoá học và chuyển hướng thành công', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.selectBackendCategory();

        await expect(page).toHaveURL(/.*BackEnd.*/);

        const courseTitle = page.locator('span.listCourseTitle:has-text("Lập trình Backend")');
        await expect(courseTitle).toBeVisible();

    });

    test('TC_DANHMUC_3 Xác minh mỗi khoá học có navigate link tới trang chi tiết ', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.selectBackendCategory();

        const courseTitle = page.locator('span.listCourseTitle:has-text("Lập trình Backend")');
        await page.waitForSelector('.cardGlobalRes a.cardGlobal');
        const firstCourse = page.locator('.cardGlobalRes a.cardGlobal').first();
        const href = await firstCourse.getAttribute('href');

        await firstCourse.click();

        await expect(page).toHaveURL(new RegExp(`${href}$`));

        const courseInfo = page.getByRole('heading', { name: 'Thông tin khóa học' });
        await expect(courseInfo).toBeVisible();

    });

    test('TC_DANHMUC_4 Kiểm tra item title khoá học', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.selectBackendCategory();

        const courseTitle = page.locator('span.listCourseTitle:has-text("Lập trình Backend")');
        await page.waitForSelector('.cardGlobalRes a.cardGlobal');
        const firstCourse = page.locator('.cardGlobalRes a.cardGlobal').first();
        const href = await firstCourse.getAttribute('href');

        await firstCourse.click();

        await expect(page).toHaveURL(new RegExp(`${href}$`));

        await expect(page.locator('.titleDetailCourse', { hasText: 'Lập trình web' })).toBeVisible();
    });

    test('TC_DANHMUC_5 Kiểm tra item tên giảng viên khoá học ', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.selectBackendCategory();

        const courseTitle = page.locator('span.listCourseTitle:has-text("Lập trình Backend")');
        await page.waitForSelector('.cardGlobalRes a.cardGlobal');
        const firstCourse = page.locator('.cardGlobalRes a.cardGlobal').first();
        const href = await firstCourse.getAttribute('href');

        await firstCourse.click();

        await expect(page).toHaveURL(new RegExp(`${href}$`));

        await expect(page.locator('.instrutorTitle', { hasText: 'Elon Musk' })).toBeVisible();
    });

    test('TC_DANHMUC_6 Kiểm tra item giá khoá học ', async ({ page }) => {
        const coursePage = new CourseCategoryPage(page);
        await coursePage.goto();

        await coursePage.selectBackendCategory();

        const courseTitle = page.locator('span.listCourseTitle:has-text("Lập trình Backend")');
        await page.waitForSelector('.cardGlobalRes a.cardGlobal');
        const firstCourse = page.locator('.cardGlobalRes a.cardGlobal').first();
        const href = await firstCourse.getAttribute('href');

        await firstCourse.click();

        await expect(page).toHaveURL(new RegExp(`${href}$`));

        await expect(page.locator('.coursePrice', { hasText: '400.000' })).toBeVisible();
    });

});
