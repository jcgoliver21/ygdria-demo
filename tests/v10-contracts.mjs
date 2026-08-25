import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('play.html');
const game=read('game-v10.js');
const css=read('styles-v10.css');
const config=read('v10-config.js');
const animations=read('v10-animations.js');
const lore=read('humanos-lore-v10.js');
const syncLore=read('tools/sync-humanos-lore.mjs');
const sw=read('sw.js');
const workflow=read('.github/workflows/v10-ci.yml');
const defeatPhysics=JSON.parse(read('assets/characters/defeat-physics-contract.json'));

const checks=[];
function check(name,fn){ fn(); checks.push(name); }

check('arquivos públicos apontam somente para v10',()=>{
  assert.match(html,/styles-v10\.css\?v=11\.0\.0/);
  assert.match(html,/v10-config\.js\?v=11\.0\.0/);
  assert.match(html,/v10-animations\.js\?v=11\.0\.0/);
  assert.match(html,/humanos-lore-v10\.js\?v=11\.0\.0/);
  assert.match(html,/game-v10\.js\?v=11\.0\.0/);
  assert.match(config,/version:'v11\.0\.0'/);
  assert.match(sw,/12r-v11\.0\.0/);
  assert.match(workflow,/expected_asset="\$\(grep -oE 'game-v10\\\.js\\\?v=\[0-9\.\]\+'/);
  assert.match(workflow,/grep -Fq "\$\{expected_asset\}"/);
  assert.doesNotMatch(workflow,/game-v10\.js\?v=10\.0\.33/);
  assert.doesNotMatch(html,/game-v9|styles-v9|v9\.3-config/);
});

check('Markdown editável é a fonte canônica das dez fases humanas',()=>{
  const payloadText=lore.match(/Object\.freeze\(([\s\S]*?)\);\s*\n\}\)/)?.[1];
  assert.ok(payloadText,'payload canônico ausente');
  const payload=JSON.parse(payloadText);
  assert.equal(payload.phases.length,10);
  assert.equal(payload.phases[0].subtitle,'O Encontro Predestinado na Capital de Ygdria');
  assert.equal(payload.phases[5].missions[1].lines[0].speaker,'Gareth');
  assert.equal(payload.phases[5].missions[2].lines[0].heroId,'gareth');
  assert.equal(payload.phases[0].missions[4].lines[1].heroId,'');
  for(const phase of payload.phases){
    for(const mission of phase.missions) for(const line of mission.lines) if(line.heroId) assert.ok(phase.allowed.includes(line.heroId),`${line.speaker} marcado como herói fora do elenco da fase ${phase.number}`);
  }
  assert.equal(payload.phases[7].fixed.length,3);
  assert.deepEqual(payload.phases[9].allowed,['adriel-jovem','gareth','roland','elizier']);
  assert.equal(payload.phases[9].visual.missionFive,'total-darkness');
  assert.equal(payload.phases[9].after.at(-3).speaker,'Cedric');
  assert.equal(payload.phases[0].missions[0].lines[0].text,'Blub... ploc-ploc... splash!');
  assert.equal(payload.phases[0].missions[1].lines[1].text,'Grrrr... auuuuu!');
  for(const key of ['cherry-petals','sacred-pink-light','festival-confetti','shadow-fog','library-pages','fireworks','darkness','total-darkness']) assert.ok(css.includes(key),`efeito ${key} ausente`);
  assert.match(game,/const HUMAN_LORE=globalThis\.YGDRIA_HUMANOS_LORE/);
  assert.match(game,/canonicalAfterSequence/);
  assert.match(game,/STORY_CAMPAIGN_VERSION='11\.0\.0'/);
});

check('narrador usa caixa e personagens ou feras usam balões ancorados',()=>{
  for(const needle of ['CREATURE_ONOMATOPOEIAS','function creatureOnomatopoeiaKind','function creatureOnomatopoeia','slime','wolf','harpy','golem','dragon','kraken','function storySpeakerAnchor','function positionStorySpeechBubble','speaker-bubble','data-story-anchor']) assert.ok(game.includes(needle)||css.includes(needle),`${needle} ausente`);
  for(const selector of ['.story-layer.show.speaker-bubble','.story-layer.speaker-bubble .story-box::after','.story-layer.speaker-bubble.story-speaker-fallback']) assert.ok(css.includes(selector),`${selector} ausente`);
  assert.match(game,/layer\.classList\.add\('narrator-box','cinematic'\)/);
  assert.match(game,/layer\.classList\.add\('speaker-bubble'\)/);
  assert.match(game,/!e\?\.isCard&&creatureOnomatopoeiaKind\(e\)/);
  for(const mapping of ["plain==='gareth'","plain==='roland'","plain==='elizier'"]) assert.ok(syncLore.includes(mapping),`${mapping} ausente do gerador`);
  for(const needle of ['--story-accent','backdrop-filter:blur(10px) saturate(1.15)','border-radius:15px 15px 15px 7px','width:fit-content','story-copy{flex:0 1 auto','story-copy b::before','story-skip{position:fixed','aria-label="Pular diálogo"']) assert.ok(css.includes(needle)||html.includes(needle),`${needle} ausente`);
});

