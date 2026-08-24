import {test,expect} from '@playwright/test';

const baseURL=process.env.BASE_URL||'http://127.0.0.1:4177';

async function boot(page,qa='all-specials'){
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{ if(message.type()==='error') errors.push(message.text()); });
  await page.addInitScript(()=>{
    localStorage.setItem('12r_tutorial_seen','true');
    localStorage.setItem('12r_tutorial','true');
  });
  await page.goto(`${baseURL}/play.html?qa=${qa}&seed=v10-e2e`,{waitUntil:'networkidle'});
  await expect(page.locator('body')).toHaveAttribute('data-game-ready','1');
  await expect(page.locator('#menuVersion')).toContainText('VERSÃO 10');
  return errors;
}

test('smoke v10 não registra erro de boot ou console',async({page})=>{
  const errors=await boot(page,'smoke');
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('12r_smoke')||'{}').results?.every(result=>result.pass))).toBe(true);
  expect(errors).toEqual([]);
});

test('fluxo real abre seletor, monta equipe e inicia tabuleiro',async({page})=>{
  const errors=await boot(page,'flow');
  await page.click('#playBtn');
  await page.waitForTimeout(400); // respeita a proteção contra toque duplo da transição
  await page.locator('#mapCanvas .realm-pin.unlocked').click();
  await page.locator('#worldMap .fase-node:not(.locked)').first().click();
  await expect(page.locator('#selectScreen')).toBeVisible();
  await page.waitForTimeout(400); // a fase também protege a troca de tela contra toque herdado
  await expect(page.locator('.select-card.chosen')).toHaveCount(4);
  await page.locator('.select-card.chosen:visible').first().click();
  await expect(page.locator('#startBtn')).toBeDisabled();
  await page.locator('.select-card:not(.story-disabled):not(.chosen):visible').first().click();
  await expect(page.locator('#startBtn')).toBeEnabled();
  await page.click('#startBtn');
  await expect(page.locator('#gameScreen')).toBeVisible();
  await expect(page.locator('.hero-unit')).toHaveCount(4);
  await expect(page.locator('.board .gem')).toHaveCount(36);
  expect(errors).toEqual([]);
});

test('v11 mostra dez formações e setas de seleção acima dos heróis',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const initial=await page.evaluate(()=>({
    arrows:[...document.querySelectorAll('.hero-select-arrow')].map(arrow=>({label:arrow.getAttribute('aria-label'),rect:arrow.getBoundingClientRect().toJSON()})),
    formation:document.getElementById('formationTool')?.textContent
  }));
  expect(initial.arrows).toHaveLength(4);
  expect(initial.arrows.every(item=>item.rect.top>=0&&item.rect.bottom<=844)).toBe(true);
  expect(initial.arrows.every(item=>item.label?.startsWith('Selecionar'))).toBe(true);
  await page.click('#battleToolsToggle');
  await expect(page.locator('#battleToolsPanel')).toHaveClass(/open/);
  const names=[];
  for(let i=0;i<10;i++){
    await page.click('#formationTool');
    names.push((await page.locator('#formationTool').textContent()).trim());
  }
  expect(new Set(names).size).toBe(10);
  await page.click('#battleToolsClose');
  await page.locator('.hero-select-arrow').first().click();
  await expect(page.locator('#battleStatus')).toContainText('mudou o lado');
  expect(errors).toEqual([]);
});

test('v13 mostra o grid físico numerado somente na Cidade das Cerejeiras',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await page.click('#battleToolsToggle');
  const grid=await page.evaluate(()=>({
    available:document.getElementById('arena')?.classList.contains('cerejeira-grid-available'),
    active:document.getElementById('arena')?.classList.contains('tactical-grid'),
    cells:document.querySelectorAll('#physicalFloorGrid .physical-floor-cell').length,
    labels:[...document.querySelectorAll('#physicalFloorGrid .physical-floor-cell')].map(el=>el.dataset.gridSlot),
    floorCell:[...document.querySelectorAll('#physicalFloorGrid .physical-floor-cell')][0] ? (()=>{ const el=[...document.querySelectorAll('#physicalFloorGrid .physical-floor-cell')][0]; const rect=el.getBoundingClientRect(); return {width:rect.width,height:rect.height,offsetWidth:el.offsetWidth,offsetHeight:el.offsetHeight,computedWidth:getComputedStyle(el).width,computedHeight:getComputedStyle(el).height}; })() : null
  }));
  expect(grid).toMatchObject({available:true,active:true});
  expect(grid.cells).toBeGreaterThan(24);
  expect(grid.labels[0]).toBe('01');
  expect(grid.floorCell.offsetWidth).toBe(grid.floorCell.offsetHeight);
  expect(grid.floorCell.computedWidth).toBe(grid.floorCell.computedHeight);
  expect(errors).toEqual([]);
});

test('grade inimiga usa três por três e segue as formações canônicas',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const probe=await page.evaluate(()=>({
    activeCells:[...document.querySelectorAll('#physicalFloorGrid .enemy-grid-cell')].map(cell=>cell.dataset.gridSlot),
    retiredCells:document.querySelectorAll('#physicalFloorGrid .enemy-grid-retired').length,
    singleEnemy:{column:document.querySelector('.enemy-unit')?.dataset.gridColumn,row:document.querySelector('.enemy-unit')?.dataset.gridRow},
    plans:window.__12rQA.enemyGridPlanProbe()
  }));
  expect(probe.activeCells).toEqual(['07','08','09','16','17','18','25','26','27']);
  expect(probe.retiredCells).toBe(0);
  expect(probe.singleEnemy).toEqual({column:'1',row:'2'});
  expect(probe.plans.normal).toEqual([
    [{column:1,row:2,boss:false}],
    [{column:1,row:2,boss:false},{column:2,row:1,boss:false}],
    [{column:1,row:2,boss:false},{column:2,row:1,boss:false},{column:2,row:3,boss:false}],
    [{column:1,row:2,boss:false},{column:2,row:1,boss:false},{column:2,row:3,boss:false},{column:2,row:2,boss:false}]
  ]);
  expect(probe.plans.bosses).toEqual([
    [{column:1,row:2,boss:true}],
    [{column:1,row:1,boss:false},{column:2,row:2,boss:true}],
    [{column:1,row:1,boss:false},{column:1,row:2,boss:false},{column:2,row:2,boss:true}],
    [{column:1,row:1,boss:false},{column:1,row:2,boss:false},{column:1,row:3,boss:false},{column:2,row:2,boss:true}]
  ]);
  expect(errors).toEqual([]);
});

test('física de perspectiva reduz apenas unidades distantes e mantém os pés ancorados',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const probe=await page.evaluate(()=>{
    const measure=form=>{
      formationIndex=form; applyBattleFormation();
      const unit=document.querySelector('.party-row .hero-unit');
      const avatar=unit?.querySelector('.avatar-circle');
      const stage=unit?.querySelector('.unit-stage');
      const rect=avatar?.getBoundingClientRect();
      const stageRect=stage?.getBoundingClientRect();
      return {depth:Number(unit?.dataset.depth),scale:Number(unit?.dataset.depthScale),height:rect?.height,footGap:Math.abs((stageRect?.bottom||0)-(rect?.bottom||0))};
    };
    const near=measure(0); // Líder: Adriel na faixa intermediária
    const far=measure(2);  // Cercados: Adriel no fundo do piso
    return {physics:document.getElementById('arena')?.classList.contains('perspective-physics'),near,far};
  });
  expect(probe.physics).toBe(true);
  expect(probe.near.depth).toBeLessThan(probe.far.depth);
  expect(probe.near.scale).toBeGreaterThan(probe.far.scale);
  expect(probe.near.height).toBeGreaterThan(probe.far.height*1.1);
  expect(probe.near.footGap).toBeLessThan(1.5);
  expect(probe.far.footGap).toBeLessThan(1.5);
  expect(errors).toEqual([]);
});

