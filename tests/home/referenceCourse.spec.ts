import { test } from "@playwright/test";
import ReferenceCourse from "@pages/home/ReferenceCourse";

test.describe("Khóa học tham khảo - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-035 Kiểm tra tiêu đề", async ({ page }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyTitleVisible();
  });

  test("TC-036 Kiểm tra chức năng của tiêu đề", async ({ page }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyTitleLink();
  });

  test("TC-037 Kiểm tra hiển thị (UI)", async ({ page }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCoursesDisplayed();
  });

  test("TC-038 Kiểm tra hiển thị hình ảnh của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseImages();
  });

  test("TC-039 Kiểm tra hiển thị tiêu đề của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseTitles();
  });

  test("TC-040 Kiểm tra tên của từng khóa học", async ({ page }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyUniqueCourseTitles();
  });

  test("TC-041 Kiểm tra hiển thị phân loại của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseCategories();
  });

  test("TC-042 Kiểm tra hiển thị số giờ học của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseHours();
  });

  test("TC-043 Kiểm tra hiển thị tổng thời gian học của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseTotalDuration();
  });

  test("TC-044 Kiểm tra hiển thị trình độ của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseLevels();
  });

  test("TC-045 Kiểm tra hiển thị giáo viên của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseTeachers();
  });

  test("TC-046 Kiểm tra hiển thị giá của từng khóa học", async ({ page }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCoursePrices();
  });

  test("TC-047 Kiểm tra hiển thị giá cũ, giá mới của từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseOldAndNewPrices();
  });

  test("TC-050 Kiểm tra chức năng khi hover lên từng khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseHoverShowsSubCard();
  });

  test("TC-051 Kiểm tra hiển thị tên của khóa học trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifySubCardCourseTitlesOnHover();
  });

  test("TC-052 Kiểm tra tên trong card chính và bảng chi tiết khi hover có khớp nhau", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyMainAndSubCardCourseTitlesMatch();
  });

  test("TC-053 Kiểm tra hiển thị avatar và tên giáo viên trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyMainSubCardTeachersMatch();
  });

  test("TC-054 Kiểm tra icon và số giờ học trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyMainSubCardStudyHoursMatch();
  });

  test("TC-055 Kiểm tra icon và tổng thời gian trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyMainSubCardTotalTimeMatch();
  });

  test("TC-056 Kiểm tra icon và level trong bảng chi tiết khi hover", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyMainSubCardLevelMatch();
  });

  test('TC-057 Kiểm tra hiển thị nút "Xem chi tiết" trong bảng chi tiết khi hover', async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifySubCardViewDetailButton();
  });

  test('TC-058 Kiểm tra chức năng nút "Xem chi tiết" trong bảng chi tiết khi hover', async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifySubCardViewDetailButtonNavigation();
  });

  test("TC-059 Kiểm tra chức năng liên kết khi click vào tên của khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseLinks();
  });

  test("TC-060 Kiểm tra chức năng liên kết khi click vào khóa học", async ({
    page,
  }) => {
    const referenceCourse = new ReferenceCourse(page);
    await referenceCourse.verifyCourseDetailContent();
  });
});
