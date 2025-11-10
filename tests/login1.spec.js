import test, { expect } from "@playwright/test";


test('Login sucessful', async ({page})=>{

    await page.goto('https://playground-drab-six.vercel.app/login');
    await page.getByRole('textbox', {name: 'Type your username'}).fill('test');
    await page.getByRole('textbox', {name: 'Type your password'}).fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('User successfully logged in!')).toBeVisible();
});