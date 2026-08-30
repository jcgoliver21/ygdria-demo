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
  await expect(page.locator('#menuVersion')).toContainText('VERSÃO 11');
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

test('janela pública libera as dez fases humanas e ancora Bernyce no trono existente',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.click('#playBtn');
  await page.waitForTimeout(400);
  await page.locator('#mapCanvas .realm-pin.unlocked').click();
  await expect(page.locator('#worldMap .fase-node')).toHaveCount(10);
  await expect(page.locator('#worldMap .fase-node.locked')).toHaveCount(0);
  expect(await page.locator('#worldNote').textContent()).toContain('Teste público');
  await page.evaluate(()=>{
    worldRun={active:true,fase:9,nivel:1,storyMode:false};
    chosenIds=['adriel-jovem','gareth','roland','elizier'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  await expect(page.locator('.royal-court-cast')).toHaveCount(1);
  await expect(page.locator('.royal-court-bernyce')).toBeVisible();
  await expect(page.locator('.royal-court-jules')).toBeVisible();
  await expect(page.locator('.royal-court-kalander')).toBeVisible();
  const seated=await page.locator('.royal-court-bernyce').evaluate(image=>({loaded:image.complete&&image.naturalWidth>0,bottom:image.getBoundingClientRect().bottom}));
  expect(seated.loaded).toBe(true);
  await page.evaluate(()=>{
    worldRun.nivel=2;
    activeStageData=buildWorldLevel();
    renderStageProgress();
  });
  await expect(page.locator('.royal-court-jules')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('v11 mostra dez formações e seleciona pelo corpo visível sem setas',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await expect(page.locator('.hero-select-arrow')).toHaveCount(0);
  const hitProbe=await page.evaluate(()=>window.__12rQA.heroBodyHitProbe());
  expect(hitProbe).toHaveLength(4);
  expect(hitProbe.every(item=>item.point&&item.groundPhysics==='grounded')).toBe(true);
  await expect(page.locator('.hero-unit[data-facing="left"]')).toHaveCount(4);
  await expect(page.locator('.enemy-unit[data-facing="left"]')).toHaveCount(1);
  await expect(page.locator('.mini-rotate')).toHaveCount(4);
  await page.mouse.click(hitProbe[0].point.x,hitProbe[0].point.y);
  await expect(page.locator('#battleStatus')).toContainText('carregue a aura');
  await page.evaluate(()=>window.__12rQA.grantEnergy(ACTIVE[0],100));
  const chargedProbe=await page.evaluate(()=>window.__12rQA.heroBodyHitProbe());
  await page.mouse.click(chargedProbe[0].point.x,chargedProbe[0].point.y);
  await expect(page.locator('#abilityPickerScreen')).toHaveClass(/show/);
  await page.locator('[data-close="abilityPickerScreen"]').click();
  await expect(page.locator('#abilityPickerScreen')).not.toHaveClass(/show/);
  await page.click('#battleToolsToggle');
  await expect(page.locator('#battleToolsPanel')).toHaveClass(/open/);
  await expect(page.locator('#formationTool')).toBeVisible();
  const names=[];
  for(let i=0;i<10;i++){
    await page.click('#formationTool');
    names.push((await page.locator('#formationTool').textContent()).trim());
  }
  expect(new Set(names).size).toBe(10);
  await page.click('#battleToolsClose');
  expect(errors).toEqual([]);
});

test('Guarda-costas usa exatamente as células definidas e Adriel inicia para a esquerda',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const probe=await page.evaluate(()=>{
    chosenIds=['adriel-jovem','gareth','roland','elizier'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    formationIndex=1; applyBattleFormation();
    const refs=[...document.querySelectorAll('.party-row .hero-unit')].map(unit=>unit.dataset.gridRefs);
    const adriel=document.querySelector('#party-adriel-jovem .hero-sprite-sheet');
    return {refs,adrielFlipped:adriel?.classList.contains('flip'),facing:document.getElementById('party-adriel-jovem')?.dataset.facing};
  });
  expect(probe.refs).toEqual(['11,20','5','14,23','32']);
  expect(probe.facing).toBe('left');
  expect(probe.adrielFlipped).toBe(true);
  expect(errors).toEqual([]);
});

test('final humano encena prólogo, quedas e teleporte antes do epílogo canônico',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{
    worldRun={active:true,fase:9,nivel:5,storyMode:false};
    chosenIds=['adriel-jovem','gareth','roland','elizier'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  await expect(page.locator('.human-final-prelude')).toBeVisible();
  await expect(page.locator('#arena')).toHaveClass(/human-finale-before-darkness/);
  await expect(page.locator('.royal-court-bernyce')).toHaveCount(0);
  await expect(page.locator('.royal-court-kalander')).toHaveCount(0);
  await expect(page.locator('.royal-court-jules')).toBeVisible();
  await expect(page.locator('.royal-court-cedric')).toBeVisible();
  await expect(page.locator('.finale-bernyce.finale-prelude-arena')).toBeVisible();
  await expect(page.locator('.finale-kalander.finale-prelude-arena')).toBeVisible();
  await expect(page.locator('.finale-cedric.finale-prelude')).toHaveCount(1);
  await page.evaluate(()=>YGDRIA_HUMAN_FINALE.run('prelude',{speed:.02}));
  await page.waitForTimeout(130);
  await expect(page.locator('.royal-court-cast')).toHaveClass(/court-jules-leaving/);
  await expect(page.locator('.royal-court-cast')).toHaveClass(/court-cedric-joining/);
  await expect(page.locator('.human-final-prelude')).toHaveClass(/cedric-joined/);
  await expect(page.locator('.finale-cedric.finale-prelude')).toBeVisible();
  await page.evaluate(()=>YGDRIA_HUMAN_FINALE.run('victory',{speed:.02}));
  await expect(page.locator('.human-final-scene')).toBeVisible();
  await page.waitForTimeout(180);
  await expect(page.locator('.human-final-scene')).toHaveClass(/adriel-teleporting/);
  await expect(page.locator('.finale-shadow')).toHaveClass(/dissolving/);
  await expect(page.locator('#party-roland')).toHaveClass(/human-final-hero-fallen/);
  await expect(page.locator('#party-elizier')).toHaveClass(/human-final-hero-fallen/);
  await expect(page.locator('#party-gareth')).toHaveClass(/human-final-hero-fallen/);
  await expect(page.locator('#party-adriel-jovem')).toHaveClass(/human-final-adriel-vanished/);
  await page.waitForTimeout(180);
  await expect(page.locator('#storyLayer')).toHaveClass(/show/);
  expect(errors).toEqual([]);
});

test('Sophitia e futuros heróis do Vento usam física de voo acima da sombra',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const probe=await page.evaluate(async()=>{
    const sophitia=KINGDOMS.findIndex(hero=>hero.id==='vento');
    chosenIds=[sophitia,0,1,2]; beginGame(0); skipStory();
    await window.__12rQA.heroBodyHitProbe();
    const unit=document.getElementById('party-vento');
    const avatar=unit.querySelector('.avatar-circle');
    const airborneTransform=getComputedStyle(avatar).transform;
    avatar.dataset.action='defeat';
    const defeatedTransform=getComputedStyle(avatar).transform;
    avatar.dataset.action='idle';
    return {rule:window.__12rQA.windRealmFlightProbe(),className:unit.className,groundPhysics:unit.dataset.groundPhysics,airborneTransform,defeatedTransform};
  });
  expect(probe.rule).toEqual({sophitia:true,futureWindHero:true,groundedHero:false});
  expect(probe.className).toContain('hero-flying');
  expect(probe.groundPhysics).toBe('flight');
  expect(probe.airborneTransform).not.toBe('none');
  expect(probe.defeatedTransform).toBe('none');
  expect(errors).toEqual([]);
});

test('lore canônica controla fases, elencos, falas e atmosferas no runtime',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const probe=await page.evaluate(()=>{
    worldRun.active=true;
    const atmospheres=[];
    for(let fase=0;fase<10;fase++){
      worldRun.fase=fase;
      worldRun.nivel=fase===9?4:1;
      renderStageProgress();
      atmospheres.push(document.getElementById('arena').dataset.missionAtmosphere);
    }
    worldRun.fase=9; worldRun.nivel=5; renderStageProgress();
    const missionFive=document.getElementById('arena').dataset.missionAtmosphere;
    return {
      source:globalThis.YGDRIA_HUMANOS_LORE?.source,
      hash:globalThis.YGDRIA_HUMANOS_LORE?.sourceHash,
      names:WORLDS[0].fases.map(phase=>phase.nome),
      subtitles:WORLDS[0].fases.map(phase=>phase.sub),
      allowed:HUMAN_STORY.map(phase=>phase.allowed),
      fixed:HUMAN_STORY.map(phase=>phase.fixed),
      garethLine:HUMAN_STORY[5].missions[1][0],
      finalSpeakers:HUMAN_STORY[9].after.map(step=>step.h||step.name),
      atmospheres,
      missionFive
    };
  });
  expect(probe.source).toBe('docs/REINO-HUMANOS-FASES-EDITAVEL.md');
  expect(probe.hash).toMatch(/^[a-f0-9]{64}$/);
  expect(probe.names).toHaveLength(10);
  expect(probe.subtitles[0]).toBe('O Encontro Predestinado na Capital de Ygdria');
  expect(probe.subtitles[8]).toBe('O Prólogo do Fim');
  expect(probe.allowed[0]).toEqual(['adriel-jovem','berenice-jovem','galateia-jovem','acqua-jovem']);
  expect(probe.fixed[7]).toEqual(['adriel-jovem','berenice-jovem','galateia-jovem']);
  expect(probe.allowed[9]).toEqual(['adriel-jovem','gareth','roland','elizier']);
  expect(probe.garethLine).toEqual({h:'gareth',t:'Não estou gostando nada disso pessoal.'});
  expect(probe.finalSpeakers).toEqual(['Narrador','Cedric','Narrador','Narrador']);
  expect(probe.atmospheres).toEqual(['cherry-petals','sacred-pink-light','none','none','festival-confetti','shadow-fog','library-pages','fireworks','darkness','none']);
  expect(probe.missionFive).toBe('total-darkness');
  expect(errors).toEqual([]);
});

test('atmosferas canônicas permanecem legíveis no mobile e a missão final usa escuridão total',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const probe=await page.evaluate(()=>{
    worldRun.active=true;
    worldRun.fase=0;
    worldRun.nivel=1;
    chosenIds=[0,1,2,3];
    beginGame(0);
    skipStory();
    const sample=(fase,nivel=1)=>{
      worldRun.fase=fase;
      worldRun.nivel=nivel;
      renderStageProgress();
      const arena=document.getElementById('arena');
      const atmosphere=arena.querySelector('.arena-atmosphere');
      const drift=arena.querySelector('.arena-world-drift');
      const fog=arena.querySelector('.arena-cold-fog');
      const fireworksCanvas=arena.querySelector('.arena-fireworks-canvas');
      const atmosphereStyle=getComputedStyle(atmosphere);
      const before=getComputedStyle(atmosphere,'::before');
      const after=getComputedStyle(atmosphere,'::after');
      const driftStyle=getComputedStyle(drift);
      const fogStyle=getComputedStyle(fog);
      return {
        key:arena.dataset.missionAtmosphere,
        pointerEvents:atmosphereStyle.pointerEvents,
        backgroundImage:atmosphereStyle.backgroundImage,
        backgroundColor:atmosphereStyle.backgroundColor,
        beforeOpacity:Number(before.opacity),
        beforeAnimation:before.animationName,
        afterOpacity:Number(after.opacity),
        afterAnimation:after.animationName,
        driftOpacity:Number(driftStyle.opacity),
        driftAnimation:driftStyle.animationName,
        fireworksOpacity:Number(getComputedStyle(fireworksCanvas).opacity),
        fireworksWidth:fireworksCanvas.getBoundingClientRect().width,
        fogOpacity:Number(fogStyle.opacity),
        fogHeight:fog.getBoundingClientRect().height,
        arenaHeight:arena.getBoundingClientRect().height
      };
    };
    return {
      sacred:sample(1),
      fog:sample(5),
      pagesStart:sample(6,1),
      pagesEnd:sample(6,5),
      fireworks:sample(7),
      darkness:sample(8),
      totalDarkness:sample(9,5)
    };
  });
  expect(probe.sacred).toMatchObject({key:'sacred-pink-light',pointerEvents:'none',driftAnimation:'sacredPinkBreath',beforeAnimation:'sacredRaySweep',afterAnimation:'sacredMoteRise'});
  expect(probe.sacred.driftOpacity).toBeGreaterThan(.3);
  expect(probe.sacred.beforeOpacity).toBeGreaterThan(.4);
  expect(probe.fog).toMatchObject({key:'shadow-fog',pointerEvents:'none',fogOpacity:1});
  expect(probe.fog.fogHeight/probe.fog.arenaHeight).toBeGreaterThan(.65);
  expect(probe.pagesStart).toMatchObject({key:'library-pages',driftAnimation:'libraryPagesFall',beforeAnimation:'libraryPagesFallNear'});
  expect(probe.pagesStart.driftOpacity).toBeGreaterThan(.5);
  expect(probe.pagesEnd.driftOpacity).toBeGreaterThan(probe.pagesStart.driftOpacity);
  expect(probe.pagesEnd.afterOpacity).toBeGreaterThan(probe.pagesStart.afterOpacity);
  expect(probe.fireworks).toMatchObject({key:'fireworks',driftAnimation:'none',beforeAnimation:'none',afterAnimation:'none'});
  expect(probe.fireworks.fireworksOpacity).toBeGreaterThan(.9);
  expect(probe.fireworks.fireworksWidth).toBeGreaterThan(300);
  expect(probe.darkness.key).toBe('darkness');
  expect(probe.totalDarkness.key).toBe('total-darkness');
  expect(probe.totalDarkness.backgroundColor).toBe('rgba(0, 0, 0, 0.94)');
  expect(probe.totalDarkness.backgroundImage).not.toBe(probe.darkness.backgroundImage);
  await page.emulateMedia({reducedMotion:'reduce'});
  const reduced=await page.evaluate(()=>{
    worldRun.fase=7;
    worldRun.nivel=1;
    renderStageProgress();
    const arena=document.getElementById('arena');
    const atmosphere=arena.querySelector('.arena-atmosphere');
    return {
      drift:getComputedStyle(arena.querySelector('.arena-world-drift')).animationName,
      before:getComputedStyle(atmosphere,'::before').animationName,
      after:getComputedStyle(atmosphere,'::after').animationName
    };
  });
  expect(reduced).toEqual({drift:'none',before:'none',after:'none'});
  expect(errors).toEqual([]);
});

test('v13 mantém a grade da Cidade e libera o validador em todas as fases',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  await page.waitForTimeout(400); // respeita a proteção contra toque herdado da entrada na batalha
  await page.click('#battleToolsToggle');
  await expect(page.locator('#battleToolsPanel')).toHaveClass(/open/);
  const grid=await page.evaluate(()=>{
    const party=[...document.querySelectorAll('#physicalFloorGrid .party-grid-cell')];
    const enemy=[...document.querySelectorAll('#physicalFloorGrid .enemy-grid-cell')];
    const bounds=list=>{
      const rects=list.map(el=>el.getBoundingClientRect());
      return {top:Math.min(...rects.map(rect=>rect.top)),bottom:Math.max(...rects.map(rect=>rect.bottom))};
    };
    const floorCell=party[0];
    const rect=floorCell?.getBoundingClientRect();
    return {
      available:document.getElementById('arena')?.classList.contains('tactical-grid-available'),
      active:document.getElementById('arena')?.classList.contains('tactical-grid'),
      cells:party.length+enemy.length,
      partyLabels:party.map(el=>el.dataset.gridSlot),
      enemyLabels:enemy.map(el=>el.dataset.gridSlot),
      partyRows:[...new Set(party.map(el=>el.dataset.gridRow))],
      enemyRows:[...new Set(enemy.map(el=>el.dataset.gridRow))],
      sameFloorHeight:Math.abs((bounds(party).bottom-bounds(party).top)-(bounds(enemy).bottom-bounds(enemy).top))<2,
      floorCell:floorCell?{width:rect.width,height:rect.height,offsetWidth:floorCell.offsetWidth,offsetHeight:floorCell.offsetHeight,computedWidth:getComputedStyle(floorCell).width,computedHeight:getComputedStyle(floorCell).height}:null
    };
  });
  expect(grid).toMatchObject({available:true,active:false});
  expect(grid.cells).toBe(33);
  expect(grid.partyLabels).toEqual(['01','02','03','04','05','06','10','11','12','13','14','15','19','20','21','22','23','24','28','29','30','31','32','33']);
  expect(grid.enemyLabels).toEqual(['07','08','09','16','17','18','25','26','27']);
  expect(grid.partyRows).toEqual(['1','2','3','4']);
  expect(grid.enemyRows).toEqual(['1','2','3']);
  expect(grid.sameFloorHeight).toBe(true);
  expect(grid.floorCell.offsetWidth).toBe(grid.floorCell.offsetHeight);
  expect(grid.floorCell.computedWidth).toBe(grid.floorCell.computedHeight);
  await page.click('#gridTool');
  await expect(page.locator('#arena')).toHaveClass(/(?:^|\s)tactical-grid(?:\s|$)/);
  await expect.poll(()=>page.evaluate(()=>localStorage.getItem('12r_tactical_grid'))).toBe('1');
  await page.evaluate(()=>{ worldRun.fase=1; syncCerejeiraTacticalGrid(); });
  await expect(page.locator('#gridTool')).toBeVisible();
  await expect(page.locator('#arena')).toHaveClass(/tactical-grid-available/);
  await expect(page.locator('#arena')).toHaveClass(/(?:^|\s)tactical-grid(?:\s|$)/);
  await page.click('#gridTool');
  await expect(page.locator('#arena')).not.toHaveClass(/(?:^|\s)tactical-grid(?:\s|$)/);
  expect(errors).toEqual([]);
});

test('narrador mantém a caixa e falas de feras ou heróis acompanham o corpo',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{
    worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; worldRun.storyMode=true;
    chosenIds=['adriel-jovem','berenice-jovem','galateia-jovem','acqua-jovem'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0);
  });
  await expect(page.locator('#storyLayer')).toHaveClass(/narrator-box/);
  await expect(page.locator('#storyLayer')).not.toHaveClass(/speaker-bubble/);
  await expect(page.locator('#storyName')).toHaveText('Narrador');
  await page.evaluate(()=>advanceStory());
  await expect(page.locator('#storyLayer')).toHaveClass(/speaker-bubble/);
  await expect(page.locator('#storyLayer')).toHaveAttribute('data-story-anchor','enemy-0');
  await expect(page.locator('#storyText')).toHaveText('Blub... ploc-ploc... splash!');
  const beastBubble=await page.evaluate(()=>{
    const bubble=document.querySelector('#storyLayer .story-box').getBoundingClientRect();
    const anchor=document.getElementById('enemy-0').getBoundingClientRect();
    return {left:bubble.left,right:bubble.right,top:bubble.top,bottom:bubble.bottom,anchorCenter:anchor.left+anchor.width/2,bubbleCenter:bubble.left+bubble.width/2};
  });
  expect(beastBubble.left).toBeGreaterThanOrEqual(0);
  expect(beastBubble.right).toBeLessThanOrEqual(390);
  expect(Math.abs(beastBubble.anchorCenter-beastBubble.bubbleCenter)).toBeLessThan(130);
  await page.evaluate(()=>showStorySequence([{h:'adriel-jovem',t:'Vamos proteger a cidade!'}]));
  await expect(page.locator('#storyLayer')).toHaveAttribute('data-story-anchor','party-adriel-jovem');
  await expect(page.locator('#storyText')).toHaveText('Vamos proteger a cidade!');
  await page.evaluate(()=>skipStory());
  expect(errors).toEqual([]);
});

