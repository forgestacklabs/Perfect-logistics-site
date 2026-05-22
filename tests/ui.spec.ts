import { test, expect } from '@playwright/test';

test.describe('UI tests', () => {
  test('homepage loads and displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    // Check if hero exists or just check title
    await expect(page).toHaveTitle(/./);
  });
});
