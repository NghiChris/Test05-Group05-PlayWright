import { test } from "@playwright/test";
import CourseInfo from "@pages/home/CourseInfo";

test.describe("Thông tin khóa học - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-019 Kiểm tra hiển thị phần thông tin khóa học", async ({ page }) => {
    const courseInfo = new CourseInfo(page);
    await courseInfo.verifyAllSectionsVisible();
  });

  test("TC-020 Kiểm tra UI phần thông tin khóa học", async ({ page }) => {
    const courseInfo = new CourseInfo(page);
    await courseInfo.verifyUI();
  });

  test("TC-021 Kiểm tra tiêu đề và nội dung mô tả từng mục", async ({
    page,
  }) => {
    const courseInfo = new CourseInfo(page);
    await courseInfo.verifyContent();
  });
});
