import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const base='http://127.0.0.1:4399';
const content=await fetch(`${base}/api/content`).then(response=>response.json());
if(content.realms?.[0]?.phases?.length!==10) throw new Error('As dez fases humanas não chegaram à API.');
if(content.items?.length!==10) throw new Error('O catálogo inicial de itens não chegou à API.');
if(content.characters?.length!==24) throw new Error('O catálogo dos 24 personagens atuais não chegou à API.');
const saveResponse=await fetch(`${base}/api/content`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(content)});
if(!saveResponse.ok) throw new Error(`A gravação local falhou: ${await saveResponse.text()}`);

const browser=await chromium.launch({headless:true});
const qa=path.resolve('backstage','qa'); fs.mkdirSync(qa,{recursive:true});
for(const profile of [
  {name:'desktop',viewport:{width:1440,height:1000}},
  {name:'mobile',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
  const context=await browser.newContext(profile);
  const page=await context.newPage();
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:'Controle o mundo de Ygdria'}).waitFor();
  await page.getByRole('button',{name:/Reinos/}).last().click();
  await page.getByRole('heading',{name:'Reinos e campanhas'}).waitFor();
  await page.locator('details').first().evaluate(node=>node.open=true);
  await page.screenshot({path:path.join(qa,`backstage-${profile.name}.png`),fullPage:true});
  await page.locator('.bottom-nav [data-view="dashboard"]').click();
  await page.locator('[data-view="items"]').click();
  await page.getByRole('heading',{name:'Itens e Loja Real'}).waitFor();
  await page.locator('.bottom-nav [data-view="dashboard"]').click();
  await page.locator('[data-view="menus"]').click();
  await page.getByRole('heading',{name:'Menus do jogo'}).waitFor();
  await page.locator('.bottom-nav').getByRole('button',{name:/Painel/}).click();
  await page.getByRole('button',{name:/Personagens e cartas/}).click();
  await page.getByRole('heading',{name:'Personagens e cartas'}).waitFor();
  if(await page.locator('details.card').count()!==24) throw new Error(`${profile.name}: catálogo visual não exibiu 24 personagens.`);
  if(profile.name==='mobile'){
    await page.locator('details.card').first().evaluate(node=>node.open=true);
    await page.screenshot({path:path.join(qa,'backstage-character-mobile.png'),fullPage:false});
  }
  await page.locator('.bottom-nav').getByRole('button',{name:/Painel/}).click();
  await page.getByRole('button',{name:/Biblioteca de mídia/}).click();
  await page.getByRole('heading',{name:'Biblioteca de mídia'}).waitFor();
  await page.locator('.bottom-nav').getByRole('button',{name:/Publicar/}).click();
  await page.getByRole('heading',{name:'Preparar publicação'}).waitFor();
  if(errors.length) throw new Error(`${profile.name}: ${errors.join('; ')}`);
  await context.close();
}
{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage(); const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${base}/project/play.html?qa=1`,{waitUntil:'networkidle'});
  await page.locator('#mainMenu').waitFor();
  if(errors.length) throw new Error(`prévia do jogo: ${errors.join('; ')}`);
  await context.close();
}
await browser.close();
console.log('Backstage smoke: API, gravação, desktop, mobile e prévia do jogo aprovados.');
