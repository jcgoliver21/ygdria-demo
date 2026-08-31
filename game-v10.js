
/* ---------- Versão única do app (fonte da verdade) ---------- */
const V10 = window.YGDRIA_V10 || {};
const APP_VERSION = V10.version || 'v10';
const APP_VERSION_LABEL = V10.label || 'VERSÃO 11';
function animationAssetUrl(src){
  if(!src) return '';
  if(/^(?:data|blob):/i.test(src)) return src;
  return `${src}${src.includes('?')?'&':'?'}v=${encodeURIComponent(APP_VERSION)}`;
}
try {
  const _mv = document.getElementById('menuVersion');
  if (_mv) _mv.textContent = `${APP_VERSION_LABEL} · DEMO OFICIAL MOBILE`;
} catch (e) {}

const KINGDOMS = [
  {
    id:'luz', nome:'Galatéia', reino:'Reino da Luz', classe:'A Luz Divina de Ygdria · Rainha Maga',
    color:'#eef2f8', colorLight:'#ffffff', colorDark:'#78869b', gem:'gemDiamond', atk:20,
    img:'assets/cards/galateia-card.png', cardThumb:'assets/thumbs/galateia-card.webp',
    sprite:'assets/characters/runtime-v3/galateia/single-1.png', fxTheme:'radiant', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Fulgor Ofuscante', cd:4, tipo:'embaralharTudo', desc:'A cada 4 turnos, a luz ofusca e embaralha todo o tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'Corte de Luz', tipo:'nextAttackMult', valor:2, desc:'Dobra o dano do próximo ataque de Galatéia.'},
      {kind:'passive',gems:25, name:'Luz da Proteção', tipo:'blind', turnos:1, desc:'Cega todos os inimigos por uma rodada; o próximo ataque erra.'},
      {kind:'passive',gems:45, name:'Cura Divina', tipo:'healPercent', valor:.20, desc:'Recupera 20% da vida máxima do grupo.'},
      {kind:'active',gems:60, name:'Explosão de Luz', tipo:'damageAllFromLast', mult:3, desc:'Atinge todos os inimigos com três vezes o último ataque.'},
      {kind:'active',gems:75, name:'Luz Divina de Ygdria', tipo:'healPercent', valor:.30, desc:'Recupera 30% da vida máxima do grupo.'},
      {kind:'active',gems:100, name:'Por Toda a Luz do Universo', tipo:'damageAllPartySum', mult:2, desc:'Atinge todos os inimigos com o dobro da soma dos últimos ataques do grupo.'}
    ]
  },
  {
    id:'humanos', nome:'Berenice', reino:'Reino dos Humanos', classe:'A Maga da Eternidade · Rainha Maga',
    color:'#ff6fa5', colorLight:'#ffd7e8', colorDark:'#7c1f4b', gem:'gemPink', atk:20,
    img:'assets/cards/berenice-card.png', cardThumb:'assets/thumbs/berenice-card.webp',
    sprite:'assets/characters/runtime-v3/berenice/single-1.png', fxTheme:'chronal', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Decreto da Coroa', cd:4, tipo:'drenarTodosECurar', valor:6, curaMult:5, desc:'A cada 4 turnos, todos os heróis perdem 6 de energia e ela recupera 5× o total drenado.'},
    abilities:[
      {kind:'passive',gems:15, name:'Coração Piedoso', tipo:'shieldTurns', valor:360, turnos:2, desc:'Ergue um escudo de vida por dois turnos.'},
      {kind:'passive',gems:25, name:'Coração Puro', tipo:'echoAll', desc:'O dano do último ataque ecoa em todos os inimigos.'},
      {kind:'passive',gems:45, name:'Milagre', tipo:'healPercent', valor:.30, desc:'Recupera 30% da vida máxima do grupo.'},
      {kind:'active',gems:60, name:'Ataque das Fronteiras do Universo', tipo:'critBase', mult:5, desc:'Desfere um dano crítico igual a cinco vezes o ataque base.'},
      {kind:'active',gems:75, name:'Sempre Comigo', tipo:'activateAllUltimates', desc:'Carrega as três habilidades ativas de todos os aliados.'},
      {kind:'active',gems:100, name:'Por Toda Eternidade', tipo:'lifestealCharges', cargas:3, mult:5, desc:'Os próximos três ataques curam cinco vezes o valor de ataque.'}
    ]
  },
  {
    id:'agua', nome:'Maril', reino:'Reino da Água', classe:'Soberana dos Mares · Rainha Maga',
    color:'#174ea6', colorLight:'#91d5ff', colorDark:'#071b4d', gem:'gemSapphire', atk:20,
    img:'assets/cards/maril-card.png', cardThumb:'assets/thumbs/maril-card.webp',
    sprite:'assets/characters/runtime-v3/maril/single-1.png', fxTheme:'tidal', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Maré Vazante', cd:4, tipo:'lavarColuna', desc:'A cada 4 turnos, uma coluna inteira é lavada e re-preenchida sem conceder energia.'},
    abilities:[
      {kind:'passive',gems:15, name:'Corais Explosivos', tipo:'damageFromLast', mult:2, desc:'Atinge um oponente com duas vezes o último ataque.'},
      {kind:'passive',gems:25, name:'Armadura de Corais', tipo:'reflectTurns', turnos:1, desc:'Protege o grupo e devolve o dano ao inimigo por um turno.'},
      {kind:'passive',gems:45, name:'Cardumes Invasores', tipo:'invulnerableTurns', turnos:2, desc:'Impede que o grupo sofra dano por dois turnos.'},
      {kind:'active',gems:60, name:'Ataque das Fronteiras do Universo', tipo:'critBase', mult:5, desc:'Desfere um dano crítico igual a cinco vezes o ataque base.'},
      {kind:'active',gems:75, name:'Concha Impenetrável', tipo:'shieldTurns', valor:620, turnos:3, desc:'Ergue um escudo resistente durante três turnos.'},
      {kind:'active',gems:100, name:'Abertura dos Portões de Atlantis', tipo:'damageAllFromLast', mult:3, desc:'Atinge todos os inimigos com três vezes o último combo.'}
    ]
  },
  {
    id:'fogo', nome:'Lucius', reino:'Reino do Fogo', classe:'O Sucessor do Dragão de Ignis · Rei Mago',
    color:'#d52232', colorLight:'#ff9d72', colorDark:'#4d0710', gem:'gemRuby', atk:20,
    img:'assets/cards/lucius-card.png', cardThumb:'assets/thumbs/lucius-card.webp',
    sprite:'assets/characters/runtime-v3/lucius/single-1.png', fxTheme:'dragonfire', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Sopro de Brasas', cd:4, tipo:'queimarCruz', desc:'A cada 4 turnos, queima uma cruz de 5 células; power-ups atingidos são destruídos.'},
    abilities:[
      {kind:'passive',gems:15, name:'Garras do Dragão', tipo:'damageFromHeroLast', mult:2, desc:'Inflige duas vezes o dano do último ataque de Lucius.'},
      {kind:'passive',gems:25, name:'Renascido das Chamas', tipo:'healPercent', valor:.10, desc:'Recupera 10% da vida máxima do grupo.'},
      {kind:'passive',gems:45, name:'Chuva de Lava', tipo:'damageAllFixed', valor:100, desc:'Uma chuva vulcânica causa 100 de dano em cada inimigo.'},
      {kind:'active',gems:60, name:'Ritual do Dragão', tipo:'doubleRedOnce', desc:'Dobra uma única vez a quantidade atual de pedras vermelhas, preservando power-ups.'},
      {kind:'active',gems:75, name:'Explosão de Fogo do Dragão', tipo:'dano', valor:500, desc:'Explode o alvo com 500 de dano direto.'},
      {kind:'active',gems:100, name:'Armadura de Fogo Eterna', tipo:'incinerate', valor:50, desc:'Até o fim da fase, cada ataque acumula Incinerar e causa dano crescente ao longo do tempo.'}
    ]
  },
  {
    id:'natureza', nome:'Ninfa Queen', reino:'Reino da Natureza', classe:'A Guardiã de Toda a Natureza · Rainha Maga',
    color:'#2f9f45', colorLight:'#c9ff9e', colorDark:'#0e451e', gem:'gemEmerald', atk:20,
    img:'assets/cards/ninfa-queen-card.png', cardThumb:'assets/thumbs/ninfa-queen-card.webp',
    sprite:'assets/characters/runtime-v4/ninfa-queen/single-1.png', fxTheme:'verdant', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Raízes Famintas', cd:4, tipo:'criarObstaculos', obst:'vine', qtd:2, hits:1, desc:'A cada 4 turnos, raízes prendem 2 esferas do tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'Benção', tipo:'energyAll', valor:10, desc:'Adiciona 10 pontos ao contador de energia de todos os aliados.'},
      {kind:'passive',gems:25, name:'Escudo de Folhas', tipo:'shieldTurns', valor:450, turnos:1, desc:'Protege o grupo contra o próximo ataque.'},
      {kind:'passive',gems:45, name:'Vinhas Mortais', tipo:'stunAndDamageFromLast', turnos:3, mult:2, desc:'Prende o inimigo por três turnos e causa duas vezes o dano do último ataque.'},
      {kind:'active',gems:60, name:'Natureza Morta', tipo:'spawnPowerUps', quantidade:3, desc:'Adiciona três power-ups aleatórios ao tabuleiro.'},
      {kind:'active',gems:75, name:'Espírito da Natureza', tipo:'healPerRealmGem', valor:100, desc:'Cada joia verde no tabuleiro recupera 100 de HP.'},
      {kind:'active',gems:100, name:'Unidade da Natureza', tipo:'damagePerRealmGem', valor:100, desc:'Cada joia verde no tabuleiro adiciona 100 de dano ao ataque.'}
    ]
  },
  {
    id:'terra', nome:'Kallendra', reino:'Reino da Terra', classe:'A Maga Mais Forte · Rainha Maga',
    color:'#8b5a2b', colorLight:'#f0bd78', colorDark:'#3c210d', gem:'gemTopaz', atk:20,
    img:'assets/cards/kallendra-card.png', cardThumb:'assets/cards/kallendra-card.png',
    sprite:'assets/characters/runtime-v4/barbara/single-1.png', heroFlip:true, fxTheme:'seismic', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Abalo Sísmico', cd:4, tipo:'embaralharLinhas', qtd:2, desc:'A cada 4 turnos, duas linhas do tabuleiro são sacudidas e embaralhadas.'},
    abilities:[
      {kind:'passive',gems:15, name:'Golpe da Clava', tipo:'stunAndDamageFromLast', turnos:2, mult:2, desc:'Atinge o inimigo com duas vezes o último ataque e o atordoa por dois turnos.'},
      {kind:'passive',gems:25, name:'Armadura de Pedra', tipo:'stoneArmor', turnos:2, reducao:.5, reflexao:.5, desc:'Reduz o dano recebido e devolve parte dele durante dois turnos.'},
      {kind:'passive',gems:45, name:'Terremoto Destruidor', tipo:'damageAllAndVulnerable', valor:100, turnos:2, mult:1.25, desc:'Causa 100 de dano em todos e reduz a defesa inimiga.'},
      {kind:'active',gems:60, name:'Invocação de Golens', tipo:'summonGolems', quantidade:2, desc:'Invoca dois golens; cada um replica metade do dano de Kallendra até o fim da missão.'},
      {kind:'active',gems:75, name:'Força Terra', tipo:'damageAllFixed', valor:300, desc:'Atinge todos os inimigos com 300 de dano.'},
      {kind:'active',gems:100, name:'Terra Viva', tipo:'sacrificeGolems', quantidade:2, valor:1000, requiresGolems:2, desc:'Sacrifica dois golens para infligir 1000 de dano ao alvo.'}
    ]
  },
  {
    id:'areia', nome:'Rashid', reino:'Reino da Areia', classe:'A Flor Dançante do Oásis de Meriady · Rainha Maga',
    color:'#d69a20', colorLight:'#ffe8a3', colorDark:'#5a3105', gem:'gemAmber', atk:20,
    orbColor:'#ffd900', orbColorLight:'#fff8bd', orbColorDark:'#8a6d00',
    img:'assets/cards/rashid-card.png', cardThumb:'assets/thumbs/rashid-card.webp',
    sprite:'assets/characters/runtime-v5/rashid/single-1.png', fxTheme:'desert', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Miragem de Meriady', cd:4, tipo:'criarObstaculos', obst:'sand', qtd:3, hits:1, desc:'A cada 4 turnos, a areia cobre 3 esferas do tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'Tempestade de Areia', tipo:'blind', turnos:1, desc:'Anula a visão dos inimigos, fazendo os ataques errarem neste turno.'},
      {kind:'passive',gems:25, name:'Lâmina Dançante', tipo:'dano', valor:300, desc:'Atinge um inimigo com 300 de dano.'},
      {kind:'passive',gems:45, name:'Pirâmide de Meriady', tipo:'shieldTurns', valor:400, turnos:1, desc:'Adiciona um escudo por uma rodada.'},
      {kind:'active',gems:60, name:'Oásis no Deserto', tipo:'healFixed', valor:600, desc:'Recupera 600 de vida.'},
      {kind:'active',gems:75, name:'Enigma da Esfinge', tipo:'weakestHalfOrDamage', valor:500, desc:'Com vários inimigos, o mais fraco perde metade da vida; sozinho, recebe 500 de dano.'},
      {kind:'active',gems:100, name:'Dança das Mil Lâminas', tipo:'damageAllPerRealmGem', valor:70, desc:'Atinge todos os inimigos com 70 de dano para cada peça amarela no tabuleiro.'}
    ]
  },
  {
    id:'sombras', nome:'Berenice das Sombras', reino:'Reino das Sombras', classe:'A Soberana das Sombras Eternas · Rainha Maga',
    color:'#7d245f', colorLight:'#ff9de1', colorDark:'#170511', gem:'gemObsidian', atk:20,
    orbColor:'#18141f', orbColorLight:'#7b7387', orbColorDark:'#010102',
    img:'assets/cards/berenice-sombras-card.png', cardThumb:'assets/thumbs/berenice-sombras-card.webp',
    sprite:'assets/characters/runtime-v5/berenice-sombras/single-1.png', fxTheme:'void', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Véu do Eclipse', cd:4, tipo:'ocultarCores', qtd:5, turnos:3, desc:'A cada 4 turnos, 5 esferas têm a cor oculta por 3 turnos.'},
    abilities:[
      {kind:'passive',gems:15, name:'Coração Impiedoso', tipo:'vulnerableTurns', turnos:1, mult:2, desc:'Cria um campo que dobra o dano recebido pelo inimigo por um turno.'},
      {kind:'passive',gems:25, name:'Coração Impuro', tipo:'reflectTurns', turnos:2, desc:'Todo o dano recebido volta ao inimigo durante dois turnos.'},
      {kind:'passive',gems:45, name:'Maldição', tipo:'damageTargetPercent', valor:.1, desc:'Retira 10% da vida do alvo inimigo que atacou no último turno.'},
      {kind:'active',gems:60, name:'Sombra do Universo', tipo:'critBaseAll', mult:12, desc:'Desfere em todos os inimigos um crítico devastador de doze vezes o ataque base.'},
      {kind:'active',gems:75, name:'Todas as Sombras Venham a Mim', tipo:'doubleRealmOnce', desc:'Dobra uma única vez o número atual de blocos das sombras.'},
      {kind:'active',gems:100, name:'Por Toda a Escuridão', tipo:'nextAttackPerRealmGem', desc:'Multiplica o próximo ataque pelo total de blocos das sombras no tabuleiro.'}
    ]
  },
  {
    id:'raio', nome:'Mardogear', reino:'Reino do Raio', classe:'Senhor dos Trovões e da Destruição · Rei Mago',
    color:'#8b2fc9', colorLight:'#d9a6ff', colorDark:'#2e0a4d', gem:'gemAmethyst', atk:20,
    img:'assets/cards/mardogear-card.png', cardThumb:'assets/cards/mardogear-card.png',
    sprite:'assets/characters/runtime-v6/mardogear/single-1.png', heroFlip:true, fxTheme:'storm', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Curto-Circuito', cd:4, tipo:'sobrecarga', limite:50, desc:'A cada 4 turnos, o herói mais carregado perde toda energia acima de 50.'},
    abilities:[
      {kind:'passive',gems:15, name:'Ataque de Raios', tipo:'dano', valor:100, desc:'Um raio cai no inimigo infligindo 100 de dano.'},
      {kind:'passive',gems:25, name:'Estrondo', tipo:'atordoa', valor:1, desc:'Atordoa todos os inimigos por 1 turno.'},
      {kind:'passive',gems:45, name:'Campo Magnético', tipo:'reflectTurns', turnos:3, desc:'Coloca um escudo magnético e devolve os ataques recebidos por 3 turnos.'},
      {kind:'active',gems:60, name:'Full Power', tipo:'empowerAttacks', cargas:3, mult:2, desc:'Adiciona 3 esferas de energia ao redor dele; cada esfera dobra seu ataque. Cada uma dura 1 turno.'},
      {kind:'active',gems:75, name:'Trovão Fulminante', tipo:'dano', valor:1000, desc:'Atinge o inimigo com um raio infligindo 1000 de dano.'},
      {kind:'active',gems:100, name:'Hecatombe', tipo:'hecatombe', valor:150, desc:'Atinge todos os inimigos com 150 de dano para cada peça roxa no tabuleiro e inflige os efeitos de atordoar e eletrocutar.'}
    ]
  },
  {
    id:'vento', nome:'Sophitia', reino:'Reino do Vento', classe:'A Rainha Harpia · Rainha Maga',
    color:'#6cb8e8', colorLight:'#e6f7ff', colorDark:'#1d5a80', gem:'gemAero', atk:20,
    orbColor:'#5cc3f7', orbColorLight:'#eaf9ff', orbColorDark:'#155a85',
    img:'assets/cards/sophitia-card.png', cardThumb:'assets/cards/sophitia-card.png',
    sprite:'assets/characters/runtime-v6/sophitia/single-1.png', fxTheme:'gale', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Rajada de Lafesia', cd:4, tipo:'deslizarLinha', desc:'A cada 4 turnos, uma linha desliza em círculo e power-ups na linha são levados pelo vento.'},
    abilities:[
      {kind:'passive',gems:15, name:'Furacão', tipo:'damageAllFixed', valor:100, desc:'Atinge todos os inimigos com 100 de dano.'},
      {kind:'passive',gems:25, name:'Barreira de Vento', tipo:'invulnerableTurns', turnos:2, desc:'Impede os danos por 2 turnos.'},
      {kind:'passive',gems:45, name:'Garras Afiadas', tipo:'critBase', mult:2, desc:'Atinge o inimigo com um dano extra do dobro do ataque.'},
      {kind:'active',gems:60, name:'Furacão Destruidor', tipo:'damageAllFixed', valor:300, desc:'Atinge todos os inimigos com 300 de dano.'},
      {kind:'active',gems:75, name:'Fúria dos Céus', tipo:'summonHarpies', quantidade:2, desc:'2 Harpias se unem a ela, cada uma atacando com 20% do dano.'},
      {kind:'active',gems:100, name:'Fúria Suprema dos Céus', tipo:'summonHarpies', quantidade:3, desc:'Mais 3 Harpias se unem a ela, cada uma atacando com 20% do dano, totalizando 5.'}
    ]
  },
  {
    id:'chuvas', nome:'Regnar', reino:'Reino das Chuvas', classe:'Senhor das Chuvas Torrenciais · Rei Mago',
    color:'#5a6472', colorLight:'#b8c4d4', colorDark:'#14181f', gem:'gemStormstone', atk:20,
    orbColor:'#6e7a88', orbColorLight:'#c4cfdb', orbColorDark:'#2a313b',
    img:'assets/cards/regnar-card.png', cardThumb:'assets/cards/regnar-card.png',
    sprite:'assets/characters/runtime-v6/regnar/single-1.png', heroFlip:true, fxTheme:'deluge', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Manto de Chuva', cd:4, tipo:'encharcar', mult:0.5, desc:'A cada 4 turnos, encharca as armas: o próximo ataque de cada herói causa metade do dano.'},
    abilities:[
      {kind:'passive',gems:15, name:'Chuva Leve', tipo:'dotAll', valor:30, turnos:999, desc:'Atinge todos os inimigos com 30 de dano em todos os turnos. Dura até eles morrerem.'},
      {kind:'passive',gems:25, name:'Aprendendo Conceitos Volume I', tipo:'spawnPowerUps', quantidade:3, desc:'Usa o seu livro para criar 3 power-ups seus.'},
      {kind:'passive',gems:45, name:'Visão Comprometida', tipo:'blind', turnos:3, desc:'Faz os inimigos errarem o ataque por 3 turnos.'},
      {kind:'active',gems:60, name:'Aprendendo Conceitos Volume II', tipo:'spawnColorBombs', quantidade:3, desc:'Usa o seu livro para criar 3 power-ups máximos.'},
      {kind:'active',gems:75, name:'Chuva Ácida', tipo:'danoDot', valor:300, dot:30, turnos:999, desc:'Dá 300 de dano no inimigo, e 30 de dano em todos os turnos.'},
      {kind:'active',gems:100, name:'Chuva Torrencial', tipo:'dotAll', valor:100, turnos:999, desc:'Atinge todos os inimigos com 100 de dano em todos os turnos. Dura até eles morrerem.'}
    ]
  },
  {
    id:'gelo', nome:'Blizzardo', reino:'Reino do Gelo', classe:'O Abominável Rei das Neves · Rei Mago',
    color:'#9fb8cc', colorLight:'#ffffff', colorDark:'#4c5c6e', gem:'gemGlacial', atk:20,
    orbColor:'#9cc0dc', orbColorLight:'#d6ebf9', orbColorDark:'#4c6a82',
    img:'assets/cards/blizzardo-card.png', cardThumb:'assets/cards/blizzardo-card.png',
    sprite:'assets/characters/runtime-v6/blizzardo/single-1.png', fxTheme:'frost', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Nevasca de Artyka', cd:4, tipo:'criarObstaculos', obst:'ice', qtd:3, hits:1, reforcado:1, desc:'A cada 4 turnos, congela 3 esferas — uma delas com gelo reforçado.'},
    abilities:[
      {kind:'passive',gems:15, name:'Machado de Gelo', tipo:'danoArea', valor:300, area:150, desc:'Inflige 300 de dano no inimigo e 150 em área.'},
      {kind:'passive',gems:25, name:'Bola de Neve', tipo:'stunPerRealmGem', divisor:4, desc:'Atordoa o inimigo pela quantidade de turnos equivalente a 1/4 das pedras cinza claras no tabuleiro.'},
      {kind:'passive',gems:45, name:'Aurora Austral', tipo:'healFixed', valor:500, desc:'Recupera 500 de vida.'},
      {kind:'active',gems:60, name:'Aurora Boreal', tipo:'dano', valor:500, desc:'Inflige 500 de dano no inimigo.'},
      {kind:'active',gems:75, name:'Geada Branca', tipo:'freezeBlast', valor:100, porGema:20, turnos:1, desc:'Dá 100 de dano em cada inimigo + 20 por cada peça cinza clara no tabuleiro e congela eles por 1 turno.'},
      {kind:'active',gems:100, name:'Morte Congelada', tipo:'freezeExecute', turnos:5, desc:'Congela totalmente o inimigo por 5 turnos e reduz a vida dele pela metade da atual.'}
    ]
  },
  /* ---- Cartas jogáveis do Reino Rosa (deck dos Humanos) — 1-2★ ---- */
  /* Habilidades transcritas das ARTES OFICIAIS das cartas — não inventar.
     Regra de estrelas: 1★=0P/0A · 2★=1P/0A · 3★=2P · 4★=3P · 5★=3P/1A · 6★=3P/2A · 7★=3P/3A.
     Passivas de carta usam every:true = disparam a cada `gems`% de energia (25/50/75/100). */
  {
    id:'gareth', iconId:'humanos', deck:'humanos', nome:'Gareth', reino:'Reino dos Humanos', classe:'Sentinela da Capital · Soldado',
    color:'#e08aa0', colorLight:'#ffd7e2', colorDark:'#6e2438', gem:'gemRose', atk:2,
    img:'assets/cards/enemies/gareth-card.png', cardThumb:'assets/cards/enemies/gareth-card.png',
    sprite:'assets/enemies/humanos/gareth.png', heroFlip:true, fxTheme:'rose', rarity:'NORMAL', stars:1,
    frase:'Toda grande vitória começa com um simples soldado.',
    stageAbility:{nome:'Troca de Guarda', cd:6, tipo:'trocarCores', qtd:3, desc:'A cada 6 turnos, 3 esferas aleatórias trocam de cor.'},
    abilities:[]
  },
  {
    id:'cedric', iconId:'humanos', deck:'humanos', nome:'Cedric', reino:'Reino dos Humanos', classe:'O Mago Nobre · Mago',
    color:'#8fa6c9', colorLight:'#dbe8fa', colorDark:'#26364e', gem:'gemSteel', atk:4,
    img:'assets/cards/enemies/cedric-card.png', cardThumb:'assets/cards/enemies/cedric-card.png',
    sprite:'assets/enemies/humanos/cedric.png', heroFlip:true, fxTheme:'steel', rarity:'RARO', stars:2,
    frase:'Cada feitiço escrito hoje será uma lenda amanhã.',
    stageAbility:{nome:'Selo Arcano', cd:5, tipo:'selarPowerUp', cura:60, desc:'A cada 5 turnos, sela 1 power-up do tabuleiro; sem power-up, recupera 60 de vida.'},
    abilities:[
      {kind:'passive',gems:25, every:true, name:'Benção das Flores de Cerejeira', tipo:'healFixed', valor:100, desc:'Recupera 100 de vida todas as vezes que for acionada (25%, 50%, 75%, 100%).'}
    ]
  },
  {
    id:'elizier', iconId:'humanos', deck:'humanos', nome:'Elizier', reino:'Reino dos Humanos', classe:'Olhos da Coroa · Arqueira',
    color:'#d98a5c', colorLight:'#ffe0c4', colorDark:'#5e2a10', gem:'gemEmber', atk:4,
    img:'assets/cards/enemies/elizier-card.png', cardThumb:'assets/cards/enemies/elizier-card.png',
    sprite:'assets/enemies/humanos/elizier.png', heroFlip:true, fxTheme:'ember', rarity:'RARO', stars:2,
    frase:'Nenhum inimigo escapa do olhar da Coroa.',
    stageAbility:{nome:'Flecha Certeira', cd:5, tipo:'drenarMaisCarregado', valor:12, desc:'A cada 5 turnos, o herói mais carregado perde 12 de energia.'},
    abilities:[
      {kind:'passive',gems:25, every:true, name:'Flechas das Flores de Cerejeira', tipo:'danoTodos', desc:'Atinge todos os inimigos infligindo o dano do último ataque (25%, 50%, 75%, 100%).'}
    ]
  },
  {
    id:'roland', iconId:'humanos', deck:'humanos', nome:'Roland', reino:'Reino dos Humanos', classe:'Escudo Real de Bernyce · Cavaleiro',
    color:'#7ec9a1', colorLight:'#d8f5e6', colorDark:'#1e4a34', gem:'gemJade', atk:4,
    img:'assets/cards/enemies/roland-card.png', cardThumb:'assets/cards/enemies/roland-card.png',
    sprite:'assets/enemies/humanos/roland.png', heroFlip:true, fxTheme:'jade', rarity:'RARO', stars:2,
    frase:'Minha Lança protege o reino antes da minha própria vida.',
    stageAbility:{nome:'Bastião de Lanças', cd:5, tipo:'criarObstaculos', obst:'stone', qtd:1, hits:2, desc:'A cada 5 turnos, finca um bloqueio de pedra no tabuleiro.'},
    abilities:[
      {kind:'passive',gems:25, every:true, name:'Lança das Flores de Cerejeira', tipo:'damageFromLast', mult:3, desc:'Atinge o inimigo infligindo 3× o dano do último ataque (25%, 50%, 75%, 100%).'}
    ]
  },
  /* ---- Jovens aprendizes oficiais ---- */
  {
    id:'berenice-jovem', iconId:'humanos', deck:'humanos', nome:'Berenice (Jovem)', reino:'Reino dos Humanos', classe:'A Herdeira da Eternidade · Aprendiz',
    color:'#ff6fa5', colorLight:'#ffd7e8', colorDark:'#7c1f4b', gem:'gemPink', atk:2,
    img:'assets/cards/berenice-jovem-card.webp', cardThumb:'assets/cards/berenice-jovem-card.webp',
    sprite:'assets/characters/runtime-v7/berenice-jovem/single-1.webp', heroFlip:true, fxTheme:'chronal', rarity:'NORMAL', stars:1,
    frase:'Um dia dominarei o tempo... e ninguém esquecerá meu nome.',
    abilities:[]
  },
  {
    id:'galateia-jovem', iconId:'luz', deck:'luz', nome:'Galatéia (Jovem)', reino:'Reino da Luz', classe:'A Futura Rainha de Ygdria · Aprendiz',
    color:'#eef2f8', colorLight:'#ffffff', colorDark:'#78869b', gem:'gemDiamond', atk:2,
    img:'assets/cards/galateia-jovem-card.webp', cardThumb:'assets/cards/galateia-jovem-card.webp',
    sprite:'assets/characters/runtime-v7/galateia-jovem/single-1.webp', fxTheme:'radiant', rarity:'NORMAL', stars:1,
    frase:'Um dia, minha luz alcançará todo este mundo.',
    abilities:[]
  },
  {
    id:'adriel-jovem', iconId:'humanos', deck:'humanos', nome:'Adriel (Jovem)', reino:'Reino dos Humanos', classe:'O Aprendiz de Cavaleiro · Aprendiz',
    color:'#ff6fa5', colorLight:'#ffd7e8', colorDark:'#7c1f4b', gem:'gemPink', atk:2,
    img:'assets/cards/adriel-jovem-card.webp', cardThumb:'assets/cards/adriel-jovem-card.webp',
    sprite:'assets/characters/runtime-v7/adriel-jovem/single-1.webp', heroFlip:true, fxTheme:'rose', rarity:'NORMAL', stars:1,
    sprites:{attack:{src:'assets/characters/runtime-v7/adriel-jovem/attack-2x3.png',frames:6,rows:2,cols:3,duration:720,loop:false,format:'sheet'}},
    frase:'Um dia me tornarei o cavaleiro mais forte de toda Ygdria.',
    abilities:[]
  },
  {
    id:'acqua-jovem', iconId:'agua', deck:'agua', nome:'Acqua (Jovem)', reino:'Reino da Água', classe:'A Pequena Voz dos Oceanos · Aprendiz',
    color:'#174ea6', colorLight:'#91d5ff', colorDark:'#071b4d', gem:'gemSapphire', atk:2,
    img:'assets/cards/acqua-jovem-card.webp', cardThumb:'assets/cards/acqua-jovem-card.webp',
    sprite:'assets/characters/runtime-v7/acqua-jovem/single-1.webp', fxTheme:'tidal', rarity:'NORMAL', stars:1,
    frase:'Um dia minha voz será ouvida por toda Ygdria.',
    abilities:[]
  },
  /* ---- Nova leva oficial: Jules, Kalander, Bernyce (Rosa) e Julius (Sombras) ---- */
  {
    id:'jules', iconId:'humanos', deck:'humanos', nome:'Jules', reino:'Reino dos Humanos', classe:'The Joker · Bobo da Corte',
    color:'#e8557f', colorLight:'#ffc9dc', colorDark:'#7c1638', gem:'gemJoker', atk:6,
    img:'assets/cards/enemies/jules-card.png', cardThumb:'assets/cards/enemies/jules-card.png',
    sprite:'assets/enemies/humanos/jules.png', heroFlip:true, fxTheme:'rose', rarity:'SUPER RARO', stars:3,
    frase:'O maior truque não é enganar o inimigo... é conquistar sua confiança.',
    stageAbility:{nome:'Ás de Copas', cd:5, tipo:'asDeCopas', desc:'A cada 5 turnos, cria 1 gema rosa de coração vermelho; se você estourá-la, recebe 5% da sua vida atual de dano.'},
    abilities:[
      {kind:'passive', at:[25,75], name:'Truque de Cartas', tipo:'spawnPowerUps', quantidade:1, desc:'Cria 1 power-up aleatório no tabuleiro (25%, 75%).'},
      {kind:'passive', at:[50,100], name:'Chamariz', tipo:'chamariz', desc:'Depois de ativar, se seu HP chegar a 0 você não perde: o HP volta para 100 (25%... 50%, 100%).'}
    ]
  },
  {
    id:'kalander', iconId:'humanos', deck:'humanos', nome:'Kalander', reino:'Reino dos Humanos', classe:'O Herói da Nação · Cavaleiro Mago',
    color:'#d97fa6', colorLight:'#ffd9e9', colorDark:'#6e2447', gem:'gemHero', atk:6,
    img:'assets/cards/enemies/kalander-card.png', cardThumb:'assets/cards/enemies/kalander-card.png',
    sprite:'assets/enemies/humanos/kalander.png', heroFlip:true, fxTheme:'rose', rarity:'SUPER RARO', stars:3,
    frase:'Uma rainha governa um reino... uma mãe protege uma geração.',
    stageAbility:{nome:'Golpe Cruzado', cd:4, tipo:'cortarX', desc:'A cada 4 turnos, suas lâminas gêmeas cortam um X no tabuleiro: as esferas das diagonais são removidas sem conceder energia.'},
    abilities:[
      {kind:'passive', at:[25,75], name:'Corte Duplo', tipo:'corteDuplo', desc:'Duplica o ataque dele até o final do turno (25%, 75%; não acumula no mesmo turno).'},
      {kind:'passive', at:[50,100], name:'O Herói da Nação', tipo:'reducaoDano', valor:0.2, desc:'Reduz os danos recebidos em 20% pela missão toda; acumula até 2× (50%, 100%).'}
    ]
  },
  {
    id:'bernyce', iconId:'humanos', deck:'humanos', nome:'Bernyce', reino:'Reino dos Humanos', classe:'Rainha dos Reguladores · Rainha Maga',
    color:'#e77fb2', colorLight:'#ffd4ec', colorDark:'#77175a', gem:'gemQueen', atk:6,
    img:'assets/cards/enemies/bernyce-card.png', cardThumb:'assets/cards/enemies/bernyce-card.png',
    sprite:'assets/enemies/humanos/bernyce.png', heroFlip:true, fxTheme:'rose', rarity:'SUPER RARO', stars:3,
    frase:'Uma rainha governa um reino... uma mãe protege uma geração.',
    stageAbility:{nome:'Regulação Real', cd:4, tipo:'regulacaoReal', cura:80, desc:'A cada 4 turnos, remove TODOS os power-ups do tabuleiro e recupera 80 de vida por cada um removido.'},
    abilities:[
      {kind:'passive', at:[25,75], name:'Regulação Total', tipo:'atordoa', valor:2, desc:'Os inimigos ficam 2 turnos sem atacar (25%, 75%).'},
      {kind:'passive', at:[50,100], name:'Ímpeto da Rainha', tipo:'impetoRainha', valor:0.2, desc:'Os inimigos recebem 20% de dano extra até o fim da missão; acumula sempre que ativar (50%, 100%).'}
    ]
  },
  {
    id:'julius', iconId:'sombras', deck:'sombras', nome:'Julius', reino:'Reino das Sombras', classe:'O Cavaleiro do Além · Cavaleiro Mago',
    color:'#6b5a8c', colorLight:'#cbb8ff', colorDark:'#241b38', gem:'gemBeyond', atk:8,
    orbColor:'#1b1426', orbColorLight:'#8a7a9e', orbColorDark:'#050308',
    img:'assets/cards/enemies/julius-card.png', cardThumb:'assets/cards/enemies/julius-card.png',
    sprite:'assets/enemies/humanos/julius.png', heroFlip:true, fxTheme:'shadow', rarity:'ULTRA RARO', stars:4, artKit:true,
    frase:'Minhas sombras devoram o passado... e reescrevem a história!',
    stageAbility:{nome:'Tempo Sombrio', cd:0, tempoReal:30, tipo:'tempoSombrio', desc:'A cada 30 segundos no relógio, corrompe uma gema com uma sombra: ela não pode ser movida nem removida. Se todas forem corrompidas, você perde!'},
    abilities:[
      {kind:'passive', at:[25], name:'Corte Sombrio', tipo:'percentAtualCega', pct:0.2, desc:'Inflige 20% da vida atual do inimigo e causa cegueira por 1 turno (25%).'},
      {kind:'passive', at:[50], name:'Para que Serve esse Relógio', tipo:'paralisiaTempo', desc:'Paralisa o tempo do inimigo: ele não ataca mais até sua vida chegar a 25% (50%).'},
      {kind:'passive', at:[75], name:'Sombras Devoradoras', tipo:'sombrasDevoradoras', pct:0.05, desc:'Sempre que o inimigo atacar, todos os inimigos perdem 5% da vida total (75%).'},
      {kind:'active', gems:100, name:'Lâmina das Sombras Dimensional I', tipo:'laminaDimensional', desc:'Atinge todos os inimigos com 10% da vida e as missões futuras com 8%, 6%, 4%, 2%, 0% consecutivamente. Acumulativa (100%).'}
    ]
  }
];

const CHIBI_SVG = {
  fogo: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7a1420"/><stop offset="100%" stop-color="#2e0810"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#ff6b4a"/><stop offset="100%" stop-color="#2e0810"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>

  <path d="M30 82 Q50 76 70 82 L84 138 Q50 150 16 138 Z" fill="#2e0810" opacity="0.9" stroke="#000" stroke-opacity="0.3" stroke-width="1.5"/>

  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#2e0810" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#2e0810"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#2e0810"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#2e0810" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#2e0810" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#2e0810" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#2e0810" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>


  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M28 38 Q20 8 50 6 Q80 8 72 38 L64 20 L56 34 L50 16 L44 34 L36 20 Z" fill="#c0202e"/>
                     <path d="M50 6 Q56 2 60 9 Q54 8 51 12Z" fill="#c0202e" opacity="0.85"/>
  <path d="M32 20 L38 8 L44 18 L50 6 L56 18 L62 8 L68 20 L66 26 L34 26 Z" fill="#f0c94a" stroke="#7a5a10" stroke-width="1.2"/><circle cx="50" cy="10" r="2.4" fill="#ff5a5a"/>
  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
  terra: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c9a24b"/><stop offset="100%" stop-color="#6b4a1e"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#e9c26b"/><stop offset="100%" stop-color="#6b4a1e"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>


  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#6b4a1e" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#6b4a1e"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#6b4a1e"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#6b4a1e" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#6b4a1e" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#6b4a1e" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#6b4a1e" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>
  <ellipse cx="30" cy="90" rx="10" ry="7" fill="#6b4a1e" stroke="#00000055" stroke-width="1"/>
                        <ellipse cx="70" cy="90" rx="10" ry="7" fill="#6b4a1e" stroke="#00000055" stroke-width="1"/>

  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M26 42 Q22 6 50 6 Q78 6 74 42 Q74 20 50 18 Q26 20 26 42Z" fill="#3a2414"/>
  <rect x="32" y="49" width="14" height="10" rx="4" fill="none" stroke="#2a2a2a" stroke-width="2"/><rect x="54" y="49" width="14" height="10" rx="4" fill="none" stroke="#2a2a2a" stroke-width="2"/><line x1="46" y1="53" x2="54" y2="53" stroke="#2a2a2a" stroke-width="2"/>
  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
  luz: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eef1f6"/><stop offset="100%" stop-color="#a7b0be"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#fff6d6"/><stop offset="100%" stop-color="#a7b0be"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>


  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#a7b0be" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#a7b0be"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#a7b0be"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#a7b0be" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#a7b0be" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#a7b0be" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#a7b0be" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>


  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M24 46 Q18 6 50 5 Q82 6 76 46 L80 92 Q70 78 68 46 Q68 20 50 18 Q32 20 32 46 Q30 78 20 92 Z" fill="#f7f1de"/>
                     <path d="M32 46 Q50 58 68 46 Q68 20 50 18 Q32 20 32 46Z" fill="#d8cfa8" opacity="0.35"/>
  <ellipse cx="50" cy="12" rx="17" ry="5" fill="none" stroke="#ffe9a8" stroke-width="3" opacity="0.9"/>
  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
  humanos: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff6f9f"/><stop offset="100%" stop-color="#7a1f45"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#ffd6e8"/><stop offset="100%" stop-color="#7a1f45"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>


  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#7a1f45" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#7a1f45"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#7a1f45"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#7a1f45" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#7a1f45" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#7a1f45" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#7a1f45" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>


  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M26 42 Q22 6 50 6 Q78 6 74 42 Q74 20 50 18 Q26 20 26 42Z" fill="#c04a78"/>

  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
  sombras: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a2a4a"/><stop offset="100%" stop-color="#0e0816"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#9a78c0"/><stop offset="100%" stop-color="#0e0816"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>


  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#0e0816" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#0e0816"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#0e0816"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#0e0816" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#0e0816" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#0e0816" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#0e0816" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>


  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M20 50 Q16 2 50 2 Q84 2 80 50 Q80 30 50 26 Q20 30 20 50Z" fill="#160f1e"/>
                      <path d="M18 48 Q50 34 82 48 L86 62 Q50 48 14 62 Z" fill="#160f1e" opacity="0.85"/>

  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#c8a8ff"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#c8a8ff"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
  agua: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinG" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#fff0e0"/><stop offset="100%" stop-color="#f2c9a3"/>
    </radialGradient>
    <linearGradient id="outfitG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2f6ec9"/><stop offset="100%" stop-color="#0a1f45"/>
    </linearGradient>
    <radialGradient id="orbG" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="55%" stop-color="#bfe0ff"/><stop offset="100%" stop-color="#0a1f45"/>
    </radialGradient>
  </defs>

  <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000" opacity="0.28"/>


  <!-- staff -->
  <rect x="78" y="70" width="4" height="60" rx="2" fill="#6b4a2a"/>
  <circle cx="80" cy="66" r="9" fill="url(#orbG)" stroke="#0a1f45" stroke-width="1.5"/>

  <!-- legs/boots -->
  <rect x="38" y="118" width="10" height="20" rx="4" fill="#0a1f45"/>
  <rect x="52" y="118" width="10" height="20" rx="4" fill="#0a1f45"/>
  <ellipse cx="43" cy="139" rx="8" ry="5" fill="#2a1c12"/>
  <ellipse cx="57" cy="139" rx="8" ry="5" fill="#2a1c12"/>

  <!-- body/robe -->
  <path d="M32 92 Q50 82 68 92 L74 128 Q50 138 26 128 Z" fill="url(#outfitG)" stroke="#0a1f45" stroke-width="2"/>
  <path d="M40 92 Q50 100 60 92 L58 108 Q50 114 42 108 Z" fill="#0a1f45" opacity="0.55"/>

  <!-- arms -->
  <ellipse cx="27" cy="106" rx="9" ry="16" fill="url(#outfitG)" stroke="#0a1f45" stroke-width="1.5" transform="rotate(-12 27 106)"/>
  <ellipse cx="73" cy="100" rx="9" ry="17" fill="url(#outfitG)" stroke="#0a1f45" stroke-width="1.5" transform="rotate(18 73 100)"/>
  <circle cx="22" cy="120" r="6.5" fill="#f2c9a3"/>
  <circle cx="79" cy="86" r="6.5" fill="#f2c9a3"/>


  <!-- head -->
  <circle cx="50" cy="52" r="34" fill="url(#skinG)" stroke="#00000022" stroke-width="1"/>
  <path d="M27 40 Q22 6 50 6 Q78 6 73 40 Q74 18 50 16 Q26 18 27 40Z" fill="#1f5a9c"/>
                        <path d="M74 34 Q94 44 88 74 Q80 60 70 46Z" fill="#1f5a9c"/>
                        <path d="M74 34 Q94 44 88 74 Q84 62 76 50Z" fill="#0a1f45" opacity="0.3"/>
  <path d="M74 30 Q92 34 86 52 Q78 44 70 38Z" fill="#1f5a9c" opacity="0.9"/>
  <ellipse cx="38" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <ellipse cx="62" cy="54" rx="4.2" ry="5.5" fill="#241a1a"/>
  <circle cx="39.5" cy="52" r="1.4" fill="#fff"/>
  <circle cx="63.5" cy="52" r="1.4" fill="#fff"/>
  <path d="M43 66 Q50 71 57 66" stroke="#8a5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
  <ellipse cx="68" cy="62" rx="5" ry="3" fill="#ff9a9a" opacity="0.45"/>
</svg>`,
};

const KINGDOM_ICON = {
  fogo: '<path d="M12 2C10 6 6 8.5 6 13.5a6 6 0 0 0 12 0c0-3.2-1.8-4.4-2.2-6.6-.3 1.8-1.3 2.8-1.3 4.2a1.8 1.8 0 1 1-3.6 0c0-3.4 2.1-4.6 1.1-9.1Z" fill="#fff" fill-opacity="0.92" stroke="#00000055" stroke-width="0.6"/>',
  natureza: '<path d="M4 13C4 7 9 4 20 4c0 10-3 15-9 15-1.6 0-2.8-.4-3.7-.9 2-1 3.8-2.7 4.9-5.4-2.8 1.8-5.6 1.7-7.5-.2C3.3 11.1 4 12 4 13Z" fill="#fff" fill-opacity="0.92" stroke="#00000055" stroke-width="0.6"/>',
  terra: '<path d="M2.5 19 8.6 8.2l2.4 4.1L14.4 4 22 19H2.5Zm7.1-2.2h7.8l-3-7-1.9 4.6-1.3-2.2-1.6 4.6Z" fill="#fff" fill-opacity="0.94" stroke="#00000055" stroke-width="0.6"/>',
  luz: '<path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" fill="#fff" fill-opacity="0.95" stroke="#00000055" stroke-width="0.6"/>',
  humanos: '<path d="M12 21s-7-4.4-9.5-8.6C.5 8 2.6 4 6.6 4c2 0 3.5 1.5 4.5 3 1-1.5 2.6-3 4.6-3 4 0 6.1 4 4.1 8.5C19.3 16.6 12 21 12 21Z" fill="#fff" fill-opacity="0.92" stroke="#00000055" stroke-width="0.6"/>',
  sombras: '<path d="M15.5 3a9 9 0 1 0 5.9 15.8A7.2 7.2 0 0 1 15.5 3Z" fill="#fff" fill-opacity="0.92" stroke="#00000055" stroke-width="0.6"/>',
  agua: '<path d="M12 2s6.4 7.4 6.4 12.2A6.4 6.4 0 0 1 5.6 14.2C5.6 9.4 12 2 12 2Z" fill="#fff" fill-opacity="0.92" stroke="#00000055" stroke-width="0.6"/>',
  areia: '<path d="M12 3 21.8 20H2.2L12 3Z" fill="#fff" fill-opacity="0.94" stroke="#00000055" stroke-width="0.6"/>',
  raio: '<path d="M13 2 4.5 13.5h5.2L10 22l9.5-12h-5.6L13 2Z" fill="#fff" fill-opacity="0.94" stroke="#00000055" stroke-width="0.6"/>',
  vento: '<path d="M3 8h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 18h8" stroke="#fff" stroke-opacity="0.95" stroke-width="2.1" fill="none" stroke-linecap="round"/>',
  chuvas: '<path d="M12 2.6s4.6 5.4 4.6 8.6a4.6 4.6 0 0 1-9.2 0C7.4 8 12 2.6 12 2.6Z" fill="#fff" fill-opacity="0.92"/><path d="M6 18.5l-1.4 3M12.2 18.5l-1.4 3M18.4 18.5l-1.4 3" stroke="#fff" stroke-opacity="0.9" stroke-width="1.8" stroke-linecap="round"/>',
  gelo: '<path d="M12 2v20M3.8 6.6l16.4 10.8M20.2 6.6 3.8 17.4" stroke="#fff" stroke-opacity="0.95" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
};



const DUNGEON = [
  { title:'Portão do Pântano', scene:0, enemies:[
      {name:'Limo Rúnico', hp:320, atk:40, sprite:'assets/enemies/slime/single-1.png'}
    ] },
  { title:'Salão de Pedra', scene:1, enemies:[
      {name:'Sentinela de Pedra', hp:380, atk:50, sprite:'assets/enemies/stone-sentinel/single-1.png'},
      {name:'Golem Ancestral', hp:780, atk:70, sprite:'assets/enemies/stone-sentinel/single-1.png'}
    ] },
  { title:'Floresta Sombria', scene:2, enemies:[
      {name:'Lobo Batedor', hp:600, atk:75, sprite:'assets/enemies/shadow-wolf/single-1.png'},
      {name:'Lobo Sombrio', hp:1250, atk:105, sprite:'assets/enemies/shadow-wolf/single-1.png'}
    ] },
  { title:'Corredor Amaldiçoado', scene:3, enemies:[
      {name:'Espectro Menor', hp:650, atk:90, sprite:'assets/enemies/cursed-wraith/single-1.png'},
      {name:'Espectro Menor', hp:650, atk:90, sprite:'assets/enemies/cursed-wraith/single-1.png'},
      {name:'Espectro Uivante', hp:1900, atk:140, sprite:'assets/enemies/cursed-wraith/single-1.png'}
    ] },
  { title:'Trono do Dragão', scene:4, enemies:[
      {name:'Servo das Trevas', hp:850, atk:100, sprite:'assets/enemies/cursed-wraith/single-1.png'},
      {name:'Servo das Trevas', hp:850, atk:100, sprite:'assets/enemies/cursed-wraith/single-1.png'},
      {name:'Dragão Carmesim', hp:4500, atk:230, sprite:'assets/enemies/crimson-dragon/single-1.png'}
    ] },
  /* ---- Masmorra 2 · fases DEMO (mundos oficiais serão criados depois) ---- */
  { title:'Dunas de Meriady (DEMO)', scene:1, objective:{type:'collect',count:40}, obstacles:{stone:3}, enemies:[
      {name:'Chacal das Dunas', hp:1400, atk:150, sprite:'assets/enemies/shadow-wolf/single-1.png', tint:'sepia(.85) saturate(2.4) hue-rotate(-18deg) brightness(1.12)'},
      {name:'Guardião de Areia', hp:2600, atk:185, sprite:'assets/enemies/stone-sentinel/single-1.png', tint:'sepia(.6) saturate(1.8) brightness(1.15)'}
    ] },
  { title:'Abismo das Sombras (DEMO)', scene:3, objective:{type:'survive',turns:8}, obstacles:{ice:4}, enemies:[
      {name:'Sombra Voraz', hp:1700, atk:170, sprite:'assets/enemies/cursed-wraith/single-1.png', tint:'brightness(.55) saturate(1.6) hue-rotate(40deg) drop-shadow(0 0 10px rgba(125,36,95,.8))'},
      {name:'Sombra Voraz', hp:1700, atk:170, sprite:'assets/enemies/cursed-wraith/single-1.png', tint:'brightness(.55) saturate(1.6) hue-rotate(40deg) drop-shadow(0 0 10px rgba(125,36,95,.8))'}
    ] },
  { title:'Trono Sombrio (DEMO)', scene:4, obstacles:{ice:2,stone:2}, enemies:[
      {name:'Servo do Vazio', hp:1200, atk:150, sprite:'assets/enemies/cursed-wraith/single-1.png', tint:'brightness(.45) hue-rotate(60deg)'},
      {name:'Dragão das Sombras', hp:5600, atk:270, sprite:'assets/enemies/crimson-dragon/single-1.png', tint:'hue-rotate(230deg) saturate(1.3) brightness(.72) drop-shadow(0 0 14px rgba(125,36,95,.9))'}
    ] }
];

/* ---------- ADAPTIVE POLYPHONIC AUDIO ENGINE (Web Audio API) ---------- */
let actx = null;
let musicMuted = localStorage.getItem('12r_muted') === 'true';
let musicTimer = null;
let currentTrack = -1;
function storedVolume(key,fallback){
  const value=Number(localStorage.getItem(key)??fallback);
  return Number.isFinite(value)?Math.max(0,Math.min(100,value))/100:fallback/100;
}
let masterVolume = storedVolume('12r_volume',70);
let musicVolume = storedVolume('12r_music_volume',Number(V10.audio?.music ?? 65));
let sfxVolume = storedVolume('12r_sfx_volume',Number(V10.audio?.sfx ?? 85));
let particlesEnabled = localStorage.getItem('12r_particles') !== 'false';
let hapticsEnabled = localStorage.getItem('12r_haptics') !== 'false';
const storedMotionPreference=localStorage.getItem('12r_motion');
let reducedMotion = storedMotionPreference==='reduced'||(storedMotionPreference===null&&matchMedia('(prefers-reduced-motion: reduce)').matches);
let graphicsQuality = V10.quality?.values?.includes(localStorage.getItem('12r_quality'))?localStorage.getItem('12r_quality'):'auto';
let highContrast = localStorage.getItem('12r_high_contrast') === '1';
let largeText = localStorage.getItem('12r_large_text') === '1';
let reduceFlashes = localStorage.getItem('12r_reduce_flashes') === '1';
let masterBus = null;
let musicBus = null;
let sfxBus = null;
let musicGeneration = 0;
let musicBarIndex = 0;
let musicMoodMode = 0;
let musicBossLayer = false;
let musicFinalBoss = false;
const activeMusicNodes = new Set();

function ensureAudio(){
  if(!actx){
    try{
      actx = new (window.AudioContext||window.webkitAudioContext)();
      masterBus = actx.createGain();
      const compressor = actx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = .012;
      compressor.release.value = .28;
      musicBus = actx.createGain();
      sfxBus = actx.createGain();
      musicBus.gain.value = .72;
      sfxBus.gain.value = .9;
      musicBus.connect(masterBus);
      sfxBus.connect(masterBus);
      masterBus.connect(compressor);
      compressor.connect(actx.destination);
    }catch(e){ return null; }
  }
  if(actx.state==='suspended') actx.resume();
  return actx;
}

function beep(freq, dur, type, vol, delay){
  const ctx = ensureAudio();
  if(!ctx || musicMuted) return;
  const t0 = ctx.currentTime + (delay||0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type||'triangle';
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001,(vol||0.16)*masterVolume*sfxVolume), t0+0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
  osc.connect(gain); gain.connect(sfxBus||ctx.destination);
  osc.start(t0); osc.stop(t0+dur+0.03);
}
function chord(freqs, dur, type, vol, delay){ freqs.forEach(f=>beep(f,dur,type,vol,delay)); }

function sfxSelect(){ beep(660,0.08,'triangle',0.11); }
function sfxGemTap(){ beep(880,0.05,'sine',0.08); }
function sfxInvalid(){ beep(180,0.12,'sawtooth',0.08); }
function sfxMatch(step){ const base=520+Math.min(step,6)*70; beep(base,0.10,'triangle',0.13); beep(base*1.5,0.09,'sine',0.08,0.05); }
/* v9.2 · Impactos redesenhados: "thump" de ruído filtrado + corpo grave em seno —
   sem as ondas quadradas/serra cruas que soavam ásperas e metálicas. */
function sfxHit(){
  noiseBurst({dur:.16,vol:.2,filter:'lowpass',freq:1100,freqEnd:180,attack:.004});
  beep(180,0.08,'sine',0.12); beep(120,0.11,'triangle',0.08,0.02);
}
function sfxPlayerHit(){
  noiseBurst({dur:.22,vol:.18,filter:'lowpass',freq:700,freqEnd:120,attack:.006});
  beep(140,0.13,'sine',0.11); beep(95,0.16,'triangle',0.07,0.03);
}
function sfxPassive(){ chord([523,659,784],0.18,'triangle',0.10); }
function sfxUltimate(){ chord([392,523,659,784,988],0.28,'triangle',0.11); beep(1568,0.22,'sine',0.09,0.14); }
function sfxHeroSignature(id,isUltimate=false){
  const signatures={
    luz:{notes:[784,1175,1568],type:'sine'},
    humanos:{notes:[659,988,1319],type:'triangle'},
    agua:{notes:[392,587,784],type:'sine'},
    fogo:{notes:[196,294,440],type:'sawtooth'},
    natureza:{notes:[523,659,784],type:'triangle'},
    terra:{notes:[147,220,330],type:'sawtooth'},
    areia:{notes:[440,554,659],type:'triangle'},
    sombras:{notes:[175,262,349],type:'sawtooth'},
    raio:{notes:[880,1108,1318],type:'sawtooth'},
    vento:{notes:[587,880,1046],type:'sine'},
    chuvas:{notes:[220,330,392],type:'triangle'},
    gelo:{notes:[698,1046,1397],type:'sine'}
  };
  const sig=signatures[id]||signatures.luz;
  sig.notes.forEach((note,i)=>beep(note*(isUltimate?1.18:1),isUltimate?.22:.13,sig.type,isUltimate?.10:.065,i*.055));
}
/* v9.1 · SFX elementais: cada reino soa como seu elemento (ruído filtrado + osciladores) */
function noiseBurst({dur=0.3,vol=0.2,delay=0,filter='bandpass',freq=800,q=1,freqEnd=null,attack=0.012}={}){
  const ctx=ensureAudio();
  if(!ctx||musicMuted) return;
  const t0=ctx.currentTime+delay;
  const len=Math.max(1,Math.floor(ctx.sampleRate*dur));
  const buf=ctx.createBuffer(1,len,ctx.sampleRate);
  const data=buf.getChannelData(0);
  for(let i=0;i<len;i++) data[i]=Math.random()*2-1;
  const src=ctx.createBufferSource(); src.buffer=buf;
  const flt=ctx.createBiquadFilter();
  flt.type=filter; flt.frequency.setValueAtTime(freq,t0); flt.Q.value=q;
  if(freqEnd) flt.frequency.exponentialRampToValueAtTime(Math.max(40,freqEnd),t0+dur);
  const g=ctx.createGain();
  g.gain.setValueAtTime(0.0001,t0);
  g.gain.linearRampToValueAtTime(Math.max(0.0001,vol*masterVolume*sfxVolume),t0+attack);
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  src.connect(flt); flt.connect(g); g.connect(sfxBus||ctx.destination);
  src.start(t0); src.stop(t0+dur+0.05);
}
const ELEMENTAL_SFX={
  fogo(){ noiseBurst({dur:.5,vol:.3,filter:'lowpass',freq:2200,freqEnd:300}); for(let i=0;i<5;i++) noiseBurst({dur:.05,vol:.12,delay:.08+i*.07,filter:'highpass',freq:2500}); },
  agua(){ noiseBurst({dur:.35,vol:.28,filter:'bandpass',freq:900,q:1.2,freqEnd:350}); beep(1200,.07,'sine',.09,.18); beep(1550,.06,'sine',.07,.28); },
  vento(){ noiseBurst({dur:.7,vol:.22,filter:'bandpass',freq:500,q:2,freqEnd:1600,attack:.15}); },
  raio(){ noiseBurst({dur:.08,vol:.32,filter:'highpass',freq:1500}); noiseBurst({dur:.6,vol:.3,delay:.06,filter:'lowpass',freq:900,freqEnd:120}); },
  gelo(){ [1568,1976,2349].forEach((f,i)=>beep(f,.14,'sine',.09,i*.06)); noiseBurst({dur:.25,vol:.1,filter:'highpass',freq:5000,attack:.02}); },
  chuvas(){ noiseBurst({dur:.9,vol:.16,filter:'bandpass',freq:3000,q:.7,attack:.2}); beep(220,.3,'sine',.06,.1); },
  terra(){ noiseBurst({dur:.5,vol:.3,filter:'lowpass',freq:220,freqEnd:60}); beep(65,.4,'sawtooth',.12,.02); },
  areia(){ noiseBurst({dur:.55,vol:.2,filter:'highpass',freq:1800,attack:.1}); noiseBurst({dur:.3,vol:.12,delay:.25,filter:'highpass',freq:2600}); },
  sombras(){ beep(87,.5,'sawtooth',.1); beep(92,.5,'sawtooth',.08,.03); noiseBurst({dur:.6,vol:.12,filter:'lowpass',freq:400,attack:.25}); },
  luz(){ [784,1046,1318,1568].forEach((f,i)=>beep(f,.12,'sine',.08,i*.05)); noiseBurst({dur:.3,vol:.06,filter:'highpass',freq:6000,attack:.05}); },
  natureza(){ noiseBurst({dur:.3,vol:.14,filter:'bandpass',freq:1200,q:2}); beep(880,.08,'triangle',.08,.12); beep(1174,.08,'triangle',.07,.2); },
  humanos(){ beep(1046,.05,'square',.07); beep(784,.05,'square',.06,.12); beep(1568,.2,'sine',.08,.24); }
};
function sfxElemental(id){ try{ ELEMENTAL_SFX[id]?.(); }catch(e){} }

/* v9.1 · Cut-in cinematográfico de ultimate: a carta do herói cruza a tela */
function showUltimateCutin(k,a){
  if(reducedMotion) return;
  let layer=document.getElementById('cutinLayer');
  if(!layer){
    layer=document.createElement('div');
    layer.id='cutinLayer';
    layer.className='cutin-layer';
    document.body.appendChild(layer);
  }
  layer.innerHTML=`
    <div class="cutin-bg"></div>
    <div class="cutin-card"><img src="${IMGL(k.cardThumb||k.img)}"${IMGF(k.cardThumb||k.img)} alt=""></div>
    <div class="cutin-name"><span>${L(k.reino)}</span><b>${L(a.name)}</b></div>`;
  layer.style.setProperty('--cut',k.color);
  layer.classList.remove('show'); void layer.offsetWidth; layer.classList.add('show');
  clearTimeout(layer._t);
  layer._t=setTimeout(()=>layer.classList.remove('show'),1050);
}

function sfxPowerStriped(){ beep(720,.1,'sawtooth',.1); beep(1080,.14,'sine',.08,.05); }
function sfxPowerWrapped(){ beep(180,.16,'square',.12); beep(90,.22,'sawtooth',.1,.04); }
function sfxPowerPrism(){ [523,659,784,1046,1318].forEach((f,i)=>beep(f,.12,'sine',.07,i*.04)); }
function sfxPowerCreated(){ beep(880,.08,'triangle',.09); beep(1320,.12,'sine',.07,.06); }
function sfxVictory(){ [523,659,784,1046].forEach((f,i)=>beep(f,0.18,'triangle',0.11,i*0.13)); }
function sfxDefeat(){ [392,349,311,262].forEach((f,i)=>beep(f,0.24,'sawtooth',0.10,i*0.16)); }

const SOUNDTRACKS = [
  {bpm:88,root:55,type:'sine',pad:'triangle',progression:[[0,3,7],[5,8,12],[3,7,10],[7,10,14]],motif:[7,10,12,10,7,5,3,5]},
  {bpm:92,root:52,type:'triangle',pad:'sine',progression:[[0,3,7],[3,7,10],[8,12,15],[5,8,12]],motif:[7,12,10,7,5,7,3,5]},
  {bpm:84,root:50,type:'sine',pad:'triangle',progression:[[0,3,7],[8,12,15],[5,8,12],[7,10,14]],motif:[12,10,7,5,7,3,5,7]},
  {bpm:94,root:47,type:'triangle',pad:'sine',progression:[[0,3,7],[5,8,12],[7,10,14],[3,7,10]],motif:[3,7,10,7,12,10,7,5]},
  {bpm:126,root:45,type:'sawtooth',pad:'triangle',boss:true,progression:[[0,3,7],[8,12,15],[5,8,12],[7,10,14]],motif:[0,7,12,15,14,10,7,19,15,14,12,10,7,5,3,7]}
];
function midiToFreq(note){ return 440*Math.pow(2,(note-69)/12); }

function musicTone(freq,duration,type,volume,startTime,attack=.025){
  const ctx=ensureAudio();
  if(!ctx||musicMuted||!musicBus) return;
  const osc=ctx.createOscillator();
  const gain=ctx.createGain();
  const filter=ctx.createBiquadFilter();
  filter.type='lowpass';
  filter.frequency.value=type==='sawtooth'?1350:2200;
  osc.type=type||'triangle';
  osc.frequency.setValueAtTime(freq,startTime);
  gain.gain.setValueAtTime(.0001,startTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*masterVolume*musicVolume),startTime+attack);
  gain.gain.exponentialRampToValueAtTime(.0001,startTime+duration);
  osc.connect(filter); filter.connect(gain); gain.connect(musicBus);
  activeMusicNodes.add(osc);
  osc.onended=()=>activeMusicNodes.delete(osc);
  osc.start(startTime); osc.stop(startTime+duration+.04);
}

function getMusicIntensity(){
  if(musicMoodMode===1) return .35;
  if(musicMoodMode===2) return 1;
  if(!enemies.length) return .45;
  const enemyRatio=enemies.reduce((sum,e)=>sum+Math.max(0,e.hp),0)/Math.max(1,enemies.reduce((sum,e)=>sum+e.maxHp,0));
  const playerRatio=playerHP/PLAYER_MAX_HP;
  const bossBoost=musicBossLayer?(musicFinalBoss?.32:.2):0;
  return Math.max(.35,Math.min(1,.45+(1-enemyRatio)*.22+(1-playerRatio)*.2+bossBoost));
}

function scheduleMusicBar(sceneIdx,generation){
  if(generation!==musicGeneration||musicMuted||currentTrack!==sceneIdx) return;
  const ctx=ensureAudio();
  if(!ctx) return;
  const track=SOUNDTRACKS[sceneIdx]||SOUNDTRACKS[0];
  const intensity=getMusicIntensity();
  const beat=60/track.bpm;
  const barDuration=beat*4;
  const start=ctx.currentTime+.06;
  const chordNotes=track.progression[musicBarIndex%track.progression.length];
  const variation=(musicBarIndex%8>=4)?12:0;

  chordNotes.forEach((interval,voice)=>{
    musicTone(midiToFreq(track.root+interval),barDuration*.94,track.pad,.018+voice*.002,start,.12);
  });
  for(let beatIndex=0;beatIndex<4;beatIndex++){
    const bassInterval=chordNotes[beatIndex%2===0?0:1]||0;
    musicTone(midiToFreq(track.root-12+bassInterval),beat*.72,'triangle',.026,start+beatIndex*beat,.018);
    musicTone(72,beat*.18,'sine',.018*intensity,start+beatIndex*beat,.006);
  }
  track.motif.forEach((interval,step)=>{
    const isRest=((step+musicBarIndex)%7===6)&&intensity<.75;
    if(isRest) return;
    const octave=(step%4===3&&intensity>.7)?12:0;
    musicTone(midiToFreq(track.root+variation+interval+octave),beat*.38,track.type,.017+.012*intensity,start+step*beat/2,.012);
  });
  if(intensity>.58){
    [1,3].forEach(beatIndex=>musicTone(1550,beat*.055,'square',.006*intensity,start+beatIndex*beat,.003));
  }
  if(intensity>.82){
    [0,2].forEach(beatIndex=>musicTone(midiToFreq(track.root+24+chordNotes[2]),beat*.28,'sine',.010,start+beatIndex*beat,.008));
  }
  if(track.boss){
    for(let step=0;step<8;step++){
      const at=start+step*beat/2;
      musicTone(midiToFreq(track.root-24+(step%4===3?7:0)),beat*.28,'sawtooth',.022+.012*intensity,at,.005);
      if(step%2===0) musicTone(54,beat*.12,'triangle',.025*intensity,at,.003);
      if(step%2===1) musicTone(2100,beat*.045,'square',.008*intensity,at,.002);
    }
    [0,1.5,2,3.5].forEach(position=>musicTone(midiToFreq(track.root+24+chordNotes[2]),beat*.18,'sine',.012,start+position*beat,.006));
  }
  if(musicBossLayer && !track.boss){
    [0,1,2,3].forEach(i=>musicTone(midiToFreq(track.root+19+(i%2?7:0)),beat*.3,'sine',.014,start+i*beat,.02));
    if(musicFinalBoss) [0,1.5,2.5,3.5].forEach(p=>musicTone(midiToFreq(track.root+31),beat*.22,'triangle',.012,start+p*beat,.01));
  }
  musicBarIndex++;
  musicTimer=setTimeout(()=>scheduleMusicBar(sceneIdx,generation),Math.max(120,barDuration*1000-90));
}

function playStageMusic(sceneIdx){
  stopMusic();
  const isBoss=Boolean(bossRushMode || (worldRun?.active && worldRun.nivel===5));
  musicBossLayer=isBoss;
  musicFinalBoss=Boolean(
    isBoss && (
      (bossRushMode && bossRushIdx===BOSS_RUSH_ORDER.length-1) ||
      (worldRun?.active && worldRun.fase===WORLDS[0].fases.length-1)
    )
  );
  currentTrack=musicFinalBoss?4:Math.min(3,sceneIdx);
  if(musicMuted) return;
  ensureAudio();
  musicBarIndex=0;
  const generation=musicGeneration;
  scheduleMusicBar(currentTrack,generation);
}
function stopMusic(){
  musicGeneration++;
  if(musicTimer){ clearTimeout(musicTimer); musicTimer=null; }
  activeMusicNodes.forEach(node=>{ try{ node.stop(); }catch(e){} });
  activeMusicNodes.clear();
}
function toggleMusic(){
  musicMuted=!musicMuted;
  localStorage.setItem('12r_muted',musicMuted?'true':'false');
  const btn=document.getElementById('muteBtn');
  if(btn) btn.textContent=musicMuted?'🔇':'🔊';
  if(musicMuted) stopMusic(); else if(currentTrack>=0) playStageMusic(currentTrack);
}
function cycleMusicMood(){
  musicMoodMode=(musicMoodMode+1)%3;
  updateBattleToolLabels();
  setBattleStatus(T('Trilha dinâmica: ','Dynamic soundtrack: ','Banda sonora dinámica: ')+[T('automática','automatic','automática'),T('calma','calm','tranquila'),T('épica','epic','épica')][musicMoodMode]+'.','system');
}

const SIZE = 6;
const BASE_ATK = 12;
let PLAYER_MAX_HP = 4000; // v9.1: recalculado a cada batalha = fator da dificuldade × soma do ataque das 4 cartas

let board = [];
let powerUps = {};
let lastSwap = null;
let forcedResolution = null;
let selected = null;
let busy = false;
let gamePaused = false;
const BATTLE_PHASES=new Set(V10.battle?.phases||['idle','resolving','heroes','enemies','transition','paused']);
let battlePhase=V10.battle?.defaultPhase||'idle';
function phaseLabel(phase){
  return ({idle:T('Sua jogada','Your move','Tu jugada'),resolving:T('Resolvendo combinação','Resolving match','Resolviendo combinación'),heroes:T('Ataque dos heróis','Heroes attacking','Ataque de héroes'),enemies:T('Turno inimigo','Enemy turn','Turno enemigo'),transition:T('Transição','Transition','Transición'),paused:T('Pausado','Paused','Pausado')})[phase]||phase;
}
const COMBAT_ATTACK_SFX={
  luz(){ chord([1046,1318,1568],.14,'sine',.075); noiseBurst({dur:.18,vol:.045,filter:'highpass',freq:5200}); },
  humanos(){ beep(392,.08,'triangle',.08); beep(587,.12,'triangle',.075,.07); beep(784,.16,'sine',.07,.14); },
  agua(){ noiseBurst({dur:.18,vol:.09,filter:'bandpass',freq:1200,freqEnd:500}); beep(1480,.07,'sine',.08,.12); beep(1900,.05,'sine',.055,.2); },
  fogo(){ noiseBurst({dur:.24,vol:.12,filter:'lowpass',freq:1900,freqEnd:320}); beep(110,.12,'sawtooth',.06); },
  natureza(){ beep(523,.12,'triangle',.08); beep(659,.12,'triangle',.07,.09); noiseBurst({dur:.16,vol:.05,filter:'bandpass',freq:1700}); },
  terra(){ beep(92,.18,'sine',.1); noiseBurst({dur:.2,vol:.1,filter:'lowpass',freq:260,freqEnd:70}); },
  areia(){ noiseBurst({dur:.28,vol:.1,filter:'highpass',freq:1800,freqEnd:900,attack:.05}); beep(330,.1,'triangle',.06,.16); },
  sombras(){ beep(110,.22,'sawtooth',.07); noiseBurst({dur:.25,vol:.07,filter:'lowpass',freq:430,freqEnd:100,attack:.08}); },
  raio(){ noiseBurst({dur:.045,vol:.18,filter:'highpass',freq:1800}); beep(1650,.12,'square',.065,.05); },
  vento(){ noiseBurst({dur:.32,vol:.1,filter:'bandpass',freq:500,q:2,freqEnd:1800,attack:.08}); },
  chuvas(){ noiseBurst({dur:.26,vol:.1,filter:'bandpass',freq:2800,q:.8,attack:.04}); beep(260,.16,'sine',.055,.1); },
  gelo(){ chord([1318,1760,2093],.16,'sine',.07); noiseBurst({dur:.16,vol:.045,filter:'highpass',freq:6000}); }
};
const BEAST_ATTACK_SFX={
  lobo(){ noiseBurst({dur:.16,vol:.16,filter:'bandpass',freq:900,freqEnd:260,attack:.01}); beep(120,.18,'sawtooth',.06); },
  slime(){ noiseBurst({dur:.28,vol:.13,filter:'lowpass',freq:480,freqEnd:90,attack:.04}); },
  soldado(){ beep(220,.1,'triangle',.07); beep(165,.16,'triangle',.06,.1); },
  default(){ noiseBurst({dur:.15,vol:.11,filter:'lowpass',freq:700,freqEnd:160}); }
};
function sfxCombatAttack(id,side='hero'){
  const key=String(id||'').toLowerCase();
  if(side==='enemy') return BEAST_ATTACK_SFX[key.includes('lobo')?'lobo':key.includes('slime')?'slime':key.includes('soldado')?'soldado':'default']();
  (COMBAT_ATTACK_SFX[key]||COMBAT_ATTACK_SFX.humanos)();
}
function setBattlePhase(next){
  if(!BATTLE_PHASES.has(next)) return;
  battlePhase=next;
  document.body.dataset.battlePhase=next;
  const chip=document.getElementById('battlePhaseChip');
  if(chip) chip.textContent=phaseLabel(next);
}
function canAcceptPlayerInput(){
  const blockingUi=document.getElementById('storyLayer')?.classList.contains('show')||
    Boolean(document.querySelector('.overlay.show'))||
    document.getElementById('cardModal')?.classList.contains('show')||
    Boolean(document.querySelector('.pro-overlay.show:not(#abilityPickerScreen):not(#pauseScreen)'));
  return battlePhase==='idle'&&!busy&&!gamePaused&&!stageTransitioning&&playerHP>0&&!blockingUi;
}
let comboStep = 0;
let stageIndex = 0;
let enemies = [];
let playerHP = PLAYER_MAX_HP;
let stageTransitioning = false;
let defeatFinalized = false;
let combatEpoch = 0;
const combatTimers = new Set();
const combatWaits = new Set();
function scheduleCombat(fn,delay=0,epoch=combatEpoch){
  const record={timerId:0,remaining:Math.max(0,delay),startedAt:0,cancelled:false,run:null};
  const arm=()=>{
    if(record.cancelled||epoch!==combatEpoch){ combatTimers.delete(record); return; }
    if(gamePaused||battlePhase==='paused') return;
    record.startedAt=performance.now();
    record.timerId=window.setTimeout(record.run,record.remaining);
  };
  record.run=()=>{
    record.timerId=0;
    if(record.cancelled||epoch!==combatEpoch){ combatTimers.delete(record); return; }
    if(gamePaused||battlePhase==='paused') return;
    combatTimers.delete(record);
    fn();
  };
  combatTimers.add(record);
  arm();
  return record;
}
function pauseCombatTimers(){
  const now=performance.now();
  combatTimers.forEach(record=>{
    if(!record.timerId) return;
    clearTimeout(record.timerId);
    record.timerId=0;
    record.remaining=Math.max(0,record.remaining-(now-record.startedAt));
  });
}
function resumeCombatTimers(){
  combatTimers.forEach(record=>{
    if(record.cancelled||record.timerId) return;
    record.startedAt=performance.now();
    record.timerId=window.setTimeout(record.run,record.remaining);
  });
}
function resetCombatSchedule(){
  combatEpoch++;
  combatTimers.forEach(record=>{
    record.cancelled=true;
    if(record.timerId) clearTimeout(record.timerId);
  });
  combatTimers.clear();
  /* Desbloqueia promises pausáveis do turno antigo. Sem isto, reiniciar no
     meio de uma cascata deixa a coroutine anterior viva para sempre. */
  combatWaits.forEach(cancel=>cancel());
  combatWaits.clear();
  document.querySelectorAll('.energy-orb').forEach(orb=>orb.remove());
  document.querySelectorAll('#specialFxLayer [data-fx]').forEach(effect=>releaseCombatFx(effect));
}

let ACTIVE = [];
let heroProgress = {};
let firedTiers = {};
let heroReady = {};
let heroActiveQueue = {};
let pendingRoomPassives = [];
let roomClearScheduled = false;
/* A sala só passa a existir para efeitos persistentes depois que a abertura
   terminou. Isso impede que a aura de uma carga preservada apareça na tela
   de transição ou sobre a fala de entrada da próxima sala. */
let missionFieldStarted = false;
let playerShield = 0;
let enemyDots = [];
let enemyStunTurns = 0;
let atkBuffTurns = 0;
let atkBuffMult = 1;
let manualTarget = null;
let lastDamageDealt = 0;
let heroLastDamage = {};
let lastEnemyAttacker = null;
let stageTookDamage = false;
let survivorStageStartHP = 0;
let nextAttackMult = {};
let enemyBlindTurns = 0;
let shieldTurns = 0;
let reflectTurns = 0;
let invulnerableTurns = 0;
let lifestealCharges = 0;
let lifestealMult = 0;
let lastDragonRitual = {before:0,after:0,converted:0};
let battleHistory = [];
let battleHistorySeq = 0;
let qaRitualTriggered = false;
let incinerateActive = false;
let incinerateStacks = 0;
let incineratePhaseKey = null;
let enemyVulnerableTurns = 0;
let enemyVulnerableMult = 1;
let stoneArmorTurns = 0;
let stoneArmorReduction = .5;
let stoneArmorReflect = .5;
let golemAllies = 0;
let harpyAllies = 0;   // v9: harpias da Sophitia (máx. 5, ecoam 20% do dano dela)
let heroEmpower = {};  // v9: cargas de Full Power por herói {idx:{left,mult}}

/* v9.1 · Dificuldade selecionável */
/* HP do jogador por dificuldade (regra oficial):
   Fácil = 50×(soma do ataque das 4 cartas) · Normal = 25× · Pesadelo = 10× */
const DIFFICULTY_MULTS={
  facil:{hp:.85,atk:.85,hpFactor:50},
  normal:{hp:1,atk:1,hpFactor:30},
  dificil:{hp:1,atk:1,hpFactor:30},
  pesadelo:{hp:1.15,atk:1.15,hpFactor:15}
};
/* Regras extras por dificuldade (oficiais):
   FÁCIL — blocos e power-ups do tabuleiro continuam de uma missão para a outra até o
   final da fase (o tabuleiro não é reiniciado entre missões vencidas).
   NORMAL — sem mudanças.
   DIFÍCIL — tudo do Normal + TODOS os inimigos da missão atacam, um de cada vez,
   após a sua jogada.
   PESADELO — idem Difícil; além disso obstáculos criados pela fase/inimigos são
   permanentes e debuffs do tabuleiro não expiram durante a missão. */
function allEnemiesAttackMode(){ return difficulty==='dificil'||difficulty==='pesadelo'; }
function persistentObstaclesMode(){ return difficulty==='pesadelo'; }
let carryBoardNext=false; /* Fácil: próxima loadStage mantém o tabuleiro atual */
function computePlayerMaxHP(){
  const soma=ACTIVE.reduce((acc,i)=>acc+heroAtkFor(i),0)||80;
  allianceBonus=computeAllianceBonus(ACTIVE);
  /* Fórmula OFICIAL sem piso artificial: Fácil 50× · Normal 30× · Pesadelo 15× a soma de ATK
     (+ bônus de HP quando a equipe inteira é da mesma aliança) */
  return Math.max(60,Math.round((DIFFICULTY_MULTS[difficulty]?.hpFactor||25)*soma*(allianceBonus.hp||1)));
}
let difficulty=localStorage.getItem('12r_difficulty')||'normal';
if(!DIFFICULTY_MULTS[difficulty]) difficulty='normal';
function applyDifficultyUI(){
  document.querySelectorAll('#diffGroup [data-diff]').forEach(b=>b.classList.toggle('active',b.dataset.diff===difficulty));
}

/* v9.1 · Moedas */
/* Valores persistidos nunca entram na economia sem validação. Um
   localStorage corrompido não pode produzir NaN e contaminar a interface. */
function storedNonnegativeInteger(key,max=1_000_000_000){
  const value=Number(localStorage.getItem(key));
  return Number.isSafeInteger(value)&&value>=0&&value<=max?value:0;
}
let coins=storedNonnegativeInteger('12r_coins');
function grantCoins(n){
  const delta=Number(n);
  if(!Number.isFinite(delta)||!delta) return;
  coins=Math.min(1_000_000_000,Math.max(0,coins+Math.round(delta)));
  localStorage.setItem('12r_coins',String(coins));
  updateCoinBadge();
}
function updateCoinBadge(){
  const el=document.getElementById('coinBadge');
  if(el) el.textContent=`🪙 ${coins}`;
  const el2=document.getElementById('shopCoins');
  if(el2) el2.textContent=`🪙 ${coins}`;
}
const DAILY_BOOT_REQUESTED=new URLSearchParams(location.search).get('daily')==='1';
let dailyRunMode=DAILY_BOOT_REQUESTED;

/* v9.1 · XP e nível por herói (Lv 1-10; +2 de ataque por nível) */
/* v9.1 · XP e nível de PERFIL (as cartas não sobem de nível).
   O nível do perfil dá um bônus global sutil: +1 de ataque a cada 3 níveis. */
let profileXp=storedNonnegativeInteger('12r_pxp');
try{ // migração: XP antigo por herói vira XP de perfil (uma única vez)
  const legado=JSON.parse(localStorage.getItem('12r_xp')||'null');
  if(legado&&typeof legado==='object'){
    const legacyXp=Object.values(legado).reduce((total,entry)=>{
      const value=Number(entry);
      return total+(Number.isFinite(value)&&value>0?Math.round(value):0);
    },0);
    profileXp=Math.min(1_000_000_000,profileXp+legacyXp);
    localStorage.removeItem('12r_xp');
    localStorage.setItem('12r_pxp',String(profileXp));
  }
}catch(e){}
function profileLevel(){ return Math.min(99, 1+Math.floor(Math.sqrt(profileXp/120))); }
function profileXpForNext(){ const next=profileLevel()+1; return next>99?null:Math.pow(next-1,2)*120; }
function heroAtkFor(idx){ const k=KINGDOMS[idx]; return (k.atk||BASE_ATK)+Math.floor((profileLevel()-1)/3); }
function grantXp(amount){
  const before=profileLevel();
  const value=Number(amount);
  if(!Number.isFinite(value)||value<=0) return [];
  profileXp=Math.min(1_000_000_000,profileXp+Math.max(0,Math.round(value*4))); // 4 heróis contribuíam antes; mantém o ritmo
  localStorage.setItem('12r_pxp',String(profileXp));
  const after=profileLevel();
  return after>before?[T(`Perfil subiu para Lv ${after}!`,`Profile reached Lv ${after}!`,`¡Perfil subió a Nv ${after}!`)]:[];
}

/* v9.1 · Conquistas */
const ACHIEVEMENTS=[
  {id:'first-win', nome:'Primeira Vitória', desc:'Vença uma fase.', icon:'🏆', en:{nome:'First Victory', desc:'Win a stage.'}},
  {id:'no-damage', nome:'Intocável', desc:'Vença uma fase sem sofrer dano.', icon:'🛡️', en:{nome:'Untouchable', desc:'Win a stage without taking damage.'}},
  {id:'combo8', nome:'Mestre do Combo', desc:'Alcance um combo ×8.', icon:'🔥', en:{nome:'Combo Master', desc:'Reach an x8 combo.'}},
  {id:'powerup10', nome:'Artífice', desc:'Crie 10 power-ups em uma run.', icon:'💠', en:{nome:'Artificer', desc:'Craft 10 power-ups in one run.'}},
  {id:'colecionador', nome:'Colecionador', desc:'Veja as 20 cartas na galeria.', icon:'🎴', en:{nome:'Collector', desc:'View all 20 cards in the gallery.'}},
  {id:'bestia10', nome:'Caçador de Ygdria', desc:'Encontre 10 personagens do jogo.', icon:'🏹', en:{nome:'Hunter of Ygdria', desc:'Encounter 10 game characters.'}},
  {id:'streak3', nome:'Fiel à Coroa', desc:'Entre no jogo 3 dias seguidos.', icon:'📅', en:{nome:'Loyal to the Crown', desc:'Log in 3 days in a row.'}},
  {id:'lenda', nome:'Lenda de Ygdria', desc:'Complete o Desafio dos Chefes.', icon:'🏆', en:{nome:'Legend of Ygdria', desc:'Complete the Boss Challenge.'}},
  {id:'dungeon', nome:'Regulador de Ygdria', desc:'Conquiste as 10 fases do Reino dos Humanos.', icon:'👑', en:{nome:'Regulator of Ygdria', desc:'Conquer all 10 stages of the Human Realm.'}},
  {id:'stars-all', nome:'Perfeccionista', desc:'Conquiste 3 estrelas em 5 fases.', icon:'⭐', en:{nome:'Perfectionist', desc:'Earn 3 stars on 5 stages.'}},
  {id:'tower5', nome:'Escalador', desc:'Supere o andar 5 da Torre Infinita.', icon:'🗼', en:{nome:'Climber', desc:'Clear floor 5 of the Infinite Tower.'}},
  {id:'tower10', nome:'Lenda da Torre', desc:'Supere o andar 10 da Torre Infinita.', icon:'🌌', en:{nome:'Tower Legend', desc:'Clear floor 10 of the Infinite Tower.'}},
  {id:'dark-court', nome:'Corte Sombria', desc:'Vença uma fase com Berenice das Sombras e Mardogear juntos.', icon:'🌑', en:{nome:'Dark Court', desc:'Win a stage with Shadow Berenice and Mardogear together.'}},
  {id:'rich', nome:'Tesouro Real', desc:'Acumule 500 moedas.', icon:'🪙', en:{nome:'Royal Treasure', desc:'Hoard 500 coins.'}},
  {id:'daily', nome:'Ritual Diário', desc:'Conclua um Desafio Diário.', icon:'📅', en:{nome:'Daily Ritual', desc:'Complete a Daily Challenge.'}},
  {id:'lv5', nome:'Veterano', desc:'Alcance o nível de perfil 5.', icon:'📈', en:{nome:'Veteran', desc:'Reach profile level 5.'}, es:{nome:'Veterano', desc:'Alcanza el nivel de perfil 5.'}}
];
function sanitizeAchievementState(value){
  if(!value||typeof value!=='object'||Array.isArray(value)) return {};
  const allowed=new Set(ACHIEVEMENTS.map(achievement=>achievement.id));
  const clean={};
  Object.entries(value).forEach(([id,state])=>{
    if(!allowed.has(id)||!state||typeof state!=='object'||Array.isArray(state)) return;
    const timestamp=Number(state.t);
    clean[id]={t:Number.isFinite(timestamp)&&timestamp>=0?Math.floor(timestamp):0};
  });
  return clean;
}
let unlockedAch={}; try{ unlockedAch=sanitizeAchievementState(JSON.parse(localStorage.getItem('12r_ach')||'{}')); }catch(e){}
function unlockAch(id){
  if(unlockedAch[id]) return;
  unlockedAch[id]={t:Date.now()};
  localStorage.setItem('12r_ach',JSON.stringify(unlockedAch));
  const a=ACHIEVEMENTS.find(x=>x.id===id);
  if(a){
    const t=document.createElement('div');
    t.className='ach-toast';
    t.innerHTML=`<span class="ach-toast-icon">${a.icon}</span><div><b>${T('Conquista desbloqueada!','Achievement unlocked!','¡Logro desbloqueado!')}</b><br>${L(a.nome)}</div>`;
    document.body.appendChild(t);
    window.setTimeout(()=>t.remove(),3800);
    sfxPassive();
  }
}
function checkAchievements(ctx){
  if(ctx==='stage'){
    unlockAch('first-win');
    if(!stageTookDamage) unlockAch('no-damage');
    if(runStats.maxCombo>=8) unlockAch('combo8');
    if(runStats.powerUps>=10) unlockAch('powerup10');
    const ids=ACTIVE.map(i=>KINGDOMS[i].id);
    if(ids.includes('sombras')&&ids.includes('raio')) unlockAch('dark-court');
    const wstars=worldProg('humanos').stars||{};
    if(Object.values(wstars).filter(s=>s===3).length>=5) unlockAch('stars-all');
    if(profileLevel()>=5) unlockAch('lv5');
  }
  if(ctx==='world-complete') unlockAch('dungeon');
  if(ctx==='daily') unlockAch('daily');
  if(ctx==='tower'){ if(towerFloor>=5) unlockAch('tower5'); if(towerFloor>=10) unlockAch('tower10'); }
  if(coins>=500) unlockAch('rich');
  try{
    if(sanitizeHeroIdList(JSON.parse(localStorage.getItem('12r_seen')||'[]')).length>=20) unlockAch('colecionador');
    if(Object.keys(JSON.parse(localStorage.getItem('12r_bestiary')||'{}')).length>=10) unlockAch('bestia10');
    if(sanitizeLoginState(JSON.parse(localStorage.getItem('12r_login')||'{}')).streak>=3) unlockAch('streak3');
  }catch(e){}
}
function renderQuestsPanel(){
  const el=document.getElementById('profileStats'); if(!el) return;
  const q=questsState();
  let html='<div class="quests-box"><b>📋 '+T('Missões de hoje',"Today's quests",'Misiones de hoy')+'</b>';
  QUESTS_DEF.forEach(d=>{
    const done=q.done.includes(d.id);
    const progAtual=Math.min(d.n,q.prog[d.id]||0);
    html+='<div class="quest-row'+(done?' done':'')+'"><span>'+d.ico+' '+d.nome()+'</span><span>'+(done?'✅':progAtual+'/'+d.n)+' · '+d.premio+'🪙</span></div>';
  });
  html+='</div>';
  html+=renderLoginCalendar();
  let box=document.getElementById('questsPanel');
  if(!box){ box=document.createElement('div'); box.id='questsPanel'; el.parentElement.insertBefore(box,el); }
  box.innerHTML=html;
}
function renderAchievements(){
  renderQuestsPanel();
  renderProfileStats();
  const grid=document.getElementById('achGrid'); if(!grid) return;
  grid.innerHTML=ACHIEVEMENTS.map(a=>`
    <div class="ach-item${unlockedAch[a.id]?' unlocked':''}">
      <span class="ach-icon">${a.icon}</span>
      <div><b>${L(a.nome)}</b><small>${L(a.desc)}</small></div>
      ${unlockedAch[a.id]?'<span class="ach-check">✓</span>':'<span class="ach-lock">🔒</span>'}
    </div>`).join('');
}

/* v9.2 · Loja de consumíveis: 20 itens (uso 'auto' = disparam sozinhos ao entrar na
   batalha; uso 'batalha' = ficam na MOCHILA 🎒 e o jogador decide a hora de usar). */
const SHOP_ITEMS=[
  {id:'shuffle', uso:'auto', nome:'Embaralhamento Extra', desc:'+1 embaralhamento real na próxima batalha.', preco:60, icon:'⟳', en:{nome:'Extra Shuffle', desc:'+1 royal shuffle in your next battle.'}, es:{nome:'Barajado Extra', desc:'+1 barajado real en tu próxima batalla.'}},
  {id:'blessing', uso:'auto', nome:'Bênção dos Reinos', desc:'Comece a próxima batalha com 2 power-ups no tabuleiro.', preco:110, icon:'💠', en:{nome:'Realm Blessing', desc:'Start your next battle with 2 power-ups on the board.'}, es:{nome:'Bendición de los Reinos', desc:'Comienza tu próxima batalla con 2 potenciadores en el tablero.'}},
  {id:'banquete', uso:'auto', nome:'Banquete Real', desc:'+20% de HP máximo do grupo durante toda a próxima batalha.', preco:150, icon:'🍗', en:{nome:'Royal Feast', desc:'+20% max party HP for the whole next battle.'}, es:{nome:'Banquete Real', desc:'+20% de vida máxima del grupo durante toda la próxima batalla.'}},
  {id:'lagrima', uso:'auto', nome:'Lágrima da Eternidade', desc:'Se o grupo cair na próxima batalha, renasce UMA vez com 50% da vida.', preco:250, icon:'💧', en:{nome:'Tear of Eternity', desc:'If your party falls next battle, revive ONCE with 50% HP.'}, es:{nome:'Lágrima de la Eternidad', desc:'Si el grupo cae en la próxima batalla, revive UNA vez con 50% de vida.'}},
  {id:'amuleto', uso:'auto', nome:'Amuleto da Fortuna', desc:'Dobra as moedas ganhas nas vitórias da próxima batalha.', preco:90, icon:'🪙', en:{nome:'Fortune Amulet', desc:'Doubles coins earned from wins in your next battle.'}, es:{nome:'Amuleto de la Fortuna', desc:'Duplica las monedas ganadas en tu próxima batalla.'}},
  {id:'pergaminho', uso:'auto', nome:'Pergaminho do Sábio', desc:'Dobra o XP ganho na próxima batalha.', preco:90, icon:'📜', en:{nome:'Sage Scroll', desc:'Doubles XP earned in your next battle.'}, es:{nome:'Pergamino del Sabio', desc:'Duplica el XP ganado en tu próxima batalla.'}},
  {id:'estandarte', uso:'auto', nome:'Estandarte da Coroa', desc:'+10% de ataque do grupo durante toda a próxima batalha.', preco:140, icon:'👑', en:{nome:'Crown Banner', desc:'+10% party attack for the whole next battle.'}, es:{nome:'Estandarte de la Corona', desc:'+10% de ataque del grupo durante toda la próxima batalla.'}},
  {id:'potion', uso:'batalha', nome:'Poção Vital', desc:'Recupera 600 de vida na hora que você usar.', preco:90, icon:'🧪', en:{nome:'Vital Potion', desc:'Restores 600 HP when you use it.'}, es:{nome:'Poción Vital', desc:'Restaura 600 de vida cuando la usas.'}},
  {id:'vela', uso:'batalha', nome:'Vela da Alma', desc:'Recupera 300 de vida. A cura básica de Ygdria.', preco:60, icon:'🕯', en:{nome:'Soul Candle', desc:'Restores 300 HP. Ygdria\'s basic heal.'}, es:{nome:'Vela del Alma', desc:'Restaura 300 de vida. La cura básica de Ygdria.'}},
  {id:'oleo', uso:'batalha', nome:'Óleo de Lâminas', desc:'+25% de ataque do grupo por 5 turnos.', preco:120, icon:'🗡', en:{nome:'Blade Oil', desc:'+25% party attack for 5 turns.'}, es:{nome:'Aceite de Hojas', desc:'+25% de ataque del grupo por 5 turnos.'}},
  {id:'barreira', uso:'batalha', nome:'Barreira Rúnica', desc:'Ergue um escudo de 500 pontos na hora.', preco:100, icon:'🛡', en:{nome:'Runic Barrier', desc:'Raises a 500-point shield instantly.'}, es:{nome:'Barrera Rúnica', desc:'Levanta un escudo de 500 puntos al instante.'}},
  {id:'ampulheta', uso:'batalha', nome:'Ampulheta de Ygdria', desc:'Congela o tempo: os inimigos perdem o próximo ataque.', preco:130, icon:'⏳', en:{nome:'Hourglass of Ygdria', desc:'Freezes time: enemies skip their next attack.'}, es:{nome:'Reloj de Arena de Ygdria', desc:'Congela el tiempo: los enemigos pierden su próximo ataque.'}},
  {id:'martelo', uso:'batalha', nome:'Martelo do Titã', desc:'Esmaga TODOS os obstáculos do tabuleiro (menos corrupções).', preco:140, icon:'🔨', en:{nome:'Titan Hammer', desc:'Smashes ALL board obstacles (except corruptions).'}, es:{nome:'Martillo del Titán', desc:'Aplasta TODOS los obstáculos del tablero (menos corrupciones).'}},
  {id:'prisma', uso:'batalha', nome:'Prisma Selvagem', desc:'Cria 1 Prisma Real (bomba de cor) no tabuleiro.', preco:160, icon:'🌈', en:{nome:'Wild Prism', desc:'Creates 1 Royal Prism (color bomb) on the board.'}, es:{nome:'Prisma Salvaje', desc:'Crea 1 Prisma Real (bomba de color) en el tablero.'}},
  {id:'marca', uso:'batalha', nome:'Marca do Caçador', desc:'O alvo recebe +30% de dano por 3 turnos.', preco:120, icon:'🎯', en:{nome:'Hunter\'s Mark', desc:'Target takes +30% damage for 3 turns.'}, es:{nome:'Marca del Cazador', desc:'El objetivo recibe +30% de daño por 3 turnos.'}},
  {id:'elixir', uso:'batalha', nome:'Elixir de Aura', desc:'+25 de energia para todos os heróis imediatamente.', preco:130, icon:'💫', en:{nome:'Aura Elixir', desc:'+25 energy for all heroes instantly.'}, es:{nome:'Elixir de Aura', desc:'+25 de energía para todos los héroes al instante.'}},
  {id:'vassoura', uso:'batalha', nome:'Vassoura Arcana', desc:'Varre os debuffs do tabuleiro: véus e Ás de Copas somem.', preco:110, icon:'🧹', en:{nome:'Arcane Broom', desc:'Sweeps board debuffs: veils and Ace of Hearts vanish.'}, es:{nome:'Escoba Arcana', desc:'Barre los debuffs del tablero: velos y As de Copas desaparecen.'}},
  {id:'bomba', uso:'batalha', nome:'Bomba Elemental', desc:'Explode 300 de dano em TODOS os inimigos.', preco:170, icon:'💥', en:{nome:'Elemental Bomb', desc:'Blasts 300 damage on ALL enemies.'}, es:{nome:'Bomba Elemental', desc:'Explota 300 de daño en TODOS los enemigos.'}},
  {id:'dado', uso:'batalha', nome:'Dado do Destino', desc:'Re-embaralha o tabuleiro e garante 1 power-up novo.', preco:80, icon:'🎲', en:{nome:'Die of Fate', desc:'Reshuffles the board and grants 1 new power-up.'}, es:{nome:'Dado del Destino', desc:'Rebaraja el tablero y garantiza 1 power-up nuevo.'}},
  {id:'olho', uso:'batalha', nome:'Olho de Barion', desc:'Revela as gemas ocultas e aponta a melhor jogada.', preco:70, icon:'🧿', en:{nome:'Eye of Barion', desc:'Reveals hidden gems and points out the best move.'}, es:{nome:'Ojo de Barion', desc:'Revela las gemas ocultas y señala la mejor jugada.'}}
];
function sanitizeInventory(value){
  const clean={};
  if(!value||typeof value!=='object'||Array.isArray(value)) return clean;
  const allowed=new Set(SHOP_ITEMS.map(item=>item.id));
  Object.entries(value).forEach(([id,count])=>{
    const amount=Number(count);
    if(allowed.has(id)&&Number.isSafeInteger(amount)&&amount>=0&&amount<=9999) clean[id]=amount;
  });
  return clean;
}
let inventory={};
try{ inventory=sanitizeInventory(JSON.parse(localStorage.getItem('12r_inv')||'{}')); }catch(e){ inventory={}; }
function saveInventory(){ localStorage.setItem('12r_inv',JSON.stringify(inventory)); }
function buyItem(id){
  const item=SHOP_ITEMS.find(i=>i.id===id); if(!item) return;
  if(coins<item.preco){ sfxInvalid(); return; }
  grantCoins(-item.preco);
  inventory[id]=(inventory[id]||0)+1;
  saveInventory();
  renderShop();
  renderMochila();
  sfxSelect();
}
function renderShop(){
  const list=document.getElementById('shopList'); if(!list) return;
  updateCoinBadge();
  list.innerHTML=SHOP_ITEMS.map(i=>`
    <div class="shop-item">
      <span class="shop-icon">${i.icon}</span>
      <div class="shop-copy"><b>${L(i.nome)}</b> <small class="shop-uso">${i.uso==='auto'?T('automático','automatic','automático'):T('usar na batalha','use in battle','usar en batalla')}</small><small>${L(i.desc)}</small><small class="shop-owned">${T('Na mochila','In bag','En la mochila')}: ${inventory[i.id]||0}</small></div>
      <button class="overlay-btn shop-buy" data-item="${i.id}" ${coins<i.preco?'disabled':''}>🪙 ${i.preco}</button>
    </div>`).join('');
  list.querySelectorAll('.shop-buy').forEach(b=>b.addEventListener('click',()=>buyItem(b.dataset.item)));
}
/* Estados dos itens 'auto' da batalha atual */
let eternalReviveCharges=0, coinDoubleRun=false, xpDoubleRun=false, bannerAtkRun=1;
let battleConsumablesDone=false; /* itens auto só na 1ª missão da batalha */
function resetBattleRunConsumables(){
  eternalReviveCharges=0;
  coinDoubleRun=false;
  xpDoubleRun=false;
  bannerAtkRun=1;
  battleConsumablesDone=false;
}
function coinsVitoria(n){ return coinDoubleRun ? n*2 : n; }
function consumeInventoryOnBattleStart(){
  if(battleConsumablesDone) return;
  battleConsumablesDone=true;
  const used=[];
  if(inventory.shuffle>0){ inventory.shuffle--; royalShuffles++; used.push(T('Embaralhamento Extra','Extra Shuffle','Barajado Extra')); }
  if(inventory.blessing>0){ inventory.blessing--; spawnRandomPowerUps(2); used.push(T('Bênção dos Reinos','Realm Blessing','Bendición de los Reinos')); }
  if(inventory.banquete>0){ inventory.banquete--; const extra=Math.round(PLAYER_MAX_HP*0.2); PLAYER_MAX_HP+=extra; playerHP+=extra; updatePlayerHP(); used.push(T('Banquete Real (+20% HP)','Royal Feast (+20% HP)','Banquete Real (+20% HP)')); }
  if(inventory.lagrima>0){ inventory.lagrima--; eternalReviveCharges=1; used.push(T('Lágrima da Eternidade','Tear of Eternity','Lágrima de la Eternidad')); }
  if(inventory.amuleto>0){ inventory.amuleto--; coinDoubleRun=true; used.push(T('Amuleto da Fortuna','Fortune Amulet','Amuleto de la Fortuna')); }
  if(inventory.pergaminho>0){ inventory.pergaminho--; xpDoubleRun=true; used.push(T('Pergaminho do Sábio','Sage Scroll','Pergamino del Sabio')); }
  if(inventory.estandarte>0){ inventory.estandarte--; bannerAtkRun=1.10; used.push(T('Estandarte da Coroa','Crown Banner','Estandarte de la Corona')); }
  if(used.length){ saveInventory(); setBattleStatus(T(`Itens usados: ${used.join(' · ')}.`,`Items used: ${used.join(' · ')}.`,`Objetos usados: ${used.join(' · ')}.`),'support'); }
}
/* 🎒 MOCHILA: itens de batalha usáveis na hora + acesso à loja */
function renderMochila(){
  const list=document.getElementById('mochilaList'); if(!list) return;
  const emBatalha=document.body.classList.contains('game-active');
  const mc=document.getElementById('mochilaCoins'); if(mc) mc.textContent=`🪙 ${coins}`;
  const itens=SHOP_ITEMS.filter(i=>(inventory[i.id]||0)>0);
  if(!itens.length){
    list.innerHTML=`<p class="account-note">${T('Mochila vazia. Visite a loja e prepare-se para as batalhas!','Empty bag. Visit the shop and gear up for battle!','Mochila vacía. ¡Visita la tienda y prepárate!')}</p>`;
    return;
  }
  list.innerHTML=itens.map(i=>`
    <div class="shop-item">
      <span class="shop-icon">${i.icon}</span>
      <div class="shop-copy"><b>${L(i.nome)} ×${inventory[i.id]}</b><small>${L(i.desc)}</small></div>
      ${i.uso==='batalha'
        ? `<button class="overlay-btn shop-buy" data-usar="${i.id}" ${emBatalha?'':'disabled'}>${T('Usar','Use','Usar')}</button>`
        : `<small class="shop-uso">${T('automático','automatic','automático')}</small>`}
    </div>`).join('');
  list.querySelectorAll('[data-usar]').forEach(b=>b.addEventListener('click',()=>usarItemBatalha(b.dataset.usar)));
}
function usarItemBatalha(id){
  if(!document.body.classList.contains('game-active')||(inventory[id]||0)<=0){ sfxInvalid(); return; }
  if(playerHP<=0){ sfxInvalid(); return; }
  const nomeItem=L(SHOP_ITEMS.find(i=>i.id===id)?.nome||id);
  switch(id){
    case 'potion': healPlayer(600); break;
    case 'vela': healPlayer(300); break;
    case 'oleo': addBuff(1.25,5); break;
    case 'barreira': addShield(500); break;
    case 'ampulheta': addStun(1); break;
    case 'martelo': {
      let quebrou=false;
      Object.keys(obstaclesMeta).forEach(key=>{
        if(obstaclesMeta[key].type==='sombra') return;
        const [r,c]=key.split('_').map(Number);
        delete obstaclesMeta[key]; board[r][c]=-1; quebrou=true;
      });
      if(quebrou){ boardRenderCache=null; collapseAndRefill(); renderBoard(); }
      break;
    }
    case 'prisma': spawnRandomColorBombs(1); break;
    case 'marca': enemyVulnerableTurns=Math.max(enemyVulnerableTurns,3); enemyVulnerableMult=Math.max(enemyVulnerableMult,1.3); renderStatusTray(); break;
    case 'elixir': grantTeamEnergy(25); break;
    case 'vassoura': {
      hiddenGems={};
      Object.keys(obstaclesMeta).forEach(key=>{
        if(obstaclesMeta[key].type!=='copas') return;
        const [r,c]=key.split('_').map(Number);
        delete obstaclesMeta[key]; board[r][c]=-1;
      });
      boardRenderCache=null; collapseAndRefill(); renderBoard();
      break;
    }
    case 'bomba': applyDamageToAllEnemies(300,null); break;
    case 'dado': shuffleBoard(false); spawnRandomPowerUps(1); break;
    case 'olho': hiddenGems={}; boardRenderCache=null; renderBoard(); showBestMoveHint(); break;
    default: return;
  }
  inventory[id]--; saveInventory();
  sfxPassive();
  setBattleStatus('🎒 '+nomeItem+' '+T('usado!','used!','¡usado!'),'support');
  renderMochila();
  if(finishRoomIfCleared(T('O item derrotou o último inimigo!','The item defeated the last enemy!','¡El objeto derrotó al último enemigo!'))) return;
}

/* F2-1 · Desafio dos Chefes: os 8 chefes-Carta em sequência, escalando */
let bossRushMode=false, bossRushIdx=0;
const BOSS_RUSH_ORDER=['gareth','cedric','elizier','roland','jules','bernyce','kalander','julius'];
function buildBossRushStage(n){
  const key=BOSS_RUSH_ORDER[Math.min(n,BOSS_RUSH_ORDER.length-1)];
  const c=HUMANOS_CARDS[key];
  const escala=1+n*0.18;
  return {
    title:`${T('Desafio dos Chefes','Boss Challenge','Desafío de Jefes')} · ${n+1}/8`,
    scene:4,
    enemies:[{name:c.nome, hp:Math.round(c.hp*1.6*escala), atk:Math.round(c.atk*1.1*escala), sprite:c.sprite, flip:!!c.flip, cardId:key, isBoss:true, maxHp:Math.round(c.hp*1.6*escala)}]
  };
}
/* Torre de Acesso à Eternidade — survivor em andares. A primeira volta usa
   cada oponente uma única vez, pela primeira aparição no roteiro. Só depois
   de completar todo o elenco o ciclo reinicia, com +20% por volta completa. */
let towerMode=false, towerFloor=1;
let towerPrevDifficulty=null; /* restaura a dificuldade do jogador ao sair da torre */
function towerMonthKey(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); }
function sanitizeNumericRecord(value,{max=1_000_000,keyPattern=/^\d+$/}={}){
  const clean={};
  if(!value||typeof value!=='object'||Array.isArray(value)) return clean;
  Object.entries(value).forEach(([key,entry])=>{
    const number=Number(entry);
    if(keyPattern.test(key)&&Number.isFinite(number)&&number>=0&&number<=max) clean[key]=number;
  });
  return clean;
}
function towerMonthly(){
  try{ return sanitizeNumericRecord(JSON.parse(localStorage.getItem('12r_tower_month')||'{}'),{keyPattern:/^\d{4}-\d{2}$/}); }
  catch(e){ return {}; }
}
function towerRecordMonthly(andaresVencidos){
  const tm=towerMonthly(); const mk=towerMonthKey();
  if((tm[mk]||0)<andaresVencidos){ tm[mk]=andaresVencidos; localStorage.setItem('12r_tower_month',JSON.stringify(tm)); }
}
const TOWER_RANK_REWARDS=[
  ['🥇 Top 1','2000 🪙 + '+'Lenda da Eternidade'],
  ['🥈 Top 2','1500 🪙'],
  ['🥉 Top 3','1200 🪙'],
  ['🏅 Top 10','800 🪙'],
  ['🎖 Top 100','300 🪙']
];
function towerStoryOrder(){
  /* Cada adversário entra uma só vez no primeiro ciclo. O roteiro pode ter
     encontros repetidos, mas a Torre precisa apresentar todo o elenco antes
     de repetir alguém. Os campos oficiais são `nome` (cartas) e `n` (feras). */
  const ordem=[];
  const vistos=new Set();
  (WORLDS||[]).forEach(world=>world.fases.forEach(fase=>fase.missoes.forEach(missao=>missao.forEach(key=>{
    const card=HUMANOS_CARDS[key], type=HUMANOS_ETYPES[key];
    if(!card&&!type) return;
    const opponentId=card?`card:${key}`:`enemy:${key}`;
    if(vistos.has(opponentId)) return;
    vistos.add(opponentId);
    ordem.push(card
      ? {name:card.nome,hp:card.hp,atk:card.atk,sprite:card.sprite,cardId:key,isCard:true,flip:Boolean(card.flip)}
      : {name:type.n,hp:type.hp,atk:type.atk,sprite:type.sprite,etype:key,flip:Boolean(type.flip)});
  }))));
  return ordem;
}
function buildTowerStage(floor){
  const ordem=towerStoryOrder();
  const n=Math.max(1,ordem.length);
  const ciclo=Math.floor((floor-1)/n);
  const k=ordem[(floor-1)%n]||{name:'Sentinela de Pedra',hp:200,atk:20,sprite:GOLEM_SPRITE,etype:'stone-sentinel'};
  const hpBase=Math.round((k.hp||200)*1.4);
  const atkBase=Math.max(6,Number(k.atk||20));
  const escala=1+(ciclo*.20);
  const hp=Math.round(hpBase*escala), atk=Math.round(atkBase*escala);
  return {
    title:`${T('Torre de Acesso à Eternidade','Tower of Access to Eternity','Torre de Acceso a la Eternidad')} · ${T('Andar','Floor','Piso')} ${floor}${ciclo>0?` · ${T('Ciclo','Cycle','Ciclo')} ${ciclo+1}`:''}`,
    scene:4,
    bgUrl:'assets/bg/humanos/fase-09.jpg', /* cenário: Lendária Torre de Acesso à Eternidade */
    enemies:[{...k, hp, atk, maxHp:hp, isBoss:((floor-1)%n)===n-1}]
  };
}
const GOLEM_SPRITE = 'assets/enemies/stone-sentinel/single-1.png';
const SUMMON_ANIMATIONS={golem:{src:'assets/summons/golem/attack-2x3.png',rows:3,cols:2,frames:6,idle:[0,5],attack:[0,1,2,3,4,5],duration:640},harpy:{src:'assets/summons/harpy/attack-2x3.png',rows:2,cols:3,frames:6,idle:[0,5],attack:[0,1,2,3,4,5],duration:560}};
/* Criaturas sem elenco próprio usam folhas transparentes reais, separadas por
   espécie. Os inimigos humanos mantêm a sua própria ilustração oficial até
   receberem uma folha animada criada a partir dessa identidade — nunca uma
   arte genérica de outro combatente. */
const ENEMY_ANIMATION_LIBRARY=Object.freeze({
  'capitao':{src:'assets/physics-v11/humanos/enemies/capitao/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,4,5],cast:[2,3,4],hit:[4,5],victory:[5]}},
  'soldado1':{src:'assets/physics-v11/humanos/enemies/soldado1/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'soldado2':{src:'assets/physics-v11/humanos/enemies/soldado2/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'sold-bib2':{src:'assets/physics-v11/humanos/enemies/sold-bib2/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'sold-bib1':{src:'assets/physics-v11/humanos/enemies/sold-bib1/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'sold-bib3':{src:'assets/physics-v11/humanos/enemies/sold-bib3/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'infantaria':{src:'assets/physics-v11/humanos/enemies/infantaria/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'cavalaria':{src:'assets/physics-v11/humanos/enemies/cavalaria/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:720,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'comandante':{src:'assets/physics-v11/humanos/enemies/comandante/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:760,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'trono':{src:'assets/physics-v11/humanos/enemies/trono/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:760,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'morto':{src:'assets/physics-v11/humanos/enemies/morto/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:760,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'vulto':{src:'assets/physics-v11/humanos/enemies/vulto/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:700,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'slime-cereja':{src:'assets/physics-v11/humanos/enemies/slime-cereja/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:650,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'lobo-raivoso':{src:'assets/physics-v11/humanos/enemies/lobo-raivoso/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:700,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'espectro':{src:'assets/physics-v11/humanos/enemies/espectro/actions/sheet-transparent.png',cols:3,rows:2,frames:6,duration:680,flying:true,actionFrames:{idle:[0,1],attack:[2,3,5],cast:[2,3],hit:[4,5],victory:[5]}},
  'human-guard':{src:'assets/enemies/runtime-v10/human-guard/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:720},
  'rune-slime':{src:'assets/enemies/runtime-v10/rune-slime/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:650},
  'shadow-wolf':{src:'assets/enemies/runtime-v10/shadow-wolf/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:700},
  'cursed-wraith':{src:'assets/enemies/runtime-v10/cursed-wraith/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:680,flying:true},
  'stone-sentinel':{src:'assets/enemies/runtime-v10/stone-sentinel/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:780},
  'crimson-dragon':{src:'assets/enemies/runtime-v10/crimson-dragon/processed/sheet-transparent.png',cols:2,rows:3,frames:6,duration:820}
});
/* O repouso ganhou folhas próprias. Elas não reutilizam poses de ataque: cada
   inimigo respira, ajusta a postura e volta à guarda sem alterar a sua arte
   oficial, escala ou ponto de apoio. */
const HUMAN_ENEMY_IDLE_IDS=new Set([
  'capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3',
  'infantaria','cavalaria','comandante','trono'
]);
const ROOTED_HUMAN_IDLE_LIBRARY=Object.freeze(Object.fromEntries([...HUMAN_ENEMY_IDLE_IDS].map(id=>[
  id,{src:`assets/physics-v11/humanos/enemies/${id}/idle/sheet-transparent.png`,cols:3,rows:3,frames:9}
])));
const ENEMY_IDLE_LIBRARY=Object.freeze(Object.fromEntries([
  'morto','vulto','espectro',
  'slime-cereja','lobo-raivoso','human-guard','rune-slime','shadow-wolf','cursed-wraith',
  'stone-sentinel','crimson-dragon'
].map(id=>{
  return [id,{
    src:`assets/physics-v11/humanos/enemies/${id}/idle/sheet-transparent.png`,
    cols:3,rows:2,frames:6,duration:2100,
    frameOrder:[0,1,2,3,4,5,4,3,2,1]
  }];
})));
/* Contrato físico v11: cada derrota usa a folha própria da identidade. A
   sequência 2x2 registra desequilíbrio, descida, contato e repouso; a arte,
   os equipamentos e a escala do personagem não são substituídos. */
const DEFEAT_ANIMATION_LIBRARY=Object.freeze({
  'capitao':{src:'assets/enemies/runtime-v10/capitao/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:900},
  'soldado1':{src:'assets/enemies/runtime-v10/soldado1/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:880},
  'soldado2':{src:'assets/enemies/runtime-v10/soldado2/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:880},
  'sold-bib1':{src:'assets/enemies/runtime-v10/sold-bib1/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:880},
  'sold-bib2':{src:'assets/enemies/runtime-v10/sold-bib2/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:880},
  'sold-bib3':{src:'assets/enemies/runtime-v10/sold-bib3/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:880},
  'infantaria':{src:'assets/enemies/runtime-v10/infantaria/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:900},
  'cavalaria':{src:'assets/enemies/runtime-v10/cavalaria/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:980},
  'comandante':{src:'assets/enemies/runtime-v10/comandante/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:940},
  'trono':{src:'assets/enemies/runtime-v10/trono/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:940},
  'morto':{src:'assets/enemies/runtime-v10/morto/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:920},
  'vulto':{src:'assets/enemies/runtime-v10/vulto/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:900},
  'slime-cereja':{src:'assets/enemies/runtime-v10/slime-cereja/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:820},
  'lobo-raivoso':{src:'assets/enemies/runtime-v10/lobo-raivoso/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:860},
  'espectro':{src:'assets/enemies/runtime-v10/espectro/defeat/processed/sheet-transparent.png',cols:2,rows:2,frames:4,duration:900}
});
const ENEMY_FRAME_SEQUENCES=Object.freeze({idle:[0,1,2,3,4,5,4,3,2,1],attack:[2,3,1],cast:[1,2,3],hit:[4,5],victory:[5],defeat:[5]});
function enemyAnimationKey(e){
  const descriptor=[e?.etype,e?.name,e?.sprite].filter(Boolean).join(' ').toLowerCase();
  if(/capit[aã]o/.test(descriptor)) return 'capitao';
  if(/soldado.?1|soldado-1/.test(descriptor)) return 'soldado1';
  if(/soldado.?2|soldado-2/.test(descriptor)) return 'soldado2';
  if(/biblioteca.?2|biblioteca-2/.test(descriptor)) return 'sold-bib2';
  if(/biblioteca.?1|biblioteca-1/.test(descriptor)) return 'sold-bib1';
  if(/biblioteca.?3|biblioteca-3/.test(descriptor)) return 'sold-bib3';
  if(/infantaria/.test(descriptor)) return 'infantaria';
  if(/cavalaria/.test(descriptor)) return 'cavalaria';
  if(/soldado.?trono|trono/.test(descriptor)) return 'trono';
  if(/cavaleiro.?morto|morto-vivo/.test(descriptor)) return 'morto';
  if(/slime.?cereja|slime-cereja/.test(descriptor)) return 'slime-cereja';
  if(/lobo.?raivoso|lobo-raivoso/.test(descriptor)) return 'lobo-raivoso';
  if(/espectro.?sombrio|espectro-sombrio/.test(descriptor)) return 'espectro';
  if(/vulto.?sombrio|vulto-sombrio/.test(descriptor)) return 'vulto';
  if(/comandante/.test(descriptor)) return 'comandante';
  if(/dragon|drag[aã]o/.test(descriptor)) return 'crimson-dragon';
  if(/slime|limo/.test(descriptor)) return 'rune-slime';
  if(/lobo|wolf|chacal/.test(descriptor)) return 'shadow-wolf';
  if(/espectro|vulto|wraith|trevas|vazio|morto/.test(descriptor)) return 'cursed-wraith';
  if(/sentinela|golem|guardião/.test(descriptor)) return 'stone-sentinel';
  return e?.etype||null;
}
/* Orientações aprovadas na vitrine: inimigos humanos encaram a direita;
   Slime de Cerejeira, Lobo Raivoso e Elizier como adversária encaram a
   esquerda em todas as poses. */
const ENEMY_LEFT_FACING_KEYS=new Set(['slime-cereja','lobo-raivoso']);
const ENEMY_LEFT_FACING_CARD_IDS=new Set(['elizier']);
function enemyFacingDirection(e){return ENEMY_LEFT_FACING_KEYS.has(enemyAnimationKey(e))||ENEMY_LEFT_FACING_CARD_IDS.has(e?.cardId)?'left':'right'}
/* A direção tática e a orientação nativa de cada arte são coisas distintas.
   O card do Roland/Julius precisa ser espelhado para encarar a equipe; já o
   Slime de Cerejeira nasce olhando para a esquerda e não pode ser virado só
   porque ocupa o lado inimigo. `flip` descreve a correção visual da arte. */
function enemySpriteFlip(e){return Boolean(e?.flip)}
function enemyAnimationCharacter(e){
  const key=enemyAnimationKey(e),library=key&&ENEMY_ANIMATION_LIBRARY[key];
  if(!library) return null;
  const idleLibrary=ENEMY_IDLE_LIBRARY[key];
  const defeatLibrary=DEFEAT_ANIMATION_LIBRARY[key];
  const sprites={};
  Object.entries(ENEMY_FRAME_SEQUENCES).forEach(([action,frameOrder])=>{
    const source=action==='idle'&&idleLibrary?{...library,...idleLibrary}:action==='defeat'&&defeatLibrary?{...library,...defeatLibrary}:library;
    const sequence=action==='idle'&&idleLibrary?idleLibrary.frameOrder:action==='defeat'&&defeatLibrary?[0,1,2,3]:(library.actionFrames?.[action]||frameOrder);
    sprites[action]={...source,format:'sheet',sheetFrames:source.frames,frameOrder:sequence,loop:action==='idle',duration:Number(source.duration||library.duration)};
  });
  return {id:`enemy-${key}`,nome:e?.name||key,sprites,heroFlip:false,enemyRuntime:true,flying:library.flying===true};
}
let autoTargetMode = false;
let battleSpeedIndex = 0;
let royalShuffles = 1;
let formationIndex = 0;
let bestCombo = 0;
const BATTLE_SPEEDS = [1,1.5,2];
/* A mesma malha numerada que aparece sobre o piso passa a ser a fonte das
   formações. Linhas menores ficam ao fundo; linhas maiores se aproximam da
   câmera. Pontos compostos usam a média física das células informadas. */
const PARTY_GRID_DEPTH=Object.freeze({
  1:Object.freeze({y:42,z:18}),
  2:Object.freeze({y:29.333,z:27}),
  3:Object.freeze({y:16.667,z:37}),
  4:Object.freeze({y:4,z:46})
});
const ENEMY_GRID_DEPTH=Object.freeze({
  1:Object.freeze({y:42,z:18}),
  2:Object.freeze({y:22,z:34}),
  3:Object.freeze({y:4,z:46})
});
function tacticalGridCell(cellNumber){
  const cell=Number(cellNumber);
  if(!Number.isInteger(cell)||cell<1||cell>33) throw new Error(`Célula tática inválida: ${cellNumber}`);
  const column=((cell-1)%9)+1;
  const row=Math.floor((cell-1)/9)+1;
  const enemySide=column>=7;
  const depth=(enemySide?ENEMY_GRID_DEPTH:PARTY_GRID_DEPTH)[row];
  if(!depth||(enemySide?column>9:column>6)) throw new Error(`Célula fora da grade ativa: ${cellNumber}`);
  return {cell,column,row,x:((column-.5)/9)*100,y:depth.y,z:depth.z,side:enemySide?'enemy':'party'};
}
function tacticalGridSlot(...cellNumbers){
  const points=cellNumbers.map(tacticalGridCell);
  const average=key=>points.reduce((sum,point)=>sum+point[key],0)/points.length;
  return {
    x:average('x'),y:average('y'),s:1,z:Math.round(average('z')),
    gridRefs:points.map(point=>point.cell),
    gridSide:points.some(point=>point.side==='enemy')?'enemy':'party'
  };
}
/* Dez formações canônicas definidas diretamente pelo usuário. `tacticalGridSlot`
   aceita uma célula, o meio de duas ou o centro de quatro sem aproximações
   percentuais diferentes entre desktop e celular. */
const HERO_FORMATIONS = [
  { nome:'Líder',          slots:[tacticalGridSlot(14,23),tacticalGridSlot(3),tacticalGridSlot(12,21),tacticalGridSlot(30)] },
  { nome:'Guarda-costas',  slots:[tacticalGridSlot(11,20),tacticalGridSlot(5),tacticalGridSlot(14,23),tacticalGridSlot(32)] },
  { nome:'Cercados',       slots:[tacticalGridSlot(6),tacticalGridSlot(14),tacticalGridSlot(23),tacticalGridSlot(33)] },
  { nome:'Defensiva',      slots:[tacticalGridSlot(2),tacticalGridSlot(11),tacticalGridSlot(20),tacticalGridSlot(29)] },
  { nome:'Ofensiva',       slots:[tacticalGridSlot(5),tacticalGridSlot(14),tacticalGridSlot(23),tacticalGridSlot(32)] },
  { nome:'Vanguarda em V', slots:[tacticalGridSlot(14,23),tacticalGridSlot(12,13,21,22),tacticalGridSlot(2),tacticalGridSlot(29)] },
  { nome:'Asa Dupla',      slots:[tacticalGridSlot(5),tacticalGridSlot(32),tacticalGridSlot(3),tacticalGridSlot(30)] },
  { nome:'Diamante',       slots:[tacticalGridSlot(14,23),tacticalGridSlot(3,4),tacticalGridSlot(30,31),tacticalGridSlot(11,20)] },
  { nome:'Escalonada',     slots:[tacticalGridSlot(5),tacticalGridSlot(13),tacticalGridSlot(21),tacticalGridSlot(29)] },
  { nome:'Berserker',      slots:[tacticalGridSlot(17),tacticalGridSlot(4,5),tacticalGridSlot(13,22),tacticalGridSlot(31,32)] }
];
{
  const storedFormation=Number(localStorage.getItem('12r_formation'));
  formationIndex=Number.isInteger(storedFormation)
    ?Math.max(0,Math.min(HERO_FORMATIONS.length-1,storedFormation))
    :0;
}
/* A grade é uma ferramenta de leitura, não parte obrigatória do cenário.
   O primeiro acesso começa limpo; depois disso respeitamos apenas a escolha
   explícita feita na engrenagem. */
let tacticalGridVisible=localStorage.getItem('12r_tactical_grid')==='1';
const ENEMY_FORMATIONS = {
  1:[{x:80,y:10,s:1.2,z:42}],
  2:[{x:73,y:36,s:.94,z:22},{x:86,y:3,s:1.14,z:44}],
  3:[{x:69,y:42,s:.84,z:20},{x:89,y:30,s:.94,z:28},{x:80,y:0,s:1.16,z:46}],
  4:[{x:68,y:43,s:.82,z:18},{x:90,y:35,s:.86,z:24},{x:72,y:4,s:1.08,z:42},{x:90,y:0,s:1.12,z:46}]
};
const SCENE_ENEMY_FORMATIONS = [
  {1:[{x:81,y:8,s:1.22,z:44}]},
  {2:[{x:64,y:39,s:.96,z:22},{x:90,y:24,s:1.12,z:44}]},
  {2:[{x:62,y:40,s:.94,z:21},{x:90,y:24,s:1.14,z:45}]},
  {3:[{x:54,y:40,s:.9,z:19},{x:75,y:34,s:.94,z:25},{x:92,y:24,s:1.08,z:38}]},
  {3:[{x:54,y:40,s:.88,z:19},{x:75,y:34,s:.92,z:25},{x:92,y:24,s:1.12,z:38}]}
];
/* Grade inimiga 3×3. Linha 1 está mais distante (menor), Linha 3 mais próxima
   (maior). A terceira coluna fica livre para a leitura/ataques, mas é uma vaga
   válida para expansões futuras. */
const ENEMY_GRID_COORDS=ENEMY_GRID_DEPTH;
const ENEMY_GRID_X={1:73,2:84,3:94};
const ENEMY_GRID_NORMAL=[[1,2],[2,1],[2,3],[2,2]];
function enemyGridSlot(column,row,isBoss=false){
  const coord=ENEMY_GRID_COORDS[row]||ENEMY_GRID_COORDS[2];
  return {x:ENEMY_GRID_X[column]||ENEMY_GRID_X[2],y:coord.y,s:1,z:coord.z,grid:{column,row},isBoss};
}
function enemyMissionHasBoss(list=enemies){
  return Boolean(list.some(enemy=>enemy?.isBoss===true)||bossRushMode||(worldRun?.active&&worldRun.nivel===5));
}
function planEnemyGridSlots(list=enemies,bossMission=enemyMissionHasBoss(list)){
  const count=Math.min(4,list.length);
  const plan=Array.from({length:count});
  let bossIndex=list.findIndex(enemy=>enemy?.isBoss===true);
  if(bossIndex<0&&bossMission) bossIndex=count-1;
  if(bossIndex<0){
    ENEMY_GRID_NORMAL.slice(0,count).forEach(([column,row],index)=>{ plan[index]=enemyGridSlot(column,row); });
    return plan;
  }
  const bossPosition=count===1?[1,2]:[2,2];
  plan[bossIndex]=enemyGridSlot(bossPosition[0],bossPosition[1],true);
  /* Chefe +3: o terceiro acompanhante completa a coluna 1 na Linha 2,
     posição necessária para totalizar os quatro inimigos especificados. */
  const escorts=count===2?[[1,1]]:count===3?[[1,1],[1,2]]:[[1,1],[1,2],[1,3]];
  list.slice(0,count).forEach((_,index)=>{
    if(index===bossIndex) return;
    const [column,row]=escorts.shift()||[3,2];
    plan[index]=enemyGridSlot(column,row);
  });
  return plan;
}

/* v10: o manifesto visual fica separado dos dados de gameplay. Assim cada
   movimento pode ser carregado sob demanda sem duplicar ou alterar cartas. */
const V10_ANIMATIONS = window.YGDRIA_V10_ANIMATIONS || {};
KINGDOMS.forEach(character=>{
  const animationSet=V10_ANIMATIONS[character.id];
  if(animationSet) character.sprites=animationSet;
});

/* Escala canônica de leitura em combate. A escala da animação continua sendo
   apenas a correção técnica do sheet; esta tabela define o porte do ser no mundo. */
const UNIT_ART_SCALES=Object.freeze({
  card:1.50,
  cardYoungOrGareth:1.00,
  soldier:1.20,
  captain:1.20,
  beastSmall:0.60,
  beastMedium:1.00,
  beastLarge:1.50,
  beastGiant:2.00,
  summon:1.00
});
const YOUNG_CARD_IDS=new Set(['berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem','gareth']);
/* Correções de leitura aprovadas no comparativo: Lucius, Mardogear e Blizzardo
   igualam a referência adulta da Ninfa; jovens igualam Adriel Jovem. */
const UNIT_ART_SCALE_CORRECTIONS=Object.freeze({
  fogo:1.0370,
  raio:1.0890,
  gelo:1.2696,
  'berenice-jovem':0.9733,
  'acqua-jovem':1.0425,
  'galateia-jovem':1.2321,
  gareth:1.1590
});
function cardArtScale(character){
  const base=YOUNG_CARD_IDS.has(character?.id)?UNIT_ART_SCALES.cardYoungOrGareth:UNIT_ART_SCALES.card;
  return Number((base*(UNIT_ART_SCALE_CORRECTIONS[character?.id]||1)).toFixed(4));
}
function enemyArtScale(enemy){
  const card=KINGDOMS.find(character=>[
    enemy?.heroId,enemy?.characterId,enemy?.cardId,enemy?.id,enemy?.etype,enemy?.name
  ].filter(Boolean).some(value=>String(value).trim().toLowerCase()===character.id||String(value).trim().toLowerCase()===String(character.nome).trim().toLowerCase()));
  if(card) return cardArtScale(card);
  const descriptor=[enemy?.etype,enemy?.name,enemy?.sprite].filter(Boolean).join(' ').toLowerCase();
  if(/dragon|drag[aã]o|kraken/.test(descriptor)) return UNIT_ART_SCALES.beastGiant;
  if(/slime/.test(descriptor)) return UNIT_ART_SCALES.beastSmall;
  if(/lobo|wolf/.test(descriptor)) return UNIT_ART_SCALES.beastMedium;
  if(/harpia|harpy|golem|invoca|summon/.test(descriptor)) return UNIT_ART_SCALES.summon;
  if(/espectro|vulto|wraith|morto-vivo|sentinel/.test(descriptor)) return UNIT_ART_SCALES.beastLarge;
  if(/capit[aã]o|comandante/.test(descriptor)) return UNIT_ART_SCALES.captain;
  if(/soldado|infantaria|cavalaria|trono/.test(descriptor)) return UNIT_ART_SCALES.soldier;
  return UNIT_ART_SCALES.beastLarge;
}

const seedText = new URLSearchParams(location.search).get('seed') || String(Date.now());
const initialRngState=[...seedText].reduce((acc,ch)=>(Math.imul(acc,31)+ch.charCodeAt(0))>>>0,2166136261) || 1;
let rngState = initialRngState;
function gameRandom(){
  rngState ^= rngState << 13; rngState ^= rngState >>> 17; rngState ^= rngState << 5;
  return (rngState>>>0)/4294967296;
}

const boardEl = document.getElementById('board');
const arenaEl = document.getElementById('arena');
const enemyArenaEl = document.getElementById('enemyArena');
const partyArenaEl = document.getElementById('partyArena');
const stageProgressEl = document.getElementById('stageProgress');
const stageLabelEl = document.getElementById('stageLabel');
const dungeonTitleEl = document.getElementById('dungeonTitle');
const playerHpBar = document.getElementById('playerHpBar');
const playerHpProgress = document.getElementById('playerHpProgress');
const playerHpText = document.getElementById('playerHpText');
const playerHpTotal = document.getElementById('playerHpTotal');
const comboTextEl = document.getElementById('comboText');
const battleStatusEl = document.getElementById('battleStatus');
const statusTrayEl = document.getElementById('statusTray');
const sceneBgEl = document.querySelector('.scene-bg');
const battleToolsPanelEl = document.getElementById('battleToolsPanel');
const comboRecordEl = document.getElementById('comboRecord');
const stageObjectiveEl = document.getElementById('stageObjective');
const hpStatusIconEl = document.getElementById('hpStatusIcon');
const battleHistoryListEl = document.getElementById('battleHistoryList');

/* Direção visual da arena: camadas permanentes e uma luz curta reativa a
   eventos de combate. Tudo vive em pseudo-elementos/CSS, portanto não cria
   partículas por frame nem toca no transform dos personagens. */
function ensureArenaVisualLayers(){
  if(!arenaEl) return;
  if(!arenaEl.querySelector('.arena-depth')){
    const depth=document.createElement('div');
    depth.className='arena-depth';
    depth.setAttribute('aria-hidden','true');
    depth.innerHTML='<span class="arena-horizon-glow"></span><span class="arena-midground-light"></span><span class="arena-foreground-haze"></span>';
    arenaEl.prepend(depth);
  }
  if(!arenaEl.querySelector('.arena-lighting')){
    const lighting=document.createElement('div');
    lighting.className='arena-lighting';
    lighting.setAttribute('aria-hidden','true');
    arenaEl.prepend(lighting);
  }
}

function applyArenaVisualProfile(){
  if(!arenaEl) return;
  ensureArenaVisualLayers();
  const key=arenaEl.dataset.missionAtmosphere||'scene-drift';
  const profile=V10.visuals?.arenaProfiles?.[key]||V10.visuals?.arenaProfiles?.['scene-drift'];
  if(!profile) return;
  arenaEl.dataset.arenaMood=profile.mood||key;
  arenaEl.style.setProperty('--arena-light-color',profile.light||'#d4b7ff');
  arenaEl.style.setProperty('--arena-depth-color',profile.depth||'#403454');
  arenaEl.dataset.arenaQuality=resolvedGraphicsQuality();
}

function pulseArenaLighting(color,target,kind='impact'){
  if(!arenaEl||reducedMotion||reduceFlashes||!particlesEnabled) return;
  const quality=resolvedGraphicsQuality();
  if(V10.quality?.arenaEffects?.[quality]===false) return;
  const arenaRect=arenaEl.getBoundingClientRect();
  const targetRect=target?.getBoundingClientRect?.();
  const x=targetRect?Math.max(12,Math.min(88,(targetRect.left+targetRect.width/2-arenaRect.left)/Math.max(1,arenaRect.width)*100)):50;
  const y=targetRect?Math.max(18,Math.min(82,(targetRect.top+targetRect.height/2-arenaRect.top)/Math.max(1,arenaRect.height)*100)):48;
  arenaEl.style.setProperty('--arena-light-color',color||'var(--arena-light-color)');
  arenaEl.style.setProperty('--arena-light-x',x.toFixed(1)+'%');
  arenaEl.style.setProperty('--arena-light-y',y.toFixed(1)+'%');
  arenaEl.dataset.lightKind=kind;
  arenaEl.classList.remove('arena-light-pulse');
  void arenaEl.offsetWidth;
  arenaEl.classList.add('arena-light-pulse');
  scheduleCombat(()=>arenaEl.classList.remove('arena-light-pulse'),kind==='critical'?680:460);
}

/* Cabeçalho compacto: mantém missão/relógio na primeira linha e objetivo,
   recorde e controles na segunda, sem alterar os IDs usados pelos eventos. */
function organizeMissionHeader(){
  const top=document.querySelector('.mission-topbar');
  const metrics=document.querySelector('.mission-metrics');
  const actions=document.querySelector('.mission-actions');
  const timer=document.getElementById('missionTimer');
  const phase=document.getElementById('battlePhaseChip');
  if(top&&metrics&&actions&&timer&&phase){
    metrics.appendChild(actions);
    let clockGroup=document.getElementById('missionClockGroup');
    if(!clockGroup){
      clockGroup=document.createElement('div');
      clockGroup.id='missionClockGroup';
      clockGroup.className='mission-clock-group';
    }
    clockGroup.append(phase,timer);
    top.appendChild(clockGroup);
  }
}
organizeMissionHeader();

boardEl.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
boardEl.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;

function wait(ms){
  const epoch=combatEpoch;
  let remaining=Math.max(0,ms/(BATTLE_SPEEDS[battleSpeedIndex]||1));
  return new Promise(resolve=>{
    let settled=false;
    let timerId=0;
    const finish=()=>{
      if(settled) return;
      settled=true;
      if(timerId) clearTimeout(timerId);
      combatWaits.delete(finish);
      resolve();
    };
    combatWaits.add(finish);
    let previous=performance.now();
    const tick=()=>{
      if(epoch!==combatEpoch){ finish(); return; }
      const now=performance.now();
      if(!gamePaused&&battlePhase!=='paused') remaining-=now-previous;
      previous=now;
      if(remaining<=0){ finish(); return; }
      timerId=window.setTimeout(tick,Math.min(80,Math.max(16,remaining)));
    };
    timerId=window.setTimeout(tick,Math.min(80,Math.max(16,remaining)));
  });
}
function inferHistoryCategory(message){
  const text=String(message).toLowerCase();
  if(/dano|atac|contra-atac|inciner/.test(text)) return 'damage';
  if(/cura|recuper|escudo|prote|intoc|reflex/.test(text)) return 'support';
  if(/fase|trilha|tabuleiro|alvo|forma|velocidade/.test(text)) return 'system';
  return 'action';
}
function setBattleStatus(message,category){
  const safeCategory=['damage','support','system','action'].includes(category)?category:inferHistoryCategory(message);
  if(battleStatusEl) battleStatusEl.textContent=message;
  const entry={
    id:++battleHistorySeq,
    stage:stageIndex+1,
    time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),
    message:String(message),
    category:safeCategory
  };
  battleHistory.push(entry);
  if(battleHistory.length>160) battleHistory.shift();
  if(document.getElementById('battleHistoryScreen')?.classList.contains('show')) renderBattleHistory();
}
function renderBattleHistory(){
  if(!battleHistoryListEl) return;
  if(!battleHistory.length){
    battleHistoryListEl.innerHTML='<div class="history-empty">'+T('Nenhum evento registrado nesta batalha.','No events recorded in this battle.','Ningún evento registrado en esta batalla.')+'</div>';
    return;
  }
  battleHistoryListEl.innerHTML=[...battleHistory].reverse().map(entry=>
    '<article class="history-entry '+(['damage','support','system','action'].includes(entry.category)?entry.category:'action')+'">'+
      '<div class="history-meta"><span>'+T('Fase ','Stage ','Fase ')+Math.max(1,Number(entry.stage)||1)+'</span><time>'+escapeHtml(entry.time)+'</time></div>'+
      '<p>'+escapeHtml(entry.message)+'</p>'+
    '</article>').join('');
}
function openBattleHistory(){ renderBattleHistory(); openPanel('battleHistoryScreen'); }
function clearBattleHistory(){ battleHistory=[]; renderBattleHistory(); setBattleStatus(T('Histórico reiniciado.','History cleared.','Historial reiniciado.'),'system'); }
async function copyBattleHistory(){
  const text=battleHistory.map(entry=>'['+entry.time+'] '+T('Fase ','Stage ','Fase ')+entry.stage+' — '+entry.message).join('\n');
  try{
    await navigator.clipboard.writeText(text);
    setBattleStatus(T('Histórico copiado para a área de transferência.','History copied to the clipboard.','Historial copiado al portapapeles.'),'system');
  }catch(e){
    setBattleStatus(T('Não foi possível copiar o histórico neste navegador.','Could not copy the history in this browser.','No se pudo copiar el historial en este navegador.'),'system');
  }
  renderBattleHistory();
}
function haptic(pattern){ if(hapticsEnabled && navigator.vibrate) navigator.vibrate(pattern); }
function pulseHpEffect(kind,duration=900){
  const anchor=document.getElementById('playerHpAnchor');
  if(!anchor) return;
  const cls='hp-'+kind+'-pulse';
  anchor.classList.remove(cls); void anchor.offsetWidth; anchor.classList.add(cls);
  scheduleCombat(()=>anchor.classList.remove(cls),duration);
}
function syncHpStateClasses(){
  const anchor=document.getElementById('playerHpAnchor');
  if(!anchor) return;
  anchor.classList.toggle('hp-shield',playerShield>0);
  anchor.classList.toggle('hp-invulnerable',invulnerableTurns>0);
  anchor.classList.toggle('hp-reflect',reflectTurns>0);
  const pct=playerHP/PLAYER_MAX_HP*100;
  anchor.classList.toggle('hp-critical',pct>0&&pct<=25);
  if(hpStatusIconEl){
    hpStatusIconEl.textContent=invulnerableTurns>0?'✦':reflectTurns>0?'↺':playerShield>0?'🛡':pct<=25?'!':'♥';
  }
}
function renderStatusTray(){
  if(!statusTrayEl) return;
  const chips = [];
  if(playerShield>0) chips.push(['positive',T('Escudo ','Shield ','Escudo ')+playerShield+(shieldTurns?' · '+shieldTurns+'t':'')]);
  if(enemyBlindTurns>0) chips.push(['positive',T('Cegueira','Blind','Ceguera')+' · '+enemyBlindTurns+'t']);
  if(reflectTurns>0) chips.push(['positive',T('Reflexão','Reflect','Reflejo')+' · '+reflectTurns+'t']);
  if(invulnerableTurns>0) chips.push(['positive',T('Intocável','Untouchable','Intocable')+' · '+invulnerableTurns+'t']);
  if(lifestealCharges>0) chips.push(['positive',T('Eternidade','Eternity','Eternidad')+' · '+lifestealCharges+T(' cargas',' charges',' cargas')]);
  if(stoneArmorTurns>0) chips.push(['positive',T('Armadura de Pedra','Stone Armor','Armadura de Piedra')+' · '+stoneArmorTurns+'t']);
  if(golemAllies>0) chips.push(['positive',T('Golens aliados','Allied golems','Gólems aliados')+' · '+golemAllies]);
  if(enemyVulnerableTurns>0) chips.push(['negative',T('Defesa rompida','Defense broken','Defensa rota')+' · '+enemyVulnerableTurns+'t']);
  if(incinerateActive) chips.push(['negative',T('Incinerar +','Incinerate +','Incinerar +')+incinerateStacks]);
  if(enemyDots.length) chips.push(['negative',L(enemyDots[0].label||'Dano contínuo')+' · '+Math.max(...enemyDots.map(d=>d.turns))+'t']);
  const detail=(label)=>{
    const s=String(label).toLowerCase();
    if(/cegueira|blind|ceguera/.test(s)) return T('Próximo ataque inimigo falha.','The next enemy attack misses.','El próximo ataque enemigo falla.');
    if(/defesa rompida|defense broken|defensa rota/.test(s)) return T('Inimigos recebem dano aumentado.','Enemies take increased damage.','Los enemigos reciben daño aumentado.');
    if(/incinerar|incinerate/.test(s)) return T('Ataques acumulam dano contínuo por 3 turnos.','Attacks add damage-over-time for 3 turns.','Los ataques añaden daño continuo por 3 turnos.');
    if(/dano contínuo|damage over time/.test(s)) return T('Dano aplicado no fim de cada turno.','Damage is applied at the end of each turn.','Daño aplicado al final de cada turno.');
    return '';
  };
  statusTrayEl.innerHTML = chips.map(([kind,label])=>'<span class="status-chip '+kind+'"><b>'+label+'</b>'+(detail(label)?'<small>'+detail(label)+'</small>':'')+'</span>').join('');
  syncHpStateClasses();
}
function scopeSvg(svg,scope){
  return svg
    .replace(/id="([^"]+)"/g,(_,id)=>`id="${id}-${scope}"`)
    .replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${id}-${scope})`);
}

/* ---------- ASSET CONTRACT / COMBAT DIRECTOR ---------- */
const HERO_ACTIONS = Object.freeze({
  idle:    { frames:4, cols:2, rows:2, duration:2400, loop:true },
  attack:  { frames:6, cols:3, rows:2, duration:720, loop:false },
  cast:    { frames:6, cols:3, rows:2, duration:840, loop:false },
  hit:     { frames:4, cols:2, rows:2, duration:360, loop:false },
  victory: { frames:4, cols:2, rows:2, duration:1200, loop:false, holdLast:true },
  defeat:  { frames:4, cols:2, rows:2, duration:900, loop:false, holdLast:true }
});

/* Folhas corporais do capítulo humano. A ação mora no corpo, e o VFX é uma
   segunda camada: assim espada, arco e lança realmente se movem sem mexer em
   escala, sombra ou linha dos pés. Gareth e Julius usam a revisão R2. */
const HUMAN_CHAPTER_BODY_PHYSICS_IDS=new Set([
  'gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem',
  'adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'
]);
const HUMAN_CHAPTER_BODY_PHYSICS_ACTIONS=Object.freeze(['idle','attack','cast','hit','victory']);
function humanBodyPhysicsSource(id,action){
  /* Cedric recebeu uma pose de ataque específica; a folha genérica não pode
     voltar a substituí-la no combate real. */
  if(id==='julius'&&action==='cast') return 'assets/physics-v11/humanos/heroes/julius/cast-r5/processed/sheet-transparent.png';
  const resolvedAction=id==='cedric'&&action==='attack'?'attack-r4':action;
  return `assets/physics-v11/humanos/heroes/${id}/${resolvedAction}/sheet-transparent.png`;
}
for(const character of KINGDOMS){
  if(!HUMAN_CHAPTER_BODY_PHYSICS_IDS.has(character.id)) continue;
  const sprites={...(character.sprites||{})};
  HUMAN_CHAPTER_BODY_PHYSICS_ACTIONS.forEach(action=>{
    const existing={...(sprites[action]||{})};
    delete existing.frameScales;
    delete existing.footY;
    sprites[action]={...existing,src:humanBodyPhysicsSource(character.id,action),format:'sheet'};
  });
  character.sprites=sprites;
}

/* Física das folhas: razão entre a altura média do corpo em idle e a altura
   média do corpo na ação. Os PNGs continuam intactos; esta compensação só
   impede que uma folha com recorte mais alto faça o personagem crescer. */
const ACTION_PHYSICS_SCALE=Object.freeze({
  'acqua-jovem':{attack:.9225,cast:1.0166,hit:.8122,victory:.9907},
  'adriel-jovem':{attack:1.0705,cast:1.0202,hit:1.052,victory:1.0698},
  agua:{attack:1.1354,cast:1.0969,hit:1.1141,victory:.9986},
  areia:{attack:1.1185,cast:1.1088,hit:1.0906,victory:1.0619},
  'berenice-jovem':{attack:1.0189,cast:.9866,hit:1.0305,victory:.9558},
  bernyce:{attack:1.0533,cast:1.0513,hit:.9535,victory:1.0528},
  cedric:{attack:1.181,cast:1.0509,hit:1.0636,victory:.9949},
  chuvas:{attack:1.0276,cast:1.1576,hit:1.2392,victory:1.0127},
  elizier:{attack:1.0883,cast:1.0182,hit:1.2138,victory:1.0122},
  fogo:{attack:.8082,cast:1.0251,hit:.9168,victory:.9861},
  'galateia-jovem':{attack:.9949,cast:.8945,hit:1,victory:1.0245},
  /* Gareth: a folha de ataque mantém a mesma estatura do idle. O corte é
     comunicado pela pose e pelo VFX físico, nunca por aumento de escala. */
  gareth:{attack:1,cast:1.0235,hit:1.0364,victory:1.0015},
  gelo:{attack:1.2691,cast:1.3377,hit:1.295,victory:1.1137},
  humanos:{attack:.8051,cast:.793,hit:1.0635,victory:1.0461},
  jules:{attack:1.0408,cast:1.0519,hit:1.0679,victory:1.084},
  julius:{attack:1.3859,cast:1.4119,hit:1.1239,victory:1.004},
  kalander:{attack:1.0966,cast:1.0195,hit:1.0691,victory:1.0594},
  luz:{attack:.9188,cast:.8897,hit:.9762,victory:.969},
  natureza:{attack:1.2738,cast:.9755,hit:.9357,victory:.8977},
  raio:{attack:1.1008,cast:1.2705,hit:1.2811,victory:.9571},
  roland:{attack:1.0894,cast:.9983,hit:1.1437,victory:.911},
  sombras:{attack:.8632,cast:.8586,hit:.9939,victory:.969},
  terra:{attack:1.0619,cast:.8429,hit:1.0292,victory:1.016},
  vento:{attack:.8575,cast:1.0071,hit:1.1625,victory:1.0579}
});
function normalizedActionDisplayScale(character,action,displayScale){
  const idleScale=Number(character?.sprites?.idle?.displayScale);
  const fallback=Number(displayScale||1);
  const base=Number.isFinite(idleScale)&&idleScale>0?idleScale:(Number.isFinite(fallback)&&fallback>0?fallback:1);
  /* As folhas corporais humanas foram normalizadas com âncora nos pés. Não
     aplique compensações legadas sobre elas: isso era a origem de personagens
     crescendo ao atacar no mobile. */
  const physics=HUMAN_CHAPTER_BODY_PHYSICS_IDS.has(character?.id)
    ? 1 : Number(ACTION_PHYSICS_SCALE[character?.id]?.[action]||1);
  const fixed=base*physics;
  return Number(fixed.toFixed(4));
}
const MAX_ACTIVE_FX = 28;
const failedSpriteAssets = new Set();
/* Uma troca de background antes da decodificação é a causa clássica de quadro
   vazio/piscar no WebView móvel. Ação só substitui o idle depois deste selo. */
const readySpriteAssets = new Set();
let spriteFallbackRenderTimer=0;
function markSpriteFailed(src){
  if(!src) return;
  failedSpriteAssets.add(src);
  clearTimeout(spriteFallbackRenderTimer);
  spriteFallbackRenderTimer=window.setTimeout(()=>{
    const activeUsesSource=ACTIVE.some(index=>Object.values(KINGDOMS[index]?.sprites||{}).some(spec=>spec?.src===src));
    if(document.body.classList.contains('game-active')&&activeUsesSource) renderPartyArena();
    const modal=document.getElementById('cardModal');
    if(modal?.classList.contains('show')&&Number.isInteger(window.__modalIdx)) renderMotionShowcase(KINGDOMS[window.__modalIdx]);
  },0);
}
function resolvedGraphicsQuality(){
  if(graphicsQuality!=='auto') return graphicsQuality;
  if(reducedMotion||navigator.connection?.saveData||(navigator.deviceMemory&&navigator.deviceMemory<=2)) return 'economy';
  if((navigator.deviceMemory&&navigator.deviceMemory<=4)||matchMedia('(max-width:700px)').matches) return 'medium';
  return 'high';
}
function particleBudget(){ return V10.quality?.particles?.[resolvedGraphicsQuality()]||MAX_ACTIVE_FX; }
function heroUsesFlightPhysics(character){
  const realm=String(character?.reino||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return character?.flying===true||character?.realmId==='vento'||character?.id==='vento'||realm.includes('reino do vento');
}

/* O toque usa o alfa real do frame exibido. Assim a caixa transparente de um
   herói à frente não bloqueia o corpo visível de outro herói atrás dele. */
const HERO_BODY_ALPHA_THRESHOLD=24;
const heroHitMaskCache=new Map();
function prepareHeroHitMask(src){
  if(!src) return Promise.resolve(null);
  if(heroHitMaskCache.has(src)) return heroHitMaskCache.get(src).promise;
  const entry={ready:false,failed:false,width:0,height:0,alpha:null,promise:null};
  entry.promise=new Promise(resolve=>{
    const image=new Image();
    image.onload=()=>{
      try{
        const canvas=document.createElement('canvas');
        canvas.width=image.naturalWidth; canvas.height=image.naturalHeight;
        const context=canvas.getContext('2d',{willReadFrequently:true});
        context.drawImage(image,0,0);
        const rgba=context.getImageData(0,0,canvas.width,canvas.height).data;
        const alpha=new Uint8Array(canvas.width*canvas.height);
        for(let source=3,target=0;source<rgba.length;source+=4,target++) alpha[target]=rgba[source];
        entry.width=canvas.width; entry.height=canvas.height; entry.alpha=alpha; entry.ready=true;
      }catch(error){ entry.failed=true; }
      resolve(entry);
    };
    image.onerror=()=>{ entry.failed=true; resolve(entry); };
    image.decoding='async'; image.src=src;
  });
  heroHitMaskCache.set(src,entry);
  return entry.promise;
}
function prepareHeroBodyHitTest(avatar){
  const visual=avatar?.querySelector('.hero-sprite-sheet,.hero-sprite-image');
  const src=visual?.dataset.hitSrc;
  if(src) prepareHeroHitMask(src);
}
function heroVisualOpaqueAt(visual,clientX,clientY){
  if(!visual) return false;
  const rect=visual.getBoundingClientRect();
  if(rect.width<1||rect.height<1||clientX<rect.left||clientX>rect.right||clientY<rect.top||clientY>rect.bottom) return false;
  const entry=heroHitMaskCache.get(visual.dataset.hitSrc||'');
  if(!entry?.ready||!entry.alpha) return null;
  const columns=Math.max(1,Number(visual.dataset.hitCols||1));
  const rows=Math.max(1,Number(visual.dataset.hitRows||1));
  const style=getComputedStyle(visual);
  const xPercent=parseFloat(style.getPropertyValue('--sprite-bg-x'))||0;
  const yPercent=parseFloat(style.getPropertyValue('--sprite-bg-y'))||0;
  const column=Math.max(0,Math.min(columns-1,Math.round(xPercent*(columns-1)/100)));
  const row=Math.max(0,Math.min(rows-1,Math.round(yPercent*(rows-1)/100)));
  let localX=Math.max(0,Math.min(.9999,(clientX-rect.left)/rect.width));
  const localY=Math.max(0,Math.min(.9999,(clientY-rect.top)/rect.height));
  if(visual.classList.contains('flip')) localX=1-localX;
  const frameWidth=entry.width/columns,frameHeight=entry.height/rows;
  const sourceX=Math.min(entry.width-1,Math.floor((column+localX)*frameWidth));
  const sourceY=Math.min(entry.height-1,Math.floor((row+localY)*frameHeight));
  return entry.alpha[sourceY*entry.width+sourceX]>=HERO_BODY_ALPHA_THRESHOLD;
}
function resolveHeroBodyAtPoint(clientX,clientY){
  const candidates=[...partyArenaEl.querySelectorAll('.hero-unit')].map((unit,order)=>({
    unit,order,z:Number(getComputedStyle(unit).zIndex)||0,
    visual:unit.querySelector('.hero-sprite-sheet,.hero-sprite-image')
  })).sort((a,b)=>b.z-a.z||b.order-a.order);
  for(const candidate of candidates){
    if(heroVisualOpaqueAt(candidate.visual,clientX,clientY)===true) return candidate.unit;
  }
  return null;
}
function handleHeroBodyPointer(event){
  if((event.button!==undefined&&event.button!==0)||event.isPrimary===false||!canAcceptPlayerInput()) return;
  /* O hit-test alfa procura o corpo visível mesmo sob outra unidade. Ele não
     deve, porém, transformar um toque em controles da HUD (que compartilham a
     área visual da arena no mobile) em um toque no herói. */
  if(event.target instanceof Element && event.target.closest('button, input, select, textarea, a, [role="button"], .battle-tools-panel, .battle-tools-toggle, .pro-overlay, .overlay')) return;
  const unit=resolveHeroBodyAtPoint(event.clientX,event.clientY);
  const heroIndex=Number(unit?.dataset.heroIndex);
  if(!unit||!Number.isInteger(heroIndex)) return;
  event.preventDefault(); event.stopPropagation();
  onHeroAvatarClick(heroIndex);
}

const heroFacingOverrides = new Set();
/* As folhas da família jovem foram normalizadas para a esquerda. Adriel é a
   exceção física da arte-fonte: o desenho-base já vem espelhado em relação às
   demais folhas. Esta correção é feita uma única vez na pose inicial e o botão
   do HUD continua apenas alternando a orientação voluntária. */
const HERO_LEFT_FACING_FLIP_CORRECTIONS=new Set(['adriel-jovem']);
function heroInitialFlip(k){
  const initial=Boolean(!k.heroFlip);
  return HERO_LEFT_FACING_FLIP_CORRECTIONS.has(k.id)?!initial:initial;
}
function heroIsFlipped(k){
  /* A pose de origem varia entre folhas. No papel de herói, a composição
     canônica aponta para a esquerda; o botão de rotação do HUD inverte apenas
     o herói escolhido, sem alterar escala, pés ou a animação em curso. */
  const initial=heroInitialFlip(k);
  const baseline=HERO_DEFAULT_RIGHT_FACING_IDS.has(k.id)?!initial:initial;
  return heroFacingOverrides.has(k.id)?!baseline:baseline;
}
/* A direção padrão é esquerda. Bernyce, Kalander e Jules/The Joker receberam
   a inversão solicitada para quando entram como heróis; o botão do HUD segue
   apenas alternando a base individual sem alterar a física do sprite. */
const HERO_DEFAULT_RIGHT_FACING_IDS=new Set(['bernyce','kalander','jules']);
function heroFacingDirection(k){
  const baseline=HERO_DEFAULT_RIGHT_FACING_IDS.has(k.id)?'right':'left';
  return heroFacingOverrides.has(k.id)?(baseline==='left'?'right':'left'):baseline;
}

function spriteMarkup(k, action='idle', options={}){
  const spec = k.sprites?.[action];
  const flipped=options.flip??heroIsFlipped(k);
  const roleClass=(options.enemy?' enemy-character-sheet':'')+(options.enemyRuntime?' enemy-runtime-sheet':'');
  if(spec?.src&&!failedSpriteAssets.has(spec.src)){
    const meta = {...HERO_ACTIONS[action], ...spec};
    const displayScale=normalizedActionDisplayScale(k,action,meta.displayScale);
    if(meta.format==='sheet'){
      const cols=Math.max(1,Number(meta.cols||meta.frames||1));
      const rows=Math.max(1,Number(meta.rows||1));
      const hitSrc=animationAssetUrl(meta.src);
      return `<div class="hero-sprite-sheet grid-sheet${roleClass}${flipped?' flip':''}" data-hit-src="${hitSrc}" data-hit-cols="${cols}" data-hit-rows="${rows}" aria-hidden="true" style="--sprite-url:url('${hitSrc}');--sprite-cols:${cols};--sprite-rows:${rows};--sprite-scale:${displayScale};--sprite-duration:${Number(meta.duration||520)}ms;--sprite-bg-x:0%;--sprite-bg-y:0%"></div>`;
    }
    const steps = Math.max(1, Number(meta.frames||1)-1);
    const hitSrc=animationAssetUrl(meta.src),frames=Math.max(1,Number(meta.frames||1));
    return `<div class="hero-sprite-sheet${roleClass}${flipped?' flip':''}" data-hit-src="${hitSrc}" data-hit-cols="${frames}" data-hit-rows="1" aria-hidden="true" style="--sprite-url:url('${hitSrc}');--sprite-frames:${frames};--sprite-steps:${steps};--sprite-scale:${displayScale};--sprite-duration:${Number(meta.duration||520)}ms"></div>`;
  }
  if(k.sprite) return `<img class="hero-sprite-image${roleClass}${flipped?' flip':''}" data-hit-src="${k.sprite}" data-hit-cols="1" data-hit-rows="1" src="${k.sprite}" alt="${L(k.nome)}">`;
  return CHIBI_SVG[k.id] ? scopeSvg(CHIBI_SVG[k.id],k.id) : '';
}

function stopHeroAnimation(avatar){
  if(!avatar) return;
  if(avatar.__actionFrameRaf) cancelAnimationFrame(avatar.__actionFrameRaf);
  if(avatar.__rootedIdleRaf) cancelAnimationFrame(avatar.__rootedIdleRaf);
  if(avatar.__actionTimer) clearTimeout(avatar.__actionTimer);
  avatar.__actionFrameRaf=null;
  avatar.__rootedIdleRaf=null;
  avatar.__actionTimer=null;
  avatar.__heroAnimationState=null;
}

function stopPartyAnimations(){
  partyArenaEl?.querySelectorAll('.avatar-circle').forEach(avatar=>stopHeroAnimation(avatar));
}

function pauseHeroAnimation(avatar){
  const state=avatar?.__heroAnimationState;
  if(!state||state.paused) return;
  state.paused=true;
  if(avatar.__actionFrameRaf){
    cancelAnimationFrame(avatar.__actionFrameRaf);
    avatar.__actionFrameRaf=null;
  }
  if(avatar.__actionTimer){
    clearTimeout(avatar.__actionTimer);
    avatar.__actionTimer=null;
    state.timerRemaining=Math.max(0,state.timerDeadline-performance.now());
  }
  if(avatar.__rootedIdleRaf){
    cancelAnimationFrame(avatar.__rootedIdleRaf);
    avatar.__rootedIdleRaf=null;
  }
}

function resumeHeroAnimation(avatar){
  const state=avatar?.__heroAnimationState;
  if(!state||!state.paused) return;
  state.paused=false;
  state.lastTick=null;
  if(state.tick) avatar.__actionFrameRaf=requestAnimationFrame(state.tick);
  if(state.rootedTick) avatar.__rootedIdleRaf=requestAnimationFrame(state.rootedTick);
  if(state.finish&&Number.isFinite(state.timerRemaining)){
    state.timerDeadline=performance.now()+state.timerRemaining;
    avatar.__actionTimer=window.setTimeout(state.finish,state.timerRemaining);
  }
}

function pausePartyAnimations(){
  partyArenaEl?.querySelectorAll('.avatar-circle').forEach(avatar=>pauseHeroAnimation(avatar));
}

function resumePartyAnimations(){
  partyArenaEl?.querySelectorAll('.avatar-circle').forEach(avatar=>resumeHeroAnimation(avatar));
}

function animateHeroAvatar(avatar,k,action='idle',options={}){
  if(!avatar||!k) return false;
  const requested=k.sprites?.[action]&&!failedSpriteAssets.has(k.sprites[action].src)?action:'idle';
  const spec=k.sprites?.[requested];
  const meta={...(HERO_ACTIONS[requested]||HERO_ACTIONS.idle),...spec};
  stopHeroAnimation(avatar);
  avatar.dataset.action=action;
  const overlayMarkup=options.overlayMarkup||'';
  if(spec?.src) avatar.innerHTML=spriteMarkup(k,requested,options)+overlayMarkup;
  else if(!avatar.firstElementChild) avatar.innerHTML=spriteMarkup(k,'idle',options)+overlayMarkup;
  prepareHeroBodyHitTest(avatar);
  avatar.classList.toggle('hero-action',requested!=='idle');
  const loop=options.loop??Boolean(meta.loop);
  const duration=Math.max(80,Number(meta.duration||520));
  const stableBaseScale=normalizedActionDisplayScale(k,requested,meta.displayScale);
  const frameOrder=Array.isArray(meta.frameOrder)&&meta.frameOrder.length?meta.frameOrder:null;
  const frames=frameOrder?frameOrder.length:Math.max(1,Number(meta.frames||1));
  if(action==='defeat'&&reducedMotion&&spec?.format==='sheet'&&frames>1){
    const restingSheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
    restingSheet?.style.setProperty('--sprite-bg-x','100%');
    restingSheet?.style.setProperty('--sprite-bg-y','100%');
  }
  const state={paused:false,lastTick:null,elapsed:0,timerRemaining:null,timerDeadline:0,tick:null,finish:null};
  avatar.__heroAnimationState=state;
  if(spec?.format==='sheet'&&frames>1&&!reducedMotion){
    const sheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
    const cols=Math.max(1,Number(meta.cols||frames));
    const rows=Math.max(1,Number(meta.rows||1));
    const sheetFrames=Math.max(1,Number(meta.sheetFrames||meta.frames||1));
    const positions=Array.from({length:sheetFrames},(_,frame)=>({
      x:cols<=1?0:(frame%cols)*100/(cols-1),
      y:rows<=1?0:Math.floor(frame/cols)*100/(rows-1)
    }));
    const tick=(now)=>{
      if(!sheet||!sheet.isConnected||avatar.dataset.action!==action||avatar.__heroAnimationState!==state) return;
      if(state.lastTick===null) state.lastTick=now;
      const delta=Math.max(0,now-state.lastTick);
      state.lastTick=now;
      state.elapsed+=delta;
      /* Some browsers can deliver a RAF timestamp a fraction before the
         performance.now() captured above. Clamp the first frame so a rapid
         action change never indexes positions[-1]. */
      const progress=Math.max(0,loop?(state.elapsed%duration)/duration:Math.min(.999999,state.elapsed/duration));
      const frame=Math.min(frames-1,Math.floor(progress*frames));
      const sourceFrame=frameOrder?frameOrder[frame]:frame;
      sheet.style.setProperty('--sprite-bg-x',positions[sourceFrame].x+'%');
      sheet.style.setProperty('--sprite-bg-y',positions[sourceFrame].y+'%');
      /* A física é gravada na folha: trocar de pose não altera escala, origem
         ou linha dos pés.  Só a arte e o VFX descrevem o movimento. */
      sheet.style.setProperty('--sprite-scale',String(stableBaseScale));
      sheet.style.translate='0 0';
      if(loop||state.elapsed<duration) avatar.__actionFrameRaf=requestAnimationFrame(tick);
      else{
        avatar.__actionFrameRaf=null;
        if(!options.hold&&avatar.__heroAnimationState===state){
          if(typeof options.returnToIdle==='function') options.returnToIdle();
          else animateHeroAvatar(avatar,k,'idle',{loop:true,flip:options.flip,enemy:options.enemy,overlayMarkup});
        }
      }
    };
    state.tick=tick;
    avatar.__actionFrameRaf=requestAnimationFrame(tick);
  }
  if(!loop&&!options.hold&&!(spec?.format==='sheet'&&frames>1&&!reducedMotion)){
    const finish=()=>{
      if(!avatar.isConnected||avatar.dataset.action!==action) return;
      if(typeof options.returnToIdle==='function') options.returnToIdle();
      else animateHeroAvatar(avatar,k,'idle',{loop:true,flip:options.flip,enemy:options.enemy,overlayMarkup});
    };
    state.finish=finish;
    state.timerRemaining=duration;
    state.timerDeadline=performance.now()+duration;
    avatar.__actionTimer=window.setTimeout(finish,duration);
  }
  if(gamePaused||battlePhase==='paused') pauseHeroAnimation(avatar);
  return Boolean(spec?.src);
}

function playHeroAction(idx, action='attack'){
  const k=KINGDOMS[idx];
  const avatar=k&&document.getElementById('party-'+k.id+'-avatar');
  if(!avatar) return;
  /* A comemoração precisa continuar visível enquanto o relatório está aberto.
     O estado de derrota dos inimigos continua segurando o último frame; aqui
     apenas a pose positiva dos heróis fica em loop. */
  const spec=k.sprites?.[action];
  const request=String((Number(avatar.dataset.actionRequest||0)||0)+1);
  avatar.dataset.actionRequest=request;
  const commit=()=>{
    if(!avatar.isConnected||avatar.dataset.actionRequest!==request) return;
    animateHeroAvatar(avatar,k,action,{loop:action==='victory',hold:action==='defeat'});
  };
  /* Mantém o corpo idle visível até a folha de ação estar pronta. O VFX segue
     usando o avatar já presente como origem, sem quadro preto entre as poses. */
  /* Vitória e derrota são poses finais: precisam aparecer no mesmo instante
     para não atrasar uma cena concluída ou uma queda já decidida. */
  const terminalPose=action==='victory'||action==='defeat';
  if(spec?.src&&!terminalPose&&!readySpriteAssets.has(spec.src)){
    preloadSpriteSource(spec.src).then(commit).catch(()=>{
      if(avatar.dataset.actionRequest===request) avatar.dataset.actionRequest='';
    });
    return;
  }
  commit();
}

function playHeroDefeatPoses(){
  ACTIVE.forEach(idx=>{
    const k=KINGDOMS[idx];
    if(k?.sprites?.defeat?.src) playHeroAction(idx,'defeat');
  });
}

/* Inimigos que tambem pertencem ao elenco usam a mesma animacao v10 do
   personagem. Os inimigos exclusivos continuam recebendo movimento de combate
   pelo avatar CSS, sem inventar uma folha diferente da arte original. */
function enemyCharacterFor(e){
  if(!e) return null;
  const candidates=[e.heroId,e.characterId,e.cardId,e.id,e.etype,e.name]
    .filter(Boolean).map(value=>String(value).trim().toLowerCase());
  return KINGDOMS.find(k=>candidates.some(value=>value===k.id||value===String(k.nome).trim().toLowerCase()))||null;
}

function enemyAvatarOverlay(e){
  return `<span class="enemy-intent" aria-label="${T(`Próximo ataque: aproximadamente ${e.atk} de dano`,`Next attack: about ${e.atk} damage`,`Próximo ataque: aproximadamente ${e.atk} de dano`)}">⚔ ${e.atk}</span>`;
}

function enemyFallbackMarkup(e, action='idle'){
  const flip=enemySpriteFlip(e)?' flip':'';
  const actionClass=` enemy-motion-${action}`;
  return `<img class="enemy-sprite-image${flip}${e.etype==='soldado2'?' soldado2-clean':''}${actionClass}" src="${e.sprite}" alt="${L(e.name)}"${e.tint?` style="filter:${e.tint}"`:''}>${enemyAvatarOverlay(e)}`;
}

/* Idle humano enraizado: a folha 3x3 já foi registrada pela base e pelos pés.
   O runtime troca as poses completas, sem transform artificial no corpo. */
function rootedEnemyIdleMarkup(e){
  const flip=enemySpriteFlip(e)?' flip':'';
  const idle=ROOTED_HUMAN_IDLE_LIBRARY[enemyAnimationKey(e)];
  if(!idle) return enemyFallbackMarkup(e,'idle');
  return `<span class="enemy-rooted-idle-art${flip}" style="--rooted-idle-url:url('${idle.src}')" aria-hidden="true">
    <span class="enemy-rooted-idle-sheet"></span>
  </span>${enemyAvatarOverlay(e)}`;
}

function startRootedEnemyIdle(avatar){
  const layer=avatar?.querySelector('.enemy-rooted-idle-sheet');
  if(!layer) return;
  const sequence=[0,1,2,1,0,3,4,5,4,3,6,7,8,7,6,3,0];
  const duration=4200;
  let last=null,elapsed=0;
  const state=avatar.__heroAnimationState;
  const tick=now=>{
    if(!layer.isConnected||avatar.dataset.action!=='idle'||avatar.__heroAnimationState===null) return;
    if(state?.paused) return;
    if(last===null) last=now;
    elapsed+=Math.max(0,now-last); last=now;
    const frame=sequence[Math.floor((elapsed%duration)/duration*sequence.length)];
    const x=(frame%3)*50,y=Math.floor(frame/3)*50;
    layer.style.backgroundPosition=`${x}% ${y}%`;
    avatar.__rootedIdleRaf=requestAnimationFrame(tick);
  };
  if(state) state.rootedTick=tick;
  avatar.__rootedIdleRaf=requestAnimationFrame(tick);
}

function usesRootedHumanIdle(e){
  return HUMAN_ENEMY_IDLE_IDS.has(enemyAnimationKey(e));
}

function animateEnemyAvatar(avatar,e,action='idle',options={}){
  if(!avatar||!e) return false;
  avatar.classList.remove('enemy-defeat-pose','enemy-defeated-avatar','enemy-defeat-runtime','motion-paused');
  if(action==='idle'&&usesRootedHumanIdle(e)){
    stopHeroAnimation(avatar);
    avatar.dataset.action='idle';
    avatar.classList.remove('hero-action','motion-paused');
    avatar.classList.add('enemy-avatar','enemy-static-avatar','enemy-rooted-idle');
    avatar.innerHTML=rootedEnemyIdleMarkup(e);
    avatar.__heroAnimationState={paused:false};
    startRootedEnemyIdle(avatar);
    return true;
  }
  const character=enemyCharacterFor(e)||enemyAnimationCharacter(e);
  const overlayMarkup=enemyAvatarOverlay(e);
  if(character?.sprites?.idle?.src){
    avatar.classList.remove('enemy-static-avatar','enemy-rooted-idle');
    avatar.classList.add('enemy-avatar');
    return animateHeroAvatar(avatar,character,action,{...options,enemy:true,enemyRuntime:Boolean(character.enemyRuntime),flip:enemySpriteFlip(e),overlayMarkup,
      returnToIdle:action==='idle'?undefined:()=>animateEnemyAvatar(avatar,e,'idle',{loop:true})});
  }
  stopHeroAnimation(avatar);
  avatar.dataset.action=action;
  avatar.classList.add('enemy-avatar','enemy-static-avatar');
  avatar.innerHTML=enemyFallbackMarkup(e,action);
  avatar.classList.toggle('hero-action',action!=='idle');
  const meta=HERO_ACTIONS[action]||HERO_ACTIONS.idle;
  if(action!=='idle'&&!options.hold){
    avatar.__actionTimer=window.setTimeout(()=>{
      if(avatar.isConnected&&avatar.dataset.action===action) animateEnemyAvatar(avatar,e,'idle',{loop:true});
    },Math.max(160,Number(meta.duration||520)));
  }
  return false;
}

/* A derrota é uma pose terminal real: o corpo cai uma única vez e permanece
   apoiado no chão. Não usa escala, não conserva RAF e nunca volta ao idle. */
function defeatEnemyAvatar(avatar,e){
  if(!avatar) return;
  stopHeroAnimation(avatar);
  avatar.dataset.action='defeat';
  const defeatKey=enemyAnimationKey(e||{});
  avatar.dataset.defeatPose=/slime|limo/.test(defeatKey||'')?'soft':e?.flying?'air':'body';
  avatar.classList.add('motion-paused','enemy-defeated-avatar','enemy-defeat-pose');
  avatar.setAttribute('aria-label',L(e?.name||'Inimigo derrotado'));
  const character=enemyCharacterFor(e)||enemyAnimationCharacter(e);
  if(character?.sprites?.defeat?.src){
    animateEnemyAvatar(avatar,e,'defeat',{hold:true});
    avatar.classList.add('motion-paused','enemy-defeated-avatar','enemy-defeat-pose','enemy-defeat-runtime');
    const runtimeSheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
    if(reducedMotion&&runtimeSheet){
      runtimeSheet.style.setProperty('--sprite-bg-x','100%');
      runtimeSheet.style.setProperty('--sprite-bg-y','100%');
    }
    avatar.querySelectorAll('.enemy-intent').forEach(intent=>intent.remove());
    return;
  }
  const sheet=avatar.querySelector('.hero-sprite-sheet.grid-sheet');
  if(sheet){
    sheet.style.setProperty('--sprite-bg-x','100%');
    sheet.style.setProperty('--sprite-bg-y','100%');
  }
  avatar.querySelectorAll('.enemy-rooted-idle-sheet').forEach(layer=>{ layer.style.backgroundPosition='100% 100%'; });
  avatar.querySelectorAll('.enemy-sprite-image').forEach(image=>{ image.style.animation='none'; });
}

/* Compatibilidade para probes e extensões antigas: a API legada agora aplica
   a pose de derrota em vez de deixar apenas um retrato congelado. */
function freezeEnemyAvatar(avatar){ defeatEnemyAvatar(avatar,null); }

function playEnemyAction(idx,action='attack'){
  const e=enemies[idx];
  const avatar=e&&document.getElementById('enemyPortrait-'+idx);
  if(avatar) animateEnemyAvatar(avatar,e,action,{hold:action==='victory'});
}

function pauseEnemyAnimations(){
  enemyArenaEl?.querySelectorAll('.avatar-circle').forEach(avatar=>{ avatar.classList.add('motion-paused'); pauseHeroAnimation(avatar); });
}

function resumeEnemyAnimations(){
  enemyArenaEl?.querySelectorAll('.avatar-circle').forEach(avatar=>{ avatar.classList.remove('motion-paused'); resumeHeroAnimation(avatar); });
}

function resetPartyAnimationState(){
  clearHeroConjurationLoops();
  partyArenaEl?.classList.remove('party-hurt');
  ACTIVE.forEach(idx=>{
    const k=KINGDOMS[idx];
    const unit=k&&document.getElementById('party-'+k.id);
    const avatar=k&&document.getElementById('party-'+k.id+'-avatar');
    unit?.classList.remove('attacking','casting');
    if(avatar) animateHeroAvatar(avatar,k,'idle',{loop:true});
  });
}

function trimCombatFx(){
  const layer = document.getElementById('specialFxLayer');
  if(!layer) return;
  const fx = layer.querySelectorAll('[data-fx]');
  for(let i=0;i<Math.max(0,fx.length-particleBudget());i++) releaseCombatFx(fx[i]);
}

/* O pool evita alocar e descartar dezenas de nós a cada golpe em celulares. */
const combatFxPool=[];
function acquireCombatFx(className){
  const element=combatFxPool.pop()||document.createElement('div');
  element.__fxPooled=true;
  element.__fxLease=(element.__fxLease||0)+1;
  element.className=className;
  element.replaceChildren();
  element.removeAttribute('style');
  element.dataset.fx='pooled';
  return element;
}
function releaseCombatFx(element,lease=element?.__fxLease){
  if(!element) return;
  if(element.__fxPooled!==true){ element.remove(); return; }
  if(lease!==element.__fxLease) return;
  element.__fxLease++;
  element.remove();
  element.replaceChildren();
  element.className='';
  element.removeAttribute('style');
  delete element.dataset.fx;
  if(combatFxPool.length<MAX_ACTIVE_FX) combatFxPool.push(element);
}

function spawnCombatFx(kind,target,color='#fff',duration=650){
  const layer = document.getElementById('specialFxLayer');
  if(!layer || !target || !particlesEnabled || reducedMotion) return;
  if(kind==='impact'||kind==='critical') pulseArenaLighting(color,target,kind);
  const lr=layer.getBoundingClientRect(), tr=target.getBoundingClientRect();
  const fxClass=kind==='hit'?'fx-hit-spark':kind==='impact'?'fx-impact-burst':kind==='critical'?'fx-critical-impact':'attack-telegraph';
  const fx=acquireCombatFx(fxClass);
  const lease=fx.__fxLease;
  fx.dataset.fx=kind;
  fx.style.color=color;
  fx.style.left=(tr.left-lr.left+tr.width/2)+'px';
  fx.style.top=(tr.top-lr.top+tr.height/2)+'px';
  layer.appendChild(fx); trimCombatFx();
  window.setTimeout(()=>releaseCombatFx(fx,lease),duration);
}

/* Ataque comum: liga visualmente a origem ao alvo sem tocar no transform do
   sprite. Cada reino escolhe uma assinatura própria, enquanto o pool limita
   a quantidade de nós e o mesmo efeito serve para cartas e inimigos. */
const BLADE_ATTACK_IDS=new Set(['adriel-jovem','gareth','roland','kalander','capitao','soldado1','soldado2','sold-bib1','sold-bib2','sold-bib3','infantaria','cavalaria','comandante','trono']);
const CLAW_ATTACK_IDS=new Set(['lobo-raivoso','shadow-wolf','crimson-dragon']);
const BODY_ATTACK_IDS=new Set(['slime-cereja','rune-slime','stone-sentinel']);
/* O Reino dos Humanos usa a mesma assinatura rosa em ataque, fala e impacto.
   A arte particular do personagem continua intacta: apenas a camada VFX é
   tonalizada. Julius não entra nesta regra porque pertence às Sombras. */
const HUMAN_REALM_ATTACK_COLOR='#ed5b9c';
const HUMAN_REALM_ATTACK_LIGHT='#ffe0ee';
const HUMAN_REALM_ATTACK_IDS=new Set(['gareth','cedric','elizier','roland','berenice-jovem','adriel-jovem','jules','kalander','bernyce']);
const HUMAN_CHAPTER_ATTACK_SHEETS=Object.freeze({
  gareth:'assets/vfx/v11-review/human/gareth/attack/processed/sheet-transparent.png',
  cedric:'assets/vfx/v11-review/human/cedric/attack/processed/sheet-transparent.png',
  elizier:'assets/vfx/v11-review/human/elizier/attack/processed/sheet-transparent.png',
  roland:'assets/vfx/v11-review/human/roland/attack/processed/sheet-transparent.png',
  'berenice-jovem':'assets/vfx/v11-review/human/berenice-jovem/attack/processed/sheet-transparent.png',
  'galateia-jovem':'assets/vfx/v11-review/human/galateia-jovem/attack/processed/sheet-transparent.png',
  'adriel-jovem':'assets/vfx/v11-review/human/adriel-jovem/attack/processed/sheet-transparent.png',
  'acqua-jovem':'assets/vfx/v11-review/human/acqua-jovem/attack/processed/sheet-transparent.png',
  jules:'assets/vfx/v11-review/human/jules/attack/processed/sheet-transparent.png',
  kalander:'assets/vfx/v11-review/human/kalander/attack/processed/sheet-transparent.png',
  bernyce:'assets/vfx/v11-review/human/bernyce/attack/processed/sheet-transparent.png',
  julius:'assets/vfx/v11-review/human/julius/attack/processed/sheet-transparent.png'
});
function combatActorId(attacker){ return String(attacker?.id||attacker?.heroId||attacker?.characterId||attacker?.cardId||'').toLowerCase(); }
function isHumanRealmAttacker(attacker){
  const id=combatActorId(attacker);
  return HUMAN_REALM_ATTACK_IDS.has(id)||attacker?.iconId==='humanos'||attacker?.deck==='humanos'||attacker?.reino==='Reino dos Humanos';
}
function attackSheetProfile(attacker){
  const id=combatActorId(attacker),src=HUMAN_CHAPTER_ATTACK_SHEETS[id];
  if(!src) return null;
  const projectile=new Set(['cedric','elizier','acqua-jovem','jules','bernyce']).has(id);
  return {
    id,src,humanPink:isHumanRealmAttacker(attacker),shadow:id==='julius',projectile,
    /* A folha VFX é sempre uma extensão do golpe: inclusive o X de Kalander
       percorre a trajetória até o inimigo selecionado. */
    travelsToTarget:true,
    /* Elizier parte da ponta do arco, não do centro do retrato. */
    sourceXRight:id==='elizier' ? .78 : null,
    sourceXLeft:id==='elizier' ? .22 : null,
    sourceY:id==='elizier' ? .39 : null
  };
}
function combatAttackStyle(attacker){
  if(!attacker) return 'spell';
  const heroId=String(attacker.id||attacker.heroId||attacker.characterId||attacker.cardId||'').toLowerCase();
  const key=enemyAnimationKey(attacker)||heroId;
  if(heroId==='agua') return 'water-jet';
  if(BLADE_ATTACK_IDS.has(heroId)||BLADE_ATTACK_IDS.has(key)) return 'blade';
  if(CLAW_ATTACK_IDS.has(key)||/lobo|wolf|drag[aã]o/.test(key)) return 'claw';
  if(BODY_ATTACK_IDS.has(key)||/slime|limo|golem|sentinela/.test(key)) return 'body';
  return 'spell';
}

/* Final da missão 10/5: a conclusão não é uma tela abstrata. Ela encena a
   derrota descrita no roteiro, preservando os sprites oficiais de cada pessoa
   e a física de queda (pés, corpo e equipamento assentados no chão). */
let humanFinaleCinematicRunning=false;
let humanFinalePreludeRunning=false;
let humanFinalePreludeFinished=false;
let humanFinaleOutcomeResolved=false;
let humanFinalePreviewSetup=false;
function isHumanFinaleBattle(){
  return Boolean(worldRun.active&&worldRun.fase===9&&worldRun.nivel===5&&activeStageData?.bgUrl?.endsWith('fase-10.jpg'));
}
function finalSceneSprite(id,action='defeat'){
  const character=KINGDOMS.find(k=>k.id===id);
  const spec=character?.sprites?.[action]||character?.sprites?.idle;
  if(!spec?.src) return '';
  const cols=Math.max(1,Number(spec.cols||spec.frames||1));
  const rows=Math.max(1,Number(spec.rows||1));
  const resting=action!=='idle';
  const frameX=resting&&cols>1?100:0;
  const frameY=resting&&rows>1?100:0;
  return `<span class="human-final-scene-sprite" style="--sprite-url:url('${animationAssetUrl(spec.src)}');--sprite-cols:${cols};--sprite-rows:${rows};--sprite-bg-x:${frameX}%;--sprite-bg-y:${frameY}%"></span>`;
}
function finalSceneActor(id,kind='fallen'){
  const character=KINGDOMS.find(k=>k.id===id);
  const action=['victor','original','prelude','prelude-arena'].includes(kind)?'idle':'defeat';
  return `<span class="human-final-scene-actor finale-${id} finale-${kind}" data-finale-actor="${id}-${kind}" style="--realm:${character?.color||'#d78be8'}">${finalSceneSprite(id,action)}</span>`;
}
function finaleActor(scene,id,kind){ return scene?.querySelector(`[data-finale-actor="${id}-${kind}"]`); }
function mountHumanFinaleScene(outcome='defeat'){
  let scene=arenaEl?.querySelector('.human-final-scene');
  if(scene) return scene;
  arenaEl?.querySelector('.human-final-prelude')?.remove();
  arenaEl?.querySelector('.royal-court-cast')?.remove();
  scene=document.createElement('div');
  scene.className=`human-final-scene finale-outcome-${outcome}`;
  scene.setAttribute('aria-hidden','true');
  scene.innerHTML=`
    ${finalSceneActor('bernyce')}
    ${finalSceneActor('kalander')}
    ${finalSceneActor('cedric')}
    ${finalSceneActor('julius','shadow')}
    ${finalSceneActor('julius','original')}
    <span class="human-final-teleport" aria-hidden="true"></span>`;
  arenaEl?.appendChild(scene);
  return scene;
}
function setFinaleHeroDefeat(id){
  const character=KINGDOMS.find(k=>k.id===id);
  const unit=character&&document.getElementById('party-'+id);
  const avatar=character&&document.getElementById('party-'+id+'-avatar');
  if(!character||!unit||!avatar) return;
  unit.classList.add('human-final-hero-fallen');
  animateHeroAvatar(avatar,character,'defeat',{hold:true});
}
/* O epílogo do Reino dos Humanos não é uma comemoração da equipe: todos os
   sobreviventes da luta ficam caídos, enquanto Adriel já não está na arena.
   Reaplicamos a pose antes do relatório para que o fluxo normal de vitória
   nunca possa sobrescrever a física narrativa com a animação de celebração. */
function enforceHumanFinaleAftermath(){
  const adrielId='adriel-jovem';
  ACTIVE.map(index=>KINGDOMS[index]?.id).filter(Boolean).forEach(id=>{
    if(id!==adrielId) setFinaleHeroDefeat(id);
  });
  document.getElementById('party-'+adrielId)?.classList.add('human-final-adriel-vanished');
}
function placeGarethBeforeAdriel(){
  const adriel=document.getElementById('party-adriel-jovem');
  const gareth=document.getElementById('party-gareth');
  if(!adriel||!gareth) return;
  gareth.style.setProperty('--slot-x',adriel.style.getPropertyValue('--slot-x'));
  gareth.style.setProperty('--slot-y',adriel.style.getPropertyValue('--slot-y'));
  gareth.style.setProperty('--slot-z',String((Number(adriel.style.getPropertyValue('--slot-z'))||20)+8));
  gareth.classList.add('human-final-gareth-shield');
}
function placeFinaleTeleportAt(scene,targetId='adriel-jovem'){
  const adriel=document.getElementById('party-'+targetId);
  const halo=scene?.querySelector('.human-final-teleport');
  if(!adriel||!halo||!arenaEl) return;
  const target=adriel.getBoundingClientRect();
  const arena=arenaEl.getBoundingClientRect();
  halo.style.left=(target.left+target.width*.5-arena.left)+'px';
  halo.style.top=(target.top+target.height*.44-arena.top)+'px';
  halo.style.width=Math.max(46,target.width*.88)+'px';
  halo.style.height=Math.max(46,target.height*.72)+'px';
}
/* VFXs exclusivos do desfecho: não dependem da camada comum de combate,
   que pode estar sob a cena cinematográfica. Cada corte nasce no braço de
   Julius, percorre o espaço até o corpo atingido e termina em impacto. */
function spawnFinaleShadowStrike(scene,source,target,options={}){
  if(!scene||!source||!target) return false;
  const frame=scene.getBoundingClientRect(), sr=source.getBoundingClientRect(), tr=target.getBoundingClientRect();
  if(frame.width<1||frame.height<1||sr.width<1||tr.width<1) return false;
  const sourceCenterX=sr.left+sr.width*.5, targetCenterX=tr.left+tr.width*.5;
  const sx=sr.left-frame.left+sr.width*(targetCenterX>=sourceCenterX?.76:.24);
  const sy=sr.top-frame.top+sr.height*.38;
  const tx=tr.left-frame.left+tr.width*.5;
  const ty=tr.top-frame.top+tr.height*.43;
  const dx=tx-sx, dy=ty-sy;
  const distance=Math.hypot(dx,dy);
  if(distance<8) return false;
  const fx=document.createElement('span');
  /* A caveira é o projétil: curta, física e independente da aura de Julius. */
  const duration=Math.max(230,Math.round(520*(Number(options.speed||1))));
  fx.className='human-final-shadow-strike';
  fx.setAttribute('aria-hidden','true');
  fx.style.setProperty('--finale-sx',sx+'px');
  fx.style.setProperty('--finale-sy',sy+'px');
  fx.style.setProperty('--finale-dx',dx+'px');
  fx.style.setProperty('--finale-dy',dy+'px');
  fx.style.setProperty('--finale-dx-34',(dx*.34)+'px');
  fx.style.setProperty('--finale-dy-34',(dy*.34)+'px');
  fx.style.setProperty('--finale-dx-68',(dx*.68)+'px');
  fx.style.setProperty('--finale-dy-68',(dy*.68)+'px');
  fx.style.setProperty('--finale-angle',Math.atan2(dy,dx)*180/Math.PI+'deg');
  fx.style.setProperty('--finale-vfx-duration',duration+'ms');
  fx.innerHTML='<i class="human-final-shadow-skull"></i>';
  /* A cena fica abaixo dos retratos vivos para preservar a composição; o
     projétil, porém, precisa cruzar POR CIMA do corpo que atinge. */
  (arenaEl||scene).appendChild(fx);
  scheduleCombat(()=>fx.remove(),duration+140);
  return true;
}
/* Este valor pertence à linha do tempo, não à duração visual do CSS. `at()`
   já aplica a velocidade da prévia; multiplicar aqui fazia cada cena rápida
   colapsar as batidas antes de a fala de Cedric terminar. */
function finaleShadowImpactDelay(){ return 430; }
function spawnFinaleTeleportVfx(scene,targetId='adriel-jovem',options={}){
  const target=document.getElementById('party-'+targetId);
  if(!scene||!target) return false;
  const frame=scene.getBoundingClientRect(), tr=target.getBoundingClientRect();
  if(frame.width<1||frame.height<1||tr.width<1) return false;
  const fx=document.createElement('span');
  /* Mesmo na prévia acelerada, a bolha precisa permanecer tempo suficiente
     para o jogador ler a conjuração e o desaparecimento de Adriel. */
  const duration=Math.max(900,Math.round(1550*(Number(options.speed||1))));
  fx.className='human-final-teleport-vfx';
  fx.setAttribute('aria-hidden','true');
  fx.style.setProperty('--teleport-x',(tr.left-frame.left+tr.width*.5)+'px');
  fx.style.setProperty('--teleport-y',(tr.top-frame.top+tr.height*.46)+'px');
  fx.style.setProperty('--teleport-size',Math.max(74,tr.height*.96)+'px');
  fx.style.setProperty('--teleport-duration',duration+'ms');
  fx.innerHTML='<i class="human-final-teleport-core"></i><i class="human-final-teleport-ring ring-a"></i><i class="human-final-teleport-ring ring-b"></i><i class="human-final-teleport-runes"></i><i class="human-final-teleport-sparks"></i>';
  scene.appendChild(fx);
  scheduleCombat(()=>fx.remove(),duration+150);
  return true;
}
function playFinaleLines(lines,onDone,options={}){
  const speed=Math.max(.02,Number(options.speed||1));
  let cursor=0;
  const lockFinal=options.locked===true;
  const next=()=>{
    if(cursor>=lines.length){ if(typeof onDone==='function') onDone(); return; }
    const item=lines[cursor++];
    showStorySequence([item]);
    if(lockFinal) document.getElementById('storyLayer')?.setAttribute('data-final-cinematic','1');
    scheduleCombat(()=>{ skipStory(false); next(); },Math.max(520,Math.round((item.ms||2200)*speed)));
  };
  next();
}
function unleashFinaleShadow(scene,source,targets,options={}){
  const julius=KINGDOMS.find(k=>k.id==='julius');
  scene?.classList.add('shadow-unleashed');
  if(julius&&source) spawnHumanConjurationAura(julius,source);
  targets.forEach(target=>{
    if(source&&target) spawnFinaleShadowStrike(scene,source,target,options);
  });
}
function mountHumanFinalePrelude(){
  let scene=arenaEl?.querySelector('.human-final-prelude');
  if(scene) return scene;
  scene=document.createElement('div');
  scene.className='human-final-prelude';
  scene.setAttribute('aria-hidden','true');
  scene.innerHTML=`
    ${finalSceneActor('bernyce','prelude-arena')}
    ${finalSceneActor('kalander','prelude-arena')}
    ${finalSceneActor('cedric','prelude')}`;
  arenaEl?.appendChild(scene);
  return scene;
}
function triggerHumanFinalePrelude(options={}){
  if(!isHumanFinaleBattle()||humanFinalePreludeFinished||humanFinalePreludeRunning) return false;
  humanFinalePreludeRunning=true;
  busy=true; stageTransitioning=true; setBattlePhase('transition');
  const speed=Math.max(.02,Number(options.speed||1));
  const at=(ms,fn)=>scheduleCombat(fn,Math.max(40,Math.round(ms*speed)));
  const scene=mountHumanFinalePrelude();
  const court=arenaEl?.querySelector('.royal-court-cast');
  const juliusIndex=enemies.findIndex(enemy=>enemy?.cardId==='julius');
  const liveJulius=juliusIndex>=0?document.getElementById('enemy-'+juliusIndex):null;
  const juliusAvatar=liveJulius?.querySelector('.enemy-avatar')||liveJulius;
  /* Bernyce e Kalander continuam onde a luta anterior os deixou: na arena.
     Apenas Jules e Cedric observam do trono antes da chegada de Julius. */
  arenaEl?.classList.add('human-finale-prelude-active');
  setBattleStatus(T('Jules e Cedric observam a arena em silêncio.','Jules and Cedric watch the arena in silence.','Jules y Cedric observan la arena en silencio.'),'system');
  at(3800,()=>{
    court?.classList.add('court-jules-leaving','court-cedric-joining');
    arenaEl?.classList.remove('human-finale-before-darkness');
    arenaEl?.classList.add('human-finale-darkening');
    setBattleStatus(T('Uma sombra toma o Castelo da Coroa Humana...','A shadow takes the Human Crown Castle...','Una sombra toma el Castillo de la Corona Humana...'),'system');
  });
  at(5700,()=>{
    court?.classList.add('court-cedric-joined');
    scene?.classList.add('cedric-joined');
  });
  /* Julius entra depois dos 3,1 segundos de escurecimento progressivo. */
  at(7300,()=>{
    liveJulius?.classList.add('julius-entered');
    scene?.classList.add('julius-entered');
    if(juliusIndex>=0) playEnemyAction(juliusIndex,'idle');
    playFinaleLines([{name:'Julius',sprite:KINGDOMS.find(k=>k.id==='julius')?.sprite,t:'Morram todos! Corte Sombrio!',enemyIndex:juliusIndex,ms:2200}],null,{speed});
  });
  at(10050,()=>{
    const targets=['bernyce','kalander','cedric'].map(id=>finaleActor(scene,id,id==='cedric'?'prelude':'prelude-arena')).filter(Boolean);
    unleashFinaleShadow(scene,juliusAvatar,targets,{speed});
  });
  at(10050+finaleShadowImpactDelay(),()=>{
    ['bernyce','kalander','cedric'].forEach(id=>{
      const actor=finaleActor(scene,id,id==='cedric'?'prelude':'prelude-arena');
      if(actor){ actor.innerHTML=finalSceneSprite(id,'defeat'); actor.classList.add('fallen'); }
    });
    scene?.classList.add('court-struck');
  });
  at(12200,()=>{
    playFinaleLines([{h:'adriel-jovem',t:'Rainha!!! Kalander!!!',ms:1850}],null,{speed});
  });
  at(14500,()=>{
    humanFinalePreludeFinished=true;
    humanFinalePreludeRunning=false;
    stageTransitioning=false; busy=false;
    scene?.classList.add('prelude-complete');
    beginMissionField();
  });
  return true;
}
function completeHumanFinaleCinematic(options={}){
  humanFinaleCinematicRunning=false;
  humanFinaleOutcomeResolved=true;
  enforceHumanFinaleAftermath();
  if(options.preview){ busy=false; stageTransitioning=false; setBattlePhase('idle'); return; }
  stageTransitioning=false; busy=false;
  onStageCleared();
}
function triggerHumanFinaleCinematic(outcome='defeat',options={}){
  if(!isHumanFinaleBattle()){ onStageCleared(); return; }
  if(humanFinaleCinematicRunning) return;
  humanFinaleCinematicRunning=true;
  busy=true; stageTransitioning=true;
  setBattlePhase('transition');
  cancelTempoSombrio();
  const speed=Math.max(.02,Number(options.speed||1));
  const at=(ms,fn)=>scheduleCombat(fn,Math.max(40,Math.round(ms*speed)));
  const scene=mountHumanFinaleScene(outcome);
  const juliusIndex=enemies.findIndex(enemy=>enemy?.cardId==='julius');
  const liveJulius=juliusIndex>=0?document.getElementById('enemy-'+juliusIndex):null;
  const liveAvatar=liveJulius?.querySelector('.enemy-avatar')||liveJulius;
  const original=finaleActor(scene,'julius','original');
  const shadow=finaleActor(scene,'julius','shadow');
  arenaEl?.classList.add('human-finale-darkening');
  arenaEl?.querySelector('.royal-court-cast')?.remove();
  liveJulius?.classList.add('human-final-julius-hidden');
  setBattleStatus(outcome==='victory'
    ?T('A sombra vencida se desfaz — o verdadeiro Julius se revela.','The defeated shadow dissolves — the real Julius reveals himself.','La sombra derrotada se disuelve — el verdadero Julius se revela.')
    :T('Julius reúne a escuridão que resta no castelo.','Julius gathers the darkness left in the castle.','Julius reúne la oscuridad que queda en el castillo.'),'system');
  if(outcome==='victory'){
    scene?.classList.add('shadow-defeated');
    at(900,()=>{ shadow?.classList.add('dissolving'); });
    at(2050,()=>{ scene?.classList.add('original-revealed'); original?.classList.add('casting'); });
  }else{
    scene?.classList.add('original-revealed');
    original?.classList.add('casting');
  }
  const auraAt=outcome==='victory'?2600:650;
  const impactDelay=finaleShadowImpactDelay();
  const garethFallAt=auraAt+3050+impactDelay;
  /* Gareth só cai depois de a caveira/corte o alcançar; deixamos uma batida
     de leitura antes de Cedric erguer o teleporte. */
  const teleportAt=Math.max(auraAt+3900,garethFallAt+560);
  const cedricLineAt=teleportAt+700;
  at(auraAt,()=>{
    const julius=KINGDOMS.find(k=>k.id==='julius');
    if(original) original.innerHTML=finalSceneSprite('julius','cast');
    if(julius&&original) spawnHumanConjurationAura(julius,original);
    scene?.classList.add('julius-conjuring');
  });
  at(auraAt+1500,()=>{
    const protectedId='adriel-jovem';
    const victims=ACTIVE.map(i=>KINGDOMS[i]?.id).filter(id=>id&&id!==protectedId&&id!=='gareth');
    const targets=victims.map(id=>document.getElementById('party-'+id)).filter(Boolean);
    unleashFinaleShadow(scene,original,targets,{speed});
  });
  at(auraAt+1500+impactDelay,()=>{
    const protectedId='adriel-jovem';
    const victims=ACTIVE.map(i=>KINGDOMS[i]?.id).filter(id=>id&&id!==protectedId&&id!=='gareth');
    victims.forEach(setFinaleHeroDefeat);
    scene?.classList.add('heroes-struck');
    placeGarethBeforeAdriel();
  });
  at(auraAt+3050,()=>{
    const gareth=document.getElementById('party-gareth');
    if(original&&gareth) spawnFinaleShadowStrike(scene,original,gareth,{speed});
    scene?.classList.add('gareth-sacrificed');
  });
  at(garethFallAt,()=>{
    setFinaleHeroDefeat('gareth');
  });
  at(teleportAt,()=>{
    const cedric=finaleActor(scene,'cedric','fallen');
    placeFinaleTeleportAt(scene,'adriel-jovem');
    if(cedric) spawnHumanConjurationAura(KINGDOMS.find(k=>k.id==='cedric'),cedric);
    spawnFinaleTeleportVfx(scene,'adriel-jovem',{speed});
    scene?.classList.add('adriel-teleporting');
    document.getElementById('party-adriel-jovem')?.classList.add('human-final-adriel-vanished');
  });
  const runFinalNarration=()=>{
    scene?.setAttribute('data-final-narration','active');
    if(original) original.innerHTML=finalSceneSprite('julius','victory');
    original?.classList.remove('casting'); original?.classList.add('victorious');
    scene?.classList.add('julius-victorious');
    setBattleStatus(T('Adriel desaparece na luz rosa de Cedric.','Adriel vanishes into Cedric\'s pink light.','Adriel desaparece en la luz rosa de Cedric.'),'support');
    playFinaleLines([
      {name:'Narrador',t:'E assim termina a primeira parte de nossa aventura! O que acontecerá com Adriel? Qual o paradeiro de Berenice? Quem é Julius?',ms:2800},
      {name:'Narrador',t:'Não percam o próximo capítulo dessa aventura!',ms:1900}
    ],()=>completeHumanFinaleCinematic({...options,scene}),{speed,locked:true});
  };
  at(cedricLineAt,()=>{
    /* A narração só pode começar quando o balão de Cedric foi fechado. Isso
       impede que o temporizador da fala anterior esconda o epílogo. */
    scene?.setAttribute('data-final-cedric-line','shown');
    playFinaleLines([{h:'cedric',t:'Viva Jovem!!! Seja nossa esperança!',ms:2000}],()=>{
      scheduleCombat(runFinalNarration,Math.max(180,Math.round(260*speed)));
    },{speed,locked:true});
  });
}
/* Ataques físicos viajam como golpes materiais e não usam a trajetória mágica.
   A camada de VFX continua completamente separada do sprite: nada altera
   escala, nitidez ou a linha dos pés do personagem. */
function spawnCombatAttackFx(realmId,source,target,color='#fff',kind='impact',attacker=null){
  const layer=document.getElementById('specialFxLayer');
  if(!layer||!source||!target||!particlesEnabled||reducedMotion||reduceFlashes) return;
  const quality=resolvedGraphicsQuality();
  if(V10.quality?.arenaEffects?.[quality]===false && kind!=='critical') return;
  const lr=layer.getBoundingClientRect(), sr=source.getBoundingClientRect(), tr=target.getBoundingClientRect();
  const sheet=attackSheetProfile(attacker);
  /* O golpe deixa a mão/arma que aponta para o alvo e toca a borda dele, não
     o centro dos dois retratos. Isso resolve VFX solto sem alterar sprite,
     escala, sombra ou linha dos pés. */
  const sourceCenterX=sr.left+sr.width/2, targetCenterX=tr.left+tr.width/2;
  const pointsRight=targetCenterX>=sourceCenterX;
  const sx=sr.left-lr.left+sr.width*(pointsRight ? (sheet?.sourceXRight??.68) : (sheet?.sourceXLeft??.32)), sy=sr.top-lr.top+sr.height*(sheet?.sourceY??.48);
  const tx=tr.left-lr.left+tr.width*(pointsRight ? .36 : .64), ty=tr.top-lr.top+tr.height*.47;
  const dx=tx-sx, dy=ty-sy, dist=Math.max(24,Math.hypot(dx,dy));
  const realm=REALM_FX_PROFILE[realmId]?realmId:'humanos';
  const style=combatAttackStyle(attacker);
  const fx=acquireCombatFx(`fx-attack-signature ${sheet?'attack-sheet-signature':`attack-${style} ${style==='spell'?`attack-${realm}`:''}`}`);
  const lease=fx.__fxLease;
  fx.dataset.fx='attack-signature';
  fx.dataset.attackKind=kind;
  fx.dataset.attackStyle=style;
  fx.dataset.sourceAnchor=source.id||'';
  fx.dataset.targetAnchor=target.id||'';
  fx.style.left=sx+'px';
  fx.style.top=sy+'px';
  /* Lâminas usam o tom-base do próprio reino; o brilho claro só cria leitura
     de velocidade e não substitui a identidade cromática do golpe. */
  const humanPink=isHumanRealmAttacker(attacker)||realmId==='humanos';
  const attackColor=humanPink?HUMAN_REALM_ATTACK_COLOR:(style==='blade'?(attacker?.color||color):color);
  const attackLight=humanPink?HUMAN_REALM_ATTACK_LIGHT:(style==='blade'?(attacker?.colorLight||attackColor):(kind==='critical'?'#fff7cf':color));
  fx.style.color=attackColor;
  fx.style.setProperty('--attack-color',attackColor);
  fx.style.setProperty('--attack-light',attackLight);
  fx.style.setProperty('--attack-angle',Math.atan2(dy,dx)*180/Math.PI+'deg');
  fx.style.setProperty('--attack-length',dist+'px');
  fx.style.setProperty('--attack-dx',dx+'px');
  fx.style.setProperty('--attack-dy',dy+'px');
  fx.style.setProperty('--maril-water-width',Math.min(300,Math.max(116,dist*.96))+'px');
  fx.style.setProperty('--maril-water-height',Math.min(154,Math.max(78,dist*.46))+'px');
  if(sheet){
    fx.style.setProperty('--attack-sheet',`url("${sheet.src}")`);
    fx.style.setProperty('--attack-sheet-width',Math.min(196,Math.max(102,dist*.68))+'px');
    fx.style.setProperty('--attack-sheet-height',Math.min(132,Math.max(76,dist*.42))+'px');
    const sheetTravel=Math.max(0,dist-Math.min(104,Math.max(52,dist*.24)));
    fx.style.setProperty('--attack-sheet-travel',sheetTravel+'px');
    fx.style.setProperty('--attack-sheet-travel-28',(sheetTravel*.28)+'px');
    fx.style.setProperty('--attack-sheet-travel-58',(sheetTravel*.58)+'px');
    fx.style.setProperty('--attack-sheet-filter',sheet.shadow?'grayscale(1) contrast(1.12) drop-shadow(0 0 6px rgba(212,220,234,.36))':sheet.humanPink?'grayscale(1) sepia(1) saturate(5) hue-rotate(284deg) brightness(1.08) contrast(1.04) drop-shadow(0 0 7px rgba(255,105,177,.86))':'drop-shadow(0 0 6px rgba(255,255,255,.42))');
  }
  /* O corpo nunca recebe o efeito: origem, trajetória e contato são elementos
     independentes na camada de VFX. Assim a leitura fica mais rica sem alterar
     escala, linha dos pés ou nitidez do sprite em WebViews móveis. */
  fx.innerHTML=sheet
    ? '<span class="attack-sheet"></span><span class="attack-contact physical"></span>'
    : style==='blade'
      ? '<span class="attack-swing"></span><span class="attack-swing echo"></span><span class="attack-contact physical"></span>'
    : style==='water-jet'
      ? '<span class="maril-water-blast-sheet" aria-hidden="true"></span>'
    : style==='claw'
      ? '<span class="attack-claw-mark claw-one"></span><span class="attack-claw-mark claw-two"></span><span class="attack-claw-mark claw-three"></span><span class="attack-contact physical"></span>'
      : style==='body'
        ? '<span class="attack-body-wave"></span><span class="attack-contact physical"></span>'
      : '<span class="attack-origin"></span><span class="attack-trail"></span><span class="attack-trail secondary"></span><span class="attack-mote mote-a"></span><span class="attack-mote mote-b"></span><span class="attack-contact"></span>';
  fx.classList.toggle('attack-projectile',Boolean(sheet?.travelsToTarget));
  layer.appendChild(fx);
  trimCombatFx();
  window.setTimeout(()=>releaseCombatFx(fx,lease),kind==='critical'?980:820);
}

/* v9 · Partículas temáticas por reino: cada ataque tem identidade própria.
   angle em graus (0=direita, -90=sobe, 90=cai); dist em px; dur em ms. */
const REALM_FX_PROFILE={
  fogo:    {count:12, angle:[-125,-55], dist:[26,64], dur:[520,880],  rot:[0,90],    scale:[.8,1.25]},  // brasas sobem
  agua:    {count:12, angle:[35,145],   dist:[24,60], dur:[520,860],  rot:[-25,25],  scale:[.8,1.15]},  // respingos caem
  luz:     {count:10, angle:[0,360],    dist:[22,58], dur:[480,820],  rot:[0,180],   scale:[.7,1.3]},   // fagulhas radiais
  humanos: {count:8,  angle:[0,360],    dist:[14,42], dur:[560,900],  rot:[0,0],     scale:[1.2,2.1]},  // anéis do tempo
  natureza:{count:10, angle:[55,125],   dist:[28,66], dur:[700,1100], rot:[140,520], scale:[.85,1.2]},  // folhas rodopiam
  terra:   {count:12, angle:[20,160],   dist:[26,62], dur:[460,760],  rot:[90,400],  scale:[.8,1.2]},   // estilhaços
  areia:   {count:16, angle:[-22,22],   dist:[30,80], dur:[520,880],  rot:[0,140],   scale:[.7,1.1], mirror:true}, // rajada lateral
  sombras: {count:11, angle:[-140,-40], dist:[20,52], dur:[700,1150], rot:[-60,60],  scale:[1,1.6]},    // névoa ascende
  raio:    {count:12, angle:[0,360],    dist:[24,62], dur:[380,640],  rot:[0,90],    scale:[.7,1.2]},   // faíscas elétricas rápidas
  vento:   {count:12, angle:[-30,30],   dist:[34,84], dur:[520,860],  rot:[-180,180],scale:[.7,1.15], mirror:true}, // lufadas laterais
  chuvas:  {count:14, angle:[75,105],   dist:[30,70], dur:[430,700],  rot:[8,14],    scale:[.8,1.1]},   // gotas despencam
  gelo:    {count:11, angle:[60,120],   dist:[24,58], dur:[750,1200], rot:[-160,160],scale:[.7,1.2]}    // flocos derivam
};
function spawnRealmParticles(realmId, targetEl, countOverride){
  const layer=document.getElementById('specialFxLayer');
  const prof=REALM_FX_PROFILE[realmId];
  if(!layer||!targetEl||!prof||!particlesEnabled||reducedMotion) return;
  const lr=layer.getBoundingClientRect(), tr=targetEl.getBoundingClientRect();
  const cx=tr.left-lr.left+tr.width/2, cy=tr.top-lr.top+tr.height/2;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const n=Math.max(1,Math.min(countOverride||prof.count,particleBudget()));
  for(let i=0;i<n;i++){
    const p=acquireCombatFx('realm-particle rp-'+realmId);
    const lease=p.__fxLease;
    p.dataset.fx='particle';
    const ang=rand(prof.angle[0],prof.angle[1])*Math.PI/180;
    const dist=rand(prof.dist[0],prof.dist[1]);
    const flip=prof.mirror&&i%2?-1:1;
    const dur=rand(prof.dur[0],prof.dur[1]);
    const delay=rand(0,120);
    p.style.left=(cx+rand(-9,9))+'px';
    p.style.top=(cy+rand(-9,9))+'px';
    p.style.setProperty('--dx',(Math.cos(ang)*dist*flip).toFixed(1)+'px');
    p.style.setProperty('--dy',(Math.sin(ang)*dist).toFixed(1)+'px');
    p.style.setProperty('--rot',rand(prof.rot[0],prof.rot[1]).toFixed(0)+'deg');
    p.style.setProperty('--rp-scale',rand(prof.scale[0],prof.scale[1]).toFixed(2));
    p.style.setProperty('--rp-dur',dur.toFixed(0)+'ms');
    p.style.setProperty('--rp-delay',delay.toFixed(0)+'ms');
    layer.appendChild(p);
    window.setTimeout(()=>releaseCombatFx(p,lease),dur+delay+120);
  }
  trimCombatFx();
}

function renderPartyArena(){
  partyArenaEl.innerHTML = '';
  computeBattleGemColors();
  ACTIVE.forEach(idx=>{
    const k = KINGDOMS[idx];
    const ag = battleGemColors[idx];
    const gemC=ag?ag.c:(k.orbColor||k.color), gemL=ag?ag.l:(k.orbColorLight||k.colorLight), gemD=ag?ag.d:(k.orbColorDark||k.colorDark);
    const unit = document.createElement('div');
    unit.className = 'unit hero-unit rarity-'+(k.stars||0)+(k.id.endsWith('-jovem')?' hero-young':'')+(heroUsesFlightPhysics(k)?' hero-flying':'');
    unit.id = 'party-'+k.id;
    unit.dataset.heroIndex=String(idx);
    unit.dataset.facing=heroFacingDirection(k);
    unit.dataset.groundPhysics=heroUsesFlightPhysics(k)?'flight':'grounded';
    unit.style.setProperty('--realm',k.color);
    unit.style.setProperty('--aura-inner',k.color);
    unit.style.setProperty('--aura-inner-light',k.colorLight);
    unit.style.setProperty('--aura-outer',k.rarity==='DIVINA'?'#ffe58a':k.colorLight);
    unit.style.setProperty('--aura-outer-light',k.rarity==='DIVINA'?'#ffffff':k.color);
    unit.style.setProperty('--unit-art-scale',String(cardArtScale(k)));
    const avatarContent = spriteMarkup(k,'idle');
    const stageHtml=`
      <div class="unit-stage">
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle" id="party-${k.id}-avatar" data-hero-id="${k.id}" data-action="idle">${avatarContent}</div>
      </div>`;
    const nomeHtml=vizPrefs.heroNames==='off'?'':`
       <div class="unit-name${vizPrefs.heroNames==='top'?' name-top':''}"><span class="unit-gem" style="--ug:${gemC};--ug-l:${gemL};--ug-d:${gemD}" aria-hidden="true"></span>${L(k.nome)}</div>`;
    unit.innerHTML = (vizPrefs.heroNames==='top'?nomeHtml+stageHtml:stageHtml+nomeHtml)+`
      <div class="charge-outer"><div class="charge-inner" id="charge-${k.id}" style="width:0%"></div></div>
      <div class="charge-text" id="chargeText-${k.id}">0/100</div>
    `;
    partyArenaEl.appendChild(unit);
    const avatarEl = document.getElementById('party-'+k.id+'-avatar');
    avatarEl.style.cursor = 'pointer';
    avatarEl.setAttribute('role','button');
    avatarEl.setAttribute('tabindex','0');
    avatarEl.setAttribute('aria-label',T(`${L(k.nome)}: tocar para usar a habilidade quando estiver carregada`,`${L(k.nome)}: tap to use the ability when charged`,`${L(k.nome)}: toca para usar la habilidad cuando esté cargada`));
    avatarEl.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); onHeroAvatarClick(idx); } });
    animateHeroAvatar(avatarEl,k,'idle',{loop:true});
    prepareHeroBodyHitTest(avatarEl);
  });
  renderGolemUnits();
  renderHarpyUnits();
  applyBattleFormation();
}

function renderGolemUnits(spawned=false){
  partyArenaEl.querySelectorAll('.golem-unit').forEach(unit=>unit.remove());
  for(let i=0;i<golemAllies;i++){
    const unit=document.createElement('div');
    unit.className='unit summon-unit golem-unit'+(spawned?' golem-spawned':'');
    unit.dataset.summon='golem';
    unit.id='golem-'+i;
    unit.style.setProperty('--realm','#8b5a2b');
    unit.style.setProperty('--aura-inner','#8b5a2b');
    unit.style.setProperty('--aura-inner-light','#f0bd78');
    unit.style.setProperty('--aura-outer','#c98f4b');
    unit.style.setProperty('--aura-outer-light','#ffe0a1');
    unit.style.setProperty('--unit-art-scale',String(UNIT_ART_SCALES.summon));
    unit.innerHTML=`
      <div class="unit-stage">
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle summon-avatar" aria-hidden="true" data-summon="golem">
          ${summonSpriteMarkup('golem')}
        </div>
      </div>
      <div class="unit-name">${T('Golem','Golem','Gólem')} ${i+1}</div>
      <div class="golem-badge">½ ${T('DANO','DMG','DAÑO')}</div>
    `;
    partyArenaEl.appendChild(unit);
    animateSummonAvatar(unit.querySelector('.avatar-circle'),'golem','idle');
  }
  applyBattleFormation();
  if(spawned){
    scheduleCombat(()=>partyArenaEl.querySelectorAll('.golem-spawned').forEach(unit=>unit.classList.remove('golem-spawned')),850);
  }
}

function renderHarpyUnits(spawned=false){
  partyArenaEl.querySelectorAll('.harpy-unit').forEach(unit=>unit.remove());
  {
    for(let i=0;i<harpyAllies;i++){
      const unit=document.createElement('div');
      unit.className='unit summon-unit harpy-unit'+(spawned?' golem-spawned':'');
      unit.dataset.summon='harpy';
      unit.id='harpy-'+i;
      unit.style.setProperty('--realm','#6cb8e8');
      unit.style.setProperty('--aura-inner','#6cb8e8');
      unit.style.setProperty('--aura-inner-light','#e6f7ff');
      unit.style.setProperty('--aura-outer','#9fd6f5');
      unit.style.setProperty('--aura-outer-light','#ffffff');
      unit.style.setProperty('--unit-art-scale',String(UNIT_ART_SCALES.summon));
      unit.innerHTML=`
        <div class="unit-stage">
          <div class="unit-ground-shadow"></div>
        <div class="avatar-circle summon-avatar" aria-hidden="true" data-summon="harpy">
          ${summonSpriteMarkup('harpy')}
          </div>
        </div>
        <div class="unit-name">${T('Harpia','Harpy','Arpía')} ${i+1}</div>
        <div class="golem-badge">20% ${T('DANO','DMG','DAÑO')}</div>
      `;
      partyArenaEl.appendChild(unit);
      animateSummonAvatar(unit.querySelector('.avatar-circle'),'harpy','idle');
    }
  }
  applyBattleFormation();
  if(spawned){
    scheduleCombat(()=>partyArenaEl.querySelectorAll('.golem-spawned').forEach(unit=>unit.classList.remove('golem-spawned')),850);
  }
}

function updateHeroProgressUI(idx){
  const k = KINGDOMS[idx];
  const queued = (heroActiveQueue[idx]||[]).length;
  /* A reserva interna volta a contar a próxima volta de aura, porém para o
     jogador uma ativa disponível é sempre 100/100 — inclusive enquanto a
     conjuração fica sustentada no próprio herói. */
  const total = queued>0 ? 100 : Math.max(0,Math.min(99,heroProgress[idx]||0));
  const bar = document.getElementById('charge-'+k.id);
  const txt = document.getElementById('chargeText-'+k.id);
  const unit = document.getElementById('party-'+k.id);
  if(bar) bar.style.width = total+'%';
  heroReady[idx] = queued>0;
  if(queued>0){
    if(txt) txt.textContent = queued+T(' ATIVA'+(queued>1?'S':''),' ACTIVE',' ACTIVA'+(queued>1?'S':''))+' · '+total+'/100';
    if(unit) unit.classList.add('ready');
  } else {
    if(txt) txt.textContent = `${total}/100`;
    if(unit) unit.classList.remove('ready');
  }
}

function onHeroAvatarClick(idx){
  if(!canAcceptPlayerInput()) return;
  const k=KINGDOMS[idx];
  if(!k) return;
  if(heroReady[idx]) { openAbilityPicker(idx); return; }
  setBattleStatus(T(`${L(k.nome)}: carregue a aura para usar a habilidade.`,`${L(k.nome)}: charge the aura to use the ability.`,`${L(k.nome)}: carga el aura para usar la habilidad.`),'system');
}
function toggleHeroFacing(idx){
  if(!canAcceptPlayerInput()) return;
  const k=KINGDOMS[idx];
  if(!k) return;
  if(heroFacingOverrides.has(k.id)) heroFacingOverrides.delete(k.id);
  else heroFacingOverrides.add(k.id);
  const avatar=document.getElementById('party-'+k.id+'-avatar');
  if(avatar){
    const action=avatar.dataset.action||'idle';
    animateHeroAvatar(avatar,k,action,{loop:action==='idle',hold:action==='victory'});
  }
  const direction=heroFacingDirection(k);
  document.getElementById('party-'+k.id)?.setAttribute('data-facing',direction);
  const control=document.querySelector(`.mini-rotate[data-hero-index="${idx}"]`);
  if(control){
    control.setAttribute('aria-pressed',String(direction==='right'));
    control.setAttribute('aria-label',T(`${L(k.nome)} agora olha para a ${direction==='left'?'esquerda':'direita'}. Virar personagem.`,`${L(k.nome)} now faces ${direction}. Rotate character.`,`${L(k.nome)} ahora mira a la ${direction==='left'?'izquierda':'derecha'}. Girar personaje.`));
  }
  setBattleStatus(T(`${L(k.nome)} agora olha para a ${direction==='left'?'esquerda':'direita'}.`,`${L(k.nome)} now faces ${direction}.`,`${L(k.nome)} ahora mira a la ${direction==='left'?'izquierda':'derecha'}.`),'system');
}
arenaEl.addEventListener('pointerup',handleHeroBodyPointer,true);

function summonSpriteMarkup(kind){ const m=SUMMON_ANIMATIONS[kind]; return `<div class="hero-sprite-sheet grid-sheet summon-sprite-sheet" aria-hidden="true" style="--sprite-url:url('${m.src}');--sprite-cols:${m.cols};--sprite-rows:${m.rows};--sprite-bg-x:0%;--sprite-bg-y:0%;--sprite-scale:1"></div>`; }
function animateSummonAvatar(avatar,kind,action='idle'){
  const m=SUMMON_ANIMATIONS[kind]; if(!avatar||!m) return; stopHeroAnimation(avatar); avatar.dataset.action=action;
  const sheet=avatar.querySelector('.summon-sprite-sheet'); if(!sheet||reducedMotion) return;
  const seq=m[action]||m.idle, state={paused:false,lastTick:null,elapsed:0}; avatar.__heroAnimationState=state; const step=Math.max(80,Math.round(m.duration/seq.length));
  const paint=f=>{const c=f%m.cols,r=Math.floor(f/m.cols);sheet.style.setProperty('--sprite-bg-x',`${c*(m.cols===1?0:100/(m.cols-1))}%`);sheet.style.setProperty('--sprite-bg-y',`${r*(m.rows===1?0:100/(m.rows-1))}%`);};
  const tick=now=>{if(state.paused||gamePaused||battlePhase==='paused'){state.lastTick=now;avatar.__actionFrameRaf=requestAnimationFrame(tick);return;}if(state.lastTick===null)state.lastTick=now;state.elapsed+=now-state.lastTick;state.lastTick=now;paint(seq[Math.floor(state.elapsed/step)%seq.length]);if(action!=='idle'&&state.elapsed>=m.duration){animateSummonAvatar(avatar,kind,'idle');return;}avatar.__actionFrameRaf=requestAnimationFrame(tick);}; paint(seq[0]);avatar.__actionFrameRaf=requestAnimationFrame(tick);
}
function playSummonAction(kind,action='attack'){partyArenaEl?.querySelectorAll(`.summon-unit[data-summon="${kind}"] .avatar-circle`).forEach(a=>animateSummonAvatar(a,kind,action));}

function abilityCanBeUsed(a){
  if(a.requiresGolems && golemAllies<a.requiresGolems) return false;
  return true;
}

function positionAbilityPicker(idx){
  const picker=document.getElementById('abilityPickerScreen');
  const k=KINGDOMS[idx];
  const anchor=k&&document.getElementById('party-'+k.id);
  if(!picker||!anchor) return;
  const rect=anchor.getBoundingClientRect();
  const gutter=12;
  const x=Math.max(126,Math.min(window.innerWidth-126,rect.left+rect.width*.5));
  const useBelow=rect.top<164;
  const y=useBelow
    ? Math.min(window.innerHeight-10,rect.bottom+8)
    : Math.max(10,rect.top-7);
  picker.classList.toggle('ability-picker-below',useBelow);
  picker.style.setProperty('--ability-picker-x',x+'px');
  picker.style.setProperty('--ability-picker-y',y+'px');
  picker.style.setProperty('--ability-picker-gutter',gutter+'px');
}
function openAbilityPicker(idx){
  const k = KINGDOMS[idx];
  const queue=heroActiveQueue[idx]||[];
  if(!queue.length) return;
  const grouped=[];
  queue.forEach(a=>{
    const current=grouped.find(item=>item.a===a);
    if(current) current.count++;
    else grouped.push({a,count:1});
  });
  document.getElementById('abilityPickerTitle').textContent=L(k.nome)+T(' · Ativas',' · Actives',' · Activas');
  document.getElementById('abilityPickerSummary').textContent=T('Escolha uma habilidade carregada. As demais cargas continuarão armazenadas para esta missão.','Choose a charged ability. The remaining charges will stay stored for this mission.','Elige una habilidad cargada. Las demás cargas seguirán almacenadas para esta misión.');
  const list=document.getElementById('abilityPickerList');
  list.innerHTML='';
  grouped.forEach(({a,count})=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='ability-choice';
    btn.disabled=!abilityCanBeUsed(a);
    btn.style.setProperty('--realm',k.color);
    btn.style.setProperty('--realm-light',k.colorLight);
    btn.style.setProperty('--realm-dark',k.colorDark);
    const requirement=a.requiresGolems&&!abilityCanBeUsed(a)?T(' · requer '+a.requiresGolems+' golens',' · requires '+a.requiresGolems+' golems',' · requiere '+a.requiresGolems+' gólems'):'';
    btn.innerHTML='<span class="ability-tier">'+a.gems+'%</span><span class="ability-choice-copy"><b>'+L(a.name)+'</b><small>'+L(a.desc)+requirement+'</small></span><span class="ability-charge-count">×'+count+'</span>';
    btn.addEventListener('click',()=>useQueuedActive(idx,a));
    list.appendChild(btn);
  });
  const picker=document.getElementById('abilityPickerScreen');
  picker.classList.add('show');
  positionAbilityPicker(idx);
}

function useQueuedActive(idx,a){
  if(!canAcceptPlayerInput() || !abilityCanBeUsed(a)) return;
  if(!missionStartMs) startMissionTimer();
  const queue=heroActiveQueue[idx]||[];
  const queueIndex=queue.indexOf(a);
  if(queueIndex<0) return;
  questEvent('active');
  queue.splice(queueIndex,1);
  heroActiveQueue[idx]=queue;
  /* O estado de 100% só termina aqui, nunca ao encher a barra. A aura não é
     reiniciada: ela é liberada para a sequência de ataque/suporte desta ativa. */
  const sustainedRecord=sustainedHeroConjurations.get(idx);
  const wasSustained=endHeroConjurationLoop(idx,{returnToIdle:false});
  const hasNextActive=queue.length>0;
  updateHeroProgressUI(idx);
  document.getElementById('abilityPickerScreen').classList.remove('show');
  busy=true;
  setBattlePhase('heroes');
  triggerAbility(idx,a,{fromSustained:wasSustained,castReady:sustainedRecord?.castReady,resumeConjuration:hasNextActive});
  setBattleStatus(T(`${L(KINGDOMS[idx].nome)} liberou ${L(a.name)}!`,`${L(KINGDOMS[idx].nome)} unleashed ${L(a.name)}!`,`¡${L(KINGDOMS[idx].nome)} liberó ${L(a.name)}!`));
  haptic([30,25,55]);
  scheduleCombat(()=>{
    if(!roomClearScheduled&&!stageTransitioning){ busy=false; setBattlePhase('idle'); }
  },1200);
}

function renderCerejeiraTacticalGrid(){
  const grid=document.getElementById('physicalFloorGrid');
  const battleRow=arenaEl?.querySelector('.battle-row');
  if(!grid||!battleRow||!arenaEl) return;
  const arenaRect=arenaEl.getBoundingClientRect();
  const rowRect=battleRow.getBoundingClientRect();
  if(arenaRect.height<40||rowRect.width<40||rowRect.height<40) return;
  const {top,bot:bottom}=groundBand();
  const rowTop=rowRect.top-arenaRect.top;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const floorTop=clamp((arenaRect.height*top-rowTop)/rowRect.height,0,.92);
  const floorBottom=clamp((arenaRect.height*bottom-rowTop)/rowRect.height,floorTop+.08,1);
  const floorHeight=(floorBottom-floorTop)*rowRect.height;
  /* Grade composta aprovada: os heróis mantêm as seis colunas por quatro
     linhas da malha original. Somente o setor direito é redesenhado como um
     3×3 inimigo, ocupando a mesma altura física das quatro linhas aliadas. */
  const columns=9;
  const partyColumns=6;
  const partyRows=4;
  const enemyColumns=3;
  const enemyRows=3;
  const layoutRows=12; /* MMC(4,3): herói ocupa 3 unidades; inimigo, 4. */
  const cell=Math.max(24,Math.floor(rowRect.width/columns));
  const rowUnit=cell/3;
  const enemyCellHeight=rowUnit*4;
  const signature=`${columns}:${partyRows}:${enemyRows}:${cell}:${floorTop.toFixed(3)}:${floorBottom.toFixed(3)}`;
  grid.style.setProperty('--floor-top',`${(floorTop*100).toFixed(2)}%`);
  grid.style.setProperty('--floor-bottom',`${((1-floorBottom)*100).toFixed(2)}%`);
  grid.style.setProperty('--floor-cell',`${cell}px`);
  grid.style.setProperty('--floor-row-unit',`${rowUnit.toFixed(3)}px`);
  grid.style.setProperty('--enemy-cell-height',`${enemyCellHeight.toFixed(3)}px`);
  grid.style.setProperty('--floor-columns',String(columns));
  grid.style.setProperty('--floor-layout-rows',String(layoutRows));
  if(grid.dataset.signature!==signature){
    grid.dataset.signature=signature;
    const cells=[];
    for(let row=1;row<=partyRows;row++){
      for(let column=1;column<=partyColumns;column++){
        const slot=(row-1)*columns+column;
        const label=String(slot).padStart(2,'0');
        const layoutRow=(row-1)*3+1;
        cells.push(`<span class="physical-floor-cell party-grid-cell" style="grid-column:${column};grid-row:${layoutRow}/span 3" data-grid-slot="${label}" data-grid-side="party" data-grid-column="${column}" data-grid-row="${row}" aria-label="Casa aliada ${label}">${label}</span>`);
      }
    }
    for(let row=1;row<=enemyRows;row++){
      for(let column=1;column<=enemyColumns;column++){
        const absoluteColumn=partyColumns+column;
        const slot=(row-1)*columns+absoluteColumn;
        const label=String(slot).padStart(2,'0');
        const layoutRow=(row-1)*4+1;
        cells.push(`<span class="physical-floor-cell enemy-grid-cell" style="grid-column:${absoluteColumn};grid-row:${layoutRow}/span 4" data-grid-slot="${label}" data-grid-side="enemy" data-grid-column="${column}" data-grid-row="${row}" aria-label="Casa inimiga ${label}">${label}</span>`);
      }
    }
    grid.innerHTML=cells.join('');
  }
}

function syncCerejeiraTacticalGrid(){
  const available=document.body.classList.contains('game-active');
  const tool=document.getElementById('gridTool');
  const overlay=document.getElementById('cerejeiraTacticalGrid');
  /* Física de perspectiva: a profundidade é uma propriedade da vaga no piso,
     não uma animação do sprite. Toda unidade conserva os pés ancorados e só
     recebe o porte correspondente à distância da câmera. */
  arenaEl.classList.toggle('perspective-physics',document.body.classList.contains('game-active'));
  arenaEl.classList.toggle('tactical-grid-available',available);
  if(available){
    renderCerejeiraTacticalGrid();
    arenaEl.classList.toggle('tactical-grid',tacticalGridVisible);
    overlay?.setAttribute('aria-hidden',String(!tacticalGridVisible));
    requestAnimationFrame(()=>{ renderCerejeiraTacticalGrid(); applyBattleFormation(); });
    if(tool){ tool.hidden=false; tool.disabled=false; }
    tool?.classList.toggle('active',tacticalGridVisible);
  }else{
    arenaEl.classList.remove('tactical-grid');
    overlay?.setAttribute('aria-hidden','true');
    if(tool){ tool.hidden=true; tool.disabled=true; tool.classList.remove('active'); }
  }
}

/* Fogos da Muralha dos Heróis: projéteis balísticos sobem, perdem velocidade,
   explodem e cada centelha sofre arrasto e gravidade. Um único canvas e pools
   fixos evitam criar elementos por quadro; a simulação é encerrada ao trocar
   de cenário e vira uma composição estática com movimento reduzido. */
const FIREWORK_PALETTES=[
  ['#fff3b0','#ffd05a','#f29a38'],
  ['#e6fbff','#76ddff','#4398ff'],
  ['#fff0fa','#ff8dcb','#cf5dff'],
  ['#efffe8','#89f0aa','#42c7a1']
];
let arenaFireworks=null;
function stopArenaFireworks(){
  if(!arenaFireworks) return;
  cancelAnimationFrame(arenaFireworks.raf);
  arenaFireworks.resizeObserver?.disconnect();
  const ctx=arenaFireworks.ctx;
  if(ctx) ctx.clearRect(0,0,arenaFireworks.width,arenaFireworks.height);
  arenaFireworks=null;
}
function drawReducedFireworks(canvas){
  const rect=canvas.getBoundingClientRect();
  const dpr=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.max(1,Math.round(rect.width*dpr));
  canvas.height=Math.max(1,Math.round(rect.height*dpr));
  const ctx=canvas.getContext('2d');
  if(!ctx) return;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,rect.width,rect.height);
  ctx.globalCompositeOperation='lighter';
  [[.24,.28,24,0],[.73,.24,28,1],[.51,.48,20,2]].forEach(([nx,ny,r,paletteIndex])=>{
    const palette=FIREWORK_PALETTES[paletteIndex];
    for(let i=0;i<18;i++){
      const angle=(Math.PI*2*i)/18;
      const length=r*(.72+(i%3)*.13);
      const x=rect.width*nx,y=rect.height*ny;
      ctx.beginPath();
      ctx.moveTo(x+Math.cos(angle)*r*.22,y+Math.sin(angle)*r*.22);
      ctx.quadraticCurveTo(x+Math.cos(angle)*length*.74,y+Math.sin(angle)*length*.66,x+Math.cos(angle)*length,y+Math.sin(angle)*length+length*.12);
      ctx.strokeStyle=palette[i%palette.length]+'99';
      ctx.lineWidth=i%3===0?1.6:1;
      ctx.stroke();
    }
  });
  ctx.globalCompositeOperation='source-over';
}
function startArenaFireworks(canvas){
  stopArenaFireworks();
  if(!canvas||!particlesEnabled) return;
  if(reducedMotion||reduceFlashes){ drawReducedFireworks(canvas); return; }
  const ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx) return;
  const quality=resolvedGraphicsQuality();
  const particleCap=quality==='high'?210:quality==='medium'?138:84;
  const burstSize=quality==='high'?42:quality==='medium'?30:20;
  const state={canvas,ctx,quality,particleCap,burstSize,width:0,height:0,dpr:1,raf:0,last:performance.now(),nextLaunch:110,seed:0x12f1a5,
    rockets:Array.from({length:4},()=>({active:false,x:0,y:0,px:0,py:0,vx:0,vy:0,targetY:0,palette:0,type:0})),
    particles:Array.from({length:210},()=>({active:false,x:0,y:0,px:0,py:0,vx:0,vy:0,life:0,maxLife:1,color:'#fff',size:1,gravity:.035,drag:.982}))};
  const random=()=>{ state.seed=(Math.imul(state.seed,1664525)+1013904223)>>>0; return state.seed/4294967296; };
  const resize=()=>{
    const rect=canvas.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,quality==='high'?1.5:1.25);
    const width=Math.max(1,Math.round(rect.width)),height=Math.max(1,Math.round(rect.height));
    if(width===state.width&&height===state.height&&dpr===state.dpr) return;
    state.width=width; state.height=height; state.dpr=dpr;
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  const acquireParticle=()=>{
    for(let i=0;i<state.particleCap;i++) if(!state.particles[i].active) return state.particles[i];
    return null;
  };
  const explode=rocket=>{
    for(let i=0;i<state.burstSize;i++){
      const particle=acquireParticle();
      if(!particle) break;
      const angle=(Math.PI*2*i/state.burstSize)+(random()-.5)*.08;
      const ring=rocket.type===1;
      const speed=(ring?3.05:1.75+random()*2.8)*(state.width/390);
      particle.active=true; particle.x=particle.px=rocket.x; particle.y=particle.py=rocket.y;
      particle.vx=Math.cos(angle)*speed; particle.vy=Math.sin(angle)*speed;
      particle.maxLife=particle.life=ring?58:56+Math.floor(random()*32);
      particle.gravity=rocket.type===2?.022:.035; particle.drag=rocket.type===2?.988:.982;
      particle.color=FIREWORK_PALETTES[rocket.palette][i%3]; particle.size=1.15+random()*1.25;
    }
    rocket.active=false;
  };
  const launch=()=>{
    const rocket=state.rockets.find(item=>!item.active);
    if(!rocket) return;
    rocket.active=true; rocket.x=rocket.px=state.width*(.18+random()*.64); rocket.y=rocket.py=state.height+8;
    rocket.vx=(random()-.5)*.32; rocket.vy=-(4.6+random()*1.25)*(state.height/300);
    rocket.targetY=state.height*(.16+random()*.38); rocket.palette=Math.floor(random()*FIREWORK_PALETTES.length); rocket.type=Math.floor(random()*3);
  };
  const frame=now=>{
    if(arenaFireworks!==state) return;
    resize();
    const dt=Math.min(2,Math.max(.35,(now-state.last)/16.667)); state.last=now;
    if(!gamePaused&&battlePhase!=='paused'&&!document.hidden){
      ctx.clearRect(0,0,state.width,state.height);
      state.nextLaunch-=16.667*dt;
      if(state.nextLaunch<=0){ launch(); state.nextLaunch=(quality==='economy'?1320:900)+random()*620; }
      ctx.globalCompositeOperation='lighter';
      for(const rocket of state.rockets){
        if(!rocket.active) continue;
        rocket.px=rocket.x; rocket.py=rocket.y; rocket.x+=rocket.vx*dt; rocket.y+=rocket.vy*dt; rocket.vy+=.045*dt;
        ctx.beginPath(); ctx.moveTo(rocket.px,rocket.py+7); ctx.lineTo(rocket.x,rocket.y); ctx.strokeStyle=FIREWORK_PALETTES[rocket.palette][0]+'cc'; ctx.lineWidth=1.5; ctx.stroke();
        if(rocket.y<=rocket.targetY||rocket.vy>=-.25) explode(rocket);
      }
      for(let i=0;i<state.particleCap;i++){
        const p=state.particles[i]; if(!p.active) continue;
        p.px=p.x; p.py=p.y; p.vx*=Math.pow(p.drag,dt); p.vy=p.vy*Math.pow(p.drag,dt)+p.gravity*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt;
        if(p.life<=0||p.y>state.height+12){ p.active=false; continue; }
        const alpha=Math.max(0,Math.min(1,p.life/p.maxLife));
        const trail=quality==='economy'?2.5:quality==='medium'?3.8:5;
        const tailX=p.x-p.vx*trail,tailY=p.y-p.vy*trail;
        ctx.globalAlpha=alpha*alpha*.28; ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(p.x,p.y); ctx.strokeStyle=p.color; ctx.lineWidth=p.size*3.2; ctx.stroke();
        ctx.globalAlpha=alpha*alpha; ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(p.x,p.y); ctx.strokeStyle=p.color; ctx.lineWidth=p.size; ctx.stroke();
        if(i%5===0&&alpha>.28){ ctx.globalAlpha=alpha*.82; ctx.fillStyle='#fff8dc'; ctx.fillRect(p.x-1,p.y-1,2,2); }
      }
      ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
    }
    state.raf=requestAnimationFrame(frame);
  };
  state.resizeObserver=new ResizeObserver(resize); state.resizeObserver.observe(canvas); resize();
  arenaFireworks=state; state.raf=requestAnimationFrame(frame);
}
function syncArenaFireworks(atmosphereKey=arenaEl?.dataset.missionAtmosphere){
  const canvas=arenaEl?.querySelector('.arena-fireworks-canvas');
  if(atmosphereKey!=='fireworks'||!canvas||!particlesEnabled){ stopArenaFireworks(); return; }
  if(arenaFireworks?.canvas===canvas&&arenaFireworks?.quality===resolvedGraphicsQuality()&&!reducedMotion&&!reduceFlashes) return;
  startArenaFireworks(canvas);
}

function renderStageProgress(){
  stageProgressEl.innerHTML = '';
  const total=worldRun.active?5:towerMode?5:bossRushMode?8:5;
  const atual=worldRun.active?worldRun.nivel-1:towerMode?((towerFloor-1)%5):bossRushMode?bossRushIdx:0;
  for(let i=0;i<total;i++){
    const seg = document.createElement('div');
    seg.className = 'arena-seg' + (i<atual ? ' done' : (i===atual ? ' current' : ''));
    stageProgressEl.appendChild(seg);
  }
  if(worldRun.active){
    const fase=WORLDS[0].fases[worldRun.fase];
    stageLabelEl.textContent = `${T('Missão','Mission','Misión')} ${worldRun.nivel}/5`;
    dungeonTitleEl.textContent = L(fase.nome);
  }else if(towerMode){
    stageLabelEl.textContent = `${T('Andar','Floor','Piso')} ${towerFloor}`;
    dungeonTitleEl.textContent = T('Torre de Acesso à Eternidade','Tower of Access to Eternity','Torre de Acceso a la Eternidad');
  }else{
    /* modos extra (Desafio dos Chefes etc.): título vem SEMPRE do stage ativo — nunca da demo */
    stageLabelEl.textContent = bossRushMode ? `${T('Chefe','Boss','Jefe')} ${bossRushIdx+1}/8` : '';
    dungeonTitleEl.textContent = activeStageData?.title || '';
  }
  /* A Torre usa uma arte com um pátio bem mais baixo que os cenários comuns.
     A classe própria mantém a banda de aterrissagem e a malha tática presas ao
     piso pintado, sem deslocar os demais cenários que também usam scene-4. */
  arenaEl.className = 'arena scene-'+((activeStageData&&Number.isFinite(activeStageData.scene))?activeStageData.scene:4)+(towerMode?' tower-stage':'');
  syncCerejeiraTacticalGrid();
  const mood=worldRun.active?'humanos':towerMode?'eternidade':bossRushMode?'boss':`scene-${activeStageData?.scene??4}`;
  arenaEl.dataset.realmMood=mood;
  const canonicalVisual=worldRun.active?WORLDS[0]?.fases?.[worldRun.fase]?.visual:null;
  const atmosphereKey=worldRun.active
    ? ((worldRun.nivel===5&&canonicalVisual?.missionFive)||canonicalVisual?.key||'none')
    : (towerMode?'cold-mist':bossRushMode?'ember-ash':'scene-drift');
  arenaEl.dataset.worldScene=worldRun.active?`humanos-${worldRun.fase}`:(towerMode?'tower':bossRushMode?'boss':'other');
  arenaEl.dataset.missionAtmosphere=atmosphereKey;
  arenaEl.style.setProperty('--atmosphere-progress',String(worldRun.active?Math.max(1,Math.min(5,Number(worldRun.nivel)||1)):1));
  arenaEl.classList.toggle('boss-presence',Boolean(bossRushMode||worldRun.active&&worldRun.nivel===5));
  let atmosphere=arenaEl.querySelector('.arena-atmosphere');
  if(!atmosphere){
    atmosphere=document.createElement('div');
    atmosphere.className='arena-atmosphere';
    atmosphere.setAttribute('aria-hidden','true');
    atmosphere.innerHTML='<span class="arena-petals"></span><span class="arena-cold-fog"></span><span class="arena-world-drift"></span><canvas class="arena-fireworks-canvas"></canvas>';
    arenaEl.prepend(atmosphere);
  }
  syncArenaFireworks(atmosphereKey);
  if(activeStageData?.bgUrl){
    arenaEl.style.setProperty('background-image',`linear-gradient(rgba(6,3,13,.22),rgba(6,3,13,.5)),url('${activeStageData.bgUrl}')`,'important');
    arenaEl.style.setProperty('background-size','cover');
    arenaEl.style.setProperty('background-position','center');
  }else{
    arenaEl.style.removeProperty('background-image');
    arenaEl.style.removeProperty('background-size');
    arenaEl.style.removeProperty('background-position');
  }
  applyArenaVisualProfile();
  /* A fase 10/5 começa com o castelo plenamente visível. A escuridão total
     só é acionada pelo prólogo, depois da saída discreta de Jules. */
  arenaEl.classList.toggle('human-finale-before-darkness',isHumanFinaleBattle());
  syncRoyalCourtSceneCast();
}

/* Corte da fase 10: o trono já faz parte da arte de fundo. Esta camada só
   acrescenta Bernyce sentada e os dois guardas, sem duplicar mobiliário. Quem
   entra como inimigo sai imediatamente do fundo antes da luta começar. */
function syncRoyalCourtSceneCast(){
  const existing=arenaEl?.querySelector('.royal-court-cast');
  const enabled=Boolean(worldRun.active&&worldRun.fase===9&&activeStageData?.bgUrl?.endsWith('fase-10.jpg'));
  if(!enabled){ existing?.remove(); return; }
  const isFinale=isHumanFinaleBattle();
  if(isFinale){
    let cast=existing;
    if(!cast){
      cast=document.createElement('div');
      cast.className='royal-court-cast';
      cast.setAttribute('aria-hidden','true');
      arenaEl.appendChild(cast);
    }
    cast.className='royal-court-cast';
    cast.innerHTML='<span class="royal-court-guard royal-court-jules" aria-hidden="true"></span><span class="royal-court-guard royal-court-cedric" aria-hidden="true"></span>';
    return;
  }
  const opponents=new Set((activeStageData?.enemies||[]).map(enemy=>enemy?.cardId).filter(Boolean));
  const visible={bernyce:!opponents.has('bernyce'),kalander:!opponents.has('kalander'),jules:!opponents.has('jules')};
  let cast=existing;
  if(!cast){
    cast=document.createElement('div');
    cast.className='royal-court-cast';
    cast.setAttribute('aria-hidden','true');
    arenaEl.appendChild(cast);
  }
  cast.className='royal-court-cast';
  cast.innerHTML=`${visible.bernyce?'<img class="royal-court-bernyce" src="assets/characters/runtime-v10/bernyce/scene-seated.png" alt="">':''}${visible.jules?'<span class="royal-court-guard royal-court-jules"></span>':''}${visible.kalander?'<span class="royal-court-guard royal-court-kalander"></span>':''}`;
}


function applyBattleFormation(){
  const heroSlots=HERO_FORMATIONS[formationIndex%HERO_FORMATIONS.length].slots;
  const heroUnits=[...partyArenaEl.querySelectorAll('.hero-unit')];
  heroUnits.forEach((unit,i)=>applyFormationSlot(unit,heroSlots[i]||heroSlots[heroSlots.length-1],112));
  const barbaraIdx=ACTIVE.findIndex(idx=>KINGDOMS[idx]?.id==='terra');
  const barbaraSlot=heroSlots[barbaraIdx]||heroSlots[0]||{x:30,y:35,s:1,z:20};
  const golemOffsets=[{x:-8,y:5,s:.48},{x:8,y:4,s:.5},{x:-13,y:8,s:.44},{x:13,y:8,s:.44}];
  [...partyArenaEl.querySelectorAll('.golem-unit')].forEach((unit,i)=>{
    const offset=golemOffsets[i%golemOffsets.length];
    applyFormationSlot(unit,{x:Math.max(4,Math.min(96,barbaraSlot.x+offset.x)),y:barbaraSlot.y+offset.y,s:offset.s,z:barbaraSlot.z-5+i},54);
  });
  const sophIdx=ACTIVE.findIndex(idx=>KINGDOMS[idx]?.id==='vento');
  const sophSlot=heroSlots[sophIdx]||heroSlots[0]||{x:70,y:30,s:1,z:20};
  const harpyOffsets=[{x:-10,y:-5,s:.36},{x:10,y:-6,s:.38},{x:-15,y:3,s:.34},{x:15,y:3,s:.34},{x:0,y:-10,s:.32}];
  [...partyArenaEl.querySelectorAll('.harpy-unit')].forEach((unit,i)=>{
    const offset=harpyOffsets[i%harpyOffsets.length];
    applyFormationSlot(unit,{x:Math.max(4,Math.min(96,sophSlot.x+offset.x)),y:sophSlot.y+offset.y,s:offset.s,z:sophSlot.z-5+i},48);
  });
  const enemySlots=planEnemyGridSlots();
  [...enemyArenaEl.children].forEach((unit,i)=>{
    const enemy=enemies[i];
    const slot={...(enemySlots[i]||enemySlots[enemySlots.length-1])};
    const isBoss=slot.isBoss===true;
    if(isBoss&&!enemy?.isCard) slot.s*=1.16;
    applyFormationSlot(unit,slot,enemy?.isCard?112:(isBoss?116:112));
  });
  if(document.getElementById('storyLayer')?.classList.contains('speaker-bubble')) positionStorySpeechBubble();
}

/* == CHÃO DOS CENÁRIOS: onde o piso REAL de cada arte começa (fração do TOPO da imagem)
   e onde termina (moldura decorativa na base, se houver). Medido arte por arte. */
const SCENE_GROUND={
  humanos:[ [0.60,1],[0.63,1],[0.64,1],[0.64,1],[0.65,1],
            [0.60,1],[0.62,1],[0.63,0.86],[0.75,1],[0.66,1] ]
};
/* A praça da Torre de Acesso à Eternidade começa visualmente mais abaixo na
   composição. Sem esta faixa dedicada, o fallback genérico (55%) suspendia as
   unidades sobre a cidade e encurtava artificialmente o piso jogável. */
const TOWER_GROUND=[0.70,1];
function groundBand(){
  let top=0.55, bot=1;
  if(worldRun.active){ const g=SCENE_GROUND.humanos[worldRun.fase]; if(g){ top=g[0]; bot=g[1]; } }
  else if(towerMode){ [top,bot]=TOWER_GROUND; }
  return {top,bot};
}
function applyFormationSlot(unit,slot,width){
  if(!unit||!slot) return;
  /* Ajuste fino mobile: comprime a formação para nenhuma unidade/nome sair da tela */
  const estreito=window.innerWidth<=600;
  const enemySlot=unit.classList.contains('enemy-unit');
  const gridAnchored=Array.isArray(slot.gridRefs)&&slot.gridRefs.length>0;
  const x=estreito
    ? (enemySlot?Math.max(8,Math.min(92,slot.x)):gridAnchored?Math.max(4,Math.min(96,slot.x)):Math.max(4,Math.min(76,4+slot.x*1.25)))
    : slot.x;
  const y=estreito&&!gridAnchored?50+(slot.y-50)*0.9:slot.y;
  /* v10.0.1: a compressao anterior encolhia a formacao e ainda diminuia a
     largura do avatar. Mantemos a posicao segura, mas devolvemos a escala
     visual original dos chibis e inimigos. */
  const s=estreito?slot.s*0.92:slot.s;
  const w=estreito?Math.round(width*(enemySlot?1.02:.88)):width;
  /* ATERRISSAGEM: re-mapeia a profundidade (y 0..46) para a banda de chão da arte da
     fase — todos os pés (heróis, inimigos, golens, harpias) pisam no piso pintado.
     bottom% = ((1-F)·alturaArena − gap − UI sob os pés) / alturaRow  (cover = 100% da
     altura da arte visível, então fração do topo da arte ≡ fração do topo da arena). */
  let yFin=y;
  const arenaBox=document.querySelector('.arena');
  const rowEl=unit.parentElement;
  if(arenaBox&&rowEl&&rowEl.clientHeight>40&&document.body.classList.contains('game-active')){
    const {top,bot}=groundBand();
    const aH=arenaBox.clientHeight, rH=rowEl.clientHeight;
    /* v9.2: personagens mais ASSENTADOS no piso (gap menor = todos descem) */
    const gap=18, uiFeet=20*s;
    const yMax=Math.max(4,(((1-top)*aH-gap-uiFeet)/rH)*100);
    const yMin=Math.max(0,(((1-bot)*aH-gap)/rH)*100);
    const prof=Math.max(0,Math.min(1,y/46));
    yFin=yMin+prof*Math.max(0,yMax-yMin);
    if(enemySlot) yFin=Math.max(0,yFin-3); /* sobe o grupo e mantém distância do HUD */
  }
  /* y=0 é a faixa mais próxima da câmera e y=46 a mais distante. A curva
     linear evita qualquer pulsação corporal: ao trocar de posição, largura,
     sombra e camada passam juntas para o novo valor de profundidade. */
  const depth=Math.max(0,Math.min(1,y/46));
  const perspective=arenaBox?.classList.contains('perspective-physics')===true;
  const depthScale=perspective?(1-depth*.28):1;
  const shadowScale=perspective?(1-depth*.24):1;
  const shadowOpacity=perspective?(1-depth*.34):1;
  unit.dataset.depth=depth.toFixed(3);
  unit.dataset.depthScale=depthScale.toFixed(3);
  if(slot.grid){
    unit.dataset.gridColumn=String(slot.grid.column);
    unit.dataset.gridRow=String(slot.grid.row);
  }else{
    delete unit.dataset.gridColumn;
    delete unit.dataset.gridRow;
  }
  if(gridAnchored) unit.dataset.gridRefs=slot.gridRefs.join(',');
  else delete unit.dataset.gridRefs;
  unit.style.setProperty('--slot-x',x+'%');
  unit.style.setProperty('--slot-y',yFin+'%');
  /* nitidez: a escala é aplicada na LARGURA (layout) — o navegador rasteriza o sprite
     no tamanho final em vez de ampliar um raster menor (que ficava embaçado) */
  unit.style.setProperty('--slot-scale','1');
  unit.style.setProperty('--slot-z',String(slot.z));
  unit.style.setProperty('--depth-scale',depthScale.toFixed(3));
  unit.style.setProperty('--depth-shadow-scale',shadowScale.toFixed(3));
  unit.style.setProperty('--depth-shadow-opacity',shadowOpacity.toFixed(3));
  unit.style.setProperty('--slot-w',Math.round(w*s)+'px');
}
/* Reaplica a formação ao girar/redimensionar a tela durante a batalha */
let formResizeTimer=null;
window.addEventListener('resize',()=>{
  clearTimeout(formResizeTimer);
  formResizeTimer=setTimeout(()=>{
    if(partyArenaEl&&partyArenaEl.children.length) applyBattleFormation();
    if(arenaEl?.classList.contains('tactical-grid-available')) renderCerejeiraTacticalGrid();
    positionStorySpeechBubble();
  },220);
});

function toggleBattleTools(force){
  const shouldOpen=typeof force==='boolean'?force:!battleToolsPanelEl.classList.contains('open');
  battleToolsPanelEl.classList.toggle('open',shouldOpen);
  battleToolsPanelEl.setAttribute('aria-hidden',String(!shouldOpen));
  document.getElementById('battleToolsToggle').setAttribute('aria-expanded',String(shouldOpen));
}

function cycleBattleTarget(){
  const alive=enemies.map((e,i)=>e.hp>0?i:-1).filter(i=>i>=0);
  if(!alive.length) return;
  const current=currentTargetIndex();
  const next=alive[(Math.max(0,alive.indexOf(current))+1)%alive.length];
  autoTargetMode=false;
  updateBattleToolLabels();
  manualTarget=next;
  refreshTargetHighlight();
  setBattleStatus(T(`Alvo tático: ${L(enemies[next].name)}.`,`Tactical target: ${L(enemies[next].name)}.`,`Objetivo táctico: ${L(enemies[next].name)}.`));
}

function toggleAutoTarget(){
  autoTargetMode=!autoTargetMode;
  if(autoTargetMode) manualTarget=null;
  updateBattleToolLabels();
  refreshTargetHighlight();
  setBattleStatus(autoTargetMode?T('Alvo automático: o inimigo mais enfraquecido será priorizado.','Auto target: the weakest enemy will be prioritized.','Objetivo automático: se priorizará al enemigo más debilitado.'):T('Alvo automático desativado.','Auto target disabled.','Objetivo automático desactivado.'));
}

function cycleBattleSpeed(){
  battleSpeedIndex=(battleSpeedIndex+1)%BATTLE_SPEEDS.length;
  document.documentElement.style.setProperty('--battle-speed',String(BATTLE_SPEEDS[battleSpeedIndex]));
  document.body.classList.add('speed-mode');
  updateBattleToolLabels();
  setBattleStatus(T(`Velocidade de batalha: ${BATTLE_SPEEDS[battleSpeedIndex]}×.`,`Battle speed: ${BATTLE_SPEEDS[battleSpeedIndex]}×.`,`Velocidad de batalla: ${BATTLE_SPEEDS[battleSpeedIndex]}×.`));
}

function findBestMove(){
  const dirs=[[0,1],[1,0]];
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) for(const [dr,dc] of dirs){
    const nr=r+dr,nc=c+dc;
    if(nr>=SIZE||nc>=SIZE) continue;
    const a={r,c},b={r:nr,c:nc};
    if(board[r][c]===-4||board[nr][nc]===-4) continue;
    const powerA=powerUps[cellKey(r,c)],powerB=powerUps[cellKey(nr,nc)];
    if(powerA?.type==='colorBomb'||powerB?.type==='colorBomb'||(powerA&&powerB)) return [a,b];
    swapCells(a,b);
    const valid=findMatches().length>0;
    swapCells(a,b);
    if(valid) return [a,b];
  }
  return null;
}

/* v9.1 · Conselheiro tático: conhece o kit dos 12 heróis */
function kitAdvice(){
  for(const idx of ACTIVE){
    if((heroActiveQueue[idx]||[]).length===0) continue;
    const k=KINGDOMS[idx];
    const realm=countRealmGems(idx);
    const tips={
      sombras:T(`com ${realm} bloco(s) das sombras, "${L('Por Toda a Escuridão')}" multiplicaria o próximo ataque por ${Math.min(12,Math.max(1,realm))}`,`with ${realm} shadow block(s), "${L('Por Toda a Escuridão')}" would multiply the next attack by ${Math.min(12,Math.max(1,realm))}`,`con ${realm} bloque(s) de las sombras, "${L('Por Toda a Escuridão')}" multiplicaría el próximo ataque por ${Math.min(12,Math.max(1,realm))}`),
      raio:T(`"${L('Hecatombe')}" renderia ${realm*150} de dano em todos agora (${realm} peça(s) roxa(s))`,`"${L('Hecatombe')}" would deal ${realm*150} damage to all right now (${realm} purple piece(s))`,`"${L('Hecatombe')}" infligiría ${realm*150} de daño a todos ahora (${realm} pieza(s) morada(s))`),
      areia:T(`"${L('Dança das Mil Lâminas')}" renderia ${realm*70} por inimigo (${realm} peça(s) amarela(s))`,`"${L('Dança das Mil Lâminas')}" would deal ${realm*70} per enemy (${realm} yellow piece(s))`,`"${L('Dança das Mil Lâminas')}" infligiría ${realm*70} por enemigo (${realm} pieza(s) amarilla(s))`),
      gelo:T(`"${L('Geada Branca')}" renderia ${100+realm*20} em todos e congelaria (${realm} peça(s) de gelo)`,`"${L('Geada Branca')}" would deal ${100+realm*20} to all and freeze (${realm} ice piece(s))`,`"${L('Geada Branca')}" infligiría ${100+realm*20} a todos y congelaría (${realm} pieza(s) de hielo)`),
      natureza:T(`"${L('Unidade da Natureza')}" somaria ${realm*100} de dano (${realm} joia(s) verde(s))`,`"${L('Unidade da Natureza')}" would add ${realm*100} damage (${realm} green gem(s))`,`"${L('Unidade da Natureza')}" sumaría ${realm*100} de daño (${realm} joya(s) verde(s))`),
      fogo:T(`o Ritual dobraria as ${realm} pedra(s) vermelha(s) atuais`,`the Ritual would double the current ${realm} red stone(s)`,`el Ritual duplicaría las ${realm} piedra(s) roja(s) actuales`),
      vento:harpyAllies<5?T(`invocar harpias ecoaria +${20*(harpyAllies+2)}% de dano`,`summoning harpies would echo +${20*(harpyAllies+2)}% damage`,`invocar arpías haría eco de +${20*(harpyAllies+2)}% de daño`):T(`as 5 harpias já ecoam o dano dela`,`all 5 harpies already echo her damage`,`las 5 arpías ya hacen eco de su daño`),
      terra:golemAllies>=2?T(`"${L('Terra Viva')}" sacrificaria golens por 1000 de dano`,`"${L('Terra Viva')}" would sacrifice golems for 1000 damage`,`"${L('Terra Viva')}" sacrificaría gólems por 1000 de daño`):T(`invocar golens replicaria metade do dano dela`,`summoning golems would replicate half her damage`,`invocar gólems replicaría la mitad de su daño`),
      chuvas:T(`as chuvas contínuas corroem os inimigos a cada turno`,`the relentless rains corrode enemies every turn`,`las lluvias continuas corroen a los enemigos cada turno`),
      luz:T(`a ultimate da Luz está pronta`,`the Light's ultimate is ready`,`la ultimate de la Luz está lista`),
      humanos:T(`a ultimate de Berenice está pronta`,`Berenice's ultimate is ready`,`la ultimate de Berenice está lista`),
      agua:T(`a ultimate de Maril está pronta`,`Maril's ultimate is ready`,`la ultimate de Maril está lista`)
    };
    const dica=tips[k.id]||T('toque no herói iluminado','tap the glowing hero','toca al héroe iluminado');
    return T(`${L(k.nome)} tem ultimate pronta — ${dica}.`,`${L(k.nome)} has their ultimate ready — ${dica}.`,`${L(k.nome)} tiene la ultimate lista — ${dica}.`);
  }
  return null;
}

function showBestMoveHint(){
  if(busy) return;
  document.querySelectorAll('.gem.hinted').forEach(el=>el.classList.remove('hinted'));
  const advice=kitAdvice();
  const move=findBestMove();
  if(!move){ shuffleBoard(); return; }
  move.forEach(({r,c})=>document.querySelector(`.gem[data-r="${r}"][data-c="${c}"]`)?.classList.add('hinted'));
  setBattleStatus(advice||T('Sugestão realçada: troque as duas joias pulsantes.','Hint highlighted: swap the two pulsing gems.','Sugerencia resaltada: intercambia las dos joyas pulsantes.'));
  window.setTimeout(()=>document.querySelectorAll('.gem.hinted').forEach(el=>el.classList.remove('hinted')),2400);
}

function useRoyalShuffle(){
  if(busy) return;
  if(royalShuffles<=0){ setBattleStatus(T('O embaralhamento real já foi usado nesta fase.','The royal shuffle has already been used this stage.','El barajado real ya se usó en esta fase.')); return; }
  royalShuffles--;
  shuffleBoard(false);
  updateBattleToolLabels();
  setBattleStatus(T('Embaralhamento real usado: o tabuleiro ganhou novas possibilidades.','Royal shuffle used: the board gained fresh possibilities.','Barajado real usado: el tablero ganó nuevas posibilidades.'));
  haptic([24,22,42]);
}

function toggleTacticalGrid(){
  if(!arenaEl.classList.contains('tactical-grid-available')) return;
  const active=arenaEl.classList.toggle('tactical-grid');
  tacticalGridVisible=active;
  localStorage.setItem('12r_tactical_grid',active?'1':'0');
  document.getElementById('cerejeiraTacticalGrid')?.setAttribute('aria-hidden',String(!active));
  document.getElementById('gridTool').classList.toggle('active',active);
  setBattleStatus(active?T('Grade de profundidade ativada.','Depth grid enabled.','Cuadrícula de profundidad activada.'):T('Grade de profundidade ocultada.','Depth grid hidden.','Cuadrícula de profundidad oculta.'));
}

function cycleHeroFormation(){
  formationIndex=(formationIndex+1)%HERO_FORMATIONS.length;
  localStorage.setItem('12r_formation',String(formationIndex));
  applyBattleFormation();
  const f=HERO_FORMATIONS[formationIndex];
  const tool=document.getElementById('formationTool');
  if(tool) tool.textContent=`♟ ${L(f.nome)}`;
  setBattleStatus(T(`Formação "${L(f.nome)}" (${formationIndex+1}/${HERO_FORMATIONS.length}) aplicada.`,`Formation "${L(f.nome)}" (${formationIndex+1}/${HERO_FORMATIONS.length}) applied.`,`Formación "${L(f.nome)}" (${formationIndex+1}/${HERO_FORMATIONS.length}) aplicada.`),'system');
  sfxSelect();
}

async function toggleGameFullscreen(){
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(err){ setBattleStatus(T('A tela cheia não está disponível neste navegador.','Fullscreen is not available in this browser.','La pantalla completa no está disponible en este navegador.')); }
}

function showStageObjective(){
  const obj=currentObjective();
  if(obj?.type==='survive'){ stageObjectiveEl.textContent=T(`OBJETIVO · Sobreviva ${obj.turns} turnos (faltam ${Math.max(0,obj.turns-stageTurns)})`,`OBJECTIVE · Survive ${obj.turns} turns (${Math.max(0,obj.turns-stageTurns)} left)`,`OBJETIVO · Sobrevive ${obj.turns} turnos (faltan ${Math.max(0,obj.turns-stageTurns)})`); return; }
  if(obj?.type==='collect'){ stageObjectiveEl.textContent=T(`OBJETIVO · Colete ${obj.count} esferas (faltam ${Math.max(0,obj.count-stageCollected)})`,`OBJECTIVE · Collect ${obj.count} spheres (${Math.max(0,obj.count-stageCollected)} left)`,`OBJETIVO · Recoge ${obj.count} esferas (faltan ${Math.max(0,obj.count-stageCollected)})`); return; }
  if(obj?.type==='moves'){ stageObjectiveEl.textContent=T(`OBJETIVO · Vença em até ${obj.limit} movimentos (restam ${Math.max(0,obj.limit-stageTurns)})`,`OBJECTIVE · Win within ${obj.limit} moves (${Math.max(0,obj.limit-stageTurns)} remaining)`,`OBJETIVO · Gana en un máximo de ${obj.limit} movimientos (quedan ${Math.max(0,obj.limit-stageTurns)})`); return; }
  const alive=enemies.filter(e=>e.hp>0);
  stageObjectiveEl.textContent=T(`OBJETIVO · Derrote ${alive.length} ${alive.length===1?'inimigo':'inimigos'}`,`OBJECTIVE · Defeat ${alive.length} ${alive.length===1?'enemy':'enemies'}`,`OBJETIVO · Derrota ${alive.length} ${alive.length===1?'enemigo':'enemigos'}`);
}

function updateComboRecord(value){
  bestCombo=Math.max(bestCombo,value||0);
  comboRecordEl.textContent=`${T('RECORDE','RECORD','RÉCORD')} ×${bestCombo}`;
  comboRecordEl.classList.toggle('active',value===bestCombo&&value>1);
}

function updateBattleToolLabels(){
  document.getElementById('autoTargetTool').textContent=`◉ Auto: ${autoTargetMode?T('sim','on','sí'):T('não','off','no')}`;
  document.getElementById('autoTargetTool').classList.toggle('active',autoTargetMode);
  document.getElementById('speedTool').textContent=`» ${T('Velocidade','Speed','Velocidad')} ${BATTLE_SPEEDS[battleSpeedIndex]}×`;
  document.getElementById('shuffleTool').textContent=`⟳ ${T('Embaralhar','Shuffle','Barajar')} (${royalShuffles})`;
  const formTool=document.getElementById('formationTool');
  if(formTool) formTool.textContent=`♟ ${L(HERO_FORMATIONS[formationIndex%HERO_FORMATIONS.length].nome)}`;
  const moodTool=document.getElementById('musicMoodTool');
  if(moodTool) moodTool.textContent=`♫ ${T('Música','Music','Música')}: ${['Auto',T('Calma','Calm','Calma'),T('Épica','Epic','Épica')][musicMoodMode]}`;
}

function currentTargetIndex(){
  if(autoTargetMode){
    let best=-1,bestRatio=Infinity;
    enemies.forEach((e,idx)=>{ if(e.hp>0 && e.hp/e.maxHp<bestRatio){ best=idx; bestRatio=e.hp/e.maxHp; } });
    if(best>=0) return best;
  }
  if(manualTarget!==null && enemies[manualTarget] && enemies[manualTarget].hp>0) return manualTarget;
  return enemies.findIndex(e=>e.hp>0);
}

/* O alvo visual é sempre um corpo na arena. Para contra-ataques escolhemos a
   fileira que está mais à frente em relação ao inimigo; se dois ou mais
   heróis partilham essa fileira, o do meio recebe o impacto. HP e tabuleiro
   continuam apenas como HUD, nunca como destino da trajetória. */
function frontHeroAttackTarget(source){
  const candidates=ACTIVE.map(index=>{
    const character=KINGDOMS[index];
    const avatar=character&&document.getElementById('party-'+character.id+'-avatar');
    if(!avatar) return null;
    const rect=avatar.getBoundingClientRect();
    return {index,avatar,centerX:rect.left+rect.width*.5,centerY:rect.top+rect.height*.5,width:rect.width};
  }).filter(Boolean);
  if(!candidates.length) return null;
  const sourceRect=source?.getBoundingClientRect();
  const sourceX=sourceRect?sourceRect.left+sourceRect.width*.5:Infinity;
  const enemyOnRight=sourceX>=Math.max(...candidates.map(candidate=>candidate.centerX));
  const frontX=enemyOnRight?Math.max(...candidates.map(candidate=>candidate.centerX)):Math.min(...candidates.map(candidate=>candidate.centerX));
  const tolerance=Math.max(10,Math.max(...candidates.map(candidate=>candidate.width))*.32);
  const front=candidates.filter(candidate=>Math.abs(candidate.centerX-frontX)<=tolerance).sort((a,b)=>a.centerY-b.centerY);
  return front[Math.floor(front.length/2)]||candidates[0];
}

function selectTarget(idx){
  if(busy || playerHP<=0) return;
  if(!enemies[idx] || enemies[idx].hp<=0) return;
  if(enemies.length<=1) return;
  autoTargetMode = false;
  manualTarget = idx;
  updateBattleToolLabels();
  refreshTargetHighlight();
  setBattleStatus(T(`Alvo selecionado: ${L(enemies[idx].name)}.`,`Target selected: ${L(enemies[idx].name)}.`,`Objetivo seleccionado: ${L(enemies[idx].name)}.`));
  haptic(12);
}

function refreshTargetHighlight(){
  const activeIdx = currentTargetIndex();
  enemies.forEach((e,idx)=>{
    const unit = document.getElementById('enemy-'+idx);
    if(!unit) return;
    unit.classList.toggle('target', idx===activeIdx && e.hp>0);
  });
}

function enemyAuraPalette(enemy){
  const text=(enemy?.name||'').toLowerCase();
  if(/dragão|carmesim/.test(text)) return ['#d52d32','#ffad58','#ff4938','#ffd17c'];
  if(/limo/.test(text)) return ['#3cb65c','#b8ff87','#63d968','#d8ffa8'];
  if(/pedra|golem/.test(text)) return ['#8a6849','#e1bb79','#b5824e','#ffe0a1'];
  if(/lobo/.test(text)) return ['#63428f','#c9a7ff','#8a5bd0','#ead8ff'];
  if(/espectro/.test(text)) return ['#4ba5a8','#b6ffff','#7b66c9','#d9d2ff'];
  if(/trevas|servo/.test(text)) return ['#632e78','#d7a0ee','#a43f72','#ffb5dd'];
  return ['#ae4f44','#ffd0a5','#d47759','#ffe1b8'];
}

function enemyFxRealm(enemy){
  const text=(enemy?.name||'').toLowerCase();
  if(/dragão|carmesim|brasa|fogo/.test(text)) return 'fogo';
  if(/limo|slime|água|oceano/.test(text)) return 'agua';
  if(/pedra|golem|sentinela/.test(text)) return 'terra';
  if(/lobo|harpia|vento|raivoso/.test(text)) return 'vento';
  if(/espectro|trevas|vulto|sombra|morto/.test(text)) return 'sombras';
  if(/gelo|blizz/.test(text)) return 'gelo';
  if(/chuva|tempest/.test(text)) return 'chuvas';
  return 'humanos';
}

function renderEnemies(){
  enemyArenaEl.innerHTML = '';
  enemyArenaEl.style.setProperty('--enemy-count',String(Math.max(1,enemies.length)));
  const activeIdx = currentTargetIndex();
  const selectable = enemies.filter(e=>e.hp>0).length>1;
  const enemySlots=planEnemyGridSlots();
  enemies.forEach((e, idx)=>{
    const unit = document.createElement('div');
    const isBoss=enemySlots[idx]?.isBoss===true;
    unit.className = 'unit enemy-unit' + (e.hp<=0 ? ' dead' : (idx===activeIdx ? ' target' : '')) + (selectable && e.hp>0 ? ' selectable' : '') + (isBoss?' boss-unit':'') + (e.isCard?' enemy-card-unit':'') + (e.saCounter?' charging':'');
    unit.id = 'enemy-'+idx;
    unit.dataset.facing=enemyFacingDirection(e);
    const palette=enemyAuraPalette(e);
    unit.style.setProperty('--aura-inner',palette[0]);
    unit.style.setProperty('--aura-inner-light',palette[1]);
    unit.style.setProperty('--aura-outer',palette[2]);
    unit.style.setProperty('--aura-outer-light',palette[3]);
    unit.style.setProperty('--unit-art-scale',String(enemyArtScale(e)));
    const stageHtml=`
      <div class="unit-stage">
        <div class="target-arrow"></div>
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle enemy-avatar" id="enemyPortrait-${idx}" data-action="idle">${enemyFallbackMarkup(e)}</div>
      </div>`;
    const nomeHtml=vizPrefs.enemyNames==='off'?'':`
      <div class="unit-name${isBoss?' boss-name':''}${vizPrefs.enemyNames==='top'?' name-top':''}">${isBoss?'👑 ':''}${L(e.name)}</div>`;
    unit.innerHTML = (vizPrefs.enemyNames==='top'?nomeHtml+stageHtml:stageHtml+nomeHtml)+`
      <div class="unit-hp-outer"><div class="unit-hp-inner" id="enemyHpBar-${idx}" style="width:${Math.max(0,e.hp/e.maxHp*100)}%"></div></div>
      <div class="unit-hp-text" id="enemyHpText-${idx}">${Math.max(0,e.hp)} / ${e.maxHp}</div>
    `;
    if(e.hp>0){ unit.addEventListener('click', ()=>selectTarget(idx)); }
    if(e.hp>0){
      unit.setAttribute('role','button');
      unit.setAttribute('tabindex','0');
      unit.setAttribute('aria-label',T(`Selecionar ${L(e.name)} como alvo`,`Select ${L(e.name)} as target`,`Seleccionar a ${L(e.name)} como objetivo`));
      unit.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); selectTarget(idx); } });
    }
    enemyArenaEl.appendChild(unit);
    const avatar=document.getElementById('enemyPortrait-'+idx);
    if(e.hp>0) animateEnemyAvatar(avatar,e,'idle',{loop:true});
    else defeatEnemyAvatar(avatar,e);
  });
  applyBattleFormation();
}

/* == Cores aliadas de gemas: cartas do mesmo reino usam sempre o MESMO símbolo;
   quando há 2+ cartas do reino na equipe, as gemas seguem a escada de cores de
   reinos aliados para se distinguirem no tabuleiro.
   Reino Rosa: Rosa → Branco → Azul Escuro → Marrom. (Demais reinos: a definir.) */
/* == ALIANÇAS CÍCLICAS DE REINOS (definidas pelo usuário, 2026-08-05):
   Aliança A: Rosa(humanos) → Branco(luz) → Azul Escuro(agua) → Marrom(terra)
   Aliança B: Sombras → Raio → Gelo → Chuva
   Aliança C: Fogo → Vento → Areia → Natureza
   Regra: com 2+ cartas do mesmo reino na equipe, a N-ésima carta usa as CORES do
   N-ésimo reino da aliança (rotação cíclica a partir do próprio reino), mantendo
   SEMPRE o símbolo do reino de origem — pintado na cor do reino quando a cor muda. */
const ALLIED_ORDER={
  humanos:['humanos','luz','agua','terra'],
  luz:['luz','agua','terra','humanos'],
  agua:['agua','terra','humanos','luz'],
  terra:['terra','humanos','luz','agua'],
  sombras:['sombras','raio','gelo','chuvas'],
  raio:['raio','gelo','chuvas','sombras'],
  gelo:['gelo','chuvas','sombras','raio'],
  chuvas:['chuvas','sombras','raio','gelo'],
  fogo:['fogo','vento','areia','natureza'],
  vento:['vento','areia','natureza','fogo'],
  areia:['areia','natureza','fogo','vento'],
  natureza:['natureza','fogo','vento','areia']
};
function realmOrb(id){
  const k=KINGDOMS.find(x=>x.id===id);
  return k?{c:k.orbColor||k.color, l:k.orbColorLight||k.colorLight, d:k.orbColorDark||k.colorDark}:null;
}
/* == AS 3 GRANDES ALIANÇAS DE YGDRIA (nomes oficiais definidos pelo criador) == */
const ALLIANCES=[
  {id:'lago',   nome:'Aliança do Lago de Ygdria', membros:['humanos','luz','agua','terra'],   cor:'#6fb7ff', icon:'🌊'},
  {id:'dragao', nome:'Aliança do Rei Dragão',     membros:['fogo','vento','natureza','areia'], cor:'#ff8a4d', icon:'🐉'},
  {id:'barion', nome:'Aliança Barion',            membros:['sombras','raio','gelo','chuvas'],  cor:'#b48aff', icon:'🌩'}
];
function allianceOf(realmId){ return ALLIANCES.find(a=>a.membros.includes(realmId))||null; }
/* Bônus de sinergia: repetir reino fortalece o ATQ do grupo; equipe 100% da mesma
   aliança fortalece ATQ e HP. Calculado ao montar a equipe/batalha. */
let allianceBonus={atk:1,hp:1,rotulos:[]};
function computeAllianceBonus(ids){
  const time=(ids&&ids.length?ids:ACTIVE)||[];
  const bonus={atk:1,hp:1,rotulos:[]};
  if(time.length===4){
    const fams={};
    time.forEach(i=>{ const f=KINGDOMS[i]?.iconId||KINGDOMS[i]?.id; if(f) fams[f]=(fams[f]||0)+1; });
    const maxRepet=Math.max(1,...Object.values(fams));
    if(maxRepet>=2){
      const extra=maxRepet===2?0.10:maxRepet===3?0.15:0.20;
      bonus.atk+=extra;
      const famTop=Object.keys(fams).find(f=>fams[f]===maxRepet);
      const lead=KINGDOMS.find(k=>k.id===famTop);
      bonus.rotulos.push(`${maxRepet}× ${lead?L(lead.reino):famTop} · +${Math.round(extra*100)}% ${T('ATQ','ATK','ATQ')}`);
    }
    const als=new Set(time.map(i=>allianceOf(KINGDOMS[i]?.iconId||KINGDOMS[i]?.id)?.id||'x'));
    if(als.size===1&&!als.has('x')){
      const al=ALLIANCES.find(a=>a.id===[...als][0]);
      bonus.atk+=0.05; bonus.hp+=0.10;
      bonus.rotulos.push(`${al.icon} ${al.nome} · +5% ${T('ATQ','ATK','ATQ')} · +10% HP`);
    }
  }
  return bonus;
}
/* ATQ efetivo em batalha (inclui bônus de aliança e Estandarte da Coroa) */
function heroAtkBattle(idx){ return Math.round(heroAtkFor(idx)*(allianceBonus?.atk||1)*(typeof bannerAtkRun==='number'?bannerAtkRun:1)); }
let battleGemColors={};
/* Estados de combate das cartas SUPER/ULTRA RARAS (restaurados) */
let damageReductionStacks=0;   /* Kalander · O Herói da Nação (cap 2) */
let queenFuryStacks=0;         /* Bernyce · Ímpeto da Rainha */
let chamarizCharges=0;         /* Jules · Chamariz (reviver com 100 HP) */
let sombrasDevoradorasOn=false;/* Julius · Sombras Devoradoras */
let pendingDimensional=[];     /* Julius · Lâmina Dimensional (dano nas missões futuras) */
let tempoSombrioTimer=null;    /* registro pausável do scheduler da corrupção */
function cancelTempoSombrio(){
  const record=tempoSombrioTimer;
  if(!record) return;
  record.cancelled=true;
  if(record.timerId) clearTimeout(record.timerId);
  combatTimers.delete(record);
  tempoSombrioTimer=null;
}
function startTempoSombrio(){
  cancelTempoSombrio();
  if(!enemies.some(enemy=>enemy.cardId==='julius'&&enemy.hp>0)) return;
  const darkTick=()=>{
    if(playerHP<=0){ tempoSombrioTimer=null; return; }
    const candidates=[];
    for(let row=0;row<SIZE;row++) for(let column=0;column<SIZE;column++){
      const key=cellKey(row,column);
      if(board[row]?.[column]>=0&&!powerUps[key]) candidates.push({r:row,c:column,key});
    }
    if(!candidates.length){
      tempoSombrioTimer=null;
      setBattleStatus(T('As sombras consumiram o tabuleiro inteiro...','The shadows consumed the entire board...','Las sombras consumieron todo el tablero...'));
      playerHP=0; updatePlayerHP(); handlePlayerDefeat();
      return;
    }
    const target=candidates[Math.floor(gameRandom()*candidates.length)];
    board[target.r][target.c]=-4;
    obstaclesMeta[target.key]={type:'sombra',hits:9999};
    renderBoard();
    let hud=document.getElementById('sombraHud');
    if(!hud){ hud=document.createElement('div'); hud.id='sombraHud'; document.querySelector('.mission-topbar')?.appendChild(hud); }
    hud.textContent='🌑 '+Object.values(obstaclesMeta).filter(meta=>meta.type==='sombra').length+'/'+(SIZE*SIZE);
    if(!hasValidMoves()) shuffleBoard(false);
    setBattleStatus(T('⏳ Tempo Sombrio corrompeu uma gema!','⏳ Dark Time corrupted a gem!','⏳ ¡El Tiempo Sombrío corrompió una gema!'),'damage');
    tempoSombrioTimer=scheduleCombat(darkTick,30000);
  };
  tempoSombrioTimer=scheduleCombat(darkTick,30000);
}
function computeBattleGemColors(){
  battleGemColors={};
  const fams={};
  ACTIVE.forEach(i=>{
    const fam=KINGDOMS[i].iconId||KINGDOMS[i].id;
    /* Cada carta começa sempre com a gema-base do próprio reino.
       A escada de cores só é aplicada quando houver repetição do reino. */
    const own=realmOrb(fam);
    if(own) battleGemColors[i]={...own};
    (fams[fam]=fams[fam]||[]).push(i);
  });
  Object.entries(fams).forEach(([fam,idxs])=>{
    if(idxs.length<2) return;
    const ordem=ALLIED_ORDER[fam];
    if(!ordem) return;
    const lead=KINGDOMS.find(k=>k.id===fam);
    idxs.forEach((i,ord)=>{
      const doador=ordem[ord%ordem.length];
      const cores=realmOrb(doador);
      if(!cores) return;
      battleGemColors[i]={...cores};
      /* Gema com cor emprestada leva o SÍMBOLO na cor do reino de origem */
       if(doador!==fam && lead) battleGemColors[i].icon=fam==='sombras'?'#050308':lead.color;
    });
  });
}

/* == HABILIDADES DE FASE: cada carta tem UM truque que usa apenas quando aparece
   como INIMIGA numa fase (nunca quando é usada como herói). Descritas no modal da
   carta; executadas em enemyCounterAttack a cada `cd` turnos, salvo stun/cegueira. */
let hiddenGems={};   // Véu do Eclipse: células com cor oculta {r_c: turnos restantes}
const OB_TYPES={ ice:{icon:'❄',nome:'gelo'}, stone:{icon:'⛰',nome:'pedra'}, sand:{icon:'⏳',nome:'areia'}, vine:{icon:'🌿',nome:'vinhas'}, sombra:{icon:'🌑',nome:'sombra'}, copas:{icon:'❤',nome:'copas'} };

function stageAbilityFor(cardId){
  if(!cardId) return null;
  const k=KINGDOMS.find(x=>x.id===cardId);
  return (k&&k.stageAbility)?k.stageAbility:null;
}
function saPickCells(qtd){
  const cand=[];
  for(let r=0;r<SIZE;r++)for(let c=0;c<SIZE;c++){
    const key=cellKey(r,c);
    if(board[r][c]>=0 && !powerUps[key] && !obstaclesMeta[key] && !hiddenGems[key]) cand.push({r,c,key});
  }
  for(let i=cand.length-1;i>0;i--){ const j=Math.floor(gameRandom()*(i+1)); [cand[i],cand[j]]=[cand[j],cand[i]]; }
  return cand.slice(0,qtd);
}
function saChangeColorSafe(r,c){
  const atual=board[r][c];
  const opcoes=ACTIVE.filter(i=>i!==atual);
  for(let t=0;t<opcoes.length+2;t++){
    board[r][c]=opcoes[Math.floor(gameRandom()*opcoes.length)];
    if(!findMatches().length) return true;
  }
  board[r][c]=atual;
  return false;
}
function saDrainHero(idx, amount){
  heroProgress[idx]=Math.max(0,(heroProgress[idx]||0)-amount);
  firedTiers[idx]=new Set(KINGDOMS[idx].abilities.filter(a=>a.kind==='passive'&&a.gems<=heroProgress[idx]).map(a=>a.gems));
  updateHeroProgressUI(idx);
}
function saMostChargedHero(){
  let best=-1,bestV=-1;
  ACTIVE.forEach(i=>{ const v=heroProgress[i]||0; if(v>bestV){bestV=v;best=i;} });
  return best;
}
function saHealEnemy(e, amount){
  if(!amount) return;
  e.hp=Math.min(e.maxHp,e.hp+Math.round(amount));
  const i=enemies.indexOf(e);
  const bar=document.getElementById('enemyHpBar-'+i);
  const txt=document.getElementById('enemyHpText-'+i);
  if(bar) bar.style.width=Math.max(0,(e.hp/e.maxHp)*100)+'%';
  if(txt) txt.textContent=`${e.hp} / ${e.maxHp}`;
}
function saAnnounce(e, sa){
  explainMechanicOnce('stage-'+sa.nome,`${L(sa.nome)}: ${L(sa.desc||'efeito especial de fase')}`);
  const i=enemies.indexOf(e);
  setBattleStatus(T(`⚔ ${L(e.name)} usou ${L(sa.nome)}!`,`⚔ ${L(e.name)} used ${L(sa.nome)}!`,`⚔ ¡${L(e.name)} usó ${L(sa.nome)}!`), 'damage');
  showFloatDamage(0,'enemy-'+i,false);
  const anchor=document.getElementById('enemy-'+i);
  const el=anchor?.querySelector('.dmg-float:last-child');
  if(el){ el.textContent=L(sa.nome)+'!'; el.style.color='#ffb3c8'; el.style.fontSize='11px'; }
}
const STAGE_ABILITY_TARGETS_HERO=new Set(['drenarTodosECurar','drenarMaisCarregado','sobrecarga','encharcar']);
function stageAbilityTargetsHero(ability){ return STAGE_ABILITY_TARGETS_HERO.has(ability?.tipo); }
async function performEnemyStageAbility(enemyIdx,enemy,ability){
  const epoch=combatEpoch;
  const unit=document.getElementById('enemy-'+enemyIdx);
  const source=document.getElementById('enemyPortrait-'+enemyIdx);
  const actor=enemyCharacterFor(enemy);
  playEnemyAction(enemyIdx,'cast');
  if(actor&&source) spawnHumanConjurationAura(actor,source);
  else if(source) spawnCombatFx('telegraph',source,enemyAuraPalette(enemy)[1],520);
  await wait(CONJURATION_LEAD_MS);
  if(epoch!==combatEpoch||enemy.hp<=0) return;
  if(stageAbilityTargetsHero(ability)){
    playEnemyAction(enemyIdx,'attack');
    const target=frontHeroAttackTarget(source)?.avatar||document.getElementById('playerHpAnchor');
    if(source&&target){
      const color=enemyAuraPalette(enemy)[1];
      spawnCombatAttackFx(enemyFxRealm(enemy),source,target,color,'impact',enemy);
      spawnCombatFx('impact',target,color,520);
    }
    await wait(360);
    if(epoch!==combatEpoch||enemy.hp<=0) return;
  }
  try{ execStageAbility(enemy,ability); saAnnounce(enemy,ability); }catch(err){ console.warn('stageAbility', err); }
}
async function runStageAbilities(){
  if(busy&&battlePhase!=='enemies') return; /* nunca mutar o tabuleiro com uma resolução de combos em voo */
  const epoch=combatEpoch;
  for(const e of enemies){
    if(epoch!==combatEpoch||e.hp<=0) continue;
    const sa=stageAbilityFor(e.cardId);
    if(!sa||sa.tempoReal) continue;
    e.saCounter=(e.saCounter||0)+1;
    const iEn=enemies.indexOf(e);
    const anc=document.getElementById('enemy-'+iEn);
    let bdg=anc?.querySelector('.sa-count');
    if(anc&&!bdg){ bdg=document.createElement('div'); bdg.className='sa-count'; anc.appendChild(bdg); }
    if(bdg) bdg.textContent='🗡'+Math.max(0,sa.cd-e.saCounter);
    if(e.saCounter<sa.cd) continue;
    e.saCounter=0;
    await performEnemyStageAbility(iEn,e,sa);
    if(epoch!==combatEpoch) return;
  }
}
function execStageAbility(e, sa){
  let mexeuBoard=false;
  switch(sa.tipo){
    case 'trocarCores':
      saPickCells(sa.qtd||3).forEach(cell=>{ if(saChangeColorSafe(cell.r,cell.c)) mexeuBoard=true; });
      break;
    case 'selarPowerUp':{
      const keys=Object.keys(powerUps);
      if(keys.length){
        const key=keys[Math.floor(gameRandom()*keys.length)];
        const [r,c]=key.split('_').map(Number);
        delete powerUps[key];
        if(board[r][c]===-2){ board[r][c]=ACTIVE[Math.floor(gameRandom()*ACTIVE.length)]; saChangeColorSafe(r,c); }
        mexeuBoard=true;
      } else saHealEnemy(e, sa.cura||60);
      break;
    }
    case 'drenarMaisCarregado':{
      const h=saMostChargedHero(); if(h>=0) saDrainHero(h, sa.valor||12);
      break;
    }
    case 'criarObstaculos':{
      const livre=Math.max(0, 8-Object.keys(obstaclesMeta).length);
      saPickCells(Math.min(sa.qtd||1, livre)).forEach((cell,i2)=>{
        board[cell.r][cell.c]=-4;
        delete powerUps[cell.key];
        obstaclesMeta[cell.key]={type:sa.obst||'stone', hits:(sa.hits||1)+((sa.reforcado&&i2<sa.reforcado)?1:0)};
        mexeuBoard=true;
      });
      break;
    }
    case 'embaralharTudo': shuffleBoard(false); break;
    case 'drenarTodosECurar':{
      let total=0;
      ACTIVE.forEach(i2=>{ const tira=Math.min(heroProgress[i2]||0, sa.valor||6); if(tira>0){ saDrainHero(i2,tira); total+=tira; } });
      if(total>0) saHealEnemy(e, total*(sa.curaMult||5));
      break;
    }
    case 'lavarColuna':{
      const c=Math.floor(gameRandom()*SIZE);
      for(let r=0;r<SIZE;r++){ const key=cellKey(r,c); if(board[r][c]>=0&&!obstaclesMeta[key]){ board[r][c]=-1; delete powerUps[key]; delete hiddenGems[key]; } }
      collapseAndRefill(); mexeuBoard=true;
      break;
    }
    case 'queimarCruz':{
      const r=1+Math.floor(gameRandom()*(SIZE-2)), c=1+Math.floor(gameRandom()*(SIZE-2));
      [[r,c],[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([rr,cc])=>{
        const key=cellKey(rr,cc);
        if(obstaclesMeta[key]) return;
        delete powerUps[key]; delete hiddenGems[key];
        if(board[rr][cc]>=0||board[rr][cc]===-2) board[rr][cc]=-1;
      });
      collapseAndRefill(); mexeuBoard=true;
      break;
    }
    case 'embaralharLinhas':{
      const linhas=[];
      while(linhas.length<(sa.qtd||2)){ const r=Math.floor(gameRandom()*SIZE); if(!linhas.includes(r)) linhas.push(r); }
      const celulas=[];
      linhas.forEach(r=>{ for(let c=0;c<SIZE;c++){ if(board[r][c]>=0&&!obstaclesMeta[cellKey(r,c)]) celulas.push({r,c}); } });
      for(let tent=0;tent<10;tent++){
        const vals=celulas.map(p=>board[p.r][p.c]);
        for(let i2=vals.length-1;i2>0;i2--){ const j=Math.floor(gameRandom()*(i2+1)); [vals[i2],vals[j]]=[vals[j],vals[i2]]; }
        celulas.forEach((p,i2)=>{ board[p.r][p.c]=vals[i2]; });
        if(!findMatches().length) break;
      }
      mexeuBoard=true;
      break;
    }
    case 'ocultarCores':
      saPickCells(sa.qtd||5).forEach(cell=>{ hiddenGems[cell.key]=sa.turnos||3; });
      mexeuBoard=true;
      break;
    case 'sobrecarga':{
      const h=saMostChargedHero();
      if(h>=0&&(heroProgress[h]||0)>(sa.limite||50)){ heroProgress[h]=sa.limite||50; saDrainHero(h,0); }
      break;
    }
    case 'deslizarLinha':{
      const r=Math.floor(gameRandom()*SIZE);
      const cols=[];
      for(let c=0;c<SIZE;c++){ if(board[r][c]>=0&&!obstaclesMeta[cellKey(r,c)]) cols.push(c); }
      if(cols.length>1){
        for(let tent=0;tent<4;tent++){
          const vals=cols.map(c=>board[r][c]);
          vals.unshift(vals.pop());
          cols.forEach((c,i2)=>{ board[r][c]=vals[i2]; });
          if(!findMatches().length) break;
        }
        cols.forEach(c=>{ delete powerUps[cellKey(r,c)]; });
        mexeuBoard=true;
      }
      break;
    }
    case 'asDeCopas':{
      const alvo=saPickCells(1)[0];
      if(alvo){
        board[alvo.r][alvo.c]=-4;
        delete powerUps[alvo.key];
        obstaclesMeta[alvo.key]={type:'copas',hits:1};
        mexeuBoard=true;
      }
      break;
    }
    case 'cortarX':{
      for(let i2=0;i2<SIZE;i2++){
        [[i2,i2],[i2,SIZE-1-i2]].forEach(([rr,cc])=>{
          const key=cellKey(rr,cc);
          if(obstaclesMeta[key]) return;
          delete powerUps[key]; delete hiddenGems[key];
          if(board[rr][cc]>=0||board[rr][cc]===-2) board[rr][cc]=-1;
        });
      }
      collapseAndRefill(); mexeuBoard=true;
      break;
    }
    case 'regulacaoReal':{
      const chaves=Object.keys(powerUps);
      chaves.forEach(key=>{
        const [rr,cc]=key.split('_').map(Number);
        delete powerUps[key];
        if(board[rr][cc]===-2){ board[rr][cc]=ACTIVE[Math.floor(gameRandom()*ACTIVE.length)]; saChangeColorSafe(rr,cc); }
      });
      if(chaves.length){ saHealEnemy(e,(sa.cura||80)*chaves.length); mexeuBoard=true; }
      break;
    }
    case 'encharcar':
      ACTIVE.forEach(i2=>{ nextAttackMult[i2]=Math.min(nextAttackMult[i2]||1, sa.mult||0.5); });
      renderStatusTray();
      break;
  }
  if(mexeuBoard){
    renderBoard();
    if(!hasValidMoves()) shuffleBoard(false);
  }
}

/* Escudo anti tap-through: após trocas de tela, ignora cliques por 350ms para o
   toque que iniciou a transição não "vazar" no botão que aparece por baixo. */
let tapGuardUntil=0;
function armTapGuard(duration=350){ tapGuardUntil=performance.now()+Math.max(0,duration); }
document.addEventListener('click',e=>{
  const bypass=e.target instanceof Element&&e.target.closest('[data-tap-guard-bypass]');
  if(performance.now()<tapGuardUntil&&!bypass){ e.stopPropagation(); e.preventDefault(); }
},true);

/* ===== v9.1 · FUNCIONALIDADES NOVAS ===== */
/* F1 · Auto-batalha */
let autoBattle=false, autoBattleTimer=null;
let autoActives=localStorage.getItem('12r_autoactives')==='1';
function setAutoBattle(on){
  autoBattle=on;
  const b=document.getElementById('autoTool');
  if(b) b.textContent=(on?'⏸ ':'▶ ')+T('Auto: ','Auto: ','Auto: ')+(on?T('sim','on','sí'):T('não','off','no'));
  clearInterval(autoBattleTimer); autoBattleTimer=null;
  if(on){
    autoBattleTimer=setInterval(()=>{
      if(!autoBattle||!canAcceptPlayerInput()||document.hidden) return;
      if(!document.body.classList.contains('game-active')) return;
      /* auto-ativas: dispara a primeira ativa carregada antes de jogar */
      if(autoActives){
        for(const hi of ACTIVE){
          const fila=heroActiveQueue[hi]||[];
          if(fila.length){ useQueuedActive(hi,fila[0]); return; }
        }
      }
      const mv=findBestMove();
      if(mv) trySwap(mv[0],mv[1]);
    },1300);
  }
}
/* F2 · Bestiário */
function officialBestiaryNames(){
  return new Set([
    ...Object.values(HUMANOS_ETYPES||{}).map(entry=>entry?.n),
    ...Object.values(HUMANOS_CARDS||{}).map(entry=>entry?.nome)
  ].filter(Boolean));
}
function sanitizeBestiary(value){
  const clean={};
  if(!value||typeof value!=='object'||Array.isArray(value)) return clean;
  const allowed=officialBestiaryNames();
  Object.entries(value).forEach(([name,count])=>{
    const amount=Number(count);
    if(allowed.has(name)&&Number.isSafeInteger(amount)&&amount>0&&amount<=1_000_000) clean[name]=amount;
  });
  return clean;
}
function bestiary(){ try{ return sanitizeBestiary(JSON.parse(localStorage.getItem('12r_bestiary')||'{}')); }catch(e){ return {}; } }
function registerBestiary(nomePt){
  const b=bestiary(); b[nomePt]=(b[nomePt]||0)+1;
  localStorage.setItem('12r_bestiary',JSON.stringify(b));
}
/* F3 · Recompensas de login diário: ciclo de 7 dias (moedas crescentes + itens).
   A sequência quebra se faltar um dia; o ciclo reinicia após o dia 7. */
const LOGIN_REWARDS=[
  {c:15},
  {c:20},
  {c:25, item:'vela'},
  {c:30},
  {c:40, item:'potion'},
  {c:50},
  {c:80, item:'blessing'}
];
function sanitizeLoginState(value){
  if(!value||typeof value!=='object'||Array.isArray(value)) return {date:'',streak:0};
  const date=/^\d{4}-\d{2}-\d{2}$/.test(String(value.date||''))?String(value.date):'';
  const streak=Number(value.streak);
  return {date,streak:Number.isSafeInteger(streak)&&streak>=0&&streak<=1_000_000?streak:0};
}
function sanitizeHeroIdList(value){
  if(!Array.isArray(value)) return [];
  const allowed=new Set(KINGDOMS.map(character=>character.id));
  return [...new Set(value.filter(id=>typeof id==='string'&&allowed.has(id)))];
}
function checkLoginReward(){
  let st={date:'',streak:0};
  try{ st=sanitizeLoginState(JSON.parse(localStorage.getItem('12r_login')||'{"date":"","streak":0}')); }catch(e){}
  const hoje=todayKey();
  if(st.date===hoje) return;
  const ontem=(()=>{ const d=new Date(); d.setDate(d.getDate()-1); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })();
  st.streak=(st.date===ontem)?st.streak+1:1;
  st.date=hoje;
  localStorage.setItem('12r_login',JSON.stringify(st));
  const dia=(st.streak-1)%7;
  const rec=LOGIN_REWARDS[dia];
  grantCoins(rec.c);
  let extra='';
  if(rec.item){
    inventory[rec.item]=(inventory[rec.item]||0)+1;
    saveInventory();
    const it=SHOP_ITEMS.find(i=>i.id===rec.item);
    extra=' + '+(it?it.icon+' '+L(it.nome):rec.item);
  }
  setTimeout(()=>{
    const t=document.createElement('div');
    t.className='ach-toast show';
    t.innerHTML='<span class="ach-toast-icon">📅</span><div><b>'+T('Recompensa de login — dia ','Login reward — day ','Recompensa de inicio — día ')+(dia+1)+'/7</b><br>+'+rec.c+' '+T('moedas','coins','monedas')+extra+' · '+T('sequência','streak','racha')+' '+st.streak+'</div>';
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),4200);
  },900);
}
function renderLoginCalendar(){
  let st={date:'',streak:0};
  try{ st=sanitizeLoginState(JSON.parse(localStorage.getItem('12r_login')||'{}')); }catch(e){}
  const diaAtual=st.streak?(st.streak-1)%7:-1;
  return '<div class="quests-box login-cal"><b>📅 '+T('Login diário — ciclo de 7 dias','Daily login — 7-day cycle','Inicio diario — ciclo de 7 días')+'</b><div class="login-days">'+
    LOGIN_REWARDS.map((r,i)=>{
      const it=r.item?SHOP_ITEMS.find(x=>x.id===r.item):null;
      return '<span class="login-day'+(i<diaAtual?' done':i===diaAtual?' today':'')+'"><i>'+(i+1)+'</i>🪙'+r.c+(it?'<em>'+it.icon+'</em>':'')+'</span>';
    }).join('')+
    '</div><small>'+T('Sequência atual','Current streak','Racha actual')+': '+(st.streak||0)+' '+T('dia(s)','day(s)','día(s)')+'</small></div>';
}
/* F4 · Missões diárias */
function questsState(){
  const hoje=todayKey();
  let q; try{ q=JSON.parse(localStorage.getItem('12r_quests')||'null'); }catch(e){ q=null; }
  return sanitizeQuestsState(q,hoje);
}
const QUESTS_DEF=[
  {id:'win2',   n:2, ico:'⚔', nome:()=>T('Vença 2 missões','Win 2 missions','Gana 2 misiones'), premio:40},
  {id:'combo4', n:1, ico:'✦', nome:()=>T('Faça um combo ×4','Land a ×4 combo','Logra un combo ×4'), premio:40},
  {id:'active2',n:2, ico:'✨', nome:()=>T('Use 2 habilidades ativas','Use 2 active abilities','Usa 2 habilidades activas'), premio:40}
];
function sanitizeQuestsState(value,date=todayKey()){
  const base={date,prog:{win2:0,combo4:0,active2:0},done:[]};
  if(!value||typeof value!=='object'||Array.isArray(value)||value.date!==date) return base;
  for(const definition of QUESTS_DEF){
    const amount=Number(value.prog?.[definition.id]);
    base.prog[definition.id]=Number.isFinite(amount)?Math.max(0,Math.min(definition.n,Math.floor(amount))):0;
  }
  base.done=Array.isArray(value.done)?[...new Set(value.done.filter(id=>QUESTS_DEF.some(definition=>definition.id===id)))]:[];
  return base;
}
function questEvent(tipo,valor){
  const q=questsState();
  if(tipo==='win') q.prog.win2=Math.min(2,q.prog.win2+1);
  if(tipo==='combo'&&valor>=4) q.prog.combo4=1;
  if(tipo==='active') q.prog.active2=Math.min(2,q.prog.active2+1);
  QUESTS_DEF.forEach(d=>{
    if(!q.done.includes(d.id)&&q.prog[d.id]>=d.n){
      q.done.push(d.id);
      grantCoins(d.premio);
      setBattleStatus('🏅 '+T('Missão diária concluída','Daily quest complete','Misión diaria completa')+': '+d.nome()+' (+'+d.premio+' 🪙)','support');
    }
  });
  localStorage.setItem('12r_quests',JSON.stringify(q));
}
/* F5 · Equipes salvas (3 slots) */
function teamCode(ids){ return '12R-'+ids.map(i=>KINGDOMS[i]?.id).join('.'); }
function isValidHeroTeam(value){
  return Array.isArray(value)&&value.length===4&&new Set(value).size===4&&value.every(index=>Number.isInteger(index)&&index>=0&&index<KINGDOMS.length);
}
function sanitizeSavedTeamSlots(value){
  if(!Array.isArray(value)) return [null,null,null];
  return Array.from({length:3},(_,index)=>isValidHeroTeam(value[index])?[...value[index]]:null);
}
function parseTeamCode(txt){
  const m=String(txt||'').trim().match(/^12R-(.+)$/i); if(!m) return null;
  const ids=m[1].split('.').map(idn=>KINGDOMS.findIndex(k=>k.id===idn.trim().toLowerCase())).filter(i=>i>=0);
  return ids.length===4 && new Set(ids).size===4?ids:null;
}
function renderTeamSlots(){
  const box=document.getElementById('teamSlots'); if(!box) return;
  let times; try{ times=JSON.parse(localStorage.getItem('12r_teams')||'[null,null,null]'); }catch(e){ times=[null,null,null]; }
  times=sanitizeSavedTeamSlots(times);
  box.innerHTML='';
  const brasao='<svg class="team-crest" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l7 2.6v6.2c0 4.8-3 8.4-7 10.6-4-2.2-7-5.8-7-10.6V4.6L12 2zm0 3.1L7.2 6.8v4.3c0 3.4 2 6.1 4.8 7.9 2.8-1.8 4.8-4.5 4.8-7.9V6.8L12 5.1z"/><path d="M12 7.4l1.2 2.4 2.6.4-1.9 1.9.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.9 2.6-.4L12 7.4z"/></svg>';
  times.forEach((t2,i)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='team-slot'+(t2?' filled':'');
    b.innerHTML=t2?(brasao+' '+t2.map(ii=>KINGDOMS[ii]?.nome?.[0]||'?').join(''))
                  :(brasao+' '+T('Equipe','Team','Equipo')+' '+(i+1));
    b.title=t2?T('Toque para usar esta equipe. Com 4 escolhidas, toque para sobrescrever.','Tap to use this team. With 4 chosen, tap to overwrite.','Toca para usar este equipo.'):T('Escolha 4 cartas e toque para salvar.','Pick 4 cards and tap to save.','Elige 4 cartas y toca para guardar.');
    b.addEventListener('click',()=>{
      if(chosenIds.length===4){ times[i]=[...chosenIds]; localStorage.setItem('12r_teams',JSON.stringify(times)); renderTeamSlots(); sfxSelect(); }
      else if(t2){ chosenIds=t2.filter(ii=>KINGDOMS[ii]).slice(0,4); renderSelectGrid(); renderTeamSlots(); sfxSelect(); }
      else sfxInvalid();
    });
    box.appendChild(b);
  });
  const share=document.createElement('button');
  share.type='button'; share.className='team-slot';
  share.textContent='🔗';
  share.title=T('Com 4 escolhidas: copia o código da equipe. Vazio: cola um código.','With 4 chosen: copies team code. Empty: paste a code.','Con 4: copia el código. Vacío: pega un código.');
  share.addEventListener('click',async()=>{
    if(chosenIds.length===4){
      await navigator.clipboard?.writeText(teamCode(chosenIds));
      share.textContent='✅'; setTimeout(()=>share.textContent='🔗',1400);
    } else {
      const txt=prompt(T('Cole o código da equipe (12R-...)','Paste the team code (12R-...)','Pega el código (12R-...)'));
      const ids=parseTeamCode(txt);
      if(ids){ chosenIds=ids; renderSelectGrid(); sfxSelect(); } else if(txt) sfxInvalid();
    }
  });
  box.appendChild(share);
}
/* F7 · Recorde de turnos por fase */
function faseBest(){ try{ return sanitizeNumericRecord(JSON.parse(localStorage.getItem('12r_fase_best')||'{}')); }catch(e){ return {}; } }
function faseTime(){ try{ return sanitizeNumericRecord(JSON.parse(localStorage.getItem('12r_fase_time')||'{}')); }catch(e){ return {}; } }
/* ⏱ Timer da missão: conta desde a entrada; é a base oficial para habilidades de
   tempo real e para os rankings de missão/fase. */
let missionStartMs=0, missionTimerInt=null, missionPausedAt=0, missionPausedTotal=0;
function missionElapsed(){
  if(!missionStartMs) return 0;
  const pausedNow=missionPausedAt?Date.now()-missionPausedAt:0;
  return Math.max(0,Math.floor((Date.now()-missionStartMs-missionPausedTotal-pausedNow)/1000));
}
function fmtTempo(s){ return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
function startMissionTimer(reset=true){
  if(reset){
    missionStartMs=Date.now(); missionPausedAt=0; missionPausedTotal=0;
    startTempoSombrio();
  }
  clearInterval(missionTimerInt);
  const tick=()=>{ const el=document.getElementById('missionTimer'); if(el) el.textContent='⏱ '+fmtTempo(missionElapsed()); };
  tick();
  missionTimerInt=setInterval(tick,1000);
}
function stopMissionTimer(){ clearInterval(missionTimerInt); missionTimerInt=null; }
function pauseMissionClock(){
  if(!missionStartMs || missionPausedAt) return;
  missionPausedAt=Date.now(); stopMissionTimer();
}
function resumeMissionClock(){
  if(!missionPausedAt) return;
  missionPausedTotal += Date.now()-missionPausedAt;
  missionPausedAt=0;
  if(missionStartMs) startMissionTimer(false);
}
/* 👁 Preferências de VISUALIZAÇÃO (menu Opções → Visualização) */
/* Preferências padrão da apresentação de batalha: HUD superior discreto,
   heróis sem etiquetas e inimigos identificados abaixo do sprite. */
let vizPrefs={heroNames:'off',enemyNames:'bottom',dmg:true,dps:true,timer:true,turnInfo:true,topHud:'transparent',infoBar:'transparent'};
try{ vizPrefs={...vizPrefs,...JSON.parse(localStorage.getItem('12r_viz')||'{}')}; }catch(e){}
/* Migração de defaults visuais da campanha: aplica uma única vez para que
   versões anteriores não reintroduzam HUD sólido e nomes de heróis. */
if(localStorage.getItem('12r_viz_defaults')!=='9.3.9'){
  vizPrefs.heroNames='off'; vizPrefs.enemyNames='bottom'; vizPrefs.topHud='transparent'; vizPrefs.infoBar='transparent';
  localStorage.setItem('12r_viz_defaults','9.3.9');
  localStorage.setItem('12r_viz',JSON.stringify(vizPrefs));
}
if(!['solid','transparent','off'].includes(vizPrefs.topHud)) vizPrefs.topHud='solid';
if(!['solid','transparent','off'].includes(vizPrefs.infoBar)) vizPrefs.infoBar='transparent';
function saveViz(){ localStorage.setItem('12r_viz',JSON.stringify(vizPrefs)); applyVizSettings(); }
function applyVizSettings(){
  document.body.classList.toggle('viz-dmg-off',!vizPrefs.dmg);
  document.body.classList.toggle('viz-dps-off',!vizPrefs.dps);
  document.body.classList.toggle('viz-timer-off',!vizPrefs.timer);
  document.body.classList.toggle('viz-turn-info-off',!vizPrefs.turnInfo);
  ['solid','transparent','off'].forEach(mode=>{
    document.body.classList.toggle(`viz-top-hud-${mode}`,vizPrefs.topHud===mode);
    document.body.classList.toggle(`viz-info-bar-${mode}`,vizPrefs.infoBar===mode);
  });
  if(vizPrefs.topHud!=='off') document.body.classList.remove('hud-peek');
}
function vizNameLabel(v){ return v==='top'?T('Em cima','Top','Arriba'):v==='off'?T('Desabilitado','Disabled','Desactivado'):T('Embaixo','Bottom','Abajo'); }
function vizOnOff(v){ return v?T('Mostrar','Show','Mostrar'):T('Ocultar','Hide','Ocultar'); }
function vizSurfaceLabel(v){ return v==='transparent'?T('Transparente','Transparent','Transparente'):v==='off'?T('Desabilitado','Disabled','Desactivado'):T('Ativo','On','Activo'); }
function refreshVizBattle(){
  applyVizSettings();
  if(document.body.classList.contains('game-active')){
    renderPartyArena(); renderEnemies(); renderCardStrip();
    ACTIVE.forEach(i=>updateHeroProgressUI(i));
  }
}
/* F9 · Modo foto */
function togglePhotoMode(on){
  document.body.classList.toggle('photo-mode',on);
  if(on){
    closeAllPanels();
    const sair=(ev)=>{ togglePhotoMode(false); document.removeEventListener('click',sair,true); ev.stopPropagation(); ev.preventDefault(); };
    setTimeout(()=>document.addEventListener('click',sair,true),350);
  }
}

function loadStage(idx){
  resetCombatSchedule();
  humanFinaleCinematicRunning=false;
  humanFinalePreludeRunning=false;
  humanFinalePreludeFinished=false;
  humanFinaleOutcomeResolved=false;
  arenaEl?.querySelector('.human-final-scene')?.remove();
  arenaEl?.querySelector('.human-final-prelude')?.remove();
  arenaEl?.querySelectorAll('.human-final-shadow-strike').forEach(effect=>effect.remove());
  arenaEl?.classList.remove('human-finale-before-darkness','human-finale-darkening','human-finale-prelude-active');
  resetPartyAnimationState();
  stageTransitioning = false;
  defeatFinalized = false;
  roomClearScheduled = false;
  missionFieldStarted = false;
  hideTowerGameOverPanel();
  selected = null;
  stageIndex = idx;
  if(towerMode && difficulty==='pesadelo' && playerHP>0) survivorStageStartHP=playerHP;
  gamePaused = false;
  computeBattleGemColors();
  hiddenGems={};
  boardRenderCache=null; /* nova fase = render completo do tabuleiro */
  { const ar=document.querySelector('.arena'); if(ar){ ar.classList.remove('stage-fade'); void ar.offsetWidth; ar.classList.add('stage-fade'); } }
  if(!worldRun.active && !towerMode && !bossRushMode){
    /* Rota de recuperação: começa no prólogo, jamais na última fase liberada. */
    worldRun={active:true, fase:0, nivel:1,storyMode:false};
  }
  const stageData = bossRushMode ? buildBossRushStage(bossRushIdx) : worldRun.active ? buildWorldLevel() : buildTowerStage(towerFloor);
  activeStageData = stageData;
  const clearHeading=document.querySelector('#stageClearOverlay h2');
  if(clearHeading) clearHeading.textContent=towerMode
    ? T('Andar Concluído!','Floor Cleared!','¡Piso Superado!')
    : T('Fase Concluída!','Stage Cleared!','¡Fase Superada!');
  const diffM=DIFFICULTY_MULTS[difficulty]||DIFFICULTY_MULTS.normal;
  enemies = stageData.enemies.map(e=>{
    const hp=Math.round(e.hp*diffM.hp), atk=Math.round(e.atk*diffM.atk);
    return {...e, hp, atk, maxHp:hp};
  });
  playerShield = 0; enemyDots = []; enemyStunTurns = 0; atkBuffTurns = 0; atkBuffMult = 1;
  lastEnemyAttacker = null;
  stageTookDamage = false;
  /* Summons persist through every room of the current mission. */
  damageReductionStacks = 0; queenFuryStacks = 0; chamarizCharges = 0; sombrasDevoradorasOn = false;
  cancelTempoSombrio();
  document.getElementById('sombraHud')?.remove();
  enemyBlindTurns = 0; shieldTurns = 0; reflectTurns = 0; invulnerableTurns = 0;
  lifestealCharges = 0; lifestealMult = 0; lastDragonRitual = {before:0,after:0,converted:0};
  const phaseKey=worldRun.active?`humanos-${worldRun.fase}`:(towerMode?`tower-${towerFloor}`:`stage-${idx}`);
  if(incineratePhaseKey!==phaseKey){ incinerateActive=false; incinerateStacks=0; incineratePhaseKey=phaseKey; }
  enemyVulnerableTurns = 0; enemyVulnerableMult = 1;
  stoneArmorTurns = 0;
  manualTarget = null; lastDamageDealt = 0; heroLastDamage = {}; nextAttackMult = {};
  royalShuffles = 1;
  /* Prefetch: sprites da próxima missão nunca dão pop-in */
  if(worldRun.active && worldRun.nivel<5){
    try{
      const proxKeys=WORLDS[0].fases[worldRun.fase].missoes[worldRun.nivel]||[];
      proxKeys.forEach(kk=>{ const src=HUMANOS_CARDS[kk]?.sprite||HUMANOS_ETYPES[kk]?.sprite; if(src){ const im=new Image(); im.src=src; } });
    }catch(e){}
  }
  /* Julius · Lâmina Dimensional: as sombras acumuladas ferem os inimigos desta missão */
  if((worldRun.active||towerMode||bossRushMode) && pendingDimensional.length){
    let somaPct=0;
    pendingDimensional.forEach(fila=>{ const v=fila.shift(); if(v) somaPct+=v; });
    pendingDimensional=pendingDimensional.filter(f=>f.length);
    if(somaPct>0){
      enemies.forEach(e2=>{ e2.hp=Math.max(1,e2.hp-Math.round(e2.maxHp*somaPct/100)); });
      scheduleCombat(()=>setBattleStatus(T(`⚔ As Sombras Dimensionais feriram os inimigos em ${somaPct}%!`,`⚔ The Dimensional Shadows wounded the enemies by ${somaPct}%!`,`⚔ ¡Las Sombras Dimensionales hirieron a los enemigos en un ${somaPct}%!`),'support'),900);
    }
  }
  ACTIVE.forEach(idx2=>updateHeroProgressUI(idx2));
  renderStageProgress();
  renderEnemies();
  renderGolemUnits();
  renderHarpyUnits();
  showStageObjective();
  updateBattleToolLabels();
  renderStatusTray();
  stageTurns=0; stageCollected=0;
  missionStartMs=0; missionPausedAt=0; missionPausedTotal=0; stopMissionTimer();
  /* FÁCIL: o tabuleiro (power-ups e blocos) continua da missão anterior da fase */
  const manterTabuleiro = carryBoardNext && difficulty==='facil' && worldRun.active &&
    worldRun.nivel>1 && Array.isArray(board) && board.length===SIZE;
  carryBoardNext=false;
  if(manterTabuleiro){
    if(findMatches().length>0) sanitizeBoardWithoutMatches();
    if(!hasValidMoves()) shuffleBoard(false);
    renderBoard();
  }else{
    createBoard();
    placeObstacles(stageData.obstacles);
    renderBoard();
  }
  consumeInventoryOnBattleStart();
  if(worldRun.active&&worldRun.fase===0&&worldRun.nivel===1&&!towerMode) startCoach();
  playStageMusic(stageData.scene);
  const introTitle=worldRun.active?L(stageData.title.split(' · ')[1]||stageData.title):towerMode?L(stageData.title):T(`Fase ${idx+1}`,`Stage ${idx+1}`,`Fase ${idx+1}`);
  setBattleStatus(T(`${introTitle}: combine esferas para enfrentar ${stageData.enemies.map(e=>L(e.name)).join(' e ')}.`,`${introTitle}: match spheres to face ${stageData.enemies.map(e=>L(e.name)).join(' and ')}.`,`${introTitle}: combina esferas para enfrentar a ${stageData.enemies.map(e=>L(e.name)).join(' y ')}.`));
  const qaMode=new URLSearchParams(location.search).get('qa');
  if(qaMode==='luciusritual'&&!qaRitualTriggered){
    qaRitualTriggered=true;
    const fireIdx=ACTIVE.find(i=>KINGDOMS[i].id==='fogo');
    const ritual=KINGDOMS[fireIdx]?.abilities.find(a=>a.tipo==='doubleRedOnce');
    if(ritual) scheduleCombat(()=>triggerAbility(fireIdx,ritual),80);
  }
  if(qaMode==='specialclear'&&idx===0){
    const luciusIdx=ACTIVE.find(i=>KINGDOMS[i].id==='fogo');
    const blast=KINGDOMS[luciusIdx]?.abilities.find(a=>a.tipo==='dano');
    if(blast){
      enemies.forEach(enemy=>{enemy.hp=Math.min(enemy.hp,50);});
      renderEnemies();
      heroActiveQueue[luciusIdx]=[blast];
      updateHeroProgressUI(luciusIdx);
      setBattleStatus('QA: habilidade especial pronta para validar o encerramento automático da sala.','system');
    }
  }
  if(qaMode==='activequeue'&&idx===0){
    const heroIdx=ACTIVE[0];
    heroActiveQueue[heroIdx]=KINGDOMS[heroIdx].abilities.filter(a=>a.kind==='active');
    updateHeroProgressUI(heroIdx);
    setBattleStatus('QA: três habilidades ativas acumuladas para validar o seletor.','system');
  }
  if(qaMode==='barbara'&&idx===0){
    const terraIdx=ACTIVE.find(i=>KINGDOMS[i].id==='terra');
    const summon=KINGDOMS[terraIdx]?.abilities.find(a=>a.tipo==='summonGolems');
    if(terraIdx!==undefined&&summon){
      heroActiveQueue[terraIdx]=[summon];
      updateHeroProgressUI(terraIdx);
      setBattleStatus('QA: Invocação de Golens pronta para validar a arena.','system');
    }
  }
  if(qaMode==='all-specials'&&idx===0){
    enemies.forEach(enemy=>{ enemy.hp=5000; enemy.maxHp=5000; });
    renderEnemies();
    ACTIVE.forEach(heroIdx=>{
      heroActiveQueue[heroIdx]=KINGDOMS[heroIdx].abilities.filter(a=>a.kind==='active');
      updateHeroProgressUI(heroIdx);
    });
    setBattleStatus('QA: todas as habilidades ativas carregadas para a matriz de especiais.','system');
  }
  const introRunning=maybeShowStory(idx,beginMissionField);
  if(!introRunning) beginMissionField();
  saveProgress();
}

/* A transição para o próximo andar/sala só libera efeitos persistentes quando
   a apresentação do encontro terminou. Passivas preservadas e auras prontas
   começam aqui — nunca durante o intervalo entre uma sala e outra. */
function beginMissionField(){
  if(missionFieldStarted||!activeStageData||stageTransitioning||defeatFinalized) return false;
  /* A última missão do Reino dos Humanos ganha a arena somente depois do
     prólogo: a escuridão chega, Jules recua, Cedric retorna à Rainha e Julius
     fere os três antes de Adriel iniciar a luta. */
  if(isHumanFinaleBattle()&&!humanFinalePreludeFinished){
    if(humanFinalePreviewSetup) return true;
    return triggerHumanFinalePrelude();
  }
  missionFieldStarted=true;
  setBattlePhase('idle');
  if(pendingRoomPassives.length) scheduleCombat(()=>launchPendingRoomPassives(),260);
  ACTIVE.forEach(idx2=>{
    if((heroActiveQueue[idx2]||[]).length) beginHeroConjurationLoop(idx2);
  });
  return true;
}

function randColorIndex(){
  return ACTIVE[Math.floor(gameRandom()*ACTIVE.length)];
}

function cellKey(r,c){ return `${r}_${c}`; }

function applyPowerupQAFixture(){
  if(!['127.0.0.1','localhost'].includes(location.hostname)) return false;
  const params=new URLSearchParams(location.search);
  const qa=params.get('qa');
  if(!qa) return false;
  const base=Array.from({length:SIZE},(_,r)=>Array.from({length:SIZE},(_,c)=>ACTIVE[(r*2+c)%ACTIVE.length]));
  powerUps={};
  if(qa==='luciusritual'){ board=base; return true; }
  if(qa==='match4'){
    board=base; board[0]=[ACTIVE[0],ACTIVE[0],ACTIVE[1],ACTIVE[0],ACTIVE[2],ACTIVE[3]]; board[1][2]=ACTIVE[0];
    return true;
  }
  if(qa==='match5'){
    board=base; board[0]=[ACTIVE[0],ACTIVE[0],ACTIVE[1],ACTIVE[0],ACTIVE[0],ACTIVE[2]]; board[1][2]=ACTIVE[0];
    return true;
  }
  if(qa==='powercombo'){
    board=base;
    const combo=params.get('combo')||'striped-wrapped';
    const [first,second]=combo.split('-');
    const makePower=(type,orientation='horizontal')=>type==='striped'?{type,orientation}:type==='color'?{type:'colorBomb'}:{type:'wrapped'};
    const powerA=makePower(first,'horizontal'),powerB=makePower(second,'vertical');
    powerUps[cellKey(5,0)]=powerA;
    if(powerA.type==='colorBomb') board[5][0]=-2;
    if(second!=='regular'){
      powerUps[cellKey(5,1)]=powerB;
      if(powerB.type==='colorBomb') board[5][1]=-2;
    }
    return true;
  }
  return false;
}

let lastFallInfo=null;        // v9: mapa de quedas para animar o refill
let lastActivatedPowers=[];   // v9: power-ups disparados na resolução atual
let obstaclesMeta={};         // v9.1: obstáculos do tabuleiro {r_c:{type:'ice'|'stone',hits}}
let stageTurns=0;             // v9.1: movimentos do jogador nesta fase
let stageCollected=0;         // v9.1: esferas coletadas nesta fase

/* v9.1 · Obstáculos: blocos de gelo (1 golpe) e pedra (2 golpes).
   Quebram com combinações vizinhas ou atingidos por power-ups. */
function placeObstacles(spec){
  obstaclesMeta={};
  if(!spec) return;
  const wanted=[];
  for(let i=0;i<(spec.ice||0);i++) wanted.push('ice');
  for(let i=0;i<(spec.stone||0);i++) wanted.push('stone');
  if(!wanted.length) return;
  const cells=[];
  for(let r=1;r<SIZE-1;r++) for(let c=0;c<SIZE;c++) cells.push({r,c});
  for(let i=cells.length-1;i>0;i--){
    const j=Math.floor(gameRandom()*(i+1));
    [cells[i],cells[j]]=[cells[j],cells[i]];
  }
  wanted.forEach((type,i)=>{
    const cell=cells[i]; if(!cell) return;
    board[cell.r][cell.c]=-4;
    delete powerUps[cellKey(cell.r,cell.c)];
    obstaclesMeta[cellKey(cell.r,cell.c)]={type,hits:type==='stone'?2:1};
  });
  const labels={ice:'Blocos de gelo têm 1 resistência e quebram com combinações vizinhas.',stone:'Blocos de pedra têm 2 resistências; use combinações ou power-ups ao lado deles.'};
  [...new Set(wanted)].forEach(type=>explainMechanicOnce('obstacle-'+type,labels[type]||'Obstáculo: faça combinações vizinhas para removê-lo.'));
}
function hitAdjacentObstacles(cells){
  const hitKeys=new Set();
  cells.forEach(({r,c})=>{
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr<0||nc<0||nr>=SIZE||nc>=SIZE) return;
      if(board[nr]?.[nc]===-4) hitKeys.add(cellKey(nr,nc));
    });
  });
  let broke=false;
  hitKeys.forEach(key=>{
    const meta=obstaclesMeta[key]; if(!meta) return;
    if(meta.type==='sombra') return; /* Tempo Sombrio: a corrupção é indestrutível */
    if(persistentObstaclesMode() && meta.type!=='copas') return; /* Pesadelo: obstáculos permanentes */
    meta.hits--;
    const [r,c]=key.split('_').map(Number);
    const gemEl=boardEl.querySelector(`.gem[data-r="${r}"][data-c="${c}"]`);
    if(meta.hits<=0){
      if(obstaclesMeta[key]?.type!=='sombra') delete obstaclesMeta[key];
      board[r][c]=-1;
      if(gemEl) gemEl.classList.add('matched');
      if(meta.type==='copas'){
        /* Ás de Copas estourado: 5% da vida ATUAL de dano */
        const danoCopas=Math.max(1,Math.round(playerHP*0.05));
        playerHP=Math.max(0,playerHP-danoCopas); if(danoCopas>0) stageTookDamage=true; updatePlayerHP();
        showFloatDamage(danoCopas,'playerHpAnchor',true);
        setBattleStatus(T(`❤ O Ás de Copas explodiu! Você perdeu ${danoCopas} de vida.`,`❤ The Ace of Hearts burst! You lost ${danoCopas} HP.`,`❤ ¡El As de Copas estalló! Perdiste ${danoCopas} de vida.`),'damage');
        if(playerHP<=0) scheduleCombat(()=>handlePlayerDefeat(),300);
      }
      spawnRealmParticles(meta.type==='ice'?'gelo':'terra',gemEl||boardEl,7);
      broke=true;
    } else if(gemEl){
      const block=gemEl.querySelector('.obstacle-block');
      if(block){ block.classList.remove('ob-strong'); block.classList.add('ob-cracked'); }
    }
  });
  if(broke){ sfxHit(); setBattleStatus(T('Bloco destruído! O caminho está mais livre.','Block destroyed! The path is clearer.','¡Bloque destruido! El camino está más libre.'),'support'); }
}

/* v9.1 · Objetivos variados por fase */
function currentObjective(){ return activeStageData?.objective||null; }
function checkStageObjective(){
  const obj=currentObjective();
  if(!obj) return false;
  if(obj.type==='survive'&&stageTurns>=obj.turns&&playerHP>0){
    setBattleStatus(T('Objetivo cumprido: o grupo sobreviveu à investida!','Objective complete: the party survived the onslaught!','¡Objetivo cumplido: el grupo sobrevivió a la embestida!'),'support');
    onStageCleared();
    return true;
  }
  if(obj.type==='collect'&&stageCollected>=obj.count){
    setBattleStatus(T('Objetivo cumprido: esferas suficientes coletadas!','Objective complete: enough spheres collected!','¡Objetivo cumplido: esferas suficientes recogidas!'),'support');
    onStageCleared();
    return true;
  }
  if(obj.type==='moves'&&stageTurns>obj.limit&&!allEnemiesDefeated()){
    finalizeDefeat();
    return true;
  }
  return false;
}

/* v9.1 · Idioma da interface (PT/EN/ES). Conteúdo dos heróis permanece PT nesta versão. */
const VALID_LANGS=['pt','en','es'];
let lang=VALID_LANGS.includes(localStorage.getItem('12r_lang'))?localStorage.getItem('12r_lang'):'pt';
function T(pt,en,es){ return lang==='en'?en:lang==='es'?(es||en):pt; }
const I18N_DICT={"Reino da Luz":["Realm of Light","Reino de la Luz"],"Reino dos Humanos":["Realm of Humans","Reino de los Humanos"],"Reino da Água":["Realm of Water","Reino del Agua"],"Reino do Fogo":["Realm of Fire","Reino del Fuego"],"Reino da Natureza":["Realm of Nature","Reino de la Naturaleza"],"Reino da Terra":["Realm of Earth","Reino de la Tierra"],"Reino da Areia":["Realm of Sand","Reino de la Arena"],"Reino das Sombras":["Realm of Shadows","Reino de las Sombras"],"Reino do Raio":["Realm of Lightning","Reino del Rayo"],"Reino do Vento":["Realm of Wind","Reino del Viento"],"Reino das Chuvas":["Realm of Rains","Reino de las Lluvias"],"Reino do Gelo":["Realm of Ice","Reino del Hielo"],"DIVINA":["DIVINE","DIVINA"],"NORMAL":["NORMAL","NORMAL"],"RARO":["RARE","RARO"],"Berenice das Sombras":["Shadow Berenice","Berenice de las Sombras"],"VERSÃO 9.1":["VERSION 9.1","VERSIÓN 9.1"],"A Luz Divina de Ygdria · Rainha Maga":["The Divine Light of Ygdria · Mage Queen","La Luz Divina de Ygdria · Reina Maga"],"A Maga da Eternidade · Rainha Maga":["The Mage of Eternity · Mage Queen","La Maga de la Eternidad · Reina Maga"],"Soberana dos Mares · Rainha Maga":["Sovereign of the Seas · Mage Queen","Soberana de los Mares · Reina Maga"],"O Sucessor do Dragão de Ignis · Rei Mago":["The Successor of the Dragon of Ignis · Mage King","El Sucesor del Dragón de Ignis · Rey Mago"],"A Guardiã de Toda a Natureza · Rainha Maga":["The Guardian of All Nature · Mage Queen","La Guardiana de Toda la Naturaleza · Reina Maga"],"A Maga Mais Forte · Rainha Maga":["The Strongest Mage · Mage Queen","La Maga Más Fuerte · Reina Maga"],"A Flor Dançante do Oásis de Meriady · Rainha Maga":["The Dancing Flower of the Oasis of Meriady · Mage Queen","La Flor Danzante del Oasis de Meriady · Reina Maga"],"A Soberana das Sombras Eternas · Rainha Maga":["The Sovereign of the Eternal Shadows · Mage Queen","La Soberana de las Sombras Eternas · Reina Maga"],"Senhor dos Trovões e da Destruição · Rei Mago":["Lord of Thunder and Destruction · Mage King","Señor de los Truenos y la Destrucción · Rey Mago"],"A Rainha Harpia · Rainha Maga":["The Harpy Queen · Mage Queen","La Reina Arpía · Reina Maga"],"Senhor das Chuvas Torrenciais · Rei Mago":["Lord of the Torrential Rains · Mage King","Señor de las Lluvias Torrenciales · Rey Mago"],"O Abominável Rei das Neves · Rei Mago":["The Abominable Snow King · Mage King","El Abominable Rey de las Nieves · Rey Mago"],"Sentinela da Capital · Soldado":["Sentinel of the Capital · Soldier","Centinela de la Capital · Soldado"],"O Mago Nobre · Mago":["The Noble Mage · Mage","El Mago Noble · Mago"],"Olhos da Coroa · Arqueira":["Eyes of the Crown · Archer","Ojos de la Corona · Arquera"],"Escudo Real de Bernyce · Cavaleiro":["Royal Shield of Bernyce · Knight","Escudo Real de Bernyce · Caballero"],"Toda grande vitória começa com um simples soldado.":["Every great victory begins with a simple soldier.","Toda gran victoria comienza con un simple soldado."],"Cada feitiço escrito hoje será uma lenda amanhã.":["Every spell written today will be a legend tomorrow.","Cada hechizo escrito hoy será una leyenda mañana."],"Nenhum inimigo escapa do olhar da Coroa.":["No enemy escapes the gaze of the Crown.","Ningún enemigo escapa a la mirada de la Corona."],"Minha Lança protege o reino antes da minha própria vida.":["My Lance protects the realm before my own life.","Mi Lanza protege el reino antes que mi propia vida."],"Fulgor Ofuscante":["Blinding Radiance","Fulgor Cegador"],"A cada 4 turnos, a luz ofusca e embaralha todo o tabuleiro.":["Every 4 turns, the light dazzles and shuffles the entire board.","Cada 4 turnos, la luz deslumbra y baraja todo el tablero."],"Decreto da Coroa":["Crown Decree","Decreto de la Corona"],"A cada 4 turnos, todos os heróis perdem 6 de energia e ela recupera 5× o total drenado.":["Every 4 turns, all heroes lose 6 energy and she heals 5x the total drained.","Cada 4 turnos, todos los héroes pierden 6 de energía y ella recupera 5× el total drenado."],"Maré Vazante":["Ebb Tide","Marea Menguante"],"A cada 4 turnos, uma coluna inteira é lavada e re-preenchida sem conceder energia.":["Every 4 turns, an entire column is washed away and refilled without granting energy.","Cada 4 turnos, una columna entera es arrastrada y rellenada sin otorgar energía."],"Sopro de Brasas":["Ember Breath","Aliento de Brasas"],"A cada 4 turnos, queima uma cruz de 5 células; power-ups atingidos são destruídos.":["Every 4 turns, burns a cross of 5 cells; power-ups caught in it are destroyed.","Cada 4 turnos, quema una cruz de 5 celdas; los potenciadores alcanzados son destruidos."],"Raízes Famintas":["Hungry Roots","Raíces Hambrientas"],"A cada 4 turnos, raízes prendem 2 esferas do tabuleiro.":["Every 4 turns, roots trap 2 orbs on the board.","Cada 4 turnos, las raíces atrapan 2 esferas del tablero."],"Abalo Sísmico":["Seismic Shock","Sacudida Sísmica"],"A cada 4 turnos, duas linhas do tabuleiro são sacudidas e embaralhadas.":["Every 4 turns, two rows of the board are shaken and shuffled.","Cada 4 turnos, dos filas del tablero son sacudidas y barajadas."],"Miragem de Meriady":["Mirage of Meriady","Espejismo de Meriady"],"A cada 4 turnos, a areia cobre 3 esferas do tabuleiro.":["Every 4 turns, sand covers 3 orbs on the board.","Cada 4 turnos, la arena cubre 3 esferas del tablero."],"Véu do Eclipse":["Veil of the Eclipse","Velo del Eclipse"],"A cada 4 turnos, 5 esferas têm a cor oculta por 3 turnos.":["Every 4 turns, 5 orbs have their color hidden for 3 turns.","Cada 4 turnos, 5 esferas tienen su color oculto por 3 turnos."],"Curto-Circuito":["Short Circuit","Cortocircuito"],"A cada 4 turnos, o herói mais carregado perde toda energia acima de 50.":["Every 4 turns, the most charged hero loses all energy above 50.","Cada 4 turnos, el héroe más cargado pierde toda la energía por encima de 50."],"Rajada de Lafesia":["Gust of Lafesia","Ráfaga de Lafesia"],"A cada 4 turnos, uma linha desliza em círculo e power-ups na linha são levados pelo vento.":["Every 4 turns, a row slides in a loop and power-ups on it are swept away by the wind.","Cada 4 turnos, una fila se desliza en círculo y los potenciadores en ella son llevados por el viento."],"Manto de Chuva":["Rain Cloak","Manto de Lluvia"],"A cada 4 turnos, encharca as armas: o próximo ataque de cada herói causa metade do dano.":["Every 4 turns, soaks the weapons: each hero's next attack deals half damage.","Cada 4 turnos, empapa las armas: el próximo ataque de cada héroe causa la mitad del daño."],"Nevasca de Artyka":["Blizzard of Artyka","Ventisca de Artyka"],"A cada 4 turnos, congela 3 esferas — uma delas com gelo reforçado.":["Every 4 turns, freezes 3 orbs — one of them with reinforced ice.","Cada 4 turnos, congela 3 esferas — una de ellas con hielo reforzado."],"Troca de Guarda":["Changing of the Guard","Cambio de Guardia"],"A cada 6 turnos, 3 esferas aleatórias trocam de cor.":["Every 6 turns, 3 random orbs change color.","Cada 6 turnos, 3 esferas aleatorias cambian de color."],"Selo Arcano":["Arcane Seal","Sello Arcano"],"A cada 5 turnos, sela 1 power-up do tabuleiro; sem power-up, recupera 60 de vida.":["Every 5 turns, seals 1 power-up on the board; with no power-up, restores 60 HP.","Cada 5 turnos, sella 1 potenciador del tablero; si no hay potenciador, recupera 60 de vida."],"Flecha Certeira":["Deadeye Arrow","Flecha Certera"],"A cada 5 turnos, o herói mais carregado perde 12 de energia.":["Every 5 turns, the most charged hero loses 12 energy.","Cada 5 turnos, el héroe más cargado pierde 12 de energía."],"Bastião de Lanças":["Bastion of Lances","Bastión de Lanzas"],"A cada 5 turnos, finca um bloqueio de pedra no tabuleiro.":["Every 5 turns, plants a stone blocker on the board.","Cada 5 turnos, clava un bloqueo de piedra en el tablero."],"Corte de Luz":["Light Slash","Corte de Luz"],"Dobra o dano do próximo ataque de Galatéia.":["Doubles the damage of Galatéia's next attack.","Duplica el daño del próximo ataque de Galatéia."],"Luz da Proteção":["Light of Protection","Luz de la Protección"],"Cega todos os inimigos por uma rodada; o próximo ataque erra.":["Blinds all enemies for one round; their next attack misses.","Ciega a todos los enemigos por una ronda; el próximo ataque falla."],"Cura Divina":["Divine Heal","Curación Divina"],"Recupera 20% da vida máxima do grupo.":["Restores 20% of the party's max HP.","Recupera el 20% de la vida máxima del grupo."],"Explosão de Luz":["Light Burst","Explosión de Luz"],"Atinge todos os inimigos com três vezes o último ataque.":["Hits all enemies with three times the last attack.","Golpea a todos los enemigos con tres veces el último ataque."],"Luz Divina de Ygdria":["Divine Light of Ygdria","Luz Divina de Ygdria"],"Recupera 30% da vida máxima do grupo.":["Restores 30% of the party's max HP.","Recupera el 30% de la vida máxima del grupo."],"Por Toda a Luz do Universo":["By All the Light of the Universe","Por Toda la Luz del Universo"],"Atinge todos os inimigos com o dobro da soma dos últimos ataques do grupo.":["Hits all enemies with double the sum of the party's last attacks.","Golpea a todos los enemigos con el doble de la suma de los últimos ataques del grupo."],"Coração Piedoso":["Merciful Heart","Corazón Piadoso"],"Ergue um escudo de vida por dois turnos.":["Raises a life shield for two turns.","Levanta un escudo de vida por dos turnos."],"Coração Puro":["Pure Heart","Corazón Puro"],"O dano do último ataque ecoa em todos os inimigos.":["The damage of the last attack echoes across all enemies.","El daño del último ataque resuena en todos los enemigos."],"Milagre":["Miracle","Milagro"],"Ataque das Fronteiras do Universo":["Attack from the Borders of the Universe","Ataque de las Fronteras del Universo"],"Desfere um dano crítico igual a cinco vezes o ataque base.":["Deals critical damage equal to five times the base attack.","Asesta un daño crítico igual a cinco veces el ataque base."],"Sempre Comigo":["Always With Me","Siempre Conmigo"],"Carrega as três habilidades ativas de todos os aliados.":["Charges the three active abilities of all allies.","Carga las tres habilidades activas de todos los aliados."],"Por Toda Eternidade":["For All Eternity","Por Toda la Eternidad"],"Os próximos três ataques curam cinco vezes o valor de ataque.":["The next three attacks heal five times the attack value.","Los próximos tres ataques curan cinco veces el valor de ataque."],"Corais Explosivos":["Explosive Corals","Corales Explosivos"],"Atinge um oponente com duas vezes o último ataque.":["Hits one opponent with twice the last attack.","Golpea a un oponente con dos veces el último ataque."],"Armadura de Corais":["Coral Armor","Armadura de Corales"],"Protege o grupo e devolve o dano ao inimigo por um turno.":["Protects the party and returns damage to the enemy for one turn.","Protege al grupo y devuelve el daño al enemigo por un turno."],"Cardumes Invasores":["Invading Shoals","Cardúmenes Invasores"],"Impede que o grupo sofra dano por dois turnos.":["Prevents the party from taking damage for two turns.","Impide que el grupo sufra daño por dos turnos."],"Concha Impenetrável":["Impenetrable Shell","Concha Impenetrable"],"Ergue um escudo resistente durante três turnos.":["Raises a sturdy shield for three turns.","Levanta un escudo resistente durante tres turnos."],"Abertura dos Portões de Atlantis":["Opening of the Gates of Atlantis","Apertura de las Puertas de Atlantis"],"Atinge todos os inimigos com três vezes o último combo.":["Hits all enemies with three times the last combo.","Golpea a todos los enemigos con tres veces el último combo."],"Garras do Dragão":["Dragon Claws","Garras del Dragón"],"Inflige duas vezes o dano do último ataque de Lucius.":["Deals twice the damage of Lucius's last attack.","Inflige dos veces el daño del último ataque de Lucius."],"Renascido das Chamas":["Reborn from the Flames","Renacido de las Llamas"],"Recupera 10% da vida máxima do grupo.":["Restores 10% of the party's max HP.","Recupera el 10% de la vida máxima del grupo."],"Chuva de Lava":["Lava Rain","Lluvia de Lava"],"Uma chuva vulcânica causa 100 de dano em cada inimigo.":["A volcanic rain deals 100 damage to each enemy.","Una lluvia volcánica causa 100 de daño a cada enemigo."],"Ritual do Dragão":["Dragon Ritual","Ritual del Dragón"],"Dobra uma única vez a quantidade atual de pedras vermelhas, preservando power-ups.":["Doubles the current number of red gems a single time, preserving power-ups.","Duplica una sola vez la cantidad actual de gemas rojas, conservando los potenciadores."],"Explosão de Fogo do Dragão":["Dragon Fire Burst","Explosión de Fuego del Dragón"],"Explode o alvo com 500 de dano direto.":["Blasts the target with 500 direct damage.","Hace estallar al objetivo con 500 de daño directo."],"Armadura de Fogo Eterna":["Eternal Fire Armor","Armadura de Fuego Eterna"],"Até o fim da fase, cada ataque acumula Incinerar e causa dano crescente ao longo do tempo.":["Until the end of the stage, each attack stacks Incinerate and deals increasing damage over time.","Hasta el final de la fase, cada ataque acumula Incinerar y causa daño creciente con el tiempo."],"Benção":["Blessing","Bendición"],"Adiciona 10 pontos ao contador de energia de todos os aliados.":["Adds 10 points to every ally's energy counter.","Añade 10 puntos al contador de energía de todos los aliados."],"Escudo de Folhas":["Leaf Shield","Escudo de Hojas"],"Protege o grupo contra o próximo ataque.":["Protects the party against the next attack.","Protege al grupo contra el próximo ataque."],"Vinhas Mortais":["Deadly Vines","Enredaderas Mortales"],"Prende o inimigo por três turnos e causa duas vezes o dano do último ataque.":["Traps the enemy for three turns and deals twice the damage of the last attack.","Atrapa al enemigo por tres turnos y causa dos veces el daño del último ataque."],"Natureza Morta":["Still Life","Naturaleza Muerta"],"Adiciona três power-ups aleatórios ao tabuleiro.":["Adds three random power-ups to the board.","Añade tres potenciadores aleatorios al tablero."],"Espírito da Natureza":["Spirit of Nature","Espíritu de la Naturaleza"],"Cada joia verde no tabuleiro recupera 100 de HP.":["Each green gem on the board restores 100 HP.","Cada gema verde en el tablero recupera 100 de vida."],"Unidade da Natureza":["Unity of Nature","Unidad de la Naturaleza"],"Cada joia verde no tabuleiro adiciona 100 de dano ao ataque.":["Each green gem on the board adds 100 damage to the attack.","Cada gema verde en el tablero añade 100 de daño al ataque."],"Golpe da Clava":["Club Smash","Golpe de Maza"],"Atinge o inimigo com duas vezes o último ataque e o atordoa por dois turnos.":["Hits the enemy with twice the last attack and stuns it for two turns.","Golpea al enemigo con dos veces el último ataque y lo aturde por dos turnos."],"Armadura de Pedra":["Stone Armor","Armadura de Piedra"],"Reduz o dano recebido e devolve parte dele durante dois turnos.":["Reduces damage taken and returns part of it for two turns.","Reduce el daño recibido y devuelve parte de él durante dos turnos."],"Terremoto Destruidor":["Devastating Earthquake","Terremoto Destructor"],"Causa 100 de dano em todos e reduz a defesa inimiga.":["Deals 100 damage to all and lowers enemy defense.","Causa 100 de daño a todos y reduce la defensa enemiga."],"Invocação de Golens":["Golem Summoning","Invocación de Gólems"],"Invoca dois golens; cada um replica metade do dano de Kallendra até o fim da missão.":["Summons two golems; each replicates half of Kallendra's damage until the end of the mission.","Invoca dos gólems; cada uno replica la mitad del daño de Kallendra hasta el final de la misión."],"Força Terra":["Earth Force","Fuerza Tierra"],"Atinge todos os inimigos com 300 de dano.":["Hits all enemies with 300 damage.","Golpea a todos los enemigos con 300 de daño."],"Terra Viva":["Living Earth","Tierra Viva"],"Sacrifica dois golens para infligir 1000 de dano ao alvo.":["Sacrifices two golems to inflict 1000 damage on the target.","Sacrifica dos gólems para infligir 1000 de daño al objetivo."],"Tempestade de Areia":["Sandstorm","Tormenta de Arena"],"Anula a visão dos inimigos, fazendo os ataques errarem neste turno.":["Blots out the enemies' vision, making their attacks miss this turn.","Anula la visión de los enemigos, haciendo que sus ataques fallen este turno."],"Lâmina Dançante":["Dancing Blade","Hoja Danzante"],"Atinge um inimigo com 300 de dano.":["Hits one enemy with 300 damage.","Golpea a un enemigo con 300 de daño."],"Pirâmide de Meriady":["Pyramid of Meriady","Pirámide de Meriady"],"Adiciona um escudo por uma rodada.":["Adds a shield for one round.","Añade un escudo por una ronda."],"Oásis no Deserto":["Oasis in the Desert","Oasis en el Desierto"],"Recupera 600 de vida.":["Restores 600 HP.","Recupera 600 de vida."],"Enigma da Esfinge":["Riddle of the Sphinx","Enigma de la Esfinge"],"Com vários inimigos, o mais fraco perde metade da vida; sozinho, recebe 500 de dano.":["With several enemies, the weakest loses half its HP; if alone, it takes 500 damage.","Con varios enemigos, el más débil pierde la mitad de su vida; si está solo, recibe 500 de daño."],"Dança das Mil Lâminas":["Dance of a Thousand Blades","Danza de las Mil Hojas"],"Atinge todos os inimigos com 70 de dano para cada peça amarela no tabuleiro.":["Hits all enemies with 70 damage for each yellow piece on the board.","Golpea a todos los enemigos con 70 de daño por cada pieza amarilla en el tablero."],"Coração Impiedoso":["Merciless Heart","Corazón Despiadado"],"Cria um campo que dobra o dano recebido pelo inimigo por um turno.":["Creates a field that doubles the damage the enemy takes for one turn.","Crea un campo que duplica el daño que recibe el enemigo por un turno."],"Coração Impuro":["Impure Heart","Corazón Impuro"],"Todo o dano recebido volta ao inimigo durante dois turnos.":["All damage taken returns to the enemy for two turns.","Todo el daño recibido vuelve al enemigo durante dos turnos."],"Maldição":["Curse","Maldición"],"Retira 10% da vida do alvo inimigo que atacou no último turno.":["Drains 10% of the HP of the enemy that attacked last turn.","Quita el 10% de la vida del enemigo que atacó en el último turno."],"Sombra do Universo":["Shadow of the Universe","Sombra del Universo"],"Desfere em todos os inimigos um crítico devastador de doze vezes o ataque base.":["Unleashes on all enemies a devastating critical of twelve times the base attack.","Asesta a todos los enemigos un crítico devastador de doce veces el ataque base."],"Todas as Sombras Venham a Mim":["All Shadows Come to Me","Que Todas las Sombras Vengan a Mí"],"Dobra uma única vez o número atual de blocos das sombras.":["Doubles the current number of shadow blocks a single time.","Duplica una sola vez el número actual de bloques de las sombras."],"Por Toda a Escuridão":["By All the Darkness","Por Toda la Oscuridad"],"Multiplica o próximo ataque pelo total de blocos das sombras no tabuleiro.":["Multiplies the next attack by the total shadow blocks on the board.","Multiplica el próximo ataque por el total de bloques de las sombras en el tablero."],"Ataque de Raios":["Lightning Strike","Ataque de Rayos"],"Um raio cai no inimigo infligindo 100 de dano.":["A lightning bolt strikes the enemy, dealing 100 damage.","Un rayo cae sobre el enemigo infligiendo 100 de daño."],"Estrondo":["Thunderclap","Estruendo"],"Atordoa todos os inimigos por 1 turno.":["Stuns all enemies for 1 turn.","Aturde a todos los enemigos por 1 turno."],"Campo Magnético":["Magnetic Field","Campo Magnético"],"Coloca um escudo magnético e devolve os ataques recebidos por 3 turnos.":["Deploys a magnetic shield and returns incoming attacks for 3 turns.","Coloca un escudo magnético y devuelve los ataques recibidos por 3 turnos."],"Full Power":["Full Power","Full Power"],"Adiciona 3 esferas de energia ao redor dele; cada esfera dobra seu ataque. Cada uma dura 1 turno.":["Adds 3 energy orbs around him; each orb doubles his attack. Each lasts 1 turn.","Añade 3 esferas de energía a su alrededor; cada esfera duplica su ataque. Cada una dura 1 turno."],"Trovão Fulminante":["Fulminating Thunder","Trueno Fulminante"],"Atinge o inimigo com um raio infligindo 1000 de dano.":["Strikes the enemy with a bolt dealing 1000 damage.","Golpea al enemigo con un rayo infligiendo 1000 de daño."],"Hecatombe":["Hecatomb","Hecatombe"],"Atinge todos os inimigos com 150 de dano para cada peça roxa no tabuleiro e inflige os efeitos de atordoar e eletrocutar.":["Hits all enemies with 150 damage for each purple piece on the board and inflicts stun and electrocute effects.","Golpea a todos los enemigos con 150 de daño por cada pieza morada en el tablero e inflige los efectos de aturdir y electrocutar."],"Furacão":["Hurricane","Huracán"],"Atinge todos os inimigos com 100 de dano.":["Hits all enemies with 100 damage.","Golpea a todos los enemigos con 100 de daño."],"Barreira de Vento":["Wind Barrier","Barrera de Viento"],"Impede os danos por 2 turnos.":["Blocks damage for 2 turns.","Impide el daño por 2 turnos."],"Garras Afiadas":["Sharpened Claws","Garras Afiladas"],"Atinge o inimigo com um dano extra do dobro do ataque.":["Hits the enemy with extra damage of double the attack.","Golpea al enemigo con un daño extra del doble del ataque."],"Furacão Destruidor":["Devastating Hurricane","Huracán Destructor"],"Fúria dos Céus":["Fury of the Skies","Furia de los Cielos"],"2 Harpias se unem a ela, cada uma atacando com 20% do dano.":["2 Harpies join her, each attacking with 20% of her damage.","2 Arpías se unen a ella, cada una atacando con el 20% del daño."],"Fúria Suprema dos Céus":["Supreme Fury of the Skies","Furia Suprema de los Cielos"],"Mais 3 Harpias se unem a ela, cada uma atacando com 20% do dano, totalizando 5.":["3 more Harpies join her, each attacking with 20% of her damage, for a total of 5.","3 Arpías más se unen a ella, cada una atacando con el 20% del daño, para un total de 5."],"Chuva Leve":["Light Rain","Lluvia Ligera"],"Atinge todos os inimigos com 30 de dano em todos os turnos. Dura até eles morrerem.":["Hits all enemies with 30 damage every turn. Lasts until they die.","Golpea a todos los enemigos con 30 de daño en todos los turnos. Dura hasta que mueran."],"Aprendendo Conceitos Volume I":["Learning Concepts Volume I","Aprendiendo Conceptos Volumen I"],"Usa o seu livro para criar 3 power-ups seus.":["Uses his book to create 3 of his power-ups.","Usa su libro para crear 3 potenciadores suyos."],"Visão Comprometida":["Impaired Vision","Visión Comprometida"],"Faz os inimigos errarem o ataque por 3 turnos.":["Makes enemies miss their attacks for 3 turns.","Hace que los enemigos fallen sus ataques por 3 turnos."],"Aprendendo Conceitos Volume II":["Learning Concepts Volume II","Aprendiendo Conceptos Volumen II"],"Usa o seu livro para criar 3 power-ups máximos.":["Uses his book to create 3 maximum power-ups.","Usa su libro para crear 3 potenciadores máximos."],"Chuva Ácida":["Acid Rain","Lluvia Ácida"],"Dá 300 de dano no inimigo, e 30 de dano em todos os turnos.":["Deals 300 damage to the enemy, plus 30 damage every turn.","Causa 300 de daño al enemigo, y 30 de daño en todos los turnos."],"Chuva Torrencial":["Torrential Rain","Lluvia Torrencial"],"Atinge todos os inimigos com 100 de dano em todos os turnos. Dura até eles morrerem.":["Hits all enemies with 100 damage every turn. Lasts until they die.","Golpea a todos los enemigos con 100 de daño en todos los turnos. Dura hasta que mueran."],"Machado de Gelo":["Ice Axe","Hacha de Hielo"],"Inflige 300 de dano no inimigo e 150 em área.":["Deals 300 damage to the enemy and 150 area damage.","Inflige 300 de daño al enemigo y 150 en área."],"Bola de Neve":["Snowball","Bola de Nieve"],"Atordoa o inimigo pela quantidade de turnos equivalente a 1/4 das pedras cinza claras no tabuleiro.":["Stuns the enemy for a number of turns equal to 1/4 of the light gray gems on the board.","Aturde al enemigo por una cantidad de turnos equivalente a 1/4 de las gemas gris claro en el tablero."],"Aurora Austral":["Southern Aurora","Aurora Austral"],"Recupera 500 de vida.":["Restores 500 HP.","Recupera 500 de vida."],"Aurora Boreal":["Northern Lights","Aurora Boreal"],"Inflige 500 de dano no inimigo.":["Deals 500 damage to the enemy.","Inflige 500 de daño al enemigo."],"Geada Branca":["White Frost","Escarcha Blanca"],"Dá 100 de dano em cada inimigo + 20 por cada peça cinza clara no tabuleiro e congela eles por 1 turno.":["Deals 100 damage to each enemy + 20 per light gray piece on the board and freezes them for 1 turn.","Causa 100 de daño a cada enemigo + 20 por cada pieza gris claro en el tablero y los congela por 1 turno."],"Morte Congelada":["Frozen Death","Muerte Congelada"],"Congela totalmente o inimigo por 5 turnos e reduz a vida dele pela metade da atual.":["Fully freezes the enemy for 5 turns and cuts its current HP in half.","Congela totalmente al enemigo por 5 turnos y reduce su vida a la mitad de la actual."],"Benção das Flores de Cerejeira":["Blessing of the Cherry Blossoms","Bendición de las Flores de Cerezo"],"Recupera 100 de vida todas as vezes que for acionada (25%, 50%, 75%, 100%).":["Restores 100 HP every time it triggers (25%, 50%, 75%, 100%).","Recupera 100 de vida cada vez que se activa (25%, 50%, 75%, 100%)."],"Flechas das Flores de Cerejeira":["Arrows of the Cherry Blossoms","Flechas de las Flores de Cerezo"],"Atinge todos os inimigos infligindo o dano do último ataque (25%, 50%, 75%, 100%).":["Hits all enemies dealing the damage of the last attack (25%, 50%, 75%, 100%).","Golpea a todos los enemigos infligiendo el daño del último ataque (25%, 50%, 75%, 100%)."],"Lança das Flores de Cerejeira":["Lance of the Cherry Blossoms","Lanza de las Flores de Cerezo"],"Atinge o inimigo infligindo 3× o dano do último ataque (25%, 50%, 75%, 100%).":["Hits the enemy dealing 3× the damage of the last attack (25%, 50%, 75%, 100%).","Golpea al enemigo infligiendo 3× el daño del último ataque (25%, 50%, 75%, 100%)."],"Clássica":["Classic","Clásica"],"Falange":["Phalanx","Falange"],"Muralha":["Wall","Muralla"],"Coluna Diagonal":["Diagonal Column","Columna Diagonal"],"Ponta de Lança":["Spearhead","Punta de Lanza"],"Escudo":["Shield","Escudo"],"Escolta Real":["Royal Escort","Escolta Real"],"Emboscada":["Ambush","Emboscada"],"Ala Esquerda":["Left Wing","Ala Izquierda"],"Ala Direita":["Right Wing","Ala Derecha"],"Losango":["Diamond","Rombo"],"Estrela do Caos":["Chaos Star","Estrella del Caos"],"Primeira Vitória":["First Victory","Primera Victoria"],"Vença uma fase.":["Win a stage.","Gana una fase."],"Intocável":["Untouchable","Intocable"],"Vença uma fase sem sofrer dano.":["Win a stage without taking damage.","Gana una fase sin recibir daño."],"Mestre do Combo":["Combo Master","Maestro del Combo"],"Alcance um combo ×8.":["Reach an x8 combo.","Alcanza un combo ×8."],"Artífice":["Artificer","Artífice"],"Crie 10 power-ups em uma run.":["Craft 10 power-ups in one run.","Crea 10 potenciadores en una partida."],"Regulador de Ygdria":["Regulator of Ygdria","Regulador de Ygdria"],"Conquiste as 10 fases do Reino dos Humanos.":["Conquer all 10 stages of the Realm of Humans.","Conquista las 10 fases del Reino de los Humanos."],"Perfeccionista":["Perfectionist","Perfeccionista"],"Conquiste 3 estrelas em 5 fases.":["Earn 3 stars on 5 stages.","Consigue 3 estrellas en 5 fases."],"Escalador":["Climber","Escalador"],"Supere o andar 5 da Torre Infinita.":["Clear floor 5 of the Infinite Tower.","Supera el piso 5 de la Torre Infinita."],"Lenda da Torre":["Tower Legend","Leyenda de la Torre"],"Supere o andar 10 da Torre Infinita.":["Clear floor 10 of the Infinite Tower.","Supera el piso 10 de la Torre Infinita."],"Corte Sombria":["Dark Court","Corte Sombría"],"Vença uma fase com Berenice das Sombras e Mardogear juntos.":["Win a stage with Shadow Berenice and Mardogear together.","Gana una fase con Berenice de las Sombras y Mardogear juntos."],"Tesouro Real":["Royal Treasure","Tesoro Real"],"Acumule 500 moedas.":["Hoard 500 coins.","Acumula 500 monedas."],"Ritual Diário":["Daily Ritual","Ritual Diario"],"Conclua um Desafio Diário.":["Complete a Daily Challenge.","Completa un Desafío Diario."],"Veterano":["Veteran","Veterano"],"Alcance o nível de perfil 5.":["Reach profile level 5.","Alcanza el nivel de perfil 5."],"Embaralhamento Extra":["Extra Shuffle","Barajado Extra"],"+1 embaralhamento real na próxima batalha.":["+1 royal shuffle in your next battle.","+1 barajado real en tu próxima batalla."],"Poção Vital":["Vital Potion","Poción Vital"],"Recupera 600 de HP no início da próxima batalha.":["Restores 600 HP at the start of your next battle.","Restaura 600 de vida al inicio de tu próxima batalla."],"Bênção dos Reinos":["Realm Blessing","Bendición de los Reinos"],"Comece a próxima batalha com 2 power-ups no tabuleiro.":["Start your next battle with 2 power-ups on the board.","Comienza tu próxima batalla con 2 potenciadores en el tablero."],"Dano contínuo":["Damage over time","Daño continuo"],"gelo":["ice","hielo"],"pedra":["stone","piedra"],"areia":["sand","arena"],"vinhas":["vines","enredaderas"],"O pântano sussurra... sinto presenças famintas rondando o Portão.":["The swamp whispers... I sense hungry presences circling the Gate.","El pantano susurra... siento presencias hambrientas rondando el Portal."],"Que venham! O fogo de Ignis abrirá alas para todos nós.":["Let them come! The fire of Ignis will clear the way for us all.","¡Que vengan! El fuego de Ignis abrirá camino para todos nosotros."],"Estas pedras guardam memória. A Sentinela desperta — pisem leve.":["These stones hold memory. The Sentinel awakens — tread lightly.","Estas piedras guardan memoria. La Centinela despierta — pisen con cuidado."],"A floresta esconde olhos entre as copas. Fiquem próximos de mim.":["The forest hides eyes among the treetops. Stay close to me.","El bosque esconde ojos entre las copas. Manténganse cerca de mí."],"O tempo pesa neste corredor... os espectros odeiam os vivos.":["Time weighs heavy in this corridor... the specters hate the living.","El tiempo pesa en este pasillo... los espectros odian a los vivos."],"O Trono está além destas chamas. O Dragão Carmesim nos aguarda!":["The Throne lies beyond these flames. The Crimson Dragon awaits us!","El Trono está más allá de estas llamas. ¡El Dragón Carmesí nos espera!"],"Dragões também sangram. Deixem a escuridão ir à frente.":["Dragons bleed too. Let the darkness lead the way.","Los dragones también sangran. Dejen que la oscuridad vaya al frente."],"Minha terra natal... as dunas dançam comigo. Colham as esferas que o vento trouxer.":["My homeland... the dunes dance with me. Gather the spheres the wind brings.","Mi tierra natal... las dunas bailan conmigo. Recojan las esferas que traiga el viento."],"Este abismo me pertence. Sobrevivam ao que vem — eu cuido do resto.":["This abyss belongs to me. Survive what is coming — I will handle the rest.","Este abismo me pertenece. Sobrevivan a lo que viene — yo me encargo del resto."],"Um trono sombrio? Que o céu ruja: a HECATOMBE espera por eles.":["A dark throne? Let the sky roar: the HECATOMB awaits them.","¿Un trono sombrío? Que el cielo ruja: la HECATOMBE los espera."],"E quando o trovão passar... apenas o gelo permanecerá.":["And when the thunder passes... only the ice will remain.","Y cuando pase el trueno... solo el hielo permanecerá."],"Poção Vital (+600 HP)":["Vital Potion (+600 HP)","Poción Vital (+600 HP)"],"Bomba de Cor":["Color Bomb","Bomba de Color"],"Embrulhado":["Wrapped","Envuelto"],"Listrado":["Striped","Rayado"],"Chuva":["Rain","Lluvia"],"Eletrocutado":["Electrocuted","Electrocutado"],"Incinerar":["Incinerate","Incinerar"],"Slime de Cerejeira":["Cherry Blossom Slime","Slime de Cerezo"],"Lobo Raivoso":["Rabid Wolf","Lobo Rabioso"],"Soldado 1":["Soldier 1","Soldado 1"],"Soldado 2":["Soldier 2","Soldado 2"],"Capitão dos Soldados":["Captain of the Soldiers","Capitán de los Soldados"],"Vulto Sombrio":["Dark Shade","Sombra Oscura"],"Espectro Sombrio":["Dark Specter","Espectro Sombrío"],"Cavaleiro Morto-Vivo":["Undead Knight","Caballero No Muerto"],"Soldado da Biblioteca 1":["Library Soldier 1","Soldado de la Biblioteca 1"],"Soldado da Biblioteca 2":["Library Soldier 2","Soldado de la Biblioteca 2"],"Soldado da Biblioteca 3":["Library Soldier 3","Soldado de la Biblioteca 3"],"Soldado de Infantaria":["Infantry Soldier","Soldado de Infantería"],"Soldado de Cavalaria":["Cavalry Soldier","Soldado de Caballería"],"Comandante dos Soldados":["Commander of the Soldiers","Comandante de los Soldados"],"Soldado do Trono Real":["Royal Throne Soldier","Soldado del Trono Real"],"Terra dos Reguladores de Ygdria":["Land of the Regulators of Ygdria","Tierra de los Reguladores de Ygdria"],"Cidade das Cerejeiras":["City of Cherry Blossoms","Ciudad de los Cerezos"],"Catedral de Ygdria":["Cathedral of Ygdria","Catedral de Ygdria"],"Palácio dos Reguladores":["Palace of the Regulators","Palacio de los Reguladores"],"Academia Real de Magia e Combate":["Royal Academy of Magic and Combat","Academia Real de Magia y Combate"],"Mercado Central dos Reinos":["Central Market of the Realms","Mercado Central de los Reinos"],"Praça das Doze Essências":["Square of the Twelve Essences","Plaza de las Doce Esencias"],"Biblioteca da Eternidade":["Library of Eternity","Biblioteca de la Eternidad"],"Muralha dos Heróis":["Wall of Heroes","Muralla de los Héroes"],"Lendária Torre de Acesso à Eternidade":["Legendary Tower of Access to Eternity","Legendaria Torre de Acceso a la Eternidad"],"Castelo da Coroa Humana":["Castle of the Human Crown","Castillo de la Corona Humana"],"Capital de Ygdria":["Capital of Ygdria","Capital de Ygdria"],"Onde a fé encontrou a magia":["Where faith met magic","Donde la fe encontró la magia"],"A ordem acima de tudo":["Order above all","El orden por encima de todo"],"Onde nascem os magos-cavaleiros":["Where mage-knights are born","Donde nacen los magos caballeros"],"Tudo tem um preço":["Everything has a price","Todo tiene un precio"],"Doze pilares, doze reinos":["Twelve pillars, twelve realms","Doce pilares, doce reinos"],"Todo saber, um só silêncio":["All knowledge, a single silence","Todo el saber, un solo silencio"],"Eles ainda vigiam":["They still keep watch","Ellos aún vigilan"],"O céu é a porta":["The sky is the door","El cielo es la puerta"],"O trono espera seu verdadeiro rei":["The throne awaits its true king","El trono espera a su verdadero rey"],"4× carta 1★":["4× 1★ card","4× carta 1★"],"4× carta 2★":["4× 2★ card","4× carta 2★"],"Minha capital... as cerejeiras choram pétalas. Algo corrompeu a guarda da cidade.":["My capital... the cherry trees weep petals. Something has corrupted the city guard.","Mi capital... los cerezos lloran pétalos. Algo corrompió a la guardia de la ciudad."],"Este lugar já foi sagrado. Os vitrais ainda cantam... mas há aço entre os bancos.":["This place was once sacred. The stained glass still sings... but there is steel among the pews.","Este lugar fue sagrado. Los vitrales aún cantan... pero hay acero entre los bancos."],"Os Reguladores mantinham o equilíbrio entre os reinos. Quem os dobrou?":["The Regulators kept the balance between the realms. Who bent them?","Los Reguladores mantenían el equilibrio entre los reinos. ¿Quién los doblegó?"],"Ha! Estudei aqui... e fui expulso. Hora de mostrar aos instrutores o que aprendi sozinho.":["Ha! I studied here... and got expelled. Time to show the instructors what I learned on my own.","¡Ja! Estudié aquí... y me expulsaron. Hora de mostrarles a los instructores lo que aprendí por mi cuenta."],"Conheço mercados assim — e emboscadas também. Três lâminas nos esperam no fim desta rua.":["I know markets like this — and ambushes too. Three blades await us at the end of this street.","Conozco mercados así — y también emboscadas. Tres hojas nos esperan al final de esta calle."],"Vultos entre os pilares... e um riso que não é humano. Ele acha que sombras são um jogo.":["Shades among the pillars... and a laugh that is not human. He thinks shadows are a game.","Sombras entre los pilares... y una risa que no es humana. Él cree que las sombras son un juego."],"Séculos de conhecimento vigiados por soldados... e por ela. Bernyce não empresta livros.":["Centuries of knowledge guarded by soldiers... and by her. Bernyce does not lend books.","Siglos de conocimiento vigilados por soldados... y por ella. Bernyce no presta libros."],"Infantaria, cavalaria, comando... e no topo da muralha, Kalander. Esta pedra vai tremer.":["Infantry, cavalry, command... and atop the wall, Kalander. This stone is going to shake.","Infantería, caballería, mando... y en lo alto de la muralla, Kalander. Esta piedra va a temblar."],"Esta torre toca a Eternidade... e Julius desceu dela. Sinto o véu se rasgar.":["This tower touches Eternity... and Julius came down from it. I can feel the veil tearing.","Esta torre toca la Eternidad... y Julius descendió de ella. Siento cómo se rasga el velo."],"O castelo da minha linhagem. Todos os campeões dele nos aguardam... e Julius por trás de tudo.":["The castle of my lineage. All of its champions await us... and Julius behind it all.","El castillo de mi linaje. Todos sus campeones nos aguardan... y Julius detrás de todo."],"Cinco cartas contra nós? Ótimo. Sempre quis um baralho em chamas.":["Five cards against us? Great. I always wanted a burning deck.","¿Cinco cartas contra nosotros? Genial. Siempre quise una baraja en llamas."],"Cedric, Elizier e Roland":["Cedric, Elizier and Roland","Cedric, Elizier y Roland"],"Rei Mago":["Mage King","Rey Mago"],"Rainha Maga":["Mage Queen","Reina Maga"],"Cavaleiro Mago":["Mage Knight","Caballero Mago"],"Cavaleira Maga":["Mage Dame","Dama Maga"],"Narrador":["Narrator","Narrador"],"The Joker · Bobo da Corte":["The Joker · Court Jester","The Joker · Bufón de la Corte"],"O Herói da Nação · Cavaleiro Mago":["The Hero of the Nation · Mage Knight","El Héroe de la Nación · Caballero Mago"],"Rainha dos Reguladores · Rainha Maga":["Queen of the Regulators · Mage Queen","Reina de los Reguladores · Reina Maga"],"O Cavaleiro do Além · Cavaleiro Mago":["The Knight from Beyond · Mage Knight","El Caballero del Más Allá · Caballero Mago"],"SUPER RARO":["SUPER RARE","SÚPER RARO"],"ULTRA RARO":["ULTRA RARE","ULTRA RARO"],"O maior truque não é enganar o inimigo... é conquistar sua confiança.":["The greatest trick is not fooling the enemy... it is winning their trust.","El mayor truco no es engañar al enemigo... es ganarse su confianza."],"Uma rainha governa um reino... uma mãe protege uma geração.":["A queen rules a kingdom... a mother protects a generation.","Una reina gobierna un reino... una madre protege una generación."],"Minhas sombras devoram o passado... e reescrevem a história!":["My shadows devour the past... and rewrite history!","¡Mis sombras devoran el pasado... y reescriben la historia!"],"Ás de Copas":["Ace of Hearts","As de Copas"],"A cada 5 turnos, cria 1 gema rosa de coração vermelho; se você estourá-la, recebe 5% da sua vida atual de dano.":["Every 5 turns, creates 1 pink gem with a red heart; if you pop it, you take 5% of your current HP as damage.","Cada 5 turnos, crea 1 gema rosa con corazón rojo; si la revientas, recibes 5% de tu vida actual como daño."],"Golpe Cruzado":["Cross Slash","Golpe Cruzado"],"A cada 4 turnos, suas lâminas gêmeas cortam um X no tabuleiro: as esferas das diagonais são removidas sem conceder energia.":["Every 4 turns, his twin blades slash an X across the board: the diagonal orbs are removed without granting energy.","Cada 4 turnos, sus espadas gemelas cortan una X en el tablero: las esferas de las diagonales se eliminan sin otorgar energía."],"Regulação Real":["Royal Regulation","Regulación Real"],"A cada 4 turnos, remove TODOS os power-ups do tabuleiro e recupera 80 de vida por cada um removido.":["Every 4 turns, removes ALL power-ups from the board and heals 80 HP for each one removed.","Cada 4 turnos, elimina TODOS los potenciadores del tablero y recupera 80 de vida por cada uno."],"Tempo Sombrio":["Dark Time","Tiempo Sombrío"],"A cada 30 segundos no relógio, corrompe uma gema com uma sombra: ela não pode ser movida nem removida. Se todas forem corrompidas, você perde!":["Every 30 seconds on the clock, corrupts a gem with shadow: it cannot be moved or removed. If all gems are corrupted, you lose!","Cada 30 segundos de reloj, corrompe una gema con sombra: no puede moverse ni eliminarse. ¡Si todas son corrompidas, pierdes!"],"Truque de Cartas":["Card Trick","Truco de Cartas"],"Cria 1 power-up aleatório no tabuleiro (25%, 75%).":["Creates 1 random power-up on the board (25%, 75%).","Crea 1 potenciador aleatorio en el tablero (25%, 75%)."],"Chamariz":["Decoy","Señuelo"],"Depois de ativar, se seu HP chegar a 0 você não perde: o HP volta para 100 (25%... 50%, 100%).":["After activating, if your HP reaches 0 you do not lose: HP returns to 100 (50%, 100%).","Tras activarla, si tu HP llega a 0 no pierdes: el HP vuelve a 100 (50%, 100%)."],"Corte Duplo":["Double Slash","Corte Doble"],"Duplica o ataque dele até o final do turno (25%, 75%; não acumula no mesmo turno).":["Doubles his attack until the end of the turn (25%, 75%; does not stack in the same turn).","Duplica su ataque hasta el final del turno (25%, 75%; no se acumula en el mismo turno)."],"O Herói da Nação":["The Hero of the Nation","El Héroe de la Nación"],"Reduz os danos recebidos em 20% pela missão toda; acumula até 2× (50%, 100%).":["Reduces damage taken by 20% for the whole mission; stacks up to 2× (50%, 100%).","Reduce el daño recibido en 20% durante toda la misión; se acumula hasta 2× (50%, 100%)."],"Regulação Total":["Total Regulation","Regulación Total"],"Os inimigos ficam 2 turnos sem atacar (25%, 75%).":["Enemies cannot attack for 2 turns (25%, 75%).","Los enemigos no atacan durante 2 turnos (25%, 75%)."],"Ímpeto da Rainha":["Queen's Fury","Ímpetu de la Reina"],"Os inimigos recebem 20% de dano extra até o fim da missão; acumula sempre que ativar (50%, 100%).":["Enemies take 20% extra damage until the end of the mission; stacks every activation (50%, 100%).","Los enemigos reciben 20% de daño extra hasta el fin de la misión; se acumula con cada activación (50%, 100%)."],"Corte Sombrio":["Shadow Slash","Corte Sombrío"],"Inflige 20% da vida atual do inimigo e causa cegueira por 1 turno (25%).":["Deals 20% of the enemy's current HP and blinds it for 1 turn (25%).","Inflige 20% de la vida actual del enemigo y lo ciega por 1 turno (25%)."],"Para que Serve esse Relógio":["What Is this Clock For","Para qué Sirve este Reloj"],"Paralisa o tempo do inimigo: ele não ataca mais até sua vida chegar a 25% (50%).":["Freezes the enemy's time: it cannot attack until its HP drops to 25% (50%).","Paraliza el tiempo del enemigo: no ataca hasta que su vida llegue al 25% (50%)."],"Sombras Devoradoras":["Devouring Shadows","Sombras Devoradoras"],"Sempre que o inimigo atacar, todos os inimigos perdem 5% da vida total (75%).":["Whenever the enemy attacks, all enemies lose 5% of their total HP (75%).","Cada vez que el enemigo ataca, todos los enemigos pierden 5% de su vida total (75%)."],"Lâmina das Sombras Dimensional I":["Dimensional Shadow Blade I","Hoja de las Sombras Dimensional I"],"Atinge todos os inimigos com 10% da vida e as missões futuras com 8%, 6%, 4%, 2%, 0% consecutivamente. Acumulativa (100%).":["Hits all enemies for 10% of their HP and future missions for 8%, 6%, 4%, 2%, 0% consecutively. Stacks (100%).","Golpea a todos los enemigos con 10% de su vida y a las misiones futuras con 8%, 6%, 4%, 2%, 0% consecutivamente. Acumulable (100%)."],"sombra":["shadow","sombra"],"copas":["hearts","copas"]};
I18N_DICT['VERSÃO 11']=['VERSION 11','VERSIÓN 11'];
/* L(): traduz strings de DADOS (habilidades, fases, inimigos, loja...) na renderização.
   Chave = string PT canônica dos objetos; valor = [EN, ES]. Fora do dicionário: retorna como veio. */
function L(str){ if(lang==='pt'||!str) return str; const e=I18N_DICT[str]; return e ? (lang==='en'?e[0]:(e[1]||e[0])) : str; }
/* == ARTE LOCALIZADA: se existir assets/i18n/<idioma>/<mesmo caminho> (ex.:
   assets/i18n/en/assets/cards/enemies/gareth-card.png), o jogo usa a versão
   traduzida; senão cai na original automaticamente (onerror / camada dupla). */
function THUMB(src){ return src?('assets/thumbs/'+String(src).split('/').pop()):src; }
function THUMBF(src){ return src?` onerror="this.onerror=null;this.src='${src}'"`:''; }
function IMGL(src){ return (lang==='pt'||!src) ? src : 'assets/i18n/'+lang+'/'+src; }
function IMGF(src){ return (lang==='pt'||!src) ? '' : ` onerror="this.onerror=null;this.src='${src}'"`; }
function applyI18nArtCss(){
  let st=document.getElementById('i18nArtCss');
  if(!st){ st=document.createElement('style'); st.id='i18nArtCss'; document.head.appendChild(st); }
  if(lang==='pt'){ st.textContent=''; return; }
  const mapa='assets/map/ygdria.png', mapaL='assets/i18n/'+lang+'/'+mapa;
  st.textContent=`.map-canvas{background-image:url('${mapaL}'),url('${mapa}');}
.scene-bg[data-screen="menu"]{background-image:linear-gradient(180deg,rgba(5,4,12,.22) 0%,rgba(5,4,12,.38) 55%,rgba(4,3,10,.66) 100%),url('${mapaL}'),url('${mapa}');}`;
}

const STATIC_I18N=[
  ['#playBtn .menu-label','Jogar','Play','Jugar'],
  ['#galleryBtn .menu-label','Galeria <small class="menu-hint">Cartas e habilidades</small>','Gallery <small class="menu-hint">Cards & abilities</small>','Galería <small class="menu-hint">Cartas y habilidades</small>'],
  ['#shopBtn .menu-label','Loja <small class="menu-hint">Consumíveis de batalha</small>','Shop <small class="menu-hint">Battle consumables</small>','Tienda <small class="menu-hint">Consumibles de batalla</small>'],
  ['#achBtn .menu-label','Conquistas','Achievements','Logros'],
  ['#optionsBtn .menu-label','Opções','Options','Opciones'],
  ['#helpBtn .menu-label','Como jogar','How to play','Cómo jugar'],
  ['#optionsTitle','Opções','Options','Opciones'],
  ['#achTitle','Perfil & Conquistas','Profile & Achievements','Perfil y Logros'],
  ['#shopTitle','Loja Real','Royal Shop','Tienda Real'],
  ['#galleryTitle','Galeria dos Reinos','Gallery of the Realms','Galería de los Reinos'],
  ['#playAgainBtn','Jogar novamente','Play again','Jugar de nuevo'],
  ['#retryBtn','Tentar novamente','Try again','Intentar de nuevo'],
  ['#startBtn','Iniciar a Aventura!','Begin the Adventure!','¡Iniciar la Aventura!'],
  ['#autoTeamBtn','Equipe sugerida','Suggested team','Equipo sugerido'],
  ["#continueBtn .menu-label","Continuar <small class=\"menu-hint\" id=\"continueHint\">Sem progresso salvo</small>","Continue <small class=\"menu-hint\" id=\"continueHint\">No saved progress</small>","Continuar <small class=\"menu-hint\" id=\"continueHint\">Sin progreso guardado</small>"],
  ["#menuVersion","VERSÃO 11 · DEMO OFICIAL MOBILE","VERSION 11 · OFFICIAL MOBILE DEMO","VERSIÓN 11 · DEMO OFICIAL MÓVIL"],
  ["#selectBackBtn","← Voltar","← Back","← Volver"],
  ["#selectScreen .screen-eyebrow","Formação do grupo","Party setup","Formación del grupo"],
  ["#selectScreen .screen-title","Formação da Equipe","Team Formation","Formación del Equipo"],
  ["#selectGalleryBtn","Galeria","Gallery","Galería"],
  [".select-counter","Escolhidos: <b id=\"selectCount\">0</b>/4","Chosen: <b id=\"selectCount\">0</b>/4","Elegidos: <b id=\"selectCount\">0</b>/4"],
  ["#battleStatus","Combine três esferas do mesmo Reino para atacar.","Match three orbs of the same Realm to attack.","Combina tres esferas del mismo Reino para atacar."],
  ["#stageObjective","Objetivo: derrote todos os inimigos","Objective: defeat all enemies","Objetivo: derrota a todos los enemigos"],
  ["#comboRecord","RECORDE ×0","BEST ×0","RÉCORD ×0"],
  ["#cycleTargetTool","🎯 Próximo alvo","🎯 Next target","🎯 Siguiente objetivo"],
  ["#battleToolsClose","✕ Fechar","✕ Close","✕ Cerrar"],
  ["#hintTool","✦ Sugerir jogada","✦ Suggest move","✦ Sugerir jugada"],
  ["#gridTool","◇ Grade tática","◇ Tactical grid","◇ Cuadrícula táctica"],
  ["#fullscreenTool","⛶ Tela cheia","⛶ Fullscreen","⛶ Pantalla completa"],
  ["#resetBtn","Reiniciar fase","Restart stage","Reiniciar fase"],
  ["#swapBtn2","Trocar heróis","Swap heroes","Cambiar héroes"],
  ["#stageClearOverlay h2","Fase Concluída!","Stage Complete!","¡Fase Completada!"],
  ["#grandClearTitle","Reino Conquistado!","Realm Conquered!","¡Reino Conquistado!"],
  ["#grandClearText","A vitória ecoa por Ygdria.","Victory echoes across Ygdria.","La victoria resuena por Ygdria."],
  ["#shareDailyBtn","📋 Compartilhar resultado","📋 Share result","📋 Compartir resultado"],
  ["#defeatOverlay h2","Derrota","Defeat","Derrota"],
  ["#defeatOverlay p","Seu grupo caiu em batalha. As gemas dos reinos ainda esperam por você.","Your party fell in battle. The realm gems still await you.","Tu grupo cayó en batalla. Las gemas de los reinos aún te esperan."],
  ["[data-close=\"galleryScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"abilityPickerScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"worldScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"accountScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"achScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"shopScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"optionsScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"battleHistoryScreen\"]","Fechar","Close","Cerrar"],
  ["[data-close=\"helpScreen\"]","Entendi","Got it","Entendido"],
  ["#abilityPickerTitle","Habilidades ativas","Active abilities","Habilidades activas"],
  ["#worldTitle","Mundos","Worlds","Mundos"],
  ["#worldNote","Cada fase tem 5 níveis — o 5º guarda o CHEFE. Vença o chefe para desbloquear a próxima fase. Os demais reinos serão revelados em breve.","Each stage has 5 levels — the 5th holds the BOSS. Beat the boss to unlock the next stage. The other realms will be revealed soon.","Cada fase tiene 5 niveles — el 5º guarda al JEFE. Vence al jefe para desbloquear la siguiente fase. Los demás reinos se revelarán pronto."],
  ["#accountTitle","Minha Conta","My Account","Mi Cuenta"],
  ["#rankNote","🏆 Ranking Global: será ativado junto com o servidor. Seu nome de usuário já está reservado localmente.","🏆 Global Ranking: activates together with the server. Your username is already reserved locally.","🏆 Ranking Global: se activará junto con el servidor. Tu nombre de usuario ya está reservado localmente."],
  ["#accountLoginBtn","Entrar / Criar conta","Sign in / Create account","Entrar / Crear cuenta"],
  ["#logoutBtn","Sair da conta","Sign out","Cerrar sesión"],
  ["#optMasterVolumeLabel","Volume geral","Master volume","Volumen general"],
  ["#optMusicVolumeLabel","Volume da música","Music volume","Volumen de la música"],
  ["#optSfxVolumeLabel","Efeitos sonoros","Sound effects","Efectos de sonido"],
  ["#optDifficultyLabel","Dificuldade","Difficulty","Dificultad"],
  ["#optLanguageLabel","Idioma / Language","Language / Idioma","Idioma / Language"],
  ["#optProgressLabel","Progresso","Progress","Progreso"],
  ["#optQualityLabel","Qualidade gráfica","Graphics quality","Calidad gráfica"],
  ["#optContrastLabel","Alto contraste","High contrast","Alto contraste"],
  ["#optLargeTextLabel","Texto maior","Larger text","Texto más grande"],
  ["#optFlashesLabel","Reduzir flashes","Reduce flashes","Reducir destellos"],
  ["#qualitySelect option[value=\"auto\"]","Automática","Automatic","Automática"],
  ["#qualitySelect option[value=\"high\"]","Alta","High","Alta"],
  ["#qualitySelect option[value=\"medium\"]","Média","Medium","Media"],
  ["#qualitySelect option[value=\"economy\"]","Econômica","Economy","Económica"],
  ["#diffGroup [data-diff=\"facil\"]","Fácil","Easy","Fácil"],
  ["#diffGroup [data-diff=\"normal\"]","Normal","Normal","Normal"],
  ["#diffGroup [data-diff=\"dificil\"]","Difícil","Hard","Difícil"],
  ["#diffGroup [data-diff=\"pesadelo\"]","Pesadelo","Nightmare","Pesadilla"],
  ["#exportSaveBtn","Exportar","Export","Exportar"],
  ["#importSaveBtn","Importar","Import","Importar"],
  ["#optReduceLabel","Reduzir animações","Reduce animations","Reducir animaciones"],
  ["#optParticlesLabel","Partículas de batalha","Battle particles","Partículas de batalla"],
  ["#optHapticsLabel","Vibração em dispositivos móveis","Vibration on mobile devices","Vibración en dispositivos móviles"],
  ["#vizSectionTitle","👁 Visualização","👁 Display","👁 Visualización"],
  ["#vizHeroLabel","Nome dos heróis","Hero names","Nombre de los héroes"],
  ["#vizEnemyLabel","Nome dos inimigos","Enemy names","Nombre de los enemigos"],
  ["#vizDmgLabel","Números de dano","Damage numbers","Números de daño"],
  ["#vizDpsLabel","DPS nas mini-cartas","DPS on mini-cards","DPS en las mini-cartas"],
  ["#vizTimerLabel","Timer da missão","Mission timer","Temporizador de misión"],
  ["#vizTurnInfoLabel","Indicador de turno","Turn indicator","Indicador de turno"],
  ["#vizTopHudLabel","HUD superior","Top HUD","HUD superior"],
  ["#vizInfoBarLabel","Barra de informações","Information bar","Barra de información"],
  ["#mochilaTitle","🎒 Mochila","🎒 Bag","🎒 Mochila"],
  ["[data-close=\"mochilaScreen\"]","Fechar","Close","Cerrar"],
  ["#mochilaShopBtn","🪙 Abrir Loja de Consumíveis","🪙 Open Consumables Shop","🪙 Abrir Tienda de Consumibles"],
  ["#towerTitle","🗼 Torre de Acesso à Eternidade","🗼 Tower of Access to Eternity","🗼 Torre de Acceso a la Eternidad"],
  ["[data-close=\"towerScreen\"]","Fechar","Close","Cerrar"],
  ["#towerStartBtn","🗼 Escalar a Torre (Pesadelo)","🗼 Climb the Tower (Nightmare)","🗼 Escalar la Torre (Pesadilla)"],
  ["#resetProgressBtn","Apagar progresso local","Erase local progress","Borrar progreso local"],
  ["#helpTitle","Como jogar","How to play","Cómo jugar"],
  ["#helpScreen .tutorial-step:nth-child(1)","<b>1. Forme o grupo</b><p>Escolha quatro cartas. A esfera colorida de cada carta passa a fazer parte do tabuleiro.</p>","<b>1. Build your party</b><p>Pick four cards. Each card's colored orb becomes part of the board.</p>","<b>1. Forma tu grupo</b><p>Elige cuatro cartas. La esfera de color de cada carta pasa a formar parte del tablero.</p>"],
  ["#helpScreen .tutorial-step:nth-child(2)","<b>2. Combine esferas</b><p>Arraste ou toque em duas esferas vizinhas. Uma linha com três ou mais gera ataque e energia.</p>","<b>2. Match orbs</b><p>Drag or tap two neighboring orbs. A line of three or more triggers an attack and grants energy.</p>","<b>2. Combina esferas</b><p>Arrastra o toca dos esferas vecinas. Una línea de tres o más genera ataque y energía.</p>"],
  ["#helpScreen .tutorial-step:nth-child(3)","<b>3. Escolha o alvo</b><p>Quando houver vários inimigos, toque no oponente que deve receber o próximo ataque.</p>","<b>3. Pick your target</b><p>When there are several enemies, tap the foe that should take the next attack.</p>","<b>3. Elige el objetivo</b><p>Cuando haya varios enemigos, toca al oponente que debe recibir el próximo ataque.</p>"],
  ["#helpScreen .tutorial-step:nth-child(4)","<b>4. Acumule Aura</b><p>Com 25%, 50% e 75% de energia, o herói libera habilidades passivas automaticamente.</p>","<b>4. Build up Aura</b><p>At 25%, 50% and 75% energy, the hero unleashes passive abilities automatically.</p>","<b>4. Acumula Aura</b><p>Con 25%, 50% y 75% de energía, el héroe libera habilidades pasivas automáticamente.</p>"],
  ["#helpScreen .tutorial-step:nth-child(5)","<b>5. Ataque supremo</b><p>Ao chegar a 100%, toque no herói iluminado para lançar sua habilidade especial.</p>","<b>5. Ultimate attack</b><p>At 100%, tap the glowing hero to unleash their special ability.</p>","<b>5. Ataque supremo</b><p>Al llegar al 100%, toca al héroe iluminado para lanzar su habilidad especial.</p>"],
  ["#helpScreen .tutorial-step:nth-child(6)","<b>6. Conquiste o Trono</b><p>Vença as cinco fases, gerencie cura e escudo e derrote o Dragão Carmesim.</p>","<b>6. Claim the Throne</b><p>Clear the five stages, manage healing and shields, and defeat the Crimson Dragon.</p>","<b>6. Conquista el Trono</b><p>Supera las cinco fases, administra curación y escudo y derrota al Dragón Carmesí.</p>"],
  ["#helpScreen .tutorial-step:nth-child(7)","<b>7. Crie power-ups</b><p>Combine 4 para criar uma esfera listrada, 5 para um Prisma Real e forme T ou L para uma esfera encapsulada.</p>","<b>7. Create power-ups</b><p>Match 4 to create a striped orb, 5 for a Royal Prism, and make a T or L shape for a wrapped orb.</p>","<b>7. Crea potenciadores</b><p>Combina 4 para crear una esfera rayada, 5 para un Prisma Real y forma una T o L para una esfera envuelta.</p>"],
  ["#helpScreen .tutorial-step:nth-child(8)","<b>8. Combine especiais</b><p>Troque dois power-ups vizinhos para lançar efeitos conjuntos ainda mais poderosos.</p>","<b>8. Combine specials</b><p>Swap two neighboring power-ups to unleash even more powerful combined effects.</p>","<b>8. Combina especiales</b><p>Intercambia dos potenciadores vecinos para lanzar efectos conjuntos aún más poderosos.</p>"],
  ["#pauseTitle","Jogo pausado","Game paused","Juego en pausa"],
  ["#resumeBtn .menu-label","Continuar batalha","Resume battle","Continuar batalla"],
  ["#pauseOptionsBtn .menu-label","Opções","Options","Opciones"],
  ["#restartStageBtn .menu-label","Reiniciar fase","Restart stage","Reiniciar fase"],
  ["#returnMenuBtn .menu-label","Menu principal","Main menu","Menú principal"],
  ["#battleHistoryScreen .screen-eyebrow","Registro tático","Tactical log","Registro táctico"],
  ["#battleHistoryTitle","Histórico da batalha","Battle history","Historial de batalla"],
  ["#copyHistoryBtn","Copiar histórico","Copy history","Copiar historial"],
  ["#clearHistoryBtn","Limpar","Clear","Limpiar"],
  ["#mapBackBtn","← Menu","← Menu","← Menú"],
  ["#mapSubtitle","Escolha um reino para explorar","Choose a realm to explore","Elige un reino para explorar"],
  ["#loginEyebrow","SUA LENDA COMEÇA AQUI","YOUR LEGEND BEGINS HERE","TU LEYENDA COMIENZA AQUÍ"],
  ["#loginTitle","Entrar nos 12 Reinos","Enter the 12 Realms","Entrar a los 12 Reinos"],
  ["#guestBtn","🎭 Jogar como Convidado","🎭 Play as Guest","🎭 Jugar como Invitado"],
  ["#guestNote","Convidado: sem ranking, sem nuvem e sem PVP (em breve).","Guest: no ranking, no cloud save and no PVP (soon).","Invitado: sin ranking, sin nube y sin PVP (pronto)."],
  ["#loginOu","ou entre com sua conta","or sign in with your account","o entra con tu cuenta"],
  ["#loginSubmit","Entrar / Criar conta","Sign in / Create account","Entrar / Crear cuenta"],
  ["#googleBtn","<span class=\"g-logo\">G</span> Entrar com Google","<span class=\"g-logo\">G</span> Sign in with Google","<span class=\"g-logo\">G</span> Entrar con Google"],
  ["#obStep1 .boot-eyebrow","PASSO 1 DE 3","STEP 1 OF 3","PASO 1 DE 3"],
  ["#obT1","Qual a sua data de nascimento?","What is your birth date?","¿Cuál es tu fecha de nacimiento?"],
  ["#obNext1","Continuar","Continue","Continuar"],
  ["#obStep2 .boot-eyebrow","PASSO 2 DE 3","STEP 2 OF 3","PASO 2 DE 3"],
  ["#obT2","Como deseja ser tratado(a)?","How would you like to be addressed?","¿Cómo deseas que te llamemos?"],
  [".title-opt[data-title=\"Rei Mago\"]","🤴<b>Rei Mago</b>","🤴<b>Mage King</b>","🤴<b>Rey Mago</b>"],
  [".title-opt[data-title=\"Rainha Maga\"]","👸<b>Rainha Maga</b>","👸<b>Mage Queen</b>","👸<b>Reina Maga</b>"],
  [".title-opt[data-title=\"Cavaleiro Mago\"]","🛡️<b>Cavaleiro Mago</b>","🛡️<b>Mage Knight</b>","🛡️<b>Caballero Mago</b>"],
  [".title-opt[data-title=\"Cavaleira Maga\"]","⚔️<b>Cavaleira Maga</b>","⚔️<b>Mage Dame</b>","⚔️<b>Dama Maga</b>"],
  ["#obStep3 .boot-eyebrow","PASSO 3 DE 3","STEP 3 OF 3","PASO 3 DE 3"],
  ["#obT3","Como quer ser chamado(a)?","What should we call you?","¿Cómo quieres que te llamen?"],
  ["#obPrevLabel","Você será:","You will be:","Serás:"],
  ["#obFinish","Confirmar nome","Confirm name","Confirmar nombre"],
  ["#storyLayer .story-hint","toque para continuar","tap to continue","toca para continuar"],
  ["#storySkip","»","»","»"]
];
function applyLanguage(){
  applyI18nArtCss();
  const li=lang==='en'?2:lang==='es'?3:1;
  STATIC_I18N.forEach(entry=>{
    const el=document.querySelector(entry[0]);
    if(el) el.innerHTML=entry[li]||entry[1];
  });
  const dailyLabel=document.querySelector('#dailyBtn .menu-label');
  if(dailyLabel){
    const hint=document.getElementById('dailyHint')?.outerHTML||'';
    dailyLabel.innerHTML=T('Desafio Diário ','Daily Challenge ','Desafío Diario ')+hint;
  }
  const towerLabel=document.querySelector('#towerBtn .menu-label');
  if(towerLabel){
    const hint=document.getElementById('towerHint')?.outerHTML||'';
    towerLabel.innerHTML=T('Torre de Acesso à Eternidade ','Tower of Access to Eternity ','Torre de Acceso a la Eternidad ')+hint;
  }
  const sub=document.querySelector('.select-sub');
  const totalCartas=KINGDOMS.length;
  if(sub) sub.textContent=T(
    `Escolha 4 entre ${totalCartas} cartas. Toque na carta para escalar e use apenas a lupa para abrir a arte e ler todas as habilidades.`,
    `Pick 4 of ${totalCartas} cards. Tap a card to enlist; use the magnifier to open the art and read every ability.`,
    `Elige 4 de ${totalCartas} cartas. Toca la carta para alistar; usa la lupa para abrir el arte y leer todas las habilidades.`);
  document.querySelectorAll('#langGroup [data-lang], #langScreen [data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
}

/* v9.1 · Diálogos de história pré-fase (pulados na Torre e durante o tutorial) */
const STAGE_DIALOGS={
  0:[{h:'luz',t:'O pântano sussurra... sinto presenças famintas rondando o Portão.'},
     {h:'fogo',t:'Que venham! O fogo de Ignis abrirá alas para todos nós.'}],
  1:[{h:'terra',t:'Estas pedras guardam memória. A Sentinela desperta — pisem leve.'}],
  2:[{h:'agua',t:'A floresta esconde olhos entre as copas. Fiquem próximos de mim.'}],
  3:[{h:'humanos',t:'O tempo pesa neste corredor... os espectros odeiam os vivos.'}],
  4:[{h:'luz',t:'O Trono está além destas chamas. O Dragão Carmesim nos aguarda!'},
     {h:'sombras',t:'Dragões também sangram. Deixem a escuridão ir à frente.'}],
  5:[{h:'areia',t:'Minha terra natal... as dunas dançam comigo. Colham as esferas que o vento trouxer.'}],
  6:[{h:'sombras',t:'Este abismo me pertence. Sobrevivam ao que vem — eu cuido do resto.'}],
  7:[{h:'raio',t:'Um trono sombrio? Que o céu ruja: a HECATOMBE espera por eles.'},
     {h:'gelo',t:'E quando o trovão passar... apenas o gelo permanecerá.'}]
};
let storyQueue=[];
/* Vocabulário sonoro das criaturas. As feras preservam a personalidade sem
   receber falas humanas; variantes da mesma espécie compartilham a voz. */
const CREATURE_ONOMATOPOEIAS=Object.freeze({
  slime:T('Blub... ploc-ploc... splash!','Blub... plop-plop... splash!','¡Blub... ploc-ploc... splash!'),
  wolf:T('Grrrr... auuuuu!','Grrrr... awoooo!','¡Grrrr... auuuuu!'),
  harpy:T('Kriiih! Kriiih!','Skreee! Skreee!','¡Kriiih! ¡Kriiih!'),
  golem:T('Grrrooom... tum!','Grrrooom... thud!','¡Grrrooom... bum!'),
  dragon:T('RROOOAAARRR... FWHOOOSH!','RROOOAAARRR... FWHOOOSH!','¡RROOOAAARRR... FUUUUSH!'),
  kraken:T('SHLAAAP... glooorp!','SHLAAAP... glooorp!','¡SHLAAAP... glooorp!'),
  beast:T('Grrrr... RRAAAH!','Grrrr... RRAAAH!','¡Grrrr... RRAAAH!')
});
function creatureOnomatopoeiaKind(creature){
  const raw=typeof creature==='string'?creature:[creature?.etype,creature?.cardId,creature?.id,creature?.name].filter(Boolean).join(' ');
  const key=String(raw||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(/slime|limo/.test(key)) return 'slime';
  if(/lobo|wolf|chacal/.test(key)) return 'wolf';
  if(/harpia|harpy/.test(key)) return 'harpy';
  if(/golem|sentinela|sentinel|guardiao de areia/.test(key)) return 'golem';
  if(/dragao|dragon|draco/.test(key)) return 'dragon';
  if(/kraken|lula|tentac/.test(key)) return 'kraken';
  return '';
}
function creatureOnomatopoeia(creature){
  return CREATURE_ONOMATOPOEIAS[creatureOnomatopoeiaKind(creature)]||CREATURE_ONOMATOPOEIAS.beast;
}
/* v9.2 · FALAS DE ENTRADA DOS INIMIGOS: todos os inimigos falam quando a missão
   começa (mesmo vários por missão). Feras mágicas NÃO falam — emitem sons. */
const ENEMY_LINES={
  slimeCereja:[[CREATURE_ONOMATOPOEIAS.slime,CREATURE_ONOMATOPOEIAS.slime,CREATURE_ONOMATOPOEIAS.slime]],
  loboRaivoso:[[CREATURE_ONOMATOPOEIAS.wolf,CREATURE_ONOMATOPOEIAS.wolf,CREATURE_ONOMATOPOEIAS.wolf]],
  soldado1:[['Alto! Ninguém passa pela guarda da capital.','Halt! No one passes the capital guard.','¡Alto! Nadie pasa la guardia de la capital.'],
            ['Pela Coroa! Rendam-se agora.','For the Crown! Surrender now.','¡Por la Corona! Ríndanse ahora.']],
  soldado2:[['Vocês não deviam ter vindo até aqui.','You should not have come here.','No deberían haber venido hasta aquí.'],
            ['A ordem é prender os invasores!','Orders are to arrest the invaders!','¡La orden es arrestar a los invasores!']],
  capitao:[['Eu treinei cada lâmina desta cidade. Mostrem o que sabem!','I trained every blade in this city. Show me what you know!','Entrené cada espada de esta ciudad. ¡Muestren lo que saben!']],
  vulto:[['*Um sussurro gelado atravessa o ar...*','*An icy whisper crosses the air...*','*Un susurro helado cruza el aire...*']],
  espectro:[['Vocês pertencem... às sombras...','You belong... to the shadows...','Ustedes pertenecen... a las sombras...']],
  morto:[['A morte não me libertou do meu posto.','Death did not release me from my post.','La muerte no me liberó de mi puesto.']],
  soldBib1:[['Silêncio na Biblioteca! O saber não é para todos.','Silence in the Library! Knowledge is not for everyone.','¡Silencio en la Biblioteca! El saber no es para todos.']],
  soldBib2:[['Cada página aqui vale mais que suas vidas.','Every page here is worth more than your lives.','Cada página aquí vale más que sus vidas.']],
  soldBib3:[['Saiam! Os arquivos da Eternidade são selados.','Leave! The archives of Eternity are sealed.','¡Fuera! Los archivos de la Eternidad están sellados.']],
  infantaria:[['Formação de lanças! Avançar!','Spear formation! Advance!','¡Formación de lanzas! ¡Avancen!']],
  cavalaria:[['Ao meu sinal, a cavalaria esmaga qualquer um.','At my signal, the cavalry crushes anyone.','A mi señal, la caballería aplasta a cualquiera.']],
  comandante:[['Eu comando a Muralha. E a Muralha nunca caiu.','I command the Wall. And the Wall has never fallen.','Yo comando la Muralla. Y la Muralla nunca cayó.']],
  trono:[['O Trono Real não recebe visitas. Apenas prisioneiros.','The Royal Throne receives no guests. Only prisoners.','El Trono Real no recibe visitas. Solo prisioneros.']],
  gareth:[['Toda grande vitória começa com um simples soldado. Hoje, a minha!','Every great victory starts with a simple soldier. Today, mine!','¡Toda gran victoria empieza con un simple soldado. Hoy, la mía!']],
  cedric:[['Cada feitiço escrito hoje será uma lenda amanhã. Testemunhem!','Every spell written today will be a legend tomorrow. Witness it!','Cada hechizo escrito hoy será una leyenda mañana. ¡Sean testigos!']],
  elizier:[['Nenhum inimigo escapa do olhar da Coroa.','No enemy escapes the gaze of the Crown.','Ningún enemigo escapa a la mirada de la Corona.']],
  roland:[['Minha lança protege o reino antes da minha própria vida!','My lance protects the realm before my own life!','¡Mi lanza protege el reino antes que mi propia vida!']],
  jules:[['Hihihi... querem ver um truque? A carta da vez é... VOCÊS!','Heehee... want to see a trick? The next card is... YOU!','Jijiji... ¿quieren ver un truco? La carta de turno son... ¡USTEDES!']],
  bernyce:[['Uma rainha governa um reino. Ajoelhem-se diante da Reguladora.','A queen rules a realm. Kneel before the Regulator.','Una reina gobierna un reino. Arrodíllense ante la Reguladora.']],
  kalander:[['O Herói da Nação não recua. Nem diante de vocês.','The Hero of the Nation does not retreat. Not even before you.','El Héroe de la Nación no retrocede. Ni ante ustedes.']],
  julius:[['Minhas sombras devoram o passado... e reescrevem a história!','My shadows devour the past... and rewrite history!','¡Mis sombras devoran el pasado... y reescriben la historia!']]
};
function enemyLineFor(e){
  const key=e.cardId||e.etype;
  const tpl=HUMANOS_ETYPES[e.etype];
  const arr=ENEMY_LINES[key];
  if(arr){
    const tri=arr[Math.floor(gameRandom()*arr.length)];
    return T(tri[0],tri[1],tri[2]);
  }
  if(tpl?.fera||(!e?.isCard&&creatureOnomatopoeiaKind(e))) return creatureOnomatopoeia(e);
  const k=KINGDOMS.find(x=>x.id===key);
  if(k?.frase) return L(k.frase);
  return T('Vocês não deveriam ter vindo até aqui...','You should not have come here...','No deberían haber venido hasta aquí...');
}
function storySpeakerSprite(name){
  const wanted=String(name||'').trim();
  if(!wanted) return '';
  const activeEnemy=(enemies||[]).find(e=>e?.name===wanted&&e.sprite);
  if(activeEnemy?.sprite) return activeEnemy.sprite;
  const enemyType=Object.values(HUMANOS_ETYPES||{}).find(t=>t?.n===wanted&&t.sprite);
  if(enemyType?.sprite) return enemyType.sprite;
  const enemyCard=Object.values(HUMANOS_CARDS||{}).find(c=>c?.nome===wanted&&c.sprite);
  return enemyCard?.sprite||'';
}
function storySpeakerToken(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
function storySpeakerAnchor(step){
  if(step?.h){
    const direct=document.getElementById('party-'+step.h);
    if(direct) return direct;
    const wanted=storySpeakerToken(step.h);
    const hero=[...partyArenaEl.querySelectorAll('.hero-unit')].find(unit=>{
      const character=KINGDOMS[Number(unit.dataset.heroIndex)];
      return storySpeakerToken(character?.id)===wanted||storySpeakerToken(L(character?.nome)).includes(wanted);
    });
    if(hero) return hero;
  }
  const wanted=storySpeakerToken(step?.name||step?.h);
  if(!wanted||['narrador','narrator'].includes(wanted)) return null;
  /* A cena final mantém Cedric, Bernyce e Kalander no próprio piso da arena;
     a fala canônica continua presa a quem a está dizendo, mesmo depois da
     queda e antes do teleporte de Adriel. */
  const finaleActor=arenaEl?.querySelector(`.human-final-scene .finale-${wanted},.human-final-prelude .finale-${wanted}`);
  if(finaleActor) return finaleActor;
  if(Number.isInteger(step?.enemyIndex)) return document.getElementById('enemy-'+step.enemyIndex);
  const namedHero=[...partyArenaEl.querySelectorAll('.hero-unit')].find(unit=>{
    const character=KINGDOMS[Number(unit.dataset.heroIndex)];
    const id=storySpeakerToken(character?.id);
    const name=storySpeakerToken(L(character?.nome));
    return id===wanted||name===wanted||name.includes(wanted)||wanted.includes(name);
  });
  if(namedHero) return namedHero;
  const enemyIndex=(enemies||[]).findIndex(enemy=>{
    const candidate=storySpeakerToken(L(enemy?.name));
    return candidate===wanted||candidate.includes(wanted)||wanted.includes(candidate);
  });
  return enemyIndex>=0?document.getElementById('enemy-'+enemyIndex):null;
}
function clearStoryPresentation(){
  const layer=document.getElementById('storyLayer');
  const box=layer?.querySelector('.story-box');
  if(!layer||!box) return;
  layer.classList.remove('speaker-bubble','story-speaker-fallback','story-bubble-positioned','bubble-below','narrator-box');
  layer.removeAttribute('data-story-anchor');
  layer.removeAttribute('data-story-speaker');
  layer.removeAttribute('data-final-cinematic');
  box.style.removeProperty('left');
  box.style.removeProperty('top');
  box.style.removeProperty('--story-tail-x');
  box.style.removeProperty('--story-accent');
  const skip=layer.querySelector('.story-skip');
  skip?.style.removeProperty('right');
  skip?.style.removeProperty('bottom');
}
function positionStorySpeechBubble(){
  const layer=document.getElementById('storyLayer');
  const box=layer?.querySelector('.story-box');
  if(!layer||!box) return;
  const anchorId=layer.dataset.storyAnchor;
  const anchor=anchorId?document.getElementById(anchorId):null;
  const skip=layer.querySelector('.story-skip');
  const isSpeaker=layer.classList.contains('speaker-bubble');
  const arenaRect=isSpeaker?arenaEl.getBoundingClientRect():{right:window.innerWidth,bottom:window.innerHeight,top:0};
  if(skip){
    skip.style.right=Math.max(8,window.innerWidth-arenaRect.right+8)+'px';
    skip.style.bottom=Math.max(2,window.innerHeight-arenaRect.bottom+2)+'px';
  }
  if(!isSpeaker) return;
  const speakerId=layer.dataset.storySpeaker||'';
  const speaker=KINGDOMS.find(character=>character.id===speakerId);
  const humanSpeaker=isHumanRealmAttacker(speaker)||(!speaker&&worldRun.active&&speakerId!=='julius');
  const fallbackAccent=humanSpeaker?HUMAN_REALM_ATTACK_COLOR:'#f0d58e';
  /* Mesmo se a fala precisar do fallback (personagem fora da arena), a
     assinatura cromática do reino não pode voltar ao dourado genérico. */
  box.style.setProperty('--story-accent',fallbackAccent);
  if(!anchor){ layer.classList.add('story-speaker-fallback'); return; }
  layer.classList.remove('story-speaker-fallback');
  requestAnimationFrame(()=>{
    if(!layer.classList.contains('speaker-bubble')) return;
    const anchorRect=anchor.getBoundingClientRect();
    const boxRect=box.getBoundingClientRect();
    const anchorStyle=getComputedStyle(anchor);
    /* Roland, Cedric e toda pessoa ou inimigo humano recebem a assinatura rosa
       do reino no balão; outras origens preservam sua própria identidade. */
    const accent=humanSpeaker?HUMAN_REALM_ATTACK_COLOR:(anchorStyle.getPropertyValue('--realm').trim()||anchorStyle.getPropertyValue('--aura-inner-light').trim()||fallbackAccent);
    const margin=8;
    let left=anchorRect.left+anchorRect.width/2-boxRect.width/2;
    left=Math.max(margin,Math.min(window.innerWidth-boxRect.width-margin,left));
    let top=anchorRect.top-boxRect.height-14;
    const minTop=Math.max(arenaRect.top+4,54);
    const below=top<minTop;
    if(below) top=Math.min(window.innerHeight-boxRect.height-margin,anchorRect.bottom+14);
    layer.classList.toggle('bubble-below',below);
    box.style.left=Math.round(left)+'px';
    box.style.top=Math.round(top)+'px';
    box.style.setProperty('--story-tail-x',Math.max(18,Math.min(boxRect.width-18,anchorRect.left+anchorRect.width/2-left))+'px');
    box.style.setProperty('--story-accent',accent);
    layer.classList.add('story-bubble-positioned');
  });
}
function maybeShowStory(idx,onDone=null){
  const seq=[];
  /* As duas falas da missão 10/5 pertencem à encenação temporizada do prólogo,
     não à fila comum de diálogos clicáveis. */
  if(isHumanFinaleBattle()) return false;
  /* v9.3.7 · roteiro oficial do Reino dos Humanos. A primeira entrada usa
     as falas escritas para a missão; repetições mantêm apenas a apresentação
     dos inimigos e uma fala do herói que não pertence ao roteiro. */
  if(worldRun.active&&worldRun.storyMode!==false){
    const roteiro=HUMAN_STORY?.[worldRun.fase]?.missions?.[worldRun.nivel-1];
    if(roteiro){
      const primeira=!storyMissionDone(worldRun.fase,worldRun.nivel);
      if(worldRun.nivel===1 && primeira) seq.push({name:'Narrador',t:HUMAN_STORY[worldRun.fase].before});
      if(primeira && roteiro.length) roteiro.forEach(s=>{
        if(s?.h) seq.push(s);
        else seq.push({...s,sprite:s?.sprite||storySpeakerSprite(s?.name)});
      });
      if(seq.length){
        storyDoneCallback=typeof onDone==='function'?onDone:null;
        storyQueue=[...seq]; renderStoryStep(); return true;
      }
      const regra=STORY_RULES[worldRun.fase];
      const extra=ACTIVE.map(i=>KINGDOMS[i]).find(k=>k&&!regra?.allowed.includes(k.id));
      if(extra) seq.push({h:extra.id,t:extra.frase||`${L(extra.nome)} está pronto para ajudar.`});
    }
  }
  /* Heróis: SÓ os personagens escalados na fase têm diálogo (1ª missão da fase) */
  if(worldRun.active&&activeStageData?.dial){
    activeStageData.dial.forEach(d=>{
      const presente=ACTIVE.some(i=>(KINGDOMS[i].iconId||KINGDOMS[i].id)===d.h||KINGDOMS[i].id===d.h);
      if(presente) seq.push(d);
    });
  }
  /* Inimigos: TODOS se apresentam quando a missão começa; feras só grunhem */
  const ditas=new Set();
  (enemies||[]).forEach((e,enemyIndex)=>{
    const fala=enemyLineFor(e);
    if(ditas.has(e.name+fala)) return; /* dois iguais não repetem a mesma fala */
    ditas.add(e.name+fala);
    seq.push({name:e.name, sprite:e.sprite, t:fala, enemyIndex});
  });
  if(!seq.length) return false;
  storyDoneCallback=typeof onDone==='function'?onDone:null;
  storyQueue=[...seq];
  renderStoryStep();
  return true;
}
function renderStoryStep(){
  const layer=document.getElementById('storyLayer');
  if(!layer) return;
  if(!storyQueue.length){ clearStoryPresentation(); layer.classList.remove('show','cinematic'); layer.style.removeProperty('--story-bg'); layer.setAttribute('aria-hidden','true'); return; }
  clearStoryPresentation();
  const step=storyQueue[0];
  const narrator=!step?.h&&(!step?.name||['narrador','narrator'].includes(storySpeakerToken(step?.name)));
  if(step.h){
    const k=KINGDOMS.find(kk=>kk.id===step.h);
    document.getElementById('storyPortrait').src=k?(k.sprite||k.cardThumb||k.img):'assets/icon.svg';
    document.getElementById('storyName').textContent=k?L(k.nome):T('Narrador','Narrator','Narrador');
    document.getElementById('storyText').textContent=L(step.t);
  }else{
    document.getElementById('storyPortrait').src=step.sprite||'assets/icon.svg';
    document.getElementById('storyName').textContent=L(step.name||'???');
    document.getElementById('storyText').textContent=step.t;
  }
  if(narrator){
    layer.classList.add('narrator-box','cinematic');
    if(activeStageData?.bgUrl) layer.style.setProperty('--story-bg',`url("${activeStageData.bgUrl}")`);
  }else{
    layer.classList.remove('cinematic');
    layer.style.removeProperty('--story-bg');
    layer.classList.add('speaker-bubble');
    layer.dataset.storySpeaker=step.h||storySpeakerToken(step?.name||'');
    const anchor=storySpeakerAnchor(step);
    if(anchor) layer.dataset.storyAnchor=anchor.id;
    else layer.classList.add('story-speaker-fallback');
  }
  layer.classList.add('show');
  layer.setAttribute('aria-hidden','false');
  positionStorySpeechBubble();
}
function advanceStory(){
  storyQueue.shift();
  if(storyQueue.length) renderStoryStep();
  else finishStorySequence();
  sfxSelect();
}
let storyDoneCallback=null;
function finishStorySequence(){
  storyQueue=[];
  clearStoryPresentation();
  document.getElementById('storyLayer')?.classList.remove('show','cinematic');
  document.getElementById('storyLayer')?.setAttribute('aria-hidden','true');
  const done=storyDoneCallback; storyDoneCallback=null;
  if(typeof done==='function') done();
}
function skipStory(complete=true){
  const done=storyDoneCallback; storyDoneCallback=null;
  storyQueue=[]; clearStoryPresentation(); document.getElementById('storyLayer')?.classList.remove('show','cinematic');
  document.getElementById('storyLayer')?.setAttribute('aria-hidden','true');
  if(complete&&typeof done==='function') done();
}
function showStorySequence(seq,onDone=null){
  storyDoneCallback=typeof onDone==='function'?onDone:null;
  if(!seq?.length){ finishStorySequence(); return; }
  storyQueue=[...seq];
  renderStoryStep();
}

/* v9.1 · Perfil: estatísticas de vida do jogador */
function normalizeProfile(raw={}){
  const finite=value=>Number.isFinite(Number(value))?Math.max(0,Math.floor(Number(value))):0;
  const heroUse={};
  if(raw?.heroUse&&typeof raw.heroUse==='object'){
    KINGDOMS.forEach(character=>{
      const uses=finite(raw.heroUse[character.id]);
      if(uses) heroUse[character.id]=uses;
    });
  }
  return {
    wins:finite(raw?.wins),losses:finite(raw?.losses),damage:finite(raw?.damage),
    maxCombo:finite(raw?.maxCombo),powerUps:finite(raw?.powerUps),heroUse
  };
}
let profile=normalizeProfile();
try{ profile=normalizeProfile(JSON.parse(localStorage.getItem('12r_profile')||'{}')); }catch(e){}
function saveProfile(){ localStorage.setItem('12r_profile',JSON.stringify(profile)); }
function flushRunToProfile(won){
  if(won) profile.wins++; else profile.losses++;
  const dealt=Object.values(runStats.damage).reduce((a,b)=>a+b,0);
  profile.damage+=Math.max(0,dealt-(runStats._flushedDamage||0));
  runStats._flushedDamage=dealt;
  profile.maxCombo=Math.max(profile.maxCombo,runStats.maxCombo);
  profile.powerUps+=Math.max(0,runStats.powerUps-(runStats._flushedPU||0));
  runStats._flushedPU=runStats.powerUps;
  if(won) ACTIVE.forEach(i=>{ const id=KINGDOMS[i].id; profile.heroUse[id]=(profile.heroUse[id]||0)+1; });
  saveProfile();
}
function renderProfileStats(){
  const el=document.getElementById('profileStats'); if(!el) return;
  const fav=Object.entries(profile.heroUse).sort((a,b)=>b[1]-a[1])[0];
  const favName=fav?L(KINGDOMS.find(k=>k.id===fav[0])?.nome||fav[0]):'—';
  const towerBest=Number(localStorage.getItem('12r_tower_best')||0);
  const achCount=Object.keys(unlockedAch).length;
  const nextXp=profileXpForNext();
  const rows=[
    [T('Nível do Perfil','Profile Level','Nivel del Perfil'),`Lv ${profileLevel()}${nextXp?` · ${profileXp}/${nextXp} XP`:''}`],
    [T('Vitórias','Wins','Victorias'),profile.wins],[T('Derrotas','Losses','Derrotas'),profile.losses],
    [T('Dano total','Total damage','Daño total'),profile.damage.toLocaleString('pt-BR')],
    [T('Maior combo','Best combo','Mejor combo'),'×'+profile.maxCombo],
    [T('Power-ups criados','Power-ups crafted','Power-ups creados'),profile.powerUps],
    [T('Herói favorito','Favorite hero','Héroe favorito'),favName],
    [T('Melhor andar da Torre','Best tower floor','Mejor piso de la Torre'),towerBest||'—'],
    [T('Moedas','Coins','Monedas'),'🪙 '+coins],
    [T('Conquistas','Achievements','Logros'),`${achCount}/${ACHIEVEMENTS.length}`]
  ];
  el.innerHTML=rows.map(([l,v])=>`<div class="pstat"><small>${escapeHtml(l)}</small><b>${escapeHtml(v)}</b></div>`).join('');
}

/* v10 · Backup de progresso com esquema explícito. Dados de conta, e-mail,
   nascimento e hashes de senha nunca saem do aparelho neste fluxo. */
const SAVE_EXPORT_SCHEMA='12r-progress';
const SAVE_EXPORT_VERSION=10;
const SAVE_EXPORT_EXACT_KEYS=new Set([
  '12r_ach','12r_autoactives','12r_bestiary','12r_bossrush_best','12r_coins','12r_daily',
  '12r_difficulty','12r_fase_best','12r_fase_time','12r_favs','12r_firstwin','12r_formation',
  '12r_haptics','12r_high_contrast','12r_inv','12r_lang','12r_lang_set','12r_large_text',
  '12r_lastteam','12r_motion','12r_music_volume','12r_muted','12r_particles',
  '12r_profile','12r_pxp','12r_quality','12r_quests','12r_reduce_flashes','12r_save',
  '12r_seen','12r_sfx_volume','12r_shake','12r_stars','12r_teams','12r_tower_best',
  '12r_tower_month','12r_tutorial','12r_tutorial_seen','12r_unlocked','12r_viz',
  '12r_viz_defaults','12r_volume','12r_world_humanos','12r_xp'
]);
function isExportableSaveKey(key){
  return SAVE_EXPORT_EXACT_KEYS.has(key)||/^12r_(?:story|story_phase|mechanic|world)_[a-z0-9_-]{1,64}$/i.test(key);
}
function encodeSavePayload(value){
  const bytes=new TextEncoder().encode(JSON.stringify(value));
  let binary='';
  for(let offset=0;offset<bytes.length;offset+=0x8000) binary+=String.fromCharCode(...bytes.subarray(offset,offset+0x8000));
  return btoa(binary);
}
function decodeSavePayload(code){
  const binary=atob(code);
  const bytes=Uint8Array.from(binary,char=>char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
const SAVE_JSON_OBJECT_KEYS=new Set([
  '12r_ach','12r_bestiary','12r_daily','12r_fase_best','12r_fase_time','12r_inv',
  '12r_profile','12r_quests','12r_stars','12r_tower_month','12r_viz','12r_world_humanos'
]);
const SAVE_JSON_ARRAY_KEYS=new Set(['12r_favs','12r_lastteam','12r_seen','12r_teams']);
const SAVE_NONNEGATIVE_INTEGER_KEYS=new Set(['12r_bossrush_best','12r_coins','12r_pxp','12r_tower_best','12r_unlocked']);
function parseImportedJson(value,key){
  try{ return JSON.parse(value); }
  catch(e){ throw new Error(`${key}: JSON inválido`); }
}
function validateImportedSaveEntry(key,value){
  if(!isExportableSaveKey(key)||typeof value!=='string'||value.length>500_000) throw new Error('invalid entry');
  if(SAVE_JSON_OBJECT_KEYS.has(key)||/^12r_world_[a-z0-9_-]{1,64}$/i.test(key)){
    const parsed=parseImportedJson(value,key);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)) throw new Error(`${key}: objeto esperado`);
    if(key==='12r_inv'){
      const sanitized=sanitizeInventory(parsed);
      if(Object.keys(sanitized).length!==Object.keys(parsed).length||Object.entries(parsed).some(([id,count])=>sanitized[id]!==count)) throw new Error(`${key}: inventário inválido`);
    }
    if(key==='12r_bestiary'){
      const sanitized=sanitizeBestiary(parsed);
      if(Object.keys(sanitized).length!==Object.keys(parsed).length||Object.entries(parsed).some(([name,count])=>sanitized[name]!==count)) throw new Error(`${key}: bestiário inválido`);
    }
    if(['12r_fase_best','12r_fase_time'].includes(key)){
      const sanitized=sanitizeNumericRecord(parsed);
      if(Object.keys(sanitized).length!==Object.keys(parsed).length||Object.entries(parsed).some(([recordKey,recordValue])=>sanitized[recordKey]!==recordValue)) throw new Error(`${key}: recordes inválidos`);
    }
    if(key==='12r_tower_month'){
      const sanitized=sanitizeNumericRecord(parsed,{keyPattern:/^\d{4}-\d{2}$/});
      if(Object.keys(sanitized).length!==Object.keys(parsed).length||Object.entries(parsed).some(([recordKey,recordValue])=>sanitized[recordKey]!==recordValue)) throw new Error(`${key}: ranking inválido`);
    }
    if(key==='12r_quests'){
      const sanitized=sanitizeQuestsState(parsed,parsed.date);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(parsed.date||'')||JSON.stringify(sanitized)!==JSON.stringify(parsed)) throw new Error(`${key}: missões inválidas`);
    }
  }
  if(SAVE_JSON_ARRAY_KEYS.has(key)){
    const parsed=parseImportedJson(value,key);
    if(!Array.isArray(parsed)) throw new Error(`${key}: lista esperada`);
    if(key==='12r_teams'){
      if(parsed.length!==3||parsed.some(slot=>slot!==null&&!isValidHeroTeam(slot))) throw new Error(`${key}: equipes inválidas`);
    }
    if(key==='12r_lastteam'&&!isValidHeroTeam(parsed)) throw new Error(`${key}: equipe inválida`);
  }
  if(key==='12r_save'){
    const parsed=parseImportedJson(value,key);
    const validTeam=Array.isArray(parsed?.team)&&parsed.team.length===4&&new Set(parsed.team).size===4&&parsed.team.every(index=>Number.isInteger(index)&&index>=0&&index<KINGDOMS.length);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||!Number.isInteger(Number(parsed.stage))||Number(parsed.stage)<0||!validTeam) throw new Error(`${key}: progresso inválido`);
  }
  if(SAVE_NONNEGATIVE_INTEGER_KEYS.has(key)){
    const number=Number(value);
    if(!Number.isSafeInteger(number)||number<0||number>1_000_000_000) throw new Error(`${key}: número inválido`);
  }
  if(key==='12r_difficulty'&&!['facil','normal','dificil','pesadelo'].includes(value)) throw new Error(`${key}: dificuldade inválida`);
  if(key==='12r_motion'&&!['reduced','full'].includes(value)) throw new Error(`${key}: movimento inválido`);
  if(key==='12r_quality'&&!['auto','high','medium','economy'].includes(value)) throw new Error(`${key}: qualidade inválida`);
  if(key==='12r_formation'){
    const number=Number(value);
    if(!Number.isInteger(number)||number<0||number>=HERO_FORMATIONS.length) throw new Error(`${key}: formação inválida`);
  }
  if(['12r_autoactives','12r_haptics','12r_high_contrast','12r_lang_set','12r_large_text','12r_reduce_flashes','12r_shake','12r_tutorial','12r_tutorial_seen','12r_viz_defaults'].includes(key)&&!['0','1','true','false','9.3.9','10'].includes(value)) throw new Error(`${key}: sinalizador inválido`);
  if(key==='12r_lang'&&!VALID_LANGS.includes(value)) throw new Error(`${key}: idioma inválido`);
  if(['12r_volume','12r_music_volume','12r_sfx_volume'].includes(key)){
    const number=Number(value);
    if(!Number.isFinite(number)||number<0||number>100) throw new Error(`${key}: volume inválido`);
  }
  if(/^12r_(?:story|story_phase|mechanic)_[a-z0-9_-]{1,64}$/i.test(key)&&value!=='1') throw new Error(`${key}: marcador inválido`);
  return [key,value];
}
function exportableLocalSaveKeys(){
  const keys=[];
  for(let index=0;index<localStorage.length;index++){
    const key=localStorage.key(index);
    if(key&&isExportableSaveKey(key)) keys.push(key);
  }
  return keys;
}
function applyImportedSaveEntries(entries){
  const targets=new Set([...exportableLocalSaveKeys(),...entries.map(([key])=>key)]);
  const previous=new Map([...targets].map(key=>[key,localStorage.getItem(key)]));
  try{
    /* Importar significa restaurar o snapshot: progresso exportável ausente
       no backup é removido, enquanto conta/credenciais ficam intocadas. */
    targets.forEach(key=>localStorage.removeItem(key));
    entries.forEach(([key,value])=>localStorage.setItem(key,value));
  }catch(error){
    /* localStorage não possui transações. Remover o lote incompleto antes de
       restaurar reduz a chance de a própria reversão falhar por quota. */
    targets.forEach(key=>localStorage.removeItem(key));
    previous.forEach((value,key)=>{ if(value!==null) localStorage.setItem(key,value); });
    throw error;
  }
}
function buildDailyShareText(){
  const fav=Object.entries(runStats.damage).sort((a,b)=>b[1]-a[1])[0];
  const mvp=fav?L(KINGDOMS[fav[0]]?.nome||'—'):'—';
  const d=new Date();
  const diffLabel={facil:T('Fácil','Easy','Fácil'),normal:'Normal',dificil:T('Difícil','Hard','Difícil'),pesadelo:T('Pesadelo','Nightmare','Pesadilla')}[difficulty]||'Normal';
  return `⚔ ${T('12 Reinos — Desafio Diário','12 Realms — Daily Challenge','12 Reinos — Desafío Diario')} ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}\n`+
    `★${runStats.starsEarned||0} ${T('estrelas','stars','estrellas')} · Combo ×${runStats.maxCombo} · MVP: ${mvp} · ${diffLabel}\n`+
    `https://jcgoliver21.github.io/ygdria-demo/`;
}
async function copyTextToClipboard(text){
  try{ await navigator.clipboard.writeText(text); return true; }
  catch(e){
    const ta=document.createElement('textarea');
    ta.value=text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(err){}
    ta.remove(); return true;
  }
}
function exportSave(){
  const entries={};
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&isExportableSaveKey(key)) entries[key]=localStorage.getItem(key);
  }
  const data={schema:SAVE_EXPORT_SCHEMA,version:SAVE_EXPORT_VERSION,exportedAt:new Date().toISOString(),entries};
  const code=encodeSavePayload(data);
  const ta=document.getElementById('saveCode');
  if(ta){ ta.value=code; ta.select(); }
  copyTextToClipboard(code);
  return code;
}
function importSave(){
  const ta=document.getElementById('saveCode');
  const code=(ta?.value||'').trim();
  if(!code||code.length>1_500_000) return false;
  try{
    const data=decodeSavePayload(code);
    if(data?.schema!==SAVE_EXPORT_SCHEMA||!Number.isInteger(data?.version)||data.version<10||typeof data.entries!=='object'||!data.entries) throw new Error('invalid schema');
    const entries=Object.entries(data.entries).map(([key,value])=>validateImportedSaveEntry(key,value));
    if(entries.length>1000) throw new Error('too many entries');
    applyImportedSaveEntries(entries);
    location.reload();
    return true;
  }catch(e){
    if(ta) ta.value=T('Código inválido — cole o código exportado completo.','Invalid code — paste the full exported code.','Código inválido — pega el código exportado completo.');
    return false;
  }
}

/* v9.1 · Tutorial guiado (primeira batalha) */
const COACH_STEPS_I18N={
  pt:[
    {text:'Bem-vindo aos 12 Reinos! Arraste uma esfera para trocar com a vizinha e formar uma linha de 3 do mesmo reino.', auto:'match'},
    {text:'Quando houver mais de um inimigo, toque nele para mirar. O próximo ataque será direcionado ao alvo marcado.'},
    {text:'Heróis encaram os inimigos à esquerda. Use o botão ↻↺ ao lado da carta no HUD para virar um herói quando precisar.'},
    {text:'Use o botão de formação nas ferramentas táticas para alternar a disposição dos quatro heróis.'},
    {text:'Cada combinação enche a aura. Aos 25%, 50% e 75% os heróis disparam passivas automáticas.'},
    {text:'Combine 4 ou mais esferas para criar power-ups: listrados varrem linhas, embrulhados explodem em área e Prismas Reais limpam cores.'},
    {text:'Com aura em 100%, toque no herói iluminado para lançar a habilidade especial.'},
    {text:'Quando um bloco, uma armadilha ou um efeito de fase aparecer pela primeira vez, a mensagem explicará como ele funciona.'}
  ],
  en:[
    {text:'Welcome to the 12 Realms! Drag a sphere to swap with its neighbor and line up 3 of the same realm.', auto:'match'},
    {text:'When there is more than one enemy, tap one to aim. The next attack goes to the marked target.'},
    {text:'Tap a hero portrait to mirror the character and change which way they face.'},
    {text:'Use the formation button in tactical tools to change the four heroes’ arrangement.'},
    {text:'Every match charges aura. At 25%, 50% and 75% heroes trigger automatic passives.'},
    {text:'Match 4+ spheres to craft power-ups: striped sweep lines, wrapped explode areas and Royal Prisms clear colors.'},
    {text:'At 100% aura, tap the glowing hero to cast their special ability.'},
    {text:'When a block, trap or stage effect appears for the first time, a message explains how it works.'}
  ],
  es:[
    {text:'¡Bienvenido a los 12 Reinos! Arrastra una esfera para intercambiarla y alinear 3 del mismo reino.', auto:'match'},
    {text:'Cuando haya más de un enemigo, toca uno para apuntar. El próximo ataque irá al objetivo marcado.'},
    {text:'Toca el retrato de un héroe para espejarlo y cambiar hacia dónde mira.'},
    {text:'Usa el botón de formación de las herramientas tácticas para cambiar la disposición de los héroes.'},
    {text:'Cada combinación carga el aura. Al 25%, 50% y 75% los héroes activan pasivas automáticas.'},
    {text:'Combina 4+ esferas para crear potenciadores: rayados barren líneas, envueltos explotan áreas y Prismas Reales limpian colores.'},
    {text:'Con aura al 100%, toca al héroe iluminado para lanzar su habilidad especial.'},
    {text:'Cuando aparezca por primera vez un bloque, una trampa o un efecto de fase, un mensaje explicará su funcionamiento.'}
  ]
};
const COACH_STEPS=COACH_STEPS_I18N.pt;
let coachStep=-1;
function renderCoach(){
  const layer=document.getElementById('coachLayer');
  if(!layer) return;
  if(coachStep<0||coachStep>=COACH_STEPS.length){
    layer.classList.remove('show');
    if(coachStep>=COACH_STEPS.length) localStorage.setItem('12r_tutorial','1');
    return;
  }
  layer.classList.add('show');
  const steps=COACH_STEPS_I18N[lang]||COACH_STEPS_I18N.pt;
  const txt=document.getElementById('coachText');
  if(txt) txt.textContent=steps[coachStep].text;
  const btn=document.getElementById('coachNext');
  if(btn) btn.textContent=coachStep>=steps.length-1?T('Vamos lá!','Let\'s go!','¡Vamos!'):T('Entendi','Got it','Entendido');
}
function startCoach(){
  if(localStorage.getItem('12r_tutorial')||towerMode||dailyRunMode) return;
  coachStep=0;
  renderCoach();
}
function explainMechanicOnce(key,text){
  if(!worldRun.active||worldRun.fase===undefined||localStorage.getItem('12r_mechanic_'+key)) return;
  localStorage.setItem('12r_mechanic_'+key,'1');
  setBattleStatus(T('Tutorial: ','Tutorial: ','Tutorial: ')+text,'system');
}
function coachAdvanceOnMatch(){
  if(coachStep===0&&COACH_STEPS[0].auto==='match'){ coachStep=1; renderCoach(); }
}

function playPowerActivationFx(){
  if(reducedMotion||!lastActivatedPowers.length){ lastActivatedPowers=[]; return; }
  const cellPct=100/SIZE;
  lastActivatedPowers.forEach(({r,c,power})=>{
    const fx=document.createElement('div');
    fx.className='pow-fx '+(power.type==='wrapped'?'pow-blast':power.type==='colorBomb'?'pow-prism':(power.orientation==='horizontal'?'pow-sweep-h':'pow-sweep-v'));
    if(power.type==='wrapped'){ fx.style.left=(c*cellPct+cellPct/2)+'%'; fx.style.top=(r*cellPct+cellPct/2)+'%'; }
    else if(power.type==='colorBomb'){ fx.style.setProperty('--cx',(c*cellPct+cellPct/2)+'%'); fx.style.setProperty('--cy',(r*cellPct+cellPct/2)+'%'); }
    else if(power.orientation==='horizontal'){ fx.style.top=(r*cellPct)+'%'; }
    else{ fx.style.left=(c*cellPct)+'%'; }
    if(power.type==='wrapped') sfxPowerWrapped();
    else if(power.type==='colorBomb') sfxPowerPrism();
    else sfxPowerStriped();
    boardEl.appendChild(fx);
    window.setTimeout(()=>fx.remove(),680);
  });
  lastActivatedPowers=[];
}

function createBoard(){
  board = [];
  powerUps = {};
  lastSwap = null;
  forcedResolution = null;
  for(let r=0;r<SIZE;r++){
    const row = [];
    for(let c=0;c<SIZE;c++){
      let color;
      do{ color = randColorIndex(); }
      while(
        (c>=2 && row[c-1]===color && row[c-2]===color) ||
        (r>=2 && board[r-1][c]===color && board[r-2][c]===color)
      );
      row.push(color);
    }
    board.push(row);
  }
  if(applyPowerupQAFixture()) return;
  if(!hasValidMoves()) shuffleBoard(false);
}

/* Repreenche apenas as células livres sem permitir linhas prontas. Usado ao
   atravessar missões na dificuldade Fácil, quando o tabuleiro é preservado. */
function sanitizeBoardWithoutMatches(){
  const open=[];
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(board[r][c]>=0) open.push({r,c});
  for(let pass=0;pass<8;pass++){
    for(const cell of open){
      const choices=ACTIVE.length?ACTIVE:[0];
      let color=choices[Math.floor(gameRandom()*choices.length)];
      let guard=0;
      while(guard++<12){
        const left=cell.c>=2&&board[cell.r][cell.c-1]===color&&board[cell.r][cell.c-2]===color;
        const up=cell.r>=2&&board[cell.r-1][cell.c]===color&&board[cell.r-2][cell.c]===color;
        if(!left&&!up) break;
        color=choices[Math.floor(gameRandom()*choices.length)];
      }
      board[cell.r][cell.c]=color;
    }
    if(findMatches().length===0) return;
  }
  createBoard();
}

/* v9.1 anti-flicker: renderBoard DIFERENCIAL — só reconstrói células cujo conteúdo
   mudou (assinatura valor|power|obstáculo|véu|corAliada). Elimina o "piscar" causado
   pelo rebuild total a cada passo de cascata (que reiniciava todas as animações). */
let boardRenderCache=null;
function gemSignature(r,c){
  const key=cellKey(r,c);
  const v=board[r][c];
  const pw=powerUps[key];
  const ob=obstaclesMeta[key];
  const ag=v>=0?battleGemColors[v]:null;
  return v+'|'+(pw?pw.type+(pw.orientation||''):'')+'|'+(ob?ob.type+ob.hits:'')+'|'+(hiddenGems[key]?1:0)+'|'+(ag?ag.c+(ag.icon||''):'');
}
function renderCellContent(cell,r,c){
  cell.innerHTML='';
  const colorIdx = board[r][c];
  const wrapper = document.createElement('div');
  wrapper.className = 'gem';
  wrapper.dataset.r=r; wrapper.dataset.c=c;
  const power = powerUps[cellKey(r,c)];
  if(colorIdx===-2 && power?.type==='colorBomb'){
    wrapper.dataset.power='colorBomb';
    wrapper.setAttribute('role','button');
    wrapper.setAttribute('tabindex','0');
    wrapper.setAttribute('aria-label',T(`Bomba de cor, linha ${r+1}, coluna ${c+1}`,`Color bomb, row ${r+1}, column ${c+1}`,`Bomba de color, fila ${r+1}, columna ${c+1}`));
    wrapper.innerHTML='<div class="orb power-colorbomb" aria-hidden="true"></div>';
  } else if(colorIdx>=0 && hiddenGems[cellKey(r,c)]){
    const k = KINGDOMS[colorIdx];
    wrapper.dataset.realm = k.id;
    wrapper.setAttribute('role','button');
    wrapper.setAttribute('tabindex','0');
    wrapper.setAttribute('aria-label',T(`Esfera oculta pelo Véu, linha ${r+1}, coluna ${c+1}`,`Sphere hidden by the Veil, row ${r+1}, column ${c+1}`,`Esfera oculta por el Velo, fila ${r+1}, columna ${c+1}`));
    wrapper.innerHTML = '<div class="orb orb-hidden" style="--orb-light:#6b6383;--orb:#241f33;--orb-dark:#0a0812;"><span class="orb-q" aria-hidden="true">?</span></div>';
  } else if(colorIdx>=0){
    const k = KINGDOMS[colorIdx];
    wrapper.dataset.realm = k.id;
    if(power) wrapper.dataset.power=power.type;
    wrapper.setAttribute('role','button');
    wrapper.setAttribute('tabindex','0');
    const powerLabel=power?.type==='striped' ? T(`, power-up listrado ${power.orientation==='horizontal'?'horizontal':'vertical'}`,`, ${power.orientation==='horizontal'?'horizontal':'vertical'} striped power-up`,`, power-up rayado ${power.orientation==='horizontal'?'horizontal':'vertical'}`) : power?.type==='wrapped' ? T(', power-up embrulhado',', wrapped power-up',', power-up envuelto') : '';
    wrapper.setAttribute('aria-label',T(`Esfera do ${L(k.reino)}${powerLabel}, linha ${r+1}, coluna ${c+1}`,`${L(k.reino)} sphere${powerLabel}, row ${r+1}, column ${c+1}`,`Esfera del ${L(k.reino)}${powerLabel}, fila ${r+1}, columna ${c+1}`));
    const powerClass=power?.type==='striped' ? ` power-striped ${power.orientation}` : power?.type==='wrapped' ? ' power-wrapped' : '';
    const ag=battleGemColors[colorIdx];
    wrapper.innerHTML = `<div class="orb orb-${k.id}${powerClass}" data-realm="${k.id}" style="--orb-light:${ag?ag.l:(k.orbColorLight||k.colorLight)};--orb:${ag?ag.c:(k.orbColor||k.color)};--orb-dark:${ag?ag.d:(k.orbColorDark||k.colorDark)};${ag&&ag.icon?`--orb-icon-c:${ag.icon};`:''}">
      <svg class="orb-icon" viewBox="0 0 24 24">${KINGDOM_ICON[k.iconId||k.id]||''}</svg>
    </div>`;
  }
  if(colorIdx===-4){
    const meta=obstaclesMeta[cellKey(r,c)]||{type:'ice',hits:1};
    wrapper.dataset.obstacle=meta.type;
    const obt=OB_TYPES[meta.type]||OB_TYPES.stone;
    wrapper.innerHTML=`<div class="orb obstacle-block ob-${meta.type}${meta.hits>1?' ob-strong':''}" aria-hidden="true"><span class="ob-icon">${obt.icon}</span></div>`;
    wrapper.setAttribute('aria-label',T(`Bloco de ${L(obt.nome)}, linha ${r+1}, coluna ${c+1}`,`${L(obt.nome)} block, row ${r+1}, column ${c+1}`,`Bloque de ${L(obt.nome)}, fila ${r+1}, columna ${c+1}`));
  }
  const fall=lastFallInfo?.[cellKey(r,c)];
  if(fall){
    wrapper.classList.add('falling');
    if(fall.fresh) wrapper.classList.add('fresh');
    wrapper.style.setProperty('--fall-from',(-(fall.rows*106))+'%');
    wrapper.style.setProperty('--fall-dur',(300+fall.rows*45)+'ms');
  }
  if(colorIdx!==-4) attachGemHandlers(wrapper);
  cell.appendChild(wrapper);
}
function renderBoard(){
  const full = !boardRenderCache || boardEl.childElementCount!==SIZE*SIZE;
  if(full){
    boardEl.innerHTML = '';
    boardRenderCache={};
    for(let r=0;r<SIZE;r++){
      for(let c=0;c<SIZE;c++){
        const cell = document.createElement('div');
        cell.className='cell'; cell.dataset.r=r; cell.dataset.c=c;
        renderCellContent(cell,r,c);
        boardRenderCache[cellKey(r,c)]=gemSignature(r,c);
        boardEl.appendChild(cell);
      }
    }
  } else {
    const cells=boardEl.children;
    for(let r=0;r<SIZE;r++){
      for(let c=0;c<SIZE;c++){
        const key=cellKey(r,c);
        const sig=gemSignature(r,c);
        if(boardRenderCache[key]===sig && !(lastFallInfo&&lastFallInfo[key])) continue;
        renderCellContent(cells[r*SIZE+c],r,c);
        boardRenderCache[key]=sig;
      }
    }
    if(!selected) boardEl.querySelectorAll('.gem.selected').forEach(g=>g.classList.remove('selected'));
  }
  lastFallInfo=null;
}

/* ---------- INPUT: click-to-select AND drag/swipe ---------- */
let dragStart = null;
let dragHandled = false;

function attachGemHandlers(el){
  el.addEventListener('pointerdown', onGemPointerDown);
  el.addEventListener('click', onGemClickFallback);
  el.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      handleTapSelect(parseInt(el.dataset.r),parseInt(el.dataset.c));
    }
  });
}

function onGemPointerDown(e){
  if(busy || playerHP<=0) return;
  dragStart = { r:parseInt(e.currentTarget.dataset.r), c:parseInt(e.currentTarget.dataset.c), x:e.clientX, y:e.clientY };
  dragHandled = false;
}

document.addEventListener('pointermove', (e)=>{
  if(!dragStart || dragHandled || busy) return;
  const dx = e.clientX-dragStart.x, dy = e.clientY-dragStart.y;
  const absX=Math.abs(dx), absY=Math.abs(dy);
  if(Math.max(absX,absY) < 14) return;
  let tr=dragStart.r, tc=dragStart.c;
  if(absX>absY){ tc += dx>0?1:-1; } else { tr += dy>0?1:-1; }
  if(tr<0||tr>=SIZE||tc<0||tc>=SIZE){ dragStart=null; return; }
  dragHandled = true;
  clearSelectionVisual();
  const from = {r:dragStart.r,c:dragStart.c}, to = {r:tr,c:tc};
  dragStart = null;
  trySwap(from,to);
});

document.addEventListener('pointerup', ()=>{
  if(dragStart && !dragHandled){
    handleTapSelect(dragStart.r, dragStart.c);
  }
  dragStart = null; dragHandled=false;
});

function onGemClickFallback(e){
  // kept for accessibility (keyboard/assistive click); drag logic above handles real interaction
}

function clearSelectionVisual(){
  if(selected){
    const prevEl = document.querySelector(`.gem[data-r="${selected.r}"][data-c="${selected.c}"]`);
    if(prevEl) prevEl.classList.remove('selected');
    selected = null;
  }
}

function handleTapSelect(r,c){
  if(busy || playerHP<=0) return;
  const el = document.querySelector(`.gem[data-r="${r}"][data-c="${c}"]`);
  if(!selected){
    selected = {r,c};
    if(el) el.classList.add('selected');
    sfxGemTap();
    haptic(8);
    setBattleStatus(T('Esfera selecionada. Escolha uma vizinha para trocar.','Sphere selected. Pick a neighboring one to swap.','Esfera seleccionada. Elige una vecina para intercambiar.'));
    return;
  }
  const prevEl = document.querySelector(`.gem[data-r="${selected.r}"][data-c="${selected.c}"]`);
  if(selected.r===r && selected.c===c){
    if(prevEl) prevEl.classList.remove('selected'); selected=null; return;
  }
  const isAdjacent = (Math.abs(selected.r-r)+Math.abs(selected.c-c))===1;
  if(!isAdjacent){
    if(prevEl) prevEl.classList.remove('selected');
    selected = {r,c};
    if(el) el.classList.add('selected');
    sfxGemTap();
    return;
  }
  if(prevEl) prevEl.classList.remove('selected');
  const from = {...selected}, to = {r,c};
  selected = null;
  trySwap(from,to);
}

function trySwap(from,to){
  if(!canAcceptPlayerInput()) return;
  if(!missionStartMs) startMissionTimer();
  if(board[from.r]?.[from.c]===-4||board[to.r]?.[to.c]===-4){
    renderBoard(); sfxInvalid(); haptic([18,30,18]);
    setBattleStatus(T('Blocos de gelo e pedra não podem ser movidos: quebre-os com combinações vizinhas.','Ice and stone blocks cannot be moved: break them with adjacent matches.','Los bloques de hielo y piedra no se pueden mover: rómpelos con combinaciones vecinas.'));
    return;
  }
  const powerFrom=powerUps[cellKey(from.r,from.c)]||null;
  const powerTo=powerUps[cellKey(to.r,to.c)]||null;
  swapCells(from,to);
  const powerCombo=buildPowerComboResolution(from,to,powerFrom,powerTo);
  const matches = findMatches();
  if(matches.length===0 && !powerCombo){
    swapCells(from,to); renderBoard(); sfxInvalid(); haptic([18,30,18]);
    setBattleStatus(T('Troca inválida: forme uma linha com pelo menos três esferas.','Invalid swap: line up at least three spheres.','Intercambio inválido: forma una línea con al menos tres esferas.'));
  } else {
    busy=true; setBattlePhase('resolving'); comboStep=0; lastSwap={from:{...from},to:{...to}}; forcedResolution=powerCombo; renderBoard(); haptic(powerCombo?[28,18,45]:16);
    setBattleStatus(powerCombo ? powerCombo.label : T(`${matches.length} esferas conectadas. Ataque em preparação!`,`${matches.length} spheres connected. Attack incoming!`,`${matches.length} esferas conectadas. ¡Ataque en preparación!`));
    scheduleCombat(()=>resolveMatches(),120);
  }
}

function swapCells(a,b){
  const tmp=board[a.r][a.c]; board[a.r][a.c]=board[b.r][b.c]; board[b.r][b.c]=tmp;
  const keyA=cellKey(a.r,a.c),keyB=cellKey(b.r,b.c);
  const powerA=powerUps[keyA],powerB=powerUps[keyB];
  if(powerB) powerUps[keyA]=powerB; else delete powerUps[keyA];
  if(powerA) powerUps[keyB]=powerA; else delete powerUps[keyB];
}

function findMatches(){
  const matched=[];
  for(let r=0;r<SIZE;r++){
    let runStart=0;
    for(let c=1;c<=SIZE;c++){
      const same = c<SIZE && board[r][c]>=0 && board[r][c]===board[r][c-1];
      if(!same){ if(c-runStart>=3) for(let k=runStart;k<c;k++) matched.push({r,c:k}); runStart=c; }
    }
  }
  for(let c=0;c<SIZE;c++){
    let runStart=0;
    for(let r=1;r<=SIZE;r++){
      const same = r<SIZE && board[r][c]>=0 && board[r][c]===board[r-1][c];
      if(!same){ if(r-runStart>=3) for(let k=runStart;k<r;k++) matched.push({r:k,c}); runStart=r; }
    }
  }
  const uniq={}; matched.forEach(m=>{ uniq[m.r+'_'+m.c]=m; }); return Object.values(uniq);
}

function findMatchGroups(){
  const groups=[];
  for(let r=0;r<SIZE;r++){
    let start=0;
    for(let c=1;c<=SIZE;c++){
      const same=c<SIZE&&board[r][c]>=0&&board[r][c]===board[r][c-1];
      if(!same){
        if(c-start>=3) groups.push({orientation:'horizontal',color:board[r][start],cells:Array.from({length:c-start},(_,i)=>({r,c:start+i}))});
        start=c;
      }
    }
  }
  for(let c=0;c<SIZE;c++){
    let start=0;
    for(let r=1;r<=SIZE;r++){
      const same=r<SIZE&&board[r][c]>=0&&board[r][c]===board[r-1][c];
      if(!same){
        if(r-start>=3) groups.push({orientation:'vertical',color:board[start][c],cells:Array.from({length:r-start},(_,i)=>({r:start+i,c}))});
        start=r;
      }
    }
  }
  return groups;
}

function uniqueCells(cells){
  const map=new Map();
  cells.forEach(cell=>{ if(cell&&cell.r>=0&&cell.r<SIZE&&cell.c>=0&&cell.c<SIZE) map.set(cellKey(cell.r,cell.c),{r:cell.r,c:cell.c}); });
  return [...map.values()];
}

function cellInList(cell,cells){ return cells.some(item=>item.r===cell.r&&item.c===cell.c); }

function preferredCreator(cells){
  if(lastSwap?.to&&cellInList(lastSwap.to,cells)) return {...lastSwap.to};
  if(lastSwap?.from&&cellInList(lastSwap.from,cells)) return {...lastSwap.from};
  return {...cells[Math.floor(cells.length/2)]};
}

function planCreatedPowerUps(groups){
  const plans=[];
  const membership=new Map();
  groups.forEach((group,index)=>group.cells.forEach(cell=>{
    const key=cellKey(cell.r,cell.c);
    if(!membership.has(key)) membership.set(key,[]);
    membership.get(key).push({group,index});
  }));
  const consumed=new Set();
  for(const [key,items] of membership){
    const horizontal=items.find(item=>item.group.orientation==='horizontal');
    const vertical=items.find(item=>item.group.orientation==='vertical');
    if(horizontal&&vertical&&horizontal.group.color===vertical.group.color){
      const [r,c]=key.split('_').map(Number);
      plans.push({r,c,color:horizontal.group.color,power:{type:'wrapped'}});
      consumed.add(horizontal.index); consumed.add(vertical.index);
    }
  }
  groups.forEach((group,index)=>{
    if(consumed.has(index)||group.cells.length<4) return;
    const creator=preferredCreator(group.cells);
    const type=group.cells.length>=5?'colorBomb':'striped';
    plans.push({
      ...creator,
      color:group.color,
      power:type==='colorBomb'?{type:'colorBomb'}:{type:'striped',orientation:group.orientation}
    });
  });
  const unique=new Map();
  plans.forEach(plan=>unique.set(cellKey(plan.r,plan.c),plan));
  return [...unique.values()];
}

function addRowCells(cells,row){ for(let c=0;c<SIZE;c++) cells.push({r:row,c}); }
function addColumnCells(cells,column){ for(let r=0;r<SIZE;r++) cells.push({r,c:column}); }
function addRadiusCells(cells,row,column,radius){
  for(let r=row-radius;r<=row+radius;r++) for(let c=column-radius;c<=column+radius;c++) cells.push({r,c});
}

function effectCellsForPower(r,c,power,targetColor){
  const cells=[{r,c}];
  if(power.type==='striped'){
    if(power.orientation==='horizontal') addRowCells(cells,r); else addColumnCells(cells,c);
  } else if(power.type==='wrapped'){
    addRadiusCells(cells,r,c,1);
  } else if(power.type==='colorBomb'){
    const color=targetColor>=0?targetColor:ACTIVE[0];
    for(let rr=0;rr<SIZE;rr++) for(let cc=0;cc<SIZE;cc++) if(board[rr][cc]===color) cells.push({r:rr,c:cc});
  }
  return uniqueCells(cells);
}

function expandPowerEffects(initialCells,targetColor){
  const expanded=uniqueCells(initialCells);
  const queue=[...expanded];
  const seenPowers=new Set();
  lastActivatedPowers=[];
  while(queue.length){
    const cell=queue.shift();
    const key=cellKey(cell.r,cell.c);
    const power=powerUps[key];
    if(!power||seenPowers.has(key)) continue;
    seenPowers.add(key);
    lastActivatedPowers.push({r:cell.r,c:cell.c,power});
    for(const extra of effectCellsForPower(cell.r,cell.c,power,targetColor)){
      const extraKey=cellKey(extra.r,extra.c);
      if(!expanded.some(item=>cellKey(item.r,item.c)===extraKey)){
        expanded.push(extra); queue.push(extra);
      }
    }
  }
  return uniqueCells(expanded);
}

function buildPowerComboResolution(from,to,powerFrom,powerTo){
  const hasColorBomb=powerFrom?.type==='colorBomb'||powerTo?.type==='colorBomb';
  if(hasColorBomb){
    if(powerFrom?.type==='colorBomb'&&powerTo?.type==='colorBomb'){
      return {label:T('Dupla Bomba de Cor: todo o tabuleiro foi purificado!','Double Color Bomb: the entire board was purified!','¡Doble Bomba de Color: todo el tablero fue purificado!'),cells:Array.from({length:SIZE*SIZE},(_,i)=>({r:Math.floor(i/SIZE),c:i%SIZE}))};
    }
    const colorBombWasFrom=powerFrom?.type==='colorBomb';
    const otherPower=colorBombWasFrom?powerTo:powerFrom;
    const colorCell=colorBombWasFrom?from:to;
    const targetColor=board[colorCell.r][colorCell.c];
    const targets=[];
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(board[r][c]===targetColor) targets.push({r,c});
    const cells=[from,to,...targets];
    if(otherPower?.type==='striped'){
      targets.forEach((cell,index)=>index%2?addColumnCells(cells,cell.c):addRowCells(cells,cell.r));
      return {label:T('Bomba de Cor + Listrado: uma tempestade de linhas atravessa o tabuleiro!','Color Bomb + Striped: a storm of lines sweeps across the board!','¡Bomba de Color + Rayado: una tormenta de líneas atraviesa el tablero!'),cells:uniqueCells(cells)};
    }
    if(otherPower?.type==='wrapped'){
      targets.forEach(cell=>addRadiusCells(cells,cell.r,cell.c,1));
      return {label:T('Bomba de Cor + Embrulhado: todas as joias da cor explodem em área!','Color Bomb + Wrapped: every gem of that color explodes in an area!','¡Bomba de Color + Envuelto: todas las joyas de ese color explotan en área!'),cells:uniqueCells(cells)};
    }
    return {label:T('Bomba de Cor: todas as joias da cor escolhida foram removidas!','Color Bomb: every gem of the chosen color was removed!','¡Bomba de Color: todas las joyas del color elegido fueron eliminadas!'),cells:uniqueCells(cells)};
  }
  if(!powerFrom||!powerTo) return null;
  const center=to;
  const cells=[from,to];
  if(powerFrom.type==='striped'&&powerTo.type==='striped'){
    addRowCells(cells,center.r); addColumnCells(cells,center.c);
    return {label:T('Dois Listrados: linha e coluna destruídas!','Two Striped: row and column destroyed!','¡Dos Rayados: fila y columna destruidas!'),cells:uniqueCells(cells)};
  }
  if(powerFrom.type==='wrapped'&&powerTo.type==='wrapped'){
    addRadiusCells(cells,center.r,center.c,2);
    return {label:T('Dois Embrulhados: uma explosão 5×5 abalou o tabuleiro!','Two Wrapped: a 5×5 blast shook the board!','¡Dos Envueltos: una explosión 5×5 sacudió el tablero!'),cells:uniqueCells(cells)};
  }
  if((powerFrom.type==='striped'&&powerTo.type==='wrapped')||(powerFrom.type==='wrapped'&&powerTo.type==='striped')){
    for(let offset=-1;offset<=1;offset++){
      if(center.r+offset>=0&&center.r+offset<SIZE) addRowCells(cells,center.r+offset);
      if(center.c+offset>=0&&center.c+offset<SIZE) addColumnCells(cells,center.c+offset);
    }
    return {label:T('Listrado + Embrulhado: três linhas e três colunas foram varridas!','Striped + Wrapped: three rows and three columns were swept!','¡Rayado + Envuelto: tres filas y tres columnas fueron barridas!'),cells:uniqueCells(cells)};
  }
  return null;
}

function hasValidMoves(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      for(const [dr,dc] of [[0,1],[1,0]]){
        const nr=r+dr,nc=c+dc;
        if(nr>=SIZE||nc>=SIZE) continue;
        if(board[r][c]===-4||board[nr][nc]===-4) continue;
        const powerHere=powerUps[cellKey(r,c)],powerThere=powerUps[cellKey(nr,nc)];
        if(powerHere?.type==='colorBomb'||powerThere?.type==='colorBomb'||(powerHere&&powerThere)) return true;
        swapCells({r,c},{r:nr,c:nc});
        const valid=findMatches().length>0;
        swapCells({r,c},{r:nr,c:nc});
        if(valid) return true;
      }
    }
  }
  return false;
}

function shuffleBoard(announce=true){
  // v9.1: embaralha apenas as esferas comuns, preservando power-ups fixos e obstáculos no lugar
  const spots=[];
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(board[r][c]>=0) spots.push({r,c});
  const values=spots.map(({r,c})=>board[r][c]);
  for(let attempt=0;attempt<32;attempt++){
    for(let i=values.length-1;i>0;i--){
      const j=Math.floor(gameRandom()*(i+1));
      [values[i],values[j]]=[values[j],values[i]];
    }
    spots.forEach(({r,c},i)=>{ board[r][c]=values[i]; });
    if(findMatches().length===0 && hasValidMoves()){
      renderBoard();
      if(announce) setBattleStatus(T('O tabuleiro ficou sem jogadas e foi embaralhado automaticamente.','The board had no moves left and was shuffled automatically.','El tablero se quedó sin jugadas y se barajó automáticamente.'));
      return true;
    }
  }
  spots.forEach(({r,c},i)=>{ board[r][c]=ACTIVE[i%ACTIVE.length]; });
  renderBoard();
  if(announce) setBattleStatus(T('As joias foram reorganizadas para criar novas combinações.','The gems were rearranged to create new matches.','Las joyas se reorganizaron para crear nuevas combinaciones.'));
  return false;
}

function allEnemiesDefeated(){
  return enemies.length>0 && enemies.every(enemy=>enemy.hp<=0);
}

function queuePassivesForNextRoom(idx,abilities){
  abilities.filter(a=>a&&a.kind==='passive').forEach(a=>pendingRoomPassives.push({idx,a}));
}

function finishRoomIfCleared(reason=T('Todos os inimigos foram derrotados.','All enemies have been defeated.','Todos los enemigos fueron derrotados.')){
  if(!allEnemiesDefeated() || roomClearScheduled || stageTransitioning) return false;
  if(board.some(row=>row.some(v=>v===-1))){ collapseAndRefill(); renderBoard(); }
  roomClearScheduled=true;
  clearHeroConjurationLoops();
  busy=true;
  setBattlePhase('transition');
  comboStep=0;
  selected=null;
  forcedResolution=null;
  setBattleStatus(reason,'system');
  scheduleCombat(()=>isHumanFinaleBattle()?triggerHumanFinaleCinematic():onStageCleared(),260);
  return true;
}

async function launchPendingRoomPassives(){
  if(!pendingRoomPassives.length || stageTransitioning) return;
  const epoch=combatEpoch;
  const queued=pendingRoomPassives.splice(0);
  busy=true;
  setBattlePhase('heroes');
  setBattleStatus(T('A energia preservada da sala anterior desperta no início do combate.','The energy preserved from the previous room awakens as combat begins.','La energía conservada de la sala anterior despierta al inicio del combate.'),'support');
  for(let i=0;i<queued.length;i++){
    if(epoch!==combatEpoch) return;
    const item=queued[i];
    triggerAbility(item.idx,item.a,{deferRoomCheck:true});
    await wait(900);
    if(allEnemiesDefeated()){
      queued.slice(i+1).forEach(rest=>pendingRoomPassives.push(rest));
      finishRoomIfCleared(T('As passivas preservadas eliminaram todos os inimigos desta sala.','The preserved passives wiped out all enemies in this room.','Las pasivas conservadas eliminaron a todos los enemigos de esta sala.'));
      return;
    }
  }
  if(epoch===combatEpoch){ busy=false; setBattlePhase('idle'); }
}

async function resolveMatches(){
  const epoch = combatEpoch;
  if(allEnemiesDefeated()){ finishRoomIfCleared(); return; }
  const forced=forcedResolution;
  forcedResolution=null;
  const groups=forced?[]:findMatchGroups();
  let matches=forced?uniqueCells(forced.cells):findMatches();
  if(matches.length===0){
    if(allEnemiesDefeated()){ finishRoomIfCleared(); return; }
    if(!hasValidMoves()) shuffleBoard();
    afterPlayerTurn(); return;
  }
  const targetColor=matches.map(cell=>board[cell.r][cell.c]).find(color=>color>=0)??ACTIVE[0];
  const createdPlans=forced?[]:planCreatedPowerUps(groups);
  matches=expandPowerEffects(matches,targetColor);
  playPowerActivationFx();
  const createdByKey=new Map(createdPlans.map(plan=>[cellKey(plan.r,plan.c),plan]));
  lastSwap=null;
  comboStep++; showCombo(comboStep); updateComboRecord(comboStep); sfxMatch(comboStep);
  runStats.maxCombo=Math.max(runStats.maxCombo,comboStep);
  if(comboStep>=3) scheduleCombat(()=>setBattleStatus(`⚡ ${T('Cascata','Cascade','Cascada')} ×${comboStep}!`,'action'),200);
  if(comboStep>=4) questEvent('combo',comboStep);
  if(createdPlans.length){ runStats.powerUps+=createdPlans.length; sfxPowerCreated(); }
  if(createdPlans.length){
    const names=createdPlans.map(plan=>plan.power.type==='colorBomb'?T('Bomba de Cor','Color Bomb','Bomba de Color'):plan.power.type==='wrapped'?T('Embrulhado','Wrapped','Envuelto'):T('Listrado','Striped','Rayado'));
    setBattleStatus(T(`Power-up criado: ${names.join(' + ')}! Continue combinando para ativá-lo.`,`Power-up created: ${names.join(' + ')}! Keep matching to activate it.`,`¡Power-up creado: ${names.join(' + ')}! Sigue combinando para activarlo.`));
  } else {
    setBattleStatus(forced?.label||(comboStep>1 ? T(`Combo x${comboStep}! O dano foi ampliado.`,`Combo x${comboStep}! Damage amplified.`,`¡Combo x${comboStep}! El daño fue amplificado.`) : T('Energia dos Reinos canalizada para o grupo.','Realm energy channeled into the party.','Energía de los Reinos canalizada al grupo.')));
  }

  const colorCounts = {};
  let boardRefilledEarly = false;
  matches.forEach(m=>{
    const color = board[m.r][m.c];
    if(color>=0) colorCounts[color]=(colorCounts[color]||0)+1;
    const gemEl = document.querySelector(`.gem[data-r="${m.r}"][data-c="${m.c}"]`);
    if(gemEl){ gemEl.style.setProperty('--pop-delay',Math.floor(Math.random()*80)+'ms'); gemEl.classList.add('matched'); }
    const key=cellKey(m.r,m.c);
    const created=createdByKey.get(key);
    if(created){
      board[m.r][m.c]=created.power.type==='colorBomb'?-2:created.color;
      powerUps[key]=created.power;
      if(gemEl) gemEl.classList.add('power-created');
    } else {
      board[m.r][m.c]=-1;
      delete powerUps[key];
      if(obstaclesMeta[key]?.type!=='sombra') delete obstaclesMeta[key];
    }
  });
  hitAdjacentObstacles(matches);
  stageCollected+=Object.values(colorCounts).reduce((a,b)=>a+b,0);
  coachAdvanceOnMatch();

  await wait(220);
  if(epoch!==combatEpoch) return;
  collapseAndRefill();
  renderBoard();
  boardRefilledEarly = true;
  await wait(120);
  if(epoch!==combatEpoch) return;

  const multiplier = 1 + 0.25*(comboStep-1);
  setBattlePhase('heroes');
  const buffMult = atkBuffTurns>0 ? (1+atkBuffMult) : 1;

  for(const colorIdxStr of Object.keys(colorCounts)){
    const colorIdx = parseInt(colorIdxStr);
    const count = colorCounts[colorIdxStr];
    const heroAtk = heroAtkBattle(colorIdx);
    const queuedMult = nextAttackMult[colorIdx] || 1;
    const emp=heroEmpower[colorIdx];
    const empMult=(emp&&emp.left>0)?emp.mult:1;
    if(emp&&emp.left>0){ emp.left--; if(emp.left<=0) delete heroEmpower[colorIdx]; }
    const dmg = Math.round(heroAtk * count * multiplier * buffMult * queuedMult * empMult);
    nextAttackMult[colorIdx] = 1;
    const energyDelivered=await flyEnergyToHero(colorIdx);
    if(!energyDelivered||epoch!==combatEpoch) return;
    triggerHeroAttackAnim(colorIdx);
    applyDamageToEnemy(dmg, colorIdx);
    if(KINGDOMS[colorIdx].id==='terra'&&golemAllies>0&&allEnemiesDefeated()===false){
      const golemDamage=Math.round(dmg*.5*golemAllies);
      playSummonAction('golem','attack');
      applyDamageToEnemy(golemDamage,colorIdx);
      setBattleStatus(T(`${golemAllies} golens replicaram ${golemDamage} de dano para Kallendra.`,`${golemAllies} golems echoed ${golemDamage} damage for Kallendra.`,`${golemAllies} gólems replicaron ${golemDamage} de daño para Kallendra.`),'damage');
    }
    if(KINGDOMS[colorIdx].id==='vento'&&harpyAllies>0&&allEnemiesDefeated()===false){
      const harpyDamage=Math.round(dmg*.2*harpyAllies);
      if(harpyDamage>0){
        playSummonAction('harpy','attack');
        applyDamageToEnemy(harpyDamage,colorIdx);
        setBattleStatus(T(`${harpyAllies} harpia(s) replicaram ${harpyDamage} de dano para Sophitia.`,`${harpyAllies} harpy(ies) echoed ${harpyDamage} damage for Sophitia.`,`${harpyAllies} arpía(s) replicaron ${harpyDamage} de daño para Sophitia.`),'damage');
      }
    }
    heroLastDamage[colorIdx] = dmg;
    if(lifestealCharges>0){
      healPlayer(Math.round(heroAtk*lifestealMult));
      lifestealCharges--;
      renderStatusTray();
    }
    await wait(750);
    if(epoch!==combatEpoch) return;
    const { toFire, becameReady } = registerHeroProgress(colorIdx, count);
    if(allEnemiesDefeated()){
      queuePassivesForNextRoom(colorIdx,toFire);
      finishRoomIfCleared(T('A última combinação derrotou todos os inimigos. O combo foi encerrado.','The final match defeated all enemies. The combo has ended.','La última combinación derrotó a todos los enemigos. El combo terminó.'));
      return;
    }
    for(let abilityIndex=0;abilityIndex<toFire.length;abilityIndex++){
      const a=toFire[abilityIndex];
      triggerAbility(colorIdx, a,{deferRoomCheck:true});
      await wait(2000);
      if(epoch!==combatEpoch) return;
      if(allEnemiesDefeated()){
        queuePassivesForNextRoom(colorIdx,toFire.slice(abilityIndex+1));
        finishRoomIfCleared(T('Uma habilidade passiva concluiu a sala. O tabuleiro foi pausado.','A passive ability cleared the room. The board is paused.','Una habilidad pasiva completó la sala. El tablero quedó en pausa.'));
        return;
      }
    }
    if(becameReady){
      showAuraReadyBanner(KINGDOMS[colorIdx]);
      await wait(2000);
      if(epoch!==combatEpoch) return;
    }
  }

  if(allEnemiesDefeated()){ finishRoomIfCleared(); return; }
  if(!boardRefilledEarly) collapseAndRefill();
  renderBoard();
  await wait(380);
  if(epoch===combatEpoch) resolveMatches();
}

async function flyEnergyToHero(colorIdx){
  const epoch=combatEpoch;
  const k = KINGDOMS[colorIdx];
  const heroAvatar = document.getElementById('party-'+k.id+'-avatar');
  if(!heroAvatar || !boardEl.isConnected) return epoch===combatEpoch;
  const boardRect = boardEl.getBoundingClientRect();
  const heroRect = heroAvatar.getBoundingClientRect();
  const startX = boardRect.left + boardRect.width/2;
  const startY = boardRect.top + boardRect.height*0.25;
  const orb = document.createElement('div');
  orb.className = 'energy-orb';
  orb.style.left = startX+'px';
  orb.style.top = startY+'px';
  orb.style.background = `radial-gradient(circle,#fff,${k.color})`;
  orb.style.color = k.color;
  document.body.appendChild(orb);
  requestAnimationFrame(()=>{
    if(!orb.isConnected) return;
    const dx = (heroRect.left+heroRect.width/2) - startX;
    const dy = (heroRect.top+heroRect.height/2) - startY;
    orb.style.transform = `translate(${dx}px, ${dy}px) scale(0.4)`;
    orb.style.opacity = '0.15';
  });
  await wait(380);
  orb.remove();
  return epoch===combatEpoch;
}

function awaitHeroActionAsset(colorIdx,action){
  const k=KINGDOMS[colorIdx];
  const src=k?.sprites?.[action]?.src;
  if(!src||readySpriteAssets.has(src)) return Promise.resolve();
  return preloadSpriteSource(src).catch(()=>{});
}
function triggerHeroAttackAnim(colorIdx){
  const k = KINGDOMS[colorIdx];
  const unit = document.getElementById('party-'+k.id);
  /* A folha corporal já tem antecipação e golpe. Não aplicar uma segunda
     animação no contêiner: em mobile ela concorria com a troca de frames. */
  unit?.classList.remove('attacking','casting');
  playHeroAction(colorIdx,'attack');
  return awaitHeroActionAsset(colorIdx,'attack');
}

function triggerHeroCastAnim(colorIdx){
  const k = KINGDOMS[colorIdx];
  const unit = document.getElementById('party-'+k.id);
  unit?.classList.remove('attacking','casting');
  playHeroAction(colorIdx,'cast');
  return awaitHeroActionAsset(colorIdx,'cast');
}

/* Uma habilidade não deve "virar um ataque" só porque nasceu da aura. Esta
   lista separa o que realmente alcança um adversário (dano, controle ou
   debuff) do que atua no próprio grupo/tabuleiro. A coreografia usa a mesma
   regra para passivas e ativas. */
const ABILITY_OPPONENT_TYPES=new Set([
  'dano','dot','danoDot','curaDano','danoCura','danoDobro','danoTodos','danoUltimoX5',
  'damageAllFromLast','damageAllPartySum','echoAll','critBase','damageFromLast',
  'damageFromHeroLast','damageAllFixed','stunAndDamageFromLast','damagePerRealmGem',
  'danoArea','stunPerRealmGem','freezeBlast','freezeExecute','percentAtualCega','dotAll',
  'laminaDimensional','damageTargetPercent','critBaseAll','weakestHalfOrDamage',
  'damageAllPerRealmGem','damageAllAndVulnerable','sacrificeGolems','blind','atordoa',
  'escudoAtordoa','vulnerableTurns','paralisiaTempo','sombrasDevoradoras'
]);
const ABILITY_IMMEDIATE_DAMAGE_TYPES=new Set([
  'dano','danoDot','curaDano','danoCura','danoDobro','danoTodos','danoUltimoX5',
  'damageAllFromLast','damageAllPartySum','echoAll','critBase','damageFromLast',
  'damageFromHeroLast','damageAllFixed','stunAndDamageFromLast','damagePerRealmGem',
  'danoArea','freezeBlast','freezeExecute','percentAtualCega','laminaDimensional',
  'damageTargetPercent','critBaseAll','weakestHalfOrDamage','damageAllPerRealmGem',
  'damageAllAndVulnerable','sacrificeGolems'
]);
const CONJURATION_LEAD_MS=840;
function abilityTargetsOpponent(ability){ return ABILITY_OPPONENT_TYPES.has(ability?.tipo); }
function abilityDealsImmediateDamage(ability){ return ABILITY_IMMEDIATE_DAMAGE_TYPES.has(ability?.tipo); }

/* v9 · Coreografias de especial por reino: cada builder monta a cena do cast.
   O container recebe --sx/--sy (origem), --tx/--ty (alvo) e --ddx/--ddy (delta). */
const SPECIAL_CAST_BUILDERS={
  fogo(el){ el.innerHTML='<div class="sc-fireball" style="--d:0ms"></div><div class="sc-fireball" style="--d:130ms"></div><div class="sc-fireball" style="--d:260ms"></div><div class="sc-fire-burst"></div>'; },
  agua(el){ el.innerHTML='<div class="maril-water-bubble-sheet" aria-hidden="true"></div>'; },
  luz(el){ el.innerHTML='<div class="sc-lightbeam"></div><div class="sc-lightrays"></div>'; },
  humanos(el){ el.innerHTML='<div class="sc-chrono-ring" style="--d:0ms"></div><div class="sc-chrono-ring" style="--d:160ms"></div><div class="sc-chrono-ring" style="--d:320ms"></div><div class="sc-chrono-hand"></div>'; },
  natureza(el){ el.innerHTML='<div class="sc-vine" style="--vx:-18px;--d:0ms"></div><div class="sc-vine" style="--vx:0px;--d:110ms"></div><div class="sc-vine" style="--vx:18px;--d:220ms"></div>'; },
  terra(el){ el.innerHTML='<div class="sc-boulder" style="--bx:-16px;--d:0ms"></div><div class="sc-boulder" style="--bx:2px;--d:140ms"></div><div class="sc-boulder" style="--bx:18px;--d:280ms"></div><div class="sc-dust-wave"></div>'; },
  areia(el){ el.innerHTML='<div class="sc-sand-gust" style="--gy:-12px;--d:0ms"></div><div class="sc-sand-gust" style="--gy:0px;--d:90ms"></div><div class="sc-sand-gust" style="--gy:12px;--d:180ms"></div><div class="sc-sand-vortex"></div>'; },
  sombras(el){ el.innerHTML='<div class="sc-dark-veil"></div><div class="sc-void-vortex"></div><div class="sc-shadow-claw" style="--d:.42s"></div><div class="sc-shadow-claw" style="--d:.58s"></div>'; },
  raio(el){ el.innerHTML='<div class="sc-bolt" style="--d:.08s"></div><div class="sc-bolt" style="--bx:14px;--d:.3s"></div><div class="sc-shockring"></div>'; },
  vento(el){ el.innerHTML='<div class="sc-cyclone"></div><div class="sc-windslash" style="--d:.12s"></div><div class="sc-windslash" style="--gy:10px;--d:.3s"></div>'; },
  chuvas(el){ el.innerHTML='<div class="sc-raincloud"></div><div class="sc-rainfall"></div>'; },
  gelo(el){ el.innerHTML='<div class="sc-icespike" style="--ix:-20px;--d:0s"></div><div class="sc-icespike" style="--ix:0px;--d:.12s"></div><div class="sc-icespike" style="--ix:20px;--d:.24s"></div><div class="sc-frostburst"></div>'; }
};
const SPECIAL_ABILITY_BUILDERS={
  summonGolems(el){ el.innerHTML='<div class="sc-staff-rune sc-terra-rune"></div><div class="sc-boulder" style="--bx:-20px;--d:0ms"></div><div class="sc-boulder" style="--bx:0px;--d:140ms"></div><div class="sc-boulder" style="--bx:20px;--d:280ms"></div><div class="sc-dust-wave"></div>'; },
  summonHarpies(el){ el.innerHTML='<div class="sc-feather-flock" style="--d:0ms"></div><div class="sc-feather-flock" style="--d:150ms"></div><div class="sc-talon-sweep"></div>'; },
  sacrificeGolems(el){ el.innerHTML='<div class="sc-staff-rune sc-terra-rune"></div><div class="sc-stone-shard" style="--d:0ms"></div><div class="sc-stone-shard" style="--d:110ms"></div><div class="sc-stone-shard" style="--d:220ms"></div>'; },
  laminaDimensional(el){ el.innerHTML='<div class="sc-void-vortex"></div><div class="sc-shadow-claw" style="--d:.18s"></div><div class="sc-shadow-claw" style="--d:.36s"></div><div class="sc-shadow-claw" style="--d:.54s"></div>'; }
};

/* Auras de conjuração aprovadas na vitrine humana. Elas pertencem ao lançador
   (não percorrem o cenário), rodam em uma camada própria e são limpas pelo
   pool de combate. Assim o corpo continua com escala e pés invariáveis. */
const HUMAN_CONJURATION_AURA_DEFAULT=Object.freeze({
  src:'assets/vfx/v13-conjuration/aura-runes/processed/sheet-transparent.png',
  humanPink:true,className:'human-aura'
});
const HUMAN_CONJURATION_AURA_SHEETS=Object.freeze({
  kalander:{src:'assets/vfx/v15-conjuration/special/kalander/processed/sheet-transparent.png',humanPink:true,className:'kalander-aura'},
  bernyce:{src:'assets/vfx/v14-conjuration/special/bernyce/processed/sheet-transparent.png',humanPink:true,className:'bernyce-aura'},
  jules:{src:'assets/vfx/v15-conjuration/special/jules/processed/sheet-transparent.png',humanPink:true,className:'jules-aura'},
  julius:{src:'assets/vfx/v15-conjuration/special/julius/processed/sheet-transparent.png',shadow:true,className:'julius-aura'}
});
function humanConjurationAuraSpec(characterId){
  if(!HUMAN_CHAPTER_BODY_PHYSICS_IDS.has(characterId)) return null;
  return HUMAN_CONJURATION_AURA_SHEETS[characterId]||HUMAN_CONJURATION_AURA_DEFAULT;
}
const GENERIC_CONJURATION_AURA=Object.freeze({
  src:'assets/vfx/v13-conjuration/aura-runes/processed/sheet-transparent.png',
  masked:true,className:'realm-aura'
});
const sustainedHeroConjurations=new Map();
function conjurationAuraSpecFor(character){
  return humanConjurationAuraSpec(character?.id)||GENERIC_CONJURATION_AURA;
}
function spawnHumanConjurationAura(character,source,options={}){
  const spec=conjurationAuraSpecFor(character);
  const layer=document.getElementById('specialFxLayer');
  if(!spec||!layer||!source||!particlesEnabled||reducedMotion) return false;
  const lr=layer.getBoundingClientRect(),sr=source.getBoundingClientRect();
  const fx=acquireCombatFx(`human-conjuration-aura ${spec.className}${options.persistent?' sustained':''}`);
  const lease=fx.__fxLease;
  fx.dataset.fx='human-conjuration-aura';
  fx.dataset.owner=character.id;
  if(options.persistent) fx.dataset.persistent='true';
  fx.style.left=(sr.left-lr.left+sr.width*.5)+'px';
  fx.style.top=(sr.top-lr.top+sr.height*.54)+'px';
  fx.style.setProperty('--conjuration-aura-sheet',`url("${animationAssetUrl(spec.src)}")`);
  fx.style.setProperty('--conjuration-aura-color',character?.colorLight||character?.color||'#fff0d0');
  fx.style.setProperty('--conjuration-aura-filter',spec.shadow
    ? 'brightness(1.26) contrast(1.14) drop-shadow(0 0 10px rgba(185,193,207,.42))'
    : spec.humanPink
      ? 'grayscale(1) sepia(1) saturate(5) hue-rotate(284deg) brightness(1.1) contrast(1.04) drop-shadow(0 0 9px rgba(255,112,183,.84))'
      : 'drop-shadow(0 0 8px rgba(255,255,255,.4))');
  fx.innerHTML='<span class="conjuration-aura-sheet" aria-hidden="true"></span>';
  const sheet=fx.firstElementChild;
  if(spec.masked&&sheet){
    sheet.style.backgroundImage='none';
    sheet.style.backgroundColor='var(--conjuration-aura-color)';
    sheet.style.webkitMaskImage=`url("${animationAssetUrl(spec.src)}")`;
    sheet.style.maskImage=`url("${animationAssetUrl(spec.src)}")`;
  }
  layer.appendChild(fx); trimCombatFx();
  if(!options.persistent) scheduleCombat(()=>releaseCombatFx(fx,lease),900);
  return {fx,lease};
}
/* Aura carregada existe apenas enquanto uma missão está em campo. A vitória e
   a passagem entre salas não podem cortar animações com uma nova conjuração. */
function canRunHeroAuraInMission(){
  return Boolean(
    activeStageData &&
    missionFieldStarted &&
    !stageTransitioning &&
    !roomClearScheduled &&
    !gamePaused &&
    battlePhase!=='transition' &&
    enemies.some(enemy=>enemy.hp>0)
  );
}
function beginHeroConjurationLoop(idx){
  const k=KINGDOMS[idx];
  const avatar=k&&document.getElementById('party-'+k.id+'-avatar');
  const unit=k&&document.getElementById('party-'+k.id);
  if(!k||!avatar||!unit||(heroActiveQueue[idx]||[]).length===0||!canRunHeroAuraInMission()) return false;
  const existing=sustainedHeroConjurations.get(idx);
  if(existing?.avatar===avatar&&avatar.dataset.action==='cast') return true;
  endHeroConjurationLoop(idx,{returnToIdle:false});
  const request=String((Number(avatar.dataset.actionRequest||0)||0)+1);
  avatar.dataset.actionRequest=request;
  const start=()=>{
    if(!avatar.isConnected||avatar.dataset.actionRequest!==request||(heroActiveQueue[idx]||[]).length===0) return;
    animateHeroAvatar(avatar,k,'cast',{loop:true});
  };
  const castSource=k.sprites?.cast?.src;
  const castReady=castSource&&!readySpriteAssets.has(castSource)
    ? preloadSpriteSource(castSource).then(start).catch(()=>{})
    : Promise.resolve().then(start);
  unit.classList.add('conjuring-ready');
  const aura=spawnHumanConjurationAura(k,avatar,{persistent:true});
  sustainedHeroConjurations.set(idx,{avatar,unit,fx:aura?.fx||null,lease:aura?.lease||0,castReady});
  return true;
}
function endHeroConjurationLoop(idx,{returnToIdle=true}={}){
  const record=sustainedHeroConjurations.get(idx);
  const k=KINGDOMS[idx];
  const avatar=record?.avatar||(k&&document.getElementById('party-'+k.id+'-avatar'));
  record?.unit?.classList.remove('conjuring-ready');
  if(record?.fx) releaseCombatFx(record.fx,record.lease);
  sustainedHeroConjurations.delete(idx);
  if(returnToIdle&&avatar&&k&&avatar.dataset.action==='cast') animateHeroAvatar(avatar,k,'idle',{loop:true});
  return Boolean(record);
}
function clearHeroConjurationLoops(){
  [...sustainedHeroConjurations.keys()].forEach(idx=>endHeroConjurationLoop(idx));
}

/* Magias das cartas do Reino dos Humanos: a folha corporal continua sendo a
   animação do personagem, enquanto este segundo plano descreve três etapas
   legíveis, concentração na origem, energia canalizada e emanação até o alvo.
   Nunca reutiliza o VFX do ataque e não altera a escala do sprite. */
const HUMAN_MAGIC_FX_SHEETS=Object.freeze(Object.fromEntries([
  'gareth','cedric','elizier','roland','berenice-jovem','galateia-jovem',
  'adriel-jovem','acqua-jovem','jules','kalander','bernyce','julius'
].map(id=>[id,`assets/vfx/v12-magic/humanos/${id}/cast/processed-v2/sheet-transparent.png`])));
function buildHumanMagicFx(el,characterId){
  const src=HUMAN_MAGIC_FX_SHEETS[characterId];
  if(!src) return false;
  el.innerHTML='<div class="human-magic-fx-sheet" aria-hidden="true"></div>';
  const sheet=el.firstElementChild;
  sheet.style.backgroundImage=`url('${src}')`;
  return true;
}

function launchSpecialFx(idx,a,options={}){
  if(!particlesEnabled) return;
  const k = KINGDOMS[idx];
  /* Cartas novas herdam AUTOMATICAMENTE a coreografia do seu reino (iconId) */
  const realmFx = k.iconId||k.id;
  const layer = document.getElementById('specialFxLayer');
  const source = document.getElementById('party-'+k.id+'-avatar');
  const conjurationOnly=options.conjurationOnly===true;
  const defensive = ['cura','escudo','escudoAtordoa','escudoCura','buff','curaBuff','healPercent','shieldTurns','reflectTurns','invulnerableTurns','lifestealCharges','activateAllUltimates','stoneArmor'].includes(a.tipo);
  const boardEffect = ['doubleRedOnce','spawnPowerUps'].includes(a.tipo);
  const targetIdx = currentTargetIndex();
  const target = conjurationOnly ? source : (boardEffect ? boardEl : (defensive ? document.getElementById('playerHpAnchor') : document.getElementById('enemy-'+targetIdx)));
  if(!layer||!source||!target) return;
  /* Passivas também são habilidades de aura: o corpo conjura antes de qualquer
     ataque. A camada é independente do sprite e nunca muda a estatura. */
  spawnHumanConjurationAura(k,source);
  if(conjurationOnly){
    const lr=layer.getBoundingClientRect(),sr=source.getBoundingClientRect();
    const sx=sr.left-lr.left+sr.width/2-16, sy=sr.top-lr.top+sr.height/2-16;
    const builder=SPECIAL_ABILITY_BUILDERS[a.tipo]||SPECIAL_CAST_BUILDERS[realmFx];
    const castEl=document.createElement('div');
    castEl.className='special-cast sc-'+realmFx+(a.kind==='active'?' ultimate':'');
    castEl.dataset.fx='conjuration';
    castEl.style.setProperty('--sx',sx+'px'); castEl.style.setProperty('--sy',sy+'px');
    castEl.style.setProperty('--tx',sx+'px'); castEl.style.setProperty('--ty',sy+'px');
    castEl.style.setProperty('--ddx','0px'); castEl.style.setProperty('--ddy','0px');
    castEl.style.setProperty('--magic-half-x','0px'); castEl.style.setProperty('--magic-half-y','0px');
    if(!buildHumanMagicFx(castEl,k.id)&&builder) builder(castEl);
    layer.append(castEl);
    trimCombatFx();
    scheduleCombat(()=>castEl.remove(),980);
    return;
  }
  spawnCombatFx('telegraph',target,k.colorLight,500);
  if(reducedMotion||reduceFlashes){
    target.classList.remove('fx-target-flash'); void target.offsetWidth; target.classList.add('fx-target-flash');
    scheduleCombat(()=>target.classList.remove('fx-target-flash'),360);
    return;
  }
  const lr=layer.getBoundingClientRect(),sr=source.getBoundingClientRect(),tr=target.getBoundingClientRect();
  const sx=sr.left-lr.left+sr.width/2-16, sy=sr.top-lr.top+sr.height/2-16;
  const tx=tr.left-lr.left+tr.width/2-16, ty=tr.top-lr.top+tr.height/2-16;
  const ring=document.createElement('div');
  ring.className='impact-ring fx-'+realmFx;
  ring.dataset.fx='impact';
  ring.style.color=k.colorLight; ring.style.setProperty('--tx',tx+'px'); ring.style.setProperty('--ty',ty+'px');
  const builder=SPECIAL_ABILITY_BUILDERS[a.tipo]||SPECIAL_CAST_BUILDERS[realmFx];
  let castEl;
  if(builder){
    castEl=document.createElement('div');
    castEl.className='special-cast sc-'+realmFx+(a.kind==='active'?' ultimate':'');
    castEl.dataset.fx='cast';
    castEl.style.setProperty('--sx',sx+'px'); castEl.style.setProperty('--sy',sy+'px');
    castEl.style.setProperty('--tx',tx+'px'); castEl.style.setProperty('--ty',ty+'px');
    castEl.style.setProperty('--ddx',(tx-sx)+'px'); castEl.style.setProperty('--ddy',(ty-sy)+'px');
    castEl.style.setProperty('--magic-half-x',((tx-sx)*.46)+'px');
    castEl.style.setProperty('--magic-half-y',((ty-sy)*.46)+'px');
    if(!buildHumanMagicFx(castEl,k.id)) builder(castEl);
    layer.append(castEl,ring);
  }else{
    castEl=document.createElement('div');
    castEl.className=`special-projectile fx-${realmFx}${a.kind==='active'?' ultimate':''}`;
    castEl.dataset.fx='projectile';
    castEl.style.setProperty('--sx',sx+'px'); castEl.style.setProperty('--sy',sy+'px');
    castEl.style.setProperty('--tx',tx+'px'); castEl.style.setProperty('--ty',ty+'px');
    layer.append(castEl,ring);
  }
  trimCombatFx();
  /* anti-flicker: flash de arena só em ATIVAS e sem re-trigger empilhado */
  if(a.kind==='active'&&!reduceFlashes&&!arenaEl.classList.contains('fx-flash')){
    arenaEl.classList.add('fx-flash');
    scheduleCombat(()=>arenaEl.classList.remove('fx-flash'), 500);
  }
  if(a.kind==='active') pulseArenaLighting(k.colorLight,target,'critical');
  scheduleCombat(()=>{
    spawnCombatFx('impact',target,k.colorLight,520);
    spawnCombatFx('hit',target,k.colorLight,440);
    spawnRealmParticles(realmFx,target,a.kind==='active'?22:12);
    ring.remove();
  },560);
  scheduleCombat(()=>{ castEl.remove(); ring.remove(); },1600);
}

function registerHeroProgress(idx, count){
  const prev = Math.max(0,heroProgress[idx]||0);
  const gained = Math.max(0,Number(count)||0);
  const rawTotal = prev+gained;
  heroProgress[idx] = rawTotal%100;
  if(!heroActiveQueue[idx]) heroActiveQueue[idx]=[];
  const k = KINGDOMS[idx];
  const toFire = [];
  let becameReady = false;
  const cycles=Math.floor(rawTotal/100);
  k.abilities.forEach(a=>{
    /* at:[25,75] (cartas oficiais): dispara ao cruzar CADA limiar listado (+voltas de 100) */
    if(Array.isArray(a.at)){
      for(let cycle=0;cycle<=cycles;cycle++){
        a.at.forEach(t=>{
          const th=t+cycle*100;
          if(th>prev&&th<=rawTotal){
            if(a.kind==='active'){ heroActiveQueue[idx].push(a); becameReady=true; }
            else toFire.push(a);
          }
        });
      }
      return;
    }
    /* every:true (cartas oficiais): dispara a cada `gems`% cruzado — 25/50/75/100... */
    if(a.every){
      const fires=Math.floor(rawTotal/a.gems)-Math.floor(prev/a.gems);
      for(let i=0;i<fires;i++){
        if(a.kind==='active'){ heroActiveQueue[idx].push(a); becameReady=true; }
        else toFire.push(a);
      }
      return;
    }
    for(let cycle=0;cycle<=cycles;cycle++){
      const threshold=a.gems+(cycle*100);
      if(threshold>prev&&threshold<=rawTotal){
        if(a.kind==='active'){
          heroActiveQueue[idx].push(a);
          becameReady=true;
        }else{
          toFire.push(a);
        }
      }
    }
  });
  if(heroActiveQueue[idx].length){
    heroReady[idx]=true;
    if(canRunHeroAuraInMission()) beginHeroConjurationLoop(idx);
    else endHeroConjurationLoop(idx);
  }else{
    heroReady[idx]=false;
    endHeroConjurationLoop(idx);
  }
  firedTiers[idx]=new Set(k.abilities.filter(a=>a.kind==='passive'&&a.gems<=heroProgress[idx]).map(a=>a.gems));
  updateHeroProgressUI(idx);
  return { toFire, becameReady };
}

function grantActiveSetToAll(){
  ACTIVE.forEach(heroIdx=>{
    if(!heroActiveQueue[heroIdx]) heroActiveQueue[heroIdx]=[];
    KINGDOMS[heroIdx].abilities.filter(a=>a.kind==='active').forEach(a=>{
      heroActiveQueue[heroIdx].push(a);
    });
    heroReady[heroIdx]=true;
    updateHeroProgressUI(heroIdx);
    if(canRunHeroAuraInMission()) beginHeroConjurationLoop(heroIdx);
  });
}

function grantTeamEnergy(amount){
  /* anti-flicker: passivas de vários heróis disparam escalonadas, não no mesmo frame */
  let atraso=0;
  ACTIVE.forEach(heroIdx=>{
    const result=registerHeroProgress(heroIdx,amount);
    if(allEnemiesDefeated()) queuePassivesForNextRoom(heroIdx,result.toFire);
    else result.toFire.forEach(passive=>{
      scheduleCombat(()=>{ if(playerHP>0) triggerAbility(heroIdx,passive,{deferRoomCheck:true}); }, atraso);
      atraso+=450;
    });
  });
}

function countRealmGems(idx){
  let total=0;
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r]?.[c]===idx) total++;
    }
  }
  return total;
}

function spawnRandomPowerUps(quantity=3){
  const candidates=[];
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c]>=0&&!powerUps[cellKey(r,c)]) candidates.push({r,c});
    }
  }
  for(let i=candidates.length-1;i>0;i--){
    const j=Math.floor(gameRandom()*(i+1));
    [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  candidates.slice(0,quantity).forEach((cell,index)=>{
    powerUps[cellKey(cell.r,cell.c)]=index%2
      ? {type:'wrapped'}
      : {type:'striped',orientation:index%4===0?'horizontal':'vertical'};
  });
  renderBoard();
}

function spawnRandomColorBombs(quantity=3){
  const candidates=[];
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c]>=0&&!powerUps[cellKey(r,c)]) candidates.push({r,c});
    }
  }
  for(let i=candidates.length-1;i>0;i--){
    const j=Math.floor(gameRandom()*(i+1));
    [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  candidates.slice(0,quantity).forEach(cell=>{
    board[cell.r][cell.c]=-2;
    powerUps[cellKey(cell.r,cell.c)]={type:'colorBomb'};
  });
  renderBoard();
}

function doubleRealmGemsOnce(heroIdx){
  if(heroIdx===undefined||!KINGDOMS[heroIdx]) return {before:0,after:0,converted:0};
  const realmCells=[];
  const candidates=[];
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      const key=cellKey(r,c);
      if(board[r][c]===heroIdx) realmCells.push({r,c});
      else if(board[r][c]>=0&&!powerUps[key]) candidates.push({r,c});
    }
  }
  for(let i=candidates.length-1;i>0;i--){
    const j=Math.floor(gameRandom()*(i+1));
    [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  const convertedCells=candidates.slice(0,Math.min(realmCells.length,candidates.length));
  convertedCells.forEach(({r,c})=>{ board[r][c]=heroIdx; });
  lastDragonRitual={before:realmCells.length,after:realmCells.length+convertedCells.length,converted:convertedCells.length};
  renderBoard();
  convertedCells.forEach(({r,c})=>{
    const cell=boardEl.querySelector('.cell[data-r="'+r+'"][data-c="'+c+'"]');
    if(cell) cell.classList.add('ritual-converted');
  });
  scheduleCombat(()=>boardEl.querySelectorAll('.ritual-converted').forEach(cell=>cell.classList.remove('ritual-converted')),1050);
  const isFire=KINGDOMS[heroIdx].id==='fogo';
  const label=isFire
    ? T('Ritual do Dragão: '+realmCells.length+' pedras vermelhas tornaram-se '+lastDragonRitual.after,'Dragon Ritual: '+realmCells.length+' red stones became '+lastDragonRitual.after,'Ritual del Dragón: '+realmCells.length+' piedras rojas se convirtieron en '+lastDragonRitual.after)
    : T(L(KINGDOMS[heroIdx].nome)+': '+realmCells.length+' blocos do reino tornaram-se '+lastDragonRitual.after,L(KINGDOMS[heroIdx].nome)+': '+realmCells.length+' realm blocks became '+lastDragonRitual.after,L(KINGDOMS[heroIdx].nome)+': '+realmCells.length+' bloques del reino se convirtieron en '+lastDragonRitual.after);
  setBattleStatus(label+T('. O efeito foi aplicado uma única vez.','. The effect was applied only once.','. El efecto se aplicó una sola vez.'),'support');
  return lastDragonRitual;
}

function doubleRedGemsOnce(){
  const fireIdx=ACTIVE.find(idx=>KINGDOMS[idx].id==='fogo');
  return doubleRealmGemsOnce(fireIdx);
}

function launchAbilityAttackPresentation(idx,a){
  const k=KINGDOMS[idx];
  const source=k&&document.getElementById('party-'+k.id+'-avatar');
  const targetIdx=currentTargetIndex();
  const target=targetIdx>=0?document.getElementById('enemyPortrait-'+targetIdx):null;
  if(!k||!source||!target) return;
  /* Habilidades de controle sem número de dano ainda precisam sair da arma/mão
     e alcançar o alvo. Dano direto já chama este mesmo VFX por applyDamage. */
  spawnCombatAttackFx(k.iconId||k.id,source,target,k.colorLight,'impact',k);
  playEnemyAction(targetIdx,'hit');
  spawnCombatFx('impact',target,k.colorLight,520);
}

function triggerAbility(idx, a, options={}){
  const k = KINGDOMS[idx];
  if(!k||!a) return false;
  explainMechanicOnce('ability-'+a.name,`${L(a.name)}: ${L(a.desc||'habilidade especial do personagem')}`);
  const isPassive=a.kind==='passive';
  const targetsOpponent=abilityTargetsOpponent(a);
  const fromSustained=options.fromSustained===true;
  showAbilityBanner(k, a, isPassive);
  /* Toda habilidade nasce em conjuração. A ativa já carregada conserva a
     própria pose/aura até o toque; nesse caso não reiniciamos o loop. */
  if(isPassive){ sfxPassive(); }
  else{ sfxUltimate(); sfxElemental(k.iconId||k.id); showUltimateCutin(k,a); }
  sfxHeroSignature(k.iconId||k.id,!isPassive);
  setBattleStatus(T(`${L(k.nome).split(',')[0]} lançou ${L(a.name)}.`,`${L(k.nome).split(',')[0]} cast ${L(a.name)}.`,`${L(k.nome).split(',')[0]} lanzó ${L(a.name)}.`));
  haptic(isPassive ? 22 : [35,20,70]);
  const resolveAbility=async()=>{
    if(targetsOpponent){
      await triggerHeroAttackAnim(idx);
      if(!abilityDealsImmediateDamage(a)) launchAbilityAttackPresentation(idx,a);
    }
  switch(a.tipo){
    case 'dano': applyDamageToEnemy(a.valor, idx); break;
    case 'dot': addDot(a.valor, a.turnos); break;
    case 'danoDot': applyDamageToEnemy(a.valor, idx); addDot(a.dot, a.turnos, undefined, L(a.name||'Dano contínuo')); break;
    case 'cura': healPlayer(a.valor); break;
    case 'curaDano': healPlayer(a.valor); applyDamageToEnemy(a.dano, idx); break;
    case 'danoCura': applyDamageToEnemy(a.valor, idx); healPlayer(a.valor); break;
    case 'escudo': addShield(a.valor); break;
    case 'atordoa': addStun(a.valor); break;
    case 'escudoAtordoa': addShield(a.valor); addStun(a.turnos); break;
    case 'escudoCura': addShield(a.valor); healPlayer(a.cura); break;
    case 'buff': addBuff(a.valor, a.turnos); break;
    case 'curaBuff': healPlayer(a.valor); addBuff(a.mult, a.turnos); break;
    case 'danoDobro': if(lastDamageDealt>0) applyDamageToEnemy(lastDamageDealt, idx); break;
    case 'danoTodos': if(lastDamageDealt>0) applyDamageToAllEnemies(lastDamageDealt, idx); break;
    case 'danoUltimoX5': if(lastDamageDealt>0) applyDamageToEnemy(lastDamageDealt*5, idx); break;
    case 'nextAttackMult': nextAttackMult[idx]=a.valor||2; break;
    case 'blind': enemyBlindTurns=Math.max(enemyBlindTurns,a.turnos||1); break;
    case 'healPercent': healPlayer(Math.round(PLAYER_MAX_HP*a.valor)); break;
    case 'damageAllFromLast': if(lastDamageDealt>0) applyDamageToAllEnemies(Math.round(lastDamageDealt*(a.mult||1)),idx); break;
    case 'damageAllPartySum': {
      const partyTotal=ACTIVE.reduce((sum,heroIdx)=>sum+(heroLastDamage[heroIdx]||0),0);
      if(partyTotal>0) applyDamageToAllEnemies(Math.round(partyTotal*(a.mult||1)),idx);
      break;
    }
    case 'shieldTurns': addShield(a.valor||400,a.turnos||1); break;
    case 'echoAll': if(lastDamageDealt>0) applyDamageToAllEnemies(lastDamageDealt,idx); break;
    case 'critBase': applyDamageToEnemy(Math.round(heroAtkBattle(idx)*(a.mult||5)),idx); break;
    case 'activateAllUltimates':
      grantActiveSetToAll();
      break;
    case 'lifestealCharges':
      lifestealCharges=a.cargas||3; lifestealMult=a.mult||5;
      break;
    case 'damageFromLast': if(lastDamageDealt>0) applyDamageToEnemy(Math.round(lastDamageDealt*(a.mult||1)),idx); break;
    case 'reflectTurns': reflectTurns=Math.max(reflectTurns,a.turnos||1); break;
    case 'invulnerableTurns': invulnerableTurns=Math.max(invulnerableTurns,a.turnos||1); break;
    case 'damageFromHeroLast': {
      const heroDamage=heroLastDamage[idx]||lastDamageDealt;
      if(heroDamage>0) applyDamageToEnemy(Math.round(heroDamage*(a.mult||1)),idx);
      break;
    }
    case 'damageAllFixed': applyDamageToAllEnemies(a.valor||100,idx); break;
    case 'doubleRedOnce': doubleRedGemsOnce(); break;
    case 'incinerate': incinerateActive=true; incinerateStacks=0; break;
    case 'energyAll': grantTeamEnergy(a.valor||10); break;
    case 'stunAndDamageFromLast':
      addStun(a.turnos||1);
      if(lastDamageDealt>0) applyDamageToEnemy(Math.round(lastDamageDealt*(a.mult||1)),idx);
      break;
    case 'spawnPowerUps':
      spawnRandomPowerUps(a.quantidade||3);
      setBattleStatus(T(`${L(k.nome)} fez nascer ${a.quantidade||3} power-ups no tabuleiro.`,`${L(k.nome)} conjured ${a.quantidade||3} power-ups onto the board.`,`${L(k.nome)} hizo aparecer ${a.quantidade||3} power-ups en el tablero.`),'support');
      break;
    case 'healPerRealmGem': {
      const realmGems=countRealmGems(idx);
      healPlayer(realmGems*(a.valor||100));
      setBattleStatus(T(`${realmGems} joias do reino recuperaram ${realmGems*(a.valor||100)} de HP.`,`${realmGems} realm gems restored ${realmGems*(a.valor||100)} HP.`,`${realmGems} joyas del reino recuperaron ${realmGems*(a.valor||100)} de vida.`),'support');
      break;
    }
    case 'damagePerRealmGem': {
      const realmGems=countRealmGems(idx);
      applyDamageToEnemy(realmGems*(a.valor||100),idx);
      break;
    }
    case 'danoArea':
      applyDamageToEnemy(a.valor||300, idx);
      applyDamageToAllEnemies(a.area||150, idx);
      break;
    case 'stunPerRealmGem': {
      const turnosGelo=Math.max(1,Math.floor(countRealmGems(idx)/(a.divisor||4)));
      addStun(turnosGelo);
      setBattleStatus(T(`Bola de Neve: o inimigo foi atordoado por ${turnosGelo} turno(s).`,`Snowball: the enemy was stunned for ${turnosGelo} turn(s).`,`Bola de Nieve: el enemigo quedó aturdido por ${turnosGelo} turno(s).`),'support');
      break;
    }
    case 'freezeBlast': {
      const gemasGelo=countRealmGems(idx);
      applyDamageToAllEnemies((a.valor||100)+gemasGelo*(a.porGema||20), idx);
      addStun(a.turnos||1);
      setBattleStatus(T(`Geada Branca: ${gemasGelo} peça(s) do reino ampliaram o dano e congelaram os inimigos.`,`White Frost: ${gemasGelo} realm piece(s) amplified the damage and froze the enemies.`,`Escarcha Blanca: ${gemasGelo} pieza(s) del reino ampliaron el daño y congelaron a los enemigos.`),'combat');
      break;
    }
    case 'freezeExecute': {
      const alvoGelo=currentTargetIndex();
      addStun(a.turnos||5);
      if(alvoGelo>=0&&enemies[alvoGelo]&&enemies[alvoGelo].hp>0) applyDamageToEnemy(Math.max(1,Math.floor(enemies[alvoGelo].hp/2)),idx,alvoGelo);
      break;
    }
    case 'dotAll':
      enemies.forEach((e,i)=>{ if(e.hp>0) addDot(a.valor||30,a.turnos||999,i,L(a.name||'Chuva')); });
      setBattleStatus(T(`${L(k.nome)} invocou uma chuva contínua sobre todos os inimigos.`,`${L(k.nome)} summoned an endless rain over all enemies.`,`${L(k.nome)} invocó una lluvia continua sobre todos los enemigos.`),'support');
      break;
    case 'spawnColorBombs':
      spawnRandomColorBombs(a.quantidade||3);
      setBattleStatus(T(`${L(k.nome)} inscreveu ${a.quantidade||3} Bombas de Cor no tabuleiro.`,`${L(k.nome)} inscribed ${a.quantidade||3} Color Bombs on the board.`,`${L(k.nome)} inscribió ${a.quantidade||3} Bombas de Color en el tablero.`),'support');
      break;
    case 'summonHarpies': {
      const novasHarpias=Math.min(5-harpyAllies,a.quantidade||2);
      if(novasHarpias>0){
        harpyAllies+=novasHarpias;
        renderHarpyUnits(true);
        setBattleStatus(T(`${novasHarpias} Harpia(s) juntaram-se a ${L(k.nome)}. Cada uma replica 20% do dano dela.`,`${novasHarpias} Harpy(ies) joined ${L(k.nome)}. Each echoes 20% of her damage.`,`${novasHarpias} Arpía(s) se unieron a ${L(k.nome)}. Cada una replica el 20% de su daño.`),'support');
      } else setBattleStatus(T('Sophitia já lidera o máximo de cinco harpias.','Sophitia already leads the maximum of five harpies.','Sophitia ya lidera el máximo de cinco arpías.'),'system');
      break;
    }
    case 'empowerAttacks':
      heroEmpower[idx]={left:a.cargas||3,mult:a.mult||2};
      setBattleStatus(T(`${L(k.nome)} concentrou ${a.cargas||3} esferas de energia: os próximos ${a.cargas||3} ataques serão multiplicados por ${a.mult||2}.`,`${L(k.nome)} focused ${a.cargas||3} energy spheres: the next ${a.cargas||3} attacks will be multiplied by ${a.mult||2}.`,`${L(k.nome)} concentró ${a.cargas||3} esferas de energía: los próximos ${a.cargas||3} ataques se multiplicarán por ${a.mult||2}.`),'support');
      break;
    case 'hecatombe': {
      const roxas=countRealmGems(idx);
      if(roxas>0) applyDamageToAllEnemies(roxas*(a.valor||150), idx);
      addStun(1);
      enemies.forEach((e,i)=>{ if(e.hp>0) addDot(50,2,i,T('Eletrocutado','Electrocuted','Electrocutado')); });
      setBattleStatus(T(`Hecatombe: ${roxas} peça(s) roxa(s) canalizaram a fúria dos trovões.`,`Hecatomb: ${roxas} purple piece(s) channeled the fury of the thunder.`,`Hecatombe: ${roxas} pieza(s) morada(s) canalizaron la furia de los truenos.`),'combat');
      break;
    }
    case 'healFixed': healPlayer(a.valor||300); break;
    case 'percentAtualCega': { const ti=currentTargetIndex(); if(ti>=0){ applyDamageToEnemy(Math.max(1,Math.round(enemies[ti].hp*(a.pct||0.2))),idx,ti); enemyBlindTurns+=1; } break; }
    case 'paralisiaTempo': { const ti=currentTargetIndex(); if(ti>=0){ enemies[ti].timeStopped=true; setBattleStatus(T(`O tempo de ${L(enemies[ti].name)} foi paralisado!`,`${L(enemies[ti].name)}'s time has been frozen!`,`¡El tiempo de ${L(enemies[ti].name)} fue paralizado!`)); } break; }
    case 'sombrasDevoradoras': sombrasDevoradorasOn=true; break;
    case 'laminaDimensional': {
      enemies.forEach((e2,i2)=>{ if(e2.hp>0) applyDamageToEnemy(Math.max(1,Math.round(e2.maxHp*0.10)),idx,i2); });
      pendingDimensional.push([8,6,4,2]);
      setBattleStatus(T('As sombras dimensionais avançam sobre as próximas missões...','Dimensional shadows advance upon the coming missions...','Las sombras dimensionales avanzan sobre las próximas misiones...'));
      break;
    }
    case 'corteDuplo': nextAttackMult[idx]=Math.max(nextAttackMult[idx]||1,2); break;
    case 'reducaoDano': damageReductionStacks=Math.min(2,damageReductionStacks+1); break;
    case 'impetoRainha': queenFuryStacks++; break;
    case 'chamariz': chamarizCharges++; break;
    case 'vulnerableTurns':
      enemyVulnerableTurns=Math.max(enemyVulnerableTurns,a.turnos||1);
      enemyVulnerableMult=Math.max(enemyVulnerableMult,a.mult||2);
      setBattleStatus(T(`Os inimigos receberão ${enemyVulnerableMult}× de dano por ${enemyVulnerableTurns} turno(s).`,`Enemies will take ${enemyVulnerableMult}× damage for ${enemyVulnerableTurns} turn(s).`,`Los enemigos recibirán ${enemyVulnerableMult}× de daño durante ${enemyVulnerableTurns} turno(s).`),'support');
      break;
    case 'damageTargetPercent': {
      const alvo=lastEnemyAttacker!==null && enemies[lastEnemyAttacker]?.hp>0 ? lastEnemyAttacker : currentTargetIndex();
      if(alvo>=0&&enemies[alvo]&&enemies[alvo].hp>0) applyDamageToEnemy(Math.max(1,Math.round(enemies[alvo].maxHp*(a.valor||.1))),idx,alvo);
      break;
    }
    case 'critBaseAll': applyDamageToAllEnemies(Math.round(heroAtkBattle(idx)*(a.mult||3)),idx); break;
    case 'nextAttackPerRealmGem': {
      const realmGems=Math.min(12,Math.max(1,countRealmGems(idx)));
      nextAttackMult[idx]=realmGems;
      setBattleStatus(T(`O próximo ataque de ${L(k.nome)} será multiplicado por ${realmGems} bloco(s) do reino (máx. 12).`,`${L(k.nome)}'s next attack will be multiplied by ${realmGems} realm block(s) (max 12).`,`El próximo ataque de ${L(k.nome)} se multiplicará por ${realmGems} bloque(s) del reino (máx. 12).`),'support');
      break;
    }
    case 'weakestHalfOrDamage': {
      const vivos=enemies.map((e,i)=>({e,i})).filter(({e})=>e.hp>0).sort((x,y)=>x.e.hp-y.e.hp);
      const fraco=vivos[0];
      if(fraco) applyDamageToEnemy(vivos.length>1?Math.max(1,Math.floor(fraco.e.hp/2)):(a.valor||300),idx,fraco.i);
      break;
    }
    case 'damageAllPerRealmGem': {
      const realmGems=countRealmGems(idx);
      if(realmGems>0) applyDamageToAllEnemies(realmGems*(a.valor||50),idx);
      setBattleStatus(T(`${realmGems} peça(s) do reino guiaram o ataque de ${L(k.nome)}.`,`${realmGems} realm piece(s) guided ${L(k.nome)}'s attack.`,`${realmGems} pieza(s) del reino guiaron el ataque de ${L(k.nome)}.`),'combat');
      break;
    }
    case 'doubleRealmOnce': doubleRealmGemsOnce(idx); break;
    case 'stoneArmor':
      stoneArmorTurns=Math.max(stoneArmorTurns,a.turnos||2);
      stoneArmorReduction=a.reducao||.5;
      stoneArmorReflect=a.reflexao||.5;
      pulseHpEffect('shield',1150);
      break;
    case 'damageAllAndVulnerable':
      applyDamageToAllEnemies(a.valor||100,idx);
      enemyVulnerableTurns=Math.max(enemyVulnerableTurns,a.turnos||2);
      enemyVulnerableMult=Math.max(enemyVulnerableMult,a.mult||1.25);
      break;
    case 'summonGolems':
      {
        const summoned=Math.min(4,Math.max(0,a.quantidade||2));
        const available=4-golemAllies;
        const added=Math.min(summoned,available);
        if(added>0){
          golemAllies+=added;
          renderGolemUnits(true);
          setBattleStatus(T(`${L(k.nome)} invocou ${added} golens ao seu lado. Cada um replica metade do dano de Kallendra.`,`${L(k.nome)} summoned ${added} golems to her side. Each echoes half of Kallendra's damage.`,`${L(k.nome)} invocó ${added} gólems a su lado. Cada uno replica la mitad del daño de Kallendra.`),'support');
        }else{
          setBattleStatus(T('Kallendra já possui o máximo de quatro golens aliados.','Kallendra already commands the maximum of four allied golems.','Kallendra ya tiene el máximo de cuatro gólems aliados.'),'system');
        }
      }
      break;
    case 'sacrificeGolems':
      if(golemAllies>=(a.quantidade||2)){
        golemAllies-=a.quantidade||2;
        renderGolemUnits();
        applyDamageToEnemy(a.valor||1000,idx);
      }else{
        setBattleStatus(T(`${L('Terra Viva')} requer dois golens aliados.`,`${L('Terra Viva')} requires two allied golems.`,`${L('Terra Viva')} requiere dos gólems aliados.`),'system');
      }
      break;
  }
  renderStatusTray();
  if(!options.deferRoomCheck&&allEnemiesDefeated()){
    scheduleCombat(()=>finishRoomIfCleared(T(`${L(a.name)} derrotou todos os inimigos da sala.`,`${L(a.name)} defeated every enemy in the room.`,`${L(a.name)} derrotó a todos los enemigos de la sala.`)),40);
  }
    if(options.resumeConjuration){
      scheduleCombat(()=>beginHeroConjurationLoop(idx),targetsOpponent?780:260);
    }else if(fromSustained&&!targetsOpponent){
      /* Uma ativa de cura/suporte não ataca: ela conclui a conjuração e o
         personagem retorna ao idle depois da liberação visual. */
      scheduleCombat(()=>{
        const avatar=document.getElementById('party-'+k.id+'-avatar');
        if(avatar?.dataset.action==='cast') animateHeroAvatar(avatar,k,'idle',{loop:true});
      },520);
    }
  };
  /* A duração respeita a folha corporal 3×2 e mantém a leitura temporal:
     conjurar → atacar (se houver alvo) → efeito. */
  const castReady=fromSustained?(options.castReady||Promise.resolve()):triggerHeroCastAnim(idx);
  const scheduleResolve=()=>{
    /* A pose corporal entra primeiro. Só depois dela estar renderizável o VFX
       de conjuração aparece e começa a janela para o ataque/efeito. */
    if(!fromSustained) launchSpecialFx(idx,a,{conjurationOnly:true});
    scheduleCombat(()=>{ void resolveAbility(); },fromSustained?140:CONJURATION_LEAD_MS);
  };
  Promise.resolve(castReady).then(scheduleResolve,scheduleResolve);
  return {targetsOpponent,delay:fromSustained?140:CONJURATION_LEAD_MS};
}

function showAbilityBanner(k, a, isTierMessage){
  document.getElementById('abHero').textContent = L(k.nome)+' · '+L(k.classe);
  const banner = document.getElementById('abilityBanner');
  if(isTierMessage){
    document.getElementById('abName').textContent = T('✨ Acumulando Aura','✨ Charging Aura','✨ Acumulando Aura');
    document.getElementById('abDesc').textContent = `${L(a.name)}: ${L(a.desc)}`;
    banner.classList.remove('aura-ready');
  } else {
    document.getElementById('abName').textContent = '✦ '+L(a.name);
    document.getElementById('abDesc').textContent = L(a.desc);
    banner.classList.remove('aura-ready');
  }
  /* anti-flicker: banners em sequência atualizam o texto sem reiniciar a animação */
  const agoraB=performance.now();
  if(!(banner._lastShow && agoraB-banner._lastShow<900 && banner.classList.contains('show'))){
    banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
  }
  banner._lastShow=agoraB;
}

function showAuraReadyBanner(k){
  document.getElementById('abHero').textContent = L(k.nome)+' · '+L(k.classe);
  document.getElementById('abName').textContent = T('🌟 HABILIDADE ATIVA CARREGADA 🌟','🌟 ACTIVE ABILITY CHARGED 🌟','🌟 HABILIDAD ACTIVA CARGADA 🌟');
  document.getElementById('abDesc').textContent = T(`Toque em ${L(k.nome)} no campo de batalha para escolher uma habilidade acumulada.`,`Tap ${L(k.nome)} on the battlefield to choose a stored ability.`,`Toca a ${L(k.nome)} en el campo de batalla para elegir una habilidad acumulada.`);
  const banner = document.getElementById('abilityBanner');
  banner.classList.add('aura-ready');
  /* anti-flicker: banners em sequência atualizam o texto sem reiniciar a animação */
  const agoraB=performance.now();
  if(!(banner._lastShow && agoraB-banner._lastShow<900 && banner.classList.contains('show'))){
    banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
  }
  banner._lastShow=agoraB;
  sfxUltimate();
}

function healPlayer(amount){
  playerHP = Math.min(PLAYER_MAX_HP, playerHP+amount);
  updatePlayerHP();
  pulseHpEffect('heal',1050);
  showFloatDamage(amount, 'playerHpAnchor', false);
  const anchor = document.getElementById('playerHpAnchor');
  if(anchor){
    const el = anchor.querySelector('.dmg-float:last-child');
    if(el){ el.textContent = '+'+amount; el.style.color = '#8fffb0'; }
  }
}

function addShield(amount,turns=0){
  playerShield += amount;
  shieldTurns=Math.max(shieldTurns,turns);
  pulseHpEffect('shield',1150);
  renderStatusTray();
}
function addStun(turns){ enemyStunTurns += turns; }
function addDot(dmgPerTurn, turns, targetIdx=currentTargetIndex(), label=T('Dano contínuo','Damage over time','Daño continuo')){
  if(targetIdx<0) return;
  enemyDots.push({dmgPerTurn, turns, targetIdx, label});
  renderStatusTray();
}
function addBuff(mult, turns){
  const numeric=Number(mult)||0;
  atkBuffMult = numeric>1 ? numeric-1 : numeric;
  atkBuffTurns = turns;
}

function showCombo(step){
  comboTextEl.textContent = `COMBO x${step}`;
  comboTextEl.classList.remove('show');
  void comboTextEl.offsetWidth;
  comboTextEl.classList.add('show');
}

function collapseAndRefill(){
  const oldPowerUps={...powerUps};
  const nextPowerUps={};
  const oldObstacles={...obstaclesMeta};
  const nextObstacles={};
  lastFallInfo={};
  for(let c=0;c<SIZE;c++){
    let pointer = SIZE-1;
    for(let r=SIZE-1;r>=0;r--){
      if(board[r][c]!==-1){
        board[pointer][c]=board[r][c];
        const power=oldPowerUps[cellKey(r,c)];
        if(power) nextPowerUps[cellKey(pointer,c)]=power;
        const obst=oldObstacles[cellKey(r,c)];
        if(obst) nextObstacles[cellKey(pointer,c)]=obst;
        if(pointer!==r){ board[r][c]=-1; lastFallInfo[cellKey(pointer,c)]={rows:pointer-r,fresh:false}; }
        pointer--;
      }
    }
    const spawnFall=pointer+1;
    for(let r=pointer;r>=0;r--){ board[r][c]=randColorIndex(); lastFallInfo[cellKey(r,c)]={rows:spawnFall,fresh:true}; }
  }
  powerUps=nextPowerUps;
  obstaclesMeta=nextObstacles;
}


function applyDamageToEnemy(dmg, colorIdx, targetIdxOverride){
  const idx = (targetIdxOverride!==undefined && targetIdxOverride!==null) ? targetIdxOverride : currentTargetIndex();
  if(idx===-1 || !enemies[idx] || enemies[idx].hp<=0) return;
  const enemy = enemies[idx];
  const attemptedDamage=Math.max(0,Math.round(dmg*(enemyVulnerableTurns>0?enemyVulnerableMult:1)*(1+0.2*queenFuryStacks)));
  const finalDamage=Math.min(enemy.hp,attemptedDamage);
  if(incinerateActive && colorIdx!==null && colorIdx!==undefined && targetIdxOverride===undefined){
    incinerateStacks += 50;
    addDot(incinerateStacks,3,idx,T('Incinerar','Incinerate','Incinerar'));
  }
  enemy.hp = Math.max(0, enemy.hp - finalDamage);
  if(enemy.hp<=0 && !enemy.__bestReg){ enemy.__bestReg=true; registerBestiary(enemy.name); }
  lastDamageDealt = finalDamage;
  if(colorIdx!==null && colorIdx!==undefined){
    heroLastDamage[colorIdx]=finalDamage;
    runStats.damage[colorIdx]=(runStats.damage[colorIdx]||0)+finalDamage;
    { const kD=KINGDOMS[colorIdx]; const elD=kD&&document.getElementById('dps-'+kD.id);
      if(elD) elD.textContent='⚔ '+runStats.damage[colorIdx]; }
  }
  sfxCombatAttack(colorIdx!==null&&colorIdx!==undefined?(KINGDOMS[colorIdx]?.iconId||KINGDOMS[colorIdx]?.id):'humanos','hero');
  const bar = document.getElementById('enemyHpBar-'+idx);
  const txt = document.getElementById('enemyHpText-'+idx);
  if(bar) bar.style.width = Math.max(0,enemy.hp/enemy.maxHp*100)+'%';
  if(txt) txt.textContent = `${enemy.hp} / ${enemy.maxHp}`;

  showFloatDamage(finalDamage, 'enemy-'+idx, false);
  const enemyUnit = document.getElementById('enemy-'+idx);
  if(enemyUnit){
    /* A folha de hit já é a única coreografia do impacto. Reaplicar a classe
       .hit com reflow disparava outro transform/filtro ao mesmo tempo e
       produzia piscadas e uma falsa mudança de escala no celular. */
    playEnemyAction(idx,'hit');
    const hitColor = colorIdx!==null && colorIdx!==undefined && KINGDOMS[colorIdx] ? KINGDOMS[colorIdx].colorLight : '#fff';
    const sourceUnit = colorIdx!==null && colorIdx!==undefined && KINGDOMS[colorIdx]
      ? document.getElementById('party-'+KINGDOMS[colorIdx].id+'-avatar') : null;
    const enemyAvatar=document.getElementById('enemyPortrait-'+idx)||enemyUnit;
    if(sourceUnit) spawnCombatAttackFx(KINGDOMS[colorIdx].iconId||KINGDOMS[colorIdx].id,sourceUnit,enemyAvatar,hitColor,finalDamage>=100?'critical':'impact',KINGDOMS[colorIdx]);
    spawnCombatFx(finalDamage>=100?'critical':'impact',enemyAvatar,hitColor,560);
    spawnCombatFx('hit',enemyAvatar,hitColor,440);
    if(colorIdx!==null && colorIdx!==undefined && KINGDOMS[colorIdx]) spawnRealmParticles(KINGDOMS[colorIdx].iconId||KINGDOMS[colorIdx].id,enemyAvatar,8);
  }

  if(enemy.hp<=0){
    if(enemyUnit){
      enemyUnit.classList.add('dead'); enemyUnit.classList.remove('selectable');
      defeatEnemyAvatar(document.getElementById('enemyPortrait-'+idx),enemy);
    }
    if(manualTarget===idx) manualTarget=null;
  }
  refreshTargetHighlight();
  renderStatusTray();
}

function applyDamageToAllEnemies(dmg, colorIdx){
  enemies.forEach((e,i)=>{ if(e.hp>0) applyDamageToEnemy(dmg, colorIdx, i); });
}

function showFloatDamage(dmg, anchorId, isPlayer){
  const anchor = document.getElementById(anchorId);
  if(!anchor) return;
  anchor.style.position = anchor.style.position || 'relative';
  const el = document.createElement('div');
  el.className = 'dmg-float' + (isPlayer? ' player-dmg':'') + (dmg>=100?' dmg-huge':dmg>=40?' dmg-big':'');
  el.textContent = '-'+dmg;
  el.style.left = (30+Math.random()*40)+'%';
  anchor.appendChild(el);
  setTimeout(()=>el.remove(), 1500);
}

function afterPlayerTurn(){
  if(finishRoomIfCleared()) return;
  stageTurns++;
  /* Véu do Eclipse expira com o tempo */
  let veuMudou=false;
  if(!persistentObstaclesMode()) Object.keys(hiddenGems).forEach(hk=>{ if(--hiddenGems[hk]<=0){ delete hiddenGems[hk]; veuMudou=true; } }); /* Pesadelo: debuffs do tabuleiro não expiram */
  if(veuMudou) renderBoard();
  showStageObjective();
  if(checkStageObjective()) return;
  if(atkBuffTurns>0) atkBuffTurns--;
  renderStatusTray();
  setBattlePhase('enemies');
  scheduleCombat(()=>tickDots(),300);
}

function tickDots(){
  if(enemyDots.length){
    const totals={};
    enemyDots.forEach(d=>{
      const target=(enemies[d.targetIdx]&&enemies[d.targetIdx].hp>0)?d.targetIdx:currentTargetIndex();
      if(target>=0) totals[target]=(totals[target]||0)+d.dmgPerTurn;
      d.turns--;
    });
    enemyDots=enemyDots.filter(d=>d.turns>0);
    Object.entries(totals).forEach(([target,total])=>applyDamageToEnemy(total,null,Number(target)));
  }
  renderStatusTray();
  if(finishRoomIfCleared(T('O dano contínuo eliminou o último inimigo.','Damage over time finished off the last enemy.','El daño continuo eliminó al último enemigo.'))) return;
  scheduleCombat(()=>enemyCounterAttack(),350);
}

function advanceTimedDefense(){
  if(shieldTurns>0){ shieldTurns--; if(shieldTurns===0) playerShield=0; }
  if(reflectTurns>0) reflectTurns--;
  if(invulnerableTurns>0) invulnerableTurns--;
  if(stoneArmorTurns>0) stoneArmorTurns--;
  if(enemyVulnerableTurns>0){
    enemyVulnerableTurns--;
    if(enemyVulnerableTurns===0) enemyVulnerableMult=1;
  }
  renderStatusTray();
}

function handlePlayerDefeat(){
  /* 💧 Lágrima da Eternidade: renasce UMA vez com 50% da vida */
  if(eternalReviveCharges>0){
    eternalReviveCharges--;
    playerHP=Math.max(1,Math.round(PLAYER_MAX_HP*0.5)); updatePlayerHP();
    setBattleStatus(T('💧 A Lágrima da Eternidade trouxe o grupo de volta com 50% da vida!','💧 The Tear of Eternity brought the party back with 50% HP!','💧 ¡La Lágrima de la Eternidad revivió al grupo con 50% de vida!'),'support');
    busy=false; setBattlePhase('idle'); resumeMissionClock(); saveProgress();
    return;
  }
  /* Jules · Chamariz: escapa da derrota com 100 de HP */
  if(chamarizCharges>0){
    chamarizCharges--;
    playerHP=100; updatePlayerHP();
    setBattleStatus(T('♠ Chamariz! O truque de Jules te traz de volta com 100 de HP.',"♠ Decoy! Jules' trick brings you back with 100 HP.",'♠ ¡Señuelo! El truco de Jules te devuelve con 100 de HP.'),'support');
    busy=false; setBattlePhase('idle'); resumeMissionClock(); saveProgress();
    return;
  }
  stopMissionTimer();
  /* Julius 10.5 · a derrota roteirizada se resolve dentro da arena, em vez
     de pular diretamente para a tela de vitória. */
  if(worldRun.active && worldRun.fase===9 && worldRun.nivel===5){
    cancelTempoSombrio();
    setBattleStatus(T('A sombra de Julius ainda não terminou seu golpe.','Julius\' shadow has not finished its strike.','La sombra de Julius aún no terminó su golpe.'),'system');
    playerHP=1; updatePlayerHP();
    scheduleCombat(()=>triggerHumanFinaleCinematic('defeat'),700);
    return;
  }
  /* 🗼 Torre: registra o resultado no ranking mensal antes de encerrar a escalada */
  if(towerMode){
    towerRecordMonthly(towerFloor-1);
    const best=Math.max(Number(localStorage.getItem('12r_tower_best')||0),towerFloor-1);
    localStorage.setItem('12r_tower_best',String(best));
  }
  if(towerMode&&!dailyRunMode){
    /* A derrota da Torre é um Game Over no próprio andar: o grupo permanece
       caído na arena e o ranking ocupa o espaço do tabuleiro. A tentativa só
       é reiniciada quando o jogador escolhe recomeçar. */
    finalizeDefeat({towerGameOver:true});
    return;
  }
  finalizeDefeat();
}

function finalizeDefeat({towerGameOver=false}={}){
  if(defeatFinalized) return false;
  defeatFinalized=true;
  busy=true;
  stageTransitioning=true;
  setBattlePhase('transition');
  stopMissionTimer();
  cancelTempoSombrio();
  resetCombatSchedule();
  sfxDefeat();
  playHeroDefeatPoses();
  flushRunToProfile(false);
  renderBattleReport('defeatReport');
  if(towerGameOver){
    hideOverlay('defeatOverlay');
    scheduleCombat(()=>showTowerGameOverPanel(),1000);
  }else{
    scheduleCombat(()=>showOverlay('defeatOverlay'),1000);
  }
  return true;
}

async function enemyCounterAttack(){
  setBattlePhase('enemies');
  if(playerHP<=0){ busy=false; return; }
  /* Difícil/Pesadelo: TODOS os inimigos vivos atacam, um de cada vez, após a sua jogada */
  const fila = allEnemiesAttackMode()
    ? enemies.map((e,i)=>e.hp>0?i:-1).filter(i=>i>=0)
    : [currentTargetIndex()].filter(i=>i>=0);
  if(!fila.length){ busy=false; return; }
  const encerrar=()=>{
    advanceTimedDefense();
    saveProgress();
    busy = false;
    if(!stageTransitioning&&playerHP>0) setBattlePhase('idle');
    if(finishRoomIfCleared(T('O contra-ataque defensivo derrotou o último inimigo.','The defensive counterattack defeated the last enemy.','El contraataque defensivo derrotó al último enemigo.'))) return;
    if(playerHP<=0) handlePlayerDefeat();
  };
  if(enemyStunTurns>0){
    enemyStunTurns--;
    fila.forEach(fi=>{
      showFloatDamage(0,'enemy-'+fi,false);
      const anchor=document.getElementById('enemy-'+fi);
      const el=anchor?.querySelector('.dmg-float:last-child');
      if(el){ el.textContent=T('Atordoado!','Stunned!','¡Aturdido!'); el.style.color='#cbb98a'; el.style.fontSize='11px'; }
    });
    encerrar();
    return;
  }
  if(enemyBlindTurns>0){
    enemyBlindTurns--;
    setBattleStatus(T('Os inimigos erraram o ataque sob a Luz da Proteção.','The enemies missed their attacks under the Light of Protection.','Los enemigos fallaron sus ataques bajo la Luz de la Protección.'));
    fila.forEach(fi=>showFloatDamage(0,'enemy-'+fi,false));
    encerrar();
    return;
  }
  await runStageAbilities(); /* conjuração inimiga conclui antes do contra-ataque comum */
  if(playerHP<=0||stageTransitioning){ busy=false; return; }
  const compasso=Math.max(180,Math.round(560/(BATTLE_SPEEDS[battleSpeedIndex]||1)));
  let passo=0;
  const proximo=()=>{
    if(playerHP<=0 || passo>=fila.length){ encerrar(); return; }
    const idx=fila[passo++];
    const enemy=enemies[idx];
    lastEnemyAttacker = idx;
    if(!enemy || enemy.hp<=0){ proximo(); return; }
    if(enemy.timeStopped && enemy.hp>enemy.maxHp*0.25){
      setBattleStatus(T(`${L(enemy.name)} está com o tempo paralisado e não pode atacar.`,`${L(enemy.name)} is frozen in time and cannot attack.`,`${L(enemy.name)} tiene el tiempo paralizado y no puede atacar.`));
      showFloatDamage(0,'enemy-'+idx,false);
      const anchorTS=document.getElementById('enemy-'+idx);
      const elTS=anchorTS?.querySelector('.dmg-float:last-child');
      if(elTS){ elTS.textContent='⏱'; elTS.style.fontSize='13px'; }
      scheduleCombat(proximo,fila.length>1?Math.round(compasso*0.5):0);
      return;
    }
    if(enemy.timeStopped && enemy.hp<=enemy.maxHp*0.25){ enemy.timeStopped=false; }
    playEnemyAction(idx,'attack');
    const enemySource=document.getElementById('enemyPortrait-'+idx);
    const frontHero=frontHeroAttackTarget(enemySource);
    const playerTarget=frontHero?.avatar||document.getElementById('playerHpAnchor');
    if(enemy.isBoss) spawnCombatFx('telegraph',playerTarget,enemyAuraPalette(enemy)[1],500);
    const variance = 0.85 + gameRandom()*0.3;
    let dmg = Math.round(enemy.atk * variance * Math.pow(0.8, damageReductionStacks));
    if(invulnerableTurns>0){
      dmg=0;
      setBattleStatus(T('O Cardume Invasor desviou completamente o ataque inimigo.','The Invading Shoal fully evaded the enemy attack.','El Cardumen Invasor esquivó por completo el ataque enemigo.'));
    } else if(reflectTurns>0){
      const reflected=dmg;
      dmg=0;
      applyDamageToEnemy(reflected,null,idx);
      setBattleStatus(T(`A Armadura de Corais devolveu ${reflected} de dano.`,`The Coral Armor returned ${reflected} damage.`,`La Armadura de Corales devolvió ${reflected} de daño.`));
    }
    if(stoneArmorTurns>0&&dmg>0){
      const original=dmg;
      const reflected=Math.max(1,Math.round(original*stoneArmorReflect));
      dmg=Math.max(0,Math.round(original*(1-stoneArmorReduction)));
      applyDamageToEnemy(reflected,null,idx);
      setBattleStatus(T(`A Armadura de Pedra reduziu o ataque para ${dmg} e devolveu ${reflected} de dano.`,`The Stone Armor reduced the attack to ${dmg} and returned ${reflected} damage.`,`La Armadura de Piedra redujo el ataque a ${dmg} y devolvió ${reflected} de daño.`),'support');
    }
    if(playerShield>0){
      const absorbed = Math.min(playerShield, dmg);
      playerShield -= absorbed;
      dmg -= absorbed;
      if(absorbed>0) pulseHpEffect('shield',900);
    }
    playerHP = Math.max(0, playerHP - dmg);
    if(dmg>0) stageTookDamage=true;
    updatePlayerHP();
    if(dmg>0) pulseHpEffect('damage',800);
    /* O dano segue a regra da missão e todos reagem, mas o projétil e o
       impacto visual usam apenas o herói da linha frontal calculado acima. */
    if(dmg>0) ACTIVE.forEach(heroIdx=>playHeroAction(heroIdx,'hit'));
    if(dmg>0){
      const enemyColor=enemyAuraPalette(enemy)[1];
      spawnCombatAttackFx(enemyFxRealm(enemy),enemySource,playerTarget,enemyColor,enemy.isBoss?'critical':'impact',enemy);
      spawnCombatFx(enemy.isBoss?'critical':'impact',playerTarget,enemyColor,560);
    }
    sfxCombatAttack(enemy.etype||enemy.id||enemy.name,'enemy');
    haptic([25,20,25]);
    if(dmg>0) setBattleStatus(T(`${L(enemy.name)} contra-atacou e causou ${dmg} de dano.`,`${L(enemy.name)} counterattacked for ${dmg} damage.`,`${L(enemy.name)} contraatacó y causó ${dmg} de daño.`));
    /* No mobile, transformar o palco que contém sprites, backdrop e blend
       modes força uma nova composição de toda a arena e aparece como pisca
       em alguns WebViews. O dano continua legível pelo recuo, HP pulse, VFX
       e número flutuante; o tremor de tela fica reservado ao ponteiro. */
    const mobileViewport=matchMedia('(max-width:700px)').matches||navigator.maxTouchPoints>0;
    if(!mobileViewport&&localStorage.getItem('12r_shake')!=='0'){
      const shakeEl=document.querySelector('.arena')||document.body;
      shakeEl.classList.remove('shake'); void shakeEl.offsetWidth; shakeEl.classList.add('shake');
      scheduleCombat(()=>shakeEl.classList.remove('shake'), 450);
    }
    showFloatDamage(dmg, 'playerHpAnchor', true);
    if(sombrasDevoradorasOn){
      enemies.forEach((sx,si)=>{ if(sx.hp>0) applyDamageToEnemy(Math.max(1,Math.round(sx.maxHp*0.05)),0,si); });
      setBattleStatus(T('As Sombras Devoradoras cobram o preço do ataque!',"The Devouring Shadows collect the attack's price!",'¡Las Sombras Devoradoras cobran el precio del ataque!'));
    }
    scheduleCombat(proximo,fila.length>1?compasso:0);
  };
  proximo();
}

function updatePlayerHP(){
  const pct = Math.max(0,(playerHP/PLAYER_MAX_HP)*100);
  playerHpBar.style.height = pct+'%';
  playerHpBar.style.width = '100%';
  playerHpText.textContent = String(playerHP);
  if(playerHpTotal) playerHpTotal.textContent = 'Total '+PLAYER_MAX_HP;
  document.body.classList.toggle('player-critical',pct>0&&pct<=25);
  if(playerHpProgress){
    playerHpProgress.setAttribute('aria-valuenow',String(playerHP));
    playerHpProgress.setAttribute('aria-valuemax',String(PLAYER_MAX_HP));
    playerHpProgress.setAttribute('aria-valuetext',`${playerHP} / ${PLAYER_MAX_HP}`);
  }
  syncHpStateClasses();
}

/* v9 · Estatísticas da run, estrelas e celebração */
let runStats={damage:{},maxCombo:0,powerUps:0};
let victoryExitToMap=false;
let victoryExitMode='world';
let victoryNextStage=false;
function updateVictoryActionLabel(){
  const btn=document.getElementById('playAgainBtn');
  if(!btn) return;
  const label=victoryNextStage?T('Próxima fase','Next stage','Próxima fase'):T('Jogar novamente','Play again','Jugar de nuevo');
  btn.textContent=label;
  btn.setAttribute('aria-label',label);
}
function resetRunStats(){ runStats={damage:{},maxCombo:0,powerUps:0,starsEarned:0,_flushedDamage:0,_flushedPU:0}; }
function getStars(){ try{ return JSON.parse(localStorage.getItem('12r_stars')||'{}'); }catch(e){ return {}; } }
function recordStars(stageIdx){
  const ratio=playerHP/PLAYER_MAX_HP;
  const stars=ratio>=.7?3:ratio>=.4?2:1;
  const all=getStars();
  if((all[stageIdx]||0)<stars){ all[stageIdx]=stars; localStorage.setItem('12r_stars',JSON.stringify(all)); }
  return stars;
}
function battleReportMarkup({includeAllHeroes=false}={}){
  const entries=includeAllHeroes
    ? ACTIVE.map(idx=>({idx,dmg:Number(runStats.damage[idx]||0)})).sort((a,b)=>b.dmg-a.dmg)
    : Object.entries(runStats.damage).map(([idx,dmg])=>({idx:+idx,dmg})).sort((a,b)=>b.dmg-a.dmg);
  if(!entries.length) return '';
  const top=entries[0]; const mvp=KINGDOMS[top.idx]; const maxD=top.dmg||1;
  return `
    <div class="report-mvp"><img src="${mvp.cardThumb||mvp.img}" alt="${L(mvp.nome)}"><div><small>${T('MVP DA BATALHA','BATTLE MVP','MVP DE LA BATALLA')}</small><strong>${L(mvp.nome)}</strong><span>${top.dmg} ${T('de dano total','total damage','de daño total')}</span></div></div>
    <div class="report-ranking-title">${T('Ranking das cartas usadas','Cards used ranking','Ranking de cartas usadas')}</div>
    <div class="report-rows">${entries.map((e,rank)=>{const k=KINGDOMS[e.idx];const medal=['🥇','🥈','🥉'][rank]||`${rank+1}º`;return `<div class="report-row"><span class="rr-rank">${medal}</span><span class="rr-name">${L(k.nome)}</span><div class="rr-bar"><i style="width:${Math.max(6,Math.round(e.dmg/maxD*100))}%;background:${k.color}"></i></div><span class="rr-val">${e.dmg}</span></div>`;}).join('')}</div>
    <div class="report-meta">${T('Maior combo','Best combo','Mayor combo')} ×${runStats.maxCombo} · ${T('Power-ups criados:','Power-ups created:','Power-ups creados:')} ${runStats.powerUps}</div>`;
}
function renderBattleReport(elId,options={}){
  const el=document.getElementById(elId); if(!el) return;
  el.innerHTML=battleReportMarkup(options);
}
function hideTowerGameOverPanel(){
  const panel=document.getElementById('towerGameOverPanel');
  if(panel){ panel.classList.remove('show'); panel.setAttribute('aria-hidden','true'); panel.replaceChildren(); }
  document.getElementById('board')?.classList.remove('tower-board-hidden');
  document.querySelector('.game-frame')?.classList.remove('tower-game-over');
}
function showTowerGameOverPanel(){
  const panel=document.getElementById('towerGameOverPanel');
  if(!panel) return false;
  const defeatedFloor=Math.max(1,Number(towerFloor)||1);
  const cleared=Math.max(0,defeatedFloor-1);
  const best=Math.max(Number(localStorage.getItem('12r_tower_best')||0),cleared);
  const month=towerMonthly()[towerMonthKey()]||0;
  panel.innerHTML=`
    <div class="tower-game-over-title">${T('GAME OVER','GAME OVER','GAME OVER')}</div>
    <p>${T(`A escalada terminou no Andar ${defeatedFloor}.`,`The climb ended on Floor ${defeatedFloor}.`,`La escalada terminó en el Piso ${defeatedFloor}.`)}</p>
    <div class="tower-game-over-record"><span>${T('Andares vencidos','Floors cleared','Pisos superados')}: <b>${cleared}</b></span><span>${T('Melhor marca','Best run','Mejor marca')}: <b>${best}</b></span><span>${T('Ranking do mês','Monthly rank','Ranking mensual')}: <b>${month}</b></span></div>
    <div class="battle-report tower-defeat-report">${battleReportMarkup({includeAllHeroes:true})}</div>
    <button class="overlay-btn tower-game-over-restart" id="towerGameOverRestart" type="button">${T('Recomeçar a Torre','Restart Tower','Reiniciar la Torre')}</button>`;
  document.getElementById('board')?.classList.add('tower-board-hidden');
  document.querySelector('.game-frame')?.classList.add('tower-game-over');
  panel.classList.add('show');
  panel.setAttribute('aria-hidden','false');
  panel.querySelector('#towerGameOverRestart')?.addEventListener('click',retryAfterDefeat);
  return true;
}
function renderVictoryStars(stars=3){
  const value=Math.max(1,Math.min(3,Number(stars)||1));
  const victoryStars=document.getElementById('victoryStars');
  if(victoryStars) victoryStars.innerHTML=[1,2,3].map(x=>`<span class="star${x<=value?' on':''}" style="--i:${x}">★</span>`).join('');
  return value;
}
function launchVictoryConfetti(){
  const layer=document.getElementById('victoryConfetti');
  if(!layer||reducedMotion||reduceFlashes||!particlesEnabled) return;
  layer.innerHTML='';
  const colors=ACTIVE.map(i=>battleGemColors[i]?.c||KINGDOMS[i].orbColor||KINGDOMS[i].color);
  for(let i=0;i<46;i++){
    const p=document.createElement('i');
    p.style.left=(Math.random()*100)+'%';
    p.style.background=colors[i%colors.length];
    p.style.animationDuration=(2.4+Math.random()*2.2)+'s';
    p.style.animationDelay=(Math.random()*1.6)+'s';
    p.style.width=p.style.height=(5+Math.random()*6)+'px';
    layer.appendChild(p);
  }
  window.setTimeout(()=>{ layer.innerHTML=''; },6800);
}

function onStageCleared(){
  if(stageTransitioning) return;
  /* A vitória contra a sombra não abre um painel: primeiro encenamos a
     revelação do Julius verdadeiro e o epílogo dentro da arena. */
  if(isHumanFinaleBattle()&&!humanFinaleOutcomeResolved){
    triggerHumanFinaleCinematic('victory');
    return;
  }
  victoryNextStage=false;
  stopMissionTimer();
  stageTransitioning = true;
  busy = true;
  setBattlePhase('transition');
  resetCombatSchedule();
  const humanFinaleAftermath=isHumanFinaleBattle()&&humanFinaleOutcomeResolved;
  if(!humanFinaleCinematicRunning&&!humanFinaleAftermath) ACTIVE.forEach(heroIdx=>playHeroAction(heroIdx,'victory'));
  if(!humanFinaleAftermath) sfxVictory();
  /* Modos são mutuamente exclusivos; a ordem defensiva impede um estado
     legado inconsistente de creditar vitória de desafio à campanha. */
  if(bossRushMode){
    bossRushIdx++;
    grantCoins(coinsVitoria(25+bossRushIdx*8));
    const best=Math.max(Number(localStorage.getItem('12r_bossrush_best')||0),bossRushIdx);
    localStorage.setItem('12r_bossrush_best',String(best));
    if(bossRushIdx>=BOSS_RUSH_ORDER.length){
      unlockAch('lenda');
      const gt=document.getElementById('grandClearTitle'), gx=document.getElementById('grandClearText');
      if(gt) gt.textContent=T('Lenda de Ygdria!','Legend of Ygdria!','¡Leyenda de Ygdria!');
      if(gx) gx.textContent=T('Você venceu os 8 campeões em sequência. Nenhum trono resiste a você.','You defeated all 8 champions in a row. No throne can resist you.','Venciste a los 8 campeones seguidos. Ningún trono se te resiste.');
      renderVictoryStars(3); renderBattleReport('victoryReport'); launchVictoryConfetti();
      bossRushMode=false;
      victoryExitToMap=true;
      victoryExitMode='boss';
      showOverlay('dungeonClearOverlay');
      return;
    }
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML='';
    document.getElementById('stageClearText').textContent=T(`Chefe ${bossRushIdx}/8 derrotado! O próximo campeão avança...`,`Boss ${bossRushIdx}/8 defeated! The next champion steps up...`,`¡Jefe ${bossRushIdx}/8 derrotado! El próximo campeón avanza...`);
    showOverlay('stageClearOverlay');
    scheduleCombat(()=>{ hideOverlay('stageClearOverlay'); loadStage(0); busy=false; },1600);
    return;
  }
  if(worldRun.active){
    const world=WORLDS[0];
    const fase=world.fases[worldRun.fase];
    if(worldRun.nivel===5) markStoryPhaseDone(worldRun.fase);
    if(worldRun.nivel<5){
      questEvent('win');
      worldRun.turnosFase=(worldRun.turnosFase||0)+stageTurns;
      worldRun.tempoFase=(worldRun.tempoFase||0)+missionElapsed();
      worldRun.nivel++;
      grantCoins(coinsVitoria(3+worldRun.fase)); /* v9.2: economia rebalanceada (metade) */
      const starsEl=document.getElementById('stageStars');
      if(starsEl) starsEl.innerHTML='';
      document.getElementById('stageClearText').textContent=`${L(fase.nome)}: ${T('nível','level','nivel')} ${worldRun.nivel-1}/5 ${T('superado! Avançando...','cleared! Advancing...','superado! Avanzando...')}`;
      showOverlay('stageClearOverlay');
      carryBoardNext=true; /* Fácil mantém o tabuleiro na próxima missão */
      scheduleCombat(()=>{ hideOverlay('stageClearOverlay'); loadStage(0); busy=false; },1500);
      return;
    }
    // Chefe vencido — fase completa!
    { const hoje=todayKey();
      if(localStorage.getItem('12r_firstwin')!==hoje){
        localStorage.setItem('12r_firstwin',hoje);
        grantCoins(20+worldRun.fase*5); /* dobra a recompensa base da primeira vitória do dia */
        setBattleStatus('✨ '+T('Primeira vitória do dia: moedas em DOBRO!','First win of the day: DOUBLE coins!','¡Primera victoria del día: monedas DOBLES!'),'support');
      }
    }
    questEvent('win');
    worldRun.turnosFase=(worldRun.turnosFase||0)+stageTurns;
    worldRun.tempoFase=(worldRun.tempoFase||0)+missionElapsed();
    { /* F7 · recorde de turnos da fase */
      const fb=faseBest();
      if(!fb[worldRun.fase]||worldRun.turnosFase<fb[worldRun.fase]){ fb[worldRun.fase]=worldRun.turnosFase; localStorage.setItem('12r_fase_best',JSON.stringify(fb)); }
    }
    { /* ⏱ recorde de TEMPO da fase (ranking oficial de missões) */
      const ft=faseTime();
      if(!ft[worldRun.fase]||worldRun.tempoFase<ft[worldRun.fase]){ ft[worldRun.fase]=worldRun.tempoFase; localStorage.setItem('12r_fase_time',JSON.stringify(ft)); }
    }
    /* M3 · última equipe vitoriosa vira a sugerida */
    localStorage.setItem('12r_lastteam',JSON.stringify([...ACTIVE]));
    /* M6 · prefetch da arte da próxima fase */
    { const prox=WORLDS[0].fases[worldRun.fase+1]; if(prox?.bg){ const im=new Image(); im.src=prox.bg; } }
    const prog=worldProg('humanos');
    const ratio=playerHP/PLAYER_MAX_HP;
    const stars=ratio>=.7?3:ratio>=.4?2:1;
    prog.starsByDifficulty=prog.starsByDifficulty||{};
    prog.starsByDifficulty[difficulty]=prog.starsByDifficulty[difficulty]||{};
    if((prog.starsByDifficulty[difficulty][worldRun.fase]||0)<stars) prog.starsByDifficulty[difficulty][worldRun.fase]=stars;
    prog.stars[worldRun.fase]=Math.max(prog.stars[worldRun.fase]||0,stars);
    prog.unlocked=Math.max(prog.unlocked,Math.min(world.fases.length-1,worldRun.fase+1));
    saveWorldProg('humanos',prog);
    grantCoins(coinsVitoria(20+worldRun.fase*5));
    const ups=grantXp((30+worldRun.fase*10)*(xpDoubleRun?2:1));
    checkAchievements('stage');
    flushRunToProfile(true);
      const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML=[1,2,3].map(x=>`<span class="star${x<=stars?' on':''}" style="--i:${x}">★</span>`).join('');
    renderVictoryStars(stars);
    const victoryRank=document.getElementById('victoryRank');
    if(victoryRank) victoryRank.textContent=`${DIFFICULTY_RANKS[difficulty]||'Prata'} · ${difficultyLabel(difficulty)} · ${stars}/3`;
    if(worldRun.fase===world.fases.length-1){
      /* Fase 10 vencida — Reino dos Humanos conquistado */
      grantCoins(coinsVitoria(150)); grantXp(100*(xpDoubleRun?2:1));
      checkAchievements('world-complete');
      const gt=document.getElementById('grandClearTitle'), gx=document.getElementById('grandClearText');
      if(gt) gt.textContent=T('Reino dos Humanos Conquistado!','Human Realm Conquered!','¡Reino de los Humanos Conquistado!');
      if(gx) gx.textContent=T('A Terra dos Reguladores de Ygdria está livre. Os próximos reinos aguardam...','The Land of the Regulators of Ygdria is free. The next realms await...','La Tierra de los Reguladores está libre. Los próximos reinos esperan...');
      const showFinalStory=worldRun.storyMode!==false;
      const finaleFase=worldRun.fase;
      worldRun.active=false;
      const finishFinale=()=>{
        if(humanFinaleOutcomeResolved){
          if(gt) gt.textContent=T('Capítulo Concluído!','Chapter Complete!','¡Capítulo Concluido!');
          if(gx) gx.textContent=T('O destino de Adriel foi lançado além do Reino dos Humanos.','Adriel\'s fate has been cast beyond the Human Realm.','El destino de Adriel fue lanzado más allá del Reino de los Humanos.');
        }
        victoryExitToMap=true;
        victoryExitMode='world';
        renderBattleReport('victoryReport');
        if(!humanFinaleOutcomeResolved) launchVictoryConfetti();
        showOverlay('dungeonClearOverlay');
      };
      if(showFinalStory&&!humanFinaleOutcomeResolved) showStorySequence(canonicalAfterSequence(finaleFase),finishFinale);
      else finishFinale();
      return;
    }
    const completedFase=worldRun.fase;
    const finishMissionReport=()=>{
      const gt=document.getElementById('grandClearTitle'), gx=document.getElementById('grandClearText');
      if(gt) gt.textContent=T('Missão Concluída!','Mission Complete!','¡Misión Completada!');
      if(gx) gx.textContent=`${L(fase.chefe)} ${T('derrotado(a)!','defeated!','¡derrotado(a)!')} ${L(fase.nome)} ${T('conquistada!','conquered!','conquistada!')}${ups.length?' '+ups.join(' '):''}`;
      renderVictoryStars(3); renderBattleReport('victoryReport');
      launchVictoryConfetti();
      victoryExitToMap=true;
      victoryExitMode='world';
      victoryNextStage=completedFase<world.fases.length-1;
      showOverlay('dungeonClearOverlay');
      worldRun.active=false;
      busy=false;
    };
    const finalStory=worldRun.storyMode!==false?canonicalAfterSequence(completedFase):[];
    if(finalStory.length) showStorySequence(finalStory,finishMissionReport);
    else finishMissionReport();
    return;
  }
  if(towerMode){
    const best=Math.max(Number(localStorage.getItem('12r_tower_best')||0),towerFloor);
    localStorage.setItem('12r_tower_best',String(best));
    grantCoins(coinsVitoria(5+Math.floor(towerFloor/3)));
    grantXp((12+towerFloor*3)*(xpDoubleRun?2:1));
    checkAchievements('tower');
    flushRunToProfile(true);
    towerFloor++;
    if((towerFloor-1)%5===0){
      grantCoins(coinsVitoria(50));
      setBattleStatus('🎁 '+T(`Baú da Torre! Andar ${towerFloor-1} rendeu +50 moedas.`,`Tower Chest! Floor ${towerFloor-1} granted +50 coins.`,`¡Cofre de la Torre! El piso ${towerFloor-1} otorgó +50 monedas.`),'support');
    }
    if(dailyRunMode && towerFloor>5){
      /* Desafio Diário concluído: 5 andares vencidos */
      let dailyRecord={}; try{ dailyRecord=JSON.parse(localStorage.getItem('12r_daily')||'{}'); }catch(e){}
      if(!dailyRecord||typeof dailyRecord!=='object'||Array.isArray(dailyRecord)) dailyRecord={};
      if(dailyRecord.date!==todayKey()){
        grantCoins(150); grantXp(60);
        localStorage.setItem('12r_daily',JSON.stringify({date:todayKey(),combo:runStats.maxCombo}));
        checkAchievements('daily');
      }
      const shareBtn=document.getElementById('shareDailyBtn');
      if(shareBtn) shareBtn.style.display='inline-block';
      const gt=document.getElementById('grandClearTitle'), gx=document.getElementById('grandClearText');
      if(gt) gt.textContent=T('Desafio Diário Concluído!','Daily Challenge Complete!','¡Desafío Diario Completado!');
      if(gx) gx.textContent=T('Você venceu os 5 andares de hoje. Volte amanhã para um novo desafio!','You beat all 5 floors today. Come back tomorrow!','¡Venciste los 5 pisos de hoy. Vuelve mañana!');
      renderVictoryStars(3); renderBattleReport('victoryReport');
      launchVictoryConfetti();
      showOverlay('dungeonClearOverlay');
      return;
    }
    towerRecordMonthly(towerFloor-1); /* ranking mensal em tempo real */
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML='';
    const proxDesafiante=buildTowerStage(towerFloor).enemies[0];
    document.getElementById('stageClearText').textContent = T(`Andar ${towerFloor-1} superado! Próximo oponente: ${L(proxDesafiante?.name||'???')}.`,`Floor ${towerFloor-1} cleared! Next opponent: ${L(proxDesafiante?.name||'???')}.`,`¡Piso ${towerFloor-1} superado! Próximo oponente: ${L(proxDesafiante?.name||'???')}.`);
    showOverlay('stageClearOverlay');
    scheduleCombat(()=>{ hideOverlay('stageClearOverlay'); loadStage(0); busy=false; },1600);
    return;
  }
  const unlocked = Math.max(Number(localStorage.getItem('12r_unlocked')||0),Math.min(DUNGEON.length-1,stageIndex+1));
  localStorage.setItem('12r_unlocked',String(unlocked));
  saveProgress(stageIndex<DUNGEON.length-1 ? stageIndex+1 : stageIndex);
  const earnedStars=recordStars(stageIndex);
  runStats.starsEarned=(runStats.starsEarned||0)+earnedStars;
  grantCoins(earnedStars*15+stageIndex*5);
  const levelUps=grantXp(20+stageIndex*8);
  checkAchievements('stage');
  flushRunToProfile(true);
  if(stageIndex >= DUNGEON.length-1){
    grantCoins(dailyRunMode?150:80);
    grantXp(60);
    checkAchievements('dungeon');
    if(dailyRunMode) localStorage.setItem('12r_daily',JSON.stringify({date:todayKey(),combo:runStats.maxCombo}));
    const shareBtn=document.getElementById('shareDailyBtn');
    if(shareBtn) shareBtn.style.display=dailyRunMode?'inline-block':'none';
    renderBattleReport('victoryReport');
    renderVictoryStars(earnedStars);
    launchVictoryConfetti();
    showOverlay('dungeonClearOverlay');
  }
  else{
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML=[1,2,3].map(n=>`<span class="star${n<=earnedStars?' on':''}" style="--i:${n}">★</span>`).join('');
    document.getElementById('stageClearText').textContent = `${L(DUNGEON[stageIndex].title)}${T(' - superado!',' - cleared!',' - ¡superado!')}${levelUps.length?' '+levelUps.join(' '):''}`;
    showOverlay('stageClearOverlay');
    scheduleCombat(()=>{ hideOverlay('stageClearOverlay'); loadStage(stageIndex+1); busy=false; },1800);
  }
}

const victoryOverlayHome=document.getElementById('victoryReportDock')||document.getElementById('dungeonClearOverlay')?.parentElement||null;
const victoryTopIds=['grandClearTitle','grandClearText','victoryStars','victoryRank'];
function mountVictoryOverlay(){
  const overlay=document.getElementById('dungeonClearOverlay');
  const dock=document.getElementById('victoryReportDock');
  const top=document.getElementById('victoryArenaHeader');
  const confetti=document.getElementById('victoryConfetti');
  const frame=document.querySelector('.game-frame');
  if(!overlay||!arenaEl||!dock) return;
  if(overlay.parentElement!==dock) dock.appendChild(overlay);
  if(confetti&&confetti.parentElement!==arenaEl) arenaEl.appendChild(confetti);
  if(top) victoryTopIds.forEach(id=>{
    const node=document.getElementById(id);
    if(node&&node.parentElement!==top) top.appendChild(node);
  });
  overlay.classList.add('victory-arena-overlay','victory-docked');
  frame?.classList.add('victory-celebration');
  arenaEl.classList.add('victory-arena-state');
  syncVictoryHeaderPosition();
  updateVictoryActionLabel();
}
function syncVictoryHeaderPosition(){
  const topbar=document.querySelector('.mission-topbar');
  if(!arenaEl||!topbar||!arenaEl.classList.contains('victory-arena-state')) return;
  const arenaRect=arenaEl.getBoundingClientRect();
  const topbarRect=topbar.getBoundingClientRect();
  const offset=Math.max(84,Math.ceil(topbarRect.bottom-arenaRect.top+8));
  arenaEl.style.setProperty('--victory-header-top',offset+'px');
}
window.addEventListener('resize',syncVictoryHeaderPosition,{passive:true});
function restoreVictoryOverlay(){
  const overlay=document.getElementById('dungeonClearOverlay');
  if(!overlay) return;
  if(victoryOverlayHome&&overlay.parentElement!==victoryOverlayHome) victoryOverlayHome.appendChild(overlay);
  const top=document.getElementById('victoryArenaHeader');
  const confetti=document.getElementById('victoryConfetti');
  if(confetti&&confetti.parentElement!==overlay) overlay.insertBefore(confetti,overlay.firstChild);
  victoryTopIds.forEach(id=>{
    const node=document.getElementById(id);
    if(node&&node.parentElement!==overlay) overlay.appendChild(node);
  });
  overlay.classList.remove('victory-arena-overlay','victory-docked');
  document.querySelector('.game-frame')?.classList.remove('victory-celebration');
  arenaEl?.classList.remove('victory-arena-state');
  arenaEl?.style.removeProperty('--victory-header-top');
}
function showOverlay(id){
  if(id==='dungeonClearOverlay') mountVictoryOverlay();
  document.getElementById(id)?.classList.add('show');
}
function hideOverlay(id){
  document.getElementById(id)?.classList.remove('show');
  if(id==='dungeonClearOverlay') restoreVictoryOverlay();
}

function resetGame(){
  resetRunStats();
  resetBattleRunConsumables();
  pendingDimensional=[];
  incineratePhaseKey=null; incinerateActive=false; incinerateStacks=0;
  PLAYER_MAX_HP=computePlayerMaxHP();
  playerHP = PLAYER_MAX_HP; updatePlayerHP();
  survivorStageStartHP=playerHP;
  ['stageClearOverlay','dungeonClearOverlay','defeatOverlay'].forEach(hideOverlay);
  selected=null; busy=false; comboStep=0;
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
  if(worldRun.active) worldRun.nivel=1;          // reinicia a fase atual do mundo
  if(towerMode && dailyRunMode) towerFloor=1;    // diário recomeça do andar 1
  if(dailyRunMode) rngState=initialRngState;
  loadStage(0);
}

function restartCurrentStage(){
  resetCombatSchedule();
  const survivorHP = towerMode && difficulty==='pesadelo' ? Math.max(1,Math.min(PLAYER_MAX_HP,survivorStageStartHP||playerHP||1)) : PLAYER_MAX_HP;
  playerHP = survivorHP; updatePlayerHP();
  pendingDimensional=[];
  ['stageClearOverlay','dungeonClearOverlay','defeatOverlay'].forEach(hideOverlay);
  selected=null; busy=false; comboStep=0;
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
  loadStage(stageIndex);
}

function retryAfterDefeat(){
  /* Torre, Diário e Boss Rush são sequências: perder encerra a tentativa.
     O botão inicia uma nova sequência, nunca continua do andar/chefe perdido. */
  if(towerMode){
    towerFloor=1;
    resetGame();
    return;
  }
  if(bossRushMode){
    bossRushIdx=0;
    resetGame();
    return;
  }
  restartCurrentStage();
}

function restartFromControls(){
  /* Reiniciar antes do golpe fatal deve ter a mesma regra de uma derrota;
     caso contrário seria possível curar a Torre ou preservar um chefe do Rush. */
  if(towerMode||bossRushMode){ retryAfterDefeat(); return; }
  restartCurrentStage();
}

document.getElementById('muteBtn').addEventListener('click', toggleMusic);
document.getElementById('resetBtn').addEventListener('click', restartFromControls);
document.getElementById('restartTool')?.addEventListener('click',()=>{ toggleBattleTools(false); restartFromControls(); });
document.getElementById('retryBtn').addEventListener('click', retryAfterDefeat);
document.getElementById('playAgainBtn').addEventListener('click',()=>{
  if(!victoryExitToMap){ resetGame(); return; }
  const destination=victoryExitMode;
  victoryExitToMap=false;
  victoryExitMode='world';
  victoryNextStage=false;
  hideOverlay('dungeonClearOverlay');
  showMainMenu();
  openMapScreen(destination==='boss'?'boss':'world');
  if(destination==='world'){
    renderWorldMap();
    openPanel('worldScreen');
  }
});

// ---------- HERO SELECT SCREEN ----------
const qaPreset = new URLSearchParams(location.search).get('qa');
let chosenIds = qaPreset==='barbara'||qaPreset==='all-specials' ? [0,1,3,5] : [];
let pendingStage = 0;
const selectGridEl = document.getElementById('selectGrid');
const selectCountEl = document.getElementById('selectCount');
const startBtnEl = document.getElementById('startBtn');
const swapBtnEl = document.getElementById('swapBtn2');

var selectDeckOpen={}; /* decks abertos na tela de seleção (persistem entre re-renders) */
function renderSelectGrid(){
  selectGridEl.innerHTML = '';
  if(chosenIds.length&&!Object.values(selectDeckOpen).some(Boolean)){
    chosenIds.forEach(ci=>{ const kk=KINGDOMS[ci]; if(kk) selectDeckOpen[kk.deck||kk.id]=true; });
  }
  /* v9.1 · Roster agrupado em DECKS por reino (Reino Rosa primeiro) */
  const ordem=['humanos','luz','agua','fogo','natureza','terra','areia','sombras','raio','vento','chuvas','gelo'];
  const nomesDeck={humanos:T('Reino Rosa · Humanos','Rose Realm · Humans','Reino Rosa · Humanos')};
  ordem.forEach(deckId=>{
    const membros=KINGDOMS.filter(k=>(k.deck||k.id)===deckId);
    if(!membros.length) return;
    membros.sort((a,b)=>(b.stars||0)-(a.stars||0)); /* maior raridade primeiro */
    const lider=KINGDOMS.find(k=>k.id===deckId);
    const section=document.createElement('div');
    section.className='select-deck-section deck-'+deckId+(selectDeckOpen[deckId]?' open':'');
    const escolhidasNoDeck=membros.filter(k=>chosenIds.includes(KINGDOMS.indexOf(k))).length;
    const header=document.createElement('div');
    header.className='select-deck-header';
    header.setAttribute('role','button');
    header.setAttribute('tabindex','0');
    header.setAttribute('aria-expanded', selectDeckOpen[deckId]?'true':'false');
    header.style.setProperty('--realm',lider?.color||'#d4af5a');
    header.innerHTML=`<span class="deck-icon"><svg viewBox="0 0 24 24">${KINGDOM_ICON[deckId]||''}</svg></span><b>${nomesDeck[deckId]||L(lider?.reino||deckId)}</b>${escolhidasNoDeck?`<span class="deck-picked">${escolhidasNoDeck} ${T('na equipe','in team','en el equipo')}</span>`:''}<small>${membros.length} ${membros.length>1?T('cartas','cards','cartas'):T('carta','card','carta')}</small><span class="deck-caret" aria-hidden="true">▸</span>`;
    const alternar=()=>{ selectDeckOpen[deckId]=!selectDeckOpen[deckId]; section.classList.toggle('open',!!selectDeckOpen[deckId]); header.setAttribute('aria-expanded', selectDeckOpen[deckId]?'true':'false'); };
    header.addEventListener('click',alternar);
    header.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); alternar(); } });
    section.appendChild(header);
    const dgrid=document.createElement('div');
    dgrid.className='select-deck-grid';
    membros.forEach(k=>{
      const idx=KINGDOMS.indexOf(k);
      const card = document.createElement('div');
      const permitido=storySelectionAllowed(idx);
      card.className = 'select-card' + (chosenIds.includes(idx) ? ' chosen' : '') + (!permitido?' story-disabled':'');
      card.setAttribute('aria-disabled',permitido?'false':'true');
      card.style.setProperty('--realm',k.color);
      card.style.setProperty('--realm-light',k.colorLight);
      card.style.setProperty('--realm-dark',k.colorDark);
      const pickOrder = chosenIds.indexOf(idx);
      card.innerHTML = `
        <div class="thumb-wrap"><img src="${THUMB(k.cardThumb||k.img)}"${THUMBF(k.cardThumb||k.img)} alt="${k.nome}" loading="lazy" decoding="async">${pickOrder>=0?`<div class="pick-badge" aria-hidden="true">${pickOrder+1}</div>`:''}<button class="zoom-btn" type="button" data-idx="${idx}" aria-label="${T(`Abrir carta de ${L(k.nome)} em alta resolução`,`Open ${L(k.nome)}'s card in high resolution`,`Abrir la carta de ${L(k.nome)} en alta resolución`)}">🔍</button></div>
      `;
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-label',chosenIds.includes(idx)?T(`Remover ${L(k.nome)} da equipe`,`Remove ${L(k.nome)} from the team`,`Quitar a ${L(k.nome)} del equipo`):T(`Adicionar ${L(k.nome)} à equipe`,`Add ${L(k.nome)} to the team`,`Añadir a ${L(k.nome)} al equipo`));
      card.addEventListener('click',()=>toggleHero(idx));
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleHero(idx);}});
      card.querySelector('.zoom-btn').addEventListener('click', e=>{ e.stopPropagation(); openCardModal(idx); });
      dgrid.appendChild(card);
    });
    section.appendChild(dgrid);
    selectGridEl.appendChild(section);
  });
  /* lookup dinâmico: o i18n recria o nó #selectCount ao trocar de idioma */
  { const sc=document.getElementById('selectCount'); if(sc) sc.textContent=chosenIds.length; }
  startBtnEl.disabled = chosenIds.length!==4;
  /* ⚜ Prévia do Bônus de Aliança ao montar a equipe */
  { const hint=document.getElementById('allianceHint');
    if(hint){
      if(chosenIds.length===4){
        const b=computeAllianceBonus(chosenIds);
        hint.innerHTML=b.rotulos.length?('⚜ '+b.rotulos.join(' · ')):T('Sem bônus de aliança — repita reinos ou feche uma aliança completa.','No alliance bonus — repeat realms or complete a full alliance.','Sin bono de alianza — repite reinos o completa una alianza.');
        hint.classList.toggle('on',b.rotulos.length>0);
      } else if(chosenIds.length){
        const als=[...new Set(chosenIds.map(i=>allianceOf(KINGDOMS[i]?.iconId||KINGDOMS[i]?.id)).filter(Boolean).map(a=>a.icon+' '+a.nome))];
        hint.innerHTML=als.join(' · ');
        hint.classList.remove('on');
      } else { hint.innerHTML=''; hint.classList.remove('on'); }
    } }
  renderTeamSlots();
}

function toggleHero(idx){
  if(!storySelectionAllowed(idx)){
    setBattleStatus(T('Este personagem entra nesta missão apenas depois da primeira conclusão.','This character unlocks for this mission after its first clear.','Este personaje se desbloquea para esta misión tras completarla.'),'system');
    sfxInvalid();
    return;
  }
  if(chosenIds.includes(idx)){
    chosenIds=chosenIds.filter(id=>id!==idx);
  }else if(chosenIds.length<4){
    chosenIds.push(idx);
  }else{
    setBattleStatus(T('A equipe já possui quatro personagens. Remova uma carta antes de escolher outra.','Your team already has four characters. Remove a card before choosing another.','El equipo ya tiene cuatro personajes. Quita una carta antes de elegir otra.'),'system');
    haptic(18);
  }
  renderSelectGrid();
  sfxSelect();
}

const MOTION_ACTION_LABELS={
  idle:()=>T('Respirar','Breathe','Respirar'),
  attack:()=>T('Atacar','Attack','Atacar'),
  cast:()=>T('Conjurar','Cast','Conjurar'),
  hit:()=>T('Impacto','Hit','Impacto'),
  victory:()=>T('Vitória','Victory','Victoria')
};
function motionShowcaseFxSpec(k,action){
  if(action==='attack'){
    const human=HUMAN_CHAPTER_ATTACK_SHEETS[k.id];
    if(human) return {src:human,attack:true,humanPink:isHumanRealmAttacker(k),shadow:k.id==='julius'};
    if(k.id==='agua') return {src:'assets/characters/runtime-v10/agua/attack-water-blast-3x2.png',attack:true};
  }
  if(action==='cast'){
    const human=HUMAN_MAGIC_FX_SHEETS[k.id];
    if(human) return {src:human,cast:true,humanPink:isHumanRealmAttacker(k),shadow:k.id==='julius'};
    if(k.id==='agua') return {src:'assets/characters/runtime-v10/agua/cast-water-bubbles-3x2.png',cast:true};
  }
  return null;
}
function resetMotionShowcaseVfx(){
  const aura=document.getElementById('motionShowcaseAura');
  const fx=document.getElementById('motionShowcaseVfx');
  const impact=document.getElementById('motionShowcaseImpact');
  const target=document.getElementById('motionShowcaseTarget');
  if(aura){ aura.className='motion-showcase-aura'; aura.removeAttribute('style'); }
  if(fx){ fx.className='motion-showcase-vfx'; fx.removeAttribute('style'); delete fx.dataset.sourceAnchor; delete fx.dataset.targetAnchor; }
  if(impact){ impact.className='motion-showcase-impact'; impact.removeAttribute('style'); }
  if(target){ target.className='motion-showcase-target'; target.removeAttribute('style'); }
}
function positionMotionShowcaseVfx(action){
  const showcase=document.getElementById('motionShowcase');
  const stage=showcase?.querySelector('.motion-showcase-stage');
  const avatar=document.getElementById('motionShowcaseAvatar');
  const aura=document.getElementById('motionShowcaseAura');
  const fx=document.getElementById('motionShowcaseVfx');
  const impact=document.getElementById('motionShowcaseImpact');
  const target=document.getElementById('motionShowcaseTarget');
  if(!stage||!avatar||!aura||!fx||!impact||!target) return;
  const sr=stage.getBoundingClientRect(), ar=avatar.getBoundingClientRect();
  if(sr.width<1||ar.width<1) return;
  const sourceX=ar.left-sr.left+ar.width*(action==='attack'?.68:.5);
  const sourceY=ar.top-sr.top+ar.height*(action==='attack'?.43:.48);
  const auraX=ar.left-sr.left+ar.width*.5;
  const auraY=ar.top-sr.top+ar.height*.54;
  aura.style.left=auraX+'px'; aura.style.top=auraY+'px';
  fx.style.left=sourceX+'px'; fx.style.top=sourceY+'px';
  fx.dataset.sourceAnchor='motionShowcaseAvatar';
  if(action!=='attack') return;
  const targetX=Math.min(sr.width-26,Math.max(sourceX+72,sr.width*.82));
  const targetY=Math.max(26,Math.min(sr.height-26,sourceY+2));
  const dx=targetX-sourceX,dy=targetY-sourceY;
  fx.dataset.targetAnchor='motionShowcaseTarget';
  fx.style.setProperty('--showcase-travel-x',dx+'px');
  fx.style.setProperty('--showcase-travel-y',dy+'px');
  fx.style.setProperty('--showcase-travel-x-28',(dx*.28)+'px');
  fx.style.setProperty('--showcase-travel-y-28',(dy*.28)+'px');
  fx.style.setProperty('--showcase-travel-x-58',(dx*.58)+'px');
  fx.style.setProperty('--showcase-travel-y-58',(dy*.58)+'px');
  target.style.left=targetX+'px'; target.style.top=targetY+'px';
  impact.style.left=targetX+'px'; impact.style.top=targetY+'px';
}
function renderMotionShowcaseVfx(k,action){
  resetMotionShowcaseVfx();
  const showcase=document.getElementById('motionShowcase');
  const aura=document.getElementById('motionShowcaseAura');
  const fx=document.getElementById('motionShowcaseVfx');
  const impact=document.getElementById('motionShowcaseImpact');
  const target=document.getElementById('motionShowcaseTarget');
  if(!showcase||!aura||!fx||!impact||!target) return;
  const color=k.colorLight||k.color||'#ffd893';
  showcase.style.setProperty('--showcase-color',color);
  if(action==='cast'){
    const auraSpec=humanConjurationAuraSpec(k.id)||GENERIC_CONJURATION_AURA;
    aura.className='motion-showcase-aura active'+(auraSpec.masked?' masked':'')+(auraSpec.className?` ${auraSpec.className}`:'');
    aura.style.setProperty('--showcase-color',color);
    aura.style.setProperty('--showcase-aura-filter',auraSpec.shadow
      ? 'brightness(1.26) contrast(1.14) drop-shadow(0 0 9px rgba(185,193,207,.42))'
      : auraSpec.humanPink
        ? 'grayscale(1) sepia(1) saturate(5) hue-rotate(284deg) brightness(1.1) contrast(1.04) drop-shadow(0 0 8px rgba(255,112,183,.84))'
        : `drop-shadow(0 0 8px ${color})`);
    if(auraSpec.masked){
      aura.style.webkitMaskImage=`url("${animationAssetUrl(auraSpec.src)}")`;
      aura.style.maskImage=`url("${animationAssetUrl(auraSpec.src)}")`;
    }else aura.style.backgroundImage=`url("${animationAssetUrl(auraSpec.src)}")`;
  }
  const spec=motionShowcaseFxSpec(k,action);
  if(!spec) return;
  fx.className='motion-showcase-vfx active'+(spec.attack?' attack':'')+(spec.humanPink?' human-pink':'')+(spec.shadow?' shadow-fx':'');
  fx.style.backgroundImage=`url("${animationAssetUrl(spec.src)}")`;
  fx.style.setProperty('--showcase-fx-filter',spec.shadow
    ? 'grayscale(1) contrast(1.14) drop-shadow(0 0 7px rgba(204,214,225,.3))'
    : spec.humanPink
      ? 'grayscale(1) sepia(1) saturate(5) hue-rotate(284deg) brightness(1.08) contrast(1.04) drop-shadow(0 0 8px rgba(255,116,181,.84))'
      : `drop-shadow(0 0 7px ${color})`);
  if(spec.attack){
    target.classList.add('visible');
    impact.classList.add('active');
  }
  positionMotionShowcaseVfx(action);
  requestAnimationFrame(()=>positionMotionShowcaseVfx(action));
}
function renderMotionShowcase(k){
  const showcase=document.getElementById('motionShowcase');
  const avatar=document.getElementById('motionShowcaseAvatar');
  const actions=document.getElementById('motionShowcaseActions');
  if(!showcase||!avatar||!actions) return;
  stopHeroAnimation(avatar);
  const showcaseToken=String((Number(avatar.dataset.showcaseGeneration)||0)+1);
  avatar.dataset.showcaseGeneration=showcaseToken;
  avatar.dataset.showcaseHero=k.id;
  const available=Object.keys(MOTION_ACTION_LABELS).filter(action=>k.sprites?.[action]?.src);
  showcase.hidden=!available.length;
  if(!available.length){ avatar.innerHTML=''; actions.innerHTML=''; return; }
  const play=async action=>{
      actions.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.motion===action));
      avatar.dataset.requestedAction=action;
      const spec=k.sprites?.[action];
      const fxSpec=motionShowcaseFxSpec(k,action);
      const auraSpec=action==='cast'?(humanConjurationAuraSpec(k.id)||GENERIC_CONJURATION_AURA):null;
      const sources=[spec?.src,fxSpec?.src,auraSpec?.src].filter(Boolean);
      await Promise.all(sources.map(src=>preloadSpriteSource(src).catch(()=>{ markSpriteFailed(src); })));
      const modal=document.getElementById('cardModal');
      if(avatar.dataset.requestedAction!==action||avatar.dataset.showcaseGeneration!==showcaseToken||avatar.dataset.showcaseHero!==k.id||window.__modalIdx!==KINGDOMS.indexOf(k)||!modal?.classList.contains('show')) return;
      animateHeroAvatar(avatar,k,action,{loop:action==='idle',hold:action==='victory'});
      renderMotionShowcaseVfx(k,action);
  };
  actions.innerHTML=available.map(action=>`<button type="button" data-motion="${action}" aria-label="${MOTION_ACTION_LABELS[action]()} de ${L(k.nome)}">${MOTION_ACTION_LABELS[action]()}</button>`).join('');
  actions.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>play(button.dataset.motion)));
  play(available.includes('idle')?'idle':available[0]);
}

function openCardModal(idx){
  window.__modalIdx=idx;
  const k = KINGDOMS[idx];
  document.getElementById('cardModal').classList.remove('character-view');
  document.getElementById('cardModal').classList.add('show');
  document.getElementById('cardModal').setAttribute('aria-hidden','false');
  document.getElementById('shareCardBtn').style.display='block';
  try{ const v=sanitizeHeroIdList(JSON.parse(localStorage.getItem('12r_seen')||'[]')); if(!v.includes(k.id)){ v.push(k.id); localStorage.setItem('12r_seen',JSON.stringify(v)); } }catch(e){}
  { const mi=document.getElementById('cardModalImg'); mi.onerror=()=>{ mi.onerror=null; mi.src=k.img; }; mi.src=IMGL(k.img); }
  document.getElementById('cardModalImg').alt = L(k.nome);
  document.getElementById('cardModalName').textContent = L(k.nome);
  document.getElementById('cardModalClasse').textContent = L(k.reino) + ' · ' + L(k.classe);
  const abilitiesEl = document.getElementById('cardModalAbilities');
  const passives=k.abilities.filter(a=>a.kind==='passive');
  const actives=k.abilities.filter(a=>a.kind==='active');
  const renderAbility=a=>`
      <div class="card-modal-ability">
        <div class="tier-tag">${Array.isArray(a.at)?'('+a.at.join('%, ')+'%)':a.every?T('a cada ','every ','cada ')+a.gems+'%':a.gems+T('% de energia','% energy','% de energía')} · ${a.kind==='active'?T('habilidade ativa','active ability','habilidad activa'):T('passiva','passive','pasiva')}</div>
        <b>${L(a.name)}</b> — ${L(a.desc)}
      </div>`;
  let mhtml=`<div class="card-modal-ability-section">${L(k.rarity||'DIVINA')} · ${'★'.repeat(k.stars||7)} · ${T('ATQ','ATK','ATQ')} ${k.atk||12}</div>`;
  if(passives.length) mhtml+=`<div class="card-modal-ability-section">${passives.length} ${passives.length>1?T('Passivas','Passives','Pasivas'):T('Passiva','Passive','Pasiva')}</div>`+passives.map(renderAbility).join('');
  if(actives.length) mhtml+=`<div class="card-modal-ability-section">${actives.length} ${actives.length>1?T('Ativas','Actives','Activas'):T('Ativa','Active','Activa')}</div>`+actives.map(renderAbility).join('');
  if(!k.abilities.length) mhtml+=`<div class="card-modal-ability"><b>${T('Sem habilidades especiais','No special abilities','Sin habilidades especiales')}</b> — ${T('vence pela coragem e pelo aço.','wins through courage and steel.','vence con coraje y acero.')}</div>`;
  if(k.stageAbility){
    mhtml+=`<div class="card-modal-ability-section">${T('Habilidade de Fase','Stage Ability','Habilidad de Fase')}</div>
      <div class="card-modal-ability stage-ability-entry">
        <div class="tier-tag">${T('apenas quando aparece como INIMIGA','only when it appears as an ENEMY','solo cuando aparece como ENEMIGA')} · ${T('a cada','every','cada')} ${k.stageAbility.cd} ${T('turnos','turns','turnos')}</div>
        <b>${L(k.stageAbility.nome)}</b> — ${L(k.stageAbility.desc)}
      </div>`;
  }
  if(k.frase) mhtml+=`<div class="card-modal-frase">“${L(k.frase)}”</div>`;
  abilitiesEl.innerHTML=mhtml;
  renderMotionShowcase(k);
  document.getElementById('closeCardModal').focus();
}

function openCharacterModal(src,nome,detalhe){
  window.__modalIdx=null;
  const modal=document.getElementById('cardModal');
  modal.classList.add('character-view');
  const img=document.getElementById('cardModalImg');
  img.onerror=null;
  img.src=src;
  img.alt=nome;
  document.getElementById('cardModalName').textContent=nome;
  document.getElementById('cardModalClasse').textContent=detalhe||'';
  document.getElementById('cardModalAbilities').innerHTML='';
  const showcase=document.getElementById('motionShowcase');
  const avatar=document.getElementById('motionShowcaseAvatar');
  if(avatar) stopHeroAnimation(avatar);
  if(showcase) showcase.hidden=true;
  document.getElementById('shareCardBtn').style.display='none';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  document.getElementById('closeCardModal').focus();
}

function closeCardModalFn(){
  const modal=document.getElementById('cardModal');
  const avatar=document.getElementById('motionShowcaseAvatar');
  if(avatar){ avatar.dataset.showcaseGeneration=String((Number(avatar.dataset.showcaseGeneration)||0)+1); delete avatar.dataset.requestedAction; delete avatar.dataset.showcaseHero; }
  stopHeroAnimation(avatar);
  resetMotionShowcaseVfx();
  window.__modalIdx=null;
  modal.classList.remove('show','character-view');
  modal.setAttribute('aria-hidden','true');
  document.getElementById('shareCardBtn').style.display='block';
}
document.getElementById('closeCardModal').addEventListener('click', closeCardModalFn);
document.getElementById('cardModal').addEventListener('click', (e)=>{
  if(e.target.id==='cardModal') closeCardModalFn();
});

function renderCardStrip(){
  const stripEl = document.getElementById('cardStrip');
  stripEl.innerHTML = '';
  computeBattleGemColors();
  ACTIVE.forEach(idx=>{
    const k = KINGDOMS[idx];
    const ag = battleGemColors[idx];
    const gemC=ag?ag.c:(k.orbColor||k.color), gemL=ag?ag.l:(k.orbColorLight||k.colorLight), gemD=ag?ag.d:(k.orbColorDark||k.colorDark);
    const mini = document.createElement('div');
    mini.className = 'mini-card';
    const direction=heroFacingDirection(k);
    mini.innerHTML = `
      <button class="mini-rotate" type="button" data-hero-index="${idx}" aria-pressed="${direction==='right'}" aria-label="${T(`${L(k.nome)} agora olha para a ${direction==='left'?'esquerda':'direita'}. Virar personagem.`,`${L(k.nome)} now faces ${direction}. Rotate character.`,`${L(k.nome)} ahora mira a la ${direction==='left'?'izquierda':'derecha'}. Girar personaje.`)}" title="${T('Virar personagem','Rotate character','Girar personaje')}">↻↺</button>
      <button class="mini-open-card" type="button" aria-label="${T(`Abrir carta de ${L(k.nome)}`,`Open ${L(k.nome)}'s card`,`Abrir la carta de ${L(k.nome)}`)}">
        <span class="mini-thumb"><img src="${THUMB(k.cardThumb||k.img)}"${THUMBF(k.cardThumb||k.img)} alt="${L(k.nome)}" decoding="async"></span>
        <span class="mini-card-copy">
          <span class="mini-name">${L(k.nome)}</span>
          <span class="mini-dps" id="dps-${k.id}">⚔ 0</span>
          <span class="mini-rarity"><span class="unit-gem" style="--ug:${gemC};--ug-l:${gemL};--ug-d:${gemD}" aria-hidden="true"></span>${L(k.rarity||'DIVINA')}</span>
          <span class="mini-stars" aria-label="${k.stars||7} ${T('estrelas','stars','estrellas')}">${'★'.repeat(k.stars||7)}</span>
        </span>
      </button>
    `;
    mini.querySelector('.mini-open-card').addEventListener('click', ()=>openCardModal(idx));
    mini.querySelector('.mini-rotate').addEventListener('click', ()=>toggleHeroFacing(idx));
    stripEl.appendChild(mini);
  });
}

function getSavedProgress(){
  try{
    const saved = JSON.parse(localStorage.getItem('12r_save')||'null');
    if(!saved || !Number.isFinite(Number(saved.stage))) return null;
    const team=Array.isArray(saved.team)?saved.team.filter(idx=>KINGDOMS[idx]).slice(0,4):[0,1,2,3];
    const normalized={...saved,version:10,team:team.length===4?team:[0,1,2,3]};
    if(Number(saved.version)!==10) localStorage.setItem('12r_save',JSON.stringify(normalized));
    return normalized;
  }catch(e){ return null; }
}

function saveProgress(forcedStage){
  if(towerMode||worldRun.active) return; // torre e mundos não tocam o save da campanha
  if(ACTIVE.length!==4) return;
  const safeStage = Math.max(0,Math.min(DUNGEON.length-1,forcedStage??stageIndex));
  localStorage.setItem('12r_save',JSON.stringify({version:10,stage:safeStage,team:[...ACTIVE],hp:Math.max(1,playerHP),seed:seedText,updated:Date.now()}));
  refreshContinueButton();
}

function refreshContinueButton(){
  /* v9.1: sem fases demo — Continuar aponta para o progresso do Reino dos Humanos */
  const btn = document.getElementById('continueBtn');
  const hint = document.getElementById('continueHint');
  let fases;
  try{ fases = WORLDS[0].fases; }
  catch(err){ btn.disabled = true; return; } /* chamada anterior à declaração de WORLDS (boot) */
  const prog = worldProg('humanos');
  const faseIdx = Math.min(prog.unlocked, fases.length-1);
  btn.disabled = false;
  hint.textContent = `${T('Reino dos Humanos','Human Realm','Reino de los Humanos')} · ${T('Fase','Stage','Fase')} ${faseIdx+1} · ${L(fases[faseIdx].nome)}`;
}

function closeAllPanels(){
  document.querySelectorAll('.pro-overlay.show').forEach(el=>el.classList.remove('show'));
  if(document.getElementById('cardModal').classList.contains('show')) closeCardModalFn();
}
function showMainMenu(options={}){
  /* Na inicialização não existe toque anterior para vazar. Armar o bloqueio aqui
     fazia o primeiro toque rápido em Opções ser descartado no celular. */
  if(options?.guard!==false) armTapGuard();
  resetCombatSchedule();
  stopPartyAnimations();
  stopArenaFireworks();
  gamePaused=false;
  cancelTempoSombrio();
  pendingDimensional=[];
  incineratePhaseKey=null; incinerateActive=false; incinerateStacks=0;
  stopMissionTimer();
  skipStory(false); /* diálogos de missão nunca sobrevivem à volta ao menu */
  hideTowerGameOverPanel();
  /* Torre força Pesadelo: devolve a dificuldade escolhida pelo jogador ao sair */
  if(towerPrevDifficulty){ difficulty=towerPrevDifficulty; towerPrevDifficulty=null; applyDifficultyUI(); }
  towerMode=false;
  bossRushMode=false;
  dailyRunMode=false;
  if(worldRun) worldRun.active=false;
  setAutoBattle(false);
  togglePhotoMode(false);
  closeAllPanels(); stopMusic(); busy=false; setBattlePhase('idle');
  ['stageClearOverlay','dungeonClearOverlay','defeatOverlay'].forEach(hideOverlay);
  const confetti=document.getElementById('victoryConfetti');
  if(confetti) confetti.replaceChildren();
  victoryExitToMap=false;
  victoryExitMode='world';
  victoryNextStage=false;
  updateVictoryActionLabel();
  document.getElementById('mainMenu').style.display='flex';
  document.getElementById('selectScreen').style.display='none';
  document.getElementById('gameScreen').style.display='none';
  document.body.classList.remove('game-active');
  sceneBgEl.dataset.screen='menu'; refreshContinueButton();
}
function showSelection(){
  /* A seleção também pode ser aberta no meio de uma luta. Ela precisa ser uma
     fronteira de fase: nenhum ataque, espera, relógio ou VFX pode sobreviver
     oculto atrás da tela de formação. */
  resetCombatSchedule();
  stopPartyAnimations();
  stopArenaFireworks();
  cancelTempoSombrio();
  stopMissionTimer();
  stopMusic();
  gamePaused=false;
  prepareStorySelection();
  closeAllPanels(); stopMusic(); busy=false; setBattlePhase('idle');
  document.getElementById('mainMenu').style.display='none';
  document.getElementById('gameScreen').style.display='none';
  document.getElementById('selectScreen').style.display='flex';
  document.body.classList.remove('game-active');
  sceneBgEl.dataset.screen='selection'; renderSelectGrid();
}
function abandonSpecialRunForTeamChange(){
  /* Trocar a equipe abandona a sequência atual. Assim a seleção nunca vira
     uma cura gratuita no andar/chefe que o jogador estava prestes a perder. */
  if(towerMode){ towerFloor=1; survivorStageStartHP=0; if(dailyRunMode) rngState=initialRngState; }
  if(bossRushMode) bossRushIdx=0;
  showSelection();
}
function beginGame(startAt=0,restoredHP=null){
  armTapGuard();
  resetCombatSchedule();
  resetRunStats();
  pendingDimensional=[];
  incineratePhaseKey=null; incinerateActive=false; incinerateStacks=0;
  /* Um início não pode herdar a última fase destravada nem cartas de outra
     etapa. A seleção narrativa é revalidada aqui, no limite de entrada. */
  const orphanStart=!worldRun.active&&!towerMode&&!bossRushMode;
  if(orphanStart){
    worldRun={active:true,fase:0,nivel:1,storyMode:false};
    startAt=0;
  }
  if(!orphanStart) prepareStorySelection();
  if(!isValidHeroTeam(chosenIds)){
    chosenIds=[...new Set(chosenIds)].filter(index=>Number.isInteger(index)&&KINGDOMS[index]).slice(0,4);
    renderSelectGrid(); sfxInvalid(); return;
  }
  ensureAudio();
  ACTIVE = [...chosenIds];
  preloadHeroActions(ACTIVE);
  PLAYER_MAX_HP = computePlayerMaxHP();
  playerHP = Math.max(1,Math.min(PLAYER_MAX_HP,restoredHP||PLAYER_MAX_HP));
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
  resetBattleRunConsumables();
  selected=null; busy=false; comboStep=0; closeAllPanels();
  battleHistory=[]; battleHistorySeq=0; qaRitualTriggered=false;
  document.body.classList.add('game-active');
  document.getElementById('mainMenu').style.display = 'none';
  document.getElementById('selectScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'flex';
  sceneBgEl.dataset.screen='game';
  renderPartyArena();
  renderCardStrip();
  updatePlayerHP();
  loadStage(Math.max(0,Math.min(DUNGEON.length-1,startAt)));
  if(allianceBonus.rotulos.length){
    scheduleCombat(()=>setBattleStatus('⚜ '+T('Bônus de Aliança','Alliance Bonus','Bono de Alianza')+': '+allianceBonus.rotulos.join(' · '),'support'),700);
  }
  pendingStage=0;
  if(!localStorage.getItem('12r_tutorial_seen')){
    localStorage.setItem('12r_tutorial_seen','true');
    scheduleCombat(()=>openPanel('helpScreen'),450);
  }
}

var galleryDeckOpen={}; /* decks abertos na galeria */
function renderGallery(){
  const grid=document.getElementById('galleryGrid');
  grid.classList.add('gallery-showcase');
  grid.innerHTML='';
  { const tot=KINGDOMS.length;
    const head=document.createElement('div');
    head.className='gallery-count gallery-showcase-intro';
    head.innerHTML=`<span>${T('Coleção de Ygdria','Ygdria Collection','Colección de Ygdria')}</span><small>🎴 ${tot} ${T('cartas','cards','cartas')} · 12 ${T('reinos','realms','reinos')}</small>`;
    grid.appendChild(head); }
  document.getElementById('enemyGallerySection')?.remove();
  /* v9.1 · Galeria em DECKS por reino: cada reino agrupa seu herói divino,
     as cartas jogáveis do deck (campo deck:'<reino>') e as cartas por vir.
     Novas cartas de qualquer reino entram automaticamente no seu deck. */
  const ordem=['humanos','luz','agua','fogo','natureza','terra','areia','sombras','raio','vento','chuvas','gelo'];
  const nomesDeck={humanos:T('Reino Rosa · Humanos','Rose Realm · Humans','Reino Rosa · Humanos')};
  ordem.forEach(deckId=>{
    const membros=KINGDOMS.filter(k=>(k.deck||k.id)===deckId);
    if(!membros.length) return;
    const lider=KINGDOMS.find(k=>k.id===deckId);
    const emBreve=deckId==='humanos'?Object.values(HUMANOS_CARDS).filter(c=>c.isCard):[];
    const section=document.createElement('div');
    section.className='deck-section deck-'+deckId+(galleryDeckOpen[deckId]?' open':'');
    section.innerHTML=`<div class="deck-header" role="button" tabindex="0" aria-expanded="${galleryDeckOpen[deckId]?'true':'false'}" style="--realm:${lider?.color||'#d4af5a'}">
      <span class="deck-icon"><svg viewBox="0 0 24 24">${KINGDOM_ICON[deckId]||''}</svg></span>
      <b>${nomesDeck[deckId]||L(lider?.reino||deckId)}</b>
      <small>${membros.length+emBreve.length} ${(membros.length+emBreve.length)>1?T('cartas','cards','cartas'):T('carta','card','carta')}</small><span class="deck-caret" aria-hidden="true">▸</span></div>`;
    const gHeader=section.querySelector('.deck-header');
    const gAlternar=()=>{ galleryDeckOpen[deckId]=!galleryDeckOpen[deckId]; section.classList.toggle('open',!!galleryDeckOpen[deckId]); gHeader.setAttribute('aria-expanded', galleryDeckOpen[deckId]?'true':'false'); };
    gHeader.addEventListener('click',gAlternar);
    gHeader.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); gAlternar(); } });
    const dgrid=document.createElement('div');
    dgrid.className='deck-grid';
    const favs=(()=>{ try{ return sanitizeHeroIdList(JSON.parse(localStorage.getItem('12r_favs')||'[]')); }catch(e){ return []; } })();
    /* Ordem: favoritas primeiro; depois maior raridade (estrelas) primeiro */
    membros.sort((a,b)=>((favs.includes(b.id)?1:0)-(favs.includes(a.id)?1:0)) || ((b.stars||0)-(a.stars||0)));
    membros.forEach(k=>{
      const idx=KINGDOMS.indexOf(k);
      const card=document.createElement('div');
      card.className='gallery-card'+(favs.includes(k.id)?' fav':'');
      card.style.setProperty('--realm',k.color); card.style.setProperty('--realm-dark',k.colorDark);
      const vistos=(()=>{ try{ return sanitizeHeroIdList(JSON.parse(localStorage.getItem('12r_seen')||'[]')); }catch(e){ return []; } })();
      card.innerHTML=`<div class="gallery-thumb-wrap">${vistos.includes(k.id)?'':'<span class="new-badge">'+T('NOVO!','NEW!','¡NUEVO!')+'</span>'}<img src="${THUMB(k.cardThumb||k.img)}"${THUMBF(k.cardThumb||k.img)} alt="${k.nome}" loading="lazy" decoding="async"><button class="gallery-zoom" type="button" aria-label="${T('Ampliar carta de','Enlarge card of','Ampliar la carta de')} ${k.nome}">🔍</button></div><b><span class="realm-dot" style="--realm:${k.color};--realm-light:${k.colorLight};--realm-dark:${k.colorDark};margin-right:3px;"></span>${k.nome}</b><small>${L(k.rarity||'DIVINA')} · ${'★'.repeat(k.stars||7)}</small>`;
      card.querySelector('.gallery-zoom').addEventListener('click',()=>openCardModal(idx));
      const favBtn=document.createElement('button');
      favBtn.type='button'; favBtn.className='fav-btn'; favBtn.setAttribute('aria-label',T('Favoritar','Favorite','Favorito'));
      favBtn.textContent=favs.includes(k.id)?'❤':'🤍';
      favBtn.addEventListener('click',ev=>{
        ev.stopPropagation();
        let f2; try{ f2=sanitizeHeroIdList(JSON.parse(localStorage.getItem('12r_favs')||'[]')); }catch(e){ f2=[]; }
        f2=f2.includes(k.id)?f2.filter(x=>x!==k.id):[...f2,k.id];
        localStorage.setItem('12r_favs',JSON.stringify(f2));
        renderGallery(); sfxSelect();
      });
      card.querySelector('.gallery-thumb-wrap').appendChild(favBtn);
      dgrid.appendChild(card);
    });
    emBreve.forEach(c=>{
      const card=document.createElement('div');
      card.className='gallery-card deck-coming';
      card.innerHTML=`<div class="gallery-thumb-wrap"><img src="${c.card}" alt="${c.nome}" loading="lazy"></div><b>${c.nome}</b><small>${T('em breve','coming soon','próximamente')}</small>`;
      dgrid.appendChild(card);
    });
    section.appendChild(dgrid);
    grid.appendChild(section);
  });
  /* Personagens do Jogo: jogáveis e inimigos registrados, com visualização ampliada. */
  const best=bestiary();
  const personagens=KINGDOMS.map(k=>({
    nome:L(k.nome),
    spr:k.sprite||k.cardThumb||k.img,
    detalhe:L(k.reino)+' · '+T('Jogável','Playable','Jugable')
  }));
  const nomesJogaveis=new Set(KINGDOMS.map(k=>L(k.nome)));
  Object.keys(best).forEach(nm=>{
    if(nomesJogaveis.has(L(nm))) return;
    const spr=Object.values(HUMANOS_ETYPES).find(t=>t.n===nm)?.sprite||Object.values(HUMANOS_CARDS).find(c=>c.nome===nm)?.sprite;
    personagens.push({nome:L(nm),spr,detalhe:T('Encontrado','Encountered','Encontrado')+' ×'+best[nm]});
  });
  const bsec=document.createElement('div');
  bsec.className='deck-section characters-game-section'+(galleryDeckOpen.__characters?' open':'');
  bsec.innerHTML=`<div class="deck-header" role="button" tabindex="0" aria-expanded="${galleryDeckOpen.__characters?'true':'false'}" style="--realm:#9a6a3a">
    <span class="deck-icon"><svg viewBox="0 0 24 24"><path d="M12 2 2 7v10l10 5 10-5V7Z" fill="#fff" fill-opacity=".9"/></svg></span>
    <b>${T('Personagens do Jogo','Game Characters','Personajes del Juego')}</b>
    <small>${personagens.length} ${T('personagens','characters','personajes')}</small><span class="deck-caret" aria-hidden="true">▸</span></div>`;
  const bh=bsec.querySelector('.deck-header');
  const alternarPersonagens=()=>{
    galleryDeckOpen.__characters=!galleryDeckOpen.__characters;
    bsec.classList.toggle('open',!!galleryDeckOpen.__characters);
    bh.setAttribute('aria-expanded',galleryDeckOpen.__characters?'true':'false');
  };
  bh.addEventListener('click',alternarPersonagens);
  bh.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();alternarPersonagens();} });
  const bgrid=document.createElement('div');
  bgrid.className='deck-grid characters-game-grid';
  personagens.forEach(personagem=>{
    const bc=document.createElement('div');
    bc.className='gallery-card beast-card character-game-card';
    bc.setAttribute('role','button');
    bc.setAttribute('tabindex','0');
    const safeName=escapeHtml(personagem.nome);
    const safeDetail=escapeHtml(personagem.detalhe);
    const safeSprite=escapeHtml(personagem.spr||'');
    bc.innerHTML=`<div class="gallery-thumb-wrap">${personagem.spr?`<img src="${safeSprite}" alt="${safeName}" loading="lazy">`:'<span style="font-size:34px">👤</span>'}<span class="character-expand" aria-hidden="true">⛶</span></div><b>${safeName}</b><small>${safeDetail}</small>`;
    const ampliar=()=>{ if(personagem.spr) openCharacterModal(personagem.spr,personagem.nome,personagem.detalhe); };
    bc.addEventListener('click',ampliar);
    bc.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();ampliar();} });
    bgrid.appendChild(bc);
  });
  bsec.appendChild(bgrid);
  grid.appendChild(bsec);
}
const STAGE_ART=["assets/bg/bg-08.png","assets/bg/bg-09.png","assets/bg/bg-10.png","assets/bg/bg-11.png"];
/* v9.1: jornada da masmorra removida (fases demo sairam do jogo) */
function openPanel(id){
  if(id==='galleryScreen') renderGallery();
  if(id==='achScreen') renderAchievements();
  if(id==='shopScreen') renderShop();
  if(id==='mochilaScreen') renderMochila();
  if(id==='worldScreen') renderWorldMap();
  document.getElementById(id).classList.add('show');
}
function applySettings(){
  document.body.classList.toggle('reduce-motion',reducedMotion);
  document.body.classList.toggle('motion-enabled',!reducedMotion);
  document.body.classList.toggle('high-contrast',highContrast);
  document.body.classList.toggle('large-text',largeText);
  document.body.classList.toggle('reduce-flashes',reduceFlashes);
  if(arenaEl) arenaEl.dataset.arenaQuality=resolvedGraphicsQuality();
  document.body.classList.remove('quality-high','quality-medium','quality-economy');
  document.body.classList.add('quality-'+resolvedGraphicsQuality());
  document.getElementById('volumeRange').value=Math.round(masterVolume*100);
  document.getElementById('musicVolumeRange').value=Math.round(musicVolume*100);
  document.getElementById('sfxVolumeRange').value=Math.round(sfxVolume*100);
  document.getElementById('qualitySelect').value=graphicsQuality;
  document.getElementById('reduceMotionToggle').checked=reducedMotion;
  document.getElementById('particlesToggle').checked=particlesEnabled;
  document.getElementById('hapticsToggle').checked=hapticsEnabled;
  document.getElementById('highContrastToggle').checked=highContrast;
  document.getElementById('largeTextToggle').checked=largeText;
  document.getElementById('reduceFlashesToggle').checked=reduceFlashes;
  document.getElementById('muteBtn').textContent=musicMuted?'🔇':'🔊';
  syncArenaFireworks();
}

/* Galeria local da Missão 10/5. Reabre o campo real do jogo e chama uma única
   linha do tempo, sem precisar falsear HP, sprites ou VFX. */
function runHumanFinalePreview(mode='prelude',options={}){
  const valid=['prelude','defeat','victory'];
  const scene=valid.includes(mode)?mode:'prelude';
  resetCombatSchedule();
  localStorage.setItem('12r_tutorial_seen','true');
  localStorage.setItem('12r_tutorial','true');
  document.body.classList.add('human-finale-preview');
  humanFinalePreviewSetup=true;
  worldRun={active:true,fase:9,nivel:5,storyMode:false};
  chosenIds=['adriel-jovem','gareth','roland','elizier'].map(id=>KINGDOMS.findIndex(hero=>hero.id===id));
  beginGame(0);
  skipStory();
  hideOverlay('helpScreen');
  /* A galeria é uma réplica da arena, não o fluxo de abertura do jogo. A
     tela inicial e o brinde diário não podem encobrir a cena no celular. */
  const clearPreviewChrome=()=>{
    document.getElementById('introScreen')?.classList.remove('show');
    document.querySelectorAll('.ach-toast').forEach(toast=>toast.remove());
  };
  clearPreviewChrome();
  setTimeout(clearPreviewChrome,700);
  humanFinalePreviewSetup=false;
  missionFieldStarted=false; stageTransitioning=false; busy=false;
  if(scene==='prelude') triggerHumanFinalePrelude(options);
  else{
    humanFinalePreludeFinished=true;
    missionFieldStarted=true;
    triggerHumanFinaleCinematic(scene,{...options,preview:true});
  }
  return scene;
}
window.YGDRIA_HUMAN_FINALE=Object.freeze({
  run:(mode,options={})=>runHumanFinalePreview(mode,options),
  status:()=>({prelude:humanFinalePreludeRunning,cinematic:humanFinaleCinematicRunning,resolved:humanFinaleOutcomeResolved})
});

startBtnEl.addEventListener('click',()=>beginGame(pendingStage));
document.getElementById('playBtn').addEventListener('click',()=>{ towerMode=false; bossRushMode=false; worldRun.active=false; pendingStage=0; openMapScreen(); });
document.getElementById('continueBtn').addEventListener('click',()=>{ const prog=worldProg('humanos'); startWorldFase(Math.min(prog.unlocked, WORLDS[0].fases.length-1)); });
document.getElementById('replayStoryBtn')?.addEventListener('click',()=>{ if(pendingReplayPhase!==null) startWorldFase(pendingReplayPhase,{storyMode:true}); });
document.getElementById('replayFreeBtn')?.addEventListener('click',()=>{ if(pendingReplayPhase!==null) startWorldFase(pendingReplayPhase,{storyMode:false}); });
document.getElementById('replayHardBtn')?.addEventListener('click',()=>{ if(pendingReplayPhase!==null&&difficulty!=='pesadelo') startWorldFase(pendingReplayPhase,{storyMode:true,difficulty:nextDifficulty(difficulty)}); });
document.getElementById('bossRushBtn')?.addEventListener('click',()=>{
  /* v9.2: o Desafio dos Chefes agora passa pelo MAPA DE YGDRIA — cada reino
     conquistado libera o seu próprio desafio */
  towerMode=false; worldRun.active=false; bossRushMode=false; pendingStage=0;
  openMapScreen('boss');
  sfxSelect();
});
document.getElementById('shakeToggle')?.addEventListener('click',()=>{
  const lig=localStorage.getItem('12r_shake')!=='0';
  localStorage.setItem('12r_shake', lig?'0':'1');
  document.getElementById('shakeToggle').textContent=lig?T('Desligado','Off','Apagado'):T('Ligado','On','Encendido');
  sfxSelect();
});
document.getElementById('autoActivesToggle')?.addEventListener('click',()=>{
  autoActives=!autoActives;
  localStorage.setItem('12r_autoactives', autoActives?'1':'0');
  document.getElementById('autoActivesToggle').textContent=autoActives?T('Ligado','On','Encendido'):T('Desligado','Off','Apagado');
  sfxSelect();
});
document.getElementById('restoreDefaultsBtn')?.addEventListener('click',()=>{
  ['12r_shake','12r_autoactives','12r_difficulty','12r_lang_set','12r_volume','12r_music_volume','12r_sfx_volume','12r_quality','12r_high_contrast','12r_large_text','12r_reduce_flashes','12r_motion','12r_particles','12r_haptics','12r_tactical_grid'].forEach(k=>localStorage.removeItem(k));
  setBattleStatus?.(T('Padrões restaurados. Recarregue o jogo.','Defaults restored. Reload the game.','Valores restaurados. Recarga el juego.'));
  location.reload();
});
document.getElementById('galleryBtn').addEventListener('click',()=>openPanel('galleryScreen'));
document.getElementById('selectGalleryBtn').addEventListener('click',()=>openPanel('galleryScreen'));
// v9.1: botões Jornada/Mundos removidos — o fluxo agora é Jogar → Mapa de Ygdria
document.getElementById('optionsBtn').addEventListener('click',()=>openPanel('optionsScreen'));
document.getElementById('helpBtn').addEventListener('click',()=>openPanel('helpScreen'));
document.getElementById('battleToolsToggle').addEventListener('click',()=>toggleBattleTools());
document.getElementById('battleToolsClose').addEventListener('click',()=>toggleBattleTools(false));
document.getElementById('cycleTargetTool').addEventListener('click',cycleBattleTarget);
document.getElementById('autoTargetTool').addEventListener('click',toggleAutoTarget);
document.getElementById('speedTool').addEventListener('click',cycleBattleSpeed);
document.getElementById('musicMoodTool').addEventListener('click',cycleMusicMood);
document.getElementById('hintTool').addEventListener('click',showBestMoveHint);
document.getElementById('autoTool')?.addEventListener('click',()=>{ setAutoBattle(!autoBattle); sfxSelect(); });
document.getElementById('photoModeBtn')?.addEventListener('click',()=>togglePhotoMode(true));
document.getElementById('shareCardBtn')?.addEventListener('click',()=>{
  const k=KINGDOMS[window.__modalIdx??0]; if(!k) return;
  const linhas=[`🎴 ${k.nome} — ${L(k.reino)} · ${L(k.classe)}`,`${L(k.rarity||'DIVINA')} ${'★'.repeat(k.stars||7)} · ATQ ${k.atk||12}`,
    ...k.abilities.map(a=>`• ${L(a.name)}: ${L(a.desc)}`),
    k.stageAbility?`🗡 ${T('Habilidade de Fase','Stage Ability','Habilidad de Fase')}: ${L(k.stageAbility.nome)} — ${L(k.stageAbility.desc)}`:'',
    k.frase?`“${L(k.frase)}”`:'' ,'— 12 Reinos · Crônicas de Ygdria'].filter(Boolean);
  navigator.clipboard?.writeText(linhas.join('\n')).then(()=>{
    const b=document.getElementById('shareCardBtn'); const t0=b.textContent;
    b.textContent='✅ '+T('Copiado!','Copied!','¡Copiado!');
    setTimeout(()=>{ b.textContent=t0; },1600);
  });
});
/* F10 · Atalhos de teclado (desktop): 1-4 herói, P pausa, H sugestão, A auto */
document.addEventListener('keydown',e=>{
  if(!document.body.classList.contains('game-active')) return;
  if(/input|textarea/i.test(document.activeElement?.tagName||'')) return;
  if(e.key>='1'&&e.key<='4'){ const i=ACTIVE[Number(e.key)-1]; if(i!==undefined) onHeroAvatarClick(i); }
  else if(e.key==='h'||e.key==='H') showBestMoveHint();
  else if(e.key==='a'||e.key==='A') setAutoBattle(!autoBattle);
});
document.getElementById('shuffleTool').addEventListener('click',useRoyalShuffle);
document.getElementById('gridTool').addEventListener('click',toggleTacticalGrid);
document.getElementById('formationTool').addEventListener('click',cycleHeroFormation);
document.getElementById('fullscreenTool').addEventListener('click',toggleGameFullscreen);
document.getElementById('historyBtn').addEventListener('click',openBattleHistory);
document.getElementById('copyHistoryBtn').addEventListener('click',copyBattleHistory);
document.getElementById('clearHistoryBtn').addEventListener('click',clearBattleHistory);
document.getElementById('selectBackBtn').addEventListener('click',()=>{
  if(worldRun.active){ // desistiu da fase: volta ao mapa com a lista de fases aberta
    worldRun.active=false;
    showMainMenu();
    openMapScreen();
    renderWorldMap();
    openPanel('worldScreen');
    return;
  }
  showMainMenu();
});
document.getElementById('autoTeamBtn').addEventListener('click',()=>{
  let ult=null; try{ ult=JSON.parse(localStorage.getItem('12r_lastteam')||'null'); }catch(e){}
  chosenIds=isValidHeroTeam(ult)?[...ult]:[0,1,2,3];
  renderSelectGrid(); sfxSelect();
});

swapBtnEl.addEventListener('click', ()=>{
  if(towerMode||bossRushMode) abandonSpecialRunForTeamChange();
  else showSelection();
});
document.getElementById('swapTool')?.addEventListener('click',()=>{
  toggleBattleTools(false);
  if(towerMode||bossRushMode) abandonSpecialRunForTeamChange();
  else showSelection();
});

document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click',()=>{ btn.closest('.pro-overlay').classList.remove('show'); if(btn.closest('#helpScreen'))localStorage.setItem('12r_tutorial_seen','true'); });
});
document.querySelectorAll('.pro-overlay').forEach(panel=>{
  panel.addEventListener('click',e=>{ if(e.target===panel && panel.id!=='pauseScreen')panel.classList.remove('show'); });
});
let phaseBeforePause='idle';
function pauseBattle(){
  if(gamePaused||battlePhase==='paused') return;
  if(!gamePaused&&battlePhase!=='paused') phaseBeforePause=battlePhase;
  gamePaused=true; pauseCombatTimers(); pausePartyAnimations(); pauseEnemyAnimations(); setBattlePhase('paused'); pauseMissionClock(); stopMusic(); openPanel('pauseScreen');
}
function resumeBattle(){
  gamePaused=false;
  const resumePhase=BATTLE_PHASES.has(phaseBeforePause)&&phaseBeforePause!=='paused'?phaseBeforePause:(busy?'resolving':'idle');
  setBattlePhase(resumePhase); resumeCombatTimers(); resumePartyAnimations(); resumeEnemyAnimations(); resumeMissionClock();
  document.getElementById('pauseScreen').classList.remove('show');
  if(!musicMuted) playStageMusic(activeStageData?.scene ?? stageIndex);
}
document.getElementById('pauseBtn').addEventListener('click',pauseBattle);
document.getElementById('resumeBtn').addEventListener('click',resumeBattle);
document.getElementById('pauseOptionsBtn').addEventListener('click',()=>{ openPanel('optionsScreen'); });
document.getElementById('restartStageBtn').addEventListener('click',()=>{ document.getElementById('pauseScreen').classList.remove('show'); restartFromControls(); });
document.getElementById('returnMenuBtn').addEventListener('click',showMainMenu);
document.getElementById('volumeRange').addEventListener('input',e=>{ masterVolume=Number(e.target.value)/100; localStorage.setItem('12r_volume',String(e.target.value)); });
document.getElementById('musicVolumeRange').addEventListener('input',e=>{ musicVolume=Number(e.target.value)/100; localStorage.setItem('12r_music_volume',String(e.target.value)); });
document.getElementById('sfxVolumeRange').addEventListener('input',e=>{ sfxVolume=Number(e.target.value)/100; localStorage.setItem('12r_sfx_volume',String(e.target.value)); sfxSelect(); });
document.getElementById('qualitySelect').addEventListener('change',e=>{ graphicsQuality=e.target.value; localStorage.setItem('12r_quality',graphicsQuality); applySettings(); });
document.getElementById('reduceMotionToggle').addEventListener('change',e=>{
  reducedMotion=e.target.checked;
  localStorage.setItem('12r_motion',reducedMotion?'reduced':'full');
  applySettings();
  if(reducedMotion){
    stopPartyAnimations();
    stopHeroAnimation(document.getElementById('motionShowcaseAvatar'));
  }else if(document.body.classList.contains('game-active')){
    resetPartyAnimationState();
  }
});
document.getElementById('particlesToggle').addEventListener('change',e=>{ particlesEnabled=e.target.checked; localStorage.setItem('12r_particles',String(particlesEnabled)); applySettings(); });
document.getElementById('hapticsToggle').addEventListener('change',e=>{ hapticsEnabled=e.target.checked; localStorage.setItem('12r_haptics',String(hapticsEnabled)); });
document.getElementById('highContrastToggle').addEventListener('change',e=>{ highContrast=e.target.checked; localStorage.setItem('12r_high_contrast',highContrast?'1':'0'); applySettings(); });
document.getElementById('largeTextToggle').addEventListener('change',e=>{ largeText=e.target.checked; localStorage.setItem('12r_large_text',largeText?'1':'0'); applySettings(); });
document.getElementById('reduceFlashesToggle').addEventListener('change',e=>{ reduceFlashes=e.target.checked; localStorage.setItem('12r_reduce_flashes',reduceFlashes?'1':'0'); applySettings(); });
document.getElementById('resetProgressBtn').addEventListener('click',()=>{
  if(!confirm(T('Apagar o progresso do Reino dos Humanos?','Erase Human Realm progress?','¿Borrar el progreso del Reino de los Humanos?')))return;
  localStorage.removeItem('12r_world_humanos'); localStorage.removeItem('12r_save'); localStorage.removeItem('12r_unlocked');
  refreshContinueButton();
});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(document.querySelector('.overlay.show')) return;
  if(document.getElementById('cardModal').classList.contains('show')){closeCardModalFn();return;}
  const open=[...document.querySelectorAll('.pro-overlay.show')].pop();
  if(open && open.id!=='pauseScreen'){open.classList.remove('show');return;}
  if(document.getElementById('gameScreen').style.display==='flex') pauseBattle();
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden && document.getElementById('gameScreen').style.display==='flex'){
    pauseBattle();
  }
});
function preloadOfficialAssets(){
  const limit=V10.quality?.preload?.[resolvedGraphicsQuality()]||16;
  const selectedCharacters=chosenIds.map(i=>KINGDOMS[i]).filter(Boolean);
  const priority=[...new Set([
    ...selectedCharacters.flatMap(k=>[
      THUMB(k.cardThumb||k.img),
      k.sprites?.idle?.src,
      /* A arte estática só é antecipada quando não existe idle animado. */
      k.sprites?.idle?.src?null:k.sprite
    ])
  ].filter(Boolean))];
  const load=src=>new Promise(resolve=>{ const image=new Image(); image.onload=()=>resolve(true); image.onerror=()=>{ markSpriteFailed(src); resolve(false); }; image.decoding='async'; image.src=src; });
  const critical=priority.slice(0,limit);
  const remaining=priority.slice(limit);
  return Promise.allSettled(critical.map(load)).then(()=>{
    document.body.classList.add('assets-ready');
    if(resolvedGraphicsQuality()==='economy'||navigator.connection?.saveData) return;
    const idle=window.requestIdleCallback||((cb)=>setTimeout(cb,700));
    idle(()=>remaining.forEach((src,i)=>setTimeout(()=>load(src),i*80)),{timeout:3000});
  });
}

function preloadHeroActions(indices=ACTIVE){
  const economy=resolvedGraphicsQuality()==='economy'||navigator.connection?.saveData;
  const mobileViewport=matchMedia('(max-width:700px)').matches||navigator.maxTouchPoints>0;
  /* No mobile, a folha de impacto é parte do primeiro golpe recebido. Ela
     precisa entrar no lote crítico junto do idle; deixá-la para um
     requestIdleCallback fazia o primeiro contra-ataque trocar a textura
     ainda não decodificada durante a composição do palco. */
  const allowedActions=economy?['idle','hit','attack']:Object.keys(HERO_ACTIONS);
  const sources=[...new Set([
    ...indices.flatMap(i=>allowedActions.map(action=>KINGDOMS[i]?.sprites?.[action]?.src)).filter(Boolean),
    /* A assinatura do golpe é parte da primeira ação, não um enfeite tardio. */
    ...indices.map(i=>HUMAN_CHAPTER_ATTACK_SHEETS[KINGDOMS[i]?.id]).filter(Boolean)
  ])];
  const load=src=>preloadSpriteSource(src).then(()=>true).catch(()=>{ markSpriteFailed(src); return false; });
  const criticalActions=mobileViewport?['idle','attack','cast','hit']:['idle','attack','cast'];
  const criticalSources=new Set([
    ...indices.flatMap(i=>criticalActions.map(action=>KINGDOMS[i]?.sprites?.[action]?.src)).filter(Boolean),
    ...indices.map(i=>HUMAN_CHAPTER_ATTACK_SHEETS[KINGDOMS[i]?.id]).filter(Boolean)
  ]);
  return Promise.allSettled(sources.filter(src=>criticalSources.has(src)).map(load)).then(()=>{
    if(economy) return;
    const requestIdle=window.requestIdleCallback||((cb)=>setTimeout(cb,700));
    requestIdle(()=>sources.filter(src=>!criticalSources.has(src)).forEach((src,index)=>setTimeout(()=>load(src),index*120)),{timeout:3500});
  });
}
const spritePreloadCache=new Map();
function preloadSpriteSource(src){
  if(!src) return Promise.reject(new Error('Sprite source ausente'));
  if(failedSpriteAssets.has(src)) return Promise.reject(new Error('Sprite source indisponível'));
  if(spritePreloadCache.has(src)) return spritePreloadCache.get(src);
  const pending=new Promise((resolve,reject)=>{
    const image=new Image();
    image.onload=()=>{
      /* onload is not the same as decoded: mobile browsers may still upload
         the bitmap to the compositor after onload. Await decode when it is
         available so a hit-sheet swap never exposes an empty frame. */
      const decoded=(matchMedia('(max-width:700px)').matches||navigator.maxTouchPoints>0)&&typeof image.decode==='function'?image.decode().catch(()=>{}):Promise.resolve();
      decoded.then(()=>{ readySpriteAssets.add(src); resolve(src); });
    };
    image.onerror=()=>{ markSpriteFailed(src); spritePreloadCache.delete(src); reject(new Error('Falha ao carregar '+src)); };
    image.decoding='async';
    image.src=animationAssetUrl(src);
  });
  spritePreloadCache.set(src,pending);
  return pending;
}
preloadOfficialAssets();
if(['127.0.0.1','localhost'].includes(location.hostname)){
  window.__12rQA={
    snapshot:()=>({
      stageIndex,playerHP,enemyHP:enemies.map(e=>e.hp),heroProgress:{...heroProgress},
      statuses:{playerShield,enemyBlindTurns,reflectTurns,invulnerableTurns,lifestealCharges,lastDragonRitual,incinerateActive,incinerateStacks,musicMoodMode},
      stageTurns,busy,stageTransitioning,battlePhase,canAcceptPlayerInput:canAcceptPlayerInput(),graphicsQuality:resolvedGraphicsQuality(),version:APP_VERSION
    }),
    armTapGuard:(duration=2000)=>{ armTapGuard(duration); return performance.now()<tapGuardUntil; },
    grantEnergy:(heroIdx,amount=100)=>{
      heroProgress[heroIdx]=Math.max(0,Math.min(99,amount));
      if(amount>=100){
        const active=KINGDOMS[heroIdx]?.abilities.find(ability=>ability.kind==='active');
        if(active){ heroActiveQueue[heroIdx]=[active]; heroReady[heroIdx]=true; beginHeroConjurationLoop(heroIdx); }
      }
      updateHeroProgressUI(heroIdx);
      return {progress:heroProgress[heroIdx],queued:(heroActiveQueue[heroIdx]||[]).length};
    },
    triggerTier:(heroIdx,gems)=>{
      const ability=KINGDOMS[heroIdx]?.abilities.find(a=>a.gems===gems);
      if(!ability) throw new Error('Ability tier not found');
      triggerAbility(heroIdx,ability);
      return ability.name;
    },
    setQuality:(value)=>{ if(!V10.quality?.values?.includes(value)) throw new Error('Invalid quality'); graphicsQuality=value; applySettings(); return resolvedGraphicsQuality(); },
    fireworksPhysicsProbe:()=>{
      const canvas=arenaEl?.querySelector('.arena-fireworks-canvas');
      const state=arenaFireworks;
      return {
        atmosphere:arenaEl?.dataset.missionAtmosphere||'',canvas:Boolean(canvas),running:Boolean(state?.raf),
        mode:!particlesEnabled?'disabled':(reducedMotion||reduceFlashes?'reduced-static':'ballistic'),
        quality:resolvedGraphicsQuality(),particleCap:state?.particleCap||0,burstSize:state?.burstSize||0,
        activeParticles:state?.particles?.filter(p=>p.active).length||0,activeRockets:state?.rockets?.filter(r=>r.active).length||0,
        gravity:state?.particles?.some(p=>p.active&&p.gravity>0)||false,drag:state?.particles?.some(p=>p.active&&p.drag<1)||false
      };
    },
    setPhase:(value)=>{ setBattlePhase(value); return battlePhase; },
    enemyAnimationProbe:()=>{
      enemies=[
        {name:'Gareth',cardId:'gareth',hp:180,maxHp:180,atk:20,sprite:'assets/enemies/humanos/gareth.png',isBoss:true},
        {name:'Slime de Cerejeira',etype:'slimeCereja',hp:80,maxHp:80,atk:9,sprite:'assets/enemies/slime/single-1.png'}
      ];
      renderEnemies();
      const character=document.getElementById('enemyPortrait-0');
      const generic=document.getElementById('enemyPortrait-1');
      const idleSource=generic?.querySelector('.enemy-runtime-sheet')?.style.getPropertyValue('--sprite-url')||'';
      const idleFrameCount=enemyAnimationCharacter(enemies[1])?.sprites?.idle?.frameOrder?.length||0;
      const rootedHost=document.createElement('div');
      document.body.appendChild(rootedHost);
      animateEnemyAvatar(rootedHost,{name:'Capitão',etype:'capitao',hp:180,maxHp:180,atk:20,sprite:'assets/enemies/humanos/capitao.png'},'idle');
      const rootedSheet=rootedHost.querySelector('.enemy-rooted-idle-sheet');
      const rootedArt=rootedHost.querySelector('.enemy-rooted-idle-art');
      const rootedIdle={
        active:rootedHost.classList.contains('enemy-rooted-idle'),
        sheetAnimation:getComputedStyle(rootedSheet).animationName,
        sheetTransform:getComputedStyle(rootedSheet).transform,
        source:rootedArt?.style.getPropertyValue('--rooted-idle-url')||''
      };
      rootedHost.remove();
      const bossStarCount=document.querySelectorAll('.boss-presence-mark').length;
      playEnemyAction(0,'attack'); playEnemyAction(1,'cast');
      return {
        characterSheet:Boolean(character?.querySelector('.hero-sprite-sheet.grid-sheet')),
        characterAction:character?.dataset.action,
        genericAction:generic?.dataset.action,
        genericMotion:Boolean(generic?.querySelector('.enemy-runtime-sheet,.enemy-motion-cast')),
        genericSheet:Boolean(generic?.querySelector('.enemy-runtime-sheet.grid-sheet')),
        idleSource,idleFrameCount,rootedIdle,bossStarCount,
        legacyBodyAura:Boolean(document.querySelector('#enemy-0 .unit-charge-aura')),
        rectangularGlow:getComputedStyle(character).boxShadow
      };
    },
    enemyDeathProbe:()=>{
      enemies=[{name:'Capitão',etype:'capitao',hp:0,maxHp:180,atk:20,sprite:'assets/enemies/humanos/capitao.png'}];
      renderEnemies();
      const unit=document.getElementById('enemy-0');
      const avatar=document.getElementById('enemyPortrait-0');
      const shadow=unit?.querySelector('.unit-ground-shadow');
      return {
        dead:Boolean(unit?.classList.contains('dead')),
        action:avatar?.dataset.action,
        defeatPose:Boolean(avatar?.classList.contains('enemy-defeat-pose')),
        defeatRuntime:Boolean(avatar?.classList.contains('enemy-defeat-runtime')),
        defeatSource:avatar?.querySelector('.hero-sprite-sheet')?.style.getPropertyValue('--sprite-url')||'',
        paused:Boolean(avatar?.classList.contains('motion-paused')),
        shadowAnimation:getComputedStyle(shadow).animationName,
        sheetAnimation:getComputedStyle(avatar?.querySelector('.hero-sprite-sheet')||avatar).animationName
      };
    },
    rootedEnemyActionProbe:()=>{
      enemies=[{name:'Capitão',etype:'capitao',hp:180,maxHp:180,atk:20,sprite:'assets/enemies/humanos/capitao.png'}];
      renderEnemies();
      const avatar=document.getElementById('enemyPortrait-0');
      const before={rooted:avatar?.classList.contains('enemy-rooted-idle'),action:avatar?.dataset.action};
      playEnemyAction(0,'attack');
      return {before};
    },
    rootedEnemyActionSnapshot:()=>{
      const settled=document.getElementById('enemyPortrait-0');
      return {
        rooted:settled?.classList.contains('enemy-rooted-idle'),
        action:settled?.dataset.action,
        sheetAnimation:getComputedStyle(settled?.querySelector('.enemy-rooted-idle-sheet')).animationName,
        sheetTransform:getComputedStyle(settled?.querySelector('.enemy-rooted-idle-sheet')).transform
      };
    },
    enemyScaleProbe:()=>{
      const cases=[
        ['soldado1','Soldado 1'],['soldado2','Soldado 2'],['capitao','Capitão'],
        ['infantaria','Soldado de Infantaria'],['cavalaria','Soldado de Cavalaria'],
        ['comandante','Comandante dos Soldados'],['trono','Soldado do Trono Real']
      ];
      return cases.map(([etype,name])=>{
        const unit=document.createElement('div');
        unit.className='unit enemy-unit';
        const avatar=document.createElement('div');
        avatar.className='avatar-circle';
        unit.appendChild(avatar);
        document.body.appendChild(unit);
        const enemy={name,etype,hp:180,maxHp:180,atk:20,sprite:'assets/enemies/humanos/capitao.png'};
        avatar.classList.add('enemy-avatar','enemy-rooted-idle');
        avatar.dataset.action='idle';
        avatar.innerHTML=rootedEnemyIdleMarkup(enemy);
        const idleArt=avatar.querySelector('.enemy-rooted-idle-art');
        const idleScale=getComputedStyle(idleArt).scale;
        avatar.classList.remove('enemy-rooted-idle');
        avatar.classList.add('enemy-static-avatar');
        avatar.dataset.action='attack';
        avatar.innerHTML=enemyFallbackMarkup(enemy,'attack');
        const attackArt=avatar.querySelector('.enemy-sprite-image');
        const attackScale=getComputedStyle(attackArt).scale;
        unit.remove();
        return {id:etype,idleScale,attackScale};
      });
    },
    enemyGridPlanProbe:()=>{
      const make=(count,bossIndex=-1)=>Array.from({length:count},(_,index)=>({name:`E${index}`,isBoss:index===bossIndex}));
      const simplify=plan=>plan.map(slot=>({column:slot.grid.column,row:slot.grid.row,boss:slot.isBoss===true}));
      return {
        normal:[1,2,3,4].map(count=>simplify(planEnemyGridSlots(make(count),false))),
        bosses:[1,2,3,4].map(count=>simplify(planEnemyGridSlots(make(count,count-1),true)))
      };
    },
    heroFormationGridProbe:()=>HERO_FORMATIONS.map(formation=>({
      name:formation.nome,
      slots:formation.slots.map(slot=>({refs:[...slot.gridRefs],x:Number(slot.x.toFixed(4)),y:Number(slot.y.toFixed(4)),z:slot.z,side:slot.gridSide}))
    })),
    heroBodyHitProbe:async()=>{
      await Promise.all([...heroHitMaskCache.values()].map(entry=>entry.promise));
      return [...partyArenaEl.querySelectorAll('.hero-unit')].map(unit=>{
        const visual=unit.querySelector('.hero-sprite-sheet,.hero-sprite-image');
        const rect=visual?.getBoundingClientRect();
        if(!rect) return {id:unit.id,point:null};
        const centerX=rect.left+rect.width/2,centerY=rect.top+rect.height/2;
        const points=[];
        for(let radius=0;radius<=Math.max(rect.width,rect.height);radius+=3){
          for(let angle=0;angle<Math.PI*2;angle+=Math.PI/12){
            const x=centerX+Math.cos(angle)*radius,y=centerY+Math.sin(angle)*radius;
            if(x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom) points.push([x,y]);
          }
        }
        const point=points.find(([x,y])=>resolveHeroBodyAtPoint(x,y)===unit);
        return {id:unit.id,point:point?{x:point[0],y:point[1]}:null,groundPhysics:unit.dataset.groundPhysics};
      });
    },
    windRealmFlightProbe:()=>({
      sophitia:heroUsesFlightPhysics(KINGDOMS.find(hero=>hero.id==='vento')),
      futureWindHero:heroUsesFlightPhysics({id:'aero-futuro',reino:'Reino do Vento'}),
      groundedHero:heroUsesFlightPhysics({id:'humanos',reino:'Reino dos Humanos'})
    }),
    heroAuraProbe:()=>{
      const heroIdx=ACTIVE[0];
      const active=KINGDOMS[heroIdx]?.abilities.find(ability=>ability.kind==='active');
      heroActiveQueue[heroIdx]=active?[active]:[]; heroReady[heroIdx]=Boolean(active); updateHeroProgressUI(heroIdx);
      const unit=document.getElementById('party-'+KINGDOMS[heroIdx]?.id);
      const avatar=unit?.querySelector('.avatar-circle');
      beginHeroConjurationLoop(heroIdx);
      return {ready:Boolean(unit?.classList.contains('ready')),legacyBodyAura:Boolean(unit?.querySelector('.unit-charge-aura')),vfx:Boolean(document.querySelector(`.human-conjuration-aura[data-owner="${KINGDOMS[heroIdx]?.id}"]`)),rectangularGlow:getComputedStyle(avatar).boxShadow};
    },
    openCard:(heroIdx)=>{ openCardModal(heroIdx); return KINGDOMS[heroIdx]?.id||null; },
    playHeroAction:(heroIdx,action)=>{ playHeroAction(heroIdx,action); return document.getElementById('party-'+KINGDOMS[heroIdx]?.id+'-avatar')?.dataset.action||null; },
    testRevive:(kind='tear')=>{
      eternalReviveCharges=kind==='tear'?1:0;
      chamarizCharges=kind==='decoy'?1:0;
      playerHP=0; busy=true; setBattlePhase('enemies'); handlePlayerDefeat();
      return {playerHP,busy,battlePhase,eternalReviveCharges,chamarizCharges};
    },
    scheduleProbe:(delay=120)=>{
      const before=stageTurns;
      scheduleCombat(()=>{ stageTurns++; },delay);
      return {before,epoch:combatEpoch};
    },
    restart:()=>{ restartCurrentStage(); return {epoch:combatEpoch,stageIndex}; },
    pendingWaitCount:()=>combatWaits.size,
    startWaitProbe:(delay=5000)=>{ wait(delay); return combatWaits.size; },
    startEnergyProbe:(heroIdx=ACTIVE[0])=>flyEnergyToHero(heroIdx).then(delivered=>({delivered,epoch:combatEpoch,orbs:document.querySelectorAll('.energy-orb').length})),
    setSpriteFailure:(heroIdx,src)=>{ KINGDOMS[heroIdx].sprites={idle:{...HERO_ACTIONS.idle,format:'sheet',src}}; return src; },
    testAnimationReset:()=>{
      ACTIVE.forEach(heroIdx=>playHeroAction(heroIdx,'victory'));
      const before=ACTIVE.map(heroIdx=>document.getElementById('party-'+KINGDOMS[heroIdx].id+'-avatar')?.dataset.action);
      restartCurrentStage();
      const after=ACTIVE.map(heroIdx=>document.getElementById('party-'+KINGDOMS[heroIdx].id+'-avatar')?.dataset.action);
      return {before,after};
    },
    openSelection:()=>{
      showSelection();
      const animationHandles=[...partyArenaEl.querySelectorAll('.avatar-circle')].filter(avatar=>avatar.__actionFrameRaf||avatar.__actionTimer).length;
      return {timers:combatTimers.size,waits:combatWaits.size,animationHandles,missionTimerActive:Boolean(missionTimerInt),darkTimerActive:Boolean(tempoSombrioTimer)};
    },
    finalizeDefeat:()=>({finalized:finalizeDefeat(),defeatFinalized,busy,stageTransitioning,battlePhase,missionTimerActive:Boolean(missionTimerInt),darkTimerActive:Boolean(tempoSombrioTimer)}),
    savedProgress:()=>getSavedProgress(),
    exportProgress:()=>exportSave(),
    retryAfterDefeat:()=>{ retryAfterDefeat(); return {towerMode,towerFloor,bossRushMode,bossRushIdx,worldActive:worldRun.active,battlePhase}; },
    setSpecialRun:(mode,position=1,hp=1)=>{
      towerMode=mode==='tower'; bossRushMode=mode==='boss'; worldRun.active=false;
      if(towerMode) towerFloor=position;
      if(bossRushMode) bossRushIdx=position;
      playerHP=Math.max(1,Math.min(PLAYER_MAX_HP,Number(hp)||1)); updatePlayerHP();
      return {towerMode,towerFloor,bossRushMode,bossRushIdx,playerHP};
    },
    finishBossRush:()=>{
      towerMode=false; bossRushMode=true; bossRushIdx=BOSS_RUSH_ORDER.length-1; worldRun.active=false;
      stageTransitioning=false; onStageCleared();
      return {bossRushMode,bossRushIdx,victoryExitToMap,victoryExitMode,overlay:document.getElementById('dungeonClearOverlay').classList.contains('show')};
    },
    setRunConsumables:(values={})=>{
      coinDoubleRun=Boolean(values.coinDouble);
      xpDoubleRun=Boolean(values.xpDouble);
      bannerAtkRun=Number(values.banner)||1;
      battleConsumablesDone=Boolean(values.done);
      return {coinDoubleRun,xpDoubleRun,bannerAtkRun,battleConsumablesDone};
    },
    runConsumables:()=>({coinDoubleRun,xpDoubleRun,bannerAtkRun,battleConsumablesDone}),
    boardSnapshot:()=>board.map(row=>[...row]),
    setSummons:(golems=0,harpies=0)=>{ golemAllies=golems; harpyAllies=harpies; renderPartyArena(); return {golemAllies,harpyAllies,golems:document.querySelectorAll('.golem-unit').length,harpies:document.querySelectorAll('.harpy-unit').length}; },
    refreshParty:()=>{ renderPartyArena(); return {golemAllies,harpyAllies,golems:document.querySelectorAll('.golem-unit').length,harpies:document.querySelectorAll('.harpy-unit').length}; },
    persistenceSnapshot:()=>({coins,profileXp,formationIndex,inventory:{...inventory}}),
    pause:()=>{ pauseBattle(); return {gamePaused,battlePhase}; },
    resume:()=>{ resumeBattle(); return {gamePaused,battlePhase}; }
  };
}
setBattlePhase('idle');
applySettings();
renderSelectGrid();
refreshContinueButton();
const optionsPanelAtBoot=document.getElementById('optionsScreen');
const reopenOptionsAfterBoot=optionsPanelAtBoot?.dataset.pendingBootOpen==='1';
showMainMenu({guard:false});
document.body.dataset.gameReady='1';
if(reopenOptionsAfterBoot){
  delete optionsPanelAtBoot.dataset.pendingBootOpen;
  openPanel('optionsScreen');
}
if(['127.0.0.1','localhost'].includes(location.hostname)&&new URLSearchParams(location.search).get('qa')==='tapguard') armTapGuard(5000);

/* ============================================================
   v9.1 · MUNDOS — Reino dos Humanos (Terra dos Reguladores de Ygdria)
   10 fases × 5 níveis; o nível 5 de cada fase é o CHEFE.
   Cenários: pasta assets/bg/humanos (troque o arquivo pelo mesmo nome
   quando a arte pintada chegar — nada mais precisa mudar).
   ============================================================ */
var activeStageData=null;
var worldRun={active:false,fase:0,nivel:1};
const ESPR={
  slime:'assets/enemies/slime/single-1.png',
  sentinel:'assets/enemies/stone-sentinel/single-1.png',
  wolf:'assets/enemies/shadow-wolf/single-1.png',
  wraith:'assets/enemies/cursed-wraith/single-1.png',
  dragon:'assets/enemies/crimson-dragon/single-1.png'
};
const HUMANOS_ETYPES={
  /* Fases 1-5 · chibis oficiais (Reino Rosa). Bases calibradas para o ATK oficial
     das cartas (2-4): time recomendado da fase 1 tem ~200-350 HP no Normal. */
  /* VIRADA: os inimigos ficam sem flip quando a própria arte já olha para a esquerda.
     O Lobo Raivoso é a exceção: sua imagem olha para a direita e precisa ser espelhada. */
  slimeCereja:{n:'Slime de Cerejeira', fera:true, sprite:'assets/enemies/humanos/slime-cerejeira.png', hp:45, atk:7},
  loboRaivoso:{n:'Lobo Raivoso', fera:true, sprite:'assets/enemies/humanos/lobo-raivoso.png', hp:60, atk:9, flip:true},
  soldado1:{n:'Soldado 1', sprite:'assets/enemies/humanos/soldado-1.png', hp:70, atk:10},
  soldado2:{n:'Soldado 2', sprite:'assets/enemies/humanos/soldado-2.png', hp:78, atk:11},
  capitao:{n:'Capitão dos Soldados', sprite:'assets/enemies/humanos/capitao.png', hp:105, atk:13},
  /* Fases 6-10 · genéricos (sprites reutilizados até os chibis chegarem) */
  vulto:{n:'Vulto Sombrio', sprite:'assets/enemies/humanos/vulto-sombrio.png', hp:85, atk:11},
  espectro:{n:'Espectro Sombrio', sprite:'assets/enemies/humanos/espectro-sombrio.png', hp:95, atk:12},
  morto:{n:'Cavaleiro Morto-Vivo', sprite:'assets/enemies/humanos/cavaleiro-morto-vivo.png', hp:120, atk:14},
  soldBib1:{n:'Soldado da Biblioteca 1', sprite:'assets/enemies/humanos/soldado-biblioteca-1.png', hp:88, atk:11},
  soldBib2:{n:'Soldado da Biblioteca 2', sprite:'assets/enemies/humanos/soldado-biblioteca-2.png', hp:96, atk:12},
  soldBib3:{n:'Soldado da Biblioteca 3', sprite:'assets/enemies/humanos/soldado-biblioteca-3.png', hp:104, atk:13},
  infantaria:{n:'Soldado de Infantaria', sprite:'assets/enemies/humanos/soldado-infantaria.png', hp:98, atk:12},
  cavalaria:{n:'Soldado de Cavalaria', sprite:'assets/enemies/humanos/soldado-cavalaria.png', hp:104, atk:13},
  comandante:{n:'Comandante dos Soldados', sprite:'assets/enemies/humanos/comandante.png', hp:150, atk:15},
  trono:{n:'Soldado do Trono Real', sprite:'assets/enemies/humanos/soldado-trono.png', hp:135, atk:14}
};
/* Chefes de Carta: com chibi oficial lutam em campo como personagens
   (a carta vai para a galeria do Reino Rosa); sem chibi ainda, aparecem
   como carta no campo (isCard). Chefes recebem +30% HP e +15% ATK. */
const HUMANOS_CARDS={
  gareth:{nome:'Gareth', hp:130, atk:16, sprite:'assets/enemies/humanos/gareth.png', card:'assets/cards/enemies/gareth-card.png'},
  cedric:{nome:'Cedric', hp:150, atk:18, sprite:'assets/enemies/humanos/cedric.png', card:'assets/cards/enemies/cedric-card.png'},
  elizier:{nome:'Elizier', hp:160, atk:19, sprite:'assets/enemies/humanos/elizier.png', card:'assets/cards/enemies/elizier-card.png', flip:true},
  roland:{nome:'Roland', hp:175, atk:20, sprite:'assets/enemies/humanos/roland.png', card:'assets/cards/enemies/roland-card.png', flip:true},
  jules:{nome:'Jules, The Joker', hp:200, atk:22, sprite:'assets/enemies/humanos/jules.png', card:'assets/cards/enemies/jules-card.png'},
  bernyce:{nome:'Bernyce', hp:220, atk:23, sprite:'assets/enemies/humanos/bernyce.png', card:'assets/cards/enemies/bernyce-card.png'},
  kalander:{nome:'Kalander', hp:240, atk:24, sprite:'assets/enemies/humanos/kalander.png', card:'assets/cards/enemies/kalander-card.png'},
  julius:{nome:'Julius', hp:280, atk:26, sprite:'assets/enemies/humanos/julius.png', card:'assets/cards/enemies/julius-card.png', flip:true}
};
const WORLDS=[{
  id:'humanos', nome:'Reino dos Humanos', titulo:'Terra dos Reguladores de Ygdria',
  fases:[
    { nome:'Cidade das Cerejeiras', sub:'Capital de Ygdria', bg:'assets/bg/humanos/fase-01.jpg', chefe:'Gareth', rec:'4× carta 1★',
      dial:[{h:'humanos',t:'Minha capital... as cerejeiras choram pétalas. Algo corrompeu a guarda da cidade.'}],
      missoes:[['slimeCereja'],['slimeCereja','loboRaivoso'],['loboRaivoso','loboRaivoso'],['soldado1','soldado2'],['soldado1','soldado2','gareth']] },
    { nome:'Catedral de Ygdria', sub:'Onde a fé encontrou a magia', bg:'assets/bg/humanos/fase-02.jpg', chefe:'Cedric', rec:'4× carta 1★',
      dial:[{h:'luz',t:'Este lugar já foi sagrado. Os vitrais ainda cantam... mas há aço entre os bancos.'}],
      missoes:[['soldado1','soldado2'],['capitao'],['soldado2','capitao'],['soldado1','soldado2','capitao'],['soldado1','capitao','cedric']] },
    { nome:'Palácio dos Reguladores', sub:'A ordem acima de tudo', bg:'assets/bg/humanos/fase-03.jpg', chefe:'Elizier', rec:'1× 2★ + 3× 1★',
      dial:[{h:'humanos',t:'Os Reguladores mantinham o equilíbrio entre os reinos. Quem os dobrou?'}],
      missoes:[['soldado1','soldado2'],['capitao'],['soldado1','capitao'],['soldado1','soldado2','capitao'],['soldado1','soldado2','capitao','elizier']] },
    { nome:'Academia Real de Magia e Combate', sub:'Onde nascem os magos-cavaleiros', bg:'assets/bg/humanos/fase-04.jpg', chefe:'Roland', rec:'1× 2★ + 3× 1★',
      dial:[{h:'raio',t:'Ha! Estudei aqui... e fui expulso. Hora de mostrar aos instrutores o que aprendi sozinho.'}],
      missoes:[['soldado1','soldado2'],['capitao'],['soldado1','capitao'],['soldado1','soldado2','capitao'],['soldado2','capitao','roland']] },
    { nome:'Mercado Central dos Reinos', sub:'Tudo tem um preço', bg:'assets/bg/humanos/fase-05.jpg', chefe:'Cedric, Elizier e Roland', rec:'2× 2★ + 2× 1★',
      dial:[{h:'areia',t:'Conheço mercados assim — e emboscadas também. Três lâminas nos esperam no fim desta rua.'}],
      missoes:[['soldado1','soldado2'],['capitao'],['soldado2','capitao'],['soldado1','soldado2','capitao'],['cedric','elizier','roland']] },
    { nome:'Praça das Doze Essências', rec:'2× 2★ + 2× 1★', sub:'Doze pilares, doze reinos', bg:'assets/bg/humanos/fase-06.jpg', chefe:'Jules, The Joker',
      dial:[{h:'sombras',t:'Vultos entre os pilares... e um riso que não é humano. Ele acha que sombras são um jogo.'}],
      missoes:[['vulto'],['espectro'],['vulto','espectro'],['morto'],['jules']] },
    { nome:'Biblioteca da Eternidade', rec:'2× 2★ + 2× 1★', sub:'Todo saber, um só silêncio', bg:'assets/bg/humanos/fase-07.jpg', chefe:'Bernyce',
      dial:[{h:'chuvas',t:'Séculos de conhecimento vigiados por soldados... e por ela. Bernyce não empresta livros.'}],
      missoes:[['soldBib1'],['soldBib1','soldBib2'],['soldBib1','soldBib2','soldBib3'],['cedric','elizier','roland'],['bernyce']] },
    { nome:'Muralha dos Heróis', rec:'3× 2★ + 1× 1★', sub:'Eles ainda vigiam', bg:'assets/bg/humanos/fase-08.jpg', chefe:'Kalander',
      dial:[{h:'terra',t:'Infantaria, cavalaria, comando... e no topo da muralha, Kalander. Esta pedra vai tremer.'}],
      missoes:[['infantaria'],['cavalaria'],['comandante'],['infantaria','cavalaria','comandante'],['kalander']] },
    { nome:'Lendária Torre de Acesso à Eternidade', rec:'3× 2★ + 1× 1★', sub:'O céu é a porta', bg:'assets/bg/humanos/fase-09.jpg', chefe:'Julius',
      dial:[{h:'sombras',t:'Esta torre toca a Eternidade... e Julius desceu dela. Sinto o véu se rasgar.'}],
      missoes:[['vulto','espectro'],['morto'],['vulto','espectro','morto'],['jules'],['julius']] },
    { nome:'Castelo da Coroa Humana', rec:'4× carta 2★', sub:'O trono espera seu verdadeiro rei', bg:'assets/bg/humanos/fase-10.jpg', chefe:'Julius',
      dial:[{h:'humanos',t:'O castelo da minha linhagem. Todos os campeões dele nos aguardam... e Julius por trás de tudo.'},{h:'fogo',t:'Cinco cartas contra nós? Ótimo. Sempre quis um baralho em chamas.'}],
      missoes:[['trono'],['cedric','jules'],['kalander','cedric','jules'],['kalander','bernyce'],['julius']] }
  ]
}];

/* v9.3.7 · Roteiro canônico da primeira parte. As frases foram revisadas
   para concordância e ficam centralizadas aqui para facilitar a expansão. */
const HUMAN_STORY=(()=>{
  const n=(name,t)=>({name,t});
  const h=(id,t)=>({h:id,t});
  const M=(before,missions,after,allowed,fixed)=>({before,missions,after,allowed,fixed});
  const A=['adriel-jovem','berenice-jovem','galateia-jovem','acqua-jovem'];
  const B=['adriel-jovem','berenice-jovem','galateia-jovem','gareth'];
  const C=['adriel-jovem','berenice-jovem','galateia-jovem','acqua-jovem','gareth'];
  return [
    M('Às margens da Cidade das Cerejeiras, Berenice, Galatéia e Acqua brincavam quando um slime e lobos ferozes surgiram. Um jovem com uma espada de madeira apareceu para protegê-las.',[
      [h('adriel-jovem','Fiquem atrás de mim. Vou protegê-las.'),h('berenice-jovem','Nós também sabemos lutar!')],[],[],[n('Soldado 1','O que está fazendo? Fique longe das princesas!')],[h('adriel-jovem','Esta é minha chance de mostrar que posso me tornar um cavaleiro!'),n('Gareth','Só se me derrotar primeiro, moleque!')]],'Depois de derrotar Gareth, Adriel e as meninas se esconderam na Catedral de Ygdria.',A,A),
    M('O capitão dos soldados chamou as crianças para fora da Catedral: aquele lugar era sagrado. Adriel, tomado pelo desejo de se tornar cavaleiro, desafiou todos os soldados.',[
      [n('Soldado 2','Você nunca será um cavaleiro!'),h('adriel-jovem','Venham para cima!')],[n('Capitão dos Soldados','Mostre-me do que é capaz; quem sabe você se torna meu subordinado!')],[n('Soldado 2','Deixe-me ter uma revanche, capitão.')],[n('Capitão dos Soldados','Peguem-no!')],[n('Cedric','Que confusão é essa diante da Catedral sagrada? Terei de punir essas crianças malcriadas!'),h('adriel-jovem','Pode vir, velhote!')]],'Adriel derrotou Cedric à força e deixou todos os soldados boquiabertos.',A,A),
    M('As crianças pareciam se divertir, mas guardas e cavaleiros foram mobilizados no Palácio dos Reguladores, onde as decisões dos doze reinos eram tomadas pela Rainha Bernyce — que estava ausente.',[
      [n('Soldado 1','Capturem esse fedelho!')],[n('Capitão dos Soldados','Desta vez você será executado.')],[h('adriel-jovem','Derrotarei todos vocês e me tornarei um cavaleiro.')],[n('Capitão dos Soldados','Chamem reforços!')],[n('Elizier','Tolos, foram derrotados por uma criança! Vou mostrar como se faz!')]],'Uma flecha feriu o braço de Adriel. Impressionada com a audácia do jovem, Elizier o levou para a Academia Real de Magia e Combate.',A,A),
    M('Ao final da tarde, Acqua retornou para o grande Lago de Ygdria. Adriel treinaria com Berenice e Galatéia; Gareth também decidiu evoluir depois de perder para o jovem.',[
      [n('Soldado 2','Vou me conter um pouco. Pode vir com tudo!'),h('adriel-jovem','Não pegue leve.')],[n('Capitão dos Soldados','Você tem potencial, garoto.')],[n('Soldado 1','Agora verá meu verdadeiro poder!')],[h('adriel-jovem','Vocês são mais fortes do que pensei, mas vou conseguir.')],[n('Roland','Muito bem, jovenzinho. Quero ver do que é capaz contra um cavaleiro de verdade!')]],'Após o treinamento, todos descansaram no alojamento e as crianças foram para o castelo.',B,B),
    M('Adriel, Gareth, Berenice e Galatéia foram ao Mercado Central dos Reinos e acabaram cercados pelos soldados.',[
      [n('Soldado 1','Hora do treinamento final...'),h('adriel-jovem','O quê? Aqui, no meio do mercado?!')],[n('Capitão dos Soldados','O inimigo não escolhe lugar para atacar...'),h('berenice-jovem','Deixe comigo. Eu cuido deles!')],[h('galateia-jovem','Estamos bem mais fortes.')],[n('Gareth','Tragam os mais fortes do reino... glup.')],[n('Roland','Vocês que pediram...'),h('adriel-jovem','Para que foi abrir a boca, Gareth?')]],'Depois do treinamento surpresa, todos fizeram uma refeição nos arredores do mercado. Adriel estava feliz com seu progresso.',B,B),
    M('Depois do treinamento pesado, os jovens foram à Praça das Doze Essências. Uma névoa sombria cobriu a praça sem que percebessem o mal que se aproximava.',[
      [h('berenice-jovem','Que frio... por que escureceu de repente?'),h('galateia-jovem','Um fantasma!'),n('Vulto Sombrio','Huahuahuahua...')],[n('Espectro Sombrio','Vocês não são páreo para nós!'),h('adriel-jovem','Vamos dar conta deste também.')],[n('Gareth','Está vindo mais...')],[n('Cavaleiro Morto-Vivo','Todos vocês morrerão!')],[h('berenice-jovem','Oba... é o Jules, nosso bobo da corte. Ele vai nos ajudar.'),n('Jules','Princesa tola... não estou aqui por vocês!')]],'Jules derrotou os jovens, mas fugiu quando a névoa se dissipou. Eles correram em busca de ajuda e entraram na Biblioteca da Eternidade.',B,B),
    M('Ao chegarem à Biblioteca da Eternidade, os jovens foram barrados pelos soldados. Berenice precisava falar com sua mãe, mas ninguém permitia a entrada.',[
      [h('berenice-jovem','Rápido, deixem-nos passar! Preciso ver minha mãe!'),n('Soldado da Biblioteca 1','Vocês precisam ser repreendidos; não pensem que somos aqueles soldadinhos da cidade.')],[h('adriel-jovem','Se não saírem da frente, vamos derrubar geral!')],[n('Soldado da Biblioteca 3','Prendam-nos!')],[n('Cedric','O que está acontecendo aqui? Que confusão é essa?')],[h('berenice-jovem','Mamãe!'),n('Bernyce','Você precisa se comportar como a futura rainha maga!')]],'Berenice explicou que Jules os havia atacado. A rainha, apreensiva, levou-os até Kalander, que sugeriu treiná-los.',B,B),
    M('Alguns dias se passaram. Kalander, o cavaleiro mais poderoso do Reino dos Humanos, treinava os jovens enquanto Bernyce voltava ao castelo em busca de respostas. Acqua retornou para brincar e acabou entrando no treinamento.',[
      [n('Soldado de Infantaria','Preparem-se: agora o treino sobe de nível.')],[h('adriel-jovem','É impossível... ele tem um cavalo!')],[n('Comandante dos Soldados','Mostrem todo o seu potencial!')],[h('galateia-jovem','Vamos unir nossos ataques!')],[n('Kalander','Muito bem. Se me fizerem sair do lugar, vocês vencem!')]],'Depois de mais um dia de treinamento, os jovens fizeram Kalander sair do lugar usando uma estratégia inteligente. Kalander riu: “Hahahaha... esses pirralhos!”.',C,A),
    M('Os jovens caminhavam felizes pela cidade depois de serem aceitos por Kalander. De repente, tudo escureceu e uma névoa gélida tomou conta do local.',[
      [n('Espectro Sombrio','Agora vocês não escapam!'),h('galateia-jovem','De novo, não!')],[h('berenice-jovem','Vamos dar uma surra nesse puro osso.')],[h('adriel-jovem','Podem vir todos de uma vez!')],[n('Jules','Desta vez vou cumprir minha missão.'),h('adriel-jovem','Somos mais fortes do que antes, seu palhaço!')],[n('???','Berenice! Venha comigo...'),h('berenice-jovem','Quem é você?'),n('???','Seu pai quer vê-la.')]],'Julius derrotou todos. Roland e Elizier chegaram a tempo, mas Berenice foi levada. Um soldado levou Galatéia e Acqua para seus reinos; Adriel partiu com Gareth e os cavaleiros para avisar a Rainha.',C,A),
    M('Ao chegarem ao castelo, os soldados já sabiam do ocorrido e acusaram o grupo de arquitetar o sequestro da princesa. Jules havia articulado tudo — e uma batalha começou.',[
      [n('Soldado do Trono Real','Serão todos executados!')],[n('Roland','Cedric, afaste-se. Jules é o inimigo!'),n('Cedric','Roland! E pensar que seu pai também foi um cavaleiro.')],[n('Jules','Libertem a princesa, desertores!'),n('Kalander','Não acredito... eu confiei e treinei vocês!')],[n('Bernyce','Devolvam minha filha!!!'),h('adriel-jovem','Rainha! Jules é o culpado, mas há outro inimigo também.')],[n('Julius','Morram todos! Corte Sombrio!'),h('adriel-jovem','Rainha! Kalander!')]],'Julius venceu e matou os defensores. Gareth sacrificou-se para salvar Adriel; Cedric o envolveu em magia e o teletransportou para longe. Assim termina a primeira parte: o que acontecerá com Adriel, onde está Berenice e quem é Julius?', ['adriel-jovem','gareth','roland','elizier'],['adriel-jovem','gareth','roland','elizier'])
  ].map((x,i)=>({...x,index:i}));
})();

/* v10.0.54 · A campanha humana passa a ser gerada do Markdown editável.
   O bloco histórico acima permanece apenas como fallback de diagnóstico; em
   execução, cenário, inimigos, seleção e roteiro usam uma única fonte. */
const HUMAN_LORE=globalThis.YGDRIA_HUMANOS_LORE;
if(!HUMAN_LORE||!Array.isArray(HUMAN_LORE.phases)||HUMAN_LORE.phases.length!==10){
  throw new Error('Lore canônica do Reino dos Humanos ausente ou inválida.');
}
const HUMAN_PHASE_TECH=WORLDS[0].fases.map(({bg,rec})=>({bg,rec}));
WORLDS[0].fases=HUMAN_LORE.phases.map((phase,index)=>({
  nome:phase.name,
  sub:phase.subtitle,
  bg:HUMAN_PHASE_TECH[index].bg,
  chefe:phase.bosses.join(', '),
  rec:HUMAN_PHASE_TECH[index].rec,
  visual:phase.visual,
  loreSourceHash:HUMAN_LORE.sourceHash,
  dial:[],
  missoes:phase.missions.map(mission=>[...mission.enemies])
}));
function canonicalStoryStep(line){
  if(line?.heroId) return {h:line.heroId,t:line.text};
  return {name:line?.speaker||'Narrador',t:line?.text||''};
}
HUMAN_STORY.splice(0,HUMAN_STORY.length,...HUMAN_LORE.phases.map((phase,index)=>({
  index,
  before:phase.before,
  missions:phase.missions.map(mission=>mission.lines.map(canonicalStoryStep)),
  after:phase.after.map(canonicalStoryStep),
  afterSceneCues:[...(phase.afterSceneCues||[])],
  allowed:[...phase.allowed],
  fixed:[...phase.fixed]
})));
function canonicalAfterSequence(faseIndex){
  const sequence=HUMAN_STORY[faseIndex]?.after;
  if(!Array.isArray(sequence)) return sequence?[{name:'Narrador',t:String(sequence)}]:[];
  return sequence.filter(step=>step?.t).map(step=>step?.h?step:{...step,sprite:step?.sprite||storySpeakerSprite(step?.name)});
}

const STORY_RULES=HUMAN_STORY.map((s)=>({allowed:s.allowed,fixed:s.fixed}));
/* A revisão 9.3.10 reabre a campanha narrativa uma vez para perfis que
   concluíram missões enquanto as cenas estavam bloqueadas pelo tutorial. */
const STORY_CAMPAIGN_VERSION='11.0.1';
function storyMissionKey(f,n){ return `12r_story_${STORY_CAMPAIGN_VERSION}_humanos_${f+1}_${n}`; }
function storyPhaseKey(f){ return `12r_story_phase_${STORY_CAMPAIGN_VERSION}_humanos_${f+1}`; }
function storyPhaseDone(f){ return localStorage.getItem(storyPhaseKey(f))==='1'; }
function storyMissionDone(f,n){
  if(worldRun?.storyMode===true) return false;
  return storyPhaseDone(f);
}
function markStoryMissionDone(f,n){ localStorage.setItem(storyMissionKey(f,n),'1'); }
function markStoryPhaseDone(f){ localStorage.setItem(storyPhaseKey(f),'1'); }
function prepareStorySelection(){
  if(!worldRun.active||worldRun.storyMode===false) return;
  const rule=STORY_RULES[worldRun.fase];
  if(!rule||storyMissionDone(worldRun.fase,worldRun.nivel)) return;
  const allowedIdx=rule.allowed.map(id=>KINGDOMS.findIndex(k=>k.id===id)).filter(i=>i>=0);
  const fixedIdx=rule.fixed.map(id=>KINGDOMS.findIndex(k=>k.id===id)).filter(i=>i>=0);
  chosenIds=chosenIds.filter(i=>allowedIdx.includes(i));
  fixedIdx.forEach(i=>{ if(!chosenIds.includes(i)&&chosenIds.length<4) chosenIds.push(i); });
  if(rule.fixed.length===4) chosenIds=fixedIdx;
}
function storySelectionAllowed(idx){
  /* renderSelectGrid() é executado no boot, antes da declaração de worldRun
     e do roteiro de campanha; nessa etapa todo o roster deve permanecer ativo. */
  if(typeof worldRun==='undefined'||!worldRun.active||worldRun.storyMode===false||typeof STORY_RULES==='undefined') return true;
  const rule=STORY_RULES[worldRun.fase];
  if(!rule||storyMissionDone(worldRun.fase,worldRun.nivel)) return true;
  return rule.allowed.includes(KINGDOMS[idx]?.id);
}
/* v9.1 · Mapa de Ygdria: 12 reinos traçados; só o Reino dos Humanos liberado */
/* Pins à ESQUERDA do nome pintado de cada reino, centrados na altura do título */
const REALMS_MAP=[
  {id:'raio',     x:17.5, y:13.5},
  {id:'sombras',  x:39,   y:13.5},
  {id:'gelo',     x:64.5, y:14},
  {id:'vento',    x:5.5,  y:34},
  {id:'chuvas',   x:71.5, y:33},
  {id:'humanos',  x:36,   y:41.5, unlocked:true},
  {id:'fogo',     x:5,    y:57},
  {id:'natureza', x:72,   y:57},
  {id:'agua',     x:36.5, y:65.5},
  {id:'terra',    x:4.8,  y:73.5},
  {id:'areia',    x:68.5, y:81.5},
  {id:'luz',      x:36.5, y:83.5}
];
let mapMode='world'; /* 'world' = jogar fases · 'boss' = escolher reino do Desafio dos Chefes */
function realmComplete(id){
  if(id!=='humanos') return false; /* demais reinos chegam com seus mundos */
  const prog=worldProg('humanos');
  return !!(prog.stars&&prog.stars[9]); /* fase 10 vencida = reino finalizado */
}
function openMapScreen(mode){
  armTapGuard();
  mapMode=mode==='boss'?'boss':'world';
  const sub=document.getElementById('mapSubtitle');
  if(sub) sub.textContent=mapMode==='boss'
    ? T('Desafio dos Chefes — escolha um reino CONQUISTADO','Boss Challenge — pick a CONQUERED realm','Desafío de Jefes — elige un reino CONQUISTADO')
    : T('Escolha um reino para explorar','Choose a realm to explore','Elige un reino para explorar');
  renderMapScreen();
  document.getElementById('mapScreen')?.classList.add('show');
}
function closeMapScreen(){ document.getElementById('mapScreen')?.classList.remove('show'); }
function renderMapScreen(){
  const canvas=document.getElementById('mapCanvas');
  if(!canvas) return;
  canvas.innerHTML='';
  REALMS_MAP.forEach(r=>{
    const k=KINGDOMS.find(kk=>kk.id===r.id);
    if(!k) return;
    const liberado=mapMode==='boss'?realmComplete(r.id):!!r.unlocked;
    const pin=document.createElement('button');
    pin.type='button';
    pin.className='realm-pin'+(liberado?' unlocked':' locked')+(mapMode==='boss'?' pin-boss':'');
    pin.style.left=Math.max(4.5,Math.min(94,r.x))+'%';
    pin.style.top=Math.max(5,Math.min(95,r.y))+'%';
    pin.style.setProperty('--realm-c',k.color);
    pin.setAttribute('aria-label',L(k.reino)+(liberado?'':' — '+(mapMode==='boss'?T('finalize o reino para liberar','finish the realm to unlock','termina el reino para desbloquear'):T('em breve','coming soon','próximamente'))));
    pin.innerHTML=`
      <span class="pin-gem"><svg viewBox="0 0 24 24">${KINGDOM_ICON[r.id]||''}</svg>${liberado?(mapMode==='boss'?'<i class="pin-crown">🏆</i>':''):'<i class="pin-lock">🔒</i>'}</span>
      ${liberado?`<span class="pin-label">${mapMode==='boss'?T('DESAFIAR','CHALLENGE','DESAFIAR'):T('ENTRAR','ENTER','ENTRAR')}</span>`:''}`;
    pin.addEventListener('click',()=>{
      if(!liberado){
        sfxInvalid();
        pin.classList.remove('deny'); void pin.offsetWidth; pin.classList.add('deny');
        showMapTip(mapMode==='boss'
          ? T('Finalize o ','Finish the ','Termina el ')+L(k.reino)+T(' para liberar o Desafio dos Chefes.',' to unlock its Boss Challenge.',' para desbloquear su Desafío de Jefes.')
          : T('Em breve: ','Coming soon: ','Próximamente: ')+L(k.reino));
        return;
      }
      sfxSelect();
      if(mapMode==='boss'){
        /* 🏆 Desafio dos Chefes do reino escolhido */
        bossRushMode=true; bossRushIdx=0; towerMode=false; worldRun.active=false; pendingStage=0;
        closeMapScreen();
        showSelection();
        return;
      }
      renderWorldMap();
      openPanel('worldScreen');
    });
    canvas.appendChild(pin);
  });
}
function showMapTip(text){
  let tip=document.getElementById('mapTip');
  if(!tip){
    tip=document.createElement('div');
    tip.id='mapTip';
    tip.className='map-tip';
    document.getElementById('mapScreen')?.appendChild(tip);
  }
  tip.textContent=text;
  tip.classList.remove('show'); void tip.offsetWidth; tip.classList.add('show');
  clearTimeout(tip._t);
  tip._t=setTimeout(()=>tip.classList.remove('show'),2200);
}

function worldProg(worldId){
  try{
    const raw=JSON.parse(localStorage.getItem('12r_world_'+worldId)||'{}');
    if(!raw||typeof raw!=='object'||Array.isArray(raw)) throw new Error('invalid world progress');
    const unlocked=Number.isInteger(raw.unlocked)?Math.max(0,Math.min(WORLDS[0].fases.length-1,raw.unlocked)):0;
    const sanitizeStars=value=>sanitizeNumericRecord(value,{max:3});
    const stars=sanitizeStars(raw.stars);
    const starsByDifficulty={};
    for(const d of DIFFICULTY_ORDER) starsByDifficulty[d]=sanitizeStars(raw.starsByDifficulty?.[d]);
    return {unlocked,stars,starsByDifficulty};
  }catch(e){ return {unlocked:0,stars:{},starsByDifficulty:{facil:{},normal:{},dificil:{},pesadelo:{}}}; }
}
function saveWorldProg(worldId,prog){ localStorage.setItem('12r_world_'+worldId,JSON.stringify(prog)); }
/* Janela temporária de validação pública: libera a navegação por todas as
   fases humanas, mas nunca grava falsamente o avanço do jogador. */
const HUMANOS_PUBLIC_TEST_UNLOCK=true;
function worldAccessLimit(worldId,prog=worldProg(worldId)){
  const saved=Math.max(0,Number(prog?.unlocked)||0);
  return worldId==='humanos'&&HUMANOS_PUBLIC_TEST_UNLOCK
    ? Math.max(saved,WORLDS[0].fases.length-1)
    : saved;
}
function buildWorldLevel(){
  const world=WORLDS[0];
  const fase=world.fases[worldRun.fase];
  const f=worldRun.fase, n=worldRun.nivel;
  /* Curva oficial: o jogador NÃO fica mais forte por fase (mesmas cartas), então
     HP inimigo cresce devagar (+18%/fase) e ATK mais devagar ainda (+8%/fase);
     dentro da fase: +10% HP e +5% ATK por missão. Início fácil, chefe desafiador. */
  const hpMult=(1+f*0.18)*(1+(n-1)*0.10);
  const atkMult=(1+f*0.08)*(1+(n-1)*0.05);
  const keys=fase.missoes[n-1]||['soldado1'];
  const enemies=keys.map((key)=>{
    const c=HUMANOS_CARDS[key];
    if(c){
      const e={name:c.nome, hp:Math.round(c.hp*hpMult), atk:Math.round(c.atk*atkMult), cardId:key};
      if(c.isCard){ e.sprite=c.card; e.isCard=true; }
      else{ e.sprite=c.sprite; if(c.flip) e.flip=true; }
      return e;
    }
    const tpl=HUMANOS_ETYPES[key]||HUMANOS_ETYPES.soldado1;
    const e={name:tpl.n, hp:Math.round(tpl.hp*hpMult), atk:Math.round(tpl.atk*atkMult), etype:key};
    if(tpl.sprite){ e.sprite=tpl.sprite; if(tpl.flip) e.flip=true; }
    else{ e.sprite=ESPR[tpl.s]; e.tint=tpl.t; }
    return e;
  });
  if(n===5&&enemies.length){
    const chefe=enemies[enemies.length-1];
    chefe.isBoss=true;
    chefe.hp=Math.round(chefe.hp*1.35);   // chefes de fase são mais fortes
    chefe.atk=Math.round(chefe.atk*1.2);
    /* 10.5 · Julius com TODO o seu potencial (SUPER... ULTRA RARO): invencível por design */
    if(f===9&&chefe.cardId==='julius'){
      chefe.hp=3200; chefe.maxHp=3200; chefe.atk=64; chefe.fullPower=true;
    }
  }
  return {
    title:`${L(fase.nome)} · ${T('Missão','Mission','Misión')} ${n}/5${n===5?` · ${T('CHEFE','BOSS','JEFE')}`:''}`,
    scene:n===5?4:(f%4),
    bgUrl:fase.bg,
    enemies,
    dial:n===1?fase.dial:null
  };
}
let pendingReplayPhase=null;
const DIFFICULTY_ORDER=['facil','normal','dificil','pesadelo'];
const DIFFICULTY_RANKS={facil:'Bronze',normal:'Prata',dificil:'Ouro',pesadelo:'Cristal'};
function nextDifficulty(value){ const i=DIFFICULTY_ORDER.indexOf(value); return DIFFICULTY_ORDER[Math.min(DIFFICULTY_ORDER.length-1,Math.max(0,i+1))]||'normal'; }
function difficultyLabel(value){ return {facil:'Fácil',normal:'Normal',dificil:'Difícil',pesadelo:'Pesadelo'}[value]||'Normal'; }
function startWorldFase(faseIdx,options={}){
  armTapGuard();
  const prog=worldProg('humanos');
  if(faseIdx>worldAccessLimit('humanos',prog)){ sfxInvalid(); return; }
  worldRun={active:true,fase:faseIdx,nivel:1,storyMode:options.storyMode!==false};
  if(options.difficulty){ difficulty=options.difficulty; localStorage.setItem('12r_difficulty',difficulty); applyDifficultyUI(); }
  towerMode=false;
  bossRushMode=false;
  closeAllPanels();
  pendingReplayPhase=null;
  closeMapScreen();
  pendingStage=0;
  showSelection(); // o jogador escolhe a equipe e toca em "Iniciar a Aventura!"
}
function renderWorldMap(){
  const world=WORLDS[0];
  const head=document.getElementById('worldHead');
  if(head){
    const wstars=Object.values(worldProg('humanos').stars||{}).reduce((a,b)=>a+b,0);
    head.innerHTML=`<b>${L(world.nome)}</b><small>${L(world.titulo)} · ★ ${wstars}/30</small>`;
  }
  const map=document.getElementById('worldMap');
  if(!map) return;
  const prog=worldProg('humanos');
  const note=document.getElementById('worldNote');
  if(note) note.textContent=HUMANOS_PUBLIC_TEST_UNLOCK
    ? 'Teste público: todas as 10 fases do Reino dos Humanos estão liberadas. Seu progresso salvo não será alterado.'
    : 'Cada fase tem 5 níveis — o 5º guarda o CHEFE. Vença o chefe para desbloquear a próxima fase. Os demais reinos serão revelados em breve.';
  map.innerHTML='';
  const fb=faseBest();
  const ft=faseTime();
  world.fases.forEach((fase,idx)=>{
    const locked=idx>worldAccessLimit('humanos',prog);
    const stars=prog.stars[idx]||0;
    const rankHtml=DIFFICULTY_ORDER.map(d=>`<small class="fase-rank rank-${d}">${DIFFICULTY_RANKS[d]} ${'★'.repeat(prog.starsByDifficulty?.[d]?.[idx]||0)}${'☆'.repeat(3-(prog.starsByDifficulty?.[d]?.[idx]||0))}</small>`).join('');
    const node=document.createElement('button');
    node.className='fase-node'+(locked?' locked':'');
    node.style.setProperty('--fase-c', (KINGDOMS.find(k=>k.id===world.id)||{}).color||'#d4af5a');
    node.disabled=locked;
    node.style.backgroundImage=`linear-gradient(rgba(4,2,8,.25),rgba(4,2,8,.9)),url('${fase.bg}')`;
    node.innerHTML=`<span class="fase-num">${idx+1}</span>
      <span class="fase-copy"><b>${L(fase.nome)}</b><small>${L(fase.sub)}</small>
      ${fase.rec?`<small class="fase-rec">🎴 ${T('Recomendado','Recommended','Recomendado')}: ${L(fase.rec)}</small>`:''}
      ${fb[idx]?`<small class="fase-best">⏱ ${T('Recorde','Record','Récord')}: ${fb[idx]} ${T('turnos','turns','turnos')}${ft[idx]?` · 🕐 ${fmtTempo(ft[idx])}`:''}</small>`:''}
      ${!locked?`<span class="fase-diffs" role="group" aria-label="${T('Dificuldade','Difficulty','Dificultad')}"><i data-d="facil" class="${difficulty==='facil'?'on':''}">F</i><i data-d="normal" class="${difficulty==='normal'?'on':''}">N</i><i data-d="dificil" class="${difficulty==='dificil'?'on':''}">D</i><i data-d="pesadelo" class="${difficulty==='pesadelo'?'on':''}">P</i></span>`:''}
      <div class="fase-ranks">${locked?'':rankHtml}</div><em>${locked?'🔒 '+T('Bloqueada','Locked','Bloqueada'):(stars?'★'.repeat(stars)+'☆'.repeat(3-stars):T('5 missões · chefe no final','5 missions · boss at the end','5 misiones · jefe al final'))}</em></span>`;
    node.querySelectorAll('.fase-diffs i').forEach(pill=>pill.addEventListener('click',ev=>{
      ev.stopPropagation();
      difficulty=pill.dataset.d;
      localStorage.setItem('12r_difficulty',difficulty);
      node.querySelectorAll('.fase-diffs i').forEach(x=>x.classList.toggle('on',x===pill));
      sfxSelect();
    }));
    node.addEventListener('click',()=>storyPhaseDone(idx)?openMissionReplay(idx):startWorldFase(idx));
    map.appendChild(node);
  });
}

/* v9.1 · Modos, dificuldade e economia: inicialização */
function todayKey(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
(function initV91(){
  document.querySelectorAll('#diffGroup [data-diff]').forEach(b=>b.addEventListener('click',()=>{
    if(towerMode){ sfxInvalid(); return; } /* a Torre trava no Pesadelo */
    difficulty=b.dataset.diff;
    localStorage.setItem('12r_difficulty',difficulty);
    applyDifficultyUI();
  }));
  applyDifficultyUI();
  const dailyHint=document.getElementById('dailyHint');
  let rec={}; try{ rec=JSON.parse(localStorage.getItem('12r_daily')||'{}'); }catch(e){}
  if(!rec||typeof rec!=='object'||Array.isArray(rec)) rec={};
  if(dailyHint) dailyHint.textContent = rec.date===todayKey() ? T(`Concluído hoje ✓ · combo ×${rec.combo||0}`,`Completed today ✓ · combo ×${rec.combo||0}`,`Completado hoy ✓ · combo ×${rec.combo||0}`) : `${T('Tabuleiro do dia','Daily board','Tablero del día')} ${todayKey().slice(8,10)}/${todayKey().slice(5,7)}`;
  document.getElementById('dailyBtn')?.addEventListener('click',()=>{
    const url=new URL(location.href);
    url.searchParams.set('seed','12R-'+todayKey());
    url.searchParams.set('daily','1');
    location.href=url.toString();
  });
  { const bossHint=document.getElementById('bossRushHint');
    if(bossHint) bossHint.textContent=realmComplete('humanos')
      ? T('Reino dos Humanos liberado!','Human Realm unlocked!','¡Reino de los Humanos desbloqueado!')
      : T('Conquiste um reino para liberar','Conquer a realm to unlock','Conquista un reino para desbloquear'); }
  const towerHint=document.getElementById('towerHint');
  const bestT=Number(localStorage.getItem('12r_tower_best')||0);
  if(towerHint) towerHint.textContent = bestT>0 ? T(`(Torre Infinita) · Recorde: andar ${bestT}`,`(Infinite Tower) · Best: floor ${bestT}`,`(Torre Infinita) · Récord: piso ${bestT}`) : T('(Torre Infinita) · Survivor no Pesadelo','(Infinite Tower) · Nightmare survivor','(Torre Infinita) · Survivor en Pesadilla');
  /* 🗼 Torre de Acesso à Eternidade: painel com regras + ranking mensal antes de escalar */
  function renderTowerScreen(){
    const rules=document.getElementById('towerRules');
    if(rules) rules.textContent=T(
      'Modo SURVIVOR sem fim: enfrente todos os oponentes, um por andar, na ordem em que surgiram em Ygdria. O ciclo só recomeça depois de todos; então cada adversário recebe +20%. Só no PESADELO, a vida NÃO renova entre os andares — mas a mochila de consumíveis está liberada.',
      'Endless SURVIVOR mode: face every opponent, one per floor, in Ygdria appearance order. The cycle restarts only after all of them; then every opponent gains +20%. NIGHTMARE only, HP does NOT refresh between floors — but your consumables bag is allowed.',
      'Modo SURVIVOR sin fin: enfrenta a todos los oponentes, uno por piso, en orden de aparición en Ygdria. El ciclo reinicia solo después de todos; entonces cada adversario recibe +20%. Solo PESADILLA, la vida NO se renueva entre los pisos — pero la mochila está permitida.');
    const box=document.getElementById('towerRankBox');
    if(box){
      const tm=towerMonthly(); const mk=towerMonthKey();
      box.innerHTML='<div class="quests-box"><b>🏆 '+T('Ranking mensal','Monthly ranking','Ranking mensual')+' · '+mk+'</b>'
        +'<div class="quest-row"><span>'+T('Seu recorde do mês','Your record this month','Tu récord del mes')+'</span><span>'+(tm[mk]||0)+' '+T('andares','floors','pisos')+'</span></div>'
        +TOWER_RANK_REWARDS.map(r=>'<div class="quest-row"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>').join('')
        +'<small style="opacity:.7">'+T('O ranking global e a entrega dos prêmios serão ativados junto com o servidor.','Global ranking and prize delivery activate with the server.','El ranking global se activa con el servidor.')+'</small></div>';
    }
  }
  window.renderTowerScreen=renderTowerScreen;
  document.getElementById('towerBtn')?.addEventListener('click',()=>{ renderTowerScreen(); openPanel('towerScreen'); sfxSelect(); });
  document.getElementById('towerStartBtn')?.addEventListener('click',()=>{
    document.getElementById('towerScreen')?.classList.remove('show');
    towerMode=true; worldRun.active=false; bossRushMode=false; towerFloor=1; pendingStage=0;
    if(difficulty!=='pesadelo'){ towerPrevDifficulty=difficulty; difficulty='pesadelo'; applyDifficultyUI(); }
    showSelection();
    sfxSelect();
  });
  document.getElementById('mapBackBtn')?.addEventListener('click',()=>{ closeMapScreen(); sfxSelect(); });
  document.getElementById('shopBtn')?.addEventListener('click',()=>openPanel('shopScreen'));
  document.getElementById('mochilaBtn')?.addEventListener('click',()=>{ openPanel('mochilaScreen'); sfxSelect(); });
  document.getElementById('mochilaShopBtn')?.addEventListener('click',()=>{ openPanel('shopScreen'); sfxSelect(); });
  /* 👁 Visualização: nomes, superfícies do HUD e indicadores persistentes */
  const vizCycle={bottom:'top',top:'off',off:'bottom'};
  const vizSurfaceCycle={solid:'transparent',transparent:'off',off:'solid'};
  const syncVizLabels=()=>{
    const h=document.getElementById('vizHeroNames'); if(h) h.textContent=vizNameLabel(vizPrefs.heroNames);
    const e2=document.getElementById('vizEnemyNames'); if(e2) e2.textContent=vizNameLabel(vizPrefs.enemyNames);
    const d=document.getElementById('vizDmg'); if(d) d.textContent=vizOnOff(vizPrefs.dmg);
    const p=document.getElementById('vizDps'); if(p) p.textContent=vizOnOff(vizPrefs.dps);
    const t2=document.getElementById('vizTimer'); if(t2) t2.textContent=vizOnOff(vizPrefs.timer);
    const turn=document.getElementById('vizTurnInfo'); if(turn) turn.textContent=vizOnOff(vizPrefs.turnInfo);
    const hud=document.getElementById('vizTopHud'); if(hud) hud.textContent=vizSurfaceLabel(vizPrefs.topHud);
    const info=document.getElementById('vizInfoBar'); if(info) info.textContent=vizSurfaceLabel(vizPrefs.infoBar);
  };
  document.getElementById('vizHeroNames')?.addEventListener('click',()=>{ vizPrefs.heroNames=vizCycle[vizPrefs.heroNames]||'bottom'; saveViz(); syncVizLabels(); refreshVizBattle(); sfxSelect(); });
  document.getElementById('vizEnemyNames')?.addEventListener('click',()=>{ vizPrefs.enemyNames=vizCycle[vizPrefs.enemyNames]||'bottom'; saveViz(); syncVizLabels(); refreshVizBattle(); sfxSelect(); });
  document.getElementById('vizDmg')?.addEventListener('click',()=>{ vizPrefs.dmg=!vizPrefs.dmg; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('vizDps')?.addEventListener('click',()=>{ vizPrefs.dps=!vizPrefs.dps; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('vizTimer')?.addEventListener('click',()=>{ vizPrefs.timer=!vizPrefs.timer; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('vizTurnInfo')?.addEventListener('click',()=>{ vizPrefs.turnInfo=!vizPrefs.turnInfo; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('vizTopHud')?.addEventListener('click',()=>{ vizPrefs.topHud=vizSurfaceCycle[vizPrefs.topHud]||'solid'; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('vizInfoBar')?.addEventListener('click',()=>{ vizPrefs.infoBar=vizSurfaceCycle[vizPrefs.infoBar]||'transparent'; saveViz(); syncVizLabels(); sfxSelect(); });
  document.getElementById('arena')?.addEventListener('click',event=>{
    if(vizPrefs.topHud!=='off') return;
    if(event.target.closest('button,[role="button"],.unit,.battle-feed-row,.status-tray,.battle-tools-panel,.mission-topbar')) return;
    document.body.classList.toggle('hud-peek');
  });
  syncVizLabels();
  applyVizSettings();
  document.getElementById('achBtn')?.addEventListener('click',()=>openPanel('achScreen'));
  document.getElementById('coachNext')?.addEventListener('click',()=>{ coachStep++; renderCoach(); sfxSelect(); });
  document.getElementById('storyLayer')?.addEventListener('click',(e)=>{
    const layer=e.currentTarget;
    if(layer?.dataset.finalCinematic==='1') return;
    if(!e.target.closest?.('#storySkip')) advanceStory();
  });
  document.getElementById('storySkip')?.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(document.getElementById('storyLayer')?.dataset.finalCinematic==='1') return;
    skipStory(true);
  });
  document.getElementById('shareDailyBtn')?.addEventListener('click',async(e)=>{
    await copyTextToClipboard(buildDailyShareText());
    e.target.textContent=T('✓ Copiado! Cole no grupo','✓ Copied! Paste it anywhere','✓ ¡Copiado! Pégalo donde quieras');
    sfxSelect();
  });
  document.getElementById('exportSaveBtn')?.addEventListener('click',()=>{ exportSave(); sfxSelect(); });
  document.getElementById('importSaveBtn')?.addEventListener('click',()=>importSave());
  document.querySelectorAll('#langGroup [data-lang]').forEach(b=>b.addEventListener('click',()=>{
    lang=VALID_LANGS.includes(b.dataset.lang)?b.dataset.lang:'pt';
    localStorage.setItem('12r_lang',lang);
    localStorage.setItem('12r_lang_set','1');
    applyLanguage();
    renderIntroTexts();
    renderCoach();
    refreshContinueButton(); renderWorldMap(); renderGallery(); renderShop(); renderAchievements(); renderProfileStats();
  }));
  applyLanguage();
  checkLoginReward();
  if(DAILY_BOOT_REQUESTED && difficulty!=='pesadelo'){ towerPrevDifficulty=difficulty; difficulty='pesadelo'; applyDifficultyUI(); }
  if(DAILY_BOOT_REQUESTED){ dailyRunMode=true; towerMode=true; towerFloor=1; worldRun.active=false; pendingStage=0; showSelection(); } /* Diário = torre seeded de 5 andares */
  updateCoinBadge();

  // v9.1 · Fluxo de abertura: Introdução da história -> Idioma (1ª vez) -> Menu
  renderIntroTexts();
  const bootParams=new URLSearchParams(location.search);
  const skipBoot=bootParams.get('qa')||bootParams.get('daily')==='1';
  if(!skipBoot) document.getElementById('introScreen')?.classList.add('show');
  function maybeShowLogin(){
    if(!hasAccountDecision()) document.getElementById('loginScreen')?.classList.add('show');
  }
  document.getElementById('introNext')?.addEventListener('click',()=>{
    stopIntroMusic();
    document.getElementById('introScreen')?.classList.remove('show');
    if(!localStorage.getItem('12r_lang_set')) document.getElementById('langScreen')?.classList.add('show');
    else maybeShowLogin();
    sfxSelect();
  });
  /* Letreiro: música começa no 1º toque (regra de áudio dos navegadores) e a
     abertura avança sozinha quando o texto termina de subir */
  document.getElementById('introScreen')?.addEventListener('pointerdown',()=>startIntroMusic(),{once:true});
  document.getElementById('crawlScroll')?.addEventListener('animationend',()=>{
    if(document.getElementById('introScreen')?.classList.contains('show')) document.getElementById('introNext')?.click();
  });
  document.querySelectorAll('#langScreen [data-lang]').forEach(b=>b.addEventListener('click',()=>{
    lang=VALID_LANGS.includes(b.dataset.lang)?b.dataset.lang:'pt';
    localStorage.setItem('12r_lang',lang);
    localStorage.setItem('12r_lang_set','1');
    applyLanguage();
    renderIntroTexts();
    renderCoach();
    document.getElementById('langScreen')?.classList.remove('show');
    maybeShowLogin();
    sfxSelect();
  }));

  // ---- Contas: convidado, email+senha local, Google (aguarda backend) ----
  document.getElementById('guestBtn')?.addEventListener('click',()=>{
    localStorage.setItem('12r_guest','1');
    document.getElementById('loginScreen')?.classList.remove('show');
    renderAccountChip();
    sfxSelect();
  });
  document.getElementById('loginForm')?.addEventListener('submit',async(ev)=>{
    ev.preventDefault();
    const res=await loginOrRegister(document.getElementById('loginEmail').value,document.getElementById('loginPass').value);
    const err=document.getElementById('loginError');
    if(res.erro){ if(err) err.textContent=res.erro; sfxInvalid(); return; }
    if(err) err.textContent='';
    renderAccountChip();
    sfxSelect();
    if(res.precisaOnboarding) openOnboarding();
    else document.getElementById('loginScreen')?.classList.remove('show');
  });
  document.getElementById('googleBtn')?.addEventListener('click',()=>{
    const note=document.getElementById('googleNote');
    if(note) note.textContent=T('O login Google chega junto com o servidor (Firebase) — a estrutura já está pronta. Por enquanto, use e-mail/senha ou jogue como Convidado.','Google sign-in arrives with the server (Firebase) — the structure is ready. For now, use e-mail/password or play as Guest.','El acceso con Google llega con el servidor (Firebase). Por ahora, usa correo/contraseña o juega como Invitado.');
  });
  // ---- Onboarding ----
  document.getElementById('obNext1')?.addEventListener('click',()=>{
    const v=document.getElementById('obBirth')?.value;
    const err=document.getElementById('obErr1');
    if(!v){ if(err) err.textContent=T('Escolha a data de nascimento.','Pick your birth date.','Elige tu fecha de nacimiento.'); return; }
    const [y,m,d]=v.split('-').map(Number);
    onboardState.birth={d,m,y};
    showOnboardStep(2);
    sfxSelect();
  });
  document.querySelectorAll('.title-opt').forEach(b=>b.addEventListener('click',()=>{
    onboardState.title=b.dataset.title;
    showOnboardStep(3);
    sfxSelect();
  }));
  document.getElementById('obName')?.addEventListener('input',updateNamePreview);
  document.getElementById('obFinish')?.addEventListener('click',finishOnboarding);
  // ---- Painel de conta ----
  document.getElementById('accountChip')?.addEventListener('click',()=>{ renderAccountPanel(); openPanel('accountScreen'); });
  document.getElementById('accountLoginBtn')?.addEventListener('click',()=>{
    document.getElementById('accountScreen')?.classList.remove('show');
    document.getElementById('loginScreen')?.classList.add('show');
  });
  document.getElementById('logoutBtn')?.addEventListener('click',logoutAccount);
  renderAccountChip();
})();

/* ============================================================
   v9.1 · SISTEMA DE CONTAS (local-first, pronto para Firebase)
   Convidado: joga sem conta (sem ranking/nuvem/PVP futuros).
   Email+senha: conta LOCAL neste aparelho (hash SHA-256).
   Google: aguarda backend (Firebase) — botão informativo.
   ============================================================ */
var account=null; // var: o initV91 roda antes deste bloco no arquivo (funções são hoisted)
try{ account=JSON.parse(localStorage.getItem('12r_account')||'null'); }catch(e){}
renderAccountChip();
function isGuest(){ return !account && localStorage.getItem('12r_guest')==='1'; }
function hasAccountDecision(){ return !!account || localStorage.getItem('12r_guest')==='1'; }

async function sha256Hex(text){
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
const LOCAL_PASSWORD_ITERATIONS=600000;
function bytesToBase64(bytes){
  let binary='';
  for(let offset=0;offset<bytes.length;offset+=0x8000) binary+=String.fromCharCode(...bytes.subarray(offset,offset+0x8000));
  return btoa(binary);
}
function base64ToBytes(value){ return Uint8Array.from(atob(value),char=>char.charCodeAt(0)); }
async function deriveLocalPassword(pass,salt,iterations=LOCAL_PASSWORD_ITERATIONS){
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations},key,256);
  return bytesToBase64(new Uint8Array(bits));
}
async function createLocalCredential(pass){
  const salt=crypto.getRandomValues(new Uint8Array(16));
  return {scheme:'pbkdf2-sha256',iterations:LOCAL_PASSWORD_ITERATIONS,salt:bytesToBase64(salt),hash:await deriveLocalPassword(pass,salt)};
}
async function verifyLocalCredential(record,pass){
  const credential=record?.credential;
  if(credential?.scheme==='pbkdf2-sha256'&&Number.isInteger(credential.iterations)&&credential.iterations>=100000){
    try{
      const derived=await deriveLocalPassword(pass,base64ToBytes(credential.salt),credential.iterations);
      return derived===credential.hash;
    }catch(e){ return false; }
  }
  /* Migração compatível: o hash rápido legado só é aceito para autenticar uma
     vez; em seguida o registro é regravado no formato forte. */
  return typeof record?.passHash==='string'&&record.passHash===await sha256Hex(pass);
}

/* Gerador de username: Título+Nome com fallbacks na ordem exata:
   Nome, Nome+Dia, Nome+Mês, Nome+Ano, Nome+Dia+Mês, Nome+Dia+Ano, Nome+Mês+Ano, Nome+Dia+Mês+Ano */
function sanitizeNamePart(text){
  return (text||'').normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^A-Za-z0-9 ]/g,'').trim().split(/\s+/)
    .map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join('');
}
function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function usernameCandidates(title,name,birth){
  const base=sanitizeNamePart(title)+sanitizeNamePart(name);
  const dd=String(birth.d).padStart(2,'0'), mm=String(birth.m).padStart(2,'0'), yy=String(birth.y);
  return [base, base+dd, base+mm, base+yy, base+dd+mm, base+dd+yy, base+mm+yy, base+dd+mm+yy];
}
function takenUsernames(){
  try{ return JSON.parse(localStorage.getItem('12r_usernames')||'[]'); }catch(e){ return []; }
}
function claimUsername(title,name,birth){
  const taken=takenUsernames();
  const candidate=usernameCandidates(title,name,birth).find(c=>!taken.includes(c));
  if(!candidate) return null; // todos ocupados (raríssimo)
  taken.push(candidate);
  localStorage.setItem('12r_usernames',JSON.stringify(taken));
  return candidate;
}

function localUsers(){
  try{ return JSON.parse(localStorage.getItem('12r_localusers')||'{}'); }catch(e){ return {}; }
}
async function loginOrRegister(email,pass){
  email=(email||'').trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return {erro:T('E-mail inválido.','Invalid e-mail.','Correo inválido.')};
  if((pass||'').length<8) return {erro:T('Senha muito curta (mín. 8).','Password too short (min 8).','Contraseña muy corta (mín. 8).')};
  if((pass||'').length>256) return {erro:T('Senha muito longa (máx. 256).','Password too long (max 256).','Contraseña demasiado larga (máx. 256).')};
  const users=localUsers();
  if(users[email]){
    if(!await verifyLocalCredential(users[email],pass)) return {erro:T('Senha incorreta para este e-mail.','Wrong password for this e-mail.','Contraseña incorrecta para este correo.')};
    account=users[email].account||{email};
    if(!users[email].credential){
      users[email]={credential:await createLocalCredential(pass),account:users[email].account||null};
      localStorage.setItem('12r_localusers',JSON.stringify(users));
    }
  }else{
    users[email]={credential:await createLocalCredential(pass),account:null};
    localStorage.setItem('12r_localusers',JSON.stringify(users));
    account={email};
  }
  localStorage.setItem('12r_account',JSON.stringify(account));
  localStorage.removeItem('12r_guest');
  return {ok:true, precisaOnboarding:!account.username};
}
function persistAccount(){
  localStorage.setItem('12r_account',JSON.stringify(account));
  const users=localUsers();
  if(account?.email&&users[account.email]){ users[account.email].account=account; localStorage.setItem('12r_localusers',JSON.stringify(users)); }
  renderAccountChip();
}
function logoutAccount(){
  account=null;
  localStorage.removeItem('12r_account');
  localStorage.removeItem('12r_guest');
  renderAccountChip();
  document.getElementById('accountScreen')?.classList.remove('show');
  document.getElementById('loginScreen')?.classList.add('show');
}
function renderAccountChip(){
  const chip=document.getElementById('accountChip');
  if(!chip) return;
  if(account?.username) chip.innerHTML=`👑 <b>${escapeHtml(account.username)}</b>`;
  else chip.innerHTML=`🎭 ${T('Convidado — toque para entrar','Guest — tap to sign in','Invitado — toca para entrar')}`;
}

/* Onboarding pós-login: nascimento -> título -> nome -> username */
const TITLES=['Rei Mago','Rainha Maga','Cavaleiro Mago','Cavaleira Maga'];
var onboardState={};
function openOnboarding(){
  onboardState={};
  document.getElementById('loginScreen')?.classList.remove('show');
  document.getElementById('onboardScreen')?.classList.add('show');
  showOnboardStep(1);
}
function showOnboardStep(n){
  [1,2,3].forEach(i=>document.getElementById('obStep'+i)?.classList.toggle('show',i===n));
  if(n===3) updateNamePreview();
}
function updateNamePreview(){
  const nome=document.getElementById('obName')?.value||'';
  const prev=document.getElementById('obPreview');
  if(prev) prev.textContent=onboardState.title&&nome?`${L(onboardState.title)} ${nome.trim()}`:'—';
}
async function finishOnboarding(){
  const nome=(document.getElementById('obName')?.value||'').trim();
  const err=document.getElementById('obError');
  if(!nome||sanitizeNamePart(nome).length<2){ if(err) err.textContent=T('Digite um nome válido.','Enter a valid name.','Escribe un nombre válido.'); return; }
  const username=claimUsername(onboardState.title,nome,onboardState.birth);
  if(!username){ if(err) err.textContent=T('Nome indisponível — tente outro.','Name unavailable — try another.','Nombre no disponible — prueba otro.'); return; }
  account={...account, birth:onboardState.birth, title:onboardState.title, displayName:`${onboardState.title} ${nome}`, username, createdAt:Date.now()};
  persistAccount();
  document.getElementById('onboardScreen')?.classList.remove('show');
  setBattleStatus(T(`Bem-vindo(a), ${account.displayName}!`,`Welcome, ${account.displayName}!`,`¡Bienvenido(a), ${account.displayName}!`),'support');
}
function renderAccountPanel(){
  const el=document.getElementById('accountInfo');
  if(!el) return;
  if(account?.username){
    el.innerHTML=`
      <div class="pstat"><small>${T('Usuário (ranking)','Username (ranking)','Usuario (ranking)')}</small><b>${escapeHtml(account.username)}</b></div>
      <div class="pstat"><small>${T('Tratamento','Title','Tratamiento')}</small><b>${escapeHtml(L(account.title))}</b></div>
      <div class="pstat"><small>E-mail</small><b>${escapeHtml(account.email||'—')}</b></div>
      <div class="pstat"><small>${T('Nascimento','Birth date','Nacimiento')}</small><b>${String(account.birth.d).padStart(2,'0')}/${String(account.birth.m).padStart(2,'0')}/${account.birth.y}</b></div>`;
  }else{
    el.innerHTML=`<p class="account-note">${T('Você joga como Convidado: sem ranking, sem salvamento na nuvem e sem PVP (em breve). Entre para garantir seu nome de usuário!','You play as a Guest: no ranking, no cloud save and no PVP (soon). Sign in to claim your username!','Juegas como Invitado: sin ranking, sin guardado en la nube y sin PVP (pronto). ¡Inicia sesión para reclamar tu usuario!')}</p>`;
  }
  const lb=document.getElementById('accountLoginBtn'), ob=document.getElementById('logoutBtn');
  if(lb) lb.style.display=account?.username?'none':'inline-block';
  if(ob) ob.style.display=account?'inline-block':'none';
}

/* v9.2 · ABERTURA EM LETREIRO: a história oficial sobe linha a linha do rodapé,
   com música de introdução e botão Pular. Texto oficial definido pelo criador. */
function introStoryParagraphs(){
  return [
    T('Ygdria era um mundo tomado por guerras, caos e destruição. Feras mágicas, guerreiros implacáveis e magos poderosos, travavam batalhas por soberania.',
      'Ygdria was a world consumed by war, chaos and destruction. Magical beasts, relentless warriors and powerful mages waged battles for sovereignty.',
      'Ygdria era un mundo tomado por guerras, caos y destrucción. Bestias mágicas, guerreros implacables y magos poderosos libraban batallas por la soberanía.'),
    T('Foi quando um ser chamado Eternidade, resolveu colocar um fim a esse caos. Escolhendo uma tribo de humanos para serem seus reguladores.',
      'That was when a being called Eternity decided to put an end to this chaos. Choosing a tribe of humans to be her regulators.',
      'Fue cuando un ser llamado Eternidad decidió poner fin a ese caos. Eligiendo a una tribu de humanos como sus reguladores.'),
    T('Ela separou o mundo em 12 reinos, colocando o que chamou de Reino Humano no centro de todos os outros.',
      'She divided the world into 12 realms, placing what she called the Human Realm at the center of all the others.',
      'Ella separó el mundo en 12 reinos, colocando el que llamó Reino Humano en el centro de todos los demás.'),
    T('Luz, Sombras, Fogo, Água, Vento, Terra, Natureza, Raios, Areia, Chuva, Gelo e o Reino dos Humanos.',
      'Light, Shadows, Fire, Water, Wind, Earth, Nature, Lightning, Sand, Rain, Ice and the Realm of Humans.',
      'Luz, Sombras, Fuego, Agua, Viento, Tierra, Naturaleza, Rayos, Arena, Lluvia, Hielo y el Reino de los Humanos.'),
    T('Esses são, os 12 Reinos!','These are, the 12 Realms!','¡Esos son, los 12 Reinos!'),
    T('E assim, Ygdria viveu em paz por séculos. Cada reino governado por seu Rei Mago ou Rainha Maga e protegidos por seus cavaleiros.',
      'And so, Ygdria lived in peace for centuries. Each realm ruled by its Mage King or Mage Queen and protected by its knights.',
      'Y así, Ygdria vivió en paz durante siglos. Cada reino gobernado por su Rey Mago o Reina Maga y protegido por sus caballeros.'),
    T('Mas o que a Eternidade não esperava, é que alguém de fora dos 12 reinos surgiria...',
      'But what Eternity did not expect... is that someone from beyond the 12 realms would appear...',
      'Pero lo que la Eternidad no esperaba... es que alguien de fuera de los 12 reinos aparecería...')
  ];
}
function renderIntroTexts(){
  const crawl=document.getElementById('crawlText');
  if(crawl) crawl.innerHTML=introStoryParagraphs().map(p=>`<p>${p}</p>`).join('');
  const eyebrow=document.getElementById('introEyebrow');
  if(eyebrow) eyebrow.textContent=T('AS CRÔNICAS DE YGDRIA','THE CHRONICLES OF YGDRIA','LAS CRÓNICAS DE YGDRIA');
  const btn=document.getElementById('introNext');
  if(btn) btn.textContent=T('Pular ⏭','Skip ⏭','Saltar ⏭');
}
/* 🎵 Música da introdução: arpejo suave gerado no WebAudio (para no Pular/fim) */
let introMusicOn=false, introMusicTimer=null;
function startIntroMusic(){
  if(introMusicOn) return;
  const ctx=ensureAudio(); if(!ctx) return;
  introMusicOn=true;
  const acordes=[[220,277.2,329.6],[196,246.9,293.7],[174.6,220,261.6],[196,246.9,293.7]];
  let barra=0;
  const loop=()=>{
    if(!introMusicOn) return;
    const notas=acordes[barra%acordes.length]; barra++;
    beep(notas[0]/2,1.9,'sine',.045);
    notas.forEach((f,i)=>{ beep(f,0.95,'triangle',.05,i*0.55); beep(f*2,0.55,'sine',.026,i*0.55+0.28); });
    introMusicTimer=setTimeout(loop,1800);
  };
  loop();
}
function stopIntroMusic(){ introMusicOn=false; clearTimeout(introMusicTimer); introMusicTimer=null; }

/* v9.1 · Smoke test automatizado de gameplay: abra com ?qa=smoke
   Joga de verdade: escala time, entra em batalha, dispara habilidade,
   vence a fase e confere obstáculos/objetivos. Banner PASS/FAIL. */
async function runSmokeTest(){
  const results=[];
  const ok=(name,cond)=>results.push({name,pass:!!cond});
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
  try{
    localStorage.setItem('12r_tutorial','1');
    ok('12 heróis divinos + cartas jogáveis', KINGDOMS.filter(k=>k.rarity==='DIVINA').length===12 && KINGDOMS.length>=16);
    ok('4 jovens aprendizes com cartas e chibis', ['berenice-jovem','galateia-jovem','adriel-jovem','acqua-jovem'].every(id=>{
      const k=KINGDOMS.find(card=>card.id===id);
      return k&&k.rarity==='NORMAL'&&k.stars===1&&k.atk===2&&k.img&&k.sprite;
    }));
    /* Tabela oficial de estrelas: 1★=0P/0A 2★=1P/0A 3★=2P/0A 4★=3P/0A 5★=3P/1A 6★=3P/2A 7★=3P/3A */
    const STAR_KIT={1:[0,0],2:[1,0],3:[2,0],4:[3,0],5:[3,1],6:[3,2],7:[3,3]};
    ok('contrato de habilidades por estrelas', KINGDOMS.every(k=>{
      if(k.artKit) return k.abilities.length>0; /* kit impresso na arte da carta prevalece */
      const [p,a]=STAR_KIT[k.stars||7]||[3,3];
      return k.abilities.filter(x=>x.kind==='passive').length===p&&k.abilities.filter(x=>x.kind==='active').length===a;
    }));
    ok('10 fases no Reino dos Humanos', WORLDS[0].fases.length===10);
    ok('50 missões oficiais', WORLDS[0].fases.every(f=>f.missoes.length===5));
    chosenIds=[0,3,7,11]; pendingStage=0; towerMode=false;
    worldRun={active:true,fase:0,nivel:1};
    beginGame(0);
    await wait(600);
    ok('tabuleiro completo', document.querySelectorAll('#board .cell').length===SIZE*SIZE);
    ok('4 heróis na arena', document.querySelectorAll('#partyArena .hero-unit').length===4);
    const hpAntes=enemies[0].hp;
    triggerAbility(11,KINGDOMS[11].abilities[3]);
    /* A habilidade passa pela leitura completa conjurar → ataque; o smoke
       precisa esperar a janela real da coreografia antes de aferir o HP. */
    await wait(CONJURATION_LEAD_MS+180);
    ok('habilidade causou dano', enemies[0].hp<hpAntes);
    enemies.forEach((e,i)=>{ if(e.hp>0) applyDamageToEnemy(e.hp,3,i); });
    finishRoomIfCleared();
    await wait(900);
    ok('missão concluída', document.getElementById('stageClearOverlay').classList.contains('show')||worldRun.nivel>1);
    await wait(1200);
    /* Habilidade de Fase: motor executa efeito de inimigo-carta sem quebrar o tabuleiro */
    placeObstacles({stone:2,ice:1});
    ok('obstáculos operantes', Object.keys(obstaclesMeta).length===3);
    const fakeSA={nome:'QA',cd:1,tipo:'trocarCores',qtd:2};
    execStageAbility(enemies[0]||{}, fakeSA);
    ok('habilidade de fase executa', document.querySelectorAll('#board .cell').length===SIZE*SIZE);
    ok('20 habilidades de fase definidas', KINGDOMS.filter(k=>k.stageAbility&&k.stageAbility.nome).length>=20);
    /* Reiniciar fase NUNCA volta à demo (Portão do Pântano) */
    restartCurrentStage();
    await wait(500);
    const nomesDemo=['Limo Rúnico','Sentinela de Pedra','Lobo Batedor','Espectro Menor','Servo das Trevas','Dragão Carmesim','Dragão das Sombras'];
    ok('reiniciar fase fica no mundo oficial', worldRun.active===true && enemies.every(e2=>!nomesDemo.includes(e2.name)));
    ok('fórmula de HP 50/30/15', DIFFICULTY_MULTS.facil.hpFactor===50 && DIFFICULTY_MULTS.normal.hpFactor===30 && DIFFICULTY_MULTS.pesadelo.hpFactor===15);
    /* 12 escadas cíclicas de cores aliadas: cada reino inicia a própria rotação de 4 */
    ok('12 alianças cíclicas de gemas', Object.keys(ALLIED_ORDER).length===12 && Object.entries(ALLIED_ORDER).every(([id,seq])=>seq.length===4&&seq[0]===id&&seq.every(r=>KINGDOMS.some(k=>k.id===r))));
    ok('gemas usam a cor-base do reino e só mudam com repetição',(()=>{
      const original=[...ACTIVE];
      const jovem=KINGDOMS.findIndex(k=>k.id==='berenice-jovem');
      const adriel=KINGDOMS.findIndex(k=>k.id==='adriel-jovem');
      const acqua=KINGDOMS.findIndex(k=>k.id==='acqua-jovem');
      const fogo=KINGDOMS.findIndex(k=>k.id==='fogo');
      ACTIVE=[jovem,acqua,fogo,KINGDOMS.findIndex(k=>k.id==='gelo')];
      computeBattleGemColors();
      const solo=battleGemColors[jovem]?.c===realmOrb('humanos')?.c && battleGemColors[acqua]?.c===realmOrb('agua')?.c;
      ACTIVE=[jovem,adriel,acqua,fogo];
      computeBattleGemColors();
      const repetida=battleGemColors[jovem]?.c===realmOrb('humanos')?.c && battleGemColors[adriel]?.c===realmOrb('luz')?.c && battleGemColors[adriel]?.icon===KINGDOMS.find(k=>k.id==='humanos')?.color;
      ACTIVE=original;
      computeBattleGemColors();
      return solo&&repetida;
    })());
    /* v9.2 · contratos novos */
    ok('dificuldade Difícil (4 níveis)', !!DIFFICULTY_MULTS.dificil && DIFFICULTY_MULTS.dificil.hpFactor===30 && typeof allEnemiesAttackMode==='function');
    ok('3 grandes alianças nomeadas', ALLIANCES.length===3 && ALLIANCES.every(a=>a.membros.length===4) && ALLIANCES[0].nome.includes('Lago') && ALLIANCES[1].nome.includes('Dragão') && ALLIANCES[2].nome.includes('Barion'));
    ok('loja com 20 consumíveis', SHOP_ITEMS.length===20 && SHOP_ITEMS.filter(i=>i.uso==='batalha').length>=12 && typeof usarItemBatalha==='function');
    ok('login diário: ciclo de 7 dias', LOGIN_REWARDS.length===7 && LOGIN_REWARDS[6].c===80);
    ok('Torre da Eternidade: 1 personagem/andar + cenário fase 9', (()=>{ const t2=buildTowerStage(1); return t2.enemies.length===1 && t2.bgUrl==='assets/bg/humanos/fase-09.jpg' && buildTowerStage(1+KINGDOMS.length).enemies[0].hp>t2.enemies[0].hp; })());
    ok('timer de missão + mochila em batalha', !!document.getElementById('missionTimer') && !!document.getElementById('mochilaBtn') && !!document.getElementById('mochilaScreen'));
    ok('letreiro da história (7 parágrafos)', !!document.getElementById('crawlScroll') && introStoryParagraphs().length===7);
    ok('falas de entrada dos inimigos', Object.keys(ENEMY_LINES).length>=23 && typeof enemyLineFor==='function');
    ok('Lobo Raivoso encara o centro da arena', HUMANOS_ETYPES.loboRaivoso.flip===true);
    ok('moedas e XP de perfil operantes', typeof coins==='number'&&typeof profileLevel()==='number');
    /* v9.3 · contratos de estabilidade, apresentação e acessibilidade */
    ok('v11 usa configuração central dos 12 reinos', APP_VERSION.startsWith('v11') && V10.realms?.length===12);
    ok('coordenador de fases da batalha', typeof canAcceptPlayerInput==='function' && BATTLE_PHASES.has('idle') && BATTLE_PHASES.has('enemies') && BATTLE_PHASES.has('paused'));
    ok('áudio separado em música e efeitos', !!document.getElementById('musicVolumeRange') && !!document.getElementById('sfxVolumeRange'));
    ok('4 perfis de qualidade gráfica', V10.quality?.values?.length===4 && !!document.getElementById('qualitySelect'));
    ok('3 recursos de acessibilidade', ['highContrastToggle','largeTextToggle','reduceFlashesToggle'].every(id=>!!document.getElementById(id)));
    ok('HUD superior e barra de informações configuráveis', ['vizTurnInfo','vizTopHud','vizInfoBar'].every(id=>!!document.getElementById(id)) && !!document.getElementById('missionClockGroup'));
    worldRun.active=false;
  }catch(e){
    results.push({name:'exceção: '+e.message, pass:false});
  }
  const failed=results.filter(r=>!r.pass);
  const banner=document.createElement('div');
  banner.id='smokeBanner';
  banner.style.cssText='position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:999;padding:10px 18px;border-radius:10px;font:700 13px Georgia,serif;color:#fff;box-shadow:0 4px 18px rgba(0,0,0,.6);background:'+(failed.length?'#8e1b1b':'#1b6e2f');
  banner.textContent=failed.length?`SMOKE FAIL ${failed.length}/${results.length}: `+failed.map(f=>f.name).join(' | '):`SMOKE PASS ${results.length}/${results.length}`;
  banner.title='Relatório do teste automatizado (?qa=smoke). Toque para fechar.';
  banner.style.cursor='pointer';
  banner.addEventListener('click',()=>banner.remove());
  window.setTimeout(()=>banner.remove(),8000);
  document.body.appendChild(banner);
  console.log('[SMOKE]',JSON.stringify(results));
  localStorage.setItem('12r_smoke',JSON.stringify({t:Date.now(),results}));
  return results;
}
refreshContinueButton(); /* WORLDS já inicializado neste ponto do arquivo */
if(new URLSearchParams(location.search).get('qa')==='smoke'){
  window.addEventListener('load',()=>setTimeout(runSmokeTest,400));
}

/* v10 · PWA: núcleo offline versionado; assets pesados entram no cache apenas
   quando são solicitados pelo time ativo. */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(error=>console.warn('[PWA] Service worker não registrado:',error));
  });
}
function openMissionReplay(faseIdx){
  pendingReplayPhase=faseIdx;
  const next=nextDifficulty(difficulty);
  const hard=document.getElementById('replayHardBtn');
  const hint=document.getElementById('replayHardHint');
  if(hard) hard.disabled=difficulty==='pesadelo';
  if(hint) hint.textContent=difficulty==='pesadelo'
    ? 'Você já está na dificuldade máxima.'
    : `Repetir a história em ${difficultyLabel(next)}.`;
  openPanel('missionReplayScreen');
}