test('v10.0.1 restaura escala e anima inimigos-personagem e inimigos comuns',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const probe=await page.evaluate(()=>window.__12rQA.enemyAnimationProbe());
  expect(probe).toMatchObject({characterSheet:true,characterAction:'attack',genericAction:'cast',genericMotion:true,genericSheet:true,chargeAura:true});
  expect(probe.idleSource).toContain('/slime-cereja/idle/processed/sheet-transparent.png');
  expect(probe.idleFrameCount).toBe(10);
  expect(probe.rootedIdle).toMatchObject({active:true,sheetAnimation:'none',sheetTransform:'none'});
  expect(probe.rootedIdle.source).toContain('/capitao/idle-v3/processed/sheet-transparent.png');
  expect(probe.rootedIdle.sheetTransform).toBe('none');
  const rootedAction=await page.evaluate(()=>window.__12rQA.rootedEnemyActionProbe());
  expect(rootedAction).toMatchObject({before:{rooted:true,action:'idle'},rooted:true,action:'idle',sheetAnimation:'none',sheetTransform:'none'});
  expect(probe.bossStarCount).toBe(0);
  const deathProbe=await page.evaluate(()=>window.__12rQA.enemyDeathProbe());
  expect(deathProbe).toMatchObject({dead:true,action:'defeat',defeatPose:true,defeatRuntime:true,paused:true,shadowAnimation:'none'});
  expect(deathProbe.defeatSource).toContain('/capitao/defeat/processed/sheet-transparent.png');
  await page.waitForTimeout(980);
  const defeatFrame=await page.evaluate(()=>{ const sheet=document.querySelector('.enemy-unit.dead .hero-sprite-sheet'); return {x:sheet?.style.getPropertyValue('--sprite-bg-x'),y:sheet?.style.getPropertyValue('--sprite-bg-y'),animation:getComputedStyle(sheet).animationName}; });
  expect(defeatFrame).toEqual({x:'100%',y:'100%',animation:'none'});
  const defeatLayout=await page.evaluate(()=>{
    const sprite=document.querySelector('.enemy-unit.dead .enemy-sprite-image,.enemy-unit.dead .hero-sprite-sheet');
    const status=document.querySelector('.battle-status');
    return {bottom:sprite?.getBoundingClientRect().bottom,statusTop:status?.getBoundingClientRect().top};
  });
  expect(defeatLayout.bottom).toBeLessThanOrEqual(defeatLayout.statusTop+2);
  expect(probe.rectangularGlow).toBe('none');
  const dimensions=await page.evaluate(()=>{
    const hero=document.querySelector('.hero-unit');
    const enemy=document.querySelector('.enemy-unit');
    return {hero:Number.parseFloat(getComputedStyle(hero).width),enemy:Number.parseFloat(getComputedStyle(enemy).width)};
  });
  expect(dimensions.hero).toBeGreaterThan(100);
  expect(dimensions.enemy).toBeGreaterThan(100);
  expect(errors).toEqual([]);
});

test('mobile mantém derrota humana caída, opaca e presa ao piso',async({page})=>{
  await page.setViewportSize({width:591,height:1280});
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ worldRun.active=true; worldRun.fase=1; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await page.evaluate(()=>window.__12rQA.enemyDeathProbe());
  await page.waitForTimeout(650);
  const layout=await page.evaluate(()=>{
    const enemy=document.querySelector('.enemy-unit.dead');
    const sprite=enemy?.querySelector('.enemy-sprite-image,.hero-sprite-sheet');
    const status=document.querySelector('.battle-status');
    const shadow=enemy?.querySelector('.unit-ground-shadow');
    return {
      dead:Boolean(enemy),
      action:enemy?.querySelector('.enemy-avatar')?.dataset.action,
      opacity:enemy?getComputedStyle(enemy).opacity:null,
      filter:enemy?getComputedStyle(enemy).filter:null,
      spriteBottom:sprite?.getBoundingClientRect().bottom,
      statusTop:status?.getBoundingClientRect().top,
      shadowAnimation:shadow?getComputedStyle(shadow).animationName:null
    };
  });
  expect(layout).toMatchObject({dead:true,action:'defeat',opacity:'1',filter:'none',shadowAnimation:'none'});
  expect(layout.spriteBottom).toBeLessThanOrEqual(layout.statusTop+2);
  expect(errors).toEqual([]);
});

test('Sophitia usa a mesma física de derrota e repouso no movimento reduzido',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  const errors=await boot(page,'flow');
  const pose=await page.evaluate(()=>{
    const sophitia=KINGDOMS.findIndex(hero=>hero.id==='vento');
    chosenIds=[sophitia,1,2,3]; beginGame(0); skipStory();
    window.__12rQA.playHeroAction(sophitia,'defeat');
    const avatar=document.getElementById('party-vento-avatar');
    const sheet=avatar?.querySelector('.hero-sprite-sheet.grid-sheet');
    return {action:avatar?.dataset.action,source:sheet?.style.getPropertyValue('--sprite-url')||'',x:sheet?.style.getPropertyValue('--sprite-bg-x'),y:sheet?.style.getPropertyValue('--sprite-bg-y')};
  });
  expect(pose.action).toBe('defeat');
  expect(pose.source).toContain('/vento/defeat/processed/sheet-transparent.png');
  expect(pose.x).toBe('100%');
  expect(pose.y).toBe('100%');
  expect(errors).toEqual([]);
});

test('inimigos humanos mantêm a escala entre idle enraizado e ação',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const samples=await page.evaluate(()=>window.__12rQA.enemyScaleProbe());
  for(const sample of samples){
    expect(sample.idleScale).toBe(sample.attackScale);
    expect(sample.idleScale).not.toBe('none');
  }
  expect(errors).toEqual([]);
});

test('escala do porte permanece fixa e folhas de ação preservam a correção corporal',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const result=await page.evaluate(()=>{
    const samples=[];
    for(const heroIdx of ACTIVE){
      const avatar=document.getElementById('party-'+KINGDOMS[heroIdx].id+'-avatar');
      const actions=['idle','attack','cast','hit','victory'];
      const scales=[];
      for(const action of actions){
        window.__12rQA.playHeroAction(heroIdx,action);
        const sheet=avatar?.querySelector('.hero-sprite-sheet');
        scales.push({action,actionScale:sheet?.style.getPropertyValue('--sprite-scale')||'',unitScale:getComputedStyle(sheet).scale,filter:getComputedStyle(avatar).filter});
      }
      samples.push({id:KINGDOMS[heroIdx].id,scales});
    }
    return samples;
  });
  for(const sample of result){
    expect(new Set(sample.scales.map(entry=>entry.unitScale)).size).toBe(1);
    expect(sample.scales.find(entry=>entry.action==='hit')?.filter).toBe('none');
  }
  expect(errors).toEqual([]);
});

test('Torre ancora personagens no pátio real da arte',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:570,height:684});
  const layout=await page.evaluate(()=>{
    towerMode=true; towerFloor=1; bossRushMode=false; worldRun.active=false;
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    const arena=document.getElementById('arena');
    const arenaRect=arena.getBoundingClientRect();
    const feet=[...document.querySelectorAll('.hero-unit .unit-stage,.enemy-unit .unit-stage')].map(stage=>{
      const rect=stage.getBoundingClientRect();
      return (rect.bottom-arenaRect.top)/arenaRect.height;
    });
    return {
      towerClass:arena.classList.contains('tower-stage'),
      horizon:getComputedStyle(arena).getPropertyValue('--horizon').trim(),
      band:groundBand(),
      feet
    };
  });
  expect(layout.towerClass).toBe(true);
  expect(layout.horizon).toBe('66%');
  expect(layout.band).toEqual({top:.70,bot:1});
  expect(Math.min(...layout.feet)).toBeGreaterThanOrEqual(.64);
  expect(Math.max(...layout.feet)).toBeLessThanOrEqual(1.02);
  expect(errors).toEqual([]);
});

