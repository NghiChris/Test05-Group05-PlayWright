import { test } from "@playwright/test";
import PopularCourse from "@pages/home/PopularCourse";

test.describe("Khóa học phổ biến - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-022 Kiểm tra tiêu đề", async ({ page }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyTitleVisible();
  });

  test("TC-023 Kiểm tra chức năng của tiêu đề", async ({ page }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyTitleLink();
  });

  test("TC-024 Kiểm tra hiển thị (UI)", async ({ page }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCoursesDisplayed();
  });

  test("TC-025 Kiểm tra hiển thị hình ảnh của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseImages();
  });

  test("TC-026 Kiểm tra hiển thị tiêu đề của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseTitles();
  });

  test("TC-027 Kiểm tra hiển thị phân loại của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseCategories();
  });

  test("TC-028 Kiểm tra hiển thị giáo viên của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseTeachers();
  });

  test("TC-029 Kiểm tra hiển thị giá của từng khóa học", async ({ page }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCoursePrices();
  });

  test("TC-030 Kiểm tra hiển thị giá cũ, giá mới của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseOldAndNewPrices();
  });

  test("TC-031 Kiểm tra hiển thị điểm đánh giá (rating) của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseRatings();
  });

  test("TC-032 Kiểm tra hiển thị tổng số lượt đánh giá của từng khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseReviewCounts();
  });

  test("TC-034 Kiểm tra chức năng liên kết khi click vào khóa học", async ({
    page,
  }) => {
    const popularCourse = new PopularCourse(page);
    await popularCourse.verifyCourseLinks();
  });
});
