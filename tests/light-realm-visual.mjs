import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'tmp','light-realm-qa');
const baseUrl=(process.env.BASE_URL||'http://127.0.0.1:4177').replace(/\/$/,'');
fs.mkdirSync(output,{recursive:true});

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const consoleErrors=[];
const resourceFailures=[];
page.on('console',message=>{if(message.type()==='error') consoleErrors.push(message.text())});
page.on('pageerror',error=>consoleErrors.push(error.message));
page.on('response',response=>{if(response.status()>=400) resourceFailures.push(`${response.status()} ${response.url()}`)});

await page.goto(`${baseUrl}/index.html?light-realm-gate=1`,{waitUntil:'domcontentloaded'});
await page.evaluate(()=>sessionStorage.setItem('ygdria_gate','ok'));
await page.goto(`${baseUrl}/previews/reino-luz-elenco-v1.html?visual-qa=3`,{waitUntil:'networkidle'});
await page.waitForSelector('.light-preview-card:nth-child(11)');
assert.equal(await page.locator('.light-preview-card').count(),11);
assert.match(await page.locator('#status').innerText(),/66 folhas quadro a quadro/);

const benchmark=page.locator('.benchmark');
for(const sprite of [page.locator('#humanBenchmark'),page.locator('#lightBenchmark')]){
  const box=await sprite.boundingBox();
  assert.ok(box&&Math.abs(box.width-box.height)<1,`célula deformada: ${JSON.stringify(box)}`);
}
await benchmark.screenshot({path:path.join(output,'benchmark-idle-desktop.png')});
const before=await page.locator('#lightBenchmark').evaluate(element=>({image:getComputedStyle(element).backgroundImage,position:getComputedStyle(element).backgroundPosition}));
await page.locator('#benchmarkActions button[data-action="attack"]').click();
await page.waitForTimeout(180);
const during=await page.locator('#lightBenchmark').evaluate(element=>({image:getComputedStyle(element).backgroundImage,position:getComputedStyle(element).backgroundPosition}));
assert.match(during.image,/cael\/attack\/processed\/sheet-transparent\.png/);
assert.notEqual(during.image,before.image);
assert.notEqual(during.position,'0% 0%');
await benchmark.screenshot({path:path.join(output,'benchmark-attack-desktop.png')});

const cards=page.locator('.light-preview-card');
for(let index=0;index<11;index+=1){
  const card=cards.nth(index);
  const sprite=card.locator('.sprite');
  const idleImage=await sprite.evaluate(element=>getComputedStyle(element).backgroundImage);
  await card.locator('button[data-action="cast"]').click();
  await page.waitForTimeout(170);
  const cast=await sprite.evaluate(element=>({image:getComputedStyle(element).backgroundImage,position:getComputedStyle(element).backgroundPosition}));
  assert.match(cast.image,/\/cast\/processed\/sheet-transparent\.png/);
  assert.notEqual(cast.image,idleImage);
  assert.notEqual(cast.position,'0% 0%');
}

const firstCard=cards.first();
const haloAnimation=await firstCard.locator('.gallery-thumb-wrap').evaluate(element=>getComputedStyle(element,'::before').animationName);
const sweepAnimation=await firstCard.locator('.gallery-thumb-wrap').evaluate(element=>getComputedStyle(element,'::after').animationName);
assert.equal(haloAnimation,'lightCardHalo');
assert.equal(sweepAnimation,'lightCardSweep');
await page.locator('.roster').screenshot({path:path.join(output,'roster-desktop.png')});

await page.setViewportSize({width:390,height:844});
await page.locator('body').evaluate(()=>scrollTo(0,0));
await benchmark.screenshot({path:path.join(output,'benchmark-mobile.png')});

