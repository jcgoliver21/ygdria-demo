import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import zlib from 'node:zlib';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sourceRoot=path.join(repo,'assets','characters','v10');
const runtimeRoot=path.join(repo,'assets','characters','runtime-v10');

const characters={
  luz:'galateia', humanos:'berenice', agua:'maril', fogo:'lucius',
  natureza:'ninfa-queen', terra:'kallendra', areia:'rashid',
  sombras:'berenice-sombras', raio:'raio', vento:'vento', chuvas:'chuvas',
  gelo:'gelo', gareth:'gareth', cedric:'cedric', elizier:'elizier',
  roland:'roland', 'berenice-jovem':'berenice-jovem',
  'galateia-jovem':'galateia-jovem', 'adriel-jovem':'adriel-jovem',
  'acqua-jovem':'acqua-jovem', jules:'jules', kalander:'kalander',
  bernyce:'bernyce', julius:'julius'
};

const actions={
  idle:{frames:4,cols:2,rows:2,duration:2400,loop:true},
  attack:{frames:6,cols:3,rows:2,duration:720},
  cast:{frames:6,cols:3,rows:2,duration:840},
  hit:{frames:4,cols:2,rows:2,duration:360},
  victory:{frames:4,cols:2,rows:2,duration:1200,hold:true}
};

function invariant(value,message){ if(!value) throw new Error(message); }
function readJson(file){ return JSON.parse(fs.readFileSync(file,'utf8')); }
function sha256(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }

function pngInfo(file){
  const bytes=fs.readFileSync(file);
  invariant(bytes.length>=33&&bytes.subarray(1,4).toString('ascii')==='PNG',`PNG inválido: ${file}`);
  return {width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),bitDepth:bytes[24],colorType:bytes[25]};
}

function readPngChunks(file){
  const bytes=fs.readFileSync(file);
  const chunks=[];
  for(let offset=8;offset+12<=bytes.length;){
    const length=bytes.readUInt32BE(offset);
    const type=bytes.toString('ascii',offset+4,offset+8);
    invariant(offset+12+length<=bytes.length,`Chunk PNG truncado: ${file}`);
    chunks.push({type,data:bytes.subarray(offset+8,offset+8+length)});
    offset+=length+12;
    if(type==='IEND') break;
  }
  return chunks;
}

function verifyTransparentRgba(file,info){
  invariant(info.bitDepth===8&&info.colorType===6,`PNG precisa ser RGBA 8-bit: ${file}`);
  const idat=Buffer.concat(readPngChunks(file).filter(chunk=>chunk.type==='IDAT').map(chunk=>chunk.data));
  const inflated=zlib.inflateSync(idat);
  const stride=info.width*4;
  const previous=Buffer.alloc(stride);
  let transparent=false;
  let opaque=false;
  let offset=0;
  for(let y=0;y<info.height;y++){
    const filter=inflated[offset++];
    const row=Buffer.from(inflated.subarray(offset,offset+stride)); offset+=stride;
    for(let x=0;x<stride;x++){
      const left=x>=4?row[x-4]:0;
      const up=previous[x];
      const upperLeft=x>=4?previous[x-4]:0;
      if(filter===1) row[x]=(row[x]+left)&255;
      else if(filter===2) row[x]=(row[x]+up)&255;
      else if(filter===3) row[x]=(row[x]+Math.floor((left+up)/2))&255;
      else if(filter===4){
        const p=left+up-upperLeft,pa=Math.abs(p-left),pb=Math.abs(p-up),pc=Math.abs(p-upperLeft);
        row[x]=(row[x]+(pa<=pb&&pa<=pc?left:pb<=pc?up:upperLeft))&255;
      } else invariant(filter===0,`Filtro PNG desconhecido ${filter}: ${file}`);
    }
    for(let x=3;x<stride;x+=4){ transparent||=row[x]===0; opaque||=row[x]>0; }
    row.copy(previous);
  }
  invariant(transparent&&opaque,`PNG precisa conter fundo transparente e personagem visível: ${file}`);
}

