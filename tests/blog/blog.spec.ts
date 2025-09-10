import { test, expect } from '@playwright/test';
import { BlogPage } from '../../pages/blog/BlogPage';

test.describe('Blog Page', () => {
  test('should show blog posts', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    const posts = await blog.postList.getPostTitles();
    expect(posts.length).toBeGreaterThan(0);
  });
});
