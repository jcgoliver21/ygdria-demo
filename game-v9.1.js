
/* ---------- Versão única do app (fonte da verdade) ---------- */
const APP_VERSION = 'v9.1';
const APP_VERSION_LABEL = 'VERSÃO 9.1';
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
    sprite:'assets/characters/runtime-v4/barbara/single-1.png', fxTheme:'seismic', rarity:'DIVINA', stars:7,
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
    sprite:'assets/characters/runtime-v6/mardogear/single-1.png', fxTheme:'storm', rarity:'DIVINA', stars:7,
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
    sprite:'assets/characters/runtime-v6/regnar/single-1.png', fxTheme:'deluge', rarity:'DIVINA', stars:7,
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
    abilities:[
      {kind:'passive',gems:15, name:'Machado de Gelo', tipo:'danoArea', valor:300, area:150, desc:'Inflige 300 de dano no inimigo e 150 em área.'},
      {kind:'passive',gems:25, name:'Bola de Neve', tipo:'stunPerRealmGem', divisor:4, desc:'Atordoa o inimigo pela quantidade de turnos equivalente a 1/4 das pedras cinza claras no tabuleiro.'},
      {kind:'passive',gems:45, name:'Aurora Austral', tipo:'healFixed', valor:500, desc:'Recupera 500 de vida.'},
      {kind:'active',gems:60, name:'Aurora Boreal', tipo:'dano', valor:500, desc:'Inflige 500 de dano no inimigo.'},
      {kind:'active',gems:75, name:'Geada Branca', tipo:'freezeBlast', valor:100, porGema:20, turnos:1, desc:'Dá 100 de dano em cada inimigo + 20 por cada peça cinza clara no tabuleiro e congela eles por 1 turno.'},
      {kind:'active',gems:100, name:'Morte Congelada', tipo:'freezeExecute', turnos:5, desc:'Congela totalmente o inimigo por 5 turnos e reduz a vida dele pela metade da atual.'}
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
let masterVolume = Number(localStorage.getItem('12r_volume') ?? 70) / 100;
let particlesEnabled = localStorage.getItem('12r_particles') !== 'false';
let hapticsEnabled = localStorage.getItem('12r_haptics') !== 'false';
let reducedMotion = localStorage.getItem('12r_motion') === 'reduced';
let masterBus = null;
let musicBus = null;
let sfxBus = null;
let musicGeneration = 0;
let musicBarIndex = 0;
let musicMoodMode = 0;
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
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001,(vol||0.16)*masterVolume), t0+0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
  osc.connect(gain); gain.connect(sfxBus||ctx.destination);
  osc.start(t0); osc.stop(t0+dur+0.03);
}
function chord(freqs, dur, type, vol, delay){ freqs.forEach(f=>beep(f,dur,type,vol,delay)); }

function sfxSelect(){ beep(660,0.08,'triangle',0.11); }
function sfxGemTap(){ beep(880,0.05,'sine',0.08); }
function sfxInvalid(){ beep(180,0.12,'sawtooth',0.08); }
function sfxMatch(step){ const base=520+Math.min(step,6)*70; beep(base,0.10,'triangle',0.13); beep(base*1.5,0.09,'sine',0.08,0.05); }
function sfxHit(){ beep(140,0.09,'square',0.15); beep(90,0.14,'sawtooth',0.11,0.02); }
function sfxPlayerHit(){ beep(110,0.16,'sawtooth',0.14); }
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
  g.gain.linearRampToValueAtTime(Math.max(0.0001,vol*masterVolume),t0+attack);
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
    <div class="cutin-card"><img src="${k.cardThumb||k.img}" alt=""></div>
    <div class="cutin-name"><span>${k.reino}</span><b>${a.name}</b></div>`;
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
  gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*masterVolume),startTime+attack);
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
  const bossBoost=stageIndex===DUNGEON.length-1?.22:0;
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
  musicBarIndex++;
  musicTimer=setTimeout(()=>scheduleMusicBar(sceneIdx,generation),Math.max(120,barDuration*1000-90));
}

function playStageMusic(sceneIdx){
  stopMusic();
  currentTrack=sceneIdx;
  if(musicMuted) return;
  ensureAudio();
  musicBarIndex=0;
  const generation=musicGeneration;
  scheduleMusicBar(sceneIdx,generation);
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
  setBattleStatus('Trilha dinâmica: '+['automática','calma','épica'][musicMoodMode]+'.','system');
}

const SIZE = 6;
const BASE_ATK = 12;
const PLAYER_MAX_HP = 4000;

let board = [];
let powerUps = {};
let lastSwap = null;
let forcedResolution = null;
let selected = null;
let busy = false;
let comboStep = 0;
let stageIndex = 0;
let enemies = [];
let playerHP = PLAYER_MAX_HP;
let stageTransitioning = false;
let combatEpoch = 0;

let ACTIVE = [];
let heroProgress = {};
let firedTiers = {};
let heroReady = {};
let heroActiveQueue = {};
let pendingRoomPassives = [];
let roomClearScheduled = false;
let playerShield = 0;
let enemyDots = [];
let enemyStunTurns = 0;
let atkBuffTurns = 0;
let atkBuffMult = 1;
let manualTarget = null;
let lastDamageDealt = 0;
let heroLastDamage = {};
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
let enemyVulnerableTurns = 0;
let enemyVulnerableMult = 1;
let stoneArmorTurns = 0;
let stoneArmorReduction = .5;
let stoneArmorReflect = .5;
let golemAllies = 0;
let harpyAllies = 0;   // v9: harpias da Sophitia (máx. 5, ecoam 20% do dano dela)
let heroEmpower = {};  // v9: cargas de Full Power por herói {idx:{left,mult}}

/* v9.1 · Dificuldade selecionável */
const DIFFICULTY_MULTS={facil:{hp:.7,atk:.7},normal:{hp:1,atk:1},pesadelo:{hp:1.5,atk:1.4}};
let difficulty=localStorage.getItem('12r_difficulty')||'normal';
if(!DIFFICULTY_MULTS[difficulty]) difficulty='normal';
function applyDifficultyUI(){
  document.querySelectorAll('#diffGroup [data-diff]').forEach(b=>b.classList.toggle('active',b.dataset.diff===difficulty));
}

/* v9.1 · Moedas */
let coins=Number(localStorage.getItem('12r_coins')||0);
function grantCoins(n){
  if(!n) return;
  coins=Math.max(0,coins+Math.round(n));
  localStorage.setItem('12r_coins',String(coins));
  updateCoinBadge();
}
function updateCoinBadge(){
  const el=document.getElementById('coinBadge');
  if(el) el.textContent=`🪙 ${coins}`;
  const el2=document.getElementById('shopCoins');
  if(el2) el2.textContent=`🪙 ${coins}`;
}
const IS_DAILY_RUN=new URLSearchParams(location.search).get('daily')==='1';

/* v9.1 · XP e nível por herói (Lv 1-10; +2 de ataque por nível) */
/* v9.1 · XP e nível de PERFIL (as cartas não sobem de nível).
   O nível do perfil dá um bônus global sutil: +1 de ataque a cada 3 níveis. */
let profileXp=Number(localStorage.getItem('12r_pxp')||0);
try{ // migração: XP antigo por herói vira XP de perfil (uma única vez)
  const legado=JSON.parse(localStorage.getItem('12r_xp')||'null');
  if(legado){
    profileXp+=Object.values(legado).reduce((a,b)=>a+Number(b||0),0);
    localStorage.removeItem('12r_xp');
    localStorage.setItem('12r_pxp',String(profileXp));
  }
}catch(e){}
function profileLevel(){ return Math.min(99, 1+Math.floor(Math.sqrt(profileXp/120))); }
function profileXpForNext(){ const next=profileLevel()+1; return next>99?null:Math.pow(next-1,2)*120; }
function heroAtkFor(idx){ const k=KINGDOMS[idx]; return (k.atk||BASE_ATK)+Math.floor((profileLevel()-1)/3); }
function grantXp(amount){
  const before=profileLevel();
  profileXp+=Math.max(0,Math.round(amount*4)); // 4 heróis contribuíam antes; mantém o ritmo
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
  {id:'dungeon', nome:'Senhor do Trono', desc:'Conclua a masmorra inteira.', icon:'👑', en:{nome:'Lord of the Throne', desc:'Clear the whole dungeon.'}},
  {id:'stars-all', nome:'Perfeccionista', desc:'Conquiste 3 estrelas em 5 fases.', icon:'⭐', en:{nome:'Perfectionist', desc:'Earn 3 stars on 5 stages.'}},
  {id:'tower5', nome:'Escalador', desc:'Supere o andar 5 da Torre Infinita.', icon:'🗼', en:{nome:'Climber', desc:'Clear floor 5 of the Infinite Tower.'}},
  {id:'tower10', nome:'Lenda da Torre', desc:'Supere o andar 10 da Torre Infinita.', icon:'🌌', en:{nome:'Tower Legend', desc:'Clear floor 10 of the Infinite Tower.'}},
  {id:'dark-court', nome:'Corte Sombria', desc:'Vença uma fase com Berenice das Sombras e Mardogear juntos.', icon:'🌑', en:{nome:'Dark Court', desc:'Win a stage with Shadow Berenice and Mardogear together.'}},
  {id:'rich', nome:'Tesouro Real', desc:'Acumule 500 moedas.', icon:'🪙', en:{nome:'Royal Treasure', desc:'Hoard 500 coins.'}},
  {id:'daily', nome:'Ritual Diário', desc:'Conclua um Desafio Diário.', icon:'📅', en:{nome:'Daily Ritual', desc:'Complete a Daily Challenge.'}},
  {id:'lv5', nome:'Veterano', desc:'Alcance o nível de perfil 5.', icon:'📈', en:{nome:'Veteran', desc:'Reach profile level 5.'}, es:{nome:'Veterano', desc:'Alcanza el nivel de perfil 5.'}}
];
let unlockedAch={}; try{ unlockedAch=JSON.parse(localStorage.getItem('12r_ach')||'{}'); }catch(e){}
function unlockAch(id){
  if(unlockedAch[id]) return;
  unlockedAch[id]={t:Date.now()};
  localStorage.setItem('12r_ach',JSON.stringify(unlockedAch));
  const a=ACHIEVEMENTS.find(x=>x.id===id);
  if(a){
    const t=document.createElement('div');
    t.className='ach-toast';
    t.innerHTML=`<span class="ach-toast-icon">${a.icon}</span><div><b>Conquista desbloqueada!</b><br>${a.nome}</div>`;
    document.body.appendChild(t);
    window.setTimeout(()=>t.remove(),3800);
    sfxPassive();
  }
}
function checkAchievements(ctx){
  if(ctx==='stage'){
    unlockAch('first-win');
    if(playerHP>=PLAYER_MAX_HP) unlockAch('no-damage');
    if(runStats.maxCombo>=8) unlockAch('combo8');
    if(runStats.powerUps>=10) unlockAch('powerup10');
    const ids=ACTIVE.map(i=>KINGDOMS[i].id);
    if(ids.includes('sombras')&&ids.includes('raio')) unlockAch('dark-court');
    const stars=getStars();
    if(Object.values(stars).filter(s=>s===3).length>=5) unlockAch('stars-all');
    if(profileLevel()>=5) unlockAch('lv5');
  }
  if(ctx==='dungeon'){ unlockAch('dungeon'); if(IS_DAILY_RUN) unlockAch('daily'); }
  if(ctx==='tower'){ if(towerFloor>=5) unlockAch('tower5'); if(towerFloor>=10) unlockAch('tower10'); }
  if(coins>=500) unlockAch('rich');
}
function renderAchievements(){
  renderProfileStats();
  const grid=document.getElementById('achGrid'); if(!grid) return;
  grid.innerHTML=ACHIEVEMENTS.map(a=>`
    <div class="ach-item${unlockedAch[a.id]?' unlocked':''}">
      <span class="ach-icon">${a.icon}</span>
      <div><b>${(lang!=='pt'&&(lang==='es'?(a.es||a.en):a.en))?.nome||a.nome}</b><small>${(lang!=='pt'&&(lang==='es'?(a.es||a.en):a.en))?.desc||a.desc}</small></div>
      ${unlockedAch[a.id]?'<span class="ach-check">✓</span>':'<span class="ach-lock">🔒</span>'}
    </div>`).join('');
}

/* v9.1 · Loja de consumíveis (aplicados no início da próxima batalha) */
const SHOP_ITEMS=[
  {id:'shuffle', nome:'Embaralhamento Extra', desc:'+1 embaralhamento real na próxima batalha.', preco:40, icon:'⟳', en:{nome:'Extra Shuffle', desc:'+1 royal shuffle in your next battle.'}, es:{nome:'Barajado Extra', desc:'+1 barajado real en tu próxima batalla.'}},
  {id:'potion', nome:'Poção Vital', desc:'Recupera 600 de HP no início da próxima batalha.', preco:60, icon:'🧪', en:{nome:'Vital Potion', desc:'Restores 600 HP at the start of your next battle.'}, es:{nome:'Poción Vital', desc:'Restaura 600 de vida al inicio de tu próxima batalla.'}},
  {id:'blessing', nome:'Bênção dos Reinos', desc:'Comece a próxima batalha com 2 power-ups no tabuleiro.', preco:80, icon:'💠', en:{nome:'Realm Blessing', desc:'Start your next battle with 2 power-ups on the board.'}, es:{nome:'Bendición de los Reinos', desc:'Comienza tu próxima batalla con 2 potenciadores en el tablero.'}}
];
let inventory={}; try{ inventory=JSON.parse(localStorage.getItem('12r_inv')||'{}'); }catch(e){}
function saveInventory(){ localStorage.setItem('12r_inv',JSON.stringify(inventory)); }
function buyItem(id){
  const item=SHOP_ITEMS.find(i=>i.id===id); if(!item) return;
  if(coins<item.preco){ sfxInvalid(); return; }
  grantCoins(-item.preco);
  inventory[id]=(inventory[id]||0)+1;
  saveInventory();
  renderShop();
  sfxSelect();
}
function renderShop(){
  const list=document.getElementById('shopList'); if(!list) return;
  updateCoinBadge();
  list.innerHTML=SHOP_ITEMS.map(i=>`
    <div class="shop-item">
      <span class="shop-icon">${i.icon}</span>
      <div class="shop-copy"><b>${(lang!=='pt'&&(lang==='es'?(i.es||i.en):i.en))?.nome||i.nome}</b><small>${(lang!=='pt'&&(lang==='es'?(i.es||i.en):i.en))?.desc||i.desc}</small><small class="shop-owned">${T('Na mochila','In bag','En la mochila')}: ${inventory[i.id]||0}</small></div>
      <button class="overlay-btn shop-buy" data-item="${i.id}" ${coins<i.preco?'disabled':''}>🪙 ${i.preco}</button>
    </div>`).join('');
  list.querySelectorAll('.shop-buy').forEach(b=>b.addEventListener('click',()=>buyItem(b.dataset.item)));
}
function consumeInventoryOnBattleStart(){
  const used=[];
  if(inventory.shuffle>0){ inventory.shuffle--; royalShuffles++; used.push('Embaralhamento Extra'); }
  if(inventory.potion>0){ inventory.potion--; playerHP=Math.min(PLAYER_MAX_HP,playerHP+600); updatePlayerHP(); used.push('Poção Vital (+600 HP)'); }
  if(inventory.blessing>0){ inventory.blessing--; spawnRandomPowerUps(2); used.push('Bênção dos Reinos'); }
  if(used.length){ saveInventory(); setBattleStatus(`Itens usados: ${used.join(' · ')}.`,'support'); }
}

/* v9.1 · Torre Infinita: andares gerados, inimigos escalando */
let towerMode=false, towerFloor=1;
function buildTowerStage(floor){
  const flat=DUNGEON.flatMap(s=>s.enemies);
  const scale=1+0.22*(floor-1);
  const count=Math.min(3,1+Math.floor((floor-1)/3));
  const isBossFloor=floor%5===0;
  const picks=[];
  for(let i=0;i<count;i++) picks.push(flat[Math.floor(gameRandom()*flat.length)]);
  if(isBossFloor) picks[picks.length-1]=flat[flat.length-1];
  return {
    title:`Torre · Andar ${floor}`,
    scene:(floor-1)%5,
    enemies:picks.map(p=>({...p, hp:Math.round(p.hp*scale*(isBossFloor?1.3:1)), atk:Math.round(p.atk*scale)}))
  };
}
const GOLEM_SPRITE = 'assets/enemies/stone-sentinel/single-1.png';
let autoTargetMode = false;
let battleSpeedIndex = 0;
let royalShuffles = 1;
let formationIndex = 0;
let bestCombo = 0;
const BATTLE_SPEEDS = [1,1.5,2];
/* v9.1 · 12 formações nomeadas (y≈0 = linha de frente, maior escala/z) */
const HERO_FORMATIONS = [
  { nome:'Clássica',        slots:[{x:16,y:42,s:.94,z:18},{x:39,y:46,s:.98,z:20},{x:22,y:4,s:1.17,z:38},{x:48,y:7,s:1.2,z:40}] },
  { nome:'Falange',         slots:[{x:6,y:6,s:1.1,z:40},{x:20,y:2,s:1.14,z:42},{x:34,y:4,s:1.12,z:41},{x:48,y:6,s:1.1,z:40}] },
  { nome:'Muralha',         slots:[{x:8,y:44,s:.94,z:18},{x:22,y:40,s:.96,z:20},{x:36,y:42,s:.95,z:19},{x:50,y:45,s:.93,z:17}] },
  { nome:'Coluna Diagonal', slots:[{x:12,y:46,s:.9,z:16},{x:24,y:31,s:1.0,z:26},{x:36,y:17,s:1.1,z:34},{x:48,y:3,s:1.2,z:42}] },
  { nome:'Ponta de Lança',  slots:[{x:50,y:2,s:1.24,z:43},{x:32,y:14,s:1.1,z:34},{x:32,y:32,s:1.0,z:25},{x:14,y:44,s:.9,z:16}] },
  { nome:'Escudo',          slots:[{x:8,y:4,s:1.16,z:40},{x:50,y:4,s:1.16,z:41},{x:22,y:40,s:.95,z:19},{x:38,y:42,s:.94,z:18}] },
  { nome:'Escolta Real',    slots:[{x:30,y:2,s:1.24,z:43},{x:8,y:34,s:.98,z:24},{x:28,y:44,s:.93,z:17},{x:48,y:36,s:.97,z:23}] },
  { nome:'Emboscada',       slots:[{x:6,y:8,s:1.12,z:39},{x:20,y:14,s:1.06,z:35},{x:38,y:36,s:.97,z:22},{x:52,y:44,s:.9,z:16}] },
  { nome:'Ala Esquerda',    slots:[{x:10,y:2,s:1.2,z:42},{x:12,y:17,s:1.1,z:34},{x:14,y:32,s:1.0,z:25},{x:16,y:46,s:.9,z:16}] },
  { nome:'Ala Direita',     slots:[{x:52,y:4,s:1.18,z:41},{x:48,y:18,s:1.1,z:34},{x:46,y:32,s:1.0,z:25},{x:44,y:46,s:.9,z:16}] },
  { nome:'Losango',         slots:[{x:29,y:0,s:1.22,z:42},{x:12,y:24,s:1.04,z:29},{x:48,y:24,s:1.04,z:30},{x:30,y:46,s:.9,z:16}] },
  { nome:'Estrela do Caos', slots:[{x:8,y:20,s:1.06,z:32},{x:42,y:10,s:1.14,z:37},{x:20,y:4,s:1.18,z:40},{x:52,y:38,s:.95,z:20}] }
];
formationIndex=Math.max(0,Math.min(HERO_FORMATIONS.length-1,Number(localStorage.getItem('12r_formation')||0)));
const ENEMY_FORMATIONS = {
  1:[{x:80,y:10,s:1.2,z:42}],
  2:[{x:73,y:36,s:.94,z:22},{x:86,y:3,s:1.14,z:44}],
  3:[{x:69,y:42,s:.84,z:20},{x:89,y:30,s:.94,z:28},{x:80,y:0,s:1.16,z:46}],
  4:[{x:68,y:43,s:.82,z:18},{x:90,y:35,s:.86,z:24},{x:72,y:4,s:1.08,z:42},{x:90,y:0,s:1.12,z:46}]
};
const SCENE_ENEMY_FORMATIONS = [
  {1:[{x:81,y:8,s:1.22,z:44}]},
  {2:[{x:72,y:39,s:.92,z:22},{x:87,y:5,s:1.16,z:44}]},
  {2:[{x:70,y:40,s:.9,z:21},{x:87,y:3,s:1.17,z:45}]},
  {3:[{x:68,y:43,s:.82,z:19},{x:90,y:30,s:.91,z:28},{x:79,y:0,s:1.18,z:46}]},
  {3:[{x:67,y:44,s:.8,z:18},{x:91,y:34,s:.86,z:24},{x:81,y:0,s:1.28,z:48}]}
];

const seedText = new URLSearchParams(location.search).get('seed') || String(Date.now());
let rngState = [...seedText].reduce((acc,ch)=>(Math.imul(acc,31)+ch.charCodeAt(0))>>>0,2166136261) || 1;
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

boardEl.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
boardEl.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;

function wait(ms){ return new Promise(res=>setTimeout(res, ms/(BATTLE_SPEEDS[battleSpeedIndex]||1))); }
function inferHistoryCategory(message){
  const text=String(message).toLowerCase();
  if(/dano|atac|contra-atac|inciner/.test(text)) return 'damage';
  if(/cura|recuper|escudo|prote|intoc|reflex/.test(text)) return 'support';
  if(/fase|trilha|tabuleiro|alvo|forma|velocidade/.test(text)) return 'system';
  return 'action';
}
function setBattleStatus(message,category){
  if(battleStatusEl) battleStatusEl.textContent=message;
  const entry={
    id:++battleHistorySeq,
    stage:stageIndex+1,
    time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),
    message:String(message),
    category:category||inferHistoryCategory(message)
  };
  battleHistory.push(entry);
  if(battleHistory.length>160) battleHistory.shift();
  if(document.getElementById('battleHistoryScreen')?.classList.contains('show')) renderBattleHistory();
}
function renderBattleHistory(){
  if(!battleHistoryListEl) return;
  if(!battleHistory.length){
    battleHistoryListEl.innerHTML='<div class="history-empty">Nenhum evento registrado nesta batalha.</div>';
    return;
  }
  battleHistoryListEl.innerHTML=[...battleHistory].reverse().map(entry=>
    '<article class="history-entry '+entry.category+'">'+
      '<div class="history-meta"><span>Fase '+entry.stage+'</span><time>'+entry.time+'</time></div>'+
      '<p>'+entry.message+'</p>'+
    '</article>').join('');
}
function openBattleHistory(){ renderBattleHistory(); openPanel('battleHistoryScreen'); }
function clearBattleHistory(){ battleHistory=[]; renderBattleHistory(); setBattleStatus('Histórico reiniciado.','system'); }
async function copyBattleHistory(){
  const text=battleHistory.map(entry=>'['+entry.time+'] Fase '+entry.stage+' — '+entry.message).join('\n');
  try{
    await navigator.clipboard.writeText(text);
    setBattleStatus('Histórico copiado para a área de transferência.','system');
  }catch(e){
    setBattleStatus('Não foi possível copiar o histórico neste navegador.','system');
  }
  renderBattleHistory();
}
function haptic(pattern){ if(hapticsEnabled && navigator.vibrate) navigator.vibrate(pattern); }
function pulseHpEffect(kind,duration=900){
  const anchor=document.getElementById('playerHpAnchor');
  if(!anchor) return;
  const cls='hp-'+kind+'-pulse';
  anchor.classList.remove(cls); void anchor.offsetWidth; anchor.classList.add(cls);
  window.setTimeout(()=>anchor.classList.remove(cls),duration);
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
  if(playerShield>0) chips.push(['positive','Escudo '+playerShield+(shieldTurns?' · '+shieldTurns+'t':'')]);
  if(enemyBlindTurns>0) chips.push(['positive','Cegueira · '+enemyBlindTurns+'t']);
  if(reflectTurns>0) chips.push(['positive','Reflexão · '+reflectTurns+'t']);
  if(invulnerableTurns>0) chips.push(['positive','Intocável · '+invulnerableTurns+'t']);
  if(lifestealCharges>0) chips.push(['positive','Eternidade · '+lifestealCharges+' cargas']);
  if(stoneArmorTurns>0) chips.push(['positive','Armadura de Pedra · '+stoneArmorTurns+'t']);
  if(golemAllies>0) chips.push(['positive','Golens aliados · '+golemAllies]);
  if(enemyVulnerableTurns>0) chips.push(['negative','Defesa rompida · '+enemyVulnerableTurns+'t']);
  if(incinerateActive) chips.push(['negative','Incinerar +'+incinerateStacks]);
  if(enemyDots.length) chips.push(['negative',(enemyDots[0].label||'Dano contínuo')+' · '+Math.max(...enemyDots.map(d=>d.turns))+'t']);
  statusTrayEl.innerHTML = chips.map(([kind,label])=>'<span class="status-chip '+kind+'">'+label+'</span>').join('');
  syncHpStateClasses();
}
function scopeSvg(svg,scope){
  return svg
    .replace(/id="([^"]+)"/g,(_,id)=>`id="${id}-${scope}"`)
    .replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${id}-${scope})`);
}

