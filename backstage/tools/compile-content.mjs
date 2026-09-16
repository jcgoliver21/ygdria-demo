import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {inspectContent} from '../public/validation.js';

const backstageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projectRoot=path.resolve(backstageRoot,'..');
const dataFile=path.join(backstageRoot,'data','content.json');

function readJson(file){ return JSON.parse(fs.readFileSync(file,'utf8')); }
function stable(value){ return JSON.stringify(value,null,2)+'\n'; }

export function validateContent(content){
  const structural=inspectContent(content).errors;
  if(structural.length)return structural;
  const required=[];
  for(const c of content.characters||[]){if(c.card)required.push(c.card);if(c.cardThumb)required.push(c.cardThumb);for(const s of Object.values(c.sprites||{}))if(s?.enabled&&s.src)required.push(s.src);}
  for(const r of content.realms||[])for(const p of r.phases||[]){if(p.background)required.push(p.background);if(p.music)required.push(p.music);}
  for(const item of content.items||[])if(item.image)required.push(item.image);
  for(const asset of new Set(required))if(!fs.existsSync(path.join(projectRoot,asset)))structural.push(`Arquivo não encontrado: ${asset}`);
  if(structural.length)return structural;
  const errors=[];
  if(!content||content.schema!==1) errors.push('Formato de conteúdo inválido.');
  if(!Array.isArray(content?.realms)||!content.realms.length) errors.push('Inclua pelo menos um reino.');
  const realmIds=new Set();
  for(const realm of content?.realms||[]){
    if(!realm.id) errors.push('Existe um reino sem ID.');
    if(realmIds.has(realm.id)) errors.push(`ID de reino repetido: ${realm.id}.`);
    realmIds.add(realm.id);
    if(!realm.name) errors.push(`O reino ${realm.id||'(sem ID)'} está sem nome.`);
    const phaseNumbers=new Set();
    for(const phase of realm.phases||[]){
      if(!Number.isInteger(phase.number)) errors.push(`${realm.name}: fase sem número inteiro.`);
      if(phaseNumbers.has(phase.number)) errors.push(`${realm.name}: fase ${phase.number} repetida.`);
      phaseNumbers.add(phase.number);
      if(!phase.name) errors.push(`${realm.name}: fase ${phase.number} sem nome.`);
      if(!Array.isArray(phase.missions)||!phase.missions.length) errors.push(`${realm.name}: fase ${phase.number} sem missões.`);
      for(const mission of phase.missions||[]){
        if(!Array.isArray(mission.enemies)) errors.push(`${realm.name}: missão ${phase.number}.${mission.number} sem lista de inimigos.`);
        if(!Array.isArray(mission.lines)) errors.push(`${realm.name}: missão ${phase.number}.${mission.number} sem lista de falas.`);
      }
    }
  }
  const itemIds=new Set();
  for(const item of content?.items||[]){
    if(!item.id||!/^[a-z0-9-]+$/.test(item.id)) errors.push(`ID de item inválido: ${item.id||'(vazio)'}.`);
    if(itemIds.has(item.id)) errors.push(`ID de item repetido: ${item.id}.`);
    itemIds.add(item.id);
    if(!item.nome) errors.push(`Item ${item.id||'(sem ID)'} sem nome.`);
    if(!Number.isFinite(Number(item.preco))||Number(item.preco)<0) errors.push(`Preço inválido no item ${item.id}.`);
  }
  const characterIds=new Set();
  for(const character of content?.characters||[]){
    if(!character.id||!/^[a-z0-9-]+$/.test(character.id)) errors.push(`ID de personagem inválido: ${character.id||'(vazio)'}.`);
    if(characterIds.has(character.id)) errors.push(`ID de personagem repetido: ${character.id}.`);
    characterIds.add(character.id);
    if(!character.name) errors.push(`Personagem ${character.id||'(sem ID)'} sem nome.`);
    for(const [actionName,action] of Object.entries(character.sprites||{})) if(action?.enabled===true){
      if(!action.src) errors.push(`${character.name}: animação ${actionName} ativada sem arquivo.`);
      if(!Number.isInteger(Number(action.cols))||Number(action.cols)<1||!Number.isInteger(Number(action.rows))||Number(action.rows)<1) errors.push(`${character.name}: grade inválida em ${actionName}.`);
      if(!Number.isInteger(Number(action.frames))||Number(action.frames)<1||Number(action.frames)>Number(action.cols)*Number(action.rows)) errors.push(`${character.name}: quantidade de quadros inválida em ${actionName}.`);
    }
  }
  return errors;
}

