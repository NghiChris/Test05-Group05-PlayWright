import { test } from "@playwright/test";
import HomePage from "@pages/home/HomePage";

test.describe("Home Page - V Learning", () => {
  test("TC-001 Truy cập trang chủ", async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.verifyPageLoaded();
  });

  test("TC-002 Quan sát tổng thể giao diện", async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.verifyPageLoaded();
    await home.scrollThroughPage();
  });
});
