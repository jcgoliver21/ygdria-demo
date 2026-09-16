import {chromium} from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.STUDIO_BASE||'http://127.0.0.1:4401/backstage/public/';
const browser=await chromium.launch();
fs.mkdirSync('backstage/qa',{recursive:true});
try{
for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto(base,{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:'Controle o mundo de Ygdria'}).waitFor();
  await page.getByRole('button',{name:/Personagens e cartas/}).click();
  assert.equal(await page.locator('details.card').count(),24);
  await page.locator('details.card').first().locator('summary').first().click();
  await page.locator('details.card').first().locator('details summary').first().click();
  await page.getByRole('button',{name:'Prévia animada'}).first().click();
  await page.locator('canvas').first().waitFor({state:'visible'});
  await page.screenshot({path:`backstage/qa/studio-${width}.png`,fullPage:false});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByRole('button',{name:'Duplicar personagem'}).first().click();
  assert.equal(await page.locator('details.card').count(),25);
  await page.locator('.bottom-nav [data-view="studio"]').click();
  await page.locator('[data-path="editorNotes"]').fill('Teste de recuperação');
  await page.getByRole('button',{name:'Criar ponto de recuperação'}).click();
  await page.locator('#saveBtn').click();
  await page.reload({waitUntil:'networkidle'});
  await page.locator('.bottom-nav [data-view="studio"]').click();
  assert.equal(await page.locator('[data-path="editorNotes"]').inputValue(),'Teste de recuperação');
  const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar pacote com mídias'}).click();
  const download=await downloadPromise;const bundle=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(bundle.content.characters.length,25);
  await page.locator('#importProject').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(bundle))});
  await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Importado'));
  assert.deepEqual(errors,[]);
  await page.screenshot({path:`backstage/qa/oficina-${width}.png`,fullPage:false});
  if(!process.env.STUDIO_BASE){await context.setOffline(true);await page.reload();await page.getByRole('heading',{name:'Controle o mundo de Ygdria'}).waitFor();}
  await context.close();
}
console.log('Studio: desktop/mobile, sprites, duplicação, persistência, exportação, importação e offline aprovados.');
}finally{await browser.close();}