test('fala canônica do Gareth acompanha o corpo na Praça das Doze Essências',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{
    worldRun.active=true; worldRun.fase=5; worldRun.nivel=3; worldRun.storyMode=true;
    chosenIds=['adriel-jovem','berenice-jovem','galateia-jovem','gareth'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0);
  });
  await expect(page.locator('#storyLayer')).toHaveClass(/speaker-bubble/);
  await expect(page.locator('#storyLayer')).not.toHaveClass(/story-speaker-fallback/);
  await expect(page.locator('#storyLayer')).toHaveAttribute('data-story-anchor','party-gareth');
  await expect(page.locator('#storyText')).toHaveText('Tá vindo mais...');
  const bubble=await page.evaluate(()=>{
    const box=document.querySelector('#storyLayer .story-box').getBoundingClientRect();
    const gareth=document.getElementById('party-gareth').getBoundingClientRect();
    const style=getComputedStyle(document.querySelector('#storyLayer .story-box'));
    return {boxBottom:box.bottom,garethTop:gareth.top,centerGap:Math.abs(box.left+box.width/2-(gareth.left+gareth.width/2)),borderRadius:style.borderRadius,backdropFilter:style.backdropFilter,accent:style.getPropertyValue('--story-accent').trim()};
  });
  expect(bubble.boxBottom).toBeLessThanOrEqual(bubble.garethTop+18);
  expect(bubble.centerGap).toBeLessThan(125);
  expect(bubble.borderRadius).toContain('15px');
  expect(bubble.backdropFilter).toContain('blur');
  expect(bubble.accent).toMatch(/^#/);
  const skip=await page.evaluate(()=>{
    const button=document.getElementById('storySkip'),rect=button.getBoundingClientRect(),arena=document.getElementById('arena').getBoundingClientRect();
    return {text:button.textContent.trim(),left:rect.left,top:rect.top,arenaRight:arena.right,arenaBottom:arena.bottom,border:getComputedStyle(button).border};
  });
  expect(skip.text).toBe('»');
  expect(skip.left).toBeGreaterThan(skip.arenaRight-48);
  expect(skip.top).toBeGreaterThan(skip.arenaBottom-42);
  expect(skip.border).toMatch(/^0px none/);
  await page.evaluate(()=>{
    skipStory(); worldRun.fase=0; worldRun.nivel=5; worldRun.storyMode=true;
    chosenIds=['adriel-jovem','berenice-jovem','galateia-jovem','acqua-jovem'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0);
  });
  await expect(page.locator('#storyLayer')).toHaveAttribute('data-story-anchor','party-adriel-jovem');
  await page.evaluate(()=>advanceStory());
  await expect(page.locator('#storyText')).toHaveText('Só se me derrotar primeiro, moleque!');
  await expect(page.locator('#storyLayer')).toHaveAttribute('data-story-anchor','enemy-2');
  expect(errors).toEqual([]);
});

