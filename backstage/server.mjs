import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { compileContent,validateContent } from './tools/compile-content.mjs';

const backstageRoot=path.dirname(fileURLToPath(import.meta.url));
const projectRoot=path.resolve(backstageRoot,'..');
const publicRoot=path.join(backstageRoot,'public');
const dataFile=path.join(backstageRoot,'data','content.json');
const port=Number(process.env.YGDRIA_BACKSTAGE_PORT||4399);
const host=process.env.YGDRIA_BACKSTAGE_HOST||'0.0.0.0';
const accessToken=process.env.YGDRIA_BACKSTAGE_TOKEN||crypto.randomBytes(12).toString('hex');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'};

function send(res,status,data,type='application/json; charset=utf-8'){
  const body=Buffer.isBuffer(data)?data:typeof data==='string'?data:JSON.stringify(data);
  res.writeHead(status,{'Content-Type':type,'Content-Length':Buffer.byteLength(body),'Cache-Control':'no-store'}); res.end(body);
}
async function bodyJson(req){
  const chunks=[]; let size=0;
  for await(const chunk of req){ size+=chunk.length; if(size>30_000_000) throw new Error('Conteúdo maior que 30 MB.'); chunks.push(chunk); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
function readContent(){ return JSON.parse(fs.readFileSync(dataFile,'utf8')); }
function run(command,args){
  const result=spawnSync(command,args,{cwd:projectRoot,encoding:'utf8',shell:false,timeout:120000});
  return {ok:result.status===0,status:result.status,output:[result.stdout,result.stderr].filter(Boolean).join('\n').trim()};
}
function isLoopback(req){ return ['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress); }
function authorized(req){ return isLoopback(req)||req.headers['x-backstage-token']===accessToken; }
function releaseChecks(content){
  const compiled=compileContent(content);
  if(!compiled.ok) return {ok:false,compiled};
  const syntax=run(process.execPath,['--check','game-v10.js']);
  const contracts=syntax.ok?run(process.execPath,['tests/v10-contracts.mjs']):{ok:false,output:'Não executado.'};
  const assets=contracts.ok?run(process.execPath,['tests/v10-assets.mjs']):{ok:false,output:'Não executado.'};
  return {ok:syntax.ok&&contracts.ok&&assets.ok,compiled,checks:{syntax,contracts,assets}};
}
function validationReport(content){
  const errors=validateContent(content); const warnings=[];
  for(const realm of content.realms||[]){
    for(const phase of realm.phases||[]){
      if(!phase.subtitle) warnings.push(`${realm.name}: fase ${phase.number} sem subtítulo.`);
      if(!(phase.bosses||[]).length) warnings.push(`${realm.name}: fase ${phase.number} sem chefe.`);
      if(!phase.before) warnings.push(`${realm.name}: fase ${phase.number} sem narração inicial.`);
    }
  }
  return {ok:!errors.length,errors,warnings};
}
function listAssets(dir=path.join(projectRoot,'assets','backstage')){
  if(!fs.existsSync(dir)) return [];
  const files=[];
  const walk=current=>fs.readdirSync(current,{withFileTypes:true}).forEach(entry=>{
    const full=path.join(current,entry.name);
    if(entry.isDirectory()) walk(full);
    else files.push({path:path.relative(projectRoot,full).replaceAll('\\','/'),name:entry.name,size:fs.statSync(full).size});
  });
  walk(dir); return files.sort((a,b)=>a.path.localeCompare(b.path));
}

const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    if(!['GET','HEAD'].includes(req.method)&&req.headers.origin){
      const origin=new URL(req.headers.origin);
      if(origin.host!==req.headers.host)return send(res,403,{error:'Origem não autorizada.'});
    }
    if(url.pathname.startsWith('/api/')&&!authorized(req)) return send(res,401,{ok:false,error:'Acesso local não autorizado. Use o endereço completo mostrado pelo servidor.'});
    if(url.pathname==='/api/content'&&req.method==='GET') return send(res,200,readContent());
    if(url.pathname==='/api/assets'&&req.method==='GET') return send(res,200,{ok:true,assets:listAssets()});
    if(url.pathname==='/api/assets'&&req.method==='POST'){
      const upload=await bodyJson(req);
      const category=['images','audio','cards','sprites','other'].includes(upload.category)?upload.category:'other';
      const safeName=path.basename(String(upload.name||'arquivo')).replace(/[^a-zA-Z0-9._-]+/g,'-');
      const extension=path.extname(safeName).toLowerCase();
      const allowed=new Set(['.png','.jpg','.jpeg','.webp','.gif','.mp3','.ogg','.wav']);
      if(!allowed.has(extension)) return send(res,415,{ok:false,error:'Formato não permitido. Use PNG, JPG, WEBP, GIF, SVG, MP3, OGG ou WAV.'});
      const match=String(upload.data||'').match(/^data:[^;]+;base64,(.+)$/);
      if(!match) return send(res,400,{ok:false,error:'Arquivo inválido.'});
      const targetDir=path.join(projectRoot,'assets','backstage',category); fs.mkdirSync(targetDir,{recursive:true});
      const target=path.join(targetDir,`${Date.now()}-${crypto.randomBytes(3).toString('hex')}-${safeName}`); fs.writeFileSync(target,Buffer.from(match[1],'base64'));
      return send(res,201,{ok:true,asset:{path:path.relative(projectRoot,target).replaceAll('\\','/'),name:path.basename(target),size:fs.statSync(target).size}});
    }
    if(url.pathname==='/api/content'&&req.method==='PUT'){
      const content=await bodyJson(req); content.updatedAt=new Date().toISOString(); const report=validationReport(content);
      if(!report.ok) return send(res,422,report);
      const compiled=compileContent(content); return send(res,compiled.ok?200:422,{...compiled,warnings:report.warnings});
    }
    if(url.pathname==='/api/validate'&&req.method==='POST'){
      const content=await bodyJson(req); return send(res,200,validationReport(content));
    }
    if(url.pathname==='/api/prepare-release'&&req.method==='POST'){
      const content=await bodyJson(req); content.updatedAt=new Date().toISOString(); const release=releaseChecks(content);
      if(!release.compiled.ok) return send(res,422,release.compiled);
      const git=run('git',['status','--short','--','backstage','backstage-content-v1.js','humanos-lore-v10.js','game-v10.js','play.html','package.json']);
      return send(res,200,{ok:release.ok,compiled:release.compiled.summary,checks:release.checks,git});
    }
    if(url.pathname==='/api/publish'&&req.method==='POST'){
      const request=await bodyJson(req);
      if(request.confirm!==true) return send(res,400,{ok:false,error:'Confirmação de publicação ausente.'});
      const content=request.content; content.updatedAt=new Date().toISOString(); const release=releaseChecks(content);
      if(!release.ok) return send(res,422,{ok:false,error:'A publicação foi interrompida porque os testes falharam.',checks:release.checks,compiled:release.compiled});
      const fetchMain=run('git',['fetch','origin','main']);
      if(!fetchMain.ok) return send(res,409,{ok:false,error:'Não foi possível atualizar a referência de produção.',details:fetchMain.output});
      const fastForward=run('git',['merge-base','--is-ancestor','origin/main','HEAD']);
      if(!fastForward.ok) return send(res,409,{ok:false,error:'A cópia local não parte da versão atual de produção. Atualize ou use o checkout de publicação antes de tentar novamente.'});
      const allowed=['backstage','assets/backstage','backstage-content-v1.js','humanos-lore-v10.js','game-v10.js','play.html','package.json','.gitignore'];
      const add=run('git',['add','--',...allowed.filter(p=>fs.existsSync(path.join(projectRoot,p)))]);
      if(!add.ok) return send(res,500,{ok:false,error:'Não foi possível preparar os arquivos.',details:add.output});
      const staged=run('git',['diff','--cached','--name-only']);
      const stagedFiles=staged.output.split(/\r?\n/).filter(Boolean);
      const unexpected=stagedFiles.filter(file=>!allowed.some(entry=>file===entry||file.startsWith(entry+'/')));
      if(unexpected.length) return send(res,409,{ok:false,error:`Arquivos inesperados foram bloqueados: ${unexpected.join(', ')}`});
      if(!stagedFiles.length) return send(res,200,{ok:true,published:false,message:'Não existem alterações novas para publicar.'});
      const rawMessage=String(request.message||'content: atualizar via Ygdria Backstage').replace(/[\r\n]+/g,' ').trim().slice(0,100);
      const commit=run('git',['commit','-m',rawMessage||'content: atualizar via Ygdria Backstage']);
      if(!commit.ok) return send(res,500,{ok:false,error:'Não foi possível criar a versão local.',details:commit.output});
      const push=run('git',['push','origin','HEAD:main']);
      if(!push.ok) return send(res,502,{ok:false,error:'A versão foi criada localmente, mas o envio ao GitHub falhou.',details:push.output});
      const revision=run('git',['rev-parse','--short','HEAD']);
      return send(res,200,{ok:true,published:true,revision:revision.output,files:stagedFiles,message:'Versão enviada. O GitHub Pages iniciará a publicação e os testes online.'});
    }
    if(url.pathname==='/api/info'&&req.method==='GET'){
      const addresses=[]; for(const rows of Object.values(os.networkInterfaces())) for(const row of rows||[]) if(row.family==='IPv4'&&!row.internal) addresses.push(`http://${row.address}:${port}`);
      return send(res,200,{name:'Ygdria Backstage',port,local:`http://localhost:${port}`,network:addresses,projectRoot});
    }
    if(url.pathname==='/game-preview') { res.writeHead(302,{Location:'/project/play.html?qa=1'}); return res.end(); }
    if(url.pathname.startsWith('/project/')){
      const relative=decodeURIComponent(url.pathname.slice('/project/'.length));
      if(relative.split(/[\\/]/).some(part=>part.startsWith('.'))||!(/^(assets\/|backstage-content-v1\.js$)/.test(relative)||(!relative.includes('/')&&/\.(html|js|css|webmanifest)$/.test(relative))))return send(res,403,'Arquivo privado.','text/plain');
      const file=path.resolve(projectRoot,relative);
      if(!file.startsWith(projectRoot+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) return send(res,404,'Não encontrado.','text/plain; charset=utf-8');
      return send(res,200,fs.readFileSync(file),mime[path.extname(file).toLowerCase()]||'application/octet-stream');
    }
    const requested=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1));
    const file=path.resolve(publicRoot,requested);
    if(!file.startsWith(publicRoot+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) return send(res,404,'Não encontrado.','text/plain; charset=utf-8');
    return send(res,200,fs.readFileSync(file),mime[path.extname(file).toLowerCase()]||'application/octet-stream');
  }catch(error){ return send(res,500,{ok:false,error:error.message}); }
});

server.listen(port,host,()=>{
  const nets=[]; for(const rows of Object.values(os.networkInterfaces())) for(const row of rows||[]) if(row.family==='IPv4'&&!row.internal) nets.push(`http://${row.address}:${port}`);
  console.log(`Ygdria Backstage: http://localhost:${port}`);
  if(nets.length) console.log(`Celular na mesma rede: ${nets.map(url=>`${url}/?token=${accessToken}`).join('  ')}`);
});
