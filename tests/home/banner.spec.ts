import { test, expect } from "@playwright/test";
import Banner from "@pages/home/Banner";

test.describe("Banner - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-016 Kiểm tra tiêu đề chính (Hero title)", async ({ page }) => {
    const banner = new Banner(page);
    await banner.verifyHeroTitleVisible();
    await banner.verifyHeroTitleText([
      "Chào mừng",
      "đến với môi trường",
      "Vlearning",
    ]);
  });

  test("TC-017 Kiểm tra hiển thị nút [Bắt Đâu Nào]", async ({ page }) => {
    const banner = new Banner(page);
    await banner.verifyStartButtonVisible();
    await banner.verifyStartButtonColors(
      "rgb(246, 186, 53)",
      "rgb(255, 255, 255)"
    );
  });

  test("TC-018 Kiểm tra liên kết nút [Bắt Đâu Nào] trên banner", async ({
    page,
  }) => {
    const banner = new Banner(page);
    await banner.startButton.click();
    await expect(page).toHaveURL(/\/khoahoc/);
  });
});