function normalizePhase(phase,index){
  return {
    number:Number(phase.number||index+1),
    name:String(phase.name||`Fase ${index+1}`),
    subtitle:String(phase.subtitle||''),
    background:String(phase.background||''),
    music:String(phase.music||''),
    bosses:Array.isArray(phase.bosses)?phase.bosses.map(String):[],
    visual:{description:'Nada',key:'none',...(phase.visual||{})},
    before:String(phase.before||''),
    allowed:Array.isArray(phase.allowed)?phase.allowed.map(String):[],
    fixed:Array.isArray(phase.fixed)?phase.fixed.map(String):[],
    missions:(phase.missions||[]).map((mission,missionIndex)=>({
      number:Number(mission.number||missionIndex+1),
      title:String(mission.title||`Missão ${missionIndex+1}`),
      enemies:Array.isArray(mission.enemies)?mission.enemies.map(String):[],
      lines:(mission.lines||[]).map(line=>({speaker:String(line.speaker||'Narrador'),heroId:String(line.heroId||''),text:String(line.text||'')}))
    })),
    after:(phase.after||[]).map(line=>({speaker:String(line.speaker||'Narrador'),heroId:String(line.heroId||''),text:String(line.text||'')})),
    afterSceneCues:Array.isArray(phase.afterSceneCues)?phase.afterSceneCues.map(String):[]
  };
}

export function compileContent(content,{write=true}={}){
  const errors=validateContent(content);
  if(errors.length) return {ok:false,errors};
  const human=content.realms.find(realm=>realm.id==='humanos');
  if(!human) return {ok:false,errors:['O Reino dos Humanos é obrigatório para esta versão do jogo.']};
  const phases=(human.phases||[]).map(normalizePhase);
  if(phases.length!==10) return {ok:false,errors:[`O jogo atual exige 10 fases humanas; foram encontradas ${phases.length}.`]};
  const sourceHash=crypto.createHash('sha256').update(stable(phases)).digest('hex');
  const lorePayload={schema:1,source:'backstage/data/content.json',sourceHash,generatedAt:'backstage-local',phases};
  const updatedAt=content.updatedAt||'backstage-local';
  const runtimePayload={
    schema:1,
    generatedAt:updatedAt,
    menus:(content.menus||[]).map(entry=>({id:entry.id,label:entry.label||'',hint:entry.hint||'',visible:entry.visible!==false,order:Number(entry.order||0)})),
    items:(content.items||[]).map(item=>({...item,preco:Number(item.preco||0)})),
    characters:(content.characters||[]).map(character=>({...character})),
    settings:content.settings||{},
    realms:content.realms.map(({id,name,status,color,phases:realmPhases=[]})=>({id,name,status:status||'draft',color:color||'#d4af5a',phaseCount:realmPhases.length}))
  };
  if(write){
    fs.mkdirSync(path.dirname(dataFile),{recursive:true});
    if(fs.existsSync(dataFile)&&fs.readFileSync(dataFile,'utf8')!==stable({...content,updatedAt})){
      const backupDir=path.join(backstageRoot,'backups');fs.mkdirSync(backupDir,{recursive:true});
      fs.copyFileSync(dataFile,path.join(backupDir,`${Date.now()}-${crypto.randomBytes(3).toString('hex')}.json`));
    }
    fs.writeFileSync(dataFile,stable({...content,updatedAt}),'utf8');
    fs.writeFileSync(path.join(projectRoot,'humanos-lore-v10.js'),`/* Arquivo gerado pelo Backstage local de Ygdria. */\n(function(root){\n  'use strict';\n  root.YGDRIA_HUMANOS_LORE=Object.freeze(${JSON.stringify(lorePayload,null,2)});\n})(typeof window!=='undefined'?window:globalThis);\n`,'utf8');
    fs.writeFileSync(path.join(projectRoot,'backstage-content-v1.js'),`/* Arquivo gerado pelo Backstage local de Ygdria. */\n(function(root){\n  'use strict';\n  root.YGDRIA_BACKSTAGE_CONTENT=Object.freeze(${JSON.stringify(runtimePayload,null,2)});\n})(typeof window!=='undefined'?window:globalThis);\n`,'utf8');
  }
  return {ok:true,errors:[],summary:{realms:content.realms.length,phases:content.realms.reduce((sum,realm)=>sum+(realm.phases?.length||0),0),characters:content.characters?.length||0,items:content.items?.length||0,menus:content.menus?.length||0,sourceHash,updatedAt}};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  if(!fs.existsSync(dataFile)) throw new Error(`Conteúdo do Backstage ausente: ${dataFile}`);
  const result=compileContent(readJson(dataFile));
  if(!result.ok){ console.error(result.errors.join('\n')); process.exitCode=1; }
  else console.log(`Backstage compilado: ${result.summary.realms} reinos, ${result.summary.phases} fases, ${result.summary.characters} personagens, ${result.summary.items} itens.`);
}