test('fogos da Muralha lançam projéteis e centelhas com gravidade e arrasto',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{
    worldRun.active=true; worldRun.fase=7; worldRun.nivel=2; worldRun.storyMode=false;
    chosenIds=['adriel-jovem','berenice-jovem','galateia-jovem','gareth'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  await expect(page.locator('.arena-fireworks-canvas')).toBeVisible();
  await expect.poll(()=>page.evaluate(()=>window.__12rQA.fireworksPhysicsProbe()),{timeout:4000}).toMatchObject({atmosphere:'fireworks',canvas:true,running:true,mode:'ballistic',gravity:true,drag:true});
  const probe=await page.evaluate(()=>window.__12rQA.fireworksPhysicsProbe());
  expect(probe.activeParticles).toBeGreaterThan(0);
  expect(probe.particleCap).toBeLessThanOrEqual(210);
  const frozen=await page.evaluate(()=>{
    gamePaused=true;
    const canvas=document.querySelector('.arena-fireworks-canvas'),ctx=canvas.getContext('2d');
    const alpha=()=>{ const data=ctx.getImageData(0,0,canvas.width,canvas.height).data; let sum=0; for(let i=3;i<data.length;i+=4) sum+=data[i]; return sum; };
    return {before:alpha()};
  });
  await page.waitForTimeout(150);
  frozen.after=await page.evaluate(()=>{ const canvas=document.querySelector('.arena-fireworks-canvas'),data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data; let sum=0; for(let i=3;i<data.length;i+=4) sum+=data[i]; return sum; });
  expect(frozen.before).toBeGreaterThan(0);
  expect(frozen.after).toBe(frozen.before);
  expect(errors).toEqual([]);
});

test('formações dos heróis seguem exatamente as células e interpolações canônicas',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const probe=await page.evaluate(()=>window.__12rQA.heroFormationGridProbe());
  expect(probe.map(item=>item.name)).toEqual(['Líder','Guarda-costas','Cercados','Defensiva','Ofensiva','Vanguarda em V','Asa Dupla','Diamante','Escalonada','Berserker']);
  expect(probe.map(item=>item.slots.map(slot=>slot.refs))).toEqual([
    [[14,23],[3],[12,21],[30]],
    [[11,20],[5],[14,23],[32]],
    [[6],[14],[23],[33]],
    [[2],[11],[20],[29]],
    [[5],[14],[23],[32]],
    [[14,23],[12,13,21,22],[2],[29]],
    [[5],[32],[3],[30]],
    [[14,23],[3,4],[30,31],[11,20]],
    [[5],[13],[21],[29]],
    [[17],[4,5],[13,22],[31,32]]
  ]);
  expect(probe[9].slots[0].side).toBe('enemy');
  expect(probe[9].slots[0]).toMatchObject({x:83.3333,y:22});
  const mobileBerserker=await page.evaluate(()=>{
    worldRun.active=true; worldRun.fase=0; worldRun.nivel=1; chosenIds=[0,1,2,3]; beginGame(0); skipStory();
    formationIndex=9; applyBattleFormation();
    const unit=document.querySelector('.party-row .hero-unit');
    return {refs:unit?.dataset.gridRefs,x:parseFloat(unit?.style.getPropertyValue('--slot-x')),depth:Number(unit?.dataset.depth)};
  });
  expect(mobileBerserker.refs).toBe('17');
  expect(mobileBerserker.x).toBeCloseTo(83.3333,3);
  expect(mobileBerserker.depth).toBeCloseTo(22/46,3);
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
  expect(probe).toMatchObject({characterSheet:true,characterAction:'attack',genericAction:'cast',genericMotion:true,genericSheet:true,legacyBodyAura:false});
  expect(probe.idleSource).toContain('/physics-v11/humanos/enemies/slime-cereja/idle/sheet-transparent.png');
  expect(probe.idleFrameCount).toBe(10);
  expect(probe.rootedIdle).toMatchObject({active:true,sheetAnimation:'none',sheetTransform:'none'});
  expect(probe.rootedIdle.source).toContain('/physics-v11/humanos/enemies/capitao/idle/sheet-transparent.png');
  expect(probe.rootedIdle.sheetTransform).toBe('none');
  const rootedStart=await page.evaluate(()=>window.__12rQA.rootedEnemyActionProbe());
  await page.waitForTimeout(900);
  const rootedAction={...rootedStart,...await page.evaluate(()=>window.__12rQA.rootedEnemyActionSnapshot())};
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
  const result=await page.evaluate(async()=>{
    const samples=[];
    for(const heroIdx of ACTIVE){
      const avatar=document.getElementById('party-'+KINGDOMS[heroIdx].id+'-avatar');
      const actions=['idle','attack','cast','hit','victory'];
      const scales=[];
      for(const action of actions){
        await preloadSpriteSource(KINGDOMS[heroIdx].sprites[action].src);
        window.__12rQA.playHeroAction(heroIdx,action);
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
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

test('aura de habilidade carregada usa VFX no corpo, sem aura de sprite nem moldura',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const aura=await page.evaluate(()=>window.__12rQA.heroAuraProbe());
  expect(aura).toEqual({ready:true,legacyBodyAura:false,vfx:true,rectangularGlow:'none'});
  expect(errors).toEqual([]);
});

test('arena cinematica mantém profundidade, luz localizada e sombra de contato estável',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const state=await page.evaluate(()=>{
    const arena=document.getElementById('arena');
    const source=document.querySelector('.hero-unit');
    const target=document.querySelector('.enemy-unit');
    const shadow=target?.querySelector('.unit-ground-shadow');
    const idle=target?.querySelector('.enemy-sprite-image,.hero-sprite-sheet');
    spawnCombatFx('impact',target,'#bde9ff',120);
    spawnCombatAttackFx('fogo',source,target,'#ff744d','critical');
    return {
      depth:Boolean(arena?.querySelector('.arena-depth')),
      midground:Boolean(arena?.querySelector('.arena-midground-light')),
      lighting:Boolean(arena?.querySelector('.arena-lighting')),
      atmosphere:Boolean(arena?.querySelector('.arena-atmosphere')),
      mood:arena?.dataset.arenaMood||'',
      lightPulse:arena?.classList.contains('arena-light-pulse'),
      shadowDisplay:getComputedStyle(shadow).display,
      shadowAnimation:getComputedStyle(shadow).animationName,
      idleScale:getComputedStyle(idle).scale,
      idleTransform:getComputedStyle(idle).transform,
      signature:Boolean(document.querySelector('.fx-attack-signature.attack-fogo')),
      origin:Boolean(document.querySelector('.fx-attack-signature .attack-origin')),
      motes:document.querySelectorAll('.fx-attack-signature .attack-mote').length
    };
  });
  expect(state.depth).toBe(true);
  expect(state.midground).toBe(true);
  expect(state.lighting).toBe(true);
  expect(state.atmosphere).toBe(true);
  expect(state.mood).not.toBe('');
  expect(state.lightPulse).toBe(true);
  expect(state.shadowDisplay).toBe('block');
  expect(state.shadowAnimation).toBe('none');
  expect(state.idleScale).not.toBe('none');
  expect(state.idleTransform).not.toContain('scale(');
  expect(state.signature).toBe(true);
  expect(state.origin).toBe(true);
  expect(state.motes).toBe(2);
  expect(errors).toEqual([]);
});

test('lâmina do Gareth cruza a arena sem projétil mágico ou variação de escala',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['adriel-jovem','berenice-jovem','galateia-jovem','gareth'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  const attack=await page.evaluate(()=>{
    const gareth=KINGDOMS.find(hero=>hero.id==='gareth');
    const source=document.getElementById('party-gareth-avatar');
    const target=document.getElementById('enemyPortrait-0');
    const idleScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
    playHeroAction(KINGDOMS.findIndex(hero=>hero.id==='gareth'),'attack');
    const actionDisplayScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
    spawnCombatAttackFx('humanos',source,target,gareth.colorLight,'impact',gareth);
    const fx=document.querySelector('.fx-attack-signature');
    const layer=document.getElementById('specialFxLayer').getBoundingClientRect();
    const sourceRect=source.getBoundingClientRect(), targetRect=target.getBoundingClientRect();
    const expectedOrigin=sourceRect.left-layer.left+sourceRect.width*.68;
    const expectedContact=targetRect.left-layer.left+targetRect.width*.36;
    return {style:fx?.dataset.attackStyle,sheet:Boolean(fx?.querySelector('.attack-sheet')),contact:Boolean(fx?.querySelector('.attack-contact')),trail:Boolean(fx?.querySelector('.attack-trail')),origin:Boolean(fx?.querySelector('.attack-origin')),color:fx?.style.getPropertyValue('--attack-color'),sourceAnchor:fx?.dataset.sourceAnchor,targetAnchor:fx?.dataset.targetAnchor,fxOrigin:Number.parseFloat(fx?.style.left||'0'),expectedOrigin,expectedContact,idleScale,actionDisplayScale,actionScale:ACTION_PHYSICS_SCALE.gareth.attack};
  });
  expect(attack).toMatchObject({style:'blade',sheet:true,contact:true,trail:false,origin:false,color:'#ed5b9c',actionScale:1});
  expect(Math.abs(attack.fxOrigin-attack.expectedOrigin)).toBeLessThan(1);
  expect(attack.expectedContact).toBeGreaterThan(attack.expectedOrigin);
  expect(attack.sourceAnchor).toBe('party-gareth-avatar');
  expect(attack.targetAnchor).toBe('enemyPortrait-0');
  expect(attack.actionDisplayScale).toBe(attack.idleScale);
  expect(errors).toEqual([]);
});

test('magia humana concentra no herói, atravessa a arena e não altera a escala corporal',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['gareth','roland','julius','adriel-jovem'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  const spell=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const index=KINGDOMS.findIndex(hero=>hero.id==='gareth');
    const source=document.getElementById('party-gareth-avatar');
    const target=document.getElementById('enemy-0');
    const idleScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
    triggerHeroCastAnim(index);
    launchSpecialFx(index,{tipo:'damage',kind:'active'});
    await wait(180);
    const sheet=document.querySelector('.human-magic-fx-sheet');
    const special=sheet?.closest('.special-cast');
    const castingScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
    const active={
      sheet:Boolean(sheet),src:getComputedStyle(sheet||document.body).backgroundImage,
      source:Boolean(source),target:Boolean(target),action:source.dataset.action,
      originX:special?.style.getPropertyValue('--sx'),targetX:special?.style.getPropertyValue('--tx'),
      travelX:special?.style.getPropertyValue('--ddx'),idleScale,castingScale
    };
    await wait(1780);
    return {...active,returned:source.dataset.action,remaining:document.querySelectorAll('.human-magic-fx-sheet').length};
  });
  expect(spell).toMatchObject({sheet:true,source:true,target:true,action:'cast',returned:'idle',remaining:0});
  expect(spell.src).toContain('/assets/vfx/v12-magic/humanos/gareth/cast/processed-v2/sheet-transparent.png');
  expect(Number.parseFloat(spell.travelX)).toBeGreaterThan(0);
  expect(spell.castingScale).toBe(spell.idleScale);
  expect(errors).toEqual([]);
});

test('auras assinatura R16 aparecem no avatar e são limpas após a conjuração',async({page})=>{
  const errors=await boot(page,'flow');
  const result=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const cast=async id=>{
      const index=KINGDOMS.findIndex(hero=>hero.id===id);
      const source=document.getElementById('party-'+id+'-avatar');
      const idleScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
      /* A mesma ordem do combate: a folha corporal de conjuração precisa
         estar decodificada antes de o VFX começar. Sem essa espera, um cache
         frio testa um estado transitório (idle + aura) que o jogador nunca
         vê no uso de habilidade. */
      await triggerHeroCastAnim(index);
      await wait(32);
      launchSpecialFx(index,{tipo:'damage',kind:'active'});
      await wait(150);
      const aura=document.querySelector(`.human-conjuration-aura[data-owner="${id}"] .conjuration-aura-sheet`);
      const castingScale=getComputedStyle(source.querySelector('.hero-sprite-sheet')).getPropertyValue('--sprite-scale').trim();
      const active={id,action:source.dataset.action,aura:Boolean(aura),source:getComputedStyle(aura||document.body).backgroundImage,idleScale,castingScale};
      await wait(940);
      return {...active,remaining:document.querySelectorAll(`.human-conjuration-aura[data-owner="${id}"]`).length};
    };
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['kalander','jules','bernyce','julius'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    const specials=[];
    for(const id of ['kalander','jules','bernyce','julius']) specials.push(await cast(id));
    chosenIds=['gareth','roland','elizier','adriel-jovem'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    const defaultAura=await cast('gareth');
    return {specials,defaultAura};
  });
  const expected={
    kalander:'v15-conjuration/special/kalander',
    jules:'v15-conjuration/special/jules',
    bernyce:'v14-conjuration/special/bernyce',
    julius:'v15-conjuration/special/julius',
    gareth:'v13-conjuration/aura-runes'
  };
  for(const sample of [...result.specials,result.defaultAura]){
    expect(sample).toMatchObject({action:'cast',aura:true,remaining:0});
    expect(sample.source).toContain(expected[sample.id]);
    expect(sample.castingScale).toBe(sample.idleScale);
  }
  expect(errors).toEqual([]);
});

test('aura em 100% sustenta a conjuração e a ativa encerra em ataque no alvo',async({page})=>{
  const errors=await boot(page,'flow');
  const choreography=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const waitFor=async(predicate,timeout=2800)=>{
      const deadline=performance.now()+timeout;
      while(performance.now()<deadline){ if(predicate()) return true; await wait(40); }
      return predicate();
    };
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['julius','gareth','roland','cedric'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    const idx=KINGDOMS.findIndex(hero=>hero.id==='julius');
    const hero=KINGDOMS[idx];
    const passive=hero.abilities.find(ability=>ability.kind==='passive');
    const active=hero.abilities.find(ability=>ability.kind==='active');
    const avatar=document.getElementById('party-julius-avatar');
    triggerAbility(idx,passive,{deferRoomCheck:true});
    await waitFor(()=>avatar.dataset.action==='cast'&&Boolean(document.querySelector('.human-conjuration-aura[data-owner="julius"]'))&&Boolean(document.querySelector('[data-fx="conjuration"]')));
    const passiveCast={
      action:avatar.dataset.action,
      aura:Boolean(document.querySelector('.human-conjuration-aura[data-owner="julius"]')),
      castFx:Boolean(document.querySelector('[data-fx="conjuration"]'))
    };
    await waitFor(()=>avatar.dataset.action==='attack'&&Boolean(document.querySelector('.fx-attack-signature')));
    const passiveAttack={
      action:avatar.dataset.action,
      target:document.querySelector('.fx-attack-signature')?.dataset.targetAnchor||''
    };
    await wait(900);
    heroActiveQueue[idx]=[active]; heroReady[idx]=true;
    updateHeroProgressUI(idx); beginHeroConjurationLoop(idx);
    await waitFor(()=>avatar.dataset.action==='cast'&&Boolean(document.querySelector('.human-conjuration-aura.sustained[data-owner="julius"]')));
    const held={
      action:avatar.dataset.action,
      sustained:Boolean(document.querySelector('.human-conjuration-aura.sustained[data-owner="julius"]')),
      ready:document.getElementById('party-julius')?.classList.contains('conjuring-ready'),
      bar:document.getElementById('charge-'+hero.id)?.style.width,
      label:document.getElementById('chargeText-'+hero.id)?.textContent||''
    };
    useQueuedActive(idx,active);
    await waitFor(()=>avatar.dataset.action==='attack'&&Boolean(document.querySelector('.fx-attack-signature')));
    const released={
      action:avatar.dataset.action,
      sustained:Boolean(document.querySelector('.human-conjuration-aura.sustained[data-owner="julius"]')),
      target:document.querySelector('.fx-attack-signature')?.dataset.targetAnchor||''
    };
    await waitFor(()=>avatar.dataset.action==='idle');
    return {passiveCast,passiveAttack,held,released,returned:avatar.dataset.action};
  });
  expect(choreography.passiveCast).toMatchObject({action:'cast',aura:true,castFx:true});
  expect(choreography.passiveAttack.action).toBe('attack');
  expect(choreography.passiveAttack.target).toBe('enemyPortrait-0');
  expect(choreography.held).toMatchObject({action:'cast',sustained:true,ready:true,bar:'100%'});
  expect(choreography.held.label).toContain('100/100');
  expect(choreography.released).toMatchObject({action:'attack',sustained:false,target:'enemyPortrait-0'});
  expect(choreography.returned).toBe('idle');
  expect(errors).toEqual([]);
});

test('galeria individual reproduz os VFX de ataque e conjuração aprovados',async({page})=>{
  const errors=await boot(page,'flow');
  const gallery=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const idx=KINGDOMS.findIndex(hero=>hero.id==='julius');
    openCardModal(idx);
    await wait(120);
    document.querySelector('#motionShowcaseActions [data-motion="cast"]')?.click();
    await wait(160);
    const cast={
      action:document.getElementById('motionShowcaseAvatar')?.dataset.action,
      aura:getComputedStyle(document.getElementById('motionShowcaseAura')).backgroundImage,
      magic:getComputedStyle(document.getElementById('motionShowcaseVfx')).backgroundImage,
      target:document.getElementById('motionShowcaseTarget')?.classList.contains('visible')
    };
    document.querySelector('#motionShowcaseActions [data-motion="attack"]')?.click();
    await wait(160);
    const attack={
      action:document.getElementById('motionShowcaseAvatar')?.dataset.action,
      vfx:getComputedStyle(document.getElementById('motionShowcaseVfx')).backgroundImage,
      target:document.getElementById('motionShowcaseTarget')?.classList.contains('visible'),
      impact:document.getElementById('motionShowcaseImpact')?.classList.contains('active')
    };
    closeCardModalFn();
    return {cast,attack};
  });
  expect(gallery.cast.action).toBe('cast');
  expect(gallery.cast.aura).toContain('v15-conjuration/special/julius');
  expect(gallery.cast.magic).toContain('v12-magic/humanos/julius');
  expect(gallery.cast.target).toBe(false);
  expect(gallery.attack).toMatchObject({action:'attack',target:true,impact:true});
  expect(gallery.attack.vfx).toContain('v11-review/human/julius/attack');
  expect(errors).toEqual([]);
});

