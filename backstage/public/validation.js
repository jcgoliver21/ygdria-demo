import {realmSlots,realmSlot} from './realm-slots.js';
export function inspectContent(c){
  const errors=[],warnings=[];
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
  if(!object(c)||c.schema!==1) return {errors:['Formato inválido: esperado projeto Backstage versão 1.'],warnings};
  for(const key of ['realms','characters','items','menus']) if(!Array.isArray(c[key])) errors.push(`Lista ausente: ${key}.`);
  if(errors.length) return {errors,warnings};
  for(const key of ['realms','characters','items','menus']){
    const ids=new Set();
    for(const row of c[key]){
      if(!object(row)){errors.push(`Registro inválido em ${key}.`);continue;}
      if(typeof row.id!=='string'||!/^[a-zA-Z0-9-]+$/.test(row.id)||ids.has(row.id)) errors.push(`ID vazio, inválido ou repetido em ${key}: ${row.id}.`);
      ids.add(row.id);
    }
  }
  if(errors.length) return {errors,warnings};
  const human=c.realms.find(r=>r.id==='humanos');
  if(!human||human.phases?.length!==10) errors.push('O jogo exige exatamente dez fases no Reino dos Humanos.');
  const slots=new Set();
  const playableHeroes=new Set(['humanos','luz','agua','fogo','natureza','terra','areia','sombras','raio','vento','chuvas','gelo','adriel-jovem','acqua-jovem','galateia-jovem','berenice-jovem','gareth','cedric','elizier','roland','jules','kalander','bernyce','julius']);
  const enemies=new Set([...playableHeroes,'slimeCereja','loboRaivoso','soldado1','soldado2','capitao','vulto','espectro','morto','soldBib1','soldBib2','soldBib3','infantaria','cavalaria','comandante','trono']);
  for(const r of c.realms){
    const slot=r.mapSlot||realmSlot(r.id);
    if(r.id==='humanos'&&slot!=='humanos')errors.push('O Reino dos Humanos deve manter seu espaço original no mapa.');
    if(!realmSlots.some(([id])=>id===slot))errors.push(`${r.name}: escolha um dos doze espaços do mapa.`);
    if(slots.has(slot))errors.push(`O espaço ${slot} já pertence a outro reino.`);slots.add(slot);
    if(!Array.isArray(r.phases)){errors.push(`${r.name}: lista de fases inválida.`);continue;}
    const nums=new Set();
    for(const p of r.phases){
      if(!object(p)||!Number.isInteger(p.number)||p.number<1||nums.has(p.number)){errors.push(`${r.name}: número de fase inválido ou repetido.`);continue;}
      nums.add(p.number);
      if(!p.name) errors.push(`${r.name}: fase sem nome.`);
      if(!Array.isArray(p.missions)||!Array.isArray(p.after)||!Array.isArray(p.allowed)||!Array.isArray(p.fixed)||!Array.isArray(p.bosses)){errors.push(`${r.name}/${p.number}: listas da fase inválidas.`);continue;}
      if(!p.before) warnings.push(`${r.name} / ${p.name}: escreva a abertura para contextualizar a missão.`);
      if(r.id!=='humanos'&&r.mapEnabled!==false&&(r.mapEnabled===true||r.status==='published')){
        if(p.missions.length!==5)errors.push(`${p.name}: a campanha usa cinco missões por fase.`);
        if(!p.background)errors.push(`${p.name}: anexe o cenário para habilitar esta fase.`);
        if(new Set(p.allowed).size<4||p.fixed.length>4||p.fixed.some(id=>!p.allowed.includes(id)))errors.push(`${p.name}: escolha pelo menos quatro heróis permitidos e até quatro obrigatórios dentre eles.`);
        if(p.allowed.some(id=>!playableHeroes.has(id)))errors.push(`${p.name}: há heróis ainda não integrados ao combate.`);
        if(p.missions.some(m=>!m?.enemies?.length))errors.push(`${p.name}: todas as missões precisam de inimigos.`);
        if(p.missions.some(m=>Array.isArray(m?.enemies)&&m.enemies.some(id=>!enemies.has(id))))errors.push(`${p.name}: há inimigos não reconhecidos pelo jogo.`);
      }
      const missions=new Set();
      for(const m of p.missions){
        if(!object(m)||!Number.isInteger(m.number)||m.number<1||missions.has(m.number)||!Array.isArray(m.lines)||!Array.isArray(m.enemies)){errors.push(`${r.name}/${p.number}: missão inválida ou repetida.`);continue;}
        missions.add(m.number);
        if(!m.enemies.length) warnings.push(`${p.name}, missão ${m.number}: escolha os inimigos.`);
        if(m.lines.some(l=>!object(l)||typeof l.text!=='string')) errors.push(`${p.name}: fala inválida.`);
        else if(m.lines.some(l=>!l.text.trim())) warnings.push(`${p.name}, missão ${m.number}: há falas vazias.`);
      }
      if(p.after.some(l=>!object(l)||typeof l.text!=='string')) errors.push(`${p.name}: encerramento inválido.`);
    }
  }
  for(const item of c.items){
    if(!['humanos','luz'].includes(item.reino||'humanos'))errors.push(`${item.nome}: lojas jogáveis disponíveis: humanos e luz.`);
    if(!Number.isFinite(Number(item.preco))||Number(item.preco)<0) errors.push(`${item.nome}: preço inválido.`);
    const effect=item.effect||{};
    if(effect.type==='restartMission'&&item.id!=='bencao-eternidade')errors.push(`${item.nome}: reinício de missão é reservado à Benção da Eternidade.`);
    if(effect.type&&!['shuffle','royalShuffle','healPercent','attackMultiplier','restartMission'].includes(effect.type)) errors.push(`${item.nome}: efeito não suportado.`);
    if(effect.type==='healPercent'&&(!Number.isFinite(Number(effect.value))||effect.value<=0||effect.value>1)) errors.push(`${item.nome}: cura deve ser maior que 0 e no máximo 1 (100%).`);
    if(effect.type==='attackMultiplier'&&(!Number.isFinite(Number(effect.value))||effect.value<1||effect.value>10)) errors.push(`${item.nome}: multiplicador deve estar entre 1 e 10.`);
    for(const key of ['powerUps','colorBombs']) if(effect[key]!==undefined&&(!Number.isInteger(Number(effect[key]))||effect[key]<0||effect[key]>10)) errors.push(`${item.nome}: ${key} deve estar entre 0 e 10.`);
  }
  for(const id of ['regulacao','regulacao-bernyce','flor-cerejeira','espadas-lendarias','bencao-eternidade','elixir-divino','luz-protetora','lanca-divina','espelho-ygdria','esperanca'])if(!c.items.some(i=>i.id===id))errors.push(`O item integrado ${id} é usado por recompensas ou regras do jogo. Desmarque Exibir na loja para ocultá-lo.`);
  for(const ch of c.characters){
    if(!ch.card) warnings.push(`${ch.name}: falta a ilustração da carta.`);
    for(const [name,s] of Object.entries(ch.sprites||{})) if(s?.enabled){
      if(!s.src||![s.cols,s.rows,s.frames].every(v=>Number.isInteger(Number(v))&&v>0)||s.cols>32||s.rows>32||s.frames>s.cols*s.rows||!Number.isFinite(Number(s.fps))||s.fps<1||s.fps>60) errors.push(`${ch.name}/${name}: verifique arquivo, grade, quadros e FPS (1–60).`);
    }
  }
  const walk=(x)=>{if(!object(x)&&!Array.isArray(x))return;for(const [k,v]of Object.entries(x)){if(['__proto__','prototype','constructor'].includes(k))errors.push('Chave de objeto não permitida.');if(['src','card','cardThumb','background','music','image'].includes(k)&&v&&(!/^assets\/[a-zA-Z0-9_./ -]+$/.test(v)||v.includes('..'))) errors.push(`Caminho de mídia inválido: ${String(v).slice(0,100)}.`);if(typeof v==='object')walk(v);}};walk(c);
  return {errors:[...new Set(errors)],warnings:[...new Set(warnings)]};
}
