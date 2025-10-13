import { test, expect } from "@playwright/test";
import Footer from "@pages/common/Footer";
import FooterConsultForm from "@pages/common/FooterConsultForm";
import FooterCopyright from "@pages/common/FooterCopyright";
import FooterSocials from "@pages/common/FooterSocials";
import BackToTop from "@pages/common/BackToTop";

test.describe("Footer - V Learning", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-097 Kiểm tra hiển thị Footer", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyVisible(footer.root);
  });

  test("TC-098 Kiểm tra hiển thị của logo", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyVisible(footer.logo);
  });

  test("TC-099 Kiểm tra liên kết của logo", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyHasLink(footer.logo, "");
  });

  test("TC-100 Kiểm tra hiển thị số điện thoại", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyVisible(footer.phone);
  });

  test("TC-101 Kiểm tra chức năng số điện thoại", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyPhoneLink(footer.phone);
  });

  test("TC-102 Kiểm tra hiển thị Email", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyVisible(footer.email);
  });

  test("TC-103 Kiểm tra chức năng Email", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyEmailLink(footer.email);
  });

  test("TC-104 Kiểm tra hiển thị Địa chỉ", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyVisible(footer.address);
  });

  test("TC-105 Kiểm tra chức năng Địa chỉ", async ({ page }) => {
    const footer = new Footer(page);
    const href = await footer.address.locator("a").getAttribute("href");
    if (href) expect(href).toContain("maps");
  });

  test("TC-106 Kiểm tra hiển thị của menu điều hướng", async ({ page }) => {
    const footer = new Footer(page);
    const menus = await footer.getMenus();
    expect(menus.length).toBeGreaterThan(0);
  });

  test("TC-107 Kiểm tra liên kết của menu điều hướng", async ({ page }) => {
    const footer = new Footer(page);
    const menus = await footer.getMenus();
    for (let i = 0; i < menus.length; i++) {
      const link = await menus[i].locator("a").getAttribute("href");
      expect(link).not.toBeNull();
    }
  });

  test("TC-108 Kiểm tra hiển thị form 'Đăng ký tư vấn'", async ({ page }) => {
    const form = new FooterConsultForm(page);
    await form.verifyVisible(form.root);
  });

  test("TC-109 Kiểm tra hiển thị placeholder của input", async ({ page }) => {
    const form = new FooterConsultForm(page);
    await form.verifyPlaceholders();
  });

  test("TC-110 Kiểm tra hiển thị nút [Đăng ký]", async ({ page }) => {
    const form = new FooterConsultForm(page);
    await form.verifyVisible(form.submitBtn);
  });

  test("TC-111 - Kiểm tra bắt buộc nhập khi bỏ trống form (Block / Fail)", async ({
    page,
  }) => {
    const form = new FooterConsultForm(page);
    // Case này hiện tại button không hoạt động => không test được
    test.skip(
      true,
      "Button đăng ký không hoạt động, cannot test empty submission"
    );
  });

  // Những case TC-112 → TC-119 đều tương tự: skip / block

  test("TC-120 Kiểm tra hiển thị", async ({ page }) => {
    const footer = new FooterCopyright(page);
    await footer.verifyVisible();
  });

  test("TC-121 Kiểm tra vị trí hiển thị (canh giữa theo chiều dọc)", async ({
    page,
  }) => {
    const footer = new FooterCopyright(page);
    await footer.verifyCenteredVertically();
  });

  test("TC-122 Kiểm tra hiển thị Socials", async ({ page }) => {
    const socials = new FooterSocials(page);
    await socials.verifyVisible();
  });

  test("TC-123 Kiểm tra vị trí hiển thị Socials (canh giữa theo chiều dọc)", async ({
    page,
  }) => {
    const socials = new FooterSocials(page);
    await socials.verifyCenteredVertically();
  });

  test("TC-124 Kiểm tra giao diện (UI) của socials", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
    const socials = new FooterSocials(page);
    await socials.verifyIconsCount(3);
    await socials.verifyIconsStyle();
    await socials.verifyIconsSpacing(10);
  });

  test("TC-125 Kiểm tra liên kết từng Social", async ({ page }) => {
    const socials = new FooterSocials(page);
    await socials.verifyIconsLinks();
  });

  test("TC-126 Kiểm tra hiển thị", async ({ page }) => {
    const btn = new BackToTop(page);
    await btn.verifyVisible();
  });

  test("TC-127 Kiểm tra giao diện (UI)", async ({ page }) => {
    const btn = new BackToTop(page);
    await btn.verifyUI();
  });

  test("TC-128 Kiểm tra chức năng Back to Top", async ({ page }) => {
    const btn = new BackToTop(page);
    await btn.clickAndVerifyScrollTop();
  });
});
