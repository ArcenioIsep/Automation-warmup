import { test, expect } from '@playwright/test';
import { USERS } from './data/test.data';

test.beforeEach(async ({ page }) => {
  await page.goto('/login'); // 👉 /login é adicionado ao baseURL
});

test('Login successful', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.valid.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.valid.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(USERS.valid.expectedMessage)).toBeVisible();

});

/**
 * now we gonna go to the 2 scenrio to check  block acconnt 
 */
test('Block account ', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.blocked.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.blocked.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(USERS.blocked.expectedMessage)).toBeVisible();
});


test('Invalid user', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.invalid.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.invalid.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(USERS.invalid.expectedMessage)).toBeVisible();
});

test('Wrong password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.wrongPassword.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.wrongPassword.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(USERS.wrongPassword.expectedMessage)).toBeVisible();
});


test('Wrong password 3 times (temporary block)', async ({ page }) => {
 // await page.goto('https://playground-drab-six.vercel.app/login');
  // 1ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.temporaryBlock.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.temporaryBlock.password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  // 2ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.temporaryBlock.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.temporaryBlock.password);
  await page.getByRole('button', { name: 'Login' }).click();


  // 3ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.temporaryBlock.username);
  await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.temporaryBlock.password);
  await page.getByRole('button', { name: 'Login' }).click();

  
  await expect(page.getByText(USERS.temporaryBlock.expectedMessage)).toBeVisible();
});
