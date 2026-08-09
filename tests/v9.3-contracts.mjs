import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('play.html');
const game=read('game-v9.3.js');
const css=read('styles-v9.3.css');
const config=read('v9.3-config.js');
const sw=read('sw.js');

const checks=[];
function check(name,fn){ fn(); checks.push(name); }

check('arquivos públicos apontam somente para v9.3',()=>{
  assert.match(html,/styles-v9\.3\.css\?v=9\.3\.5/);
  assert.match(html,/v9\.3-config\.js\?v=9\.3\.5/);
  assert.match(html,/game-v9\.3\.js\?v=9\.3\.5/);
  assert.doesNotMatch(html+sw,/game-v9\.1|styles-v9\.1|spritehud2/);
});

check('cache offline da v9.3 é isolado',()=>{
  assert.match(sw,/12r-v9\.3\.5/);
  for(const file of ['play.html','styles-v9.3.css','v9.3-config.js','game-v9.3.js','manifest.webmanifest','assets/icon.svg']){
    assert.ok(sw.includes(`'./${file}'`),`${file} ausente do núcleo offline`);
  }
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
  assert.match(game,/document\.hidden\|\|gamePaused\|\|battlePhase==='paused'\|\|playerHP<=0/);
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
  assert.match(game,/\(e\.flip\|\|e\.isCard\)\?' flip'/);
});

check('IDs do HTML são únicos',()=>{
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(match=>match[1]);
  const duplicates=ids.filter((id,index)=>ids.indexOf(id)!==index);
  assert.deepEqual([...new Set(duplicates)],[]);
});

check('menu inicial não bloqueia o primeiro toque',()=>{
  const earlyOptions=html.indexOf('data-early-options');
  const deferredGame=html.indexOf('game-v9.3.js?v=9.3.5');
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
});

console.log(`v9.3 contracts: ${checks.length} verificações aprovadas`);
checks.forEach((name,index)=>console.log(`${index+1}. ${name}`));
