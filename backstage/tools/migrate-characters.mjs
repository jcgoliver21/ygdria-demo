import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backstageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=path.join(backstageRoot,'data','content.json');
const content=JSON.parse(fs.readFileSync(file,'utf8'));
if(Array.isArray(content.characters)&&content.characters.length){ console.log('Catálogo de personagens já existe; migração ignorada.'); process.exit(0); }

const definitions=[
  ['luz','Galatéia','luz','DIVINA','assets/cards/galateia-card.png','luz'],
  ['humanos','Berenice','humanos','DIVINA','assets/cards/berenice-card.png','humanos'],
  ['agua','Maril','agua','DIVINA','assets/cards/maril-card.png','agua'],
  ['fogo','Lucius','fogo','DIVINA','assets/cards/lucius-card.png','fogo'],
  ['natureza','Ninfa Queen','natureza','DIVINA','assets/cards/ninfa-queen-card.png','natureza'],
  ['terra','Kallendra','terra','DIVINA','assets/cards/kallendra-card.png','terra'],
  ['areia','Rashid','areia','DIVINA','assets/cards/rashid-card.png','areia'],
  ['sombras','Berenice das Sombras','sombras','DIVINA','assets/cards/berenice-sombras-card.png','sombras'],
  ['raio','Mardogear','raio','DIVINA','assets/cards/mardogear-card.png','raio'],
  ['vento','Sophitia','vento','DIVINA','assets/cards/sophitia-card.png','vento'],
  ['chuvas','Regnar','chuvas','DIVINA','assets/cards/regnar-card.png','chuvas'],
  ['gelo','Blizzardo','gelo','DIVINA','assets/cards/blizzardo-card.png','gelo'],
  ['gareth','Gareth','humanos','NORMAL','assets/cards/enemies/gareth-card.png','gareth'],
  ['cedric','Cedric','humanos','RARO','assets/cards/enemies/cedric-card.png','cedric'],
  ['elizier','Elizier','humanos','RARO','assets/cards/enemies/elizier-card.png','elizier'],
  ['roland','Roland','humanos','RARO','assets/cards/enemies/roland-card.png','roland'],
  ['berenice-jovem','Berenice (Jovem)','humanos','NORMAL','assets/cards/berenice-jovem-card.webp','berenice-jovem'],
  ['galateia-jovem','Galatéia (Jovem)','luz','NORMAL','assets/cards/galateia-jovem-card.webp','galateia-jovem'],
  ['adriel-jovem','Adriel (Jovem)','humanos','NORMAL','assets/cards/adriel-jovem-card.webp','adriel-jovem'],
  ['acqua-jovem','Acqua (Jovem)','agua','NORMAL','assets/cards/acqua-jovem-card.webp','acqua-jovem'],
  ['jules','Jules','humanos','SUPER RARO','assets/cards/enemies/jules-card.png','jules'],
  ['kalander','Kalander','humanos','SUPER RARO','assets/cards/enemies/kalander-card.png','kalander'],
  ['bernyce','Bernyce','humanos','SUPER RARO','assets/cards/enemies/bernyce-card.png','bernyce'],
  ['julius','Julius','sombras','ULTRA RARO','assets/cards/enemies/julius-card.png','julius']
];
const action=(folder,name,grid)=>({src:`assets/characters/runtime-v10/${folder}/${name}-${grid}.png`,cols:Number(grid[0]),rows:Number(grid[2]),frames:Number(grid[0])*Number(grid[2]),fps:name==='idle'?7:12,enabled:false});
content.characters=definitions.map(([id,name,realmId,rarity,card,folder])=>({
  id,name,realmId,rarity,card,cardThumb:card,
  sprites:{idle:action(folder,'idle','2x2'),attack:action(folder,'attack','3x2'),cast:action(folder,'cast','3x2'),hit:action(folder,'hit','2x2'),victory:action(folder,'victory','2x2'),defeat:{src:`assets/characters/runtime-v10/${folder}/defeat/processed/sheet-transparent.png`,cols:3,rows:2,frames:6,fps:10,enabled:false}}
}));
fs.writeFileSync(file,JSON.stringify(content,null,2)+'\n','utf8');
console.log(`Catálogo criado com ${content.characters.length} personagens.`);
