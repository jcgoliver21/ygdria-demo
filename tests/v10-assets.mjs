import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

const root=path.resolve(import.meta.dirname,'..');
const runtime=path.join(root,'assets','characters','runtime-v10');
const manifest=JSON.parse(fs.readFileSync(path.join(runtime,'manifest.json'),'utf8'));
const animations=fs.readFileSync(path.join(root,'v10-animations.js'),'utf8');
const actions={idle:[4,2,2],attack:[6,3,2],cast:[6,3,2],hit:[4,2,2],victory:[4,2,2]};

function decodeRgba(bytes){
  assert.equal(bytes[24],8,'PNG precisa ser 8-bit');
  assert.equal(bytes[25],6,'PNG precisa ser RGBA');
  const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
  const chunks=[];
  for(let offset=8;offset+12<=bytes.length;){
    const length=bytes.readUInt32BE(offset);
    const type=bytes.toString('ascii',offset+4,offset+8);
    if(type==='IDAT') chunks.push(bytes.subarray(offset+8,offset+8+length));
    offset+=length+12;
    if(type==='IEND') break;
  }
  const raw=zlib.inflateSync(Buffer.concat(chunks));
  const stride=width*4,rgba=Buffer.alloc(stride*height),previous=Buffer.alloc(stride);
  let input=0;
  for(let y=0;y<height;y++){
    const filter=raw[input++];
    const row=Buffer.from(raw.subarray(input,input+stride)); input+=stride;
    for(let x=0;x<stride;x++){
      const left=x>=4?row[x-4]:0,up=previous[x],upperLeft=x>=4?previous[x-4]:0;
      if(filter===1) row[x]=(row[x]+left)&255;
      else if(filter===2) row[x]=(row[x]+up)&255;
      else if(filter===3) row[x]=(row[x]+Math.floor((left+up)/2))&255;
      else if(filter===4){
        const p=left+up-upperLeft,pa=Math.abs(p-left),pb=Math.abs(p-up),pc=Math.abs(p-upperLeft);
        row[x]=(row[x]+(pa<=pb&&pa<=pc?left:pb<=pc?up:upperLeft))&255;
      }else assert.equal(filter,0,`filtro PNG ${filter} não suportado`);
    }
    row.copy(previous); row.copy(rgba,y*stride);
  }
  return {width,height,rgba};
}

function verifyCells(characterId,action,decoded,frames,cols,rows){
  const cellW=decoded.width/cols,cellH=decoded.height/rows;
  assert.ok(Number.isInteger(cellW)&&Number.isInteger(cellH),`${characterId}/${action}: grade fracionária`);
  for(let frame=0;frame<frames;frame++){
    const ox=(frame%cols)*cellW,oy=Math.floor(frame/cols)*cellH;
    let visible=0,edge=false;
    for(let y=0;y<cellH;y++) for(let x=0;x<cellW;x++){
      const alpha=decoded.rgba[((oy+y)*decoded.width+ox+x)*4+3];
      if(alpha>2){
        visible++;
        if(x===0||y===0||x===cellW-1||y===cellH-1) edge=true;
      }
    }
    assert.ok(visible>cellW*cellH*.005,`${characterId}/${action}: quadro ${frame+1} vazio`);
    assert.equal(edge,false,`${characterId}/${action}: alfa toca a borda no quadro ${frame+1}`);
  }
}

function medianDenseBodyHeight(decoded,frames,cols,rows){
  const cellW=decoded.width/cols,cellH=decoded.height/rows;
  const heights=[];
  for(let frame=0;frame<frames;frame++){
    const ox=(frame%cols)*cellW,oy=Math.floor(frame/cols)*cellH;
    const rowsWithBody=[];
    for(let y=0;y<cellH;y++){
      let dense=0;
      for(let x=80;x<176;x++) if(decoded.rgba[((oy+y)*decoded.width+ox+x)*4+3]>24) dense++;
      if(dense>=9) rowsWithBody.push(y);
    }
    assert.ok(rowsWithBody.length>=24,'corpo denso ausente');
    heights.push(rowsWithBody.at(-1)-rowsWithBody[0]+1);
  }
  heights.sort((a,b)=>a-b);
  const middle=heights.length/2;
  return (heights[middle-1]+heights[middle])/2;
}

assert.equal(manifest.version,10);
assert.equal(Object.keys(manifest.characters).length,24,'o manifesto precisa conter 24 personagens');
assert.equal(manifest.totalSheets,120,'o manifesto precisa conter 120 folhas');
assert.ok(manifest.totalBytes<=48*1024*1024,'orçamento mobile de 48 MiB excedido');