/* ---------- ASSET CONTRACT / COMBAT DIRECTOR ---------- */
const HERO_ACTIONS = Object.freeze({
  idle:   { frames:1, duration:1, loop:true },
  attack: { frames:6, duration:560, loop:false },
  cast:   { frames:6, duration:720, loop:false },
  hit:    { frames:3, duration:300, loop:false }
});
const MAX_ACTIVE_FX = 28;

function spriteMarkup(k, action='idle'){
  const spec = k.sprites?.[action];
  if(spec?.src){
    const meta = {...HERO_ACTIONS[action], ...spec};
    const steps = Math.max(1, Number(meta.frames||1)-1);
    return `<div class="hero-sprite-sheet" aria-hidden="true" style="--sprite-url:url('${meta.src}');--sprite-frames:${Math.max(1,Number(meta.frames||1))};--sprite-steps:${steps};--sprite-duration:${Number(meta.duration||520)}ms"></div>`;
  }
  if(k.sprite) return `<img class="hero-sprite-image" src="${k.sprite}" alt="${k.nome}">`;
  return scopeSvg(CHIBI_SVG[k.id],k.id);
}

function playHeroAction(idx, action='attack'){
  const k = KINGDOMS[idx];
  const avatar = document.getElementById('party-'+k.id+'-avatar');
  if(!avatar) return;
  const meta = HERO_ACTIONS[action] || HERO_ACTIONS.attack;
  avatar.dataset.action = action;
  if(k.sprites?.[action]?.src) avatar.innerHTML = spriteMarkup(k,action);
  avatar.classList.remove('hero-action'); void avatar.offsetWidth; avatar.classList.add('hero-action');
  window.setTimeout(()=>{
    if(!avatar.isConnected || avatar.dataset.action!==action) return;
    avatar.dataset.action='idle';
    if(k.sprites?.[action]?.src) avatar.innerHTML = spriteMarkup(k,'idle');
    avatar.classList.remove('hero-action');
  }, Math.max(80,Number(meta.duration||520)));
}

function trimCombatFx(){
  const layer = document.getElementById('specialFxLayer');
  if(!layer) return;
  const fx = layer.querySelectorAll('[data-fx]');
  for(let i=0;i<Math.max(0,fx.length-MAX_ACTIVE_FX);i++) fx[i].remove();
}

function spawnCombatFx(kind,target,color='#fff',duration=650){
  const layer = document.getElementById('specialFxLayer');
  if(!layer || !target || !particlesEnabled || reducedMotion) return;
  const lr=layer.getBoundingClientRect(), tr=target.getBoundingClientRect();
  const fx=document.createElement('div');
  fx.dataset.fx=kind;
  fx.className=kind==='hit' ? 'fx-hit-spark' : 'attack-telegraph';
  fx.style.color=color;
  fx.style.left=(tr.left-lr.left+tr.width/2)+'px';
  fx.style.top=(tr.top-lr.top+tr.height/2)+'px';
  layer.appendChild(fx); trimCombatFx();
  window.setTimeout(()=>fx.remove(),duration);
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
  const n=Math.max(1,countOverride||prof.count);
  for(let i=0;i<n;i++){
    const p=document.createElement('div');
    p.className='realm-particle rp-'+realmId;
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
    window.setTimeout(()=>p.remove(),dur+delay+120);
  }
  trimCombatFx();
}

function renderPartyArena(){
  partyArenaEl.innerHTML = '';
  ACTIVE.forEach(idx=>{
    const k = KINGDOMS[idx];
    const unit = document.createElement('div');
    unit.className = 'unit hero-unit rarity-'+(k.stars||0);
    unit.id = 'party-'+k.id;
    unit.style.setProperty('--realm',k.color);
    unit.style.setProperty('--aura-inner',k.color);
    unit.style.setProperty('--aura-inner-light',k.colorLight);
    unit.style.setProperty('--aura-outer',k.rarity==='DIVINA'?'#ffe58a':k.colorLight);
    unit.style.setProperty('--aura-outer-light',k.rarity==='DIVINA'?'#ffffff':k.color);
    const avatarContent = spriteMarkup(k,'idle');
    unit.innerHTML = `
      <div class="unit-stage">
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle" id="party-${k.id}-avatar" data-hero-id="${k.id}" data-action="idle">${avatarContent}</div>
      </div>
      <div class="unit-name">${k.nome.split(',')[0]}</div>
      <div class="charge-outer"><div class="charge-inner" id="charge-${k.id}" style="width:0%"></div></div>
      <div class="charge-text" id="chargeText-${k.id}">0/100</div>
    `;
    partyArenaEl.appendChild(unit);
    const avatarEl = document.getElementById('party-'+k.id+'-avatar');
    avatarEl.style.cursor = 'pointer';
    avatarEl.setAttribute('role','button');
    avatarEl.setAttribute('tabindex','0');
    avatarEl.setAttribute('aria-label',`${k.nome}: abrir habilidades ativas carregadas`);
    avatarEl.addEventListener('click', ()=>onHeroAvatarClick(idx));
    avatarEl.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); onHeroAvatarClick(idx); } });
  });
  renderGolemUnits();
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
    unit.innerHTML=`
      <div class="unit-stage">
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle" aria-hidden="true">
          <img class="enemy-sprite-image summon-sprite" src="${GOLEM_SPRITE}" alt="Golem aliado ${i+1}">
        </div>
      </div>
      <div class="unit-name">Golem ${i+1}</div>
      <div class="golem-badge">½ DANO</div>
    `;
    partyArenaEl.appendChild(unit);
  }
  applyBattleFormation();
  if(spawned){
    window.setTimeout(()=>partyArenaEl.querySelectorAll('.golem-spawned').forEach(unit=>unit.classList.remove('golem-spawned')),850);
  }
}

function renderHarpyUnits(spawned=false){
  partyArenaEl.querySelectorAll('.harpy-unit').forEach(unit=>unit.remove());
  const soph=KINGDOMS.find(kk=>kk.id==='vento');
  if(soph){
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
      unit.innerHTML=`
        <div class="unit-stage">
          <div class="unit-ground-shadow"></div>
          <div class="avatar-circle" aria-hidden="true">
            <img class="enemy-sprite-image summon-sprite" src="${soph.sprite}" alt="Harpia aliada ${i+1}">
          </div>
        </div>
        <div class="unit-name">Harpia ${i+1}</div>
        <div class="golem-badge">20% DANO</div>
      `;
      partyArenaEl.appendChild(unit);
    }
  }
  applyBattleFormation();
  if(spawned){
    window.setTimeout(()=>partyArenaEl.querySelectorAll('.golem-spawned').forEach(unit=>unit.classList.remove('golem-spawned')),850);
  }
}

function updateHeroProgressUI(idx){
  const k = KINGDOMS[idx];
  const total = Math.max(0,Math.min(99,heroProgress[idx]||0));
  const queued = (heroActiveQueue[idx]||[]).length;
  const bar = document.getElementById('charge-'+k.id);
  const txt = document.getElementById('chargeText-'+k.id);
  const unit = document.getElementById('party-'+k.id);
  if(bar) bar.style.width = total+'%';
  heroReady[idx] = queued>0;
  if(queued>0){
    if(txt) txt.textContent = queued+' ATIVA'+(queued>1?'S':'')+' · '+total+'/100';
    if(unit) unit.classList.add('ready');
  } else {
    if(txt) txt.textContent = `${total}/100`;
    if(unit) unit.classList.remove('ready');
  }
}

function onHeroAvatarClick(idx){
  if(!heroReady[idx] || busy) return;
  openAbilityPicker(idx);
}

function abilityCanBeUsed(a){
  if(a.requiresGolems && golemAllies<a.requiresGolems) return false;
  return true;
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
  document.getElementById('abilityPickerTitle').textContent=k.nome+' · Ativas';
  document.getElementById('abilityPickerSummary').textContent='Escolha uma habilidade carregada. As demais cargas continuarão armazenadas para esta missão.';
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
    const requirement=a.requiresGolems&&!abilityCanBeUsed(a)?' · requer '+a.requiresGolems+' golens':'';
    btn.innerHTML='<span class="ability-tier">'+a.gems+'%</span><span class="ability-choice-copy"><b>'+a.name+'</b><small>'+a.desc+requirement+'</small></span><span class="ability-charge-count">×'+count+'</span>';
    btn.addEventListener('click',()=>useQueuedActive(idx,a));
    list.appendChild(btn);
  });
  document.getElementById('abilityPickerScreen').classList.add('show');
}

function useQueuedActive(idx,a){
  if(busy || !abilityCanBeUsed(a)) return;
  const queue=heroActiveQueue[idx]||[];
  const queueIndex=queue.indexOf(a);
  if(queueIndex<0) return;
  queue.splice(queueIndex,1);
  heroActiveQueue[idx]=queue;
  updateHeroProgressUI(idx);
  document.getElementById('abilityPickerScreen').classList.remove('show');
  busy=true;
  triggerAbility(idx,a);
  setBattleStatus(`${KINGDOMS[idx].nome} liberou ${a.name}!`);
  haptic([30,25,55]);
  window.setTimeout(()=>{
    if(!roomClearScheduled&&!stageTransitioning) busy=false;
  },900);
}

