import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const externalSource=path.resolve(root,'..','docs','REINO-HUMANOS-FASES-EDITAVEL.md');
const mirrorSource=path.join(root,'docs','REINO-HUMANOS-FASES-EDITAVEL.md');
const runtimeTarget=path.join(root,'humanos-lore-v10.js');
const checkOnly=process.argv.includes('--check');
const sourcePath=fs.existsSync(externalSource)?externalSource:mirrorSource;

if(!fs.existsSync(sourcePath)) throw new Error(`Fonte da campanha não encontrada: ${sourcePath}`);

const normalizeText=value=>String(value||'').replace(/\r\n?/g,'\n').trimEnd()+'\n';
const sourceText=normalizeText(fs.readFileSync(sourcePath,'utf8'));
const sourceHash=crypto.createHash('sha256').update(sourceText).digest('hex');

const HERO_LABELS=[
  ['Adriel (Jovem)','adriel-jovem'],
  ['Berenice (Jovem)','berenice-jovem'],
  ['Galatéia (Jovem)','galateia-jovem'],
  ['Acqua (Jovem)','acqua-jovem'],
  ['Gareth','gareth'],
  ['Roland','roland'],
  ['Elizier','elizier']
];

const ENEMY_IDS=new Map(Object.entries({
  'Slime de Cerejeira':'slimeCereja',
  'Lobo Raivoso':'loboRaivoso',
  'Soldado 1':'soldado1',
  'Soldado 2':'soldado2',
  'Gareth':'gareth',
  'Capitão dos Soldados':'capitao',
  'Cedric':'cedric',
  'Elizier':'elizier',
  'Roland':'roland',
  'Vulto Sombrio':'vulto',
  'Espectro Sombrio':'espectro',
  'Cavaleiro Morto-Vivo':'morto',
  'Jules':'jules',
  'Soldado da Biblioteca 1':'soldBib1',
  'Soldado da Biblioteca 2':'soldBib2',
  'Soldado da Biblioteca 3':'soldBib3',
  'Bernyce':'bernyce',
  'Soldado de Infantaria':'infantaria',
  'Soldado de Cavalaria':'cavalaria',
  'Comandante dos Soldados':'comandante',
  'Kalander':'kalander',
  'Julius':'julius',
  'Soldado do Trono Real':'trono'
}));
const ENEMY_NAMES=new Map([...ENEMY_IDS].map(([name,id])=>[id,name]));

