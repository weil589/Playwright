import { test, expect } from '@playwright/test';

test('Authentification RDQ réussie', async ({ page }) => {
  await page.goto('https://rdqreact.test.cat-amania.net');
  await expect(page).toHaveURL('https://rdqreact.test.cat-amania.net/'); 
  await page.waitForTimeout(1000); // Attendre que la page se charge 

  await page.waitForSelector('#email');
  await page.fill('#email', 'c.authier@cat-amania.com');
    await page.waitForTimeout(1000); // Attendre que la page se charge 
  await page.fill('#password', 'test');
  await page.waitForTimeout(1000); // Attendre que la page se charge

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000); // Attendre que la page se charge


  await page.waitForURL('https://rdqreact.test.cat-amania.net/');
  await expect(page).toHaveURL('https://rdqreact.test.cat-amania.net/');
  await page.waitForTimeout(1000); // Attendre que la page se charge

  await page.waitForSelector('text=Liste des RDQ', { timeout: 10000 });
  const rdqList = await page.locator('text=Liste des RDQ').textContent();
  expect(rdqList).toContain('Liste des RDQ'); 
  console.log('Authentification réussie, liste des RDQ affichée :', rdqList);

});
