import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const rosterSource=read('light-realm-roster-v1.js');
const sandbox={window:{}};
vm.runInNewContext(rosterSource,sandbox,{filename:'light-realm-roster-v1.js'});
const roster=sandbox.window.YGDRIA_LIGHT_ROSTER;
const animationSandbox={window:{}};
vm.runInNewContext(read('v10-animations.js'),animationSandbox,{filename:'v10-animations.js'});
const humanBenchmark=animationSandbox.window.YGDRIA_V10_ANIMATIONS['galateia-jovem'];
const manifest=JSON.parse(read('assets/characters/runtime-v11/light/manifest.json'));
const html=read('play.html');
const game=read('game-v10.js');
const css=read('light-realm-v1.css');
const serviceWorker=read('sw.js');
const preview=read('previews/reino-luz-elenco-v1.html');

const expectedIds=['cael','aelius','orion','adriel-aspirante','arneth','leonis','aarthas','galatas','adriel-cavaleiro','galateia-rainha','aarthas-darke'];
const actions=['idle','attack','cast','hit','victory','defeat'];
const actionSpecs={
  idle:{frames:4,cols:2,rows:2,duration:2400,loop:true,displayScale:.88},
  attack:{frames:6,cols:3,rows:2,duration:720,displayScale:.88},
  cast:{frames:6,cols:3,rows:2,duration:840,displayScale:.88},
  hit:{frames:4,cols:2,rows:2,duration:360,displayScale:.88},
  victory:{frames:4,cols:2,rows:2,duration:1200,hold:true,displayScale:.88},
  defeat:{frames:4,cols:2,rows:2,duration:900,hold:true}
};
const checks=[];
const check=(name,fn)=>{fn();checks.push(name)};
const sha256=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const assertWebp=file=>{
  const data=fs.readFileSync(path.join(root,file));
  assert.equal(data.subarray(0,4).toString(),'RIFF',`${file} não é RIFF`);
  assert.equal(data.subarray(8,12).toString(),'WEBP',`${file} não é WebP`);
};
const pngSize=file=>{
  const data=fs.readFileSync(path.join(root,file));
  assert.equal(data.subarray(1,4).toString(),'PNG',`${file} não é PNG`);
  return {width:data.readUInt32BE(16),height:data.readUInt32BE(20)};
};

check('elenco preserva os onze pares e sua ordem',()=>{
  assert.deepEqual(Array.from(roster,character=>character.id),expectedIds);
  assert.deepEqual(Object.keys(manifest.characters),expectedIds);
});

check('cada personagem tem carta, miniatura, chibi e seis ações quadro a quadro',()=>{
  for(const character of roster){
    assert.equal(character.deck,'luz');
    assert.equal(character.motionFamily,'light-realm');
    assert.deepEqual(Object.keys(character.sprites),actions);
    for(const action of actions){
      const spec=character.sprites[action];
      const expected=actionSpecs[action];
      const benchmark=humanBenchmark[action];
      const sheet=`assets/characters/light-v1/${character.id}/${action}/processed/sheet-transparent.png`;
      assert.equal(spec.src,sheet);
      assert.equal(spec.format,'sheet');
      for(const key of ['frames','cols','rows','duration']) assert.equal(spec[key],expected[key],`${character.id}/${action}: ${key}`);
      for(const key of ['frames','cols','rows','duration']) assert.equal(spec[key],benchmark[key],`${character.id}/${action}: divergência da Galatéia Jovem em ${key}`);
      assert.equal(Boolean(spec.loop),Boolean(expected.loop),`${character.id}/${action}: loop`);
      assert.equal(Boolean(spec.hold),Boolean(expected.hold),`${character.id}/${action}: hold`);
      assert.equal(spec.displayScale,expected.displayScale,`${character.id}/${action}: displayScale`);
      assert.equal(Boolean(spec.loop),Boolean(benchmark.loop),`${character.id}/${action}: loop diverge da Galatéia Jovem`);
      assert.equal(Boolean(spec.hold),Boolean(benchmark.hold),`${character.id}/${action}: hold diverge da Galatéia Jovem`);
      assert.equal(spec.displayScale,benchmark.displayScale,`${character.id}/${action}: escala diverge da Galatéia Jovem`);
      assert.ok(fs.existsSync(path.join(root,sheet)),`${sheet} ausente`);
      assert.deepEqual(pngSize(sheet),{width:expected.cols*256,height:expected.rows*256});

      const metaFile=`assets/characters/light-v1/${character.id}/${action}/processed/pipeline-meta.json`;
      const meta=JSON.parse(read(metaFile));
      assert.equal(meta.rows,expected.rows);
      assert.equal(meta.cols,expected.cols);
      assert.equal(meta.duration,expected.duration/expected.frames);
      assert.equal(meta.align,'feet');
      assert.equal(meta.qc_config.strict_qc,true,`${character.id}/${action}: QC estrita`);
      assert.equal(meta.qc_summary.frame_count,expected.frames);
      assert.equal(meta.qc_summary.valid_frame_count,expected.frames);
      assert.equal(meta.qc_summary.empty_count,0);
      assert.deepEqual(meta.output_edge_touch_frames,[],`${character.id}/${action}: recorte na saída`);
      assert.deepEqual(meta.paste_clamped_frames,[],`${character.id}/${action}: âncora limitada`);
    }
    const entry=manifest.characters[character.id];
    assert.equal(entry.card.src,character.img);
    assert.equal(entry.card.thumb,character.cardThumb);
    assert.equal(entry.chibi.src,character.sprite);
    assert.equal(entry.chibi.mode,'RGBA');
    for(const file of [entry.card.src,entry.card.thumb,entry.chibi.src]){
      assert.ok(fs.existsSync(path.join(root,file)),`${file} ausente`);
      assertWebp(file);
    }
    const galleryThumb=`assets/thumbs/${character.id}-thumb.webp`;
    assert.ok(fs.existsSync(path.join(root,galleryThumb)),`${galleryThumb} ausente`);
    assertWebp(galleryThumb);
    assert.equal(sha256(entry.card.src),entry.card.sha256);
    assert.equal(sha256(entry.chibi.src),entry.chibi.sha256);
  }
});

