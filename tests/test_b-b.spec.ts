import { test, expect } from '@playwright/test';

test('Connexion + accès création RDQ', async ({ page }) => {
  await page.goto('https://rdqreact.test.cat-amania.net');

  await page.getByLabel('Email').fill('c.authier@cat-amania.com');
    await page.waitForTimeout(1000); // Attendre que la page se charge 

  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'SIGN IN' }).click();
    await page.waitForTimeout(1000); // Attendre que la page se charge 


 await page.waitForURL('https://rdqreact.test.cat-amania.net/');
  await expect(page).toHaveURL('https://rdqreact.test.cat-amania.net/');
  await page.waitForTimeout(1000); // Attendre que la page se charge

  await page.waitForSelector('text=Liste des RDQ', { timeout: 10000 });
  const rdqList = await page.locator('text=Liste des RDQ').textContent();
  expect(rdqList).toContain('Liste des RDQ'); 
  console.log('Authentification réussie, liste des RDQ affichée :', rdqList);

    await page.waitForTimeout(1000); // Attendre que la page se charge 

  // Screenshot de debug
  await page.screenshot({ path: 'debug-page.png', fullPage: true });

  // Pause volontaire
  await page.waitForTimeout(5000);

  // Ciblage plus large du bouton "AddIcon"
  await page.waitForTimeout(2000); // délai pour laisser l'affichage complet

  //Vérifie si le bouton existe dans le DOM (même masqué)

  const boutonAjouter = page.locator('button:has([data-testid="AddIcon"])');
console.log(await boutonAjouter.count()); // Affiche combien de boutons Playwright détecte

//Forcer un waitForSelector explicite avec timeout plus long
await page.waitForSelector('button:has([data-testid="AddIcon"])', { timeout: 10000 });
await page.locator('button:has([data-testid="AddIcon"])').click();


//Faire un screenshot avant de cliquer
await page.screenshot({ path: 'debug-bouton-avant.png', fullPage: true });

// Clic sur le bouton "ajouter" par l'icône
await boutonAjouter.click();

// Vérifie que la page "Création de RDQ" s'affiche
await expect(page.locator('h1')).toContainText('Création de RDQ');
});
