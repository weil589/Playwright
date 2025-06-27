import { test, expect, chromium } from '@playwright/test';
import { constants } from 'buffer';

test('Positive Scenario Autehntification', async ({page}) => {
  // Aller à la page de connexion
 

  await page.goto('https://the-internet.herokuapp.com/login');

  // Remplir le formulaire de login
  await page.fill('#username', 'tomsmith');
  
  const user = await page.inputValue('#username');
  // Vérifier que le nom d'utilisateur est correct

  expect(user).toBe('tomsmith');
  console.log('user ok');
  console.log('value entered = '+ user);

  await page.fill('#password', 'SuperSecretPassword!');
 console.log('pw ok');
 await page.screenshot({ path: 'screenshotFormulaire.png' }); // Take screenshot
  // Soumettre le formulaire
  await page.click('button[type="submit"]');
 console.log('submit ok');
  // Vérifier le titre de la page sécurisée
  await expect(page.locator('h2')).toHaveText('Secure Area', { timeout: 10000 });
  await page.screenshot({ path: 'screenshotLogout.png' }); // Take screenshot
  //await page.click('text=More information');      // Click on a link
  

//await page.pause(); 
//await browser.close(); 

});
test('Negative Scenario Autehntification', async ({page}) => {
  // Aller à la page de connexion
 

  await page.goto('https://the-internet.herokuapp.com/login');

  // Remplir le formulaire de login
  await page.fill('#username', 'XXXXX');
  
  const user = await page.inputValue('#username');
  // Vérifier que le nom d'utilisateur est correct

  expect(user).toBe('XXXXX');
  console.log('user ok');
  console.log('value entered = '+ user);

  await page.fill('#password', 'SuperSecretPassword!');
 console.log('pw ok');
 await page.screenshot({ path: 'screenshotFormulaire.png' }); // Take screenshot
  // Soumettre le formulaire
  await page.click('button[type="submit"]');
 console.log('submit ok');

  const errorMessage = await page.locator('#flash').textContent();
  console.log('error message = ' + errorMessage);
  expect(errorMessage).toContain(' Your username is invalid!');
  console.log('error message ok');
 

 
 await page.screenshot({ path: 'screenshotFormulaireNegativeScenario.png' }); // Take screenshot
  // Soumettre le formulaire
});

test('Negative Scenario pw Autehntification', async ({page}) => {
  // Aller à la page de connexion
 

  await page.goto('https://the-internet.herokuapp.com/login');

  // Remplir le formulaire de login
  await page.fill('#username', 'tomsmith');
  
  const user = await page.inputValue('#username');
  // Vérifier que le nom d'utilisateur est correct

  expect(user).toBe('tomsmith');
  console.log('user ok');
  console.log('value entered = '+ user);

  await page.fill('#password', 'SuperSecretPasswordX');
 console.log('pw ok');
 await page.screenshot({ path: 'screenshotFormulaire.png' }); // Take screenshot

  
 // Soumettre le formulaire
  await page.click('button[type="submit"]');
 console.log('submit ok');

  const mauvaisPw = await page.locator('#flash').textContent();
  console.log('error message = ' + mauvaisPw);
  expect(mauvaisPw).toContain(' Your password is invalid');
  console.log('error message ok');
 

  await page.screenshot({ path: 'screenshotLogout.png' }); // Take screenshot
  //await page.click('text=More information');      // Click on a link
  

//await page.pause(); 
//await browser.close(); 

});