check('runtime carrega o registro antes do jogo e mantém suporte offline',()=>{
  assert.ok(html.indexOf('light-realm-roster-v1.js')<html.indexOf('game-v10.js'));
  assert.match(html,/light-realm-v1\.css\?v=1\.1\.0/);
  assert.match(serviceWorker,/\.\/light-realm-v1\.css/);
  assert.match(serviceWorker,/\.\/light-realm-roster-v1\.js/);
  assert.match(game,/const LIGHT_REALM_ROSTER=/);
  assert.match(game,/meta\.format==='sheet'/);
  assert.match(game,/if\(\(a\.deck\|\|a\.id\)==='luz'\) return compareLightRealmCanonical\(a,b\)/);
  assert.match(game,/if\(deckId==='luz'\) membros\.sort\(compareLightRealmCanonical\)/);
  assert.match(game,/card\.dataset\.characterId=k\.id/);
  assert.match(game,/const LIGHT_REALM_PLAYABLE_CARDS=Object\.freeze\(LIGHT_REALM_ROSTER\.map/);
  assert.match(game,/LIGHT_REALM_PLAYABLE_CARDS\.includes\(id\)/);
});

check('corpo não balança por CSS e VFX ficam em camada separada',()=>{
  for(const keyframe of ['lightCardHalo','lightCardSweep','lightModalCard']){
    assert.ok(css.includes(`@keyframes ${keyframe}`),`${keyframe} ausente`);
  }
  for(const forbidden of ['lightRealmIdle','lightRealmAttack','lightRealmRanged','lightRealmMagicStrike','lightRealmDualStrike','lightRealmGuardStrike','lightRealmEclipseStrike','lightRealmCast','lightRealmHit','lightRealmVictory','lightRealmDefeat']){
    assert.ok(!css.includes(`@keyframes ${forbidden}`),`${forbidden} não deveria mover o corpo`);
  }
  assert.match(css,/@media \(prefers-reduced-motion:reduce\)/);
  assert.doesNotMatch(css,/calc\(var\(--light-facing\)/);
  assert.match(game,/LIGHT_REALM_ATTACK_IDS/);
  assert.match(game,/LIGHT_REALM_ATTACK_SHEET/);
  assert.match(game,/LIGHT_REALM_MAGIC_SHEET/);
  for(const id of expectedIds) assert.match(game,new RegExp(`LIGHT_REALM_ATTACK_IDS=new Set\\(\\[[^;]*'${id}'`,'s'));
  assert.match(game,/defeat:\(\)=>T\('Derrota'/);
  assert.match(game,/modal\.dataset\.realm=k\.deck/);
});

check('prévia comparativa expõe todos os pares e todas as ações',()=>{
  assert.match(preview,/window\.YGDRIA_LIGHT_ROSTER/);
  assert.match(preview,/11 cartas \+ 11 chibis/);
  assert.match(preview,/defeat:'Derrota'/);
  assert.match(preview,/Galatéia Jovem/);
  assert.match(preview,/Padrão humano aprovado/);
  assert.match(preview,/playAction/);
  assert.match(preview,/66 folhas quadro a quadro/);
});

console.log(`light-realm-contracts: ${checks.length} checks passed`);
for(const name of checks) console.log(`  ✓ ${name}`);