function renderStageProgress(){
  stageProgressEl.innerHTML = '';
  const total=worldRun.active?5:towerMode?5:DUNGEON.length;
  const atual=worldRun.active?worldRun.nivel-1:towerMode?((towerFloor-1)%5):stageIndex;
  for(let i=0;i<total;i++){
    const seg = document.createElement('div');
    seg.className = 'arena-seg' + (i<atual ? ' done' : (i===atual ? ' current' : ''));
    stageProgressEl.appendChild(seg);
  }
  if(worldRun.active){
    const fase=WORLDS[0].fases[worldRun.fase];
    stageLabelEl.textContent = `${T('Missão','Mission','Misión')} ${worldRun.nivel}/5`;
    dungeonTitleEl.textContent = fase.nome;
  }else if(towerMode){
    stageLabelEl.textContent = `${T('Andar','Floor','Piso')} ${towerFloor}`;
    dungeonTitleEl.textContent = T('Torre Infinita','Infinite Tower','Torre Infinita');
  }else{
    stageLabelEl.textContent = `Fase ${stageIndex+1}/${DUNGEON.length}`;
    dungeonTitleEl.textContent = DUNGEON[stageIndex].title;
  }
  arenaEl.className = 'arena scene-'+((activeStageData&&Number.isFinite(activeStageData.scene))?activeStageData.scene:DUNGEON[stageIndex].scene);
  if(activeStageData?.bgUrl){
    arenaEl.style.setProperty('background-image',`linear-gradient(rgba(6,3,13,.22),rgba(6,3,13,.5)),url('${activeStageData.bgUrl}')`,'important');
    arenaEl.style.setProperty('background-size','cover');
    arenaEl.style.setProperty('background-position','center');
  }else{
    arenaEl.style.removeProperty('background-image');
    arenaEl.style.removeProperty('background-size');
    arenaEl.style.removeProperty('background-position');
  }
}


function applyBattleFormation(){
  const heroSlots=HERO_FORMATIONS[formationIndex%HERO_FORMATIONS.length].slots;
  const heroUnits=[...partyArenaEl.querySelectorAll('.hero-unit')];
  heroUnits.forEach((unit,i)=>applyFormationSlot(unit,heroSlots[i]||heroSlots[heroSlots.length-1],112));
  const barbaraIdx=ACTIVE.findIndex(idx=>KINGDOMS[idx]?.id==='terra');
  const barbaraSlot=heroSlots[barbaraIdx]||heroSlots[0]||{x:30,y:35,s:1,z:20};
  const golemOffsets=[{x:-8,y:4,s:.64},{x:8,y:2,s:.68},{x:-13,y:7,s:.58},{x:13,y:6,s:.6}];
  [...partyArenaEl.querySelectorAll('.golem-unit')].forEach((unit,i)=>{
    const offset=golemOffsets[i%golemOffsets.length];
    applyFormationSlot(unit,{x:Math.max(4,Math.min(96,barbaraSlot.x+offset.x)),y:barbaraSlot.y+offset.y,s:offset.s,z:barbaraSlot.z+2+i},72);
  });
  const sophIdx=ACTIVE.findIndex(idx=>KINGDOMS[idx]?.id==='vento');
  const sophSlot=heroSlots[sophIdx]||heroSlots[0]||{x:70,y:30,s:1,z:20};
  const harpyOffsets=[{x:-9,y:-6,s:.5},{x:9,y:-7,s:.52},{x:-14,y:2,s:.46},{x:14,y:1,s:.48},{x:0,y:-11,s:.44}];
  [...partyArenaEl.querySelectorAll('.harpy-unit')].forEach((unit,i)=>{
    const offset=harpyOffsets[i%harpyOffsets.length];
    applyFormationSlot(unit,{x:Math.max(4,Math.min(96,sophSlot.x+offset.x)),y:sophSlot.y+offset.y,s:offset.s,z:sophSlot.z+2+i},64);
  });
  const enemySlots=SCENE_ENEMY_FORMATIONS[stageIndex]?.[enemies.length]||ENEMY_FORMATIONS[Math.min(4,Math.max(1,enemies.length))]||ENEMY_FORMATIONS[1];
  [...enemyArenaEl.children].forEach((unit,i)=>{
    const enemy=enemies[i];
    const slot={...(enemySlots[i]||enemySlots[enemySlots.length-1])};
    const isBoss=enemy?.isBoss===true || i===enemies.length-1;
    if(isBoss&&!enemy?.isCard) slot.s*=1.16;
    applyFormationSlot(unit,slot,enemy?.isCard?112:(isBoss?122:108));
  });
}

function applyFormationSlot(unit,slot,width){
  if(!unit||!slot) return;
  unit.style.setProperty('--slot-x',slot.x+'%');
  unit.style.setProperty('--slot-y',slot.y+'%');
  unit.style.setProperty('--slot-scale',String(slot.s));
  unit.style.setProperty('--slot-z',String(slot.z));
  unit.style.setProperty('--slot-w',width+'px');
}

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
  setBattleStatus(`Alvo tático: ${enemies[next].name}.`);
}

function toggleAutoTarget(){
  autoTargetMode=!autoTargetMode;
  if(autoTargetMode) manualTarget=null;
  updateBattleToolLabels();
  refreshTargetHighlight();
  setBattleStatus(autoTargetMode?'Alvo automático: o inimigo mais enfraquecido será priorizado.':'Alvo automático desativado.');
}

function cycleBattleSpeed(){
  battleSpeedIndex=(battleSpeedIndex+1)%BATTLE_SPEEDS.length;
  document.documentElement.style.setProperty('--battle-speed',String(BATTLE_SPEEDS[battleSpeedIndex]));
  document.body.classList.add('speed-mode');
  updateBattleToolLabels();
  setBattleStatus(`Velocidade de batalha: ${BATTLE_SPEEDS[battleSpeedIndex]}×.`);
}

function findBestMove(){
  const dirs=[[0,1],[1,0]];
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) for(const [dr,dc] of dirs){
    const nr=r+dr,nc=c+dc;
    if(nr>=SIZE||nc>=SIZE) continue;
    const a={r,c},b={r:nr,c:nc};
    if(board[r][c]===-4||board[nr][nc]===-4) continue;
    const powerA=powerUps[cellKey(r,c)],powerB=powerUps[cellKey(nr,nc)];
    if(powerA||powerB) return [a,b];
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
      sombras:`com ${realm} bloco(s) das sombras, "Por Toda a Escuridão" multiplicaria o próximo ataque por ${Math.min(12,Math.max(1,realm))}`,
      raio:`"Hecatombe" renderia ${realm*150} de dano em todos agora (${realm} peça(s) roxa(s))`,
      areia:`"Dança das Mil Lâminas" renderia ${realm*70} por inimigo (${realm} peça(s) amarela(s))`,
      gelo:`"Geada Branca" renderia ${100+realm*20} em todos e congelaria (${realm} peça(s) de gelo)`,
      natureza:`"Unidade da Natureza" somaria ${realm*100} de dano (${realm} joia(s) verde(s))`,
      fogo:`o Ritual dobraria as ${realm} pedra(s) vermelha(s) atuais`,
      vento:harpyAllies<5?`invocar harpias ecoaria +${20*(harpyAllies+2)}% de dano`:`as 5 harpias já ecoam o dano dela`,
      terra:golemAllies>=2?`"Terra Viva" sacrificaria golens por 1000 de dano`:`invocar golens replicaria metade do dano dela`,
      chuvas:`as chuvas contínuas corroem os inimigos a cada turno`,
      luz:`a ultimate da Luz está pronta`,
      humanos:`a ultimate de Berenice está pronta`,
      agua:`a ultimate de Maril está pronta`
    };
    return `${k.nome} tem ultimate pronta — ${tips[k.id]||'toque no herói iluminado'}.`;
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
  setBattleStatus(advice||'Sugestão realçada: troque as duas joias pulsantes.');
  window.setTimeout(()=>document.querySelectorAll('.gem.hinted').forEach(el=>el.classList.remove('hinted')),2400);
}

function useRoyalShuffle(){
  if(busy) return;
  if(royalShuffles<=0){ setBattleStatus('O embaralhamento real já foi usado nesta fase.'); return; }
  royalShuffles--;
  shuffleBoard(false);
  updateBattleToolLabels();
  setBattleStatus('Embaralhamento real usado: o tabuleiro ganhou novas possibilidades.');
  haptic([24,22,42]);
}

function toggleTacticalGrid(){
  const active=arenaEl.classList.toggle('tactical-grid');
  document.getElementById('gridTool').classList.toggle('active',active);
  setBattleStatus(active?'Grade de profundidade ativada.':'Grade de profundidade ocultada.');
}

function cycleHeroFormation(){
  formationIndex=(formationIndex+1)%HERO_FORMATIONS.length;
  localStorage.setItem('12r_formation',String(formationIndex));
  applyBattleFormation();
  const f=HERO_FORMATIONS[formationIndex];
  const tool=document.getElementById('formationTool');
  if(tool) tool.textContent=`♟ ${f.nome}`;
  setBattleStatus(`Formação "${f.nome}" (${formationIndex+1}/${HERO_FORMATIONS.length}) aplicada.`,'system');
  sfxSelect();
}

async function toggleGameFullscreen(){
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(err){ setBattleStatus('A tela cheia não está disponível neste navegador.'); }
}

function showStageObjective(){
  const obj=currentObjective();
  if(obj?.type==='survive'){ stageObjectiveEl.textContent=`OBJETIVO · Sobreviva ${obj.turns} turnos (faltam ${Math.max(0,obj.turns-stageTurns)})`; return; }
  if(obj?.type==='collect'){ stageObjectiveEl.textContent=`OBJETIVO · Colete ${obj.count} esferas (faltam ${Math.max(0,obj.count-stageCollected)})`; return; }
  if(obj?.type==='moves'){ stageObjectiveEl.textContent=`OBJETIVO · Vença em até ${obj.limit} movimentos (restam ${Math.max(0,obj.limit-stageTurns)})`; return; }
  const alive=enemies.filter(e=>e.hp>0);
  stageObjectiveEl.textContent=`OBJETIVO · Derrote ${alive.length} ${alive.length===1?'inimigo':'inimigos'}`;
}

function updateComboRecord(value){
  bestCombo=Math.max(bestCombo,value||0);
  comboRecordEl.textContent=`RECORDE ×${bestCombo}`;
  comboRecordEl.classList.toggle('active',value===bestCombo&&value>1);
}

function updateBattleToolLabels(){
  document.getElementById('autoTargetTool').textContent=`◉ Auto: ${autoTargetMode?'sim':'não'}`;
  document.getElementById('autoTargetTool').classList.toggle('active',autoTargetMode);
  document.getElementById('speedTool').textContent=`» Velocidade ${BATTLE_SPEEDS[battleSpeedIndex]}×`;
  document.getElementById('shuffleTool').textContent=`⟳ Embaralhar (${royalShuffles})`;
  const formTool=document.getElementById('formationTool');
  if(formTool) formTool.textContent=`♟ ${HERO_FORMATIONS[formationIndex%HERO_FORMATIONS.length].nome}`;
  const moodTool=document.getElementById('musicMoodTool');
  if(moodTool) moodTool.textContent=`♫ Música: ${['Auto','Calma','Épica'][musicMoodMode]}`;
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

function selectTarget(idx){
  if(busy || playerHP<=0) return;
  if(!enemies[idx] || enemies[idx].hp<=0) return;
  if(enemies.length<=1) return;
  autoTargetMode = false;
  manualTarget = idx;
  updateBattleToolLabels();
  refreshTargetHighlight();
  setBattleStatus(`Alvo selecionado: ${enemies[idx].name}.`);
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

function renderEnemies(){
  enemyArenaEl.innerHTML = '';
  enemyArenaEl.style.setProperty('--enemy-count',String(Math.max(1,enemies.length)));
  const activeIdx = currentTargetIndex();
  const selectable = enemies.filter(e=>e.hp>0).length>1;
  enemies.forEach((e, idx)=>{
    const unit = document.createElement('div');
    const isBoss=e.isBoss===true || idx===enemies.length-1;
    unit.className = 'unit' + (e.hp<=0 ? ' dead' : (idx===activeIdx ? ' target' : '')) + (selectable && e.hp>0 ? ' selectable' : '') + (isBoss?' boss-unit':'') + (e.isCard?' enemy-card-unit':'');
    unit.id = 'enemy-'+idx;
    const palette=enemyAuraPalette(e);
    unit.style.setProperty('--aura-inner',palette[0]);
    unit.style.setProperty('--aura-inner-light',palette[1]);
    unit.style.setProperty('--aura-outer',palette[2]);
    unit.style.setProperty('--aura-outer-light',palette[3]);
    unit.innerHTML = `
      <div class="unit-stage">
        <div class="target-arrow"></div>
        <div class="unit-ground-shadow"></div>
        <div class="avatar-circle" id="enemyPortrait-${idx}">
          <img class="enemy-sprite-image" src="${e.sprite}" alt="${e.name}"${e.tint?` style="filter:${e.tint}"`:''}>
          <span class="enemy-intent" aria-label="Próximo ataque: aproximadamente ${e.atk} de dano">⚔ ${e.atk}</span>
        </div>
      </div>
      <div class="unit-name">${e.name}</div>
      <div class="unit-hp-outer"><div class="unit-hp-inner" id="enemyHpBar-${idx}" style="width:${Math.max(0,e.hp/e.maxHp*100)}%"></div></div>
      <div class="unit-hp-text" id="enemyHpText-${idx}">${Math.max(0,e.hp)} / ${e.maxHp}</div>
    `;
    if(e.hp>0){ unit.addEventListener('click', ()=>selectTarget(idx)); }
    if(e.hp>0){
      unit.setAttribute('role','button');
      unit.setAttribute('tabindex','0');
      unit.setAttribute('aria-label',`Selecionar ${e.name} como alvo`);
      unit.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); selectTarget(idx); } });
    }
    enemyArenaEl.appendChild(unit);
  });
  applyBattleFormation();
}

function loadStage(idx){
  combatEpoch++;
  stageTransitioning = false;
  roomClearScheduled = false;
  selected = null;
  stageIndex = idx;
  const stageData = worldRun.active ? buildWorldLevel() : towerMode ? buildTowerStage(towerFloor) : DUNGEON[idx];
  activeStageData = stageData;
  const diffM=DIFFICULTY_MULTS[difficulty]||DIFFICULTY_MULTS.normal;
  enemies = stageData.enemies.map(e=>{
    const hp=Math.round(e.hp*diffM.hp), atk=Math.round(e.atk*diffM.atk);
    return {...e, hp, atk, maxHp:hp};
  });
  playerShield = 0; enemyDots = []; enemyStunTurns = 0; atkBuffTurns = 0; atkBuffMult = 1;
  enemyBlindTurns = 0; shieldTurns = 0; reflectTurns = 0; invulnerableTurns = 0;
  lifestealCharges = 0; lifestealMult = 0; lastDragonRitual = {before:0,after:0,converted:0};
  incinerateActive = false; incinerateStacks = 0;
  enemyVulnerableTurns = 0; enemyVulnerableMult = 1;
  stoneArmorTurns = 0;
  manualTarget = null; lastDamageDealt = 0; heroLastDamage = {}; nextAttackMult = {};
  royalShuffles = 1;
  ACTIVE.forEach(idx2=>updateHeroProgressUI(idx2));
  renderStageProgress();
  renderEnemies();
  renderGolemUnits();
  renderHarpyUnits();
  showStageObjective();
  updateBattleToolLabels();
  renderStatusTray();
  stageTurns=0; stageCollected=0;
  createBoard();
  placeObstacles(stageData.obstacles);
  renderBoard();
  consumeInventoryOnBattleStart();
  if(stageIndex===0&&!towerMode) startCoach();
  maybeShowStory(idx);
  playStageMusic(stageData.scene);
  setBattleStatus(`${worldRun.active?stageData.title.split(' · ')[1]||stageData.title:towerMode?stageData.title:`Fase ${idx+1}`}: combine esferas para enfrentar ${stageData.enemies.map(e=>e.name).join(' e ')}.`);
  const qaMode=new URLSearchParams(location.search).get('qa');
  if(qaMode==='luciusritual'&&!qaRitualTriggered){
    qaRitualTriggered=true;
    const fireIdx=ACTIVE.find(i=>KINGDOMS[i].id==='fogo');
    const ritual=KINGDOMS[fireIdx]?.abilities.find(a=>a.tipo==='doubleRedOnce');
    if(ritual) window.setTimeout(()=>triggerAbility(fireIdx,ritual),80);
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
  if(pendingRoomPassives.length){
    window.setTimeout(()=>launchPendingRoomPassives(),260);
  }
  saveProgress();
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
    meta.hits--;
    const [r,c]=key.split('_').map(Number);
    const gemEl=boardEl.querySelector(`.gem[data-r="${r}"][data-c="${c}"]`);
    if(meta.hits<=0){
      delete obstaclesMeta[key];
      board[r][c]=-1;
      if(gemEl) gemEl.classList.add('matched');
      spawnRealmParticles(meta.type==='ice'?'gelo':'terra',gemEl||boardEl,7);
      broke=true;
    } else if(gemEl){
      const block=gemEl.querySelector('.obstacle-block');
      if(block){ block.classList.remove('ob-strong'); block.classList.add('ob-cracked'); }
    }
  });
  if(broke){ sfxHit(); setBattleStatus('Bloco destruído! O caminho está mais livre.','support'); }
}