test('aura de habilidade carregada emana do corpo, sem moldura quadrada',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const aura=await page.evaluate(()=>window.__12rQA.heroAuraProbe());
  expect(aura).toEqual({ready:true,aura:true,rectangularGlow:'none'});
  expect(errors).toEqual([]);
});

test('arena cinematica mantém profundidade, luz localizada e sombra de contato estável',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const state=await page.evaluate(()=>{
    const arena=document.getElementById('arena');
    const target=document.querySelector('.enemy-unit');
    const shadow=target?.querySelector('.unit-ground-shadow');
    const idle=target?.querySelector('.enemy-sprite-image,.hero-sprite-sheet');
    spawnCombatFx('impact',target,'#bde9ff',120);
    return {
      depth:Boolean(arena?.querySelector('.arena-depth')),
      lighting:Boolean(arena?.querySelector('.arena-lighting')),
      atmosphere:Boolean(arena?.querySelector('.arena-atmosphere')),
      mood:arena?.dataset.arenaMood||'',
      lightPulse:arena?.classList.contains('arena-light-pulse'),
      shadowDisplay:getComputedStyle(shadow).display,
      shadowAnimation:getComputedStyle(shadow).animationName,
      idleScale:getComputedStyle(idle).scale,
      idleTransform:getComputedStyle(idle).transform
    };
  });
  expect(state.depth).toBe(true);
  expect(state.lighting).toBe(true);
  expect(state.atmosphere).toBe(true);
  expect(state.mood).not.toBe('');
  expect(state.lightPulse).toBe(true);
  expect(state.shadowDisplay).toBe('block');
  expect(state.shadowAnimation).toBe('none');
  expect(state.idleScale).not.toBe('none');
  expect(state.idleTransform).not.toContain('scale(');
  expect(errors).toEqual([]);
});

test('tela final celebra dentro do cenário com heróis vitoriosos e inimigos caídos',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    stageIndex=DUNGEON.length-1;
    enemies.forEach(enemy=>{ enemy.hp=0; });
    renderEnemies();
    worldRun.active=false; towerMode=false; bossRushMode=true;
    bossRushIdx=BOSS_RUSH_ORDER.length-1;
    runStats.damage={0:100,1:50};
    stageTransitioning=false;
    onStageCleared();
  });
  await page.waitForTimeout(850);
  const state=await page.evaluate(()=>{
    const overlay=document.getElementById('dungeonClearOverlay');
    return {
      visible:overlay?.classList.contains('show'),
      parent:overlay?.parentElement?.id||'',
      topParent:document.getElementById('grandClearTitle')?.parentElement?.id||'',
      topVisible:getComputedStyle(document.getElementById('victoryArenaHeader')).display!=='none',
      dockVisible:getComputedStyle(document.getElementById('victoryReportDock')).display!=='none',
      combatHidden:getComputedStyle(document.querySelector('.combat-console')).display==='none',
      arenaVictory:document.getElementById('arena')?.classList.contains('victory-arena-state'),
      heroesVictory:[...document.querySelectorAll('.party-row .avatar-circle')].every(avatar=>avatar.dataset.action==='victory'),
      deadEnemies:document.querySelectorAll('.enemy-unit.dead').length,
      enemiesTotal:document.querySelectorAll('.enemy-unit').length,
      stars:document.querySelectorAll('#victoryStars .star').length,
      report:Boolean(document.getElementById('victoryReport')?.textContent?.trim()),
      reportParent:document.getElementById('victoryReport')?.parentElement?.id||'',
      victoryButtonText:document.getElementById('playAgainBtn')?.textContent?.trim()||'',
      noArenaAnimation:getComputedStyle(document.getElementById('arena')).animationName
    };
  });
  expect(state).toMatchObject({visible:true,parent:'victoryReportDock',topParent:'victoryArenaHeader',topVisible:true,dockVisible:true,combatHidden:true,arenaVictory:true,heroesVictory:true,report:true,reportParent:'dungeonClearOverlay',victoryButtonText:'Jogar novamente',noArenaAnimation:'none'});
  expect(state.deadEnemies).toBe(state.enemiesTotal);
  expect(state.stars).toBe(3);
  expect(errors).toEqual([]);
});

test('save v8 continua legível e é migrado na próxima gravação',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('12r_save',JSON.stringify({version:8,stage:2,team:[0,1,2,3],hp:321})));
  const errors=await boot(page,'flow');
  const legacy=await page.evaluate(()=>window.__12rQA.savedProgress());
  expect(legacy.version).toBe(10);
  expect(legacy.stage).toBe(2);
  const migrated=await page.evaluate(()=>JSON.parse(localStorage.getItem('12r_save')));
  expect(migrated.version).toBe(10);
  expect(migrated.hp).toBe(321);
  expect(errors).toEqual([]);
});

test('pausa preserva callbacks, reinício invalida callback antigo e revive destrava',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await page.locator('#helpScreen [data-close]').click({force:true}).catch(()=>{});
  const before=await page.evaluate(()=>window.__12rQA.scheduleProbe(600));
  await page.click('#pauseBtn');
  await page.waitForTimeout(260);
  await page.click('#resumeBtn');
  await page.waitForTimeout(120);
  const immediatelyAfterResume=await page.evaluate(()=>window.__12rQA.snapshot());
  expect(immediatelyAfterResume.stageTurns).toBe(before.before);
  await page.waitForTimeout(620);
  const afterPause=await page.evaluate(()=>window.__12rQA.snapshot());
  expect(afterPause.stageTurns).toBe(before.before+1);

  const probe=await page.evaluate(()=>window.__12rQA.scheduleProbe(180));
  await page.evaluate(()=>window.__12rQA.restart());
  const afterRestartBaseline=await page.evaluate(()=>window.__12rQA.snapshot());
  await page.waitForTimeout(260);
  const afterRestart=await page.evaluate(()=>window.__12rQA.snapshot());
  expect(afterRestart.stageTurns).toBe(afterRestartBaseline.stageTurns);
  expect(afterRestart.stageTurns).toBe(0);
  expect(probe.before).toBeGreaterThan(0);

  const pending=await page.evaluate(()=>window.__12rQA.startWaitProbe(5000));
  expect(pending).toBeGreaterThan(0);
  await page.evaluate(()=>window.__12rQA.restart());
  await expect.poll(()=>page.evaluate(()=>window.__12rQA.pendingWaitCount())).toBe(0);

  const energy=await page.evaluate(async()=>{
    const flight=window.__12rQA.startEnergyProbe();
    window.setTimeout(()=>window.__12rQA.restart(),50);
    return flight;
  });
  expect(energy.delivered).toBe(false);
  expect(energy.orbs).toBe(0);

  const revive=await page.evaluate(()=>window.__12rQA.testRevive('tear'));
  expect(revive.playerHP).toBeGreaterThan(0);
  expect(revive.busy).toBe(false);
  expect(revive.battlePhase).toBe('idle');
  expect(errors).toEqual([]);
});

test('derrota finaliza timers e não duplica estatísticas',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); startMissionTimer(); });
  const beforeLosses=await page.evaluate(()=>profile.losses);
  const first=await page.evaluate(()=>window.__12rQA.finalizeDefeat());
  const second=await page.evaluate(()=>window.__12rQA.finalizeDefeat());
  expect(first.finalized).toBe(true);
  expect(first.busy).toBe(true);
  expect(first.stageTransitioning).toBe(true);
  expect(first.battlePhase).toBe('transition');
  expect(first.missionTimerActive).toBe(false);
  expect(first.darkTimerActive).toBe(false);
  expect(second.finalized).toBe(false);
  expect(await page.evaluate(()=>profile.losses)).toBe(beforeLosses+1);
  await expect(page.locator('#defeatOverlay')).toHaveClass(/show/);
  expect(errors).toEqual([]);
});

