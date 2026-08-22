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
const sw=read('sw.js');
const workflow=read('.github/workflows/v10-ci.yml');

const checks=[];
function check(name,fn){ fn(); checks.push(name); }

check('arquivos públicos apontam somente para v10',()=>{
  assert.match(html,/styles-v10\.css\?v=10\.0\.24/);
  assert.match(html,/v10-config\.js\?v=10\.0\.24/);
  assert.match(html,/v10-animations\.js\?v=10\.0\.24/);
  assert.match(html,/game-v10\.js\?v=10\.0\.24/);
  assert.doesNotMatch(html,/game-v9|styles-v9|v9\.3-config/);
});

check('cache offline da v10 é isolado',()=>{
  assert.match(sw,/12r-v10\.0\.24/);
  for(const file of ['index.html','play.html','styles-v10.css','v10-config.js','v10-animations.js','game-v10.js','manifest.webmanifest','assets/icon.svg']){
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
  for(const needle of ['ENEMY_ANIMATION_LIBRARY','HUMAN_ENEMY_IDLE_IDS','ENEMY_IDLE_LIBRARY','rootedEnemyIdleMarkup','usesRootedHumanIdle','enemyRootedBreath','returnToIdle','ENEMY_FRAME_SEQUENCES','actionFrames','function enemyAnimationCharacter','freezeEnemyAvatar','fx-impact-burst','fx-critical-impact','arena-atmosphere']) assert.ok(game.includes(needle)||css.includes(needle),`${needle} ausente`);
  assert.doesNotMatch(game,/idle-v2/,'idle humano com deriva não pode permanecer no caminho de execução');
  assert.doesNotMatch(game,/class="boss-presence-mark"|aria-hidden="true">✦/,'marcador de estrela não deve renderizar sobre inimigos');
  assert.match(game,/return e\?\.etype\|\|null;/,'arte humana individual não pode cair no guarda genérico');
  assert.doesNotMatch(game,/assets\\\/enemies\\\/humanos\\\/.+human-guard/,'arte humana não pode ser mapeada ao guarda genérico');
  for(const needle of ['enemyOriginalAttack','arena-light-rays','arena-moving-mist','arena-living-motes','.enemy-unit.dead .unit-ground-shadow']) assert.ok(css.includes(needle),`${needle} ausente`);
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
  assert.match(game,/const ACTION_BODY_SCALE_NORMALIZATION\s*=\s*Object\.freeze\(/);
  assert.match(game,/fogo: Object\.freeze\(\{attack:\.6287/,'Lucius precisa compensar a folha de ataque superdimensionada');
  assert.match(game,/function normalizedActionDisplayScale\(character,action,displayScale\)/);
  assert.match(game,/const displayScale=normalizedActionDisplayScale\(k,action,meta\.displayScale\)/);
  assert.match(css,/\.hero-sprite-sheet\{transform:scale\(var\(--sprite-scale,1\)\);transform-origin:50% 100%\}/);
});

check('IDs do HTML são únicos',()=>{
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(match=>match[1]);
  const duplicates=ids.filter((id,index)=>ids.indexOf(id)!==index);
  assert.deepEqual([...new Set(duplicates)],[]);
});

check('menu inicial não bloqueia o primeiro toque',()=>{
  const earlyOptions=html.indexOf('data-early-options');
  const deferredGame=html.indexOf('game-v10.js?v=10.0.24');
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

check('motor v10 cobre e conecta cinco movimentos',()=>{
  for(const action of ['idle','attack','cast','hit','victory']){
    assert.match(game,new RegExp(`\\b${action}:\\s*\\{`),`${action} ausente do contrato`);
  }
  assert.match(game,/function animateHeroAvatar\(/);
  assert.match(game,/animateHeroAvatar\(avatarEl,k,'idle',\{loop:true\}\)/);
  assert.match(game,/ACTIVE\.forEach\(heroIdx=>playHeroAction\(heroIdx,'hit'\)\)/);
  assert.match(game,/ACTIVE\.forEach\(heroIdx=>playHeroAction\(heroIdx,'victory'\)\)/);
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
  assert.match(game,/showStorySequence\(\[\{name:'Narrador',t:HUMAN_STORY\[finaleFase\].*\}\],finishFinale\)/);
  assert.match(game,/showStorySequence\(\[\{name:'Narrador',t:HUMAN_STORY\[completedFase\]\.after\}\],finishMissionReport\)/);
  assert.match(game,/const finishMissionReport=\(\)=>\{/);
  assert.match(html,/id="victoryStars"/);
  assert.match(html,/id="victoryReport"/);
  assert.match(game,/Ranking das cartas usadas/);
});


console.log(`v10 contracts: ${checks.length} verificações aprovadas`);
checks.forEach((name,index)=>console.log(`${index+1}. ${name}`));
