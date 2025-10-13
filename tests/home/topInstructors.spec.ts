import { test } from "@playwright/test";
import TopInstructors from "@pages/home/TopInstructors";

test.describe("Giảng viên hàng đầu - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-089 Kiểm tra hiển thị", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifyInstructorsVisible();
  });

  test("TC-090 Kiểm tra giao diện (UI)", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifyInstructorsUI();
  });

  test("TC-091 Kiểm tra kích thước font chữ", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifyInstructorsFontSize();
  });

  test("TC-092 Kiểm tra khoảng cách text", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifyInstructorsSpacing();
  });

  test("TC-093 Kiểm tra nút slider hiển thị", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifySliderButtonsVisible();
  });

  test("TC-094 Kiểm tra chức năng nút slider", async ({ page }) => {
    const instructors = new TopInstructors(page);
    await instructors.verifySliderButtonFunction();
  });
});