check('fogos da Muralha usam lançamento e física balística em canvas',()=>{
  for(const needle of ['arena-fireworks-canvas','startArenaFireworks','particle.gravity','particle.drag','ResizeObserver','fireworksPhysicsProbe']) assert.ok(game.includes(needle)||css.includes(needle),`${needle} ausente`);
  assert.match(css,/\.arena\[data-mission-atmosphere="fireworks"\] \.arena-world-drift\{opacity:0;background:none;animation:none\}/);
  assert.match(css,/\.arena-fireworks-canvas\{/);
});

check('cache offline da v10 é isolado',()=>{
  assert.match(sw,/12r-v11\.0\.0/);
  for(const file of ['index.html','play.html','styles-v10.css','v10-config.js','v10-animations.js','humanos-lore-v10.js','game-v10.js','manifest.webmanifest','assets/icon.svg']){
    assert.ok(sw.includes(`'./${file}'`),`${file} ausente do núcleo offline`);
  }
  assert.match(game,/navigator\.serviceWorker\.register\('\.\/sw\.js'/);
  assert.doesNotMatch(game,/\.unregister\(\)/);
  assert.match(sw,/url\.pathname\.endsWith\('\/play\.html'\)\?'\.\/play\.html':'\.\/index\.html'/);
  assert.match(sw,/caches\.match\(e\.request,\{ignoreSearch:true\}\)/);
  assert.match(sw,/k\.startsWith\('12r-'\) && k !== CACHE/);
  assert.doesNotMatch(sw,/keys\.filter\(\(k\) => k !== CACHE\)/);
});

check('configuração cobre os 12 reinos e quatro qualidades',()=>{
  const realms=config.match(/realms:\[([^\]]+)\]/)?.[1].match(/'[^']+'/g)||[];
  assert.equal(realms.length,12);
  for(const quality of ['auto','high','medium','economy']) assert.ok(config.includes(`'${quality}'`));
});

check('coordenador de batalha protege entrada e auto-batalha',()=>{
  assert.match(game,/function setBattlePhase\(next\)/);
  assert.match(game,/function canAcceptPlayerInput\(\)/);
  assert.match(game,/function trySwap\(from,to\)\{\s*if\(!canAcceptPlayerInput\(\)\) return;/);
  assert.match(game,/if\(!autoBattle\|\|!canAcceptPlayerInput\(\)\|\|document\.hidden\) return;/);
  for(const phase of ['resolving','heroes','enemies','transition','paused','idle']) assert.ok(game.includes(`setBattlePhase('${phase}')`));
});

check('pausa também interrompe o Tempo Sombrio',()=>{
  assert.match(game,/tempoSombrioTimer=scheduleCombat\(darkTick,30000\)/);
  assert.match(game,/function cancelTempoSombrio\(\)/);
  assert.match(game,/pauseCombatTimers\(\)/);
});

check('opções profissionais estão ligadas à persistência',()=>{
  for(const id of ['musicVolumeRange','sfxVolumeRange','qualitySelect','highContrastToggle','largeTextToggle','reduceFlashesToggle']){
    assert.ok(html.includes(`id="${id}"`),`${id} ausente no HTML`);
    assert.ok(game.includes(`getElementById('${id}')`),`${id} sem integração no jogo`);
  }
  for(const key of ['12r_music_volume','12r_sfx_volume','12r_quality','12r_high_contrast','12r_large_text','12r_reduce_flashes']) assert.ok(game.includes(key));
});

check('CSS inclui acessibilidade, qualidade e HUD de fase',()=>{
  for(const selector of ['body.high-contrast','body.large-text','body.reduce-flashes','body.quality-economy','.battle-phase-chip']) assert.ok(css.includes(selector));
});

check('preferência do sistema reduz movimento até o jogador escolher',()=>{
  assert.match(game,/storedMotionPreference===null&&matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/);
});

check('visualização controla indicador, HUD superior e barra de informações',()=>{
  for(const id of ['vizTurnInfo','vizTopHud','vizInfoBar']){
    assert.ok(html.includes(`id="${id}"`),`${id} ausente no HTML`);
    assert.ok(game.includes(`getElementById('${id}')`),`${id} sem integração no jogo`);
  }
  for(const selector of ['body.viz-turn-info-off','body.viz-top-hud-transparent','body.viz-top-hud-off.hud-peek','body.viz-info-bar-transparent','body.viz-info-bar-off']) assert.ok(css.includes(selector));
  assert.match(game,/getElementById\('arena'\)\?\.addEventListener\('click'/);
});

check('Lobo Raivoso é espelhado para encarar o centro',()=>{
  assert.match(game,/loboRaivoso:\{[^\n]+flip:true\}/);
  assert.match(game,/elizier:\{[^\n]+flip:true\}/);
  assert.match(game,/roland:\{[^\n]+flip:true\}/);
  assert.match(game,/julius:\{[^\n]+flip:true\}/);
  assert.match(game,/const flip=e\.flip\|\|e\.isCard\?' flip':''/);
  assert.match(css,/enemy-static-avatar\[data-action="idle"\] \.enemy-sprite-image\.flip/);
});

check('inimigos usam animação por ação e aura corporal sem moldura',()=>{
  for(const needle of ['function animateEnemyAvatar','function playEnemyAction','playEnemyAction(idx,\'hit\')','playEnemyAction(idx,\'attack\')','playEnemyAction(enemies.indexOf(e),\'cast\')']) assert.ok(game.includes(needle),needle+' ausente');
  for(const selector of ['.unit-charge-aura','.unit.ready .avatar-circle{animation:none!important;box-shadow:none!important;cursor:pointer}','@keyframes bodyAuraEmanate','.enemy-static-avatar[data-action="attack"]']) assert.ok(css.includes(selector),selector+' ausente');
});

check('inimigos exclusivos usam folhas reais, impactos e arena viva',()=>{
  for(const id of ['capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3','infantaria','cavalaria','comandante','trono','morto','vulto','slime-cereja','lobo-raivoso','espectro','human-guard','rune-slime','shadow-wolf','cursed-wraith','stone-sentinel','crimson-dragon']){
    const asset=`assets/enemies/runtime-v10/${id}/processed/sheet-transparent.png`;
    assert.ok(game.includes(asset),`${id} sem folha no runtime`);
    assert.ok(fs.existsSync(path.join(root,...asset.split('/'))),`${id} sem asset`);
  }
  for(const id of ['capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3','infantaria','cavalaria','comandante','trono','morto','vulto','slime-cereja','lobo-raivoso','espectro','human-guard','rune-slime','shadow-wolf','cursed-wraith','stone-sentinel','crimson-dragon']){
    const idleAsset=`assets/enemies/runtime-v10/${id}/idle/processed/sheet-transparent.png`;
    assert.ok(fs.existsSync(path.join(root,...idleAsset.split('/'))),`${id} sem folha de idle`);
  }
  for(const id of ['capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3','infantaria','cavalaria','comandante','trono']){
    const rootedIdle=`assets/enemies/runtime-v10/${id}/idle-v3/processed/sheet-transparent.png`;
    assert.ok(fs.existsSync(path.join(root,...rootedIdle.split('/'))),`${id} sem idle normalizado pela base`);
  }
  for(const needle of ['ENEMY_ANIMATION_LIBRARY','HUMAN_ENEMY_IDLE_IDS','ROOTED_HUMAN_IDLE_LIBRARY','ENEMY_IDLE_LIBRARY','rootedEnemyIdleMarkup','startRootedEnemyIdle','usesRootedHumanIdle','enemy-rooted-idle-sheet','returnToIdle','ENEMY_FRAME_SEQUENCES','actionFrames','function enemyAnimationCharacter','defeatEnemyAvatar','freezeEnemyAvatar','fx-impact-burst','fx-critical-impact','arena-atmosphere','canonicalVisual']) assert.ok(game.includes(needle)||css.includes(needle),`${needle} ausente`);
  assert.doesNotMatch(game,/class="boss-presence-mark"|aria-hidden="true">✦/,'marcador de estrela não deve renderizar sobre inimigos');
  assert.match(game,/return e\?\.etype\|\|null;/,'arte humana individual não pode cair no guarda genérico');
  assert.doesNotMatch(game,/assets\\\/enemies\\\/humanos\\\/.+human-guard/,'arte humana não pode ser mapeada ao guarda genérico');
  for(const needle of ['enemyOriginalAttack','arena-petals','arena-cold-fog','arena-world-drift','.enemy-unit.dead .unit-ground-shadow','@keyframes enemyDefeatGroundedFallback']) assert.ok(css.includes(needle),`${needle} ausente`);
});

check('Biblioteca da Eternidade faz as páginas cair e acumular',()=>{
  assert.match(css,/libraryPagesFall/);
  assert.match(css,/libraryPagesFallNear/);
  assert.doesNotMatch(css,/library-pages.*animation:pageFlutter/);
  assert.match(css,/library-pages.*fill='none' stroke='%23ad8e5d'/);
  assert.match(lore,/"key": "library-pages"/);
});

check('física permanente de derrota mantém identidade, chão e repouso',()=>{
  assert.equal(defeatPhysics.schema,'ygdria.defeat-physics');
  assert.equal(defeatPhysics.grid.rows,2);
  assert.equal(defeatPhysics.grid.cols,2);
  assert.deepEqual(defeatPhysics.grid.sequence,['loss-of-balance','descent','ground-contact','resting']);
  assert.equal(defeatPhysics.anchor.reference,'feet-and-eyes');
  assert.equal(defeatPhysics.identity.noHorizontalFlipAsDefeat,true);
  assert.equal(defeatPhysics.identity.equipmentFollowsGravity,true);
  assert.equal(defeatPhysics.runtime.finalFrameMustHold,true);
  assert.equal(defeatPhysics.runtime.shadowAnimation,'none-after-contact');
  assert.match(game,/DEFEAT_ANIMATION_LIBRARY/);
  assert.match(game,/function playHeroDefeatPoses\(\)/);
  assert.match(animations,/vento\/defeat\/processed\/sheet-transparent\.png/);
  const playableIds=['luz','humanos','agua','fogo','natureza','terra','areia','sombras','raio','vento','chuvas','gelo','gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'];
  for(const id of playableIds){
    const asset=`assets/characters/runtime-v10/${id}/defeat/processed/sheet-transparent.png`;
    assert.ok(animations.includes(`"${id}"`),`${id} ausente do manifesto`);
    assert.ok(animations.includes(asset),`${id} sem derrota no manifesto`);
    assert.ok(fs.existsSync(path.join(root,...asset.split('/'))),`${id} sem folha de derrota`);
  }
  assert.match(css,/enemy-defeat-runtime/);
  const enemyAssets=['capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3','infantaria','cavalaria','comandante','trono','morto','vulto','slime-cereja','lobo-raivoso','espectro'].map(id=>[id,`assets/enemies/runtime-v10/${id}/defeat/processed/sheet-transparent.png`]);
  for(const [id,asset] of enemyAssets){ assert.ok(game.includes(asset),`${id} sem mapa de derrota`); assert.ok(fs.existsSync(path.join(root,...asset.split('/'))),`${id} sem folha de derrota`); }
});

check('v11 substitui formações antigas e mantém seleção direta dos heróis',()=>{
  const block=game.match(/const HERO_FORMATIONS = \[([\s\S]*?)\n\];/)?.[1]||'';
  assert.equal((block.match(/\{ nome:/g)||[]).length,10,'a formação precisa ter exatamente 10 opções');
  for(const name of ['Líder','Guarda-costas','Cercados','Defensiva','Ofensiva','Vanguarda em V','Asa Dupla','Diamante','Escalonada','Berserker']) assert.ok(block.includes(`nome:'${name}'`),`${name} ausente`);
  assert.match(game,/function tacticalGridCell\(cellNumber\)/);
  assert.match(game,/function tacticalGridSlot\(\.\.\.cellNumbers\)/);
  assert.match(block,/nome:'Líder',[\s\S]*tacticalGridSlot\(14,23\)[\s\S]*tacticalGridSlot\(3\)[\s\S]*tacticalGridSlot\(12,21\)[\s\S]*tacticalGridSlot\(30\)/);
  assert.match(block,/nome:'Vanguarda em V',[\s\S]*tacticalGridSlot\(12,13,21,22\)/);
  assert.match(block,/nome:'Berserker',[\s\S]*tacticalGridSlot\(17\)/);
  assert.doesNotMatch(html,/id="heroSelectionLayer"/);
  assert.doesNotMatch(game,/heroSelectionLayerEl|hero-select-arrow|scheduleHeroSelectionArrows/);
  assert.match(game,/const HERO_BODY_ALPHA_THRESHOLD=24/);
  assert.match(game,/function heroVisualOpaqueAt\(visual,clientX,clientY\)/);
  assert.match(game,/function resolveHeroBodyAtPoint\(clientX,clientY\)/);
  assert.match(game,/arenaEl\.addEventListener\('pointerup',handleHeroBodyPointer,true\)/);
  assert.match(css,/\.party-row \.hero-unit\{pointer-events:none!important\}/);
  assert.match(game,/function heroUsesFlightPhysics\(character\)/);
  assert.match(css,/\.hero-unit\.hero-flying:not\(\.dead\) \.avatar-circle:not\(\[data-action="defeat"\]\)/);
  assert.match(game,/enemySlot\?1\.02:\.88/);
});

check('v12 fixa a física de escala das ações e a leitura mobile',()=>{
  assert.match(game,/const ACTION_PHYSICS_SCALE=Object\.freeze\(/);
  assert.match(game,/fogo:\{attack:\.8082/);
  assert.match(game,/const physics=Number\(ACTION_PHYSICS_SCALE\[character\?\.id\]\?\.\[action\]\|\|1\)/);
  assert.match(css,/body\.game-active \.party-row \.unit-stage\{height:106px!important\}/);
  assert.match(css,/body\.game-active \.enemy-row \.unit-stage\{height:102px!important\}/);
  assert.match(html,/class="game-logo" src="assets\/icon\.svg"/);
  assert.match(fs.readFileSync(path.join(root,'assets/icon.svg'),'utf8'),/rotate\(330 256 256\)/);
});

check('v13 limita o grid perspectivado à Cidade das Cerejeiras',()=>{
  assert.match(html,/id="cerejeiraTacticalGrid"/);
  assert.match(html,/id="physicalFloorGrid"/);
  assert.match(game,/function renderCerejeiraTacticalGrid\(\)/);
  assert.match(game,/let tacticalGridVisible=localStorage\.getItem\('12r_tactical_grid'\)==='1'/);
  assert.match(game,/arenaEl\.classList\.toggle\('tactical-grid',tacticalGridVisible\)/);
  assert.match(game,/localStorage\.setItem\('12r_tactical_grid',active\?'1':'0'\)/);
  assert.match(game,/arenaEl\.classList\.toggle\('tactical-grid-available',available\)/);
  assert.match(game,/const \{top,bot:bottom\}=groundBand\(\)/);
  assert.match(game,/const columns=9/);
  assert.match(game,/const partyRows=4/);
  assert.match(game,/const enemyRows=3/);
  assert.match(game,/const layoutRows=12/);
  assert.match(game,/data-grid-slot/);
  assert.match(css,/\.physical-floor-grid\{[\s\S]+?top:var\(--floor-top/);
  assert.match(css,/grid-template-columns:repeat\(var\(--floor-columns/);
  assert.match(css,/grid-template-rows:repeat\(var\(--floor-layout-rows/);
  assert.match(css,/aspect-ratio:1 \/ 1/);
  assert.match(css,/perspective\(900px\) rotateX\(34deg\) scaleY\(1\.13\)/);
  assert.match(game,/const depth=Math\.max\(0,Math\.min\(1,y\/46\)\)/);
  assert.match(game,/const depthScale=perspective\?\(1-depth\*\.28\):1/);
  assert.match(game,/--depth-scale/);
  assert.match(game,/--depth-shadow-scale/);
  assert.match(css,/\.arena\.perspective-physics \.unit-stage \.avatar-circle/);
  assert.match(game,/const ENEMY_GRID_NORMAL=\[\[1,2\],\[2,1\],\[2,3\],\[2,2\]\]/);
  assert.match(game,/function planEnemyGridSlots/);
  assert.match(css,/\.physical-floor-cell\.enemy-grid-cell/);
});

check('passagem gráfica v10.0.54 mantém física e dá resposta ao combate',()=>{
  for(const needle of ['ensureArenaVisualLayers','applyArenaVisualProfile','pulseArenaLighting','spawnCombatAttackFx','enemyFxRealm','arena-light-pulse','arena-depth','arena-lighting','arenaEffects','arenaProfiles','fx-attack-signature','attack-fogo','attack-gelo']) assert.ok(game.includes(needle)||css.includes(needle)||config.includes(needle),`${needle} ausente`);
  assert.match(game,/if\(kind==='impact'\|\|kind==='critical'\) pulseArenaLighting\(color,target,kind\)/);
  assert.match(css,/body\.game-active \.unit-ground-shadow\{display:block/);
  assert.match(css,/body\.game-active \.enemy-unit\.dead \.unit-ground-shadow\{transform:translateX\(-50%\) scaleX\(\.84\)!important;opacity:\.28/);
  assert.match(css,/body\.game-active \.party-row \.unit\.rarity-7 \.unit-stage::after\{[\s\S]+?display:none!important/);
  assert.match(css,/\.enemy-static-avatar\[data-action="idle"\] \.enemy-sprite-image\{animation:none!important;transform:none!important\}/);
  assert.match(css,/\.enemy-unit\.dead \.enemy-avatar\.enemy-defeat-pose\.enemy-defeat-runtime \.hero-sprite-sheet[\s\S]+?animation:none!important/);
  assert.equal(/@keyframes enemyAttackArc[\s\S]+?scale\(/.test(css),true);
});

check('v11 usa folhas reais no repouso, VFX separado e fallback de derrota sem giro horizontal',()=>{
  for(const needle of ['arena-midground-light','attack-origin','attack-mote','attackOrigin','attackMote','enemyDefeatGroundedFallback']) assert.ok(game.includes(needle)||css.includes(needle),`${needle} ausente`);
  assert.match(game,/fx\.innerHTML='<span class="attack-origin"><\/span><span class="attack-trail"><\/span>/);
  assert.match(css,/\.hero-sprite-image\{ animation:none; transform-origin:50% 100%; \}/);
  assert.match(css,/\.summon-sprite\{ animation:none!important; \}/);
  assert.doesNotMatch(css,/enemyDefeatFall/);
  assert.doesNotMatch(css,/enemyDefeatGroundedFallback[^}]*rotate\(-90deg\)/);
  assert.doesNotMatch(css,/enemyDefeatGroundedFallback[^}]*rotate\(90deg\)/);
});

check('vitória preserva a arena e separa cabeçalho do relatório inferior',()=>{
  for(const needle of ['victoryOverlayHome','victoryReportDock','mountVictoryOverlay','restoreVictoryOverlay','victoryArenaHeader','victoryTopIds','victoryNextStage','victory-arena-overlay','victory-docked','victory-celebration','victory-arena-state']) assert.ok(game.includes(needle)||css.includes(needle)||html.includes(needle),`${needle} ausente`);
  assert.match(html,/id="dungeonClearOverlay" role="dialog"/);
  assert.match(html,/id="victoryReportDock"/);
  assert.match(html,/id="victoryArenaHeader"/);
  for(const id of ['victoryStars','victoryRank','victoryReport','victoryConfetti']) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(game,/if\(id==='dungeonClearOverlay'\) mountVictoryOverlay\(\)/);
  assert.match(game,/arenaEl\.classList\.add\('victory-arena-state'\)/);
  assert.match(css,/#dungeonClearOverlay\.victory-arena-overlay\.victory-docked\{[\s\S]+?position:static!important/);
  assert.match(css,/#dungeonClearOverlay\.victory-arena-overlay \.battle-report/);
  assert.match(css,/\.game-frame\.victory-celebration \.combat-console\{[\s\S]+?display:none!important/);
  assert.match(css,/\.arena\.victory-arena-state \.victory-arena-header\{/);
  assert.match(game,/updateVictoryActionLabel\(\);/);
});

check('Torre usa cada encontro da campanha e invocações não bloqueiam heróis',()=>{
  assert.match(game,/One floor per actual encounter/);
  assert.doesNotMatch(game,/vistos\.has\(key\)/);
  assert.match(css,/\.summon-unit\{pointer-events:none!important;\}/);
  assert.match(game,/SPECIAL_ABILITY_BUILDERS/);
  assert.match(game,/summonHarpies\(el\)/);
  assert.match(game,/sc-talon-sweep/);
  assert.match(game,/summonGolems\(el\)/);
});

check('Torre possui faixa de chão e perspectiva próprias',()=>{
  assert.match(game,/const TOWER_GROUND=\[0\.70,1\]/);
  assert.match(game,/else if\(towerMode\)\{ \[top,bot\]=TOWER_GROUND; \}/);
  assert.match(game,/towerMode\?' tower-stage':''/);
  assert.match(css,/\.arena\.tower-stage\{--horizon:66%;background-position:center 50%!important\}/);
});

check('animações corporais não usam crescer ou encolher',()=>{
  const keyframeBody=name=>{
    const start=css.indexOf(`@keyframes ${name}{`);
    assert.ok(start>=0,`${name} ausente`);
    const brace=css.indexOf('{',start);
    let depth=0;
    for(let i=brace;i<css.length;i++){
      if(css[i]==='{') depth++;
      if(css[i]==='}'&&--depth===0) return css.slice(brace+1,i);
    }
    throw new Error(`${name} sem fechamento`);
  };
  for(const keyframe of ['lungeAttack','lungeAttack9','castRise9','idleBreath','idleBreathFlip','enemyWeaponAction','enemySpellGesture','enemyImpactRecoil','golemSpawn']){
    assert.doesNotMatch(keyframeBody(keyframe),/scale\(/,`${keyframe} não pode escalar o personagem`);
  }
});

check('escala de porte usa a taxonomia oficial sem interferir nas poses',()=>{
  for(const entry of ['card:1.50','cardYoungOrGareth:1.00','soldier:1.20','captain:1.20','beastSmall:0.60','beastMedium:1.00','beastLarge:1.50','beastGiant:2.00','summon:1.00']) assert.ok(game.includes(entry),entry+' ausente');
  for(const entry of ['fogo:1.0370','raio:1.0890','gelo:1.2696',"'berenice-jovem':0.9733","'acqua-jovem':1.0425","'galateia-jovem':1.2321",'gareth:1.1590']) assert.ok(game.includes(entry),entry+' correção ausente');
  assert.match(game,/const YOUNG_CARD_IDS=new Set\(\['berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','gareth'\]\)/);
  assert.match(game,/unit\.style\.setProperty\('--unit-art-scale',String\(cardArtScale\(k\)\)\)/);
  assert.match(game,/unit\.style\.setProperty\('--unit-art-scale',String\(enemyArtScale\(e\)\)\)/);
  assert.match(css,/scale:var\(--unit-art-scale,1\)!important/);
});

check('folhas de ação preservam a estatura ancorada nos pés',()=>{
  assert.match(game,/function normalizedActionDisplayScale\(character,action,displayScale\)/);
  assert.doesNotMatch(game,/ACTION_BODY_SCALE_NORMALIZATION/);
  assert.match(game,/const idleScale=Number\(character\?\.sprites\?\.idle\?\.displayScale\)/);
  assert.match(game,/const physics=Number\(ACTION_PHYSICS_SCALE\[character\?\.id\]\?\.\[action\]\|\|1\)/);
  assert.match(game,/const displayScale=normalizedActionDisplayScale\(k,action,meta\.displayScale\)/);
  assert.match(css,/\.hero-sprite-sheet\{transform:scale\(var\(--sprite-scale,1\)\);transform-origin:50% 100%\}/);
  assert.match(css,/body\.game-active \.enemy-unit \.enemy-rooted-idle-art/);
});

check('IDs do HTML são únicos',()=>{
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(match=>match[1]);
  const duplicates=ids.filter((id,index)=>ids.indexOf(id)!==index);
  assert.deepEqual([...new Set(duplicates)],[]);
});

check('menu inicial não bloqueia o primeiro toque',()=>{
  const earlyOptions=html.indexOf('data-early-options');
  const deferredGame=html.indexOf('game-v10.js?v=11.0.0');
  assert.ok(earlyOptions>0&&earlyOptions<deferredGame,'ponte inicial de Opções precisa carregar antes do jogo principal');
  assert.match(html,/panel\.dataset\.earlyOpened='1'/);
  assert.match(html,/closest\(event\.target,'#optionsBtn,#pauseOptionsBtn'\)/);
  assert.match(html,/panel\.dataset\.pendingBootOpen='1'/);
  assert.match(game,/const reopenOptionsAfterBoot=optionsPanelAtBoot\?\.dataset\.pendingBootOpen==='1'/);
  assert.match(game,/document\.body\.dataset\.gameReady='1'/);
  assert.match(game,/if\(reopenOptionsAfterBoot\)/);
  assert.match(game,/showMainMenu\(\{guard:false\}\);/);
  assert.match(game,/if\(options\?\.guard!==false\) armTapGuard\(\);/);
  assert.match(game,/closest\('\[data-tap-guard-bypass\]'\)/);
  for(const id of ['optionsBtn','pauseOptionsBtn']) assert.match(html,new RegExp(`id="${id}"[^>]+data-tap-guard-bypass`));
  assert.match(game,/armTapGuard:\(duration=2000\)=>\{ armTapGuard\(duration\);/);
  assert.match(game,/get\('qa'\)==='tapguard'\) armTapGuard\(5000\)/);
  assert.match(css,/#optionsScreen\s*\{\s*z-index:520;\s*\}/);
  assert.match(game,/pauseOptionsBtn'\)\.addEventListener\('click',\(\)=>\{ openPanel\('optionsScreen'\); \}\)/);
});

check('motor v10 cobre e conecta seis movimentos',()=>{
  for(const action of ['idle','attack','cast','hit','victory','defeat']){
    assert.match(game,new RegExp(`\\b${action}:\\s*\\{`),`${action} ausente do contrato`);
  }
  assert.match(game,/function animateHeroAvatar\(/);
  assert.match(game,/animateHeroAvatar\(avatarEl,k,'idle',\{loop:true\}\)/);
  assert.match(game,/ACTIVE\.forEach\(heroIdx=>playHeroAction\(heroIdx,'hit'\)\)/);
  assert.match(game,/ACTIVE\.forEach\(heroIdx=>playHeroAction\(heroIdx,'victory'\)\)/);
  assert.match(game,/playHeroDefeatPoses\(\)/);
  assert.match(animations,/YGDRIA_V10_ANIMATIONS/);
});

check('pausa, reinício e revive não deixam callbacks órfãos',()=>{
  assert.match(game,/const combatTimers = new Set\(\)/);
  assert.match(game,/const combatWaits = new Set\(\)/);
  assert.match(game,/function scheduleCombat\(/);
  assert.match(game,/function pauseCombatTimers\(\)/);
  assert.match(game,/function resumeCombatTimers\(\)/);
  assert.match(game,/function resetCombatSchedule\(/);
  assert.match(game,/combatWaits\.forEach\(cancel=>cancel\(\)\)/);
  assert.match(game,/scheduleCombat\(\(\)=>tickDots\(\),300\)/);
  assert.match(game,/scheduleCombat\(\(\)=>enemyCounterAttack\(\),350\)/);
  assert.match(game,/busy=false; setBattlePhase\('idle'\); resumeMissionClock\(\); saveProgress\(\);/);
  assert.match(game,/function restartCurrentStage\(\)\{\s*resetCombatSchedule\(\)/);
  assert.match(game,/const energyDelivered=await flyEnergyToHero\(colorIdx\);\s*if\(!energyDelivered\|\|epoch!==combatEpoch\) return;/);
  assert.match(game,/document\.querySelectorAll\('\.energy-orb'\)\.forEach\(orb=>orb\.remove\(\)\)/);
  assert.match(game,/function resetPartyAnimationState\(\)/);
  assert.match(game,/function stopPartyAnimations\(\)/);
  assert.match(game,/function showSelection\(\)\{[\s\S]+?resetCombatSchedule\(\);[\s\S]+?stopMissionTimer\(\);/);
  assert.match(game,/function showMainMenu\([\s\S]+?stopPartyAnimations\(\)/);
  assert.match(game,/if\(worldRun\) worldRun\.active=false/);
});

check('derrota encerra relógios uma vez e entra em transição',()=>{
  assert.match(game,/function finalizeDefeat\(\)/);
  assert.match(game,/if\(defeatFinalized\) return false/);
  assert.match(game,/cancelTempoSombrio\(\)/);
  assert.match(game,/setBattlePhase\('transition'\)/);
  assert.match(game,/if\(obj\.type==='moves'[\s\S]+?finalizeDefeat\(\)/);
  assert.match(game,/function retryAfterDefeat\(\)/);
  assert.match(game,/if\(towerMode\)\{\s*towerFloor=1;/);
  assert.match(game,/if\(bossRushMode\)\{\s*bossRushIdx=0;/);
  assert.match(game,/getElementById\('retryBtn'\)\.addEventListener\('click', retryAfterDefeat\)/);
  assert.match(game,/function restartFromControls\(\)/);
  assert.match(game,/getElementById\('resetBtn'\)\.addEventListener\('click', restartFromControls\)/);
  assert.match(game,/getElementById\('restartStageBtn'\)[\s\S]+?restartFromControls\(\)/);
});

check('save migra versões antigas e grava o esquema v10',()=>{
  assert.match(game,/const normalized=\{\.\.\.saved,version:10,team:/);
  assert.match(game,/if\(Number\(saved\.version\)!==10\) localStorage\.setItem\('12r_save',JSON\.stringify\(normalized\)\)/);
  assert.match(game,/JSON\.stringify\(\{version:10,stage:safeStage/);
});

check('backup v10 nunca exporta credenciais',()=>{
  assert.match(game,/SAVE_EXPORT_SCHEMA='12r-progress'/);
  assert.match(game,/SAVE_EXPORT_VERSION=10/);
  assert.match(game,/function isExportableSaveKey\(/);
  const backupBlock=game.slice(game.indexOf("const SAVE_EXPORT_SCHEMA"),game.indexOf('const COACH_STEPS_I18N'));
  for(const forbidden of ['12r_account','12r_localusers','12r_usernames','12r_login','passHash','birth']) assert.doesNotMatch(backupBlock,new RegExp(forbidden));
  assert.match(game,/data\?\.schema!==SAVE_EXPORT_SCHEMA/);
  assert.match(game,/function encodeSavePayload\(value\)/);
  assert.match(game,/function decodeSavePayload\(code\)/);
  assert.match(game,/function validateImportedSaveEntry\(key,value\)/);
  assert.match(game,/function applyImportedSaveEntries\(entries\)/);
  assert.match(game,/function exportableLocalSaveKeys\(\)/);
  assert.match(game,/targets\.forEach\(key=>localStorage\.removeItem\(key\)\)/);
  assert.match(game,/function sanitizeInventory\(value\)/);
  assert.match(game,/function sanitizeBestiary\(value\)/);
  assert.match(game,/function sanitizeNumericRecord\(value/);
  assert.match(game,/function sanitizeQuestsState\(value/);
  assert.match(game,/function sanitizeSavedTeamSlots\(value\)/);
  assert.match(game,/key==='12r_teams'/);
  assert.match(game,/key==='12r_inv'/);
  assert.doesNotMatch(game,/unescape\(|decodeURIComponent\(escape/);
});

check('contas locais usam derivação lenta e migram o hash legado',()=>{
  assert.match(game,/const LOCAL_PASSWORD_ITERATIONS=600000/);
  assert.match(game,/name:'PBKDF2',hash:'SHA-256'/);
  assert.match(game,/crypto\.getRandomValues\(new Uint8Array\(16\)\)/);
  assert.match(game,/if\(\(pass\|\|''\)\.length<8\)/);
  assert.match(game,/if\(!users\[email\]\.credential\)/);
  assert.doesNotMatch(game,/users\[email\]=\{passHash:hash/);
  assert.match(html,/id="loginPass"[^>]+minlength="8"[^>]+maxlength="256"/);
});

check('CI valida o navegador local e a publicação real',()=>{
  assert.match(workflow,/production-smoke:/);
  assert.match(workflow,/needs: \[contracts-and-assets, browser\]/);
  assert.match(workflow,/github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow,/PRODUCTION_QA: '1'/);
  assert.match(workflow,/test:e2e:production/);
  assert.match(workflow,/github\.io\/ygdria-demo\/play\.html/);
  assert.match(workflow,/pages\/builds\/latest/);
  assert.match(workflow,/published_sha.*GITHUB_SHA/);
});

check('dados locais de conta são escapados antes de entrar no HTML',()=>{
  assert.match(game,/function escapeHtml\(value\)/);
  assert.match(game,/escapeHtml\(account\.username\)/);
  assert.match(game,/escapeHtml\(account\.email\|\|'—'\)/);
  assert.match(game,/escapeHtml\(entry\.message\)/);
  assert.match(game,/const safeCategory=\['damage','support','system','action'\]\.includes\(category\)/);
  assert.match(game,/function normalizeProfile\(raw=\{\}\)/);
  assert.match(game,/KINGDOMS\.forEach\(character=>\{/);
  assert.match(game,/escapeHtml\(v\)/);
});

check('vitrine de movimentos e HP acessível estão integrados',()=>{
  for(const id of ['motionShowcase','motionShowcaseAvatar','motionShowcaseActions','playerHpProgress']) assert.ok(html.includes(`id="${id}"`),`${id} ausente`);
  assert.match(game,/function renderMotionShowcase\(/);
  assert.match(game,/playerHpProgress\.setAttribute\('aria-valuemax',String\(PLAYER_MAX_HP\)\)/);
  assert.match(css,/\.motion-showcase-stage/);
  assert.match(game,/if\(reducedMotion\)\{[\s\S]+?stopPartyAnimations\(\)/);
});

check('carregamento de animação é sob demanda e possui fallback',()=>{
  assert.match(game,/function preloadHeroActions\(/);
  assert.match(game,/THUMB\(k\.cardThumb\|\|k\.img\)/);
  assert.match(game,/function markSpriteFailed\(src\)/);
  assert.match(game,/if\(document\.body\.classList\.contains\('game-active'\)&&activeUsesSource\) renderPartyArena\(\)/);
  assert.match(game,/preloadHeroActions\(ACTIVE\)/);
  assert.doesNotMatch(game,/KINGDOMS\.flatMap\(k=>Object\.values\(k\.sprites/);
  const preloadBlock=game.slice(game.indexOf('function preloadOfficialAssets()'),game.indexOf('function preloadHeroActions('));
  assert.doesNotMatch(preloadBlock,/DUNGEON\.flatMap/);
  assert.match(game,/renderGolemUnits\(\);\s*renderHarpyUnits\(\);/);
});

check('escala corporal não varia entre ações e impacto não duplica animações',()=>{
  assert.doesNotMatch(game,/ACTION_BODY_SCALE_NORMALIZATION/);
  assert.match(game,/const idleScale=Number\(character\?\.sprites\?\.idle\?\.displayScale\)/);
  assert.match(game,/const physics=Number\(ACTION_PHYSICS_SCALE\[character\?\.id\]\?\.\[action\]\|\|1\)/);
  assert.match(game,/playEnemyAction\(idx,'hit'\);/);
  assert.doesNotMatch(game,/enemyUnit\.classList\.remove\('hit'\);/);
  assert.doesNotMatch(game,/partyArenaEl\.classList\.add\('party-hurt'\);/);
  assert.match(css,/\.avatar-circle\[data-action="hit"\]\{ filter:none!important; \}/);
  assert.match(css,/\.unit\.hit \.avatar-circle\{ animation:none; \}/);
  assert.match(css,/#partyArena\.party-hurt \.unit:not\(\.golem-unit\) \.avatar-circle\{ animation:none!important; \}/);
});

check('pool de VFX não recicla nós compostos e limpa a fase anterior',()=>{
  assert.match(game,/element\.__fxPooled=true/);
  assert.match(game,/if\(element\.__fxPooled!==true\)\{ element\.remove\(\); return; \}/);
  assert.match(game,/document\.querySelectorAll\('#specialFxLayer \[data-fx\]'\)\.forEach\(effect=>releaseCombatFx\(effect\)\)/);
});

check('QA local cobre revive, scheduler, pausa e exportação',()=>{
  for(const hook of ['testRevive','scheduleProbe','restart','pendingWaitCount','startWaitProbe','startEnergyProbe','setSpriteFailure','testAnimationReset','openSelection','finalizeDefeat','savedProgress','exportProgress','pause','resume']) assert.match(game,new RegExp(`${hook}:`));
  assert.match(game,/const SAVE_EXPORT_EXACT_KEYS=new Set/);
  assert.match(game,/phaseBeforePause=battlePhase/);
});

check('campanha só conclui a fase no setor final e oferece replay',()=>{
  assert.match(game,/if\(worldRun\.nivel===5\) markStoryPhaseDone\(worldRun\.fase\)/);
  assert.match(game,/function openMissionReplay\(faseIdx\)/);
  assert.match(html,/id="replayStoryBtn"/);
  assert.match(html,/id="replayFreeBtn"/);
  assert.match(html,/id="replayHardBtn"/);
  assert.match(game,/starsByDifficulty/);
  assert.match(game,/if\(bossRushMode\)[\s\S]+?if\(worldRun\.active\)/);
  assert.match(game,/bossRushMode=false;\s*victoryExitToMap=true;/);
  assert.match(game,/function startWorldFase\([\s\S]+?bossRushMode=false;/);
});

check('final da fase aguarda a história e mostra classificação',()=>{
  assert.match(game,/function finishStorySequence\(\)/);
  assert.match(game,/showStorySequence\(canonicalAfterSequence\(finaleFase\),finishFinale\)/);
  assert.match(game,/showStorySequence\(finalStory,finishMissionReport\)/);
  assert.match(game,/const finishMissionReport=\(\)=>\{/);
  assert.match(html,/id="victoryStars"/);
  assert.match(html,/id="victoryReport"/);
  assert.match(game,/Ranking das cartas usadas/);
});


console.log(`v10 contracts: ${checks.length} verificações aprovadas`);
checks.forEach((name,index)=>console.log(`${index+1}. ${name}`));
