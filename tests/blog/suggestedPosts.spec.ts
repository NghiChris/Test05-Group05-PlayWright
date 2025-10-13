import { test } from "@playwright/test";
import { SuggestedPosts } from "@pages/blog/SuggestedPosts";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-038: Kiểm tra hiển thị tiêu đề [Bài đăng được đề xuất]", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyTitle();
  });

  test("TC-039: Kiểm tra UI của tiêu đề [Các chủ đề được đề xuất]", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyTitleUI();
  });

  test("TC-040 - Kiểm tra hiển thị của danh sách bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostsVisible();
  });

  test("TC-041 - Kiểm tra hiển thị tên của từng bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostTitlesVisible();
  });

  test("TC-042 - Kiểm tra UI cho tên của từng bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostTitlesUI();
  });

  test("TC-043 - Kiểm tra liên kết tiêu đề của bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostTitlesLinks();
  });

  test("TC-044 - Kiểm tra hiển thị mô tả ngắn của bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostDescriptionsVisible();
  });

  test("TC-045 - Kiểm tra UI phần mô tả ngắn của bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostDescriptionsUI();
  });

  test("TC-046 - Kiểm tra hiển thị tên tác giả của bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostAuthorsVisible();
  });

  test("TC-047 - Kiểm tra UI phần tên tác giả của bài đăng được đề xuất", async ({
    page,
  }) => {
    const suggestedPosts = new SuggestedPosts(page);

    await suggestedPosts.verifyPostAuthorsUI();
  });
});
