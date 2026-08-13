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
    assert.ok(spec.displayScale>=.88&&spec.displayScale<=1.12,`${characterId}/${action}: escala visual fora do limite`);
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

console.log(`v10 assets: ${sheets}/120 folhas válidas, ${(computedBytes/1024/1024).toFixed(2)} MiB`);
