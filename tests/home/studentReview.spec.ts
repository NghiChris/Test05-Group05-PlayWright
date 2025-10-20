import { test } from "@playwright/test";
import StudentReview from "@pages/home/StudentReview";

test.describe("Review của học viên - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-095 Kiểm tra hiển thị", async ({ page }) => {
    const studentReview = new StudentReview(page);
    await studentReview.verifyReviewsVisible();
  });

  test("TC-096 Kiểm tra giao diện (UI)", async ({ page }) => {
    const studentReview = new StudentReview(page);
    await studentReview.verifyReviewsUI();
  });
});
