import { Page, Locator, expect } from '@playwright/test';

export class CourseCategoryPage {
    readonly page: Page;
    readonly categoryMenu: Locator;
    readonly categoryList: Locator;
    readonly backendCategory: Locator;
    readonly courseCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryMenu = page.locator('a', { hasText: 'Danh mục' }).first();
        this.categoryList = page
            .locator('ul.courseCateList')
            .filter({ hasText: 'LẬP TRÌNH BACKEND' })
            .first();
        this.backendCategory = page.locator('ul.courseCateList >> text=Backend');
        this.courseCards = page.locator('.listCourseCategory .cardGlobal');
    }

    async goto() {
        await this.page.goto('https://demo2.cybersoft.edu.vn/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
        await this.categoryMenu.waitFor({ state: 'visible', timeout: 10000 });
    }

    async hoverCategoryMenu() {
        await this.categoryMenu.waitFor({ state: 'visible' });
        await this.categoryMenu.hover();
        await this.categoryList.waitFor({ state: 'visible', timeout: 7000 });
    }

    async isCategoryListVisible(): Promise<boolean> {
        return await this.categoryList.isVisible();
    }

    async selectBackendCategory() {
        await this.hoverCategoryMenu();
        await expect(this.backendCategory).toBeVisible();
        await this.backendCategory.click();
    }

    async openCourseByIndex(index: number) {
        const courseCount = await this.courseCards.count();
        if (courseCount === 0) throw new Error('Không tìm thấy khóa học nào.');

        const course = this.courseCards.nth(index);
        const href = await course.getAttribute('href');
        const courseName = await course.locator('h6').innerText();

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            course.click(),
        ]);

        return { href, courseName };
    }

    async getCourseCount() {
        return await this.courseCards.count();
    }

}
