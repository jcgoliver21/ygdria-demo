import {portable,portableFetch,projectBase} from './storage.js';
import {installStudio,studioView,enhance,snapshot} from './studio.js';
const app=document.querySelector('#app');
const saveBtn=document.querySelector('#saveBtn');
const saveState=document.querySelector('#saveState');
const toast=document.querySelector('#toast');
let state=null,view='dashboard',selectedRealm=0,dirty=false,characterSearch='';
let mediaAssets=[];
const accessToken=new URLSearchParams(location.search).get('token')||localStorage.getItem('ygdria_backstage_token')||'';
if(accessToken) localStorage.setItem('ygdria_backstage_token',accessToken);
const apiFetch=(url,options={})=>portable?portableFetch(url,options):fetch(url,{...options,headers:{'Content-Type':'application/json',...(options.headers||{}),...(accessToken?{'X-Backstage-Token':accessToken}:{})}});
const clone=value=>structuredClone(value);
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const slug=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function showToast(message){ toast.textContent=message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2200); }
function setDirty(value=true){ dirty=value; saveState.textContent=value?'Alterações não salvas':portable?'Salvo neste navegador':'Salvo no projeto'; saveState.style.color=value?'#f1d58c':'#75d69d'; if(value&&state) try{localStorage.setItem('ygdria_backstage_draft',JSON.stringify(state));}catch{saveState.textContent='Espaço insuficiente — exporte um backup';} }
function getPath(path){ return path.split('.').reduce((value,key)=>value?.[key],state); }
function setPath(path,value){ const keys=path.split('.'); if(keys.some(k=>['__proto__','constructor','prototype'].includes(k)))return; const last=keys.pop(); const target=keys.reduce((item,key)=>item[key]??=( {} ),state); target[last]=value; setDirty(); }
function input(path,label,value,type='text',extra=''){
  const tag=type==='textarea'?'textarea':type==='select'?'select':'input';
  const attr=tag==='input'?`type="${type}" value="${esc(value)}"`:`${tag==='textarea'?`>${esc(value)}</textarea`:'>'}`;
  if(type==='textarea') return `<label class="field"><span>${label}</span><textarea data-path="${path}" ${extra}>${esc(value)}</textarea></label>`;
  return `<label class="field"><span>${label}</span><${tag} data-path="${path}" ${attr} ${extra}></${tag}></label>`;
}
function dashboard(){
  const phases=state.realms.reduce((n,realm)=>n+(realm.phases?.length||0),0);
  const dialogues=state.realms.reduce((total,realm)=>total+(realm.phases||[]).reduce((p,phase)=>p+(phase.missions||[]).reduce((m,mission)=>m+(mission.lines?.length||0),0),0),0);
  return `<section class="hero"><h2>Controle o mundo de Ygdria</h2><p>Edite o conteúdo no celular ou computador. Tudo fica em arquivos locais do projeto, com validação antes de preparar uma publicação.</p><div class="actions"><button class="primary" data-view="realms">Editar reinos</button><button data-action="preview">Abrir prévia do jogo</button></div></section>
  <div class="grid metrics"><div class="metric"><b>${state.realms.length}</b><small>reinos</small></div><div class="metric"><b>${phases}</b><small>fases</small></div><div class="metric"><b>${dialogues}</b><small>falas</small></div><div class="metric"><b>${state.items.length}</b><small>itens</small></div></div>
  <div class="section-head"><div><h2>Atalhos</h2><p>Áreas que já podem ser administradas.</p></div></div><div class="grid realm-list">
  ${[['realms','♜','Campanhas','Fases, missões, inimigos e diálogos'],['characters','♟','Personagens e cartas','Cartas e sprites de todas as ações'],['items','◆','Itens e loja','Preço, raridade, descrição e efeito'],['menus','☰','Menus','Textos, dicas, ordem e visibilidade'],['media','▣','Biblioteca de mídia','Imagens, ilustrações, cenários e músicas'],['release','↑','Publicação','Validação, testes e arquivos alterados']].map(([id,icon,title,desc])=>`<button class="card" data-view="${id}" style="text-align:left"><h3>${icon} ${title}</h3><span class="realm-meta">${desc}</span></button>`).join('')}</div>`;
}
function realms(){
  const realm=state.realms[selectedRealm]||state.realms[0]; if(!realm) return '<div class="empty">Nenhum reino cadastrado.</div>';
  return `<div class="section-head"><div><h2>Reinos e campanhas</h2><p>Edite o Reino dos Humanos ou prepare campanhas futuras.</p></div><button data-action="add-realm">+ Reino</button></div>
  <div class="chips">${state.realms.map((item,index)=>`<button class="chip ${index===selectedRealm?'good':''}" data-realm="${index}">${esc(item.name)}</button>`).join('')}</div>
  <section class="card realm-card" style="--realm:${esc(realm.color)};margin-top:12px">
    <div class="form-grid three">${input(`realms.${selectedRealm}.name`,'Nome do reino',realm.name)}${input(`realms.${selectedRealm}.id`,'ID permanente',realm.id)}${input(`realms.${selectedRealm}.color`,'Cor',realm.color,'color')}</div>
    <div class="actions"><span class="chip">${realm.phases?.length||0} fases</span><span class="chip ${realm.status==='published'?'good':''}">${esc(realm.status||'draft')}</span><button class="small" data-action="add-phase">+ Fase</button>${realm.id!=='humanos'?'<button class="small danger" data-action="delete-realm">Excluir reino</button>':''}</div>
  </section>
  <div class="section-head"><div><h3>Fases</h3><p>Abra uma fase para editar missões e falas.</p></div></div>
  ${(realm.phases||[]).map((phase,phaseIndex)=>phaseEditor(realm,phase,phaseIndex)).join('')||'<div class="empty">Este reino ainda não possui fases.</div>'}`;
}
function lineEditor(base,line,lineIndex){
  return `<div class="dialogue">${input(`${base}.${lineIndex}.speaker`,'Quem fala',line.speaker)}${input(`${base}.${lineIndex}.heroId`,'ID do personagem',line.heroId||'')}${input(`${base}.${lineIndex}.text`,'Fala',line.text,'textarea')}<button class="danger small" data-action="delete-line" data-base="${base}" data-index="${lineIndex}">Excluir</button></div>`;
}
function phaseEditor(realm,phase,phaseIndex){
  const base=`realms.${selectedRealm}.phases.${phaseIndex}`;
  return `<details><summary>Fase ${phase.number} · ${esc(phase.name)} <small class="realm-meta">${phase.missions?.length||0} missões</small></summary><div class="details-body">
    <div class="form-grid two">${input(`${base}.number`,'Número',phase.number,'number')}${input(`${base}.name`,'Nome da fase',phase.name)}${input(`${base}.subtitle`,'Subtítulo',phase.subtitle||'')}${input(`${base}.bosses`,'Chefes separados por vírgula',(phase.bosses||[]).join(', '))}${input(`${base}.background`,'Imagem do cenário',phase.background||'')}${input(`${base}.music`,'Música da fase',phase.music||'')}${input(`${base}.visual.description`,'Efeito visual',phase.visual?.description||'Nada')}${input(`${base}.visual.key`,'Código do efeito',phase.visual?.key||'none')}</div>
    ${input(`${base}.before`,'Narração inicial',phase.before||'','textarea')}
    <div class="form-grid two">${input(`${base}.allowed`,'Personagens habilitados — IDs',(phase.allowed||[]).join(', '))}${input(`${base}.fixed`,'Personagens obrigatórios — IDs',(phase.fixed||[]).join(', '))}</div>
    <div class="section-head"><h3>Missões</h3><button class="small" data-action="add-mission" data-phase="${phaseIndex}">+ Missão</button></div>
    ${(phase.missions||[]).map((mission,missionIndex)=>missionEditor(base,mission,missionIndex,phaseIndex)).join('')}
    <div class="section-head"><h3>Encerramento</h3><button class="small" data-action="add-after" data-phase="${phaseIndex}">+ Fala final</button></div>
    ${(phase.after||[]).map((line,index)=>lineEditor(`${base}.after`,line,index)).join('')||'<p class="realm-meta">Sem falas finais.</p>'}
    <div class="actions"><button class="danger small" data-action="delete-phase" data-phase="${phaseIndex}">Excluir fase</button></div>
  </div></details>`;
}
function missionEditor(base,mission,missionIndex,phaseIndex){
  const path=`${base}.missions.${missionIndex}`;
  return `<div class="mission"><div class="mission-head"><b>Missão ${mission.number}</b><button class="small" data-action="add-line" data-base="${path}.lines">+ Fala</button><button class="small danger" data-action="delete-mission" data-phase="${phaseIndex}" data-index="${missionIndex}">Excluir</button></div>
  <div class="form-grid two">${input(`${path}.number`,'Número',mission.number,'number')}${input(`${path}.title`,'Título / composição',mission.title||'')}${input(`${path}.enemies`,'Inimigos — IDs separados por vírgula',(mission.enemies||[]).join(', '))}</div>
  ${(mission.lines||[]).map((line,index)=>lineEditor(`${path}.lines`,line,index)).join('')||'<p class="realm-meta">Sem falas nesta missão.</p>'}</div>`;
}
function items(){
  return `<div class="section-head"><div><h2>Itens e Loja Real</h2><p>Novos itens podem reutilizar efeitos já suportados pelo jogo.</p></div><button data-action="add-item">+ Item</button></div><div class="notice warn">O ID é permanente. Para um efeito totalmente novo ainda será necessário implementar a mecânica uma vez; depois seus valores poderão ser editados aqui.</div><div class="grid item-list" style="margin-top:12px">${state.items.map((item,index)=>`<section class="card item-row"><div class="form-grid two">${input(`items.${index}.nome`,'Nome',item.nome)}${input(`items.${index}.id`,'ID',item.id)}${input(`items.${index}.raridade`,'Raridade',item.raridade||'Comum')}${input(`items.${index}.preco`,'Preço',item.preco,'number')}${input(`items.${index}.reino`,'Loja do reino — humanos ou luz',item.reino||'humanos')}${input(`items.${index}.uso`,'Uso',item.uso||'batalha')}${input(`items.${index}.icon`,'Ícone cadastrado',item.icon||'')}${input(`items.${index}.image`,'Imagem personalizada',item.image||'')}</div>${input(`items.${index}.desc`,'Descrição',item.desc||'','textarea')}<div class="form-grid two">${input(`items.${index}.effect.type`,'Tipo de efeito',item.effect?.type||'')}${input(`items.${index}.effect.value`,'Valor principal',item.effect?.value??'','number','step="0.01"')}</div><div class="actions"><button class="danger small" data-action="delete-item" data-index="${index}">Excluir item</button></div></section>`).join('')}</div>`;
}
function menus(){
  return `<div class="section-head"><div><h2>Menus do jogo</h2><p>Altere títulos, dicas, ordem e visibilidade no menu principal.</p></div></div><div class="grid">${state.menus.sort((a,b)=>a.order-b.order).map((entry,index)=>`<section class="card menu-row"><label class="toggle"><input type="checkbox" data-path="menus.${index}.visible" ${entry.visible!==false?'checked':''}><span>Exibir</span></label>${input(`menus.${index}.label`,'Título',entry.label)}${input(`menus.${index}.hint`,'Texto auxiliar',entry.hint||'','','class="wide"')}${input(`menus.${index}.order`,'Ordem',entry.order,'number')}</section>`).join('')}</div>`;
}
function spriteEditor(characterIndex,actionName,label){
  const action=state.characters[characterIndex].sprites?.[actionName]||{}; const base=`characters.${characterIndex}.sprites.${actionName}`;
  return `<details><summary>${label} ${action.src?'<small class="realm-meta">arquivo selecionado</small>':''}</summary><div class="details-body">${input(`${base}.src`,'Caminho da folha',action.src||'')}<label class="field"><span>Subir nova folha</span><input type="file" accept="image/png,image/webp,image/gif" data-character-upload="${characterIndex}" data-slot="${actionName}"></label><div class="form-grid three">${input(`${base}.cols`,'Colunas',action.cols||2,'number')}${input(`${base}.rows`,'Linhas',action.rows||2,'number')}${input(`${base}.frames`,'Quadros',action.frames||4,'number')}${input(`${base}.fps`,'Velocidade FPS',action.fps||10,'number')}</div><label class="toggle"><input type="checkbox" data-path="${base}.enabled" ${action.enabled===true?'checked':''}><span>Ativar esta folha no jogo após salvar</span></label></div></details>`;
}
function characters(){
  state.characters??=[]; const search=characterSearch.toLowerCase();
  const rows=state.characters.map((character,index)=>({character,index})).filter(({character})=>!search||`${character.name} ${character.id} ${character.realmId}`.toLowerCase().includes(search));
  return `<div class="section-head"><div><h2>Personagens e cartas</h2><p>Catálogo com carta e folhas de animação por ação.</p></div><button data-action="add-character">+ Personagem</button></div><div class="notice warn">Uma folha nova só substitui a animação publicada quando “Ativar esta folha” estiver marcado. Informe corretamente colunas, linhas, quadros e velocidade.</div><label class="field" style="margin-top:12px"><span>Buscar personagem</span><input id="characterSearch" value="${esc(search)}" placeholder="Nome, ID ou reino"></label><div class="grid" style="margin-top:12px">${rows.map(({character,index})=>`<details class="card"><summary>${esc(character.name)} <small class="realm-meta">${esc(character.realmId)} · ${esc(character.rarity||'')}</small></summary><div class="details-body"><div class="form-grid three">${input(`characters.${index}.name`,'Nome',character.name)}${input(`characters.${index}.id`,'ID permanente',character.id)}${input(`characters.${index}.realmId`,'Reino — ID',character.realmId||'')}${input(`characters.${index}.rarity`,'Raridade',character.rarity||'')}</div><div class="form-grid two"><div>${character.card?`<img src="/project/${esc(character.card)}" alt="Carta de ${esc(character.name)}" style="width:min(100%,220px);max-height:320px;object-fit:contain;border-radius:12px;background:#0b0910">`:''}</div><div>${input(`characters.${index}.card`,'Caminho da carta',character.card||'')}<label class="field"><span>Subir nova carta</span><input type="file" accept="image/png,image/jpeg,image/webp" data-character-upload="${index}" data-slot="card"></label></div></div><div class="section-head"><h3>Sprites</h3></div>${[['idle','Repouso'],['attack','Ataque'],['cast','Magia / conjuração'],['hit','Dano recebido'],['victory','Vitória'],['defeat','Derrota']].map(([action,label])=>spriteEditor(index,action,label)).join('')}<div class="actions"><button class="danger small" data-action="delete-character" data-index="${index}">Excluir personagem</button></div></div></details>`).join('')||'<div class="empty">Nenhum personagem encontrado.</div>'}</div>`;
}
function media(){
  return `<div class="section-head"><div><h2>Biblioteca de mídia</h2><p>Envie imagens e músicas para a pasta local do jogo.</p></div></div><section class="card"><div class="form-grid two"><label class="field"><span>Arquivo</span><input id="mediaFile" type="file" accept="image/png,image/jpeg,image/webp,image/gif,audio/*"></label><label class="field"><span>Categoria</span><select id="mediaCategory"><option value="images">Imagens</option><option value="cards">Cartas</option><option value="sprites">Sprites</option><option value="audio">Áudio</option><option value="other">Outros</option></select></label></div><div class="actions"><button class="primary" data-action="upload-media">Enviar para o projeto</button></div></section><div class="section-head"><div><h3>Arquivos enviados</h3><p>Copie o caminho para usar em cenários, músicas ou itens.</p></div></div><div class="grid item-list">${mediaAssets.map(asset=>`<section class="card"><b>${esc(asset.name)}</b><p class="realm-meta">${Math.ceil(asset.size/1024)} KB</p><input value="${esc(asset.path)}" readonly><div class="actions"><button class="small" data-copy="${esc(asset.path)}">Copiar caminho</button></div></section>`).join('')||'<div class="empty">Nenhum arquivo enviado pelo Backstage.</div>'}</div>`;
}
function release(){
  return `<section class="hero"><h2>Preparar publicação</h2><p>Salva e compila o conteúdo, verifica a sintaxe, os contratos e os arquivos de mídia. O envio só acontece quando você usa o botão Publicar no site e confirma a operação.</p><div class="actions"><button class="primary" data-action="prepare-release">Validar e preparar</button><button data-action="preview">Abrir prévia</button><button data-action="publish">Publicar no site</button></div></section><div id="releaseResult" style="margin-top:14px"><div class="notice">Faça a validação quando terminar de editar. O relatório mostrará exatamente quais arquivos entrarão na versão.</div></div>`;
}
function render(){ if(!state) return; app.innerHTML=({dashboard,realms,characters,items,menus,media,release,studio:studioView}[view]||dashboard)(); enhance(view); document.querySelectorAll('.bottom-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view===view)); }
async function save(){
  snapshot(state,'Antes de salvar');
  saveBtn.disabled=true; saveState.textContent='Salvando…';
  try{ const response=await apiFetch('/api/content',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)}); const result=await response.json(); if(!response.ok) throw new Error((result.errors||[result.error]).join('\n')); state.updatedAt=result.summary?.updatedAt||new Date().toISOString(); localStorage.removeItem('ygdria_backstage_draft'); setDirty(false); showToast(portable?'Rascunho salvo neste navegador':'Conteúdo salvo e compilado'); }
  catch(error){ saveState.textContent='Erro ao salvar'; alert(error.message); }
  finally{ saveBtn.disabled=false; }
}
async function init(){
  const response=await apiFetch('/api/content'); const server=await response.json(); if(!response.ok) throw new Error(server.error||'Acesso negado.');
  const mediaResponse=await apiFetch('/api/assets'); if(mediaResponse.ok) mediaAssets=(await mediaResponse.json()).assets||[]; const draft=localStorage.getItem('ygdria_backstage_draft');
  if(draft&&confirm('Existe um rascunho local não salvo. Deseja recuperá-lo?')){ try{ state=JSON.parse(draft); setDirty(true); }catch{ state=server; } } else state=server;
  if(!dirty) setDirty(false); snapshot(state,'Ao abrir o projeto'); render();
}
document.addEventListener('input',event=>{
  const element=event.target;if(element.id==='characterSearch'){ characterSearch=element.value; render(); document.querySelector('#characterSearch')?.focus(); return; } if(!element.dataset.path) return; let value=element.type==='checkbox'?element.checked:element.value;
  if(element.type==='number'&&value!=='') value=Number(value);
  if(/\.(bosses|allowed|fixed|enemies)$/.test(element.dataset.path)) value=String(value).split(',').map(item=>item.trim()).filter(Boolean);
  setPath(element.dataset.path,value);
});
document.addEventListener('change',async event=>{
  const input=event.target.closest('[data-character-upload]'); if(!input) return;
  const file=input.files?.[0]; if(!file) return;
  const index=Number(input.dataset.characterUpload),slot=input.dataset.slot,character=state.characters[index];
  const data=await new Promise((resolve,reject)=>{ const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=reject; reader.readAsDataURL(file); });
  showToast('Enviando arquivo…'); input.disabled=true;
  const response=await apiFetch('/api/assets',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name,category:slot==='card'?'cards':'sprites',data})}); const result=await response.json();
  if(!response.ok){ input.disabled=false; alert(result.error||'Falha no envio.'); return; }
  mediaAssets.push(result.asset);
  if(slot==='card'){ character.card=result.asset.path; character.cardThumb=result.asset.path; }
  else{
    character.sprites??={}; character.sprites[slot]??={}; character.sprites[slot].src=result.asset.path; character.sprites[slot].enabled=false;
    const grid=file.name.match(/(\d+)x(\d+)/i); if(grid){ character.sprites[slot].cols=Number(grid[1]); character.sprites[slot].rows=Number(grid[2]); character.sprites[slot].frames=Number(grid[1])*Number(grid[2]); }
  }
  setDirty(); render(); showToast('Arquivo vinculado ao personagem');
});
document.addEventListener('click',async event=>{
  const button=event.target.closest('button'); if(!button) return;
  if(button.dataset.view){ view=button.dataset.view; render(); return; }
  if(button.dataset.realm!==undefined){ selectedRealm=Number(button.dataset.realm); render(); return; }
  if(button.dataset.copy){ await navigator.clipboard.writeText(button.dataset.copy); showToast('Caminho copiado'); return; }
  const action=button.dataset.action;if(!action) return;
  const realm=state.realms[selectedRealm];
  if(action==='preview'){ if(dirty){showToast('Salve suas alterações antes de abrir a prévia');return;} window.open(portable?new URL('play.html',projectBase).href:'/game-preview','_blank'); if(portable)showToast('Abrindo o jogo publicado. Rascunhos só entram após publicação local.'); return; }
  if(action==='add-realm'){ const name=prompt('Nome do novo reino:','Reino da Luz'); if(!name)return; state.realms.push({id:slug(name),name,status:'draft',color:'#f2f4ff',phases:[]}); selectedRealm=state.realms.length-1; setDirty(); render(); }
  if(action==='delete-realm'&&confirm(`Excluir ${realm.name} do rascunho?`)){ state.realms.splice(selectedRealm,1); selectedRealm=Math.max(0,selectedRealm-1); setDirty(); render(); }
  if(action==='add-phase'){ const n=(realm.phases?.length||0)+1; realm.phases??=[]; realm.phases.push({number:n,name:`Nova fase ${n}`,subtitle:'',bosses:[],visual:{description:'Nada',key:'none'},before:'',allowed:[],fixed:[],missions:[1,2,3,4,5].map(number=>({number,title:`Missão ${number}`,enemies:[],lines:[]})),after:[],afterSceneCues:[]}); setDirty(); render(); }
  if(action==='delete-phase'&&confirm('Excluir esta fase?')){ realm.phases.splice(Number(button.dataset.phase),1); setDirty(); render(); }
  if(action==='add-mission'){ const phase=realm.phases[Number(button.dataset.phase)]; phase.missions.push({number:phase.missions.length+1,title:`Missão ${phase.missions.length+1}`,enemies:[],lines:[]}); setDirty(); render(); }
  if(action==='delete-mission'&&confirm('Excluir esta missão?')){ realm.phases[Number(button.dataset.phase)].missions.splice(Number(button.dataset.index),1); setDirty(); render(); }
  if(action==='add-line'){ getPath(button.dataset.base).push({speaker:'Narrador',heroId:'',text:''}); setDirty(); render(); }
  if(action==='delete-line'){ getPath(button.dataset.base).splice(Number(button.dataset.index),1); setDirty(); render(); }
  if(action==='add-after'){ realm.phases[Number(button.dataset.phase)].after.push({speaker:'Narrador',heroId:'',text:''}); setDirty(); render(); }
  if(action==='add-item'){ const id=`novo-item-${state.items.length+1}`; state.items.push({id,uso:'batalha',raridade:'Comum',nome:'Novo item',desc:'',preco:100,icon:'crystal',effect:{type:'healPercent',value:.1}}); setDirty(); render(); }
  if(action==='delete-item'&&confirm('Excluir este item?')){ state.items.splice(Number(button.dataset.index),1); setDirty(); render(); }
  if(action==='add-character'){ const name=prompt('Nome do personagem:','Novo personagem'); if(!name)return; const id=slug(name)||`personagem-${state.characters.length+1}`; state.characters.push({id,name,realmId:'humanos',rarity:'NORMAL',card:'',cardThumb:'',sprites:{}}); setDirty(); render(); }
  if(action==='delete-character'&&confirm('Excluir este personagem do catálogo?')){ state.characters.splice(Number(button.dataset.index),1); setDirty(); render(); }
  if(action==='upload-media'){
    const file=document.querySelector('#mediaFile')?.files?.[0]; if(!file){ showToast('Escolha um arquivo'); return; }
    const data=await new Promise((resolve,reject)=>{ const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=reject; reader.readAsDataURL(file); });
    button.disabled=true; const response=await apiFetch('/api/assets',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name,category:document.querySelector('#mediaCategory').value,data})}); const result=await response.json(); button.disabled=false;
    if(!response.ok){ alert(result.error||'Falha no envio.'); return; } mediaAssets.push(result.asset); render(); showToast('Arquivo adicionado ao projeto');
  }
  if(action==='prepare-release'){
    const box=document.querySelector('#releaseResult'); box.innerHTML='<div class="notice">Executando validações…</div>';
    const response=await apiFetch('/api/prepare-release',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)}); const result=await response.json();
    const output=[`RESULTADO: ${result.ok?'APROVADO':'REPROVADO'}`,result.errors?.join('\n')||'',result.compiled?`\nConteúdo: ${result.compiled.realms} reinos, ${result.compiled.phases} fases, ${result.compiled.items} itens.`:'',...Object.entries(result.checks||{}).map(([name,row])=>`\n[${row.ok?'OK':'ERRO'}] ${name}\n${row.output||''}`),`\n[ARQUIVOS]\n${result.git?.output||'Sem alterações detectadas.'}`].join('\n'); box.innerHTML=`<pre class="report">${esc(output)}</pre>`; if(result.ok){ state.updatedAt=result.compiled?.updatedAt||new Date().toISOString(); setDirty(false); }
  }
  if(action==='publish'){
    if(!confirm('Publicar os ajustes no site de Ygdria? O painel executará os testes, criará uma versão e enviará para o GitHub Pages.')) return;
    const message=prompt('Descrição curta desta publicação:','content: atualizar via Ygdria Backstage'); if(message===null) return;
    const box=document.querySelector('#releaseResult'); box.innerHTML='<div class="notice">Validando e enviando a versão…</div>';
    const response=await apiFetch('/api/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({confirm:true,message,content:state})}); const result=await response.json();
    const output=result.ok?`${result.message}\n${result.revision?`Revisão: ${result.revision}\n`:''}${(result.files||[]).join('\n')}`:`PUBLICAÇÃO INTERROMPIDA\n${result.error||''}\n${result.details||''}`;
    box.innerHTML=`<pre class="report">${esc(output)}</pre>`;
  }
});
installStudio({get:()=>state,replace:next=>{state=next;selectedRealm=0;setDirty();render();},realm:()=>selectedRealm,assets:()=>mediaAssets,fetch:apiFetch,refreshAssets:async()=>{mediaAssets=(await (await apiFetch('/api/assets')).json()).assets||[];},render,save,toast:showToast});
saveBtn.addEventListener('click',save);
window.addEventListener('beforeunload',event=>{ if(dirty){ event.preventDefault(); event.returnValue=''; } });
if(portable&&'serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
window.addEventListener('unhandledrejection',event=>{showToast('Falha na operação: '+event.reason?.message);saveBtn.disabled=false;});
init().catch(error=>{ app.innerHTML=`<div class="empty">Não foi possível abrir o Backstage: ${esc(error.message)}</div>`; });