test('nova fase volta ao idle e trocar equipe encerra a luta oculta',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); startMissionTimer(); });
  const animation=await page.evaluate(()=>window.__12rQA.testAnimationReset());
  expect(animation.before).toEqual(['victory','victory','victory','victory']);
  expect(animation.after).toEqual(['idle','idle','idle','idle']);

  await page.evaluate(()=>window.__12rQA.scheduleProbe(5000));
  const selection=await page.evaluate(()=>window.__12rQA.openSelection());
  expect(selection).toEqual({timers:0,waits:0,animationHandles:0,missionTimerActive:false,darkTimerActive:false});
  await expect(page.locator('#selectScreen')).toBeVisible();
  expect(errors).toEqual([]);
});

test('backup omite conta e credenciais',async({page})=>{
  const errors=await boot(page);
  const payload=await page.evaluate(()=>{
    localStorage.setItem('12r_account',JSON.stringify({email:'segredo@example.test',birth:'2000-01-01'}));
    localStorage.setItem('12r_localusers',JSON.stringify({'segredo@example.test':{passHash:'nao-exportar'}}));
    localStorage.setItem('12r_login',JSON.stringify({date:'2026-08-13',streak:7}));
    localStorage.setItem('12r_coins','123');
    const code=window.__12rQA.exportProgress();
    return new TextDecoder().decode(Uint8Array.from(atob(code),char=>char.charCodeAt(0)));
  });
  expect(payload).toContain('12r_coins');
  expect(payload).not.toContain('12r_account');
  expect(payload).not.toContain('12r_localusers');
  expect(payload).not.toContain('12r_login');
  expect(payload).not.toContain('passHash');
  expect(payload).not.toContain('segredo@example.test');
  expect(errors).toEqual([]);
});

test('backup rejeita valor inválido sem aplicar lote parcial',async({page})=>{
  const errors=await boot(page);
  const result=await page.evaluate(()=>{
    localStorage.setItem('12r_coins','123');
    localStorage.setItem('12r_inv',JSON.stringify({potion:2}));
    document.getElementById('saveCode').value=encodeSavePayload({
      schema:'12r-progress',version:10,entries:{'12r_coins':'999','12r_inv':'null'}
    });
    return {imported:importSave(),coins:localStorage.getItem('12r_coins'),inventory:localStorage.getItem('12r_inv')};
  });
  expect(result).toEqual({imported:false,coins:'123',inventory:'{"potion":2}'});
  expect(errors).toEqual([]);
});

test('backup restaura snapshot, preserva conta e rejeita equipes malformadas',async({page})=>{
  const errors=await boot(page);
  const result=await page.evaluate(()=>{
    localStorage.setItem('12r_world_humanos',JSON.stringify({unlocked:9,stars:{9:3}}));
    localStorage.setItem('12r_account',JSON.stringify({email:'preservar@example.test'}));
    localStorage.setItem('12r_coins','777');
    const entries=Object.entries({'12r_coins':'10'}).map(([key,value])=>validateImportedSaveEntry(key,value));
    applyImportedSaveEntries(entries);
    const restored=true;
    const afterRestore={
      coins:localStorage.getItem('12r_coins'),
      world:localStorage.getItem('12r_world_humanos'),
      account:localStorage.getItem('12r_account')
    };
    let malformed=true;
    try{ validateImportedSaveEntry('12r_teams','["oops"]'); }catch(error){ malformed=false; }
    return {restored,afterRestore,malformed};
  });
  expect(result.restored).toBe(true);
  expect(result.afterRestore.coins).toBe('10');
  expect(result.afterRestore.world).toBeNull();
  expect(result.afterRestore.account).toContain('preservar@example.test');
  expect(result.malformed).toBe(false);
  expect(errors).toEqual([]);
});

test('backup rejeita XSS persistente, recordes e missões malformados',async({page})=>{
  const errors=await boot(page);
  const rejected=await page.evaluate(()=>{
    const cases={
      bestiary:['12r_bestiary',JSON.stringify({'<img src=x onerror=alert(1)>':1})],
      records:['12r_fase_best',JSON.stringify({'0':'<img src=x onerror=alert(2)>'})],
      quests:['12r_quests',JSON.stringify({date:'2026-08-13',prog:{},done:{}})]
    };
    return Object.fromEntries(Object.entries(cases).map(([name,[key,value]])=>{
      try{ validateImportedSaveEntry(key,value); return [name,false]; }
      catch(error){ return [name,true]; }
    }));
  });
  expect(rejected).toEqual({bestiary:true,records:true,quests:true});
  expect(errors).toEqual([]);
});

test('persistência corrompida é normalizada e inventário ilimitado é rejeitado',async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('12r_coins','NaN');
    localStorage.setItem('12r_pxp','Infinity');
    localStorage.setItem('12r_formation','not-a-number');
    localStorage.setItem('12r_inv',JSON.stringify({potion:1e21,vela:2,unknown:7}));
  });
  const errors=await boot(page);
  const snapshot=await page.evaluate(()=>window.__12rQA.persistenceSnapshot());
  expect(snapshot.coins).toBe(15); // recompensa de login parte do zero normalizado
  expect(snapshot).toMatchObject({profileXp:0,formationIndex:0,inventory:{vela:2}});

  const imported=await page.evaluate(()=>{
    localStorage.setItem('12r_coins','123');
    document.getElementById('saveCode').value=encodeSavePayload({
      schema:'12r-progress',version:10,entries:{'12r_coins':'999','12r_inv':JSON.stringify({potion:1e21})}
    });
    return {ok:importSave(),coins:localStorage.getItem('12r_coins')};
  });
  expect(imported).toEqual({ok:false,coins:'123'});
  expect(errors).toEqual([]);
});

test('equipe sugerida rejeita lastteam duplicado e beginGame não entra em estado quebrado',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('12r_lastteam',JSON.stringify([0,0,1,2])));
  const errors=await boot(page,'flow');

  await page.evaluate(()=>{ closeAllPanels(); showSelection(); });
  await page.waitForTimeout(400);
  await page.evaluate(()=>document.getElementById('autoTeamBtn').click());
  const suggested=await page.evaluate(()=>[...chosenIds]);
  const suggestedUi={
    ids:suggested,
    unique:new Set(suggested).size,
    chosenCards:await page.locator('.select-card.chosen').count(),
    startEnabled:await page.locator('#startBtn').isEnabled()
  };

  const started=await page.evaluate(()=>{
    chosenIds=[0,0,1,2];
    beginGame(0);
    return {
      gameVisible:document.getElementById('gameScreen').style.display,
      active:[...ACTIVE],
      phase:battlePhase,
      ready:document.body.dataset.gameReady
    };
  });
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await expect(page.locator('#gameScreen')).toBeVisible();
  await expect(page.locator('.hero-unit')).toHaveCount(4);
  expect(suggestedUi).toEqual({ids:[0,1,2,3],unique:4,chosenCards:4,startEnabled:true});
  expect(started.gameVisible).not.toBe('flex');
  expect(new Set(started.active).size).toBe(started.active.length);
  expect(started.ready).toBe('1');
  expect(errors).toEqual([]);
});

