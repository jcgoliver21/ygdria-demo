import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backstageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projectRoot=path.resolve(backstageRoot,'..');
const target=path.join(backstageRoot,'data','content.json');
if(fs.existsSync(target)){ console.log('Conteúdo já existe; bootstrap ignorado.'); process.exit(0); }

const loreSource=fs.readFileSync(path.join(projectRoot,'humanos-lore-v10.js'),'utf8');
const payloadText=loreSource.match(/Object\.freeze\(([\s\S]*?)\);\s*\n\}\)/)?.[1];
if(!payloadText) throw new Error('Não foi possível ler o roteiro humano atual.');
const lore=JSON.parse(payloadText);

const menus=[
  ['playBtn','Jogar','',true],['continueBtn','Continuar','Sem progresso salvo',true],['galleryBtn','Galeria','Cartas e habilidades',true],
  ['dailyBtn','Desafio Diário','Seed do dia',true],['bossRushBtn','Desafio dos Chefes','Conquiste um reino para liberar',true],
  ['towerBtn','Torre de Acesso à Eternidade','Survivor no Pesadelo',true],['shopBtn','Loja','Consumíveis de batalha',true],
  ['achBtn','Conquistas','',true],['optionsBtn','Opções','',true],['helpBtn','Como jogar','',true]
].map(([id,label,hint,visible],order)=>({id,label,hint,visible,order}));

const items=[
  {id:'regulacao',uso:'batalha',raridade:'Comum',nome:'Cristais de Regulação',desc:'Embaralha o tabuleiro e cria 1 power-up aleatório.',preco:90,icon:'crystal',effect:{type:'shuffle',powerUps:1}},
  {id:'regulacao-bernyce',uso:'batalha',raridade:'Raro',nome:'Cristal de Regulação de Bernyce',desc:'Embaralha, cria 2 power-ups — incluindo 1 Estrela de Ygdria — e remove peças corrompidas.',preco:220,icon:'bernyce-crystal',effect:{type:'royalShuffle',powerUps:1,colorBombs:1,clearCorruption:true}},
  {id:'flor-cerejeira',uso:'batalha',raridade:'Incomum',nome:'Flor de Cerejeira',desc:'Recupera 25% da vida máxima do grupo.',preco:120,icon:'sakura',effect:{type:'healPercent',value:0.25}},
  {id:'espadas-lendarias',uso:'batalha',raridade:'Raro',nome:'Espadas do Guerreiro Lendário',desc:'Aumenta o ataque do grupo em 50% até o fim da missão.',preco:180,icon:'swords',effect:{type:'attackMultiplier',value:1.5}},
  {id:'bencao-eternidade',uso:'passiva',raridade:'Lendário',nome:'Benção da Eternidade',desc:'Mantida na mochila, libera um único reinício de missão ao ser consumida.',preco:300,icon:'eternity',effect:{type:'restartMission'}}
];

const content={
  schema:1,
  project:{name:'Ygdria — 12 Reinos',version:1},
  updatedAt:new Date().toISOString(),
  settings:{gameTitle:'Ygdria',versionLabel:'VERSÃO 11',previewPath:'/play.html?qa=1'},
  characters:[],
  menus,
  items,
  realms:[{id:'humanos',name:'Reino dos Humanos',status:'published',color:'#ff6fa5',phases:lore.phases}]
};
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,JSON.stringify(content,null,2)+'\n','utf8');
console.log(`Conteúdo inicial criado com ${lore.phases.length} fases humanas.`);