let sheets=0;
let computedBytes=0;
const hashes=new Set();
for(const [characterId,characterActions] of Object.entries(manifest.characters)){
  assert.deepEqual(Object.keys(characterActions).sort(),Object.keys(actions).sort(),`${characterId}: cinco movimentos obrigatórios`);
  for(const [action,[frames,cols,rows]] of Object.entries(actions)){
    const spec=characterActions[action];
    const file=path.join(root,...spec.src.split('/'));
    const metaFile=path.join(runtime,characterId,`${action}-meta.json`);
    assert.ok(fs.existsSync(file),`${spec.src} ausente`);
    assert.ok(fs.existsSync(metaFile),`${characterId}/${action}: metadados ausentes`);
    assert.match(animations,new RegExp(`"${characterId}"[\\s\\S]+?"${action}"[\\s\\S]+?${spec.src.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}`));
    const bytes=fs.readFileSync(file);
    assert.equal(bytes.subarray(1,4).toString('ascii'),'PNG');
    assert.equal(bytes[25],6,`${characterId}/${action}: PNG precisa ser RGBA`);
    assert.equal(bytes.readUInt32BE(16),spec.width);
    assert.equal(bytes.readUInt32BE(20),spec.height);
    assert.equal(spec.frames,frames);
    assert.equal(spec.cols,cols);
    assert.equal(spec.rows,rows);
    assert.equal(fs.statSync(file).size,spec.bytes);
    assert.ok(spec.displayScale>=.88&&spec.displayScale<=1.5,`${characterId}/${action}: escala visual fora do limite`);
    const hash=crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash,spec.sha256,`${characterId}/${action}: hash divergente`);
    assert.equal(hashes.has(hash),false,`${characterId}/${action}: folha duplicada`);
    hashes.add(hash);
    verifyCells(characterId,action,decodeRgba(bytes),frames,cols,rows);
    computedBytes+=spec.bytes;
    sheets++;
  }
}
assert.equal(sheets,120);
assert.equal(computedBytes,manifest.totalBytes);
assert.equal(hashes.size,120,'cada movimento precisa de uma folha própria');
assert.equal(fs.readdirSync(runtime,{recursive:true}).filter(file=>String(file).endsWith('.gif')).length,0,'GIFs de preview não pertencem ao runtime');

/* Inimigos exclusivos também entram como sprites de runtime: seis folhas
   RGBA, 2×3 e sem alfa na borda. Isso bloqueia a volta de fundos pintados ou
   de recortes borrados no campo de batalha. */
const enemySheets=['human-guard','rune-slime','shadow-wolf','cursed-wraith','stone-sentinel','crimson-dragon'];
let enemyBytes=0;
for(const id of enemySheets){
  const file=path.join(root,'assets','enemies','runtime-v10',id,'processed','sheet-transparent.png');
  assert.ok(fs.existsSync(file),`${id}: folha de combate ausente`);
  const bytes=fs.readFileSync(file);
  assert.equal(bytes[25],6,`${id}: PNG precisa preservar alfa`);
  const decoded=decodeRgba(bytes);
  assert.deepEqual([decoded.width,decoded.height],[512,768],`${id}: grade 2×3 precisa ter células de 256px`);
  verifyCells(id,'combat',decoded,6,2,3);
  enemyBytes+=bytes.length;
}
assert.ok(enemyBytes<=2*1024*1024,'folhas de inimigos excederam orçamento de 2 MiB');

/* A Fase 10 utiliza duas faixas MP3 dedicadas. Validamos assinatura e limite
   de entrega mobile para impedir que uma página HTML do Drive seja publicada
   por engano no lugar da música. */
for(const name of ['Ygdria_10_Sombras_Que_Devoram.mp3','Ygdria_10_Sombras_Que_Devoram_Final.mp3']){
  const file=path.join(root,'assets','audio',name);
  assert.ok(fs.existsSync(file),`${name}: trilha ausente`);
  const bytes=fs.readFileSync(file);
  assert.ok(bytes.length>200*1024&&bytes.length<4*1024*1024,`${name}: orçamento de música inválido`);
  assert.ok(bytes.subarray(0,3).toString('ascii')==='ID3'||(bytes[0]===0xff&&(bytes[1]&0xe0)===0xe0),`${name}: não é MP3 válido`);
}

