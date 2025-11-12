import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login'); // abre sempre a página de login
});

// 1️⃣ Login com sucesso
test('Login successful', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/User successfully logged in/i)).toBeVisible();
});

// 2️⃣ Conta bloqueada
test('Block account', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/Blocked account/i)).toBeVisible();
});

// 3️⃣ Usuário inválido
test('Invalid user', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill('testa');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/User not found!/i)).toBeVisible();
});

// 4️⃣ Senha incorreta
test('Wrong password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/Incorrect username or password!/i)).toBeVisible();
});
// 5️⃣ Senha incorreta 3 vezes (bloqueio temporário)
test('Wrong password 3 times (temporary block)', async ({ page }) => {
  // 1ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
  await page.getByRole('button', { name: 'Login' }).click();

  // 2ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
  await page.getByRole('button', { name: 'Login' }).click();

  // 3ª tentativa
  await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Type your password' }).fill('password1');
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
  await page.getByRole('button', { name: 'Login' }).click();

  // Verifica mensagem de bloqueio temporário
  await expect(page.getByText(/User temporarily blocked!/i)).toBeVisible();
}, 15); // Timeout de 60 segundos
