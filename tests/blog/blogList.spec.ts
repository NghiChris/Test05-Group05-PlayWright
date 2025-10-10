import { test } from "@playwright/test";
import BlogList from "@pages/blog/BlogList";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded", timeout: 90000 });
  });

  test("TC-017: Kiểm tra hiển thị danh sách bài viết", async ({ page }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogListVisible();
  });

  test("TC-018: Kiểm tra hiển thị hình ảnh của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyAllBlogImages();
  });

  test("TC-019: Kiểm tra liên kết hình ảnh của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyImageLinks();
  });

  test("TC-020: Kiểm tra hiển thị tên của từng bài viết", async ({ page }) => {
    const blogList = new BlogList(page);

    await blogList.verifyAllBlogTitles();
  });

  test("TC-021: Kiểm tra liên kết tên của từng bài viết", async ({ page }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogTitleLinks();
  });

  test("TC-022: Kiểm tra hiển thị số lượt like của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogLikes();
  });

  test("TC-023: Kiểm tra hiển thị số bình luận của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogComments();
  });

  test("TC-024: Kiểm tra hiển thị số lượt xem của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogViews();
  });

  test("TC-025: Kiểm tra hiển thị tên tác giả của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogAuthors();
  });

  test("TC-026: Kiểm tra UI phần tên tác giả của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogAuthorUI();
  });

  test("TC-027: Kiểm tra hiển thị mô tả ngắn của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogDescriptions();
  });

  test("TC-028: Kiểm tra UI phần mô tả ngắn của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogDescriptionUI();
  });

  test("TC-029: Kiểm tra hiển thị nút [Xem Thêm] của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogReadMoreButtons();
  });

  test("TC-030: Kiểm tra UI nút [Xem Thêm] của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogReadMoreButtonsUI();
  });

  test("TC-031: Kiểm tra liên kết nút [Xem Thêm] của từng bài viết", async ({
    page,
  }) => {
    const blogList = new BlogList(page);

    await blogList.verifyBlogReadMoreLinks();
  });
});