await page.setViewportSize({width:1440,height:1000});
await page.evaluate(()=>{
  localStorage.setItem('12r_motion','full');
  localStorage.setItem('12r_tutorial_seen','true');
  localStorage.setItem('12r_tutorial','1');
});
await page.goto(`${baseUrl}/play.html?qa=light-realm-runtime`,{waitUntil:'networkidle'});
await page.waitForSelector('body[data-game-ready="1"]');
await page.waitForTimeout(650);
await page.locator('#galleryBtn').click();
await page.locator('#libraryTabs [data-library="cards"]').click();
const lightDeck=page.locator('.deck-section.deck-luz');
await lightDeck.waitFor();
await lightDeck.locator('.deck-header').click();
const canonicalIds=['cael','aelius','orion','adriel-aspirante','arneth','leonis','aarthas','galatas','adriel-cavaleiro','galateia-rainha','aarthas-darke'];
const runtimeIds=await lightDeck.locator('.gallery-card[data-character-id]').evaluateAll((cards,ids)=>cards.map(card=>card.dataset.characterId).filter(id=>ids.includes(id)),canonicalIds);
assert.deepEqual(runtimeIds,canonicalIds,'a galeria alterou a ordem canônica do Reino da Luz');
const caelCard=lightDeck.locator('.gallery-card').filter({hasText:'Cael'}).first();
await caelCard.locator('.gallery-zoom').click();
const modal=page.locator('#cardModal');
await modal.waitFor({state:'visible'});
assert.equal(await modal.getAttribute('data-realm'),'luz');
assert.equal(await page.locator('#motionShowcase').isVisible(),true);