test('galeria individual cobre as cinco poses e os VFX das doze cartas humanas',async({page})=>{
  const errors=await boot(page,'flow');
  const audit=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const ids=['gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'];
    const actions=['idle','attack','cast','hit','victory'];
    const rows=[];
    for(const id of ids){
      const hero=KINGDOMS.find(candidate=>candidate.id===id);
      openCardModal(KINGDOMS.indexOf(hero));
      await wait(72);
      const row={id,poses:{},attackFx:'',castFx:'',aura:''};
      for(const action of actions){
        document.querySelector(`#motionShowcaseActions [data-motion="${action}"]`)?.click();
        await wait(84);
        row.poses[action]=document.getElementById('motionShowcaseAvatar')?.dataset.action||'';
        if(action==='attack') row.attackFx=getComputedStyle(document.getElementById('motionShowcaseVfx')).backgroundImage;
        if(action==='cast'){
          row.castFx=getComputedStyle(document.getElementById('motionShowcaseVfx')).backgroundImage;
          row.aura=getComputedStyle(document.getElementById('motionShowcaseAura')).backgroundImage;
        }
      }
      closeCardModalFn();
      rows.push(row);
    }
    return rows;
  });
  expect(audit).toHaveLength(12);
  for(const row of audit){
    expect(row.poses,JSON.stringify(row)).toMatchObject({idle:'idle',attack:'attack',cast:'cast',hit:'hit',victory:'victory'});
    expect(row.attackFx,JSON.stringify(row)).toContain(`v11-review/human/${row.id}/attack`);
    expect(row.castFx,JSON.stringify(row)).toContain(`v12-magic/humanos/${row.id}/cast`);
    const expectedAura={kalander:'v15-conjuration/special/kalander',bernyce:'v14-conjuration/special/bernyce',jules:'v15-conjuration/special/jules',julius:'v15-conjuration/special/julius'}[row.id]||'v13-conjuration/aura-runes';
    expect(row.aura,JSON.stringify(row)).toContain(expectedAura);
  }
  expect(errors).toEqual([]);
});