test('galeria mobile mantém blocos e cartas legíveis sem transbordamento',async({page})=>{
  await page.setViewportSize({width:393,height:852});
  const errors=await boot(page,'flow');
  await page.locator('#galleryBtn').click();
  await expect(page.locator('#galleryScreen')).toHaveClass(/show/);
  const mobileLayout=await page.evaluate(()=>{
    const gallery=document.getElementById('galleryGrid');
    const firstSection=gallery.querySelector('.deck-section');
    const dialog=document.querySelector('#galleryScreen .pro-dialog');
    const galleryStyle=getComputedStyle(gallery);
    const sectionRect=firstSection.getBoundingClientRect();
    const dialogRect=dialog.getBoundingClientRect();
    return {
      columns:galleryStyle.gridTemplateColumns.split(' ').length,
      sectionFits:sectionRect.left>=dialogRect.left-1&&sectionRect.right<=dialogRect.right+1,
      pageFits:document.documentElement.scrollWidth<=window.innerWidth
    };
  });
  expect(mobileLayout).toEqual({columns:1,sectionFits:true,pageFits:true});
  const firstDeck=page.locator('#galleryGrid .deck-section').first();
  await firstDeck.locator('.deck-header').click();
  await expect(firstDeck.locator('.gallery-card').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('storage legado null não quebra boot, galeria, conquistas nem handlers',async({page})=>{
  await page.addInitScript(()=>{
    for(const key of ['12r_favs','12r_seen','12r_daily','12r_login','12r_ach']) localStorage.setItem(key,'null');
  });
  const errors=await boot(page,'flow');

  await page.locator('#galleryBtn').click();
  await expect(page.locator('#galleryScreen')).toHaveClass(/show/);
  const firstDeck=page.locator('#galleryGrid .deck-section').first();
  await firstDeck.locator('.deck-header').click();
  await expect(firstDeck.locator('.gallery-card').first()).toBeVisible();
  await firstDeck.locator('.fav-btn').first().click();
  await expect.poll(()=>page.evaluate(()=>Array.isArray(JSON.parse(localStorage.getItem('12r_favs'))))).toBe(true);

  await firstDeck.locator('.gallery-zoom').first().click();
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
  await page.locator('#closeCardModal').click();
  await page.locator('[data-close="galleryScreen"]').click();

  await page.locator('#achBtn').click();
  await expect(page.locator('#achScreen')).toHaveClass(/show/);
  await expect(page.locator('#achGrid')).toBeVisible();
  await page.locator('[data-close="achScreen"]').click();

  expect(await page.locator('#dailyHint').textContent()).toBeTruthy();
  expect(await page.locator('#dailyBtn').isEnabled()).toBe(true);
  expect(errors).toEqual([]);
});

test('volumes NaN são saneados e cliques de áudio não geram pageerror',async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('12r_volume','NaN');
    localStorage.setItem('12r_music_volume','NaN');
    localStorage.setItem('12r_sfx_volume','NaN');
  });
  const errors=await boot(page,'flow');

  await page.locator('#optionsBtn').click();
  await expect(page.locator('#optionsScreen')).toHaveClass(/show/);
  for(const selector of ['#volumeRange','#musicVolumeRange','#sfxVolumeRange']){
    const value=Number(await page.locator(selector).inputValue());
    expect(Number.isFinite(value)).toBe(true);
    await page.locator(selector).evaluate(input=>{
      input.value='50';
      input.dispatchEvent(new Event('input',{bubbles:true}));
    });
  }
  await page.locator('[data-close="optionsScreen"]').click();
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await expect(page.locator('#gameScreen')).toBeVisible();
  await page.locator('#muteBtn').click();
  await page.locator('#muteBtn').click();
  expect(errors).toEqual([]);
});

test('pausa congela o quadro da animação quando o manifesto está disponível',async({page})=>{
  const errors=await boot(page,'flow');
  const runtimeReady=await page.evaluate(()=>Object.keys(window.YGDRIA_V10_ANIMATIONS||{}).length===24);
  test.skip(!runtimeReady,'matriz runtime-v10 ainda não promovida');

  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const avatar=page.locator('.avatar-circle:has(.hero-sprite-sheet.grid-sheet)').first();
  await expect(avatar).toBeVisible();
  await expect.poll(()=>avatar.evaluate(element=>Boolean(element.__actionFrameRaf))).toBe(true);
  await expect.poll(()=>avatar.locator('.hero-sprite-sheet.grid-sheet').evaluate(element=>
    `${getComputedStyle(element).getPropertyValue('--sprite-bg-x')}|${getComputedStyle(element).getPropertyValue('--sprite-bg-y')}`
  )).not.toBe('0%|0%');

  await page.locator('#pauseBtn').click();
  await expect(page.locator('#pauseScreen')).toHaveClass(/show/);
  const frozen=await avatar.evaluate(async element=>{
    const sheet=element.querySelector('.hero-sprite-sheet.grid-sheet');
    const frame=()=>`${getComputedStyle(sheet).getPropertyValue('--sprite-bg-x')}|${getComputedStyle(sheet).getPropertyValue('--sprite-bg-y')}`;
    const before=frame();
    await new Promise(resolve=>setTimeout(resolve,700));
    return {before,after:frame(),raf:Boolean(element.__actionFrameRaf)};
  });
  expect(frozen.after).toBe(frozen.before);
  expect(frozen.raf).toBe(false);
  expect(errors).toEqual([]);
});

test('retomar preserva a trilha da cena e a camada de chefe do Boss Rush',async({page})=>{
  const errors=await boot(page,'flow');
  const result=await page.evaluate(()=>{
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    activeStageData={...activeStageData,scene:4};
    stageIndex=0;
    musicMuted=false;
    let resumedScene=null;
    const originalPlayStageMusic=playStageMusic;
    playStageMusic=scene=>{ resumedScene=scene; };
    pauseBattle();
    resumeBattle();
    playStageMusic=originalPlayStageMusic;

    bossRushMode=true;
    bossRushIdx=BOSS_RUSH_ORDER.length-1;
    worldRun.active=false;
    musicMuted=true;
    playStageMusic(activeStageData.scene);
    return {resumedScene,musicBossLayer,musicFinalBoss};
  });
  expect(result).toEqual({resumedScene:4,musicBossLayer:true,musicFinalBoss:true});
  expect(errors).toEqual([]);
});

test('espelhar herói mantém a animação idle em execução',async({page})=>{
  const errors=await boot(page,'flow');
  const hero=await page.evaluate(()=>{
    const index=KINGDOMS.findIndex(character=>character.heroFlip);
    const current=index>=0?index:0;
    const character=KINGDOMS[current];
    const pixel='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="red"/></svg>');
    character.sprites={...(character.sprites||{}),idle:{src:pixel,format:'sheet',frames:4,cols:2,rows:2,duration:320,loop:true}};
    chosenIds=[current,...KINGDOMS.map((_,candidate)=>candidate).filter(candidate=>candidate!==current)].slice(0,4);
    beginGame(0); skipStory();
    return {index:current,id:character.id};
  });
  const avatar=page.locator(`#party-${hero.id}-avatar`);
  const sheet=avatar.locator('.hero-sprite-sheet.grid-sheet');
  await expect(avatar).toHaveAttribute('data-action','idle');
  await expect.poll(()=>avatar.evaluate(element=>Boolean(element.__actionFrameRaf))).toBe(true);
  await expect.poll(()=>avatar.evaluate(element=>element.__heroAnimationState?.elapsed||0)).toBeGreaterThan(30);
  const flipBefore=await sheet.evaluate(element=>element.classList.contains('flip'));

  await page.evaluate(index=>onHeroAvatarClick(index),hero.index);

  await expect(avatar).toHaveAttribute('data-action','idle');
  await expect.poll(()=>sheet.evaluate(element=>element.classList.contains('flip'))).toBe(!flipBefore);
  await expect.poll(()=>avatar.evaluate(element=>Boolean(element.__actionFrameRaf))).toBe(true);
  await expect.poll(()=>avatar.evaluate(element=>element.__heroAnimationState?.elapsed||0)).toBeGreaterThan(30);
  await expect.poll(()=>sheet.evaluate(element=>
    `${element.style.getPropertyValue('--sprite-bg-x')}|${element.style.getPropertyValue('--sprite-bg-y')}`
  )).not.toBe('0%|0%');
  expect(errors).toEqual([]);
});