/* Magias humanas v12 são uma camada exclusiva: devem permanecer em PNG RGBA,
   ter as seis etapas legíveis e nunca encostar na borda do seu próprio quadro.
   Isso impede o retorno de efeitos do ataque reutilizados ou cortados. */
const humanMagicIds=['gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'];
let humanMagicBytes=0;
for(const id of humanMagicIds){
  const file=path.join(root,'assets','vfx','v12-magic','humanos',id,'cast','processed-v2','sheet-transparent.png');
  assert.ok(fs.existsSync(file),`${id}: VFX de magia v12 ausente`);
  const bytes=fs.readFileSync(file);
  assert.equal(bytes[25],6,`${id}: VFX de magia precisa preservar alfa`);
  const decoded=decodeRgba(bytes);
  assert.deepEqual([decoded.width,decoded.height],[768,512],`${id}: VFX de magia precisa ser uma grade 3×2 de 256px`);
  verifyCells(id,'magic-v12',decoded,6,3,2);
  humanMagicBytes+=bytes.length;
}
assert.ok(humanMagicBytes<=5*1024*1024,'VFX de magia humanos excederam orçamento de 5 MiB');

/* Auras assinatura R16: a mesma fonte aprovada na vitrine precisa existir no
   runtime, manter alfa e nunca criar uma caixa pintada em volta do personagem. */
const humanConjurationSignatures={
  default:'assets/vfx/v13-conjuration/aura-runes/processed/sheet-transparent.png',
  kalander:'assets/vfx/v15-conjuration/special/kalander/processed/sheet-transparent.png',
  bernyce:'assets/vfx/v14-conjuration/special/bernyce/processed/sheet-transparent.png',
  jules:'assets/vfx/v15-conjuration/special/jules/processed/sheet-transparent.png',
  julius:'assets/vfx/v15-conjuration/special/julius/processed/sheet-transparent.png'
};
for(const [id,relative] of Object.entries(humanConjurationSignatures)){
  const file=path.join(root,...relative.split('/'));
  assert.ok(fs.existsSync(file),`${id}: aura assinatura ausente`);
  const bytes=fs.readFileSync(file);
  assert.equal(bytes[25],6,`${id}: aura assinatura precisa preservar alfa`);
  const decoded=decodeRgba(bytes);
  assert.deepEqual([decoded.width,decoded.height],[768,512],`${id}: aura assinatura precisa ser 3×2 em 256px`);
  verifyCells(id,'conjuration-signature',decoded,6,3,2);
}

/* As ações abaixo têm VFX amplos, porém o corpo precisa preservar a mesma
   estatura que o Idle. O render aplica um multiplicador de escala ancorado
   nos pés; esta verificação impede a regressão vista na vitrine do catálogo. */
const crossActionStature={
  chuvas:{cast:1.1544},
  gelo:{attack:1.2539,cast:1.3375},
  julius:{attack:1.3830,cast:1.4531},
  natureza:{attack:1.3131,cast:1.0849},
  raio:{attack:1.1801,cast:1.2490}
};
for(const [characterId,actionsToLock] of Object.entries(crossActionStature)){
  const idle=manifest.characters[characterId].idle;
  const idleDecoded=decodeRgba(fs.readFileSync(path.join(root,...idle.src.split('/'))));
  const idleBody=medianDenseBodyHeight(idleDecoded,idle.frames,idle.cols,idle.rows)*idle.displayScale;
  for(const [action,expectedMultiplier] of Object.entries(actionsToLock)){
    const spec=manifest.characters[characterId][action];
    assert.ok(Math.abs(spec.displayScale/idle.displayScale-expectedMultiplier)<.001,`${characterId}/${action}: multiplicador corporal divergente`);
    const decoded=decodeRgba(fs.readFileSync(path.join(root,...spec.src.split('/'))));
    const body=medianDenseBodyHeight(decoded,spec.frames,spec.cols,spec.rows)*spec.displayScale;
    assert.ok(Math.abs(body-idleBody)<=3,`${characterId}/${action}: troca de ação altera a estatura (${body.toFixed(1)} vs ${idleBody.toFixed(1)})`);
  }
}

console.log(`v10 assets: ${sheets}/120 folhas válidas, ${(computedBytes/1024/1024).toFixed(2)} MiB + ${(enemyBytes/1024/1024).toFixed(2)} MiB de inimigos + ${(humanMagicBytes/1024/1024).toFixed(2)} MiB de VFX humanos`);