test('habilidade de fase inimiga conjura antes de atacar o herói frontal',async({page})=>{
  const errors=await boot(page,'flow');
  const choreography=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['gareth','roland','elizier','cedric'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    const enemy=enemies[0];
    const avatar=document.getElementById('enemyPortrait-0');
    const running=performEnemyStageAbility(0,enemy,{nome:'Dreno de Aura',tipo:'drenarTodosECurar',valor:6,curaMult:1,desc:'teste'});
    await wait(160);
    const cast={action:avatar.dataset.action,telegraph:Boolean(document.querySelector('[data-fx="telegraph"]'))};
    await wait(770);
    const fx=document.querySelector('.fx-attack-signature');
    const attack={action:avatar.dataset.action,target:fx?.dataset.targetAnchor||''};
    await running;
    return {cast,attack,charging:document.getElementById('enemy-0')?.classList.contains('charging')};
  });
  expect(choreography.cast).toMatchObject({action:'cast',telegraph:true});
  expect(choreography.attack.action).toBe('attack');
  expect(choreography.attack.target).toMatch(/^party-.*-avatar$/);
  expect(choreography.charging).toBe(false);
  expect(errors).toEqual([]);
});

test('VFXs usam ancoragem real, Kalander alcança o alvo e a aura não vaza entre missões',async({page})=>{
  const errors=await boot(page,'flow');
  const audit=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const heroIdx=KINGDOMS.findIndex(hero=>hero.id==='kalander');
    chosenIds=['kalander','gareth','roland','cedric'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    const hero=KINGDOMS[heroIdx];
    const source=document.getElementById('party-kalander-avatar');
    const target=document.getElementById('enemyPortrait-0');
    spawnCombatAttackFx('humanos',source,target,hero.colorLight,'impact',hero);
    const kalanderFx=document.querySelector('.fx-attack-signature');
    const kalander={
      travels:kalanderFx?.classList.contains('attack-projectile'),
      source:kalanderFx?.dataset.sourceAnchor||'',target:kalanderFx?.dataset.targetAnchor||'',
      distance:Number.parseFloat(kalanderFx?.style.getPropertyValue('--attack-sheet-travel')||'0')
    };
    const active={kind:'active',name:'QA Aura',gems:100,tipo:'cura',valor:1};
    heroActiveQueue[heroIdx]=[active]; heroReady[heroIdx]=true; updateHeroProgressUI(heroIdx);
    openAbilityPicker(heroIdx);
    const picker=document.getElementById('abilityPickerScreen');
    const pickerDialog=picker?.querySelector('.ability-picker-dialog');
    const pickerStyle=getComputedStyle(picker);
    const pickerProbe={
      overlayPointerEvents:pickerStyle.pointerEvents,
      overlayTransparent:pickerStyle.backgroundColor==='rgba(0, 0, 0, 0)',
      dialogPointerEvents:getComputedStyle(pickerDialog).pointerEvents,
      width:pickerDialog?.getBoundingClientRect().width||0
    };
    picker?.classList.remove('show');
    openCardModal(heroIdx);
    await wait(80);
    /* A interação já é coberta pela vitrine integral; aqui verificamos a
       mesma função de renderização que ela chama, sem competir com o preload
       assíncrono das folhas ao abrir o modal. */
    renderMotionShowcaseVfx(hero,'attack');
    await wait(32);
    const showcaseFx=document.getElementById('motionShowcaseVfx');
    const showcaseTarget=document.getElementById('motionShowcaseTarget');
    const galleryAttack={
      source:showcaseFx?.dataset.sourceAnchor||'',target:showcaseFx?.dataset.targetAnchor||'',
      dx:Number.parseFloat(showcaseFx?.style.getPropertyValue('--showcase-travel-x')||'0'),
      targetVisible:showcaseTarget?.classList.contains('visible')
    };
    renderMotionShowcaseVfx(hero,'cast');
    await wait(32);
    const caster=document.getElementById('motionShowcaseAvatar')?.getBoundingClientRect();
    const aura=document.getElementById('motionShowcaseAura');
    const galleryCast={
      auraX:Number.parseFloat(aura?.style.left||'0'),
      casterX:caster?caster.left-document.querySelector('.motion-showcase-stage').getBoundingClientRect().left+caster.width*.5:0
    };
    closeCardModalFn();
    enemies.forEach(enemy=>enemy.hp=0);
    roomClearScheduled=true;
    heroActiveQueue[heroIdx]=[active]; heroReady[heroIdx]=true;
    const blocked=beginHeroConjurationLoop(heroIdx);
    const between={blocked,legacy:document.querySelectorAll('.unit-charge-aura').length,conjuration:document.querySelectorAll('.human-conjuration-aura').length};
    roomClearScheduled=false;
    enemies[0].hp=1;
    setBattlePhase('idle');
    const inMission=beginHeroConjurationLoop(heroIdx);
    await wait(90);
    const mission={inMission,vfx:document.querySelectorAll('.human-conjuration-aura[data-owner="kalander"]').length};
    clearHeroConjurationLoops();
    return {kalander,picker:pickerProbe,galleryAttack,galleryCast,between,mission};
  });
  expect(audit.kalander).toMatchObject({travels:true,source:'party-kalander-avatar',target:'enemyPortrait-0'});
  expect(audit.kalander.distance).toBeGreaterThan(25);
  expect(audit.picker).toMatchObject({overlayPointerEvents:'none',overlayTransparent:true,dialogPointerEvents:'auto'});
  expect(audit.picker.width).toBeLessThan(300);
  expect(audit.galleryAttack).toMatchObject({source:'motionShowcaseAvatar',target:'motionShowcaseTarget',targetVisible:true});
  expect(audit.galleryAttack.dx).toBeGreaterThan(60);
  expect(Math.abs(audit.galleryCast.auraX-audit.galleryCast.casterX)).toBeLessThan(2);
  expect(audit.between).toEqual({blocked:false,legacy:0,conjuration:0});
  expect(audit.mission.inMission).toBe(true);
  expect(audit.mission.vfx).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('Torre inicia a aura só no andar, roda o elenco sem repetição e mantém Game Over na arena',async({page})=>{
  const errors=await boot(page,'flow');
  const audit=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    towerMode=true; towerFloor=1; bossRushMode=false; worldRun.active=false;
    chosenIds=[0,1,2,3]; beginGame(0);
    const heroIdx=ACTIVE[0];
    const active=KINGDOMS[heroIdx].abilities.find(ability=>ability.kind==='active');
    heroActiveQueue[heroIdx]=[active]; heroReady[heroIdx]=true; updateHeroProgressUI(heroIdx);
    const before={
      field:missionFieldStarted,
      blocked:beginHeroConjurationLoop(heroIdx),
      aura:document.querySelectorAll('.human-conjuration-aura').length,
      intro:document.getElementById('storyLayer')?.classList.contains('show')
    };
    skipStory(true);
    await wait(120);
    const after={
      field:missionFieldStarted,
      aura:document.querySelectorAll(`.human-conjuration-aura[data-owner="${KINGDOMS[heroIdx].id}"]`).length
    };
    clearHeroConjurationLoops();
    const order=towerStoryOrder();
    const first=buildTowerStage(1);
    const repeat=buildTowerStage(order.length+1);
    const roster={
      size:order.length,
      unique:new Set(order.map(opponent=>opponent.cardId||opponent.etype)).size,
      named:order.every(opponent=>typeof opponent.name==='string'&&opponent.name.length>0),
      first:first.enemies[0].name,
      scale:repeat.enemies[0].maxHp/first.enemies[0].maxHp,
      label:document.getElementById('stageLabel')?.textContent
    };
    const facing={
      bernyce:heroFacingDirection(KINGDOMS.find(hero=>hero.id==='bernyce')),
      kalander:heroFacingDirection(KINGDOMS.find(hero=>hero.id==='kalander')),
      jules:heroFacingDirection(KINGDOMS.find(hero=>hero.id==='jules')),
      elizierEnemy:enemyFacingDirection({cardId:'elizier'}),
      rolandEnemy:enemyFacingDirection(order.find(enemy=>enemy.cardId==='roland')),
      juliusEnemy:enemyFacingDirection(order.find(enemy=>enemy.cardId==='julius')),
      slimeCerejaEnemy:enemyFacingDirection(order.find(enemy=>enemy.etype==='slimeCereja'))
    };
    const spriteFlip={
      roland:enemySpriteFlip(order.find(enemy=>enemy.cardId==='roland')),
      julius:enemySpriteFlip(order.find(enemy=>enemy.cardId==='julius')),
      slimeCereja:enemySpriteFlip(order.find(enemy=>enemy.etype==='slimeCereja'))
    };
    eternalReviveCharges=0; chamarizCharges=0; playerHP=0;
    handlePlayerDefeat();
    await wait(1120);
    return {
      before,after,roster,facing,spriteFlip,
      gameOver:{
        panel:document.getElementById('towerGameOverPanel')?.classList.contains('show'),
        boardHidden:document.getElementById('board')?.classList.contains('tower-board-hidden'),
        defeatOverlay:document.getElementById('defeatOverlay')?.classList.contains('show'),
        report:document.getElementById('towerGameOverPanel')?.textContent||'',
        downed:[...document.querySelectorAll('.hero-unit .avatar-circle')].every(avatar=>avatar.dataset.action==='defeat')
      }
    };
  });
  expect(audit.before).toMatchObject({field:false,blocked:false,aura:0,intro:true});
  expect(audit.after.field).toBe(true);
  expect(audit.after.aura).toBeGreaterThan(0);
  expect(audit.roster.size).toBeGreaterThan(8);
  expect(audit.roster.unique).toBe(audit.roster.size);
  expect(audit.roster.named).toBe(true);
  expect(audit.roster.first).toBe('Slime de Cerejeira');
  expect(audit.roster.scale).toBeCloseTo(1.2,1);
  expect(audit.roster.label).toContain('Andar 1');
  expect(audit.facing).toEqual({
    bernyce:'right',kalander:'right',jules:'right',elizierEnemy:'left',
    rolandEnemy:'right',juliusEnemy:'right',slimeCerejaEnemy:'left'
  });
  expect(audit.spriteFlip).toEqual({roland:true,julius:true,slimeCereja:false});
  expect(audit.gameOver).toMatchObject({panel:true,boardHidden:true,defeatOverlay:false,downed:true});
  expect(audit.gameOver.report).toContain('Ranking das cartas usadas');
  expect(errors).toEqual([]);
});

