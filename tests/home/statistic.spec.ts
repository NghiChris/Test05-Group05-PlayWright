import { test } from "@playwright/test";
import Statistic from "@pages/home/Statistic";

test.describe("Phần Thống Kê - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-087 Kiểm tra hiển thị", async ({ page }) => {
    const statistic = new Statistic(page);
    await statistic.verifyVisible();
  });

  test("TC-088 Kiểm tra giao diện (UI)", async ({ page }) => {
    const statistic = new Statistic(page);
    await statistic.verifyUI();
  });
});