async function validateBundle(characterId,folder,action,contract){
  const approved=path.join(sourceRoot,folder,action,'approved');
  const sheet=path.join(approved,'sheet-transparent.png');
  const metadata=path.join(approved,'pipeline-meta.json');
  const preview=path.join(approved,'animation.gif');
  for(const file of [sheet,metadata,preview]) invariant(fs.existsSync(file),`Falta entrega aprovada: ${path.relative(repo,file)}`);

  const meta=readJson(metadata);
  const qc=meta.qc_summary||{};
  invariant(meta.qc_config?.strict_qc===true,`${characterId}/${action}: strict_qc ausente`);
  invariant(meta.cols===contract.cols&&meta.rows===contract.rows,`${characterId}/${action}: grade inesperada`);
  invariant(qc.frame_count===contract.frames&&qc.valid_frame_count===contract.frames,`${characterId}/${action}: quadros incompletos`);
  invariant(qc.empty_count===0&&qc.paste_clamped_count===0,`${characterId}/${action}: quadro vazio ou deslocado`);
  invariant((meta.output_edge_touch_frames||[]).length===0,`${characterId}/${action}: arte toca a borda runtime`);
  const actionNames=new Set(fs.readdirSync(path.dirname(approved)));
  const effectEnvelopePolicy=actionNames.has('effect-envelope-policy.txt');
  if(effectEnvelopePolicy){
    /* Alguns ataques e conjurações trazem VFX extensos (vinhas, raios, gelo)
       na mesma folha. A variação do envelope não representa mudança de escala
       corporal; exigimos, neste caso, que cada quadro preserve a escala 1:1. */
    invariant(meta.frames.every(frame=>frame.scale_changed===false&&Number(frame.scale_adjustment)===1),`${characterId}/${action}: política de efeitos exige escala corporal fixa`);
    const feet=new Set(meta.frames.map(frame=>Number(frame.anchor_target?.[1])));
    invariant(feet.size===1&&Number.isFinite([...feet][0]),`${characterId}/${action}: política de efeitos exige pés alinhados`);
  }else{
    invariant(qc.edge_touch_count===0,`${characterId}/${action}: quadro cortado`);
    invariant((meta.source_edge_touch_frames||[]).length===0,`${characterId}/${action}: arte toca a borda de origem`);
    invariant(Number(qc.body_scale_cv)<=0.08,`${characterId}/${action}: variação de escala ${qc.body_scale_cv}`);
    invariant(Number(qc.anchor_y_std)<=0.05,`${characterId}/${action}: deriva da âncora ${qc.anchor_y_std}`);
  }
  const drift=Number(qc.profile_body_scale_drift);
  if(!effectEnvelopePolicy&&Number.isFinite(drift)&&drift>0.08){
    invariant(['attack','hit'].includes(action),`${characterId}/${action}: deriva de perfil ${drift}`);
    const approvedNames=new Set(fs.readdirSync(approved));
    const policyDocumented=approvedNames.has('pose-drift-policy.txt')||approvedNames.has('pose_drift_policy.txt')||actionNames.has('qc-exception.txt');
    invariant(policyDocumented,`${characterId}/${action}: exceção de pose não documentada`);
  }

  const png=pngInfo(sheet);
  await verifyTransparentRgba(sheet,png);
  invariant(png.width===meta.cell_size*contract.cols&&png.height===meta.cell_size*contract.rows,`${characterId}/${action}: dimensão PNG incoerente`);
  const bytes=fs.statSync(sheet).size;
  invariant(bytes<=2.5*1024*1024,`${characterId}/${action}: folha excede 2,5 MiB`);
  return {sheet,metadata,meta,png,bytes,hash:sha256(sheet)};
}

const bundles=[];
for(const [characterId,folder] of Object.entries(characters)){
  for(const [action,contract] of Object.entries(actions)){
    bundles.push({characterId,folder,action,contract,...await validateBundle(characterId,folder,action,contract)});
  }
}
invariant(bundles.length===120,`Matriz incompleta: ${bundles.length}/120`);
const totalBytes=bundles.reduce((sum,bundle)=>sum+bundle.bytes,0);
invariant(totalBytes<=48*1024*1024,`Orçamento runtime excedido: ${(totalBytes/1024/1024).toFixed(2)} MiB`);

/* As folhas mantêm o perfil de cada personagem. Um ajuste pequeno por elenco
   aproxima a altura visual sem apagar diferenças de porte (monstros continuam
   maiores; jovens continuam menores). */
const displayScales={};
for(const [characterId] of Object.entries(characters)){
  const idle=bundles.find(bundle=>bundle.characterId===characterId&&bundle.action==='idle');
  const bodyScale=Number(idle?.meta?.qc_summary?.body_scale_mean);
  invariant(Number.isFinite(bodyScale)&&bodyScale>0,`${characterId}: escala idle ausente`);
  const target=characterId.endsWith('-jovem')?0.43:0.50;
  displayScales[characterId]=Number(Math.max(0.88,Math.min(1.12,target/bodyScale)).toFixed(4));
}

const manifest={version:10,generatedAt:new Date().toISOString(),totalSheets:bundles.length,totalBytes,displayScales,characters:{}};
for(const characterId of Object.keys(characters)) manifest.characters[characterId]={};

for(const bundle of bundles){
  const outputDir=path.join(runtimeRoot,bundle.characterId);
  fs.mkdirSync(outputDir,{recursive:true});
  const stem=`${bundle.action}-${bundle.contract.cols}x${bundle.contract.rows}`;
  const outputSheet=path.join(outputDir,`${stem}.png`);
  const outputMeta=path.join(outputDir,`${bundle.action}-meta.json`);
  fs.copyFileSync(bundle.sheet,outputSheet);
  const runtimeMeta=structuredClone(bundle.meta);
  /* Metadados públicos descrevem a folha entregue, nunca o caminho local do
     computador que participou do processamento. */
  if('input' in runtimeMeta) runtimeMeta.input='source-redacted';
  if(runtimeMeta.scale_profile?.path) runtimeMeta.scale_profile.path='source-redacted';
  fs.writeFileSync(outputMeta,JSON.stringify(runtimeMeta,null,2)+'\n');
  const relativeSheet=path.relative(repo,outputSheet).replaceAll(path.sep,'/');
  manifest.characters[bundle.characterId][bundle.action]={
    ...bundle.contract,format:'sheet',src:relativeSheet,bytes:bundle.bytes,
    width:bundle.png.width,height:bundle.png.height,displayScale:displayScales[bundle.characterId],sha256:bundle.hash
  };
}

fs.writeFileSync(path.join(runtimeRoot,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const runtime={};
for(const [characterId,characterActions] of Object.entries(manifest.characters)){
  runtime[characterId]={};
  for(const [action,spec] of Object.entries(characterActions)){
    const {bytes,width,height,sha256,...publicSpec}=spec;
    runtime[characterId][action]=publicSpec;
  }
}
const animationSource=`/* Gerado por tools/promote-v10-assets.mjs após QC da matriz 24×5. */\n`+
  `(function exposeV10Animations(){\n  const animations=${JSON.stringify(runtime,null,2)};\n`+
  `  window.YGDRIA_V10_ANIMATIONS=Object.freeze(animations);\n})();\n`;
fs.writeFileSync(path.join(repo,'v10-animations.js'),animationSource);

console.log(`v10 assets promovidos: ${bundles.length}/120 folhas, ${(totalBytes/1024/1024).toFixed(2)} MiB`);