/* v9.1 · Objetivos variados por fase */
function currentObjective(){ return activeStageData?.objective||null; }
function checkStageObjective(){
  const obj=currentObjective();
  if(!obj) return false;
  if(obj.type==='survive'&&stageTurns>=obj.turns&&playerHP>0){
    setBattleStatus('Objetivo cumprido: o grupo sobreviveu à investida!','support');
    onStageCleared();
    return true;
  }
  if(obj.type==='collect'&&stageCollected>=obj.count){
    setBattleStatus('Objetivo cumprido: esferas suficientes coletadas!','support');
    onStageCleared();
    return true;
  }
  if(obj.type==='moves'&&stageTurns>obj.limit&&!allEnemiesDefeated()){
    busy=true; combatEpoch++;
    sfxDefeat();
    renderBattleReport('defeatReport');
    setTimeout(()=>showOverlay('defeatOverlay'),400);
    return true;
  }
  return false;
}

/* v9.1 · Idioma da interface (PT/EN/ES). Conteúdo dos heróis permanece PT nesta versão. */
const VALID_LANGS=['pt','en','es'];
let lang=VALID_LANGS.includes(localStorage.getItem('12r_lang'))?localStorage.getItem('12r_lang'):'pt';
function T(pt,en,es){ return lang==='en'?en:lang==='es'?(es||en):pt; }
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
  ['#autoTeamBtn','Equipe sugerida','Suggested team','Equipo sugerido']
];
function applyLanguage(){
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
    towerLabel.innerHTML=T('Torre Infinita ','Infinite Tower ','Torre Infinita ')+hint;
  }
  const sub=document.querySelector('.select-sub');
  if(sub) sub.textContent=T(
    'Escolha 4 entre 12 personagens oficiais. Toque na carta para escalar e use apenas a lupa para abrir a arte e ler todas as habilidades.',
    'Pick 4 of 12 official heroes. Tap a card to enlist; use the magnifier to open the art and read every ability.',
    'Elige 4 de 12 héroes oficiales. Toca la carta para alistar; usa la lupa para abrir el arte y leer todas las habilidades.');
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
function maybeShowStory(idx){
  if(towerMode) return;
  if(coachStep>=0&&coachStep<COACH_STEPS_I18N.pt.length) return;
  const seq=worldRun.active?(activeStageData?.dial||null):STAGE_DIALOGS[idx];
  if(!seq||!seq.length) return;
  storyQueue=[...seq];
  renderStoryStep();
}
function renderStoryStep(){
  const layer=document.getElementById('storyLayer');
  if(!layer) return;
  if(!storyQueue.length){ layer.classList.remove('show'); return; }
  const step=storyQueue[0];
  const k=KINGDOMS.find(kk=>kk.id===step.h);
  document.getElementById('storyPortrait').src=k?(k.sprite||k.cardThumb||k.img):'assets/icon.svg';
  document.getElementById('storyName').textContent=k?k.nome:'Narrador';
  document.getElementById('storyText').textContent=step.t;
  layer.classList.add('show');
}
function advanceStory(){
  storyQueue.shift();
  if(storyQueue.length) renderStoryStep();
  else document.getElementById('storyLayer')?.classList.remove('show');
  sfxSelect();
}
function skipStory(){ storyQueue=[]; document.getElementById('storyLayer')?.classList.remove('show'); }

/* v9.1 · Perfil: estatísticas de vida do jogador */
let profile={wins:0,losses:0,damage:0,maxCombo:0,powerUps:0,heroUse:{}};
try{ profile={...profile,...JSON.parse(localStorage.getItem('12r_profile')||'{}')}; }catch(e){}
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
  const favName=fav?(KINGDOMS.find(k=>k.id===fav[0])?.nome||fav[0]):'—';
  const towerBest=Number(localStorage.getItem('12r_tower_best')||0);
  const achCount=Object.keys(unlockedAch).length;
  const nextXp=profileXpForNext();
  const rows=[
    [T('Nível do Perfil','Profile Level','Nivel del Perfil'),`Lv ${profileLevel()}${nextXp?` · ${profileXp}/${nextXp} XP`:''}`],
    [T('Vitórias','Wins'),profile.wins],[T('Derrotas','Losses'),profile.losses],
    [T('Dano total','Total damage'),profile.damage.toLocaleString('pt-BR')],
    [T('Maior combo','Best combo'),'×'+profile.maxCombo],
    [T('Power-ups criados','Power-ups crafted'),profile.powerUps],
    [T('Herói favorito','Favorite hero'),favName],
    [T('Melhor andar da Torre','Best tower floor'),towerBest||'—'],
    [T('Moedas','Coins'),'🪙 '+coins],
    [T('Conquistas','Achievements'),`${achCount}/${ACHIEVEMENTS.length}`]
  ];
  el.innerHTML=rows.map(([l,v])=>`<div class="pstat"><small>${l}</small><b>${v}</b></div>`).join('');
}

/* v9.1 · Resultado diário compartilhável + export/import de progresso */
function buildDailyShareText(){
  const fav=Object.entries(runStats.damage).sort((a,b)=>b[1]-a[1])[0];
  const mvp=fav?(KINGDOMS[fav[0]]?.nome||'—'):'—';
  const d=new Date();
  const diffLabel={facil:'Fácil',normal:'Normal',pesadelo:'Pesadelo'}[difficulty]||'Normal';
  return `⚔ 12 Reinos — Desafio Diário ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}\n`+
    `★${runStats.starsEarned||0} estrelas · Combo ×${runStats.maxCombo} · MVP: ${mvp} · ${diffLabel}\n`+
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
  const data={};
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&key.startsWith('12r_')) data[key]=localStorage.getItem(key);
  }
  const code=btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  const ta=document.getElementById('saveCode');
  if(ta){ ta.value=code; ta.select(); }
  copyTextToClipboard(code);
  return code;
}
function importSave(){
  const ta=document.getElementById('saveCode');
  const code=(ta?.value||'').trim();
  if(!code) return false;
  try{
    const data=JSON.parse(decodeURIComponent(escape(atob(code))));
    if(typeof data!=='object'||!data) throw new Error('inválido');
    Object.entries(data).forEach(([k,v])=>{ if(k.startsWith('12r_')&&typeof v==='string') localStorage.setItem(k,v); });
    location.reload();
    return true;
  }catch(e){
    if(ta) ta.value=T('Código inválido — cole o código exportado completo.','Invalid code — paste the full exported code.');
    return false;
  }
}

/* v9.1 · Tutorial guiado (primeira batalha) */
const COACH_STEPS_I18N={
  pt:[
    {text:'Bem-vindo aos 12 Reinos! Arraste uma esfera para trocar com a vizinha e formar uma linha de 3 do mesmo reino.', auto:'match'},
    {text:'Cada combinação enche a aura dos heróis. Aos 25%, 50% e 75% eles disparam passivas automáticas!'},
    {text:'Combine 4 ou mais esferas para criar power-ups: listrados varrem linhas, embrulhados explodem em área.'},
    {text:'Aura 100%: o herói brilha — toque nele para lançar a ULTIMATE. Boa sorte, guardião!'}
  ],
  en:[
    {text:'Welcome to the 12 Realms! Drag a sphere to swap with its neighbor and line up 3 of the same realm.', auto:'match'},
    {text:'Every match charges your heroes\' aura. At 25%, 50% and 75% they unleash automatic passives!'},
    {text:'Match 4+ spheres to craft power-ups: striped ones sweep lines, wrapped ones explode in an area.'},
    {text:'Aura at 100%: the hero glows — tap them to cast the ULTIMATE. Good luck, guardian!'}
  ],
  es:[
    {text:'¡Bienvenido a los 12 Reinos! Arrastra una esfera para intercambiarla y alinear 3 del mismo reino.', auto:'match'},
    {text:'Cada combinación carga el aura de tus héroes. ¡Al 25%, 50% y 75% lanzan pasivas automáticas!'},
    {text:'Combina 4+ esferas para crear potenciadores: los rayados barren líneas, los envueltos explotan en área.'},
    {text:'Aura al 100%: el héroe brilla — tócalo para lanzar la ULTIMATE. ¡Buena suerte, guardián!'}
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
  if(btn) btn.textContent=coachStep>=steps.length-1?T('Vamos lá!','Let\'s go!'):T('Entendi','Got it');
}
function startCoach(){
  if(localStorage.getItem('12r_tutorial')||towerMode||IS_DAILY_RUN) return;
  coachStep=0;
  renderCoach();
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

function renderBoard(){
  boardEl.innerHTML = '';
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      const cell = document.createElement('div');
      cell.className='cell'; cell.dataset.r=r; cell.dataset.c=c;
      const colorIdx = board[r][c];
      const wrapper = document.createElement('div');
      wrapper.className = 'gem';
      wrapper.dataset.r=r; wrapper.dataset.c=c;
      const power = powerUps[cellKey(r,c)];
      if(colorIdx===-2 && power?.type==='colorBomb'){
        wrapper.dataset.power='colorBomb';
        wrapper.setAttribute('role','button');
        wrapper.setAttribute('tabindex','0');
        wrapper.setAttribute('aria-label',`Bomba de cor, linha ${r+1}, coluna ${c+1}`);
        wrapper.innerHTML='<div class="orb power-colorbomb" aria-hidden="true"></div>';
      } else if(colorIdx>=0){
        const k = KINGDOMS[colorIdx];
        wrapper.dataset.realm = k.id;
        if(power) wrapper.dataset.power=power.type;
        wrapper.setAttribute('role','button');
        wrapper.setAttribute('tabindex','0');
        const powerLabel=power?.type==='striped' ? `, power-up listrado ${power.orientation==='horizontal'?'horizontal':'vertical'}` : power?.type==='wrapped' ? ', power-up embrulhado' : '';
        wrapper.setAttribute('aria-label',`Esfera do ${k.reino}${powerLabel}, linha ${r+1}, coluna ${c+1}`);
        const powerClass=power?.type==='striped' ? ` power-striped ${power.orientation}` : power?.type==='wrapped' ? ' power-wrapped' : '';
        wrapper.innerHTML = `<div class="orb orb-${k.id}${powerClass}" data-realm="${k.id}" style="--orb-light:${k.orbColorLight||k.colorLight};--orb:${k.orbColor||k.color};--orb-dark:${k.orbColorDark||k.colorDark};">
          <svg class="orb-icon" viewBox="0 0 24 24">${KINGDOM_ICON[k.id]||''}</svg>
        </div>`;
      }
      if(colorIdx===-4){
        const meta=obstaclesMeta[cellKey(r,c)]||{type:'ice',hits:1};
        wrapper.dataset.obstacle=meta.type;
        wrapper.innerHTML=`<div class="orb obstacle-block ob-${meta.type}${meta.hits>1?' ob-strong':''}" aria-hidden="true"><span class="ob-icon">${meta.type==='ice'?'❄':'⛰'}</span></div>`;
        wrapper.setAttribute('aria-label',`Bloco de ${meta.type==='ice'?'gelo':'pedra'}, linha ${r+1}, coluna ${c+1}`);
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
      boardEl.appendChild(cell);
    }
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
    setBattleStatus('Esfera selecionada. Escolha uma vizinha para trocar.');
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
  if(board[from.r]?.[from.c]===-4||board[to.r]?.[to.c]===-4){
    renderBoard(); sfxInvalid(); haptic([18,30,18]);
    setBattleStatus('Blocos de gelo e pedra não podem ser movidos: quebre-os com combinações vizinhas.');
    return;
  }
  const powerFrom=powerUps[cellKey(from.r,from.c)]||null;
  const powerTo=powerUps[cellKey(to.r,to.c)]||null;
  swapCells(from,to);
  const powerCombo=buildPowerComboResolution(from,to,powerFrom,powerTo);
  const matches = findMatches();
  if(matches.length===0 && !powerCombo){
    swapCells(from,to); renderBoard(); sfxInvalid(); haptic([18,30,18]);
    setBattleStatus('Troca inválida: forme uma linha com pelo menos três esferas.');
  } else {
    busy=true; comboStep=0; lastSwap={from:{...from},to:{...to}}; forcedResolution=powerCombo; renderBoard(); haptic(powerCombo?[28,18,45]:16);
    setBattleStatus(powerCombo ? powerCombo.label : `${matches.length} esferas conectadas. Ataque em preparação!`);
    setTimeout(()=>resolveMatches(),120);
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
      return {label:'Dupla Bomba de Cor: todo o tabuleiro foi purificado!',cells:Array.from({length:SIZE*SIZE},(_,i)=>({r:Math.floor(i/SIZE),c:i%SIZE}))};
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
      return {label:'Bomba de Cor + Listrado: uma tempestade de linhas atravessa o tabuleiro!',cells:uniqueCells(cells)};
    }
    if(otherPower?.type==='wrapped'){
      targets.forEach(cell=>addRadiusCells(cells,cell.r,cell.c,1));
      return {label:'Bomba de Cor + Embrulhado: todas as joias da cor explodem em área!',cells:uniqueCells(cells)};
    }
    return {label:'Bomba de Cor: todas as joias da cor escolhida foram removidas!',cells:uniqueCells(cells)};
  }
  if(!powerFrom||!powerTo) return null;
  const center=to;
  const cells=[from,to];
  if(powerFrom.type==='striped'&&powerTo.type==='striped'){
    addRowCells(cells,center.r); addColumnCells(cells,center.c);
    return {label:'Dois Listrados: linha e coluna destruídas!',cells:uniqueCells(cells)};
  }
  if(powerFrom.type==='wrapped'&&powerTo.type==='wrapped'){
    addRadiusCells(cells,center.r,center.c,2);
    return {label:'Dois Embrulhados: uma explosão 5×5 abalou o tabuleiro!',cells:uniqueCells(cells)};
  }
  if((powerFrom.type==='striped'&&powerTo.type==='wrapped')||(powerFrom.type==='wrapped'&&powerTo.type==='striped')){
    for(let offset=-1;offset<=1;offset++){
      if(center.r+offset>=0&&center.r+offset<SIZE) addRowCells(cells,center.r+offset);
      if(center.c+offset>=0&&center.c+offset<SIZE) addColumnCells(cells,center.c+offset);
    }
    return {label:'Listrado + Embrulhado: três linhas e três colunas foram varridas!',cells:uniqueCells(cells)};
  }
  return null;
}

function hasValidMoves(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      for(const [dr,dc] of [[0,1],[1,0]]){
        const nr=r+dr,nc=c+dc;
        if(nr>=SIZE||nc>=SIZE) continue;
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
      if(announce) setBattleStatus('O tabuleiro ficou sem jogadas e foi embaralhado automaticamente.');
      return true;
    }
  }
  spots.forEach(({r,c},i)=>{ board[r][c]=ACTIVE[i%ACTIVE.length]; });
  renderBoard();
  if(announce) setBattleStatus('As joias foram reorganizadas para criar novas combinações.');
  return false;
}

function allEnemiesDefeated(){
  return enemies.length>0 && enemies.every(enemy=>enemy.hp<=0);
}

function queuePassivesForNextRoom(idx,abilities){
  abilities.filter(a=>a&&a.kind==='passive').forEach(a=>pendingRoomPassives.push({idx,a}));
}

function finishRoomIfCleared(reason='Todos os inimigos foram derrotados.'){
  if(!allEnemiesDefeated() || roomClearScheduled || stageTransitioning) return false;
  roomClearScheduled=true;
  busy=true;
  comboStep=0;
  selected=null;
  forcedResolution=null;
  setBattleStatus(reason,'system');
  window.setTimeout(()=>onStageCleared(),260);
  return true;
}

