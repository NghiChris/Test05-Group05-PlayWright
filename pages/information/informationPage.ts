// pages/profile/homePage.ts
import { Page, expect } from "@playwright/test";

export class InformationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://demo2.cybersoft.edu.vn/trangchu", {
            waitUntil: "domcontentloaded", // đợi DOM load xong, tránh treo do ảnh/JS
            timeout: 60000, // tăng thời gian chờ lên 60s
        });
    }

    async gotoThongTin() {
        await this.page.getByRole("link", { name: "THÔNG TIN" }).click();
        await this.page.waitForURL("**/thongtin", { timeout: 10000 });
        await expect(this.page).toHaveURL(/thongtin/);
    }

    async verifyThongTinPageVisible() {
        await expect(
            this.page.getByText("Cùng nhau khám phá nhưng điều mới mẻ")
        ).toBeVisible();
    }

    async verifyInformationContentVisible() {
        const contentChecks = [
            { title: "Giới thiệu", keywords: ["học", "lập trình", "CyberSoft"] },
            { title: "Chính sách", keywords: ["bảo mật", "quy định", "điều khoản"] },
            { title: "Liên hệ", keywords: ["email", "số điện thoại", "địa chỉ"] },
            { title: "FAQ", keywords: ["câu hỏi", "thắc mắc", "giải đáp"] },
            { title: "Tuyển dụng", keywords: ["vị trí", "ứng tuyển", "cơ hội"] },
        ];

        for (const { title, keywords } of contentChecks) {
            const section = this.page.locator(`text=${title}`).first();
            await expect(section).toBeVisible();

            // Lấy phần nội dung gần kề tiêu đề
            const content = await section
                .locator("xpath=following-sibling::*")
                .first()
                .innerText();
            expect(content.trim().length).toBeGreaterThan(0);

            // Kiểm tra có chứa ít nhất 1 từ khóa hợp lý
            const found = keywords.some((kw) =>
                content.toLowerCase().includes(kw.toLowerCase())
            );
            expect(found, `Nội dung của "${title}" không khớp ngữ cảnh.`).toBeTruthy();
        }
    }

    async verifyBodyContentVisible() {
        const sections = [
            {
                h6: "V LEARNING ?",
                h5: "Nơi hội tụ kiến thức",
                keywords: ["giảng dạy", "thú vị", "trực tuyến"],
            },
            {
                h6: "Sứ mệnh V learning",
                h5: "Phương pháp đào tạo hiện đại",
                keywords: ["phương pháp", "đào tạo", "hiện đại"],
            },
            {
                h6: "Tầm nhìn V learning",
                h5: "Đào tạo lập trình chuyên sâu",
                keywords: ["lập trình", "chuyên sâu", "doanh nghiệp"],
            },
        ];

        for (const { h6, h5, keywords } of sections) {
            const sectionH6 = this.page.locator(`h6:has-text("${h6}")`);
            const sectionH5 = sectionH6.locator("xpath=following-sibling::h5[1]");
            const sectionP = sectionH5.locator("xpath=following-sibling::p[1]");

            await expect(sectionH6).toBeVisible({ timeout: 5000 });
            await expect(sectionH5).toBeVisible();
            await expect(sectionP).toBeVisible();

            const text = await sectionP.innerText();
            expect(text.trim().length).toBeGreaterThan(0);

            const matched = keywords.some((kw) =>
                text.toLowerCase().includes(kw.toLowerCase())
            );
            expect(
                matched,
                `Nội dung của phần "${h6}" không khớp với ngữ cảnh.`
            ).toBeTruthy();
        }
    }
    async verifyFooterLinksAndContacts() {
        const footer = this.page.locator("footer");

        const phone = footer.locator("text=1800-123-4567");
        const email = footer.locator("text=devit@gmail.com");
        const location = footer.locator("text=Đà Nẵng");

        await expect(phone).toBeVisible();
        await expect(email).toBeVisible();
        await expect(location).toBeVisible();

        const links = [
            { name: "Trang chủ", href: "/trangchu" },
            { name: "Dịch vụ", href: "/dichvu" },
            { name: "Nhóm", href: "/nhom" },
            { name: "Blog", href: "/blog" },
        ];

        for (const link of links) {
            const element = footer.locator(`a:has-text("${link.name}")`);
            await expect(element).toBeVisible();
            const href = await element.getAttribute("href");
            expect(href).toContain(link.href);
        }

        const courses = ["Front End", "Back End", "Full stack", "Node Js"];
        for (const course of courses) {
            const element = footer.locator(`a:has-text("${course}")`);
            await expect(element).toBeVisible();
        }

        const footerLinks = await footer.locator("a").all();
        for (const link of footerLinks) {
            const href = await link.getAttribute("href");
            if (href && href.startsWith("http")) {
                const response = await this.page.request.get(href);
                expect(
                    response.ok(),
                    `Liên kết ${href} bị lỗi (status ${response.status()})`
                ).toBeTruthy();
            }
        }
    }

}
