import {portable,assetUrl,readLocal,writeLocal} from './storage.js';
import {inspectContent} from './validation.js';
let api,timer;
const safe=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function snapshot(state,label='Ponto de recuperação'){
  const rows=readLocal('history',[]);
  if(JSON.stringify(rows[0]?.content)===JSON.stringify(state))return;
  try{writeLocal('history',[{at:new Date().toISOString(),label,content:structuredClone(state)},...rows].slice(0,8));}catch{api?.toast('Histórico cheio. Exporte um backup para proteger seu trabalho.');}
}
export function studioView(){
  const c=api.get(),report=inspectContent(c),history=readLocal('history',[]);
  return `<section class="hero"><h2>Oficina e recuperação</h2><p>${portable?'Edição no navegador: os rascunhos ficam neste aparelho. Exporte o pacote e importe no painel local para publicar no jogo.':'Edição local: salve no projeto, teste a prévia e publique quando a validação passar.'}</p><div class="actions"><button data-studio="export" class="primary">Baixar pacote com mídias</button><button data-studio="checkpoint">Criar ponto de recuperação</button></div><label class="field" style="margin-top:16px"><span>Importar pacote ou conteúdo JSON</span><input id="importProject" type="file" accept=".json,application/json"></label></section>
  <section class="card" style="margin-top:16px"><h3>Checklist editorial</h3><p>${report.errors.length} impedimentos · ${report.warnings.length} sugestões</p>${[...report.errors.map(e=>'Erro: '+e),...report.warnings].map(e=>`<p class="realm-meta">${safe(e)}</p>`).join('')||'<p>Conteúdo consistente. Confira a prévia antes de publicar.</p>'}</section>
  <section class="card" style="margin-top:16px"><h3>Caderno de produção</h3><p class="realm-meta">Planeje os próximos reinos, arte, trilhas e balanceamento. Estas notas acompanham o pacote; não aparecem no jogo.</p><textarea data-path="editorNotes" placeholder="Pendências, ideias e decisões…">${safe(c.editorNotes||'')}</textarea><p class="realm-meta">Sugestões: apresente o conflito na abertura; ensine um inimigo por vez; aumente a dificuldade gradualmente; reserve uma mudança visual e musical para o chefe; encerre com uma consequência da vitória.</p></section>
  <div class="section-head"><h3>Histórico deste navegador</h3></div>${history.map((r,i)=>`<section class="card"><b>${safe(r.label)}</b><p>${safe(new Date(r.at).toLocaleString('pt-BR'))}</p><button data-studio="restore" data-index="${i}">Restaurar como rascunho</button></section>`).join('')||'<div class="empty">Salve ou crie um ponto para começar.</div>'}
  <section class="notice warn" style="margin-top:16px">O servidor local também guarda versões anteriores em backstage/backups. Backups do navegador não incluem automaticamente todos os arquivos originais do jogo. O pacote inclui os arquivos enviados pela biblioteca. Limpar os dados do navegador remove os rascunhos e o histórico. Contas online, ranking global e gastos de outros aparelhos exigem um serviço conectado.</section>`;
}
export function enhance(view){
  clearInterval(timer);
  const root=document.querySelector('#app');
  root.querySelectorAll('img[src^="/project/"]').forEach(img=>img.src=assetUrl(img.getAttribute('src').slice(9)));
  if(view==='dashboard'){
    root.insertAdjacentHTML('beforeend','<section class="card" style="margin-top:16px"><h3>Oficina de conteúdo</h3><p>Backup com mídias, histórico, checklist e caderno de produção.</p><button data-view="studio">Abrir oficina</button></section>');
  }
  if(view==='characters')for(const button of root.querySelectorAll('[data-action="delete-character"]'))button.insertAdjacentHTML('beforebegin',`<button data-studio="duplicate" data-kind="characters" data-index="${button.dataset.index}">Duplicar personagem</button>`);
  if(view==='items')for(const button of root.querySelectorAll('[data-action="delete-item"]'))button.insertAdjacentHTML('beforebegin',`<button data-studio="duplicate" data-kind="items" data-index="${button.dataset.index}">Duplicar item</button>`);
  if(view==='items'){
    for(const input of root.querySelectorAll('[data-path$=".effect.type"]')){
      const options=[['','Mecânica original do item'],['healPercent','Cura percentual (0,25 = 25%)'],['attackMultiplier','Multiplicador de ataque (1,5 = +50%)'],['shuffle','Embaralhar e criar poder'],['royalShuffle','Embaralhamento real'],['restartMission','Reinício — exclusivo da Benção']];
      const select=document.createElement('select');select.dataset.path=input.dataset.path;select.innerHTML=options.map(([v,label])=>`<option value="${v}" ${v===input.value?'selected':''}>${label}</option>`).join('');input.replaceWith(select);
    }
    for(const input of root.querySelectorAll('[data-path$=".preco"]')){
      const index=Number(input.dataset.path.split('.')[1]),item=api.get().items[index];
      input.closest('section').insertAdjacentHTML('afterbegin',`<label class="toggle"><input type="checkbox" data-path="items.${index}.visible" ${item.visible!==false?'checked':''}><span>Exibir na loja</span></label>`);
    }
  }
  if(view==='realms')for(const button of root.querySelectorAll('[data-action="delete-phase"]'))button.insertAdjacentHTML('beforebegin',`<button data-studio="duplicate-phase" data-index="${button.dataset.phase}">Duplicar fase</button>`);
  if(view==='characters')for(const input of root.querySelectorAll('[data-path$=".fps"]')){
    const base=input.dataset.path.replace(/\.fps$/,'');
    input.closest('.form-grid').insertAdjacentHTML('afterend',`<div class="actions"><button data-studio="animate" data-path="${base}">Prévia animada</button></div><canvas data-sprite="${base}" width="256" height="256" style="display:none;max-width:100%;background:repeating-conic-gradient(#25212d 0% 25%,#16121c 0% 50%) 0/24px 24px;border-radius:12px" aria-label="Prévia da animação"></canvas>`);
  }
  if(view==='media'){
    for(const button of root.querySelectorAll('[data-copy]')){
      const src=button.dataset.copy,url=safe(assetUrl(src));
      button.closest('section').insertAdjacentHTML('afterbegin',/\.(mp3|ogg|wav)$/i.test(src)?`<audio controls preload="none" src="${url}" style="width:100%"></audio>`:`<img src="${url}" alt="Prévia do arquivo" loading="lazy" style="width:100%;height:160px;object-fit:contain">`);
      const count=JSON.stringify(api.get()).split(src).length-1;
      button.closest('section').insertAdjacentHTML('beforeend',`<p class="realm-meta">${count} referência(s) no conteúdo</p>`);
    }
  }
  if(portable&&view==='release')root.innerHTML='<section class="hero"><h2>Preparar publicação</h2><p>Este painel web salva rascunhos no seu navegador. Para atualizar o jogo, baixe o pacote, importe no Backstage local e use Publicar no site. Credenciais do GitHub permanecem no computador.</p><div class="actions"><button class="primary" data-studio="export">Baixar pacote com mídias</button><button data-view="studio">Ver checklist</button></div></section>';
}
export function installStudio(callbacks){
  api=callbacks;
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();api.save();}});
  document.addEventListener('click',async event=>{
    const b=event.target.closest('[data-studio]');if(!b)return;
    try{
      const c=api.get(),action=b.dataset.studio;
      if(action==='checkpoint'){snapshot(c);api.render();api.toast('Ponto de recuperação criado');}
      if(action==='restore'){
        const selected=readLocal('history',[])[Number(b.dataset.index)];
        if(!confirm('Restaurar esta versão como rascunho? A versão atual terá um ponto de recuperação.'))return;
        snapshot(c,'Antes da restauração');api.replace(structuredClone(selected.content));
      }
      if(action==='duplicate'||action==='duplicate-phase'){
        snapshot(c,'Antes de duplicar');const list=action==='duplicate-phase'?c.realms[api.realm()].phases:c[b.dataset.kind];
        const row=structuredClone(list[Number(b.dataset.index)]);
        if(action==='duplicate-phase'){row.number=Math.max(0,...list.map(x=>x.number))+1;row.name+=' — cópia';}
        else{row.id+='-copia-'+Date.now().toString(36);if(row.name)row.name+=' — cópia';if(row.nome)row.nome+=' — cópia';}
        if(b.dataset.kind==='items'&&!row.effect?.type)row.effect={type:'healPercent',value:.25};
        list.push(row);api.replace(c);
      }
      if(action==='animate'){
        const s=b.dataset.path.split('.').reduce((o,k)=>o?.[k],c),canvas=b.parentElement.nextElementSibling;
        if(!s?.src||!s.cols||!s.rows||!s.frames||s.frames>s.cols*s.rows)throw new Error('Informe arquivo, grade e quadros antes da prévia.');
        clearInterval(timer);const img=new Image();img.src=assetUrl(s.src);await img.decode();
        if(img.width%s.cols||img.height%s.rows)throw new Error('A imagem não pode ser dividida igualmente pela grade informada.');
        canvas.style.display='block';const ctx=canvas.getContext('2d');let frame=0;
        const draw=()=>{const w=img.width/s.cols,h=img.height/s.rows,scale=Math.min(256/w,256/h);ctx.clearRect(0,0,256,256);ctx.drawImage(img,(frame%s.cols)*w,Math.floor(frame/s.cols)*h,w,h,(256-w*scale)/2,(256-h*scale)/2,w*scale,h*scale);frame=(frame+1)%s.frames;};draw();timer=setInterval(draw,1000/Math.max(1,Math.min(60,s.fps||10)));
      }
      if(action==='export'){
        b.disabled=true;
        const assets=[];for(const asset of api.assets()){
          const r=await fetch(assetUrl(asset.path));if(!r.ok)throw new Error(`Arquivo não encontrado: ${asset.path}`);
          const blob=await r.blob();const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});assets.push({...asset,data});
        }
        const blob=new Blob([JSON.stringify({format:'ygdria-backstage-package',version:1,content:c,assets},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
        const link=document.createElement('a');link.href=url;link.download=`ygdria-backstage-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);api.toast('Pacote exportado com as mídias enviadas');
      }
    }catch(e){alert(e.message);}finally{b.disabled=false;}
  });
  document.addEventListener('change',async event=>{
    if(event.target.id!=='importProject')return;
    try{
      const file=event.target.files[0];if(!file)return;if(file.size>100_000_000)throw new Error('Pacote maior que 100 MB.');
      const bundle=JSON.parse(await file.text()),next=bundle.format==='ygdria-backstage-package'?bundle.content:bundle;
      const report=inspectContent(next);if(report.errors.length)throw new Error(report.errors.join('\n'));
      if(!confirm(`Importar ${next.realms.length} reinos e ${next.characters.length} personagens como rascunho?`))return;
      snapshot(api.get(),'Antes da importação');
      let encoded=JSON.stringify(next);for(const asset of bundle.assets||[]){
        const response=await api.fetch('/api/assets',{method:'POST',body:JSON.stringify({name:asset.name,category:asset.path?.split('/')[2]||'other',data:asset.data})}),result=await response.json();
        if(!response.ok)throw new Error(result.error||'Falha ao importar mídia. Conteúdo anterior preservado.');
        encoded=encoded.split(JSON.stringify(asset.path)).join(JSON.stringify(result.asset.path));
      }
      await api.refreshAssets();api.replace(JSON.parse(encoded));api.toast('Importado como rascunho. Revise antes de salvar.');
    }catch(e){alert(e.message);}
  });
}