async function launchPendingRoomPassives(){
  if(!pendingRoomPassives.length || stageTransitioning) return;
  const epoch=combatEpoch;
  const queued=pendingRoomPassives.splice(0);
  busy=true;
  setBattleStatus('A energia preservada da sala anterior desperta no início do combate.','support');
  for(let i=0;i<queued.length;i++){
    if(epoch!==combatEpoch) return;
    const item=queued[i];
    triggerAbility(item.idx,item.a,{deferRoomCheck:true});
    await wait(900);
    if(allEnemiesDefeated()){
      queued.slice(i+1).forEach(rest=>pendingRoomPassives.push(rest));
      finishRoomIfCleared('As passivas preservadas eliminaram todos os inimigos desta sala.');
      return;
    }
  }
  if(epoch===combatEpoch) busy=false;
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
    busy=false; afterPlayerTurn(); return;
  }
  const targetColor=matches.map(cell=>board[cell.r][cell.c]).find(color=>color>=0)??ACTIVE[0];
  const createdPlans=forced?[]:planCreatedPowerUps(groups);
  matches=expandPowerEffects(matches,targetColor);
  playPowerActivationFx();
  const createdByKey=new Map(createdPlans.map(plan=>[cellKey(plan.r,plan.c),plan]));
  lastSwap=null;
  comboStep++; showCombo(comboStep); updateComboRecord(comboStep); sfxMatch(comboStep);
  runStats.maxCombo=Math.max(runStats.maxCombo,comboStep);
  if(createdPlans.length){ runStats.powerUps+=createdPlans.length; sfxPowerCreated(); }
  if(createdPlans.length){
    const names=createdPlans.map(plan=>plan.power.type==='colorBomb'?'Bomba de Cor':plan.power.type==='wrapped'?'Embrulhado':'Listrado');
    setBattleStatus(`Power-up criado: ${names.join(' + ')}! Continue combinando para ativá-lo.`);
  } else {
    setBattleStatus(forced?.label||(comboStep>1 ? `Combo x${comboStep}! O dano foi ampliado.` : 'Energia dos Reinos canalizada para o grupo.'));
  }

  const colorCounts = {};
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
      delete obstaclesMeta[key];
    }
  });
  hitAdjacentObstacles(matches);
  stageCollected+=Object.values(colorCounts).reduce((a,b)=>a+b,0);
  coachAdvanceOnMatch();

  await wait(420);
  if(epoch!==combatEpoch) return;

  const multiplier = 1 + 0.25*(comboStep-1);
  const buffMult = atkBuffTurns>0 ? (1+atkBuffMult) : 1;

  for(const colorIdxStr of Object.keys(colorCounts)){
    const colorIdx = parseInt(colorIdxStr);
    const count = colorCounts[colorIdxStr];
    const heroAtk = heroAtkFor(colorIdx);
    const queuedMult = nextAttackMult[colorIdx] || 1;
    const emp=heroEmpower[colorIdx];
    const empMult=(emp&&emp.left>0)?emp.mult:1;
    if(emp&&emp.left>0){ emp.left--; if(emp.left<=0) delete heroEmpower[colorIdx]; }
    const dmg = Math.round(heroAtk * count * multiplier * buffMult * queuedMult * empMult);
    nextAttackMult[colorIdx] = 1;
    await flyEnergyToHero(colorIdx);
    triggerHeroAttackAnim(colorIdx);
    applyDamageToEnemy(dmg, colorIdx);
    if(KINGDOMS[colorIdx].id==='terra'&&golemAllies>0&&allEnemiesDefeated()===false){
      const golemDamage=Math.round(dmg*.5*golemAllies);
      applyDamageToEnemy(golemDamage,colorIdx);
      setBattleStatus(`${golemAllies} golens replicaram ${golemDamage} de dano para Kallendra.`,'damage');
    }
    if(KINGDOMS[colorIdx].id==='vento'&&harpyAllies>0&&allEnemiesDefeated()===false){
      const harpyDamage=Math.round(dmg*.2*harpyAllies);
      if(harpyDamage>0){
        applyDamageToEnemy(harpyDamage,colorIdx);
        setBattleStatus(`${harpyAllies} harpia(s) replicaram ${harpyDamage} de dano para Sophitia.`,'damage');
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
      finishRoomIfCleared('A última combinação derrotou todos os inimigos. O combo foi encerrado.');
      return;
    }
    for(let abilityIndex=0;abilityIndex<toFire.length;abilityIndex++){
      const a=toFire[abilityIndex];
      triggerAbility(colorIdx, a,{deferRoomCheck:true});
      await wait(2000);
      if(epoch!==combatEpoch) return;
      if(allEnemiesDefeated()){
        queuePassivesForNextRoom(colorIdx,toFire.slice(abilityIndex+1));
        finishRoomIfCleared('Uma habilidade passiva concluiu a sala. O tabuleiro foi pausado.');
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
  collapseAndRefill();
  renderBoard();
  await wait(380);
  if(epoch===combatEpoch) resolveMatches();
}

function flyEnergyToHero(colorIdx){
  return new Promise(resolve=>{
    const k = KINGDOMS[colorIdx];
    const heroAvatar = document.getElementById('party-'+k.id+'-avatar');
    if(!heroAvatar || !boardEl.isConnected){ resolve(); return; }
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
      const dx = (heroRect.left+heroRect.width/2) - startX;
      const dy = (heroRect.top+heroRect.height/2) - startY;
      orb.style.transform = `translate(${dx}px, ${dy}px) scale(0.4)`;
      orb.style.opacity = '0.15';
    });
    setTimeout(()=>{ orb.remove(); resolve(); }, 380);
  });
}

function triggerHeroAttackAnim(colorIdx){
  const k = KINGDOMS[colorIdx];
  const unit = document.getElementById('party-'+k.id);
  if(unit){ unit.classList.remove('attacking'); void unit.offsetWidth; unit.classList.add('attacking'); }
  playHeroAction(colorIdx,'attack');
}

function triggerHeroCastAnim(colorIdx){
  const k = KINGDOMS[colorIdx];
  const unit = document.getElementById('party-'+k.id);
  if(unit){ unit.classList.remove('casting'); void unit.offsetWidth; unit.classList.add('casting');
    window.setTimeout(()=>unit.classList.remove('casting'),950); }
  playHeroAction(colorIdx,'cast');
}

/* v9 · Coreografias de especial por reino: cada builder monta a cena do cast.
   O container recebe --sx/--sy (origem), --tx/--ty (alvo) e --ddx/--ddy (delta). */
const SPECIAL_CAST_BUILDERS={
  fogo(el){ el.innerHTML='<div class="sc-fireball" style="--d:0ms"></div><div class="sc-fireball" style="--d:130ms"></div><div class="sc-fireball" style="--d:260ms"></div><div class="sc-fire-burst"></div>'; },
  agua(el){ el.innerHTML='<div class="sc-wave"></div><div class="sc-geyser"></div>'; },
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

function launchSpecialFx(idx,a){
  if(!particlesEnabled) return;
  const k = KINGDOMS[idx];
  const layer = document.getElementById('specialFxLayer');
  const source = document.getElementById('party-'+k.id+'-avatar');
  const defensive = ['cura','escudo','escudoAtordoa','escudoCura','buff','curaBuff','healPercent','shieldTurns','reflectTurns','invulnerableTurns','lifestealCharges','activateAllUltimates','stoneArmor'].includes(a.tipo);
  const boardEffect = ['doubleRedOnce','spawnPowerUps'].includes(a.tipo);
  if(a.tipo==='summonGolems'){
    if(source){
      source.classList.remove('golem-summon-cast'); void source.offsetWidth; source.classList.add('golem-summon-cast');
      window.setTimeout(()=>source.classList.remove('golem-summon-cast'),900);
      spawnCombatFx('telegraph',source,k.colorLight,900);
    }
    return;
  }
  const targetIdx = currentTargetIndex();
  const target = boardEffect ? boardEl : (defensive ? document.getElementById('playerHpAnchor') : document.getElementById('enemy-'+targetIdx));
  if(!layer||!source||!target) return;
  spawnCombatFx('telegraph',target,k.colorLight,500);
  if(reducedMotion){
    target.classList.remove('fx-target-flash'); void target.offsetWidth; target.classList.add('fx-target-flash');
    window.setTimeout(()=>target.classList.remove('fx-target-flash'),360);
    return;
  }
  const lr=layer.getBoundingClientRect(),sr=source.getBoundingClientRect(),tr=target.getBoundingClientRect();
  const sx=sr.left-lr.left+sr.width/2-16, sy=sr.top-lr.top+sr.height/2-16;
  const tx=tr.left-lr.left+tr.width/2-16, ty=tr.top-lr.top+tr.height/2-16;
  const ring=document.createElement('div');
  ring.className='impact-ring fx-'+k.id;
  ring.dataset.fx='impact';
  ring.style.color=k.colorLight; ring.style.setProperty('--tx',tx+'px'); ring.style.setProperty('--ty',ty+'px');
  const builder=SPECIAL_CAST_BUILDERS[k.id];
  let castEl;
  if(builder){
    castEl=document.createElement('div');
    castEl.className='special-cast sc-'+k.id+(a.kind==='active'?' ultimate':'');
    castEl.dataset.fx='cast';
    castEl.style.setProperty('--sx',sx+'px'); castEl.style.setProperty('--sy',sy+'px');
    castEl.style.setProperty('--tx',tx+'px'); castEl.style.setProperty('--ty',ty+'px');
    castEl.style.setProperty('--ddx',(tx-sx)+'px'); castEl.style.setProperty('--ddy',(ty-sy)+'px');
    builder(castEl);
    layer.append(castEl,ring);
  }else{
    castEl=document.createElement('div');
    castEl.className=`special-projectile fx-${k.id}${a.kind==='active'?' ultimate':''}`;
    castEl.dataset.fx='projectile';
    castEl.style.setProperty('--sx',sx+'px'); castEl.style.setProperty('--sy',sy+'px');
    castEl.style.setProperty('--tx',tx+'px'); castEl.style.setProperty('--ty',ty+'px');
    layer.append(castEl,ring);
  }
  trimCombatFx();
  arenaEl.classList.remove('fx-flash'); void arenaEl.offsetWidth; arenaEl.classList.add('fx-flash');
  window.setTimeout(()=>{
    spawnCombatFx('hit',target,k.colorLight,520);
    spawnRealmParticles(k.id,target,a.kind==='active'?22:12);
    ring.remove();
  },560);
  window.setTimeout(()=>{ castEl.remove(); ring.remove(); },1600);
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
  for(let cycle=0;cycle<=cycles;cycle++){
    k.abilities.forEach(a=>{
      const threshold=a.gems+(cycle*100);
      if(threshold>prev&&threshold<=rawTotal){
        if(a.kind==='active'){
          heroActiveQueue[idx].push(a);
          becameReady=true;
        }else{
          toFire.push(a);
        }
      }
    });
  }
  if(heroActiveQueue[idx].length){
    heroReady[idx]=true;
  }else{
    heroReady[idx]=false;
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
  });
}

function grantTeamEnergy(amount){
  ACTIVE.forEach(heroIdx=>{
    const result=registerHeroProgress(heroIdx,amount);
    if(allEnemiesDefeated()) queuePassivesForNextRoom(heroIdx,result.toFire);
    else result.toFire.forEach(passive=>triggerAbility(heroIdx,passive,{deferRoomCheck:true}));
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
  window.setTimeout(()=>boardEl.querySelectorAll('.ritual-converted').forEach(cell=>cell.classList.remove('ritual-converted')),1050);
  const isFire=KINGDOMS[heroIdx].id==='fogo';
  const label=isFire
    ? 'Ritual do Dragão: '+realmCells.length+' pedras vermelhas tornaram-se '+lastDragonRitual.after
    : KINGDOMS[heroIdx].nome+': '+realmCells.length+' blocos do reino tornaram-se '+lastDragonRitual.after;
  setBattleStatus(label+'. O efeito foi aplicado uma única vez.','support');
  return lastDragonRitual;
}

function doubleRedGemsOnce(){
  const fireIdx=ACTIVE.find(idx=>KINGDOMS[idx].id==='fogo');
  return doubleRealmGemsOnce(fireIdx);
}

function triggerAbility(idx, a, options={}){
  const k = KINGDOMS[idx];
  const isPassive=a.kind==='passive';
  showAbilityBanner(k, a, isPassive);
  if(isPassive) triggerHeroAttackAnim(idx); else triggerHeroCastAnim(idx);
  launchSpecialFx(idx,a);
  if(isPassive){ sfxPassive(); }
  else{ sfxUltimate(); sfxElemental(k.id); showUltimateCutin(k,a); }
  sfxHeroSignature(k.id,!isPassive);
  setBattleStatus(`${k.nome.split(',')[0]} lançou ${a.name}.`);
  haptic(isPassive ? 22 : [35,20,70]);
  switch(a.tipo){
    case 'dano': applyDamageToEnemy(a.valor, idx); break;
    case 'dot': addDot(a.valor, a.turnos); break;
    case 'danoDot': applyDamageToEnemy(a.valor, idx); addDot(a.dot, a.turnos, undefined, a.name||'Dano contínuo'); break;
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
    case 'critBase': applyDamageToEnemy(Math.round(heroAtkFor(idx)*(a.mult||5)),idx); break;
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
      setBattleStatus(`${k.nome} fez nascer ${a.quantidade||3} power-ups no tabuleiro.`,'support');
      break;
    case 'healPerRealmGem': {
      const realmGems=countRealmGems(idx);
      healPlayer(realmGems*(a.valor||100));
      setBattleStatus(`${realmGems} joias do reino recuperaram ${realmGems*(a.valor||100)} de HP.`,'support');
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
      setBattleStatus(`Bola de Neve: o inimigo foi atordoado por ${turnosGelo} turno(s).`,'support');
      break;
    }
    case 'freezeBlast': {
      const gemasGelo=countRealmGems(idx);
      applyDamageToAllEnemies((a.valor||100)+gemasGelo*(a.porGema||20), idx);
      addStun(a.turnos||1);
      setBattleStatus(`Geada Branca: ${gemasGelo} peça(s) do reino ampliaram o dano e congelaram os inimigos.`,'combat');
      break;
    }
    case 'freezeExecute': {
      const alvoGelo=currentTargetIndex();
      addStun(a.turnos||5);
      if(alvoGelo>=0&&enemies[alvoGelo]&&enemies[alvoGelo].hp>0) applyDamageToEnemy(Math.max(1,Math.floor(enemies[alvoGelo].hp/2)),idx,alvoGelo);
      break;
    }
    case 'dotAll':
      enemies.forEach((e,i)=>{ if(e.hp>0) addDot(a.valor||30,a.turnos||999,i,a.name||'Chuva'); });
      setBattleStatus(`${k.nome} invocou uma chuva contínua sobre todos os inimigos.`,'support');
      break;
    case 'spawnColorBombs':
      spawnRandomColorBombs(a.quantidade||3);
      setBattleStatus(`${k.nome} inscreveu ${a.quantidade||3} Bombas de Cor no tabuleiro.`,'support');
      break;
    case 'summonHarpies': {
      const novasHarpias=Math.min(5-harpyAllies,a.quantidade||2);
      if(novasHarpias>0){
        harpyAllies+=novasHarpias;
        renderHarpyUnits(true);
        setBattleStatus(`${novasHarpias} Harpia(s) juntaram-se a ${k.nome}. Cada uma replica 20% do dano dela.`,'support');
      } else setBattleStatus('Sophitia já lidera o máximo de cinco harpias.','system');
      break;
    }
    case 'empowerAttacks':
      heroEmpower[idx]={left:a.cargas||3,mult:a.mult||2};
      setBattleStatus(`${k.nome} concentrou ${a.cargas||3} esferas de energia: os próximos ${a.cargas||3} ataques serão multiplicados por ${a.mult||2}.`,'support');
      break;
    case 'hecatombe': {
      const roxas=countRealmGems(idx);
      if(roxas>0) applyDamageToAllEnemies(roxas*(a.valor||150), idx);
      addStun(1);
      enemies.forEach((e,i)=>{ if(e.hp>0) addDot(50,2,i,'Eletrocutado'); });
      setBattleStatus(`Hecatombe: ${roxas} peça(s) roxa(s) canalizaram a fúria dos trovões.`,'combat');
      break;
    }
    case 'healFixed': healPlayer(a.valor||300); break;
    case 'vulnerableTurns':
      enemyVulnerableTurns=Math.max(enemyVulnerableTurns,a.turnos||1);
      enemyVulnerableMult=Math.max(enemyVulnerableMult,a.mult||2);
      setBattleStatus(`Os inimigos receberão ${enemyVulnerableMult}× de dano por ${enemyVulnerableTurns} turno(s).`,'support');
      break;
    case 'damageTargetPercent': {
      const alvo=currentTargetIndex();
      if(alvo>=0&&enemies[alvo]&&enemies[alvo].hp>0) applyDamageToEnemy(Math.max(1,Math.round(enemies[alvo].maxHp*(a.valor||.1))),idx,alvo);
      break;
    }
    case 'critBaseAll': applyDamageToAllEnemies(Math.round(heroAtkFor(idx)*(a.mult||3)),idx); break;
    case 'nextAttackPerRealmGem': {
      const realmGems=Math.min(12,Math.max(1,countRealmGems(idx)));
      nextAttackMult[idx]=realmGems;
      setBattleStatus(`O próximo ataque de ${k.nome} será multiplicado por ${realmGems} bloco(s) do reino (máx. 12).`,'support');
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
      setBattleStatus(`${realmGems} peça(s) do reino guiaram o ataque de ${k.nome}.`,'combat');
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
          setBattleStatus(`${k.nome} invocou ${added} golens ao seu lado. Cada um replica metade do dano de Kallendra.`,'support');
        }else{
          setBattleStatus('Kallendra já possui o máximo de quatro golens aliados.','system');
        }
      }
      break;
    case 'sacrificeGolems':
      if(golemAllies>=(a.quantidade||2)){
        golemAllies-=a.quantidade||2;
        renderGolemUnits();
        applyDamageToEnemy(a.valor||1000,idx);
      }else{
        setBattleStatus('Terra Viva requer dois golens aliados.','system');
      }
      break;
  }
  renderStatusTray();
  if(!options.deferRoomCheck&&allEnemiesDefeated()){
    window.setTimeout(()=>finishRoomIfCleared(`${a.name} derrotou todos os inimigos da sala.`),40);
  }
}

function showAbilityBanner(k, a, isTierMessage){
  document.getElementById('abHero').textContent = k.nome+' · '+k.classe;
  const banner = document.getElementById('abilityBanner');
  if(isTierMessage){
    document.getElementById('abName').textContent = '✨ Farmando Aura';
    document.getElementById('abDesc').textContent = `${a.name}: ${a.desc}`;
    banner.classList.remove('aura-ready');
  } else {
    document.getElementById('abName').textContent = '✦ '+a.name;
    document.getElementById('abDesc').textContent = a.desc;
    banner.classList.remove('aura-ready');
  }
  banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
}

function showAuraReadyBanner(k){
  document.getElementById('abHero').textContent = k.nome+' · '+k.classe;
  document.getElementById('abName').textContent = '🌟 HABILIDADE ATIVA CARREGADA 🌟';
  document.getElementById('abDesc').textContent = `Toque em ${k.nome} no campo de batalha para escolher uma habilidade acumulada.`;
  const banner = document.getElementById('abilityBanner');
  banner.classList.add('aura-ready');
  banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
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
function addDot(dmgPerTurn, turns, targetIdx=currentTargetIndex(), label='Dano contínuo'){
  if(targetIdx<0) return;
  enemyDots.push({dmgPerTurn, turns, targetIdx, label});
  renderStatusTray();
}
function addBuff(mult, turns){ atkBuffMult = mult; atkBuffTurns = turns; }

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
  const finalDamage=Math.max(0,Math.round(dmg*(enemyVulnerableTurns>0?enemyVulnerableMult:1)));
  if(incinerateActive && colorIdx!==null && colorIdx!==undefined && targetIdxOverride===undefined){
    incinerateStacks += 50;
    addDot(incinerateStacks,3,idx,'Incinerar');
  }
  enemy.hp = Math.max(0, enemy.hp - finalDamage);
  lastDamageDealt = finalDamage;
  if(colorIdx!==null && colorIdx!==undefined){
    heroLastDamage[colorIdx]=finalDamage;
    runStats.damage[colorIdx]=(runStats.damage[colorIdx]||0)+finalDamage;
  }
  sfxHit();
  const bar = document.getElementById('enemyHpBar-'+idx);
  const txt = document.getElementById('enemyHpText-'+idx);
  if(bar) bar.style.width = Math.max(0,enemy.hp/enemy.maxHp*100)+'%';
  if(txt) txt.textContent = `${enemy.hp} / ${enemy.maxHp}`;

  showFloatDamage(finalDamage, 'enemy-'+idx, false);
  const enemyUnit = document.getElementById('enemy-'+idx);
  if(enemyUnit){
    enemyUnit.classList.remove('hit'); void enemyUnit.offsetWidth; enemyUnit.classList.add('hit');
    const hitColor = colorIdx!==null && colorIdx!==undefined && KINGDOMS[colorIdx] ? KINGDOMS[colorIdx].colorLight : '#fff';
    spawnCombatFx('hit',enemyUnit,hitColor,520);
    if(colorIdx!==null && colorIdx!==undefined && KINGDOMS[colorIdx]) spawnRealmParticles(KINGDOMS[colorIdx].id,enemyUnit,8);
  }

  if(enemy.hp<=0){
    if(enemyUnit){ enemyUnit.classList.add('dead'); enemyUnit.classList.remove('selectable'); }
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
  el.className = 'dmg-float' + (isPlayer? ' player-dmg':'');
  el.textContent = '-'+dmg;
  el.style.left = (30+Math.random()*40)+'%';
  anchor.appendChild(el);
  setTimeout(()=>el.remove(), 1500);
}

function afterPlayerTurn(){
  if(finishRoomIfCleared()) return;
  stageTurns++;
  showStageObjective();
  if(checkStageObjective()) return;
  if(atkBuffTurns>0) atkBuffTurns--;
  renderStatusTray();
  setTimeout(()=>tickDots(), 300);
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
  if(finishRoomIfCleared('O dano contínuo eliminou o último inimigo.')) return;
  setTimeout(()=>enemyCounterAttack(), 350);
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

function enemyCounterAttack(){
  const idx = currentTargetIndex();
  if(idx===-1 || playerHP<=0){ busy=false; return; }
  const enemy = enemies[idx];
  if(enemyStunTurns>0){
    enemyStunTurns--;
    showFloatDamage(0, 'enemy-'+idx, false);
    const anchor = document.getElementById('enemy-'+idx);
    if(anchor){
      const el = anchor.querySelector('.dmg-float:last-child');
      if(el){ el.textContent = 'Atordoado!'; el.style.color = '#cbb98a'; el.style.fontSize='11px'; }
    }
    advanceTimedDefense();
    busy = false;
    return;
  }
  if(enemyBlindTurns>0){
    enemyBlindTurns--;
    setBattleStatus(`${enemy.name} errou o ataque sob a Luz da Proteção.`);
    showFloatDamage(0,'enemy-'+idx,false);
    advanceTimedDefense();
    busy=false;
    return;
  }
  const enemyUnit = document.getElementById('enemy-'+idx);
  if(enemyUnit){ enemyUnit.classList.remove('attacking'); void enemyUnit.offsetWidth; enemyUnit.classList.add('attacking'); }
  const variance = 0.85 + gameRandom()*0.3;
  let dmg = Math.round(enemy.atk * variance);
  if(invulnerableTurns>0){
    dmg=0;
    setBattleStatus('O Cardume Invasor desviou completamente o ataque inimigo.');
  } else if(reflectTurns>0){
    const reflected=dmg;
    dmg=0;
    applyDamageToEnemy(reflected,null,idx);
    setBattleStatus(`A Armadura de Corais devolveu ${reflected} de dano.`);
  }
  if(stoneArmorTurns>0&&dmg>0){
    const original=dmg;
    const reflected=Math.max(1,Math.round(original*stoneArmorReflect));
    dmg=Math.max(0,Math.round(original*(1-stoneArmorReduction)));
    applyDamageToEnemy(reflected,null,idx);
    setBattleStatus(`A Armadura de Pedra reduziu o ataque para ${dmg} e devolveu ${reflected} de dano.`,'support');
  }
  if(playerShield>0){
    const absorbed = Math.min(playerShield, dmg);
    playerShield -= absorbed;
    dmg -= absorbed;
    if(absorbed>0) pulseHpEffect('shield',900);
  }
  playerHP = Math.max(0, playerHP - dmg);
  updatePlayerHP();
  if(dmg>0) pulseHpEffect('damage',800);
  if(dmg>0&&partyArenaEl){ partyArenaEl.classList.remove('party-hurt'); void partyArenaEl.offsetWidth; partyArenaEl.classList.add('party-hurt');
    window.setTimeout(()=>partyArenaEl.classList.remove('party-hurt'),480); }
  sfxPlayerHit();
  haptic([25,20,25]);
  if(dmg>0) setBattleStatus(`${enemy.name} contra-atacou e causou ${dmg} de dano.`);
  document.body.classList.remove('shake'); void document.body.offsetWidth; document.body.classList.add('shake');
  showFloatDamage(dmg, 'playerHpAnchor', true);
  advanceTimedDefense();
  saveProgress();
  busy = false;
  if(finishRoomIfCleared('O contra-ataque defensivo derrotou o último inimigo.')) return;
  if(playerHP<=0){ sfxDefeat(); flushRunToProfile(false); renderBattleReport('defeatReport'); setTimeout(()=>showOverlay('defeatOverlay'), 400); }
}

function updatePlayerHP(){
  const pct = Math.max(0,(playerHP/PLAYER_MAX_HP)*100);
  playerHpBar.style.height = pct+'%';
  playerHpBar.style.width = '100%';
  playerHpText.textContent = String(playerHP);
  if(playerHpTotal) playerHpTotal.textContent = 'Total '+PLAYER_MAX_HP;
  document.body.classList.toggle('player-critical',pct>0&&pct<=25);
  playerHpBar.setAttribute('aria-valuenow',String(playerHP));
  syncHpStateClasses();
}

/* v9 · Estatísticas da run, estrelas e celebração */
let runStats={damage:{},maxCombo:0,powerUps:0};
function resetRunStats(){ runStats={damage:{},maxCombo:0,powerUps:0,starsEarned:0,_flushedDamage:0,_flushedPU:0}; }
function getStars(){ try{ return JSON.parse(localStorage.getItem('12r_stars')||'{}'); }catch(e){ return {}; } }
function recordStars(stageIdx){
  const ratio=playerHP/PLAYER_MAX_HP;
  const stars=ratio>=.7?3:ratio>=.4?2:1;
  const all=getStars();
  if((all[stageIdx]||0)<stars){ all[stageIdx]=stars; localStorage.setItem('12r_stars',JSON.stringify(all)); }
  return stars;
}
function renderBattleReport(elId){
  const el=document.getElementById(elId); if(!el) return;
  const entries=Object.entries(runStats.damage).map(([idx,dmg])=>({idx:+idx,dmg})).sort((a,b)=>b.dmg-a.dmg);
  if(!entries.length){ el.innerHTML=''; return; }
  const top=entries[0]; const mvp=KINGDOMS[top.idx]; const maxD=top.dmg||1;
  el.innerHTML=`
    <div class="report-mvp"><img src="${mvp.cardThumb||mvp.img}" alt="${mvp.nome}"><div><small>MVP DA BATALHA</small><strong>${mvp.nome}</strong><span>${top.dmg} de dano total</span></div></div>
    <div class="report-rows">${entries.map(e=>{const k=KINGDOMS[e.idx];return `<div class="report-row"><span class="rr-name">${k.nome}</span><div class="rr-bar"><i style="width:${Math.max(6,Math.round(e.dmg/maxD*100))}%;background:${k.color}"></i></div><span class="rr-val">${e.dmg}</span></div>`;}).join('')}</div>
    <div class="report-meta">Maior combo ×${runStats.maxCombo} · Power-ups criados: ${runStats.powerUps}</div>`;
}
function launchVictoryConfetti(){
  const layer=document.getElementById('victoryConfetti');
  if(!layer||reducedMotion||!particlesEnabled) return;
  layer.innerHTML='';
  const colors=ACTIVE.map(i=>KINGDOMS[i].orbColor||KINGDOMS[i].color);
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
  stageTransitioning = true;
  busy = true;
  combatEpoch++;
  sfxVictory();
  if(worldRun.active){
    const world=WORLDS[0];
    const fase=world.fases[worldRun.fase];
    if(worldRun.nivel<5){
      worldRun.nivel++;
      grantCoins(6+worldRun.fase*2);
      const starsEl=document.getElementById('stageStars');
      if(starsEl) starsEl.innerHTML='';
      document.getElementById('stageClearText').textContent=`${fase.nome}: ${T('nível','level','nivel')} ${worldRun.nivel-1}/5 ${T('superado! Avançando...','cleared! Advancing...','superado! Avanzando...')}`;
      showOverlay('stageClearOverlay');
      setTimeout(()=>{ hideOverlay('stageClearOverlay'); loadStage(0); busy=false; },1500);
      return;
    }
    // Chefe vencido — fase completa!
    const prog=worldProg('humanos');
    const ratio=playerHP/PLAYER_MAX_HP;
    const stars=ratio>=.7?3:ratio>=.4?2:1;
    if((prog.stars[worldRun.fase]||0)<stars) prog.stars[worldRun.fase]=stars;
    prog.unlocked=Math.max(prog.unlocked,Math.min(world.fases.length-1,worldRun.fase+1));
    saveWorldProg('humanos',prog);
    grantCoins(40+worldRun.fase*10);
    const ups=grantXp(30+worldRun.fase*10);
    checkAchievements('stage');
    flushRunToProfile(true);
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML=[1,2,3].map(x=>`<span class="star${x<=stars?' on':''}" style="--i:${x}">★</span>`).join('');
    document.getElementById('stageClearText').textContent=`${fase.chefe} ${T('derrotado(a)!','defeated!','¡derrotado(a)!')} ${fase.nome} ${T('conquistada!','conquered!','conquistada!')}${ups.length?' '+ups.join(' '):''}`;
    showOverlay('stageClearOverlay');
    setTimeout(()=>{
      hideOverlay('stageClearOverlay');
      worldRun.active=false;
      showMainMenu();
      openMapScreen();
      renderWorldMap();
      openPanel('worldScreen');
      busy=false;
    },2400);
    return;
  }
  if(towerMode){
    const best=Math.max(Number(localStorage.getItem('12r_tower_best')||0),towerFloor);
    localStorage.setItem('12r_tower_best',String(best));
    grantCoins(10+Math.floor(towerFloor/2));
    grantXp(12+towerFloor*3);
    checkAchievements('tower');
    flushRunToProfile(true);
    towerFloor++;
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML='';
    document.getElementById('stageClearText').textContent = `Andar ${towerFloor-1} superado! Prepare-se para o andar ${towerFloor}.`;
    showOverlay('stageClearOverlay');
    setTimeout(()=>{ hideOverlay('stageClearOverlay'); loadStage(0); busy=false; }, 1600);
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
    grantCoins(IS_DAILY_RUN?240:120);
    grantXp(60);
    checkAchievements('dungeon');
    if(IS_DAILY_RUN) localStorage.setItem('12r_daily',JSON.stringify({date:todayKey(),combo:runStats.maxCombo}));
    const shareBtn=document.getElementById('shareDailyBtn');
    if(shareBtn) shareBtn.style.display=IS_DAILY_RUN?'inline-block':'none';
    renderBattleReport('victoryReport');
    launchVictoryConfetti();
    showOverlay('dungeonClearOverlay');
  }
  else{
    const starsEl=document.getElementById('stageStars');
    if(starsEl) starsEl.innerHTML=[1,2,3].map(n=>`<span class="star${n<=earnedStars?' on':''}" style="--i:${n}">★</span>`).join('');
    document.getElementById('stageClearText').textContent = `${DUNGEON[stageIndex].title} - superado!${levelUps.length?' '+levelUps.join(' '):''}`;
    showOverlay('stageClearOverlay');
    setTimeout(()=>{ hideOverlay('stageClearOverlay'); loadStage(stageIndex+1); busy=false; }, 1800);
  }
}

function showOverlay(id){ document.getElementById(id).classList.add('show'); }
function hideOverlay(id){ document.getElementById(id).classList.remove('show'); }

function resetGame(){
  resetRunStats();
  playerHP = PLAYER_MAX_HP; updatePlayerHP();
  ['stageClearOverlay','dungeonClearOverlay','defeatOverlay'].forEach(hideOverlay);
  selected=null; busy=false; comboStep=0;
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
  loadStage(0);
}

function restartCurrentStage(){
  playerHP = PLAYER_MAX_HP; updatePlayerHP();
  ['stageClearOverlay','dungeonClearOverlay','defeatOverlay'].forEach(hideOverlay);
  selected=null; busy=false; comboStep=0;
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
  loadStage(stageIndex);
}

document.getElementById('muteBtn').addEventListener('click', toggleMusic);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('retryBtn').addEventListener('click', restartCurrentStage);
document.getElementById('playAgainBtn').addEventListener('click', resetGame);

// ---------- HERO SELECT SCREEN ----------
const qaPreset = new URLSearchParams(location.search).get('qa');
let chosenIds = qaPreset==='barbara'||qaPreset==='all-specials' ? [0,1,3,5] : [];
let pendingStage = 0;
const selectGridEl = document.getElementById('selectGrid');
const selectCountEl = document.getElementById('selectCount');
const startBtnEl = document.getElementById('startBtn');
const swapBtnEl = document.getElementById('swapBtn2');

function renderSelectGrid(){
  selectGridEl.innerHTML = '';
  KINGDOMS.forEach((k, idx)=>{
    const card = document.createElement('div');
    card.className = 'select-card' + (chosenIds.includes(idx) ? ' chosen' : '');
    card.style.setProperty('--realm',k.color);
    card.style.setProperty('--realm-light',k.colorLight);
    card.style.setProperty('--realm-dark',k.colorDark);
    const pickOrder = chosenIds.indexOf(idx);
    card.innerHTML = `
      <div class="thumb-wrap"><img src="${k.cardThumb||k.img}" alt="${k.nome}">${pickOrder>=0?`<div class="pick-badge" aria-hidden="true">${pickOrder+1}</div>`:''}<button class="zoom-btn" type="button" data-idx="${idx}" aria-label="Abrir carta de ${k.nome} em alta resolução">🔍</button></div>
    `;
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label',`${chosenIds.includes(idx)?'Remover':'Adicionar'} ${k.nome} da equipe`);
    card.addEventListener('click',()=>toggleHero(idx));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleHero(idx);}});
    card.querySelector('.zoom-btn').addEventListener('click', e=>{ e.stopPropagation(); openCardModal(idx); });
    selectGridEl.appendChild(card);
  });
  selectCountEl.textContent = chosenIds.length;
  startBtnEl.disabled = chosenIds.length!==4;
}

function toggleHero(idx){
  if(chosenIds.includes(idx)){
    chosenIds=chosenIds.filter(id=>id!==idx);
  }else if(chosenIds.length<4){
    chosenIds.push(idx);
  }else{
    setBattleStatus('A equipe já possui quatro personagens. Remova uma carta antes de escolher outra.','system');
    haptic(18);
  }
  renderSelectGrid();
  sfxSelect();
}

function openCardModal(idx){
  const k = KINGDOMS[idx];
  document.getElementById('cardModalImg').src = k.img;
  document.getElementById('cardModalImg').alt = k.nome;
  document.getElementById('cardModalName').textContent = k.nome;
  document.getElementById('cardModalClasse').textContent = k.reino + ' · ' + k.classe;
  const abilitiesEl = document.getElementById('cardModalAbilities');
  const passives=k.abilities.filter(a=>a.kind==='passive');
  const actives=k.abilities.filter(a=>a.kind==='active');
  const renderAbility=a=>`
      <div class="card-modal-ability">
        <div class="tier-tag">${a.gems}% de energia · ${a.kind==='active'?'habilidade ativa':'passiva'}</div>
        <b>${a.name}</b> — ${a.desc}
      </div>`;
  abilitiesEl.innerHTML='<div class="card-modal-ability-section">3 Passivas</div>'+passives.map(renderAbility).join('')+
    '<div class="card-modal-ability-section">3 Ativas</div>'+actives.map(renderAbility).join('');
  document.getElementById('cardModal').classList.add('show');
  document.getElementById('cardModal').setAttribute('aria-hidden','false');
  document.getElementById('closeCardModal').focus();
}

function closeCardModalFn(){
  document.getElementById('cardModal').classList.remove('show');
  document.getElementById('cardModal').setAttribute('aria-hidden','true');
}
document.getElementById('closeCardModal').addEventListener('click', closeCardModalFn);
document.getElementById('cardModal').addEventListener('click', (e)=>{
  if(e.target.id==='cardModal') closeCardModalFn();
});

function renderCardStrip(){
  const stripEl = document.getElementById('cardStrip');
  stripEl.innerHTML = '';
  ACTIVE.forEach(idx=>{
    const k = KINGDOMS[idx];
    const mini = document.createElement('div');
    mini.className = 'mini-card';
    mini.setAttribute('role','button');
    mini.setAttribute('tabindex','0');
    mini.setAttribute('aria-label',`Abrir carta de ${k.nome}`);
    mini.innerHTML = `
      <div class="mini-thumb"><img src="${k.cardThumb||k.img}" alt="${k.nome}"></div>
      <div class="mini-card-copy">
        <div class="mini-name">${k.nome}</div>
        <div class="mini-rarity">${k.rarity||'DIVINA'}</div>
        <div class="mini-stars" aria-label="${k.stars||7} estrelas">${'★'.repeat(k.stars||7)}</div>
      </div>
    `;
    mini.addEventListener('click', ()=>openCardModal(idx));
    mini.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openCardModal(idx); } });
    stripEl.appendChild(mini);
  });
}

