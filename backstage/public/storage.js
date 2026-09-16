import {inspectContent} from './validation.js';
export const portable=location.pathname.includes('/backstage/public/');
const prefix='ygdria_backstage_v2_';
export const projectBase=new URL('../../',import.meta.url);
export function readLocal(key,fallback){try{return JSON.parse(localStorage.getItem(prefix+key))??fallback;}catch{return fallback;}}
export function writeLocal(key,value){localStorage.setItem(prefix+key,JSON.stringify(value));}
export function assetUrl(src){
  const asset=readLocal('assets',[]).find(a=>a.path===src);
  return portable?(asset?.data||new URL(src,projectBase).href):'/project/'+src;
}
export async function portableFetch(url,options={}){
  const method=options.method||'GET',body=options.body?JSON.parse(options.body):null;
  const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
  if(url==='/api/content'){
    if(method==='GET')return response(readLocal('content',null)||await fetch(new URL('../data/content.json',import.meta.url)).then(r=>r.json()));
    const report=inspectContent(body);if(report.errors.length)return response(report,422);
    writeLocal('content',body);return response({ok:true,summary:{updatedAt:new Date().toISOString()}});
  }
  if(url==='/api/assets'){
    const assets=readLocal('assets',[]);
    if(method==='GET')return response({assets});
    if(!/\.(png|jpe?g|webp|gif|mp3|ogg|wav)$/i.test(body.name)) return response({error:'Use PNG, JPG, WEBP, GIF, MP3, OGG ou WAV.'},415);
    const asset={name:body.name.replace(/[^a-zA-Z0-9._-]/g,'-'),path:`assets/backstage/${body.category}/${Date.now()}-${body.name.replace(/[^a-zA-Z0-9._-]/g,'-')}`,data:body.data,size:Math.round(body.data.length*.75)};
    try{writeLocal('assets',[...assets,asset]);}catch{return response({error:'Espaço do navegador insuficiente. Exporte um backup e envie arquivos maiores pelo painel local.'},413);}
    return response({asset},201);
  }
  if(url==='/api/validate')return response(inspectContent(body));
  return response({error:'Esta operação exige o painel local.'},400);
}
