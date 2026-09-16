import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const child=spawn(process.execPath,['backstage/server.mjs'],{env:{...process.env,YGDRIA_BACKSTAGE_PORT:'4402'},stdio:'pipe'});
const base='http://127.0.0.1:4402';let asset;
try{
  await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(new Error(`Servidor terminou: ${code}`)));});
  const call=(path,body,method='POST',headers={})=>fetch(base+path,{method,headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
  const content=await fetch(base+'/api/content').then(r=>r.json());
  assert.equal((await call('/api/content',{schema:1},'PUT')).status,422);
  assert.equal((await call('/api/content',content,'PUT',{Origin:'http://other.invalid'})).status,403);
  assert.equal((await fetch(base+'/project/.git/config')).status,403);
  assert.equal((await call('/api/assets',{name:'bad.svg',data:'data:image/svg+xml;base64,PHN2Zz4='})).status,415);
  const pixel='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Zl1sAAAAASUVORK5CYII=';
  const response=await call('/api/assets',{name:'backstage-api-test.png',category:'cards',data:'data:image/png;base64,'+pixel});
  assert.equal(response.status,201);asset=(await response.json()).asset;
  assert.equal((await fetch(base+'/project/'+asset.path)).status,200);
  const candidate=structuredClone(content);candidate.characters[0].card='assets/does-not-exist.png';
  assert.equal((await call('/api/content',candidate,'PUT')).status,422);
  assert.equal((await fetch(base+'/api/content').then(r=>r.json())).characters[0].card,content.characters[0].card);
  assert.equal((await call('/api/content',content,'PUT')).status,200);
  console.log('API: upload real, conteúdo inválido, mídia ausente, origem e arquivos privados aprovados.');
}finally{child.kill();if(asset?.path.startsWith('assets/backstage/cards/')&&asset.path.endsWith('-backstage-api-test.png'))fs.unlinkSync(asset.path);}