function getSavedProgress(){
  try{
    const saved = JSON.parse(localStorage.getItem('12r_save')||'null');
    if(!saved || !Number.isFinite(Number(saved.stage))) return null;
    const team=Array.isArray(saved.team)?saved.team.filter(idx=>KINGDOMS[idx]).slice(0,4):[0,1,2,3];
    return {...saved,version:8,team:team.length===4?team:[0,1,2,3]};
  }catch(e){ return null; }
}

function saveProgress(forcedStage){
  if(towerMode||worldRun.active) return; // torre e mundos não tocam o save da campanha
  if(ACTIVE.length!==4) return;
  const safeStage = Math.max(0,Math.min(DUNGEON.length-1,forcedStage??stageIndex));
  localStorage.setItem('12r_save',JSON.stringify({version:8,stage:safeStage,team:[...ACTIVE],hp:Math.max(1,playerHP),seed:seedText,updated:Date.now()}));
  refreshContinueButton();
}

function refreshContinueButton(){
  const saved = getSavedProgress();
  const btn = document.getElementById('continueBtn');
  const hint = document.getElementById('continueHint');
  btn.disabled = !saved;
  hint.textContent = saved ? `Fase ${saved.stage+1} · ${DUNGEON[saved.stage].title}` : 'Sem progresso salvo';
}

