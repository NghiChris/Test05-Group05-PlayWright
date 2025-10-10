import { test } from "@playwright/test";
import BlogPage from "@pages/blog/BlogPage";

test.describe("Blog Page - V Learning", () => {
  test("TC-001 Truy cập trang blog", async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.gotoBlog();
    await blog.verifyPageLoaded();
  });

  test("TC-002 Quan sát tổng thể giao diện", async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.gotoBlog();
    await blog.verifyPageLoaded();
    await blog.scrollThroughPage();
  });
});
