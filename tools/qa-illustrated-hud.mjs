import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('../../node_modules/@playwright/test');
const browser=await chromium.launch({headless:true});
const output=resolve('qa/hud-illustrated');
await mkdir(output,{recursive:true});
for(const size of [{width:390,height:844},{width:1024,height:1536}]){
  const page=await browser.newPage({viewport:size});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
    localStorage.setItem('12r_tutorial_seen','true');
    localStorage.setItem('12r_tutorial','true');
    const d=new Date();
    const date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    localStorage.setItem('12r_login',JSON.stringify({date,streak:1}));
  });
  await page.goto('http://127.0.0.1:4178/play.html?qa=illustrated-hud&seed=hud-illustrated',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.body.dataset.gameReady==='1');
  const fixture=await page.evaluate(()=>{
    saveCardUnlocks(KINGDOMS.map(h=>h.id));
    worldRun={active:false,fase:0,nivel:1,storyMode:false};
    towerMode=true; towerFloor=1; difficulty='pesadelo';
    vizPrefs.battleLayout='2'; saveViz();
    chosenIds=['adriel-jovem','cedric','galateia-jovem','acqua-jovem'].map(id=>KINGDOMS.findIndex(h=>h.id===id)).filter(idx=>idx>=0);
    const chosen=chosenIds.map(idx=>KINGDOMS[idx].id);
    beginGame(0);skipStory();
    return {chosen,all:KINGDOMS.map(h=>h.id)};
  });
  await page.waitForTimeout(1800);
  const geometry=await page.evaluate(()=>Object.fromEntries(['.game-frame','.mission-topbar','#board','.vertical-hp','.card-strip','.battle-info-dock','#partyArena','#enemyArena','.hero-unit','.unit-stage','.avatar-circle'].map(s=>{
    const el=document.querySelector(s),r=el?.getBoundingClientRect();
    return [s,r?{x:r.x,y:r.y,width:r.width,height:r.height,style:el.getAttribute('style')}:null];
  })));
  await page.screenshot({path:resolve(output,`game-${size.width}.png`)});
  if(size.width===390){
    const timings=await page.evaluate(()=>new Promise(resolve=>{
      const samples=[];let previous=performance.now();
      function frame(now){samples.push(now-previous);previous=now;if(samples.length<90)requestAnimationFrame(frame);else resolve(samples.slice(1).sort((a,b)=>a-b));}
      requestAnimationFrame(frame);
    }));
    console.log('frame-times-ms',JSON.stringify({median:timings[Math.floor(timings.length*.5)],p95:timings[Math.floor(timings.length*.95)]}));
    await page.evaluate(()=>{vizPrefs.boardStyle='crystal';saveViz();renderBoard();});
    await page.screenshot({path:resolve(output,'game-crystals-390.png')});
    await page.evaluate(()=>{vizPrefs.boardStyle='relic';saveViz();renderBoard();});
  }
  await writeFile(resolve(output,`audit-${size.width}.json`),JSON.stringify({fixture,geometry,errors},null,2));
  console.log(size.width,JSON.stringify({fixture,geometry,errors}));
  await page.close();
}
const comparison=await browser.newPage({viewport:{width:1600,height:1350}});
await comparison.goto('http://127.0.0.1:4178/previews/hud-ilustrado.html',{waitUntil:'networkidle'});
await comparison.screenshot({path:resolve(output,'comparison.png'),fullPage:true});
await comparison.close();
await browser.close();