function closeAllPanels(){
  document.querySelectorAll('.pro-overlay.show').forEach(el=>el.classList.remove('show'));
  document.getElementById('cardModal').classList.remove('show');
}
function showMainMenu(){
  closeAllPanels(); stopMusic(); busy=false;
  document.getElementById('mainMenu').style.display='flex';
  document.getElementById('selectScreen').style.display='none';
  document.getElementById('gameScreen').style.display='none';
  document.body.classList.remove('game-active');
  sceneBgEl.dataset.screen='menu'; refreshContinueButton();
}
function showSelection(){
  closeAllPanels(); stopMusic(); busy=false;
  document.getElementById('mainMenu').style.display='none';
  document.getElementById('gameScreen').style.display='none';
  document.getElementById('selectScreen').style.display='flex';
  document.body.classList.remove('game-active');
  sceneBgEl.dataset.screen='selection'; renderSelectGrid();
}
function beginGame(startAt=0,restoredHP=PLAYER_MAX_HP){
  resetRunStats();
  if(chosenIds.length!==4) return;
  ensureAudio();
  ACTIVE = [...chosenIds];
  playerHP = Math.max(1,Math.min(PLAYER_MAX_HP,restoredHP||PLAYER_MAX_HP));
  heroProgress = {}; firedTiers = {}; heroReady = {}; heroActiveQueue = {};
  pendingRoomPassives=[]; roomClearScheduled=false; golemAllies=0; harpyAllies=0; heroEmpower={};
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
  pendingStage=0;
  if(!localStorage.getItem('12r_tutorial_seen')){
    localStorage.setItem('12r_tutorial_seen','true');
    setTimeout(()=>openPanel('helpScreen'),450);
  }
}

function renderGallery(){
  const grid=document.getElementById('galleryGrid'); grid.innerHTML='';
  KINGDOMS.forEach((k,idx)=>{
    const card=document.createElement('div');
    card.className='gallery-card';
    card.style.setProperty('--realm',k.color); card.style.setProperty('--realm-dark',k.colorDark);
    card.innerHTML=`<div class="gallery-thumb-wrap"><img src="${k.cardThumb||k.img}" alt="${k.nome}"><button class="gallery-zoom" type="button" aria-label="Ampliar carta de ${k.nome}">🔍</button></div><b><span class="realm-dot" style="--realm:${k.color};--realm-light:${k.colorLight};--realm-dark:${k.colorDark};margin-right:3px;"></span>${k.nome}</b><small>${k.rarity||'DIVINA'} · ${'★'.repeat(k.stars||7)}</small>`;
    card.querySelector('.gallery-zoom').addEventListener('click',()=>openCardModal(idx)); grid.appendChild(card);
  });
}
const STAGE_ART=["assets/bg/bg-08.png","assets/bg/bg-09.png","assets/bg/bg-10.png","assets/bg/bg-11.png"];
function renderJourneyMap(){
  const map=document.getElementById('journeyMap');
  const unlocked=Math.max(0,Number(localStorage.getItem('12r_unlocked')||0)); map.innerHTML='';
  const starsAll=getStars();
  DUNGEON.forEach((stage,idx)=>{
    const btn=document.createElement('button'); const locked=idx>unlocked;
    btn.className='stage-node'+(locked?' locked':''); btn.disabled=locked;
    btn.style.backgroundImage=`linear-gradient(transparent,rgba(4,2,8,.94)),url('${STAGE_ART[idx%STAGE_ART.length]}')`;
    const stars=starsAll[idx]||0;
    btn.innerHTML=`<span>Fase ${idx+1}<br><b>${stage.title}</b>${stars?`<br><span class="node-stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</span>`:''}${locked?'<br>🔒 Bloqueada':''}</span>`;
    btn.addEventListener('click',()=>{ towerMode=false; worldRun.active=false; pendingStage=idx; closeAllPanels(); if(chosenIds.length===4) beginGame(idx); else showSelection(); });
    map.appendChild(btn);
  });
}
function openPanel(id){
  if(id==='galleryScreen') renderGallery();
  if(id==='journeyScreen') renderJourneyMap();
  if(id==='achScreen') renderAchievements();
  if(id==='shopScreen') renderShop();
  if(id==='worldScreen') renderWorldMap();
  document.getElementById(id).classList.add('show');
}
function applySettings(){
  document.body.classList.toggle('reduce-motion',reducedMotion);
  document.body.classList.toggle('motion-enabled',!reducedMotion);
  document.getElementById('volumeRange').value=Math.round(masterVolume*100);
  document.getElementById('reduceMotionToggle').checked=reducedMotion;
  document.getElementById('particlesToggle').checked=particlesEnabled;
  document.getElementById('hapticsToggle').checked=hapticsEnabled;
  document.getElementById('muteBtn').textContent=musicMuted?'🔇':'🔊';
}

startBtnEl.addEventListener('click',()=>beginGame(pendingStage));
document.getElementById('playBtn').addEventListener('click',()=>{ towerMode=false; worldRun.active=false; pendingStage=0; openMapScreen(); });
document.getElementById('continueBtn').addEventListener('click',()=>{ const saved=getSavedProgress(); if(!saved)return; towerMode=false; worldRun.active=false; chosenIds=[...saved.team]; beginGame(saved.stage,saved.hp); });
document.getElementById('galleryBtn').addEventListener('click',()=>openPanel('galleryScreen'));
document.getElementById('selectGalleryBtn').addEventListener('click',()=>openPanel('galleryScreen'));
// v9.1: botões Jornada/Mundos removidos — o fluxo agora é Jogar → Mapa de Ygdria
document.getElementById('optionsBtn').addEventListener('click',()=>openPanel('optionsScreen'));
document.getElementById('helpBtn').addEventListener('click',()=>openPanel('helpScreen'));
document.getElementById('battleToolsToggle').addEventListener('click',()=>toggleBattleTools());
document.getElementById('cycleTargetTool').addEventListener('click',cycleBattleTarget);
document.getElementById('autoTargetTool').addEventListener('click',toggleAutoTarget);
document.getElementById('speedTool').addEventListener('click',cycleBattleSpeed);
document.getElementById('musicMoodTool').addEventListener('click',cycleMusicMood);
document.getElementById('hintTool').addEventListener('click',showBestMoveHint);
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
document.getElementById('autoTeamBtn').addEventListener('click',()=>{ chosenIds=[0,1,2,3]; renderSelectGrid(); sfxSelect(); });

swapBtnEl.addEventListener('click', ()=>{
  showSelection();
});