test('rerender da equipe durante pausa mantém o novo quadro congelado',async({page})=>{
  const errors=await boot(page,'flow');
  const frozen=await page.evaluate(async()=>{
    const pixel='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="blue"/></svg>');
    KINGDOMS[0].sprites={...(KINGDOMS[0].sprites||{}),idle:{src:pixel,format:'sheet',frames:4,cols:2,rows:2,duration:640,loop:true}};
    chosenIds=[0,1,2,3]; beginGame(0); skipStory(); pauseBattle();
    renderPartyArena();
    const avatar=document.getElementById('party-'+KINGDOMS[0].id+'-avatar');
    const sheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
    const read=()=>({
      frame:`${sheet.style.getPropertyValue('--sprite-bg-x')}|${sheet.style.getPropertyValue('--sprite-bg-y')}`,
      elapsed:avatar.__heroAnimationState?.elapsed,
      paused:avatar.__heroAnimationState?.paused,
      raf:Boolean(avatar.__actionFrameRaf)
    });
    const before=read();
    await new Promise(resolve=>setTimeout(resolve,360));
    return {before,after:read(),gamePaused,battlePhase,pauseOpen:document.getElementById('pauseScreen').classList.contains('show')};
  });
  expect(frozen.gamePaused).toBe(true);
  expect(frozen.battlePhase).toBe('paused');
  expect(frozen.pauseOpen).toBe(true);
  expect(frozen.before.paused).toBe(true);
  expect(frozen.before.raf).toBe(false);
  expect(frozen.after).toEqual(frozen.before);
  expect(errors).toEqual([]);
});

test('auto-batalha não executa jogada enquanto a história bloqueia a arena',async({page})=>{
  const errors=await boot(page,'flow');
  const blocked=await page.evaluate(()=>{
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    const originalSetInterval=window.setInterval;
    let tick=null;
    window.setInterval=callback=>{ tick=callback; return 987654; };
    try{
      showStorySequence([{h:'fogo',t:'Bloqueio determinístico de QA.'}]);
      const before=JSON.stringify(board);
      setAutoBattle(true);
      tick?.();
      return {
        tickRegistered:typeof tick==='function',
        canAccept:canAcceptPlayerInput(),
        storyOpen:document.getElementById('storyLayer').classList.contains('show'),
        before,
        after:JSON.stringify(board),
        selected,
        busy,
        battlePhase,
        autoBattle
      };
    }finally{
      setAutoBattle(false);
      skipStory();
      window.setInterval=originalSetInterval;
    }
  });
  expect(blocked.tickRegistered).toBe(true);
  expect(blocked.canAccept).toBe(false);
  expect(blocked.storyOpen).toBe(true);
  expect(blocked.after).toBe(blocked.before);
  expect(blocked.selected).toBeNull();
  expect(blocked.busy).toBe(false);
  expect(blocked.battlePhase).toBe('idle');
  expect(blocked.autoBattle).toBe(true);
  expect(errors).toEqual([]);
});

test('showcase fechado não ressuscita e resposta atrasada não troca o personagem atual',async({page})=>{
  const pixel=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><rect width="2" height="2" fill="red"/></svg>');
  const slowClose=`data:image/svg+xml,${pixel}#qa-slow-close`;
  const slowRace=`data:image/svg+xml,${pixel}#qa-slow-race`;
  const fast=`data:image/svg+xml,${pixel}#qa-fast`;
  const errors=await boot(page,'flow');

  await page.evaluate(slow=>{
    spritePreloadCache.set(slow,new Promise(resolve=>{
      window.__qaReleaseShowcaseClose=()=>resolve(slow);
    }));
    KINGDOMS[0].sprites={idle:{src:slow,format:'sheet',frames:4,cols:2,rows:2,duration:240,loop:true}};
    openCardModal(0);
  },slowClose);
  const firstPending=await avatarState(page);
  await page.evaluate(()=>closeCardModalFn());
  await page.evaluate(async slow=>{
    window.__qaReleaseShowcaseClose();
    await spritePreloadCache.get(slow);
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },slowClose);
  const afterClose=await avatarState(page);

  await page.evaluate(({slow,fast})=>{
    spritePreloadCache.set(slow,new Promise(resolve=>{
      window.__qaReleaseShowcaseRace=()=>resolve(slow);
    }));
    spritePreloadCache.set(fast,Promise.resolve(fast));
    KINGDOMS[0].sprites={idle:{src:slow,format:'sheet',frames:4,cols:2,rows:2,duration:240,loop:true}};
    KINGDOMS[1].sprites={idle:{src:fast,format:'sheet',frames:4,cols:2,rows:2,duration:240,loop:true}};
    openCardModal(0);
    openCardModal(1);
  },{slow:slowRace,fast});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const secondSettled=await avatarState(page);
  await page.evaluate(async slow=>{
    window.__qaReleaseShowcaseRace();
    await spritePreloadCache.get(slow);
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },slowRace);
  const afterRace=await avatarState(page);
  const names=await page.evaluate(()=>({modalName:document.getElementById('cardModalName').textContent,expected:L(KINGDOMS[1].nome)}));
  await page.evaluate(sources=>{
    closeCardModalFn();
    sources.forEach(src=>spritePreloadCache.delete(src));
    delete window.__qaReleaseShowcaseClose;
    delete window.__qaReleaseShowcaseRace;
  },[slowClose,slowRace,fast]);

  expect(firstPending.open).toBe(true);
  expect(afterClose.open).toBe(false);
  expect(afterClose.running).toBe(false);
  expect(secondSettled.modalIdx).toBe(1);
  expect(secondSettled.sprite).toContain('qa-fast');
  expect(afterRace.modalIdx).toBe(1);
  expect(afterRace.sprite).toContain('qa-fast');
  expect(afterRace.sprite).not.toContain('qa-slow');
  expect(names.modalName).toBe(names.expected);
  expect(errors).toEqual([]);

  async function avatarState(currentPage){
    return currentPage.evaluate(()=>{
      const modal=document.getElementById('cardModal');
      const avatar=document.getElementById('motionShowcaseAvatar');
      return {
        open:modal.classList.contains('show'),
        modalIdx:window.__modalIdx,
        requested:avatar.dataset.requestedAction||'',
        action:avatar.dataset.action||'',
        sprite:avatar.querySelector('.hero-sprite-sheet')?.style.getPropertyValue('--sprite-url')||'',
        running:Boolean(avatar.__actionFrameRaf||avatar.__actionTimer||avatar.__heroAnimationState)
      };
    });
  }

});

test('Escape respeita overlay terminal e retorno ao menu remove overlays',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); showOverlay('defeatOverlay'); });
  await expect(page.locator('#defeatOverlay')).toHaveClass(/show/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#defeatOverlay')).toHaveClass(/show/);
  await expect(page.locator('#pauseScreen')).not.toHaveClass(/show/);
  expect(await page.evaluate(()=>gamePaused)).toBe(false);

  await page.evaluate(()=>{
    hideOverlay('defeatOverlay');
    pauseBattle();
    showOverlay('stageClearOverlay');
  });
  await expect(page.locator('#pauseScreen')).toHaveClass(/show/);
  await page.locator('#returnMenuBtn').click({force:true});
  await expect(page.locator('#mainMenu')).toBeVisible();
  await expect(page.locator('#pauseScreen')).not.toHaveClass(/show/);
  await expect(page.locator('.overlay.show')).toHaveCount(0);
  await expect(page.locator('.pro-overlay.show')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('derrota reinicia sequências especiais desde o começo',async({page})=>{
  const errors=await boot(page);
  const tower=await page.evaluate(()=>{
    towerMode=true; towerFloor=6; bossRushMode=false; worldRun.active=false;
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    defeatFinalized=true;
    return window.__12rQA.retryAfterDefeat();
  });
  expect(tower.towerMode).toBe(true);
  expect(tower.towerFloor).toBe(1);
  expect(tower.battlePhase).toBe('idle');

  const bossRush=await page.evaluate(()=>{
    towerMode=false; bossRushMode=true; bossRushIdx=5; worldRun.active=false;
    defeatFinalized=true;
    return window.__12rQA.retryAfterDefeat();
  });
  expect(bossRush.bossRushMode).toBe(true);
  expect(bossRush.bossRushIdx).toBe(0);
  expect(bossRush.battlePhase).toBe('idle');
  expect(errors).toEqual([]);
});

test('botões de reinício não curam nem preservam progresso de sequências',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    window.__12rQA.setSpecialRun('tower',6,73);
  });
  await page.waitForTimeout(400);
  await page.locator('#battleToolsToggle').click();
  await page.locator('#restartTool').click();
  let snapshot=await page.evaluate(()=>({towerMode,towerFloor,bossRushMode,bossRushIdx,battlePhase}));
  expect(snapshot.towerMode).toBe(true);
  expect(snapshot.towerFloor).toBe(1);

  await page.evaluate(()=>{ window.__12rQA.setSpecialRun('boss',5,41); skipStory(); });
  await page.waitForTimeout(400);
  await page.locator('#battleToolsToggle').click();
  await page.locator('#restartTool').click();
  snapshot=await page.evaluate(()=>({towerMode,towerFloor,bossRushMode,bossRushIdx,battlePhase}));
  expect(snapshot.bossRushMode).toBe(true);
  expect(snapshot.bossRushIdx).toBe(0);
  expect(errors).toEqual([]);
});

