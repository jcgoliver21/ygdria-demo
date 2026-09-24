import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const content=JSON.parse(read('backstage/data/content.json'));
const runtime=read('backstage-content-v1.js');
const game=read('game-v10.js');
const realm=content.realms.find(row=>row.id==='reino-da-luz');
const names=[
  'Escola de Cavaleiros','Salão da Luz Eterna','Lago de Cristal',
  'Floresta de Cristal','Catedral de Luz','Salão dos Espelhos',
  'Academia Militar da Luz Sagrada — Interior','Praça da Luz Eterna',
  'Trono de Luz','Limites da Cidadela'
];

assert.ok(realm,'Reino da Luz ausente');
assert.equal(realm.mapSlot||'luz','luz');
assert.equal(realm.mapEnabled,true);
assert.equal(realm.status,'draft','o conteúdo ainda não é uma campanha pública');
assert.deepEqual(realm.phases.map(phase=>phase.name),names);
assert.equal(realm.phases.length,10);
for(const [index,phase] of realm.phases.entries()){
  const number=index+1;
  assert.equal(phase.number,number);
  assert.equal(phase.background,`assets/bg/luz/fase-${String(number).padStart(2,'0')}.png`);
  assert.deepEqual(phase.bosses,['aarthas-darke']);
  assert.equal(phase.missions.length,5);
  assert.ok(phase.allowed.length>=4);
  assert.ok(phase.missions.every(mission=>mission.enemies.length===1&&mission.enemies[0]==='aarthas-darke'));
  assert.ok(phase.missions.every(mission=>mission.lines.length===0));
  assert.equal(phase.before,'');
  assert.deepEqual(phase.after,[]);
  const image=fs.readFileSync(path.join(root,phase.background));
  assert.equal(image.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(image.readUInt32BE(16),1672);
  assert.equal(image.readUInt32BE(20),941);
  assert.ok(runtime.includes(`"background": "${phase.background}"`));
}
assert.match(game,/r\.id!=='luz'\|\|isDevMode\(\)/);
assert.match(game,/currentRealmId\(\)==='reino-da-luz'&&!isDevMode\(\)/);
assert.match(game,/SCENE_GROUND\[currentRealmId\(\)\]/);
console.log('Reino da Luz: 10 fases, 50 missões, imagens e bloqueio DEV conferidos.');