test('inimigo-carta só manifesta aura VFX durante a habilidade de fase',async({page})=>{
  const errors=await boot(page,'flow');
  const audit=await page.evaluate(async()=>{
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    chosenIds=['gareth','roland','elizier','cedric'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
    enemies=[{name:'Gareth',cardId:'gareth',hp:180,maxHp:180,atk:20,sprite:'assets/enemies/humanos/gareth.png'}];
    renderEnemies();
    const idle={
      legacy:document.querySelectorAll('.unit-charge-aura').length,
      charging:document.getElementById('enemy-0')?.classList.contains('charging'),
      vfx:document.querySelectorAll('.human-conjuration-aura[data-owner="gareth"]').length
    };
    const running=performEnemyStageAbility(0,enemies[0],{nome:'Investida de Teste',tipo:'drenarTodosECurar',valor:1,curaMult:1});
    await wait(150);
    const casting={
      action:document.getElementById('enemyPortrait-0')?.dataset.action,
      legacy:document.querySelectorAll('.unit-charge-aura').length,
      vfx:document.querySelectorAll('.human-conjuration-aura[data-owner="gareth"]').length
    };
    await running;
    await wait(90);
    return {idle,casting};
  });
  expect(audit.idle).toEqual({legacy:0,charging:false,vfx:0});
  expect(audit.casting).toMatchObject({action:'cast',legacy:0});
  expect(audit.casting.vfx).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('Julius, Gareth e Roland mantêm a estatura e o pé fixo durante cada ataque',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['gareth','roland','julius','adriel-jovem'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  const samples=await page.evaluate(async()=>{
    const ids=['gareth','roland','julius'];
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const frame=async(id,action,delay=0)=>{
      const index=KINGDOMS.findIndex(hero=>hero.id===id);
      playHeroAction(index,action); if(delay) await wait(delay);
      const sheet=document.querySelector(`#party-${id}-avatar .hero-sprite-sheet`);
      const rect=sheet.getBoundingClientRect(), scale=Number(sheet.style.getPropertyValue('--sprite-scale')||1);
      const anchor=Number.parseFloat(getComputedStyle(sheet).transformOrigin.split(' ')[1]);
      return {scale,anchor,foot:rect.top+rect.height*.92578125};
    };
    const result={};
    for(const id of ids){
      const idle=await frame(id,'idle');
      const early=await frame(id,'attack',40);
      const middle=await frame(id,'attack',360);
      result[id]={idle,early,middle};
    }
    const juliusCast=await frame('julius','cast');
    return {result,juliusCast};
  });
  for(const id of ['gareth','roland','julius']){
    const row=samples.result[id];
    expect(Math.abs(row.idle.foot-row.early.foot),JSON.stringify({id,phase:'early',row})).toBeLessThan(1.1);
    expect(Math.abs(row.idle.foot-row.middle.foot),JSON.stringify({id,phase:'middle',row})).toBeLessThan(1.1);
    expect(row.early.anchor).toBeGreaterThan(120);
  }
  expect(samples.juliusCast.scale).toBeCloseTo(samples.result.julius.idle.scale,4);
  expect(errors).toEqual([]);
});

test('Elizier parte do arco e contra-ataques miram um herói corporal da frente',async({page})=>{
  const errors=await boot(page,'flow');
  await page.evaluate(()=>{
    worldRun={active:true,fase:5,nivel:1,storyMode:false};
    chosenIds=['elizier','roland','gareth','cedric'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(0); skipStory();
  });
  const targeting=await page.evaluate(()=>{
    const elizier=KINGDOMS.find(hero=>hero.id==='elizier');
    const elizierAvatar=document.getElementById('party-elizier-avatar');
    const enemyAvatar=document.getElementById('enemyPortrait-0');
    playHeroAction(KINGDOMS.findIndex(hero=>hero.id==='elizier'),'attack');
    spawnCombatAttackFx('humanos',elizierAvatar,enemyAvatar,elizier.colorLight,'impact',elizier);
    const elizierFx=document.querySelector('.fx-attack-signature');
    const enemy=enemies[0];
    const front=frontHeroAttackTarget(enemyAvatar);
    spawnCombatAttackFx(enemyFxRealm(enemy),enemyAvatar,front.avatar,enemyAuraPalette(enemy)[1],'impact',enemy);
    const fx=[...document.querySelectorAll('.fx-attack-signature')].at(-1);
    return {
      projectile:elizierFx?.classList.contains('attack-projectile'),
      elizierOrigin:elizierFx?.dataset.sourceAnchor,
      elizierTarget:elizierFx?.dataset.targetAnchor,
      enemyOrigin:fx?.dataset.sourceAnchor,
      enemyTarget:fx?.dataset.targetAnchor,
      computedFront:front.avatar.id,
      pointsToHud:fx?.dataset.targetAnchor==='playerHpAnchor'
    };
  });
  expect(targeting.projectile).toBe(true);
  expect(targeting.elizierOrigin).toBe('party-elizier-avatar');
  expect(targeting.elizierTarget).toBe('enemyPortrait-0');
  expect(targeting.enemyOrigin).toBe('enemyPortrait-0');
  expect(targeting.enemyTarget).toBe(targeting.computedFront);
  expect(targeting.pointsToHud).toBe(false);
  expect(errors).toEqual([]);
});

test('auditoria mobile: os doze humanos atacam o alvo sem piscar, sumir ou trocar de corpo',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  const audit=await page.evaluate(async()=>{
    const ids=['gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'];
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const rows=[];
    for(let offset=0;offset<ids.length;offset+=4){
      const batch=ids.slice(offset,offset+4);
      chosenIds=batch.map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
      worldRun={active:true,fase:5,nivel:1,storyMode:false};
      beginGame(0); skipStory();
      await preloadHeroActions(ACTIVE);
      for(const id of batch){
        const index=KINGDOMS.findIndex(hero=>hero.id===id);
        const avatar=document.getElementById(`party-${id}-avatar`);
        const target=document.getElementById('enemyPortrait-0');
        const idle=avatar.querySelector('.hero-sprite-sheet').getBoundingClientRect();
        triggerHeroAttackAnim(index);
        applyDamageToEnemy(1,index,0);
        await wait(130);
        const sheet=avatar.querySelector('.hero-sprite-sheet');
        const fx=[...document.querySelectorAll('.fx-attack-signature')].at(-1);
        const action=sheet.getBoundingClientRect();
        const expectedDirection=Math.sign((target.getBoundingClientRect().left+target.getBoundingClientRect().width*.5)-(avatar.getBoundingClientRect().left+avatar.getBoundingClientRect().width*.5));
        rows.push({
          id,action:avatar.dataset.action,src:sheet.style.getPropertyValue('--sprite-url'),
          opacity:Number(getComputedStyle(avatar).opacity),visibility:getComputedStyle(avatar).visibility,
          heightDelta:Math.abs(action.height-idle.height),footDelta:Math.abs(action.bottom-idle.bottom),
          target:fx?.dataset.targetAnchor,source:fx?.dataset.sourceAnchor,
          vector:Number.parseFloat(fx?.style.getPropertyValue('--attack-dx')||'0'),expectedDirection
        });
        await wait(760);
      }
    }
    return rows;
  });
  expect(audit).toHaveLength(12);
  for(const row of audit){
    expect(row.action,JSON.stringify(row)).toBe('attack');
    expect(row.src,JSON.stringify(row)).toContain(`assets/physics-v11/humanos/heroes/${row.id}/`);
    if(row.id==='cedric') expect(row.src).toContain('/attack-r4/');
    expect(row.opacity,JSON.stringify(row)).toBeGreaterThan(.98);
    expect(row.visibility,JSON.stringify(row)).toBe('visible');
    expect(row.heightDelta,JSON.stringify(row)).toBeLessThan(1.1);
    expect(row.footDelta,JSON.stringify(row)).toBeLessThan(1.1);
    expect(row.source,JSON.stringify(row)).toBe(`party-${row.id}-avatar`);
    expect(row.target,JSON.stringify(row)).toBe('enemyPortrait-0');
    expect(Math.sign(row.vector),JSON.stringify(row)).toBe(row.expectedDirection);
  }
  expect(errors).toEqual([]);
});

test('informação de batalha fica abaixo de HP, tabuleiro e cartas',async({page})=>{
  const errors=await boot(page,'flow');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{ chosenIds=[0,1,2,3]; beginGame(0); skipStory(); });
  const layout=await page.evaluate(()=>{
    const arena=document.getElementById('arena').getBoundingClientRect();
    const consoleRect=document.querySelector('.combat-console').getBoundingClientRect();
    const dock=document.querySelector('.battle-info-dock').getBoundingClientRect();
    return {arenaBottom:Math.round(arena.bottom),consoleBottom:Math.round(consoleRect.bottom),dockTop:Math.round(dock.top),dockBottom:Math.round(dock.bottom),lastChild:document.querySelector('.game-frame').lastElementChild?.id||document.querySelector('.game-frame').lastElementChild?.className||''};
  });
  expect(layout.dockTop).toBeGreaterThanOrEqual(layout.consoleBottom-1);
  expect(layout.dockTop).toBeGreaterThanOrEqual(layout.arenaBottom-1);
  expect(layout.dockBottom).toBeLessThanOrEqual(844);
  expect(errors).toEqual([]);
});

test('início órfão retorna ao prólogo e aplica o elenco permitido',async({page})=>{
  const errors=await boot(page,'flow');
  const state=await page.evaluate(()=>{
    worldRun={active:false,fase:9,nivel:5,storyMode:true}; pendingStage=999;
    chosenIds=['adriel-jovem','gareth','roland','elizier'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
    beginGame(pendingStage); skipStory();
    return {fase:worldRun.fase,nivel:worldRun.nivel,stageIndex,active:ACTIVE.map(index=>KINGDOMS[index].id),enemy:enemies[0]?.name};
  });
  expect(state).toEqual({fase:0,nivel:1,stageIndex:0,active:['adriel-jovem','gareth','roland','elizier'],enemy:'Slime de Cerejeira'});
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

test('botão de rotação no HUD troca a direção e preserva a animação idle',async({page})=>{
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

  await page.locator(`.mini-rotate[data-hero-index="${hero.index}"]`).click();

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
  expect(registration.caches).toContain('12r-v11.0.21');
  try{
    await context.setOffline(true);
    await page.reload({waitUntil:'domcontentloaded'});
    await expect(page.locator('body')).toHaveAttribute('data-game-ready','1');
    await expect(page.locator('#menuVersion')).toContainText('VERSÃO 11');
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
    await expect(page.locator('#menuVersion')).toContainText('VERSÃO 11');
    await expect.poll(()=>page.evaluate(()=>window.YGDRIA_V10?.version)).toBe('v11.0.21');
    await expect.poll(()=>page.evaluate(()=>({source:window.YGDRIA_HUMANOS_LORE?.source,phases:window.YGDRIA_HUMANOS_LORE?.phases?.length,hash:window.YGDRIA_HUMANOS_LORE?.sourceHash}))).toMatchObject({source:'docs/REINO-HUMANOS-FASES-EDITAVEL.md',phases:10});
    expect(await page.evaluate(()=>window.YGDRIA_HUMANOS_LORE?.sourceHash)).toMatch(/^[a-f0-9]{64}$/);

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
    /* A primeira fala pode entrar alguns frames após os avatares. Espere a
       apresentação terminar de montar e descarte a fila inteira antes de
       continuar o fluxo público; assim o smoke não confunde diálogo com HUD. */
    await page.waitForTimeout(650);
    for(let attempt=0;attempt<3;attempt++){
      if(await page.locator('#storySkip').isVisible()) await page.locator('#storySkip').click();
      await page.waitForTimeout(220);
      if(!await page.locator('#storyLayer').evaluate(layer=>layer.classList.contains('show'))) break;
    }
    await expect(page.locator('#storyLayer')).not.toHaveClass(/show/);

    await page.locator('.mini-card').first().click();
    await expect(page.locator('#motionShowcase')).toBeVisible();
    for(const action of ['idle','attack','cast','hit','victory']){
      await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-action','idle',{timeout:12000});
      await page.locator(`#motionShowcaseActions button[data-motion="${action}"]`).click();
      await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-requested-action',action);
      await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-action',action);
      if(action!=='idle'&&action!=='victory') await expect(page.locator('#motionShowcaseAvatar')).toHaveAttribute('data-action','idle',{timeout:12000});
    }
    expect(errors).toEqual([]);
  });
});
