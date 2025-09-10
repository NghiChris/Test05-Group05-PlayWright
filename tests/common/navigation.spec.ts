import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage';

test('navigation menu works', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.header.navigateTo('Blog');
  await expect(page).toHaveURL(/.*blog/);
});