document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click',()=>{ btn.closest('.pro-overlay').classList.remove('show'); if(btn.closest('#helpScreen'))localStorage.setItem('12r_tutorial_seen','true'); });
});
document.querySelectorAll('.pro-overlay').forEach(panel=>{
  panel.addEventListener('click',e=>{ if(e.target===panel && panel.id!=='pauseScreen')panel.classList.remove('show'); });
});
document.getElementById('pauseBtn').addEventListener('click',()=>{ stopMusic(); openPanel('pauseScreen'); });
document.getElementById('resumeBtn').addEventListener('click',()=>{ document.getElementById('pauseScreen').classList.remove('show'); if(!musicMuted)playStageMusic(stageIndex); });
document.getElementById('pauseOptionsBtn').addEventListener('click',()=>{ document.getElementById('pauseScreen').classList.remove('show'); openPanel('optionsScreen'); });
document.getElementById('restartStageBtn').addEventListener('click',()=>{ document.getElementById('pauseScreen').classList.remove('show'); restartCurrentStage(); });
document.getElementById('returnMenuBtn').addEventListener('click',showMainMenu);
document.getElementById('volumeRange').addEventListener('input',e=>{ masterVolume=Number(e.target.value)/100; localStorage.setItem('12r_volume',String(e.target.value)); });
document.getElementById('reduceMotionToggle').addEventListener('change',e=>{ reducedMotion=e.target.checked; localStorage.setItem('12r_motion',reducedMotion?'reduced':'full'); applySettings(); });
document.getElementById('particlesToggle').addEventListener('change',e=>{ particlesEnabled=e.target.checked; localStorage.setItem('12r_particles',String(particlesEnabled)); });
document.getElementById('hapticsToggle').addEventListener('change',e=>{ hapticsEnabled=e.target.checked; localStorage.setItem('12r_haptics',String(hapticsEnabled)); });
document.getElementById('resetProgressBtn').addEventListener('click',()=>{
  if(!confirm('Apagar o progresso salvo desta masmorra?'))return;
  localStorage.removeItem('12r_save'); localStorage.removeItem('12r_unlocked'); refreshContinueButton(); renderJourneyMap();
});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(document.getElementById('cardModal').classList.contains('show')){closeCardModalFn();return;}
  const open=[...document.querySelectorAll('.pro-overlay.show')].pop();
  if(open && open.id!=='pauseScreen'){open.classList.remove('show');return;}
  if(document.getElementById('gameScreen').style.display==='flex')openPanel('pauseScreen');
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden && document.getElementById('gameScreen').style.display==='flex'){
    stopMusic();
    openPanel('pauseScreen');
  }
});
function preloadOfficialAssets(){
  const urls=[
    ...KINGDOMS.flatMap(k=>[k.cardThumb||k.img,k.sprite]),
    ...DUNGEON.flatMap(stage=>stage.enemies.map(enemy=>enemy.sprite))
  ];
  return Promise.allSettled([...new Set(urls)].map(src=>new Promise((resolve,reject)=>{
    const image=new Image(); image.onload=resolve; image.onerror=reject; image.src=src;
  }))).then(()=>document.body.classList.add('assets-ready'));
}
preloadOfficialAssets();
if(['127.0.0.1','localhost'].includes(location.hostname)){
  window.__12rQA={
    snapshot:()=>({
      stageIndex,playerHP,enemyHP:enemies.map(e=>e.hp),heroProgress:{...heroProgress},
      statuses:{playerShield,enemyBlindTurns,reflectTurns,invulnerableTurns,lifestealCharges,lastDragonRitual,incinerateActive,incinerateStacks,musicMoodMode},
      busy,stageTransitioning
    }),
    grantEnergy:(heroIdx,amount=100)=>{
      heroProgress[heroIdx]=Math.max(0,Math.min(100,amount));
      heroReady[heroIdx]=heroProgress[heroIdx]>=100;
      updateHeroProgressUI(heroIdx);
      return heroProgress[heroIdx];
    },
    triggerTier:(heroIdx,gems)=>{
      const ability=KINGDOMS[heroIdx]?.abilities.find(a=>a.gems===gems);
      if(!ability) throw new Error('Ability tier not found');
      triggerAbility(heroIdx,ability);
      return ability.name;
    }
  };
}
applySettings();
renderSelectGrid();
refreshContinueButton();
showMainMenu();

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
  slimeCereja:{n:'Slime de Cerejeira', s:'slime', t:'hue-rotate(300deg) saturate(1.6) brightness(1.2)', hp:280, atk:38},
  loboRaivoso:{n:'Lobo Raivoso', s:'wolf', t:'saturate(1.9) hue-rotate(330deg) brightness(1.05)', hp:340, atk:46},
  soldado:{n:'Soldado', s:'sentinel', t:'saturate(.65) brightness(1.05)', hp:400, atk:48},
  capitao:{n:'Capitão dos Soldados', s:'sentinel', t:'sepia(.45) saturate(1.5) contrast(1.1)', hp:680, atk:60},
  vulto:{n:'Vulto Sombrio', s:'wraith', t:'brightness(.5) saturate(.6)', hp:440, atk:52},
  espectro:{n:'Espectro Sombrio', s:'wraith', t:'brightness(1.35) hue-rotate(240deg)', hp:540, atk:58},
  morto:{n:'Cavaleiro Morto-Vivo', s:'sentinel', t:'hue-rotate(90deg) brightness(.72) saturate(1.3)', hp:760, atk:64},
  soldBib:{n:'Soldado da Biblioteca', s:'sentinel', t:'sepia(.85) brightness(1.05)', hp:540, atk:56},
  infantaria:{n:'Soldado de Infantaria', s:'sentinel', t:'hue-rotate(205deg) saturate(.85)', hp:580, atk:58},
  cavalaria:{n:'Soldado de Cavalaria', s:'wolf', t:'hue-rotate(205deg) brightness(1.15)', hp:620, atk:62},
  comandante:{n:'Comandante dos Soldados', s:'sentinel', t:'contrast(1.35) saturate(1.6) brightness(1.08)', hp:940, atk:72},
  trono:{n:'Soldado do Trono Real', s:'sentinel', t:'sepia(.7) saturate(2) brightness(1.18)', hp:840, atk:68}
};
const HUMANOS_CARDS={
  gareth:{nome:'Gareth', hp:1500, atk:78, img:'assets/cards/enemies/gareth.svg'},
  cedric:{nome:'Cedric', hp:1600, atk:82, img:'assets/cards/enemies/cedric.svg'},
  eliza:{nome:'Eliza', hp:1550, atk:86, img:'assets/cards/enemies/eliza.svg'},
  roland:{nome:'Roland', hp:1750, atk:80, img:'assets/cards/enemies/roland.svg'},
  jules:{nome:'Jules, The Joker', hp:2000, atk:95, img:'assets/cards/enemies/jules.svg'},
  bernyce:{nome:'Bernyce', hp:2100, atk:92, img:'assets/cards/enemies/bernyce.svg'},
  kalander:{nome:'Kalander', hp:2400, atk:98, img:'assets/cards/enemies/kalander.svg'},
  julius:{nome:'Julius', hp:2800, atk:112, img:'assets/cards/enemies/julius.svg'}
};
const WORLDS=[{
  id:'humanos', nome:'Reino dos Humanos', titulo:'Terra dos Reguladores de Ygdria',
  fases:[
    { nome:'Cidade das Cerejeiras', sub:'Capital de Ygdria', bg:'assets/bg/humanos/fase-01.svg', chefe:'Gareth',
      dial:[{h:'humanos',t:'Minha capital... as cerejeiras choram pétalas. Algo corrompeu a guarda da cidade.'}],
      missoes:[['slimeCereja'],['slimeCereja','loboRaivoso'],['loboRaivoso','loboRaivoso'],['soldado','soldado'],['soldado','soldado','gareth']] },
    { nome:'Catedral de Ygdria', sub:'Onde a fé encontrou a magia', bg:'assets/bg/humanos/fase-02.svg', chefe:'Cedric',
      dial:[{h:'luz',t:'Este lugar já foi sagrado. Os vitrais ainda cantam... mas há aço entre os bancos.'}],
      missoes:[['soldado','soldado'],['capitao'],['soldado','capitao'],['soldado','soldado','capitao'],['soldado','capitao','cedric']] },
    { nome:'Palácio dos Reguladores', sub:'A ordem acima de tudo', bg:'assets/bg/humanos/fase-03.svg', chefe:'Eliza',
      dial:[{h:'humanos',t:'Os Reguladores mantinham o equilíbrio entre os reinos. Quem os dobrou?'}],
      missoes:[['soldado','soldado'],['capitao'],['soldado','capitao'],['soldado','soldado','capitao'],['soldado','capitao','eliza']] },
    { nome:'Academia Real de Magia e Combate', sub:'Onde nascem os magos-cavaleiros', bg:'assets/bg/humanos/fase-05.svg', chefe:'Roland',
      dial:[{h:'raio',t:'Ha! Estudei aqui... e fui expulso. Hora de mostrar aos instrutores o que aprendi sozinho.'}],
      missoes:[['soldado','soldado'],['capitao'],['soldado','capitao'],['soldado','soldado','capitao'],['soldado','capitao','roland']] },
    { nome:'Mercado Central dos Reinos', sub:'Tudo tem um preço', bg:'assets/bg/humanos/fase-06.svg', chefe:'Cedric, Eliza e Roland',
      dial:[{h:'areia',t:'Conheço mercados assim — e emboscadas também. Três lâminas nos esperam no fim desta rua.'}],
      missoes:[['soldado','soldado'],['capitao'],['soldado','capitao'],['soldado','soldado','capitao'],['cedric','eliza','roland']] },
    { nome:'Praça das Doze Essências', sub:'Doze pilares, doze reinos', bg:'assets/bg/humanos/fase-04.svg', chefe:'Jules, The Joker',
      dial:[{h:'sombras',t:'Vultos entre os pilares... e um riso que não é humano. Ele acha que sombras são um jogo.'}],
      missoes:[['vulto'],['espectro'],['vulto','espectro'],['morto'],['jules']] },
    { nome:'Biblioteca da Eternidade', sub:'Todo saber, um só silêncio', bg:'assets/bg/humanos/fase-07.svg', chefe:'Bernyce',
      dial:[{h:'chuvas',t:'Séculos de conhecimento vigiados por soldados... e por ela. Bernyce não empresta livros.'}],
      missoes:[['soldBib'],['soldBib','soldBib'],['soldBib','soldBib','soldBib'],['cedric','eliza','roland'],['bernyce']] },
    { nome:'Muralha dos Heróis', sub:'Eles ainda vigiam', bg:'assets/bg/humanos/fase-08.svg', chefe:'Kalander',
      dial:[{h:'terra',t:'Infantaria, cavalaria, comando... e no topo da muralha, Kalander. Esta pedra vai tremer.'}],
      missoes:[['infantaria'],['cavalaria'],['comandante'],['infantaria','cavalaria','comandante'],['kalander']] },
    { nome:'Lendária Torre de Acesso à Eternidade', sub:'O céu é a porta', bg:'assets/bg/humanos/fase-09.svg', chefe:'Julius',
      dial:[{h:'sombras',t:'Esta torre toca a Eternidade... e Julius desceu dela. Sinto o véu se rasgar.'}],
      missoes:[['vulto','espectro'],['morto'],['vulto','espectro','morto'],['jules'],['julius']] },
    { nome:'Castelo da Coroa Humana', sub:'O trono espera seu verdadeiro rei', bg:'assets/bg/humanos/fase-10.svg', chefe:'Julius',
      dial:[{h:'humanos',t:'O castelo da minha linhagem. Todos os campeões dele nos aguardam... e Julius por trás de tudo.'},{h:'fogo',t:'Cinco cartas contra nós? Ótimo. Sempre quis um baralho em chamas.'}],
      missoes:[['trono'],['cedric','eliza','roland'],['kalander','cedric','eliza','roland'],['kalander','bernyce'],['julius']] }
  ]
}];
/* v9.1 · Mapa de Ygdria: 12 reinos traçados; só o Reino dos Humanos liberado */
const REALMS_MAP=[
  {id:'raio',     x:28,   y:23},
  {id:'sombras',  x:50,   y:22.5},
  {id:'gelo',     x:76,   y:22.5},
  {id:'vento',    x:15,   y:42},
  {id:'chuvas',   x:83,   y:41.5},
  {id:'humanos',  x:50,   y:50.5, unlocked:true},
  {id:'fogo',     x:14,   y:65},
  {id:'natureza', x:85,   y:65.5},
  {id:'agua',     x:48,   y:73.5},
  {id:'terra',    x:13,   y:82},
  {id:'areia',    x:79,   y:90},
  {id:'luz',      x:33.5, y:85.5}
];
function openMapScreen(){
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
    const pin=document.createElement('button');
    pin.type='button';
    pin.className='realm-pin'+(r.unlocked?' unlocked':' locked');
    pin.style.left=r.x+'%';
    pin.style.top=r.y+'%';
    pin.style.setProperty('--realm-c',k.color);
    pin.setAttribute('aria-label',k.reino+(r.unlocked?'':' — '+T('em breve','coming soon','próximamente')));
    pin.innerHTML=`
      <span class="pin-gem"><svg viewBox="0 0 24 24">${KINGDOM_ICON[r.id]||''}</svg>${r.unlocked?'':'<i class="pin-lock">🔒</i>'}</span>
      ${r.unlocked?`<span class="pin-label">${T('ENTRAR','ENTER','ENTRAR')}</span>`:''}`;
    pin.addEventListener('click',()=>{
      if(!r.unlocked){
        sfxInvalid();
        pin.classList.remove('deny'); void pin.offsetWidth; pin.classList.add('deny');
        showMapTip(T('Em breve: ','Coming soon: ','Próximamente: ')+k.reino);
        return;
      }
      sfxSelect();
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
  try{ return JSON.parse(localStorage.getItem('12r_world_'+worldId)||'{"unlocked":0,"stars":{}}'); }
  catch(e){ return {unlocked:0,stars:{}}; }
}
function saveWorldProg(worldId,prog){ localStorage.setItem('12r_world_'+worldId,JSON.stringify(prog)); }
function buildWorldLevel(){
  const world=WORLDS[0];
  const fase=world.fases[worldRun.fase];
  const f=worldRun.fase, n=worldRun.nivel;
  const mult=(1+f*0.32)*(1+(n-1)*0.08);
  const keys=fase.missoes[n-1]||['soldado'];
  const enemies=keys.map((key)=>{
    const c=HUMANOS_CARDS[key];
    if(c) return {name:c.nome, hp:Math.round(c.hp*mult), atk:Math.round(c.atk*mult), sprite:c.img, isCard:true};
    const tpl=HUMANOS_ETYPES[key]||HUMANOS_ETYPES.soldado;
    return {name:tpl.n, hp:Math.round(tpl.hp*mult), atk:Math.round(tpl.atk*mult), sprite:ESPR[tpl.s], tint:tpl.t};
  });
  if(n===5&&enemies.length) enemies[enemies.length-1].isBoss=true;
  return {
    title:`${fase.nome} · ${T('Missão','Mission','Misión')} ${n}/5${n===5?' · CHEFE':''}`,
    scene:n===5?4:(f%4),
    bgUrl:fase.bg,
    enemies,
    dial:n===1?fase.dial:null
  };
}
function startWorldFase(faseIdx){
  const prog=worldProg('humanos');
  if(faseIdx>prog.unlocked){ sfxInvalid(); return; }
  worldRun={active:true,fase:faseIdx,nivel:1};
  towerMode=false;
  closeAllPanels();
  closeMapScreen();
  pendingStage=0;
  showSelection(); // o jogador escolhe a equipe e toca em "Iniciar a Aventura!"
}
function renderWorldMap(){
  const world=WORLDS[0];
  const head=document.getElementById('worldHead');
  if(head) head.innerHTML=`<b>${world.nome}</b><small>${world.titulo}</small>`;
  const map=document.getElementById('worldMap');
  if(!map) return;
  const prog=worldProg('humanos');
  map.innerHTML='';
  world.fases.forEach((fase,idx)=>{
    const locked=idx>prog.unlocked;
    const stars=prog.stars[idx]||0;
    const node=document.createElement('button');
    node.className='fase-node'+(locked?' locked':'');
    node.disabled=locked;
    node.style.backgroundImage=`linear-gradient(rgba(4,2,8,.25),rgba(4,2,8,.9)),url('${fase.bg}')`;
    node.innerHTML=`<span class="fase-num">${idx+1}</span>
      <span class="fase-copy"><b>${fase.nome}</b><small>${fase.sub}</small>
      <em>${locked?'🔒 '+T('Bloqueada','Locked','Bloqueada'):(stars?'★'.repeat(stars)+'☆'.repeat(3-stars):T('5 níveis · chefe no final','5 levels · boss at the end','5 niveles · jefe al final'))}</em></span>`;
    node.addEventListener('click',()=>startWorldFase(idx));
    map.appendChild(node);
  });
}

/* v9.1 · Modos, dificuldade e economia: inicialização */
function todayKey(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
(function initV91(){
  document.querySelectorAll('#diffGroup [data-diff]').forEach(b=>b.addEventListener('click',()=>{
    difficulty=b.dataset.diff;
    localStorage.setItem('12r_difficulty',difficulty);
    applyDifficultyUI();
  }));
  applyDifficultyUI();
  const dailyHint=document.getElementById('dailyHint');
  let rec={}; try{ rec=JSON.parse(localStorage.getItem('12r_daily')||'{}'); }catch(e){}
  if(dailyHint) dailyHint.textContent = rec.date===todayKey() ? `Concluído hoje ✓ · combo ×${rec.combo||0}` : `Seed de ${todayKey()}`;
  document.getElementById('dailyBtn')?.addEventListener('click',()=>{
    const url=new URL(location.href);
    url.searchParams.set('seed','12R-'+todayKey());
    url.searchParams.set('daily','1');
    location.href=url.toString();
  });
  const towerHint=document.getElementById('towerHint');
  const bestT=Number(localStorage.getItem('12r_tower_best')||0);
  if(towerHint&&bestT>0) towerHint.textContent=`Recorde: andar ${bestT}`;
  document.getElementById('towerBtn')?.addEventListener('click',()=>{ towerMode=true; worldRun.active=false; towerFloor=1; pendingStage=0; showSelection(); });
  document.getElementById('mapBackBtn')?.addEventListener('click',()=>{ closeMapScreen(); sfxSelect(); });
  document.getElementById('shopBtn')?.addEventListener('click',()=>openPanel('shopScreen'));
  document.getElementById('achBtn')?.addEventListener('click',()=>openPanel('achScreen'));
  document.getElementById('coachNext')?.addEventListener('click',()=>{ coachStep++; renderCoach(); sfxSelect(); });
  document.getElementById('storyLayer')?.addEventListener('click',(e)=>{ if(e.target.id!=='storySkip') advanceStory(); });
  document.getElementById('storySkip')?.addEventListener('click',skipStory);
  document.getElementById('shareDailyBtn')?.addEventListener('click',async(e)=>{
    await copyTextToClipboard(buildDailyShareText());
    e.target.textContent=T('✓ Copiado! Cole no grupo','✓ Copied! Paste it anywhere');
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
  }));
  applyLanguage();
  if(IS_DAILY_RUN){ towerMode=false; worldRun.active=false; pendingStage=0; showSelection(); }
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
    document.getElementById('introScreen')?.classList.remove('show');
    if(!localStorage.getItem('12r_lang_set')) document.getElementById('langScreen')?.classList.add('show');
    else maybeShowLogin();
    sfxSelect();
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

/* Gerador de username: Título+Nome com fallbacks na ordem exata:
   Nome, Nome+Dia, Nome+Mês, Nome+Ano, Nome+Dia+Mês, Nome+Dia+Ano, Nome+Mês+Ano, Nome+Dia+Mês+Ano */
function sanitizeNamePart(text){
  return (text||'').normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^A-Za-z0-9 ]/g,'').trim().split(/\s+/)
    .map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join('');
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
  if((pass||'').length<4) return {erro:T('Senha muito curta (mín. 4).','Password too short (min 4).','Contraseña muy corta (mín. 4).')};
  const users=localUsers();
  const hash=await sha256Hex(pass);
  if(users[email]){
    if(users[email].passHash!==hash) return {erro:T('Senha incorreta para este e-mail.','Wrong password for this e-mail.','Contraseña incorrecta para este correo.')};
    account=users[email].account||{email};
  }else{
    users[email]={passHash:hash,account:null};
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
  if(account?.username) chip.innerHTML=`👑 <b>${account.username}</b>`;
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
  if(prev) prev.textContent=onboardState.title&&nome?`${onboardState.title} ${nome.trim()}`:'—';
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
      <div class="pstat"><small>${T('Usuário (ranking)','Username (ranking)','Usuario (ranking)')}</small><b>${account.username}</b></div>
      <div class="pstat"><small>${T('Tratamento','Title','Tratamiento')}</small><b>${account.title}</b></div>
      <div class="pstat"><small>E-mail</small><b>${account.email||'—'}</b></div>
      <div class="pstat"><small>${T('Nascimento','Birth date','Nacimiento')}</small><b>${String(account.birth.d).padStart(2,'0')}/${String(account.birth.m).padStart(2,'0')}/${account.birth.y}</b></div>`;
  }else{
    el.innerHTML=`<p class="account-note">${T('Você joga como Convidado: sem ranking, sem salvamento na nuvem e sem PVP (em breve). Entre para garantir seu nome de usuário!','You play as a Guest: no ranking, no cloud save and no PVP (soon). Sign in to claim your username!','Juegas como Invitado: sin ranking, sin guardado en la nube y sin PVP (pronto). ¡Inicia sesión para reclamar tu usuario!')}</p>`;
  }
  const lb=document.getElementById('accountLoginBtn'), ob=document.getElementById('logoutBtn');
  if(lb) lb.style.display=account?.username?'none':'inline-block';
  if(ob) ob.style.display=account?'inline-block':'none';
}

/* v9.1 · Textos da introdução (relocalizáveis) */
function renderIntroTexts(){
  const lore=document.getElementById('introLore');
  if(lore) lore.textContent=T(
    'Doze reinos, doze coroas, um único Trono. Quando a última aurora tocou as torres de Ygdria, as gemas dos reinos despertaram — e com elas, algo antigo abriu os olhos nas profundezas. Reúna quatro campeões, domine as esferas elementais e devolva a luz ao Trono dos 12 Reinos.',
    'Twelve realms, twelve crowns, a single Throne. When the last dawn touched the towers of Ygdria, the realm gems awakened — and with them, something ancient opened its eyes in the depths. Gather four champions, master the elemental spheres and return the light to the Throne of the 12 Realms.',
    'Doce reinos, doce coronas, un único Trono. Cuando la última aurora tocó las torres de Ygdria, las gemas de los reinos despertaron — y con ellas, algo antiguo abrió los ojos en las profundidades. Reúne a cuatro campeones, domina las esferas elementales y devuelve la luz al Trono de los 12 Reinos.');
  const eyebrow=document.getElementById('introEyebrow');
  if(eyebrow) eyebrow.textContent=T('AS CRÔNICAS DE YGDRIA','THE CHRONICLES OF YGDRIA','LAS CRÓNICAS DE YGDRIA');
  const btn=document.getElementById('introNext');
  if(btn) btn.textContent=T('Começar jornada','Begin the journey','Comenzar la travesía');
}

/* v9.1 · Smoke test automatizado de gameplay: abra com ?qa=smoke
   Joga de verdade: escala time, entra em batalha, dispara habilidade,
   vence a fase e confere obstáculos/objetivos. Banner PASS/FAIL. */
async function runSmokeTest(){
  const results=[];
  const ok=(name,cond)=>results.push({name,pass:!!cond});
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
  try{
    localStorage.setItem('12r_tutorial','1');
    ok('elenco de 12 heróis', KINGDOMS.length===12);
    ok('contrato 3 passivas + 3 ativas', KINGDOMS.every(k=>k.abilities.filter(a=>a.kind==='passive').length===3&&k.abilities.filter(a=>a.kind==='active').length===3));
    ok('8 fases na masmorra', DUNGEON.length===8);
    chosenIds=[0,3,7,11]; pendingStage=0; towerMode=false;
    beginGame(0);
    await wait(600);
    ok('tabuleiro completo', document.querySelectorAll('#board .cell').length===SIZE*SIZE);
    ok('4 heróis na arena', document.querySelectorAll('#partyArena .hero-unit').length===4);
    const hpAntes=enemies[0].hp;
    triggerAbility(11,KINGDOMS[11].abilities[3]);
    await wait(300);
    ok('habilidade causou dano', enemies[0].hp<hpAntes);
    enemies.forEach((e,i)=>{ if(e.hp>0) applyDamageToEnemy(e.hp,3,i); });
    finishRoomIfCleared();
    await wait(900);
    ok('fase concluída', document.getElementById('stageClearOverlay').classList.contains('show')||stageIndex>0);
    await wait(1500);
    loadStage(5); busy=false;
    await wait(350);
    ok('obstáculos nas Dunas', Object.keys(obstaclesMeta).length===3);
    ok('objetivo de coleta ativo', /Colete|esferas/.test(stageObjectiveEl.textContent));
    ok('moedas e XP de perfil operantes', typeof coins==='number'&&typeof profileLevel()==='number');
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
if(new URLSearchParams(location.search).get('qa')==='smoke'){
  window.addEventListener('load',()=>setTimeout(runSmokeTest,400));
}

/* v9.1 · PWA: registra o service worker (apenas em http/https) */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