const runtimeAvatar=page.locator('#motionShowcaseAvatar');
const runtimeSheet=()=>runtimeAvatar.locator('.hero-sprite-sheet.grid-sheet');
await page.locator('#motionShowcaseActions button[data-motion="attack"]').click();
await page.waitForFunction(()=>document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet')?.dataset.hitSrc?.includes('/cael/attack/processed/sheet-transparent.png'));
const attackSheet=runtimeSheet();
const attackStart=await attackSheet.evaluate(element=>({
  src:element.dataset.hitSrc,
  x:element.style.getPropertyValue('--sprite-bg-x'),
  y:element.style.getPropertyValue('--sprite-bg-y')
}));
await page.waitForFunction(()=>{
  const element=document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet');
  return element&&(element.style.getPropertyValue('--sprite-bg-x')!=='0%'||element.style.getPropertyValue('--sprite-bg-y')!=='0%');
});
const attackDuring=await attackSheet.evaluate(element=>({
  x:element.style.getPropertyValue('--sprite-bg-x'),
  y:element.style.getPropertyValue('--sprite-bg-y')
}));
assert.match(attackStart.src,/cael\/attack\/processed\/sheet-transparent\.png/);
assert.notDeepEqual(attackDuring,{x:attackStart.x,y:attackStart.y});
const runtimeVfx=page.locator('#motionShowcaseVfx');
assert.match(await runtimeVfx.evaluate(element=>element.style.backgroundImage),/v11-review\/human\/galateia-jovem\/attack/);
assert.match(await runtimeVfx.evaluate(element=>element.style.getPropertyValue('--showcase-fx-filter')),/255,239,166/);
assert.equal(await runtimeVfx.getAttribute('data-source-anchor'),'motionShowcaseAvatar');
assert.equal(await runtimeVfx.getAttribute('data-target-anchor'),'motionShowcaseTarget');
await page.locator('.card-modal-inner').screenshot({path:path.join(output,'runtime-cael-attack.png')});

await page.locator('#motionShowcaseActions button[data-motion="cast"]').click();
await page.waitForFunction(()=>document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet')?.dataset.hitSrc?.includes('/cael/cast/processed/sheet-transparent.png'));
assert.match(await runtimeSheet().getAttribute('data-hit-src'),/cael\/cast\/processed\/sheet-transparent\.png/);
assert.match(await runtimeVfx.evaluate(element=>element.style.backgroundImage),/v12-magic\/humanos\/galateia-jovem\/cast/);
assert.equal(await page.locator('#motionShowcaseAura').getAttribute('class').then(value=>value.includes('active')),true);
await page.locator('.card-modal-inner').screenshot({path:path.join(output,'runtime-cael-cast.png')});
await page.locator('#closeCardModal').click();

for(const id of canonicalIds.slice(1)){
  await lightDeck.locator(`.gallery-card[data-character-id="${id}"] .gallery-zoom`).click();
  await modal.waitFor({state:'visible'});
  assert.equal(await modal.getAttribute('data-realm'),'luz');
  await page.locator('#motionShowcaseActions button[data-motion="attack"]').click();
  await page.waitForFunction(characterId=>document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet')?.dataset.hitSrc?.includes(`/${characterId}/attack/processed/sheet-transparent.png`),id);
  assert.match(await runtimeVfx.evaluate(element=>element.style.backgroundImage),/v11-review\/human\/galateia-jovem\/attack/);
  assert.match(await runtimeVfx.evaluate(element=>element.style.getPropertyValue('--showcase-fx-filter')),/255,239,166/);
  await page.locator('#motionShowcaseActions button[data-motion="cast"]').click();
  await page.waitForFunction(characterId=>document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet')?.dataset.hitSrc?.includes(`/${characterId}/cast/processed/sheet-transparent.png`),id);
  assert.match(await runtimeVfx.evaluate(element=>element.style.backgroundImage),/v12-magic\/humanos\/galateia-jovem\/cast/);
  if(id==='aarthas-darke'){
    await page.locator('.card-modal-inner').screenshot({path:path.join(output,'runtime-aarthas-darke-cast.png')});
    for(const action of ['idle','hit','victory','defeat','attack']){
      await page.locator(`#motionShowcaseActions button[data-motion="${action}"]`).click();
      await page.waitForFunction(({characterId,motion})=>document.querySelector('#motionShowcaseAvatar .hero-sprite-sheet.grid-sheet')?.dataset.hitSrc?.includes(`/${characterId}/${motion}/processed/sheet-transparent.png`),{characterId:id,motion:action});
      if(action==='idle') await page.locator('.card-modal-inner').screenshot({path:path.join(output,'runtime-aarthas-darke-idle.png')});
    }
    await page.locator('.card-modal-inner').screenshot({path:path.join(output,'runtime-aarthas-darke-attack.png')});
  }
  await page.locator('#closeCardModal').click();
}

// A galeria usa uma escala própria. Conferir também o tamanho real no
// campo de batalha móvel, com os onze personagens em grupos jogáveis.
await page.setViewportSize({width:390,height:844});
const battleGroups=[
  canonicalIds.slice(0,4),
  canonicalIds.slice(4,8),
  [...canonicalIds.slice(8),canonicalIds[0]],
  ['cedric','cael','galateia-rainha','aarthas-darke'],
  ['aarthas-darke','adriel-cavaleiro','adriel-aspirante','adriel-jovem']
];
for(let group=0;group<battleGroups.length;group+=1){
  const ids=battleGroups[group];
  const measures=await page.evaluate(characterIds=>{
    chosenIds=characterIds.map(id=>KINGDOMS.findIndex(character=>character.id===id));
    beginGame(0);
    skipStory();
    ACTIVE=[...chosenIds];
    renderPartyArena();
    applyBattleFormation();
    return characterIds.map(id=>{
      const unit=document.getElementById(`party-${id}`);
      const sheet=unit?.querySelector('.hero-sprite-sheet');
      return {id,visible:!!sheet,artScale:unit?.style.getPropertyValue('--unit-art-scale'),motionScale:sheet?.style.getPropertyValue('--sprite-scale'),facing:unit?.dataset.facing,flipped:sheet?.classList.contains('flip')};
    });
  },ids);
  for(const measure of measures){
    assert.equal(measure.visible,true,`${measure.id}: sprite ausente da batalha móvel`);
    assert.equal(Number(measure.artScale),measure.id==='adriel-jovem'?1:1.5,`${measure.id}: porte divergente`);
    if(!['cedric','adriel-jovem'].includes(measure.id)) assert.ok(Number(measure.motionScale)>0.7&&Number(measure.motionScale)<0.9,`${measure.id}: correção corporal inválida`);
    if(measure.id==='aarthas-darke'){
      assert.equal(measure.facing,'right','Aarthas & Darke deve olhar para os adversários');
      assert.equal(measure.flipped,false,'a arte aprovada de Aarthas & Darke não deve ser espelhada');
    }
  }
  await page.waitForTimeout(350);
  await page.locator('#arena').screenshot({path:path.join(output,`mobile-party-${group+1}.png`)});
}
assert.equal(resourceFailures.length,0,resourceFailures.join('\n'));
assert.equal(consoleErrors.length,0,consoleErrors.join('\n'));

await browser.close();
console.log('light-realm-visual: 11 personagens, VFX e cinco formações móveis com porte humano aprovados');