test('conclusão do Boss Rush volta ao mapa sem cair na campanha',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const completed=await page.evaluate(()=>window.__12rQA.finishBossRush());
  expect(completed).toEqual({bossRushMode:false,bossRushIdx:8,victoryExitToMap:true,victoryExitMode:'boss',overlay:true});
  await page.click('#playAgainBtn');
  await expect(page.locator('#mapScreen')).toHaveClass(/show/);
  const state=await page.evaluate(()=>({worldActive:worldRun.active,bossRushMode,towerMode,mapMode,worldPanel:document.getElementById('worldScreen').classList.contains('show')}));
  expect(state).toEqual({worldActive:false,bossRushMode:false,towerMode:false,mapMode:'boss',worldPanel:false});
  expect(errors).toEqual([]);
});

test('conta local usa PBKDF2 com salt e migra hash legado',async({page})=>{
  const errors=await boot(page);
  const result=await page.evaluate(async()=>{
    const short=await loginOrRegister('curta@example.test','1234');
    const created=await loginOrRegister('nova@example.test','SenhaSegura-10');
    const first=JSON.parse(localStorage.getItem('12r_localusers'))['nova@example.test'];
    const legacyPass='SenhaLegada-10';
    const users=JSON.parse(localStorage.getItem('12r_localusers'));
    users['legado@example.test']={passHash:await sha256Hex(legacyPass),account:{email:'legado@example.test'}};
    localStorage.setItem('12r_localusers',JSON.stringify(users));
    const migratedLogin=await loginOrRegister('legado@example.test',legacyPass);
    const migrated=JSON.parse(localStorage.getItem('12r_localusers'))['legado@example.test'];
    return {short,created,first,migratedLogin,migrated};
  });
  expect(result.short.erro).toContain('8');
  expect(result.created.ok).toBe(true);
  expect(result.first.passHash).toBeUndefined();
  expect(result.first.credential.scheme).toBe('pbkdf2-sha256');
  expect(result.first.credential.iterations).toBe(600000);
  expect(result.first.credential.salt.length).toBeGreaterThan(16);
  expect(result.migratedLogin.ok).toBe(true);
  expect(result.migrated.passHash).toBeUndefined();
  expect(result.migrated.credential.scheme).toBe('pbkdf2-sha256');
  expect(errors).toEqual([]);
});

test('catálogo oferece vitrine dos cinco movimentos',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{
    const sheet=src=>({src,format:'sheet',frames:4,cols:2,rows:2,duration:400});
    const demo='assets/characters/runtime-v7/adriel-jovem/attack-2x3.png';
    KINGDOMS[0].sprites={idle:sheet(demo),attack:{...sheet(demo),frames:6,cols:3},cast:{...sheet(demo),frames:6,cols:3},hit:sheet(demo),victory:sheet(demo)};
    window.__12rQA.openCard(0);
  });
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
  await expect(page.locator('#motionShowcase')).toBeVisible();
  await expect(page.locator('#motionShowcaseActions button')).toHaveCount(5);
  for(const action of ['idle','attack','cast','hit','victory']){
    await page.locator(`#motionShowcaseActions button[data-motion="${action}"]`).click();
    await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-action',action);
  }
  expect(errors).toEqual([]);
});

test('matriz runtime cobre 24 personagens por cinco movimentos no navegador',async({page})=>{
  const errors=await boot(page,'flow');
  const runtimeReady=await page.evaluate(()=>Object.keys(window.YGDRIA_V10_ANIMATIONS||{}).length===24);
  test.skip(!runtimeReady,'matriz runtime-v10 ainda não promovida');

  const matrix=await page.evaluate(async()=>{
    const actions=['idle','attack','cast','hit','victory'];
    const issues=[];
    for(let index=0;index<KINGDOMS.length;index++){
      const hero=KINGDOMS[index];
      if(!hero.sprites||actions.some(action=>!hero.sprites[action])){
        issues.push(`${hero.id}: manifesto incompleto`);
        continue;
      }
      for(const action of actions){
        const spec=hero.sprites[action];
        const response=await fetch(spec.src,{cache:'no-store'});
        if(!response.ok||!response.headers.get('content-type')?.includes('image/png')) issues.push(`${hero.id}/${action}: HTTP ${response.status}`);
      }
      openCardModal(index);
      for(const action of actions){
        const avatar=document.getElementById('motionShowcaseAvatar');
        animateHeroAvatar(avatar,hero,action,{hold:true});
        const sheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
        if(!sheet||avatar.dataset.action!==action) issues.push(`${hero.id}/${action}: runner sem folha`);
        stopHeroAnimation(avatar);
      }
      document.getElementById('cardModal').classList.remove('show');
    }
    return {heroes:KINGDOMS.length,sheets:KINGDOMS.flatMap(hero=>actions.map(action=>hero.sprites?.[action]?.src)).filter(Boolean).length,issues};
  });
  expect(matrix).toEqual({heroes:24,sheets:120,issues:[]});
  expect(errors).toEqual([]);
});

test('folha ausente volta automaticamente para a arte estática',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{
    window.__12rQA.setSpriteFailure(0,'assets/characters/runtime-v10/inexistente/idle.png');
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
  });
  await expect(page.locator('#party-luz-avatar .hero-sprite-image')).toBeVisible();
  expect(await page.locator('#party-luz-avatar .hero-sprite-sheet').count()).toBe(0);
  expect(errors.length).toBeGreaterThanOrEqual(1);
  expect(errors.every(error=>error.includes('404'))).toBe(true);
});

test('PWA abre o núcleo v10 sem rede depois da instalação',async({page,context})=>{
  await boot(page,'flow');
  const registration=await page.evaluate(async()=>{
    const ready=await navigator.serviceWorker.ready;
    if(!navigator.serviceWorker.controller){
      await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
    }
    return {scope:ready.scope,caches:await caches.keys()};
  });
  expect(registration.scope).toContain('/');
  expect(registration.caches).toContain('12r-v10.0.49');
  try{
    await context.setOffline(true);
    await page.reload({waitUntil:'domcontentloaded'});
    await expect(page.locator('body')).toHaveAttribute('data-game-ready','1');
    await expect(page.locator('#menuVersion')).toContainText('VERSÃO 10');
  }finally{
    await context.setOffline(false);
  }
});

test('preferência reduzida do sistema congela a folha animada',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(()=>localStorage.removeItem('12r_motion'));
  const errors=await boot(page);
  const reduced=await page.evaluate(()=>{
    const sheet=src=>({src,format:'sheet',frames:4,cols:2,rows:2,duration:240});
    KINGDOMS[0].sprites={idle:sheet('assets/characters/runtime-v7/adriel-jovem/attack-2x3.png')};
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    return {reducedMotion,raf:Boolean(document.getElementById('party-luz-avatar').__actionFrameRaf)};
  });
  expect(reduced.reducedMotion).toBe(true);
  expect(reduced.raf).toBe(false);
  expect(errors).toEqual([]);
});

