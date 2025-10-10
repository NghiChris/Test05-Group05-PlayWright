import { test } from "@playwright/test";
import { SuggestedTopics } from "@pages/blog/SuggestedTopics";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-033: Kiểm tra hiển thị tiêu đề [Các chủ đề được đề xuất]", async ({
    page,
  }) => {
    const suggestedTopics = new SuggestedTopics(page);

    await suggestedTopics.verifyTitle();
  });

  test("TC-034: Kiểm tra UI của tiêu đề [Các chủ đề được đề xuất]", async ({
    page,
  }) => {
    const suggestedTopics = new SuggestedTopics(page);

    await suggestedTopics.verifyTitleUI();
  });

  test("TC-035: Kiểm tra hiển thị danh sách các chủ đề được đề xuất", async ({
    page,
  }) => {
    const suggestedTopics = new SuggestedTopics(page);

    await suggestedTopics.verifyTopicsListVisible();
  });

  test("TC-036: Kiểm tra UI danh sách các chủ đề được đề xuất", async ({
    page,
  }) => {
    const suggestedTopics = new SuggestedTopics(page);

    await suggestedTopics.verifyTopicsListUI();
  });

  test("TC-037: Kiểm tra liên kết của từng chủ đề được đề xuất", async ({
    page,
  }) => {
    const suggestedTopics = new SuggestedTopics(page);

    await suggestedTopics.verifyTopicsLinks();
  });
});