const stripMarkdown=value=>String(value||'').replace(/\*\*/g,'').trim();
const field=(block,label)=>{
  const match=block.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)$`,'mi'));
  return match?match[1].trim():'';
};
const heroIdForSpeaker=name=>{
  const plain=String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(plain==='adriel') return 'adriel-jovem';
  if(plain==='berenice') return 'berenice-jovem';
  if(plain==='galateia') return 'galateia-jovem';
  if(plain==='acqua') return 'acqua-jovem';
  return '';
};
const parseEnemyTitle=title=>{
  const result=[];
  for(const rawPart of String(title||'').split('+')){
    const part=rawPart.trim();
    const amountMatch=part.match(/\s*[×x]\s*(\d+)\s*$/i);
    const amount=amountMatch?Number(amountMatch[1]):1;
    const name=part.replace(/\s*[×x]\s*\d+\s*$/i,'').trim();
    const id=ENEMY_IDS.get(name);
    if(!id) throw new Error(`Inimigo sem mapeamento no roteiro: "${name}"`);
    for(let i=0;i<amount;i++) result.push(id);
  }
  return result;
};
const classifyAtmosphere=text=>{
  const value=String(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(value.includes('petala')) return {key:'cherry-petals',accumulates:true};
  if(value.includes('brilhos')||value.includes('raios de luz rosa')) return {key:'sacred-pink-light'};
  if(value.includes('confete')) return {key:'festival-confetti',accumulates:true};
  if(value.includes('nevoa')) return {key:'shadow-fog'};
  if(value.includes('folhas de livros')) return {key:'library-pages',progressive:true};
  if(value.includes('fogos de artificio')) return {key:'fireworks'};
  if(value.includes('nada /')&&value.includes('missao 5')) return {key:'none',missionFive:'darkness'};
  if(value.includes('escuridao')) return {key:'darkness'};
  return {key:'none'};
};
const parseLine=(raw,fallbackSpeaker='Narrador')=>{
  const line=stripMarkdown(raw).replace(/^[-\s]+/,'').trim();
  const colon=line.indexOf(':');
  const speaker=(colon>=0?line.slice(0,colon):fallbackSpeaker).trim().replace(/^\((.+)\)$/,'$1');
  const text=(colon>=0?line.slice(colon+1):line).trim();
  return {speaker:speaker||fallbackSpeaker,heroId:heroIdForSpeaker(speaker),text};
};

const sections=sourceText.split(/^## Fase\s+/m).slice(1);
if(sections.length!==10) throw new Error(`Esperadas 10 fases; encontradas ${sections.length}.`);

const phases=sections.map(section=>{
  const lines=section.split('\n');
  const header=lines.shift()?.trim()||'';
  const headerMatch=header.match(/^(\d+)\s*[—-]\s*(.+)$/);
  if(!headerMatch) throw new Error(`Cabeçalho de fase inválido: ${header}`);
  const number=Number(headerMatch[1]);
  const name=headerMatch[2].trim();
  const block=lines.join('\n');
  const subtitle=field(block,'Subtítulo');
  const bosses=(field(block,'Chefes?')||'').split(/,|\se\s/i).map(x=>x.trim()).filter(Boolean);
  const visualMatch=block.match(/^Efeito Visual:\s*(.+)$/mi);
  const visualText=visualMatch?visualMatch[1].trim():'Nada';
  const beforeLine=lines.find(line=>/\*\*Antes de começar a missão/i.test(line))||'';
  const before=stripMarkdown(beforeLine)
    .replace(/^Antes de começar a missão\s*:?[\s]*(?:\(Narrador\))?\s*:?[\s]*/i,'')
    .replace(/^\(Narrador\)\s*/i,'')
    .trim();
  const enabledLine=lines.find(line=>/\*\*Cartas habilitadas:/i.test(line))||'';
  const enabledLead=enabledLine.split(/Caso o jogador/i)[0];
  const allowed=HERO_LABELS.filter(([label])=>enabledLead.includes(label)).map(([,id])=>id);
  let fixed=[];
  if(/serão fixos/i.test(enabledLine)){
    const fixedClause=enabledLine.split('.').find(part=>/serão fixos/i.test(part))||'';
    fixed=HERO_LABELS.filter(([label])=>fixedClause.includes(label)).map(([,id])=>id);
  }
  else if(allowed.length===4) fixed=[...allowed];

  const missionStart=lines.findIndex(line=>/^### Missões\s*$/i.test(line.trim()));
  const finalStart=lines.findIndex(line=>/\*\*Final da (?:missão|fase)/i.test(line));
  if(missionStart<0||finalStart<0) throw new Error(`Blocos de missões/final ausentes na fase ${number}.`);
  const missions=[];
  let mission=null;
  for(const raw of lines.slice(missionStart+1,finalStart)){
    const titleMatch=raw.match(/^\s*(\d+)\.\s+\*\*(.+?)\*\*\s*$/);
    if(titleMatch){
      mission={number:Number(titleMatch[1]),title:titleMatch[2].trim(),enemies:parseEnemyTitle(titleMatch[2]),lines:[]};
      missions.push(mission);
      continue;
    }
    if(!mission||!/^\s*-\s+/.test(raw)) continue;
    const fragments=raw.trim().replace(/^-\s*/, '').split(/\s+\/\s+-\s+/);
    for(const fragment of fragments){
      const fallback=ENEMY_NAMES.get(mission.enemies[0])||'Narrador';
      const parsed=parseLine(fragment,fallback);
      if(parsed.text) mission.lines.push(parsed);
    }
  }
  if(missions.length!==5) throw new Error(`Esperadas 5 missões na fase ${number}; encontradas ${missions.length}.`);

  const after=[];
  const afterSceneCues=[];
  const finalRaw=lines[finalStart];
  const firstText=stripMarkdown(finalRaw).replace(/^Final da (?:missão|fase)\s*(?:\(Narrador\))?\s*:+\s*/i,'').trim();
  if(firstText) after.push({speaker:'Narrador',heroId:'',text:firstText});
  for(const raw of lines.slice(finalStart+1)){
    if(/^---\s*$/.test(raw.trim())) break;
    if(/^\s*\*\*.+aparece no cenário\*\*\s*$/i.test(raw)){
      afterSceneCues.push(stripMarkdown(raw));
      continue;
    }
    if(/^\s*-\s+/.test(raw)||/^\s*\*\*\(Narrador\)\*\*\s*:/.test(raw)){
      const parsed=parseLine(raw,'Narrador');
      if(parsed.text) after.push(parsed);
    }
  }
  return {number,name,subtitle,bosses,visual:{description:visualText,...classifyAtmosphere(visualText)},before,allowed,fixed,missions,after,afterSceneCues};
});

const payload={
  schema:1,
  source:'docs/REINO-HUMANOS-FASES-EDITAVEL.md',
  sourceHash,
  generatedAt:'deterministic',
  phases
};
const generated=`/* Arquivo gerado por tools/sync-humanos-lore.mjs.
   Fonte canônica: docs/REINO-HUMANOS-FASES-EDITAVEL.md. Não edite à mão. */
(function(root){
  'use strict';
  root.YGDRIA_HUMANOS_LORE=Object.freeze(${JSON.stringify(payload,null,2)});
})(typeof window!=='undefined'?window:globalThis);
`;

if(checkOnly){
  const current=fs.existsSync(runtimeTarget)?normalizeText(fs.readFileSync(runtimeTarget,'utf8')):'';
  const mirror=fs.existsSync(mirrorSource)?normalizeText(fs.readFileSync(mirrorSource,'utf8')):'';
  if(current!==normalizeText(generated)) throw new Error('humanos-lore-v10.js está fora de sincronia. Execute pnpm run sync:lore.');
  if(sourcePath===externalSource&&mirror!==sourceText) throw new Error('O espelho do Markdown está fora de sincronia. Execute pnpm run sync:lore.');
  console.log(`Lore canônica validada: ${phases.length} fases, SHA-256 ${sourceHash.slice(0,12)}.`);
}else{
  fs.mkdirSync(path.dirname(mirrorSource),{recursive:true});
  fs.writeFileSync(mirrorSource,sourceText,'utf8');
  fs.writeFileSync(runtimeTarget,generated,'utf8');
  console.log(`Lore sincronizada: ${phases.length} fases, SHA-256 ${sourceHash.slice(0,12)}.`);
}
