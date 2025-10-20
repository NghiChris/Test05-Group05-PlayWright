import { test } from "@playwright/test";
import ReactCourse from "@pages/home/ReactCourse";

test.describe("Khóa học Front End React Js - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-061 Kiểm tra tiêu đề", async ({ page }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyTitleVisible();
  });

  test("TC-062 Kiểm tra chức năng của tiêu đề", async ({ page }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyTitleLink();
  });

  test("TC-063 Kiểm tra hiển thị (UI)", async ({ page }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCoursesDisplayed();
  });

  test("TC-064 Kiểm tra hiển thị hình ảnh của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseImages();
  });

  test("TC-065 Kiểm tra hiển thị tiêu đề của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseTitles();
  });

  test("TC-066 Kiểm tra tên của từng khóa học", async ({ page }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyUniqueCourseTitles();
  });

  test("TC-067 Kiểm tra hiển thị phân loại của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseCategories();
  });

  test("TC-068 Kiểm tra hiển thị số giờ học của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseHours();
  });

  test("TC-069 Kiểm tra hiển thị tổng thời gian học của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseTotalDuration();
  });

  test("TC-070 Kiểm tra hiển thị trình độ của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseLevels();
  });

  test("TC-071 Kiểm tra hiển thị giáo viên của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseTeachers();
  });

  test("TC-072 Kiểm tra hiển thị giá của từng khóa học", async ({ page }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCoursePrices();
  });

  test("TC-073 Kiểm tra hiển thị giá cũ, giá mới của từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseOldAndNewPrices();
  });

  test("TC-076 Kiểm tra chức năng khi hover lên từng khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseHoverShowsSubCard();
  });

  test("TC-077 Kiểm tra hiển thị tên của khóa học trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifySubCardCourseTitlesOnHover();
  });

  test("TC-078 Kiểm tra tên trong card chính và bảng chi tiết khi hover có khớp nhau", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyMainAndSubCardCourseTitlesMatch();
  });

  test("TC-079 Kiểm tra hiển thị avatar và tên giáo viên trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyMainSubCardTeachersMatch();
  });

  test("TC-080 Kiểm tra icon và số giờ học trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyMainSubCardStudyHoursMatch();
  });

  test("TC-081 Kiểm tra icon và tổng thời gian trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyMainSubCardTotalTimeMatch();
  });

  test("TC-082 Kiểm tra icon và level trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyMainSubCardLevelMatch();
  });

  test('TC-083 Kiểm tra hiển thị nút "Xem chi tiết" trong bảng chi tiết khi hover', async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifySubCardViewDetailButton();
  });

  test('TC-084 Kiểm tra chức năng nút "Xem chi tiết" trong bảng chi tiết khi hover', async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifySubCardViewDetailButtonNavigation();
  });

  test("TC-085 Kiểm tra chức năng liên kết khi click vào tên của khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseLinks();
  });

  test("TC-086 Kiểm tra chức năng liên kết khi click vào khóa học", async ({
    page,
  }) => {
    const reactCourse = new ReactCourse(page);
    await reactCourse.verifyCourseDetailContent();
  });
});
