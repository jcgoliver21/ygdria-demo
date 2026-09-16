import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];let submissions=0;
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{for(const name of ['prompt','confirm','alert'])window[name]=()=>{throw new Error(name+'() is not supported.');};});
  await page.route('**/api/publish',async route=>{
    submissions++;const body=route.request().postDataJSON();assert.equal(body.confirm,true);assert.equal(body.message,'Teste de publicação editável');
    await route.fulfill({json:{ok:true,published:false,message:'Fluxo de publicação validado (sem envio).'}});
  });
  await page.goto(process.env.BACKSTAGE_TEST_URL||'http://127.0.0.1:4400/',{waitUntil:'networkidle'});
  await page.locator('.bottom-nav [data-view="release"]').click();
  await page.getByRole('button',{name:'Publicar no site',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Cancelar'}).click();assert.equal(submissions,0);
  await page.getByRole('button',{name:'Publicar no site',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Confirmar',exact:true}).click();
  await page.getByRole('dialog').getByRole('textbox').fill('Teste de publicação editável');
  await page.getByRole('dialog').getByRole('button',{name:'Confirmar',exact:true}).click();
  await page.getByText('Fluxo de publicação validado (sem envio).',{exact:true}).waitFor();
  assert.equal(submissions,1);assert.deepEqual(errors,[]);
  console.log('Publicação: cancelar, confirmar e descrever sem prompt/confirm/alert nativos; nenhum envio real.');
}finally{await browser.close();}