test('ativar movimento reduzido interrompe loops já em execução',async({page})=>{
  const errors=await boot(page);
  const state=await page.evaluate(()=>{
    const demo='assets/characters/runtime-v7/adriel-jovem/attack-2x3.png';
    KINGDOMS[0].sprites={idle:{src:demo,format:'sheet',frames:4,cols:2,rows:2,duration:240,loop:true}};
    chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    const avatar=document.getElementById('party-luz-avatar');
    const before=Boolean(avatar.__actionFrameRaf);
    const toggle=document.getElementById('reduceMotionToggle');
    toggle.checked=true; toggle.dispatchEvent(new Event('change',{bubbles:true}));
    return {before,reducedMotion,after:Boolean(avatar.__actionFrameRaf)};
  });
  expect(state).toEqual({before:true,reducedMotion:true,after:false});
  expect(errors).toEqual([]);
});

test('rerender da equipe preserva golens e harpias',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const initial=await page.evaluate(()=>window.__12rQA.setSummons(2,2));
  const refreshed=await page.evaluate(()=>window.__12rQA.refreshParty());
  expect(initial).toEqual({golemAllies:2,harpyAllies:2,golems:2,harpies:2});
  expect(refreshed).toEqual(initial);
  expect(errors).toEqual([]);
});

test('invocações menores não interceptam o toque dos heróis',async({page})=>{
  const errors=await boot(page);
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); window.__12rQA.setSummons(2,2); });
  const summons=await page.evaluate(()=>[...document.querySelectorAll('.summon-unit')].map(unit=>({
    pointer:getComputedStyle(unit).pointerEvents,
    width:Math.round(unit.querySelector('.avatar-circle').getBoundingClientRect().width)
  })));
  expect(summons).toHaveLength(4);
  expect(summons.every(s=>s.pointer==='none'&&s.width<=48)).toBe(true);
  expect(errors).toEqual([]);
});

test('menu não baixa elenco inteiro e batalha limita animações à equipe ativa',async({page})=>{
  const animationRequests=[];
  page.on('request',request=>{
    if(request.url().includes('/assets/characters/runtime-v10/')) animationRequests.push(new URL(request.url()).pathname);
  });
  const errors=await boot(page,'flow');
  await page.waitForTimeout(900);
  expect(animationRequests).toEqual([]);
  const runtimeReady=await page.evaluate(()=>Object.keys(window.YGDRIA_V10_ANIMATIONS||{}).length===24);
  test.skip(!runtimeReady,'matriz runtime-v10 ainda não promovida');

  const selected=await page.evaluate(()=>{
    chosenIds=[0,1,2,3];
    const ids=chosenIds.map(index=>KINGDOMS[index].id);
    beginGame(0); skipStory();
    return ids;
  });
  await expect.poll(()=>new Set(animationRequests).size,{timeout:7000}).toBeGreaterThanOrEqual(4);
  expect(animationRequests.every(path=>selected.some(id=>path.includes(`/runtime-v10/${id}/`)))).toBe(true);
  expect(new Set(animationRequests).size).toBeLessThanOrEqual(20);
  expect(errors).toEqual([]);
});

test.describe('mobile',()=>{
  test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  test('menu, seleção e batalha não estouram a largura',async({page})=>{
    const errors=await boot(page);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); });
    await expect(page.locator('.board')).toBeVisible();
    const battleOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(battleOverflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });

  test('receber dano não recompõe a arena nem pisca no mobile',async({page})=>{
    const errors=await boot(page,'flow');
    await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
    await page.waitForTimeout(900);
    const result=await page.evaluate(async()=>{
      const arena=document.querySelector('.arena');
      const avatars=[...document.querySelectorAll('.party-row .avatar-circle')];
      const frames=[];
      enemyCounterAttack();
      await new Promise(resolve=>{
        let count=0;
        const sample=()=>{
          const arenaStyle=getComputedStyle(arena);
          frames.push({
            actions:avatars.map(avatar=>avatar.dataset.action),
            arenaClass:arena.className,
            arenaAnimation:arenaStyle.animationName,
            arenaOpacity:arenaStyle.opacity,
            avatars:avatars.map(avatar=>{
              const style=getComputedStyle(avatar);
              const sheet=avatar.firstElementChild;
              const sheetStyle=getComputedStyle(sheet||avatar);
              return {filter:style.filter,opacity:style.opacity,visibility:style.visibility,sheetOpacity:sheetStyle.opacity,sheetVisibility:sheetStyle.visibility};
            })
          });
          if(++count<30) requestAnimationFrame(sample); else resolve();
        }
        requestAnimationFrame(sample);
      });
      return {
        hitFrames:frames.filter(frame=>frame.actions.every(action=>action==='hit')).length,
        shakeFrames:frames.filter(frame=>frame.arenaClass.includes('shake')||frame.arenaAnimation!=='none').length,
        unstableFrames:frames.filter(frame=>frame.arenaOpacity!=='1'||frame.avatars.some(avatar=>avatar.filter!=='none'||avatar.opacity!=='1'||avatar.visibility!=='visible'||avatar.sheetOpacity!=='1'||avatar.sheetVisibility!=='visible')).length
      };
    });
    expect(result.hitFrames).toBeGreaterThan(0);
    expect(result.shakeFrames).toBe(0);
    expect(result.unstableFrames).toBe(0);
    expect(errors).toEqual([]);
  });
});

test.describe('@production publicação real',()=>{
  test.skip(!process.env.PRODUCTION_QA,'executado somente após o Pages publicar o SHA da v10');
  test('gate público abre e o jogo autenticado completa o fluxo principal',async({page})=>{
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{ if(message.type()==='error') errors.push(message.text()); });
    await page.goto(`${baseURL}/`,{waitUntil:'networkidle'});
    await expect(page).toHaveTitle(/Ygdria/i);
    await expect(page.locator('#f')).toBeVisible();

    await page.addInitScript(()=>{
      sessionStorage.setItem('ygdria_gate','ok');
      localStorage.setItem('12r_tutorial_seen','true');
      localStorage.setItem('12r_tutorial','true');
    });
    await page.goto(`${baseURL}/play.html?seed=v10-production`,{waitUntil:'networkidle'});
    await expect(page.locator('body')).toHaveAttribute('data-game-ready','1');
    await expect(page.locator('#menuVersion')).toContainText('VERSÃO 10');
    await expect.poll(()=>page.evaluate(()=>window.YGDRIA_V10?.version)).toBe('v10.0.49');

    // Produção não expõe __12rQA: este trecho percorre somente controles reais.
    if(await page.locator('#introScreen').isVisible()) await page.locator('#introNext').click();
    if(await page.locator('#langScreen').isVisible()) await page.locator('#langScreen [data-lang="pt"]').click();
    if(await page.locator('#loginScreen').isVisible()) await page.locator('#guestBtn').click();
    await page.click('#playBtn');
    await page.waitForTimeout(400);
    await page.locator('#mapCanvas .realm-pin.unlocked').click();
    await page.locator('#worldMap .fase-node:not(.locked)').first().click();
    await expect(page.locator('#selectScreen')).toBeVisible();
    await page.waitForTimeout(400);
    await expect(page.locator('.select-card.chosen')).toHaveCount(4);
    await expect(page.locator('#startBtn')).toBeEnabled();
    await page.click('#startBtn');
    await expect(page.locator('.hero-unit')).toHaveCount(4);
    await expect(page.locator('.board .gem')).toHaveCount(36);
    await expect(page.locator('#enemyPortrait-0 .enemy-runtime-sheet.grid-sheet')).toHaveCount(1);
    if(await page.locator('#storySkip').isVisible()) await page.locator('#storySkip').click();

    await page.locator('.mini-card').first().click();
    await expect(page.locator('#motionShowcase')).toBeVisible();
    for(const action of ['idle','attack','cast','hit','victory']){
      await page.locator(`#motionShowcaseActions button[data-motion="${action}"]`).click();
      await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-action',action);
    }
    expect(errors).toEqual([]);
  });
});
