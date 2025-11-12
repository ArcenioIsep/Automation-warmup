import { test, expect } from '@playwright/test';
test('Login successful', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/User successfully logged in/i)).toBeVisible();

});

/**
 * now we gonna go to the 2 scenrio to check  block acconnt 
 */
test('Block account ', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/Blocked account/i)).toBeVisible();
});

test('Invalid user', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');
  await page.getByRole('textbox', { name: 'Type your username' }).fill('testa');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/User not found!/i)).toBeVisible();
});

test('Wrong password', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/Incorrect username or password!/i)).toBeVisible();
});
test('Wrong password 3 times (temporary block)', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');
  // 1ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);

  // 2ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);

  // 3ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/User temporarily blocked!/i)).toBeVisible();
});
