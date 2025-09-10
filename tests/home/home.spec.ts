import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage';

test.describe('Home Page', () => {
  test('should display hero title', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const title = await home.hero.getTitle();
    expect(title).toContain('Welcome'); // ví dụ kiểm tra
  });

  test('should list features', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const features = await home.feature.getFeatures();
    expect(features.length).toBeGreaterThan(0);
  });
});
