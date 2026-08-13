
/* ---------- VersÃ£o Ãºnica do app (fonte da verdade) ---------- */
const V93 = window.YGDRIA_V93 || {};
const APP_VERSION = V93.version || 'v9.3';
const APP_VERSION_LABEL = V93.label || 'VERSÃƒO 9.3';
try {
  const _mv = document.getElementById('menuVersion');
  if (_mv) _mv.textContent = `${APP_VERSION_LABEL} Â· DEMO OFICIAL MOBILE`;
} catch (e) {}

const KINGDOMS = [
  {
    id:'luz', nome:'GalatÃ©ia', reino:'Reino da Luz', classe:'A Luz Divina de Ygdria Â· Rainha Maga',
    color:'#eef2f8', colorLight:'#ffffff', colorDark:'#78869b', gem:'gemDiamond', atk:20,
    img:'assets/cards/galateia-card.png', cardThumb:'assets/thumbs/galateia-card.webp',
    sprite:'assets/characters/runtime-v3/galateia/single-1.png', fxTheme:'radiant', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Fulgor Ofuscante', cd:4, tipo:'embaralharTudo', desc:'A cada 4 turnos, a luz ofusca e embaralha todo o tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'Corte de Luz', tipo:'nextAttackMult', valor:2, desc:'Dobra o dano do prÃ³ximo ataque de GalatÃ©ia.'},
      {kind:'passive',gems:25, name:'Luz da ProteÃ§Ã£o', tipo:'blind', turnos:1, desc:'Cega todos os inimigos por uma rodada; o prÃ³ximo ataque erra.'},
      {kind:'passive',gems:45, name:'Cura Divina', tipo:'healPercent', valor:.20, desc:'Recupera 20% da vida mÃ¡xima do grupo.'},
      {kind:'active',gems:60, name:'ExplosÃ£o de Luz', tipo:'damageAllFromLast', mult:3, desc:'Atinge todos os inimigos com trÃªs vezes o Ãºltimo ataque.'},
      {kind:'active',gems:75, name:'Luz Divina de Ygdria', tipo:'healPercent', valor:.30, desc:'Recupera 30% da vida mÃ¡xima do grupo.'},
      {kind:'active',gems:100, name:'Por Toda a Luz do Universo', tipo:'damageAllPartySum', mult:2, desc:'Atinge todos os inimigos com o dobro da soma dos Ãºltimos ataques do grupo.'}
    ]
  },
  {
    id:'humanos', nome:'Berenice', reino:'Reino dos Humanos', classe:'A Maga da Eternidade Â· Rainha Maga',
    color:'#ff6fa5', colorLight:'#ffd7e8', colorDark:'#7c1f4b', gem:'gemPink', atk:20,
    img:'assets/cards/berenice-card.png', cardThumb:'assets/thumbs/berenice-card.webp',
    sprite:'assets/characters/runtime-v3/berenice/single-1.png', fxTheme:'chronal', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Decreto da Coroa', cd:4, tipo:'drenarTodosECurar', valor:6, curaMult:5, desc:'A cada 4 turnos, todos os herÃ³is perdem 6 de energia e ela recupera 5Ã— o total drenado.'},
    abilities:[
      {kind:'passive',gems:15, name:'CoraÃ§Ã£o Piedoso', tipo:'shieldTurns', valor:360, turnos:2, desc:'Ergue um escudo de vida por dois turnos.'},
      {kind:'passive',gems:25, name:'CoraÃ§Ã£o Puro', tipo:'echoAll', desc:'O dano do Ãºltimo ataque ecoa em todos os inimigos.'},
      {kind:'passive',gems:45, name:'Milagre', tipo:'healPercent', valor:.30, desc:'Recupera 30% da vida mÃ¡xima do grupo.'},
      {kind:'active',gems:60, name:'Ataque das Fronteiras do Universo', tipo:'critBase', mult:5, desc:'Desfere um dano crÃ­tico igual a cinco vezes o ataque base.'},
      {kind:'active',gems:75, name:'Sempre Comigo', tipo:'activateAllUltimates', desc:'Carrega as trÃªs habilidades ativas de todos os aliados.'},
      {kind:'active',gems:100, name:'Por Toda Eternidade', tipo:'lifestealCharges', cargas:3, mult:5, desc:'Os prÃ³ximos trÃªs ataques curam cinco vezes o valor de ataque.'}
    ]
  },
  {
    id:'agua', nome:'Maril', reino:'Reino da Ãgua', classe:'Soberana dos Mares Â· Rainha Maga',
    color:'#174ea6', colorLight:'#91d5ff', colorDark:'#071b4d', gem:'gemSapphire', atk:20,
    img:'assets/cards/maril-card.png', cardThumb:'assets/thumbs/maril-card.webp',
    sprite:'assets/characters/runtime-v3/maril/single-1.png', fxTheme:'tidal', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'MarÃ© Vazante', cd:4, tipo:'lavarColuna', desc:'A cada 4 turnos, uma coluna inteira Ã© lavada e re-preenchida sem conceder energia.'},
    abilities:[
      {kind:'passive',gems:15, name:'Corais Explosivos', tipo:'damageFromLast', mult:2, desc:'Atinge um oponente com duas vezes o Ãºltimo ataque.'},
      {kind:'passive',gems:25, name:'Armadura de Corais', tipo:'reflectTurns', turnos:1, desc:'Protege o grupo e devolve o dano ao inimigo por um turno.'},
      {kind:'passive',gems:45, name:'Cardumes Invasores', tipo:'invulnerableTurns', turnos:2, desc:'Impede que o grupo sofra dano por dois turnos.'},
      {kind:'active',gems:60, name:'Ataque das Fronteiras do Universo', tipo:'critBase', mult:5, desc:'Desfere um dano crÃ­tico igual a cinco vezes o ataque base.'},
      {kind:'active',gems:75, name:'Concha ImpenetrÃ¡vel', tipo:'shieldTurns', valor:620, turnos:3, desc:'Ergue um escudo resistente durante trÃªs turnos.'},
      {kind:'active',gems:100, name:'Abertura dos PortÃµes de Atlantis', tipo:'damageAllFromLast', mult:3, desc:'Atinge todos os inimigos com trÃªs vezes o Ãºltimo combo.'}
    ]
  },
  {
    id:'fogo', nome:'Lucius', reino:'Reino do Fogo', classe:'O Sucessor do DragÃ£o de Ignis Â· Rei Mago',
    color:'#d52232', colorLight:'#ff9d72', colorDark:'#4d0710', gem:'gemRuby', atk:20,
    img:'assets/cards/lucius-card.png', cardThumb:'assets/thumbs/lucius-card.webp',
    sprite:'assets/characters/runtime-v3/lucius/single-1.png', fxTheme:'dragonfire', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Sopro de Brasas', cd:4, tipo:'queimarCruz', desc:'A cada 4 turnos, queima uma cruz de 5 cÃ©lulas; power-ups atingidos sÃ£o destruÃ­dos.'},
    abilities:[
      {kind:'passive',gems:15, name:'Garras do DragÃ£o', tipo:'damageFromHeroLast', mult:2, desc:'Inflige duas vezes o dano do Ãºltimo ataque de Lucius.'},
      {kind:'passive',gems:25, name:'Renascido das Chamas', tipo:'healPercent', valor:.10, desc:'Recupera 10% da vida mÃ¡xima do grupo.'},
      {kind:'passive',gems:45, name:'Chuva de Lava', tipo:'damageAllFixed', valor:100, desc:'Uma chuva vulcÃ¢nica causa 100 de dano em cada inimigo.'},
      {kind:'active',gems:60, name:'Ritual do DragÃ£o', tipo:'doubleRedOnce', desc:'Dobra uma Ãºnica vez a quantidade atual de pedras vermelhas, preservando power-ups.'},
      {kind:'active',gems:75, name:'ExplosÃ£o de Fogo do DragÃ£o', tipo:'dano', valor:500, desc:'Explode o alvo com 500 de dano direto.'},
      {kind:'active',gems:100, name:'Armadura de Fogo Eterna', tipo:'incinerate', valor:50, desc:'AtÃ© o fim da fase, cada ataque acumula Incinerar e causa dano crescente ao longo do tempo.'}
    ]
  },
  {
    id:'natureza', nome:'Ninfa Queen', reino:'Reino da Natureza', classe:'A GuardiÃ£ de Toda a Natureza Â· Rainha Maga',
    color:'#2f9f45', colorLight:'#c9ff9e', colorDark:'#0e451e', gem:'gemEmerald', atk:20,
    img:'assets/cards/ninfa-queen-card.png', cardThumb:'assets/thumbs/ninfa-queen-card.webp',
    sprite:'assets/characters/runtime-v4/ninfa-queen/single-1.png', fxTheme:'verdant', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'RaÃ­zes Famintas', cd:4, tipo:'criarObstaculos', obst:'vine', qtd:2, hits:1, desc:'A cada 4 turnos, raÃ­zes prendem 2 esferas do tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'BenÃ§Ã£o', tipo:'energyAll', valor:10, desc:'Adiciona 10 pontos ao contador de energia de todos os aliados.'},
      {kind:'passive',gems:25, name:'Escudo de Folhas', tipo:'shieldTurns', valor:450, turnos:1, desc:'Protege o grupo contra o prÃ³ximo ataque.'},
      {kind:'passive',gems:45, name:'Vinhas Mortais', tipo:'stunAndDamageFromLast', turnos:3, mult:2, desc:'Prende o inimigo por trÃªs turnos e causa duas vezes o dano do Ãºltimo ataque.'},
      {kind:'active',gems:60, name:'Natureza Morta', tipo:'spawnPowerUps', quantidade:3, desc:'Adiciona trÃªs power-ups aleatÃ³rios ao tabuleiro.'},
      {kind:'active',gems:75, name:'EspÃ­rito da Natureza', tipo:'healPerRealmGem', valor:100, desc:'Cada joia verde no tabuleiro recupera 100 de HP.'},
      {kind:'active',gems:100, name:'Unidade da Natureza', tipo:'damagePerRealmGem', valor:100, desc:'Cada joia verde no tabuleiro adiciona 100 de dano ao ataque.'}
    ]
  },
  {
    id:'terra', nome:'Kallendra', reino:'Reino da Terra', classe:'A Maga Mais Forte Â· Rainha Maga',
    color:'#8b5a2b', colorLight:'#f0bd78', colorDark:'#3c210d', gem:'gemTopaz', atk:20,
    img:'assets/cards/kallendra-card.png', cardThumb:'assets/cards/kallendra-card.png',
    sprite:'assets/characters/runtime-v4/barbara/single-1.png', heroFlip:true, fxTheme:'seismic', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Abalo SÃ­smico', cd:4, tipo:'embaralharLinhas', qtd:2, desc:'A cada 4 turnos, duas linhas do tabuleiro sÃ£o sacudidas e embaralhadas.'},
    abilities:[
      {kind:'passive',gems:15, name:'Golpe da Clava', tipo:'stunAndDamageFromLast', turnos:2, mult:2, desc:'Atinge o inimigo com duas vezes o Ãºltimo ataque e o atordoa por dois turnos.'},
      {kind:'passive',gems:25, name:'Armadura de Pedra', tipo:'stoneArmor', turnos:2, reducao:.5, reflexao:.5, desc:'Reduz o dano recebido e devolve parte dele durante dois turnos.'},
      {kind:'passive',gems:45, name:'Terremoto Destruidor', tipo:'damageAllAndVulnerable', valor:100, turnos:2, mult:1.25, desc:'Causa 100 de dano em todos e reduz a defesa inimiga.'},
      {kind:'active',gems:60, name:'InvocaÃ§Ã£o de Golens', tipo:'summonGolems', quantidade:2, desc:'Invoca dois golens; cada um replica metade do dano de Kallendra atÃ© o fim da missÃ£o.'},
      {kind:'active',gems:75, name:'ForÃ§a Terra', tipo:'damageAllFixed', valor:300, desc:'Atinge todos os inimigos com 300 de dano.'},
      {kind:'active',gems:100, name:'Terra Viva', tipo:'sacrificeGolems', quantidade:2, valor:1000, requiresGolems:2, desc:'Sacrifica dois golens para infligir 1000 de dano ao alvo.'}
    ]
  },
  {
    id:'areia', nome:'Rashid', reino:'Reino da Areia', classe:'A Flor DanÃ§ante do OÃ¡sis de Meriady Â· Rainha Maga',
    color:'#d69a20', colorLight:'#ffe8a3', colorDark:'#5a3105', gem:'gemAmber', atk:20,
    orbColor:'#ffd900', orbColorLight:'#fff8bd', orbColorDark:'#8a6d00',
    img:'assets/cards/rashid-card.png', cardThumb:'assets/thumbs/rashid-card.webp',
    sprite:'assets/characters/runtime-v5/rashid/single-1.png', fxTheme:'desert', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Miragem de Meriady', cd:4, tipo:'criarObstaculos', obst:'sand', qtd:3, hits:1, desc:'A cada 4 turnos, a areia cobre 3 esferas do tabuleiro.'},
    abilities:[
      {kind:'passive',gems:15, name:'Tempestade de Areia', tipo:'blind', turnos:1, desc:'Anula a visÃ£o dos inimigos, fazendo os ataques errarem neste turno.'},
      {kind:'passive',gems:25, name:'LÃ¢mina DanÃ§ante', tipo:'dano', valor:300, desc:'Atinge um inimigo com 300 de dano.'},
      {kind:'passive',gems:45, name:'PirÃ¢mide de Meriady', tipo:'shieldTurns', valor:400, turnos:1, desc:'Adiciona um escudo por uma rodada.'},
      {kind:'active',gems:60, name:'OÃ¡sis no Deserto', tipo:'healFixed', valor:600, desc:'Recupera 600 de vida.'},
      {kind:'active',gems:75, name:'Enigma da Esfinge', tipo:'weakestHalfOrDamage', valor:500, desc:'Com vÃ¡rios inimigos, o mais fraco perde metade da vida; sozinho, recebe 500 de dano.'},
      {kind:'active',gems:100, name:'DanÃ§a das Mil LÃ¢minas', tipo:'damageAllPerRealmGem', valor:70, desc:'Atinge todos os inimigos com 70 de dano para cada peÃ§a amarela no tabuleiro.'}
    ]
  },
  {
    id:'sombras', nome:'Berenice das Sombras', reino:'Reino das Sombras', classe:'A Soberana das Sombras Eternas Â· Rainha Maga',
    color:'#7d245f', colorLight:'#ff9de1', colorDark:'#170511', gem:'gemObsidian', atk:20,
    orbColor:'#18141f', orbColorLight:'#7b7387', orbColorDark:'#010102',
    img:'assets/cards/berenice-sombras-card.png', cardThumb:'assets/thumbs/berenice-sombras-card.webp',
    sprite:'assets/characters/runtime-v5/berenice-sombras/single-1.png', fxTheme:'void', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'VÃ©u do Eclipse', cd:4, tipo:'ocultarCores', qtd:5, turnos:3, desc:'A cada 4 turnos, 5 esferas tÃªm a cor oculta por 3 turnos.'},
    abilities:[
      {kind:'passive',gems:15, name:'CoraÃ§Ã£o Impiedoso', tipo:'vulnerableTurns', turnos:1, mult:2, desc:'Cria um campo que dobra o dano recebido pelo inimigo por um turno.'},
      {kind:'passive',gems:25, name:'CoraÃ§Ã£o Impuro', tipo:'reflectTurns', turnos:2, desc:'Todo o dano recebido volta ao inimigo durante dois turnos.'},
      {kind:'passive',gems:45, name:'MaldiÃ§Ã£o', tipo:'damageTargetPercent', valor:.1, desc:'Retira 10% da vida do alvo inimigo que atacou no Ãºltimo turno.'},
      {kind:'active',gems:60, name:'Sombra do Universo', tipo:'critBaseAll', mult:12, desc:'Desfere em todos os inimigos um crÃ­tico devastador de doze vezes o ataque base.'},
      {kind:'active',gems:75, name:'Todas as Sombras Venham a Mim', tipo:'doubleRealmOnce', desc:'Dobra uma Ãºnica vez o nÃºmero atual de blocos das sombras.'},
      {kind:'active',gems:100, name:'Por Toda a EscuridÃ£o', tipo:'nextAttackPerRealmGem', desc:'Multiplica o prÃ³ximo ataque pelo total de blocos das sombras no tabuleiro.'}
    ]
  },
  {
    id:'raio', nome:'Mardogear', reino:'Reino do Raio', classe:'Senhor dos TrovÃµes e da DestruiÃ§Ã£o Â· Rei Mago',
    color:'#8b2fc9', colorLight:'#d9a6ff', colorDark:'#2e0a4d', gem:'gemAmethyst', atk:20,
    img:'assets/cards/mardogear-card.png', cardThumb:'assets/cards/mardogear-card.png',
    sprite:'assets/characters/runtime-v6/mardogear/single-1.png', heroFlip:true, fxTheme:'storm', rarity:'DIVINA', stars:7,
    stageAbility:{nome:'Curto-Circuito', cd:4, tipo:'sobrecarga', limite:50, desc:'A cada 4 turnos, o herÃ³i mais carregado perde toda energia acima de 50.'},
    abilities:[
      {kind:'passive',gems:15, name:'Ataque de Raios', tipo:'dano', valor:100, desc:'Um raio cai no inimigo infligindo 100 de dano.'},
      {kind:'passive',gems:25, name:'Estrondo', tipo:'atordoa', valor:1, desc:'Atordoa todos os inimigos por 1 turno.'},
      {kind:'passive',gems:45, name:'Campo MagnÃ©tico', tipo:'reflectTurns', turnos:3, desc:'Coloca um escudo magnÃ©tico e devolve os ataques recebidos por 3 turnos.'},
      {kind:'active',gems:60, name:'Full Power', tipo:'empowerAttacks', cargas:3, mult:2, desc:'Adiciona 3 esferas de energia ao redor dele; cada esfera dobra seu ataque. Cada uma dura 1 turno.'},
      {kind:'active',gems:75, name:'TrovÃ£o Fulminante', tipo:'dano', valor:1000, desc:'Atinge o inimigo com um raio infligindo 1000 de dano.'},
      {kind:'active',gems:100, name:'Hecatombe', tipo:'hecatombe', valor:150, desc:'Atinge todos os inimigos com 150 de dano para cada peÃ§a roxa no tabuleiro e inflige os efeitos de atordoar e eletrocutar.'}
    ]
  },
  {
    id:'vento', nome:'Sophitia', reino:'Reino do Vento', classe:'A Rainha Harpia Â· Rainha Maga',
    color:'#6cb8e8', colorLight:'#e6f7ff', colorDark:'#1d5a80', gem:'gemAero', atk:20,
    orbColor:'#5cc3f7', orbColorLight:'#eaf9ff', orbColorDark:'#155a85',
    img:'assets/cards/sophitia-card.png', cardThumb:'assets/cards/sophitia-card.×wëÛh‘éì¶»§q«^t]K]K\Ü^S˜[YN˜	ÛÛ˜›Ø\™İ]K]_H	Û›ÛY_X\Ù\›˜[YKÜ™X]Y]‘]K››İÊ
_NÃBˆ\œÚ\İXØÛİ[

NÃBˆØİ[Y[™Ù][[Y[RY
	ÛÛ˜›Ø\™ØÜ™Y[‰ÊOË˜Û\ÜÓ\İœ™[[İ™J	ÜÚİÉÊNÃBˆÙ]˜]Tİ]\Ê
™[K]š[™ÊJK	ØXØÛİ[™\Ü^S˜[Y_HXÙ[ÛÛYK	ØXØÛİ[™\Ü^S˜[Y_HX0¨PšY[™[šYÊJK	ØXØÛİ[™\Ü^S˜[Y_HX
K	Üİ\Ü	ÊNÃBŸCB™[˜İ[Ûˆ™[™\XØÛİ[[™[

^ÃBˆÛÛœİ[YØİ[Y[™Ù][[Y[RY
	ØXØÛİ[[™›ÉÊNÃBˆYŠY[
H™]\›ÃBˆYŠXØÛİ[Ë\Ù\›˜[YJ^ÃBˆ[š[›™\’SXBˆ]ˆÛ\ÜÏHœİ]ÛX[‰Õ
	Õ\İpè\š[È
˜[šÚ[™ÊIË	Õ\Ù\›˜[YH
˜[šÚ[™ÊIË	Õ\İX\š[È
˜[šÚ[™ÊIÊ_OÜÛX[‰ØXØÛİ[\Ù\›˜[Y_OØÙ]ƒBˆ]ˆÛ\ÜÏHœİ]ÛX[‰Õ
	Õ˜][Y[ÉË	Õ]IË	Õ˜][ZY[ÉÊ_OÜÛX[‰Ó
XØÛİ[]J_OØÙ]ƒBˆ]ˆÛ\ÜÏHœİ]ÛX[‘K[XZ[ÜÛX[‰ØXØÛİ[™[XZ[	ø %	ßOØÙ]ƒBˆ]ˆÛ\ÜÏHœİ]ÛX[‰Õ
	Ó˜\ØÚ[Y[ÉË	Ğš\]IË	Ó˜XÚ[ZY[ÉÊ_OÜÛX[‰Ôİš[™ÊXØÛİ[˜š\™
KœYİ\
‹	Ì	Ê_KÉÔİš[™ÊXØÛİ[˜š\›JKœYİ\
‹	Ì	Ê_KÉØXØÛİ[˜š\_OØÙ]˜ÃBˆY[Ù^ÃBˆ[š[›™\’SXÛ\ÜÏH˜XØÛİ[[›İH‰Õ
	Õ›Øğêˆ›ÙØHÛÛ[ÈÛÛšYYÎˆÙ[H˜[šÚ[™ËÙ[HØ[˜[Y[È˜H]™[HHÙ[H”
[Hœ™]™JKˆ[™H\˜HØ\˜[\ˆÙ]H›ÛYHH\İpè\š[ÈIË	Ö[İH^H\ÈHİY\İˆ›È˜[šÚ[™Ë›ÈÛİYØ]™H[™›È”
ÛÛÛŠKˆÚYÛˆ[ˆÈÛZ[H[İ\ˆ\Ù\›˜[YHIË	ÒYYØ\ÈÛÛ[È[š]YÎˆÚ[ˆ˜[šÚ[™ËÚ[ˆİX\™YÈ[ˆHX™HHÚ[ˆ”
›ÛÊKˆ0¨R[šXÚXHÙ\ÚpìÛˆ\˜H™XÛ[X\ˆH\İX\š[ÈIÊ_OÜ˜ÃBˆCBˆÛÛœİYØİ[Y[™Ù][[Y[RY
	ØXØÛİ[ÙÚ[‰ÊKØYØİ[Y[™Ù][[Y[RY
	ÛÙÛİ]‰ÊNÃBˆYŠŠH‹œİ[K™\Ü^OXXØÛİ[Ë\Ù\›˜[YOÉÛ›Û™IÎ‰Ú[›[™KX›ØÚÉÎÃBˆYŠØŠHØ‹œİ[K™\Ü^OXXØÛİ[ÉÚ[›[™KX›ØÚÉÎ‰Û›Û™IÎÃBŸCBƒB‹ÊˆKŒˆ0­ÈP‘T•THSHU‘RT“ÎˆH\İ0ìÜšXHÙšXÚX[ÛØ™H[šHH[šHÈ›Ù\0êKBˆÛÛHpîœÚXØHH[›ÙpéğèÛÈH›İ0èÛÈ[\‹ˆ^ÈÙšXÚX[Yš[šYÈ[ÈÜšXYÜ‹ˆ
‹ÃB™[˜İ[Ûˆ[›ÔİÜT\˜YÜ˜\Ê
^ÃBˆ™]\›ˆÃBˆ
	ÖYÙšXH\˜H[H][™ÈÛXYÈÜˆİY\œ˜\ËØ[ÜÈH\İZpéğèÛËˆ™\˜\ÈpèYÚXØ\ËİY\œ™Z\›ÜÈ[\Xğè]™Z\ÈHXYÛÜÈÙ\›ÜÛÜË˜]˜]˜[H˜][\ÈÜˆÛØ™\˜[šXK‰ËBˆ	ÖYÙšXHØ\ÈHÛÜ›ÛÛœİ[YYHØ\‹Ú[ÜÈ[™\İXİ[Û‹ˆXYÚXØ[™X\İË™[[\ÜÈØ\œš[ÜœÈ[™İÙ\™[XYÙ\ÈØYÙY˜]\È›ÜˆÛİ™\™ZYÛK‰ËBˆ	ÖYÙšXH\˜H[ˆ][™ÈÛXYÈÜˆİY\œ˜\ËØ[ÜÈH\İXØÚpìÛ‹ˆ™\İX\ÈpèYÚXØ\ËİY\œ™\›ÜÈ[\XØX›\ÈHXYÛÜÈÙ\›ÜÛÜÈXœ˜X˜[ˆ˜][\ÈÜˆHÛØ™\˜[°ëXK‰ÊKBˆ
	Ñ›ÚH]X[™È[HÙ\ˆÚ[XYÈ]\›šYYK™\ÛÛ™]HÛÛØØ\ˆ[Hš[HH\ÜÙHØ[ÜËˆ\ØÛÛ[™È[XHšX›ÈH[X[›ÜÈ\˜HÙ\™[HÙ]\È™Yİ[YÜ™\Ë‰ËBˆ	Õ]Ø\ÈÚ[ˆH™Z[™ÈØ[Y]\›š]HXÚYYÈ][ˆ[™È\ÈÚ[ÜËˆÚÛÜÚ[™ÈHšX™HÙˆ[X[œÈÈ™H\ˆ™Yİ[]ÜœË‰ËBˆ	ÑYHİX[™È[ˆÙ\ˆ[XYÈ]\›šYYXÚYpìÈÛ™\ˆš[ˆH\ÙHØ[ÜËˆ[YÚY[™ÈH[˜HšXHH[X[›ÜÈÛÛ[Èİ\È™Yİ[YÜ™\Ë‰ÊKBˆ
	Ñ[HÙ\\›İHÈ][™È[HLˆ™Z[›ÜËÛÛØØ[™ÈÈ]YHÚ[[İHH™Z[›È[X[›È›ÈÙ[›ÈHÙÜÈÜÈİ]›ÜË‰ËBˆ	ÔÚH]šYYHÛÜ›[ÈLˆ™X[\ËXÚ[™ÈÚ]ÚHØ[YH[X[ˆ™X[H]HÙ[\ˆÙˆ[Hİ\œË‰ËBˆ	Ñ[HÙ\\°ìÈ[][™È[ˆLˆ™Z[›ÜËÛÛØØ[™È[]YH[pìÈ™Z[›È[X[›È[ˆ[Ù[›ÈHÙÜÈÜÈ[pè\Ë‰ÊKBˆ
	Ó^‹ÛÛXœ˜\Ë›ÙÛË0àYİXK™[Ë\œ˜K˜]\™^˜K˜Z[ÜË\™ZXKÚ]˜KÙ[ÈHÈ™Z[›ÈÜÈ[X[›ÜË‰ËBˆ	ÓYÚÚYİÜËš\™KØ]\‹Ú[™X\˜]\™KYÚš[™ËØ[™˜Z[‹XÙH[™H™X[HÙˆ[X[œË‰ËBˆ	Ó^‹ÛÛXœ˜\ËYYÛËYİXKšY[ËY\œ˜K˜]\˜[^˜K˜^[ÜË\™[˜K]šXKY[ÈH[™Z[›ÈHÜÈ[X[›ÜË‰ÊKBˆ
	Ñ\ÜÙ\ÈğèÛËÜÈLˆ™Z[›ÜÈIË	Õ\ÙH\™KHLˆ™X[\ÈIË	ğ¨Q\ÛÜÈÛÛ‹ÜÈLˆ™Z[›ÜÈIÊKBˆ
	ÑH\ÜÚ[KYÙšXHš]™]H[H^ˆÜˆğêXİ[ÜËˆØYH™Z[›ÈÛİ™\›˜YÈÜˆÙ]H™ZHXYÛÈİH˜Z[šHXYØHH›İYÚYÜÈÜˆÙ]\ÈØ]˜[Z\›ÜË‰ËBˆ	Ğ[™ÛËYÙšXH]™Y[ˆXXÙH›ÜˆÙ[\šY\ËˆXXÚ™X[H[YH]ÈXYÙHÚ[™ÈÜˆXYÙH]YY[ˆ[™›İXİYH]ÈÛšYÚË‰ËBˆ	ÖH\ğëKYÙšXHš]špìÈ[ˆ^ˆ\˜[HÚYÛÜËˆØYH™Z[›ÈÛØ™\›˜YÈÜˆİH™^HXYÛÈÈ™Z[˜HXYØHH›İYÚYÈÜˆİ\ÈØX˜[\›ÜË‰ÊKBˆ
	ÓX\ÈÈ]YHH]\›šYYH°èÛÈ\Ü\˜]˜K0êH]YH[İpê[HH›Ü˜HÜÈLˆ™Z[›ÜÈİ\™Ú\šXK‹‹‰ËBˆ	Ğ]Ú]]\›š]HY›İ^Xİ‹‹ˆ\È]ÛÛY[Û™Hœ›ÛH™^[Û™HLˆ™X[\ÈÛİ[\X\‹‹‹‰ËBˆ	Ô\›ÈÈ]YHH]\›šYY›È\Ü\˜X˜K‹‹ˆ\È]YH[İZY[ˆHY\˜HHÜÈLˆ™Z[›ÜÈ\\™XÙ\°ëXK‹‹‰ÊCBˆNÃBŸCB™[˜İ[Ûˆ™[™\’[›Õ^Ê
^ÃBˆÛÛœİÜ˜]ÛYØİ[Y[™Ù][[Y[RY
	ØÜ˜]Û^	ÊNÃBˆYŠÜ˜]Û
HÜ˜]Ûš[›™\’SZ[›ÔİÜT\˜YÜ˜\Ê
K›X\
O˜‰ÜOÜ˜
Kš›Ú[Š	ÉÊNÃBˆÛÛœİ^YXœ›İÏYØİ[Y[™Ù][[Y[RY
	Ú[›Ñ^YXœ›İÉÊNÃBˆYŠ^YXœ›İÊH^YXœ›İË^ÛÛ[U
	ĞTÈÔ°å’PĞTÈHQÑ’PIË	ÕHÒ“Ó’PÓTÈÑˆQÑ’PIË	ÓTÈÔ°äÓ’PĞTÈHQÑ’PIÊNÃBˆÛÛœİYØİ[Y[™Ù][[Y[RY
	Ú[›Ó™^	ÊNÃBˆYŠŠH‹^ÛÛ[U
	Ô[\ˆ8£ëIË	ÔÚÚ\8£ëIË	ÔØ[\ˆ8£ëIÊNÃBŸCB‹Êˆ<'ã­HpîœÚXØHH[›ÙpéğèÛÎˆ\œZ›ÈİX]™HÙ\˜YÈ›ÈÙX]Y[È
\˜H›È[\‹Ùš[JH
‹ÃB›][›Ó]\ÚXÓÛY˜[ÙK[›Ó]\ÚXÕ[Y\[[ÃB™[˜İ[Ûˆİ\[›Ó]\ÚXÊ
^ÃBˆYŠ[›Ó]\ÚXÓÛŠH™]\›ÃBˆÛÛœİİY[œİ\™P]Y[Ê
NÈYŠXİ
H™]\›ÃBˆ[›Ó]\ÚXÓÛ]YNÃBˆÛÛœİXÛÜ™\ÏVÖÌŒŒÍËŒ‹ÌK—KÌNM‹‹KLË×KÌMÍ‹ŒŒŒK—KÌNM‹‹KLË×WNÃBˆ]˜\œ˜OLÃBˆÛÛœİÛÜJ
OOÃBˆYŠZ[›Ó]\ÚXÓÛŠH™]\›ÃBˆÛÛœİ›İ\ÏXXÛÜ™\ÖØ˜\œ˜IXXÛÜ™\Ë›[™İNÈ˜\œ˜JÊÎÃBˆ™Y\
›İ\ÖÌKÌ‹KK	ÜÚ[™IËŒJNÃBˆ›İ\Ë™›Ü‘XXÚ

‹JOOÈ™Y\
‹MK	İšX[™ÛIËŒKJŒMJNÈ™Y\
ŠŒ‹MK	ÜÚ[™IËŒ‹JŒMJÌŒ
NÈJNÃBˆ[›Ó]\ÚXÕ[Y\\Ù][Y[İ]
ÛÜN
NÃBˆNÃBˆÛÜ

NÃBŸCB™[˜İ[ÛˆİÜ[›Ó]\ÚXÊ
^È[›Ó]\ÚXÓÛY˜[ÙNÈÛX\•[Y[İ]
[›Ó]\ÚXÕ[Y\ŠNÈ[›Ó]\ÚXÕ[Y\[[ÈCBƒB‹ÊˆKŒH0­ÈÛ[ÚÙH\İ]]ÛX]^˜YÈHØ[Y\^NˆXœ˜HÛÛHÜXO\Û[ÚÙCBˆ›ÙØHH™\™YNˆ\ØØ[H[YK[˜H[H˜][K\Ü\˜HXš[YYKBˆ™[˜ÙHH˜\ÙHHÛÛ™™\™HØœİ0èXİ[ÜËÛØš™]]›ÜËˆ˜[›™\ˆTÔËÑRSˆ
‹ÃB˜\Ş[˜È[˜İ[Ûˆ[”Û[ÚÙU\İ

^ÃBˆÛÛœİ™\İ[ÏV×NÃBˆÛÛœİÚÏJ˜[YKÛÛ™
OOœ™\İ[Ëœ\Ú
Û˜[YK\ÜÎˆHXÛÛ™JNÃBˆÛÛœİØZ]J\ÊOO›™]È›ÛZ\ÙJOœÙ][Y[İ]
‹\ÊJNÃBˆ^ÃBˆØØ[İÜ˜YÙKœÙ]][J	ÌLœ—İ]ÜšX[	Ë	ÌIÊNÃBˆÚÊ	ÌLˆ\°ìÚ\È]š[›ÜÈ
ÈØ\\È›Ùğè]™Z\ÉËÒS‘ÑÓTË™š[\ŠÏOšËœ˜\š]OOOIÑU’SIÊK›[™İOOLLˆ	‰ˆÒS‘ÑÓTË›[™İLMŠNÂˆÚÊ	Í›İ™[œÈ\™[™^™\ÈÛÛHØ\\ÈHÚXš\ÉËÉØ™\™[šXÙKZ›İ™[IË	ÙØ[]ZXKZ›İ™[IË	ØYšY[Z›İ™[IË	ØXÜ]XKZ›İ™[I×K™]™\JYOÂˆÛÛœİÏRÒS‘ÑÓTË™š[™
Ø\™O˜Ø\™šYOOZY
NÂˆ™]\›ˆÉ‰šËœ˜\š]OOOIÓ“Ô“PS	É‰šËœİ\œÏOOLI‰šË˜]ÏOOL‰‰šËš[YÉ‰šËœÜš]NÂˆJJNÂˆÊˆX™[HÙšXÚX[H\İ™[\Îˆx¦!OLÌH¸¦!OLTÌHø¦!OL”ÌH8¦!OLÔÌHx¦!OLÔÌPH¸¦!OLÔÌHø¦!OLÔÌĞH
‹ÃBˆÛÛœİÕT—ÒÒU^ÌN–ÌK–ÌKKÎ–Ì‹K–ÌËKN–ÌËWK–ÌË—KÎ–ÌË×_NÃBˆÚÊ	ØÛÛ˜]ÈHXš[YY\ÈÜˆ\İ™[\ÉËÒS‘ÑÓTË™]™\JÏOÃBˆYŠË˜\Ú]
H™]\›ˆË˜Xš[]Y\Ë›[™İŒÈÊˆÚ][\™\ÜÛÈ˜H\HHØ\H™]˜[XÙH
‹ÃBˆÛÛœİÜWOTÕT—ÒÒUÚËœİ\œß×_ÌË×NÃBˆ™]\›ˆË˜Xš[]Y\Ë™š[\ŠOšÚ[™OOIÜ\ÜÚ]™IÊK›[™İOO\	‰šË˜Xš[]Y\Ë™š[\ŠOšÚ[™OOIØXİ]™IÊK›[™İOOXNÃBˆJJNÃBˆÚÊ	ÌL˜\Ù\È›È™Z[›ÈÜÈ[X[›ÜÉËÓÔ“ÖÌK™˜\Ù\Ë›[™İOOLL
NÃBˆÚÊ	ÍLZ\ÜğíY\ÈÙšXÚXZ\ÉËÓÔ“ÖÌK™˜\Ù\Ë™]™\JO™‹›Z\ÜÛÙ\Ë›[™İOOMJJNÃBˆÚÜÙ[’YÏVÌËËLWNÈ[™[™ÔİYÙOLÈİÙ\“[ÙOY˜[ÙNÃBˆÛÜ›[^ØXİ]™NYK˜\ÙNŒš]™[Œ_NÃBˆ™YÚ[‘Ø[YJ
NÃBˆ]ØZ]ØZ]
Œ
NÃBˆÚÊ	İX[Z\›ÈÛÛ\]ÉËØİ[Y[œ]Y\TÙ[XİÜ[
	ÈØ›Ø\™˜Ù[	ÊK›[™İOOTÒV‘J”ÒV‘JNÃBˆÚÊ	Í\°ìÚ\È˜H\™[˜IËØİ[Y[œ]Y\TÙ[XİÜ[
	ÈÜ\P\™[˜Hš\›Ë][š]	ÊK›[™İOOM
NÃBˆÛÛœİ[\ÏY[™[ZY\ÖÌKšÃBˆšYÙÙ\Xš[]JLKÒS‘ÑÓTÖÌLWK˜Xš[]Y\ÖÌ×JNÃBˆ]ØZ]ØZ]
Ì
NÃBˆÚÊ	ÚXš[YYHØ]\ÛİH[›ÉË[™[ZY\ÖÌKš[\ÊNÃBˆ[™[ZY\Ë™›Ü‘XXÚ

KJOOÈYŠKšŒ
H\Q[XYÙUÑ[™[^JKšËJNÈJNÃBˆš[š\Ú›ÛÛRYÛX\™Y

NÃBˆ]ØZ]ØZ]
L
NÃBˆÚÊ	ÛZ\ÜğèÛÈÛÛ˜ÛpëYIËØİ[Y[™Ù][[Y[RY
	ÜİYÙPÛX\“İ™\›^IÊK˜Û\ÜÓ\İ˜ÛÛZ[œÊ	ÜÚİÉÊ_ÛÜ›[‹›š]™[ŒJNÃBˆ]ØZ]ØZ]
LŒ
NÃBˆÊˆXš[YYHH˜\ÙNˆ[İÜˆ^Xİ]HY™Z]ÈH[š[ZYÛËXØ\HÙ[H]YXœ˜\ˆÈX[Z\›È
‹ÃBˆXÙSØœİXÛ\ÊÜİÛ™NŒ‹XÙNŒ_JNÃBˆÚÊ	ÛØœİ0èXİ[ÜÈÜ\˜[\ÉËØš™XİšÙ^\ÊØœİXÛ\ÓY]JK›[™İOOLÊNÃBˆÛÛœİ˜ZÙTĞO^Û›ÛYN‰ÔPIËÙŒK\Î‰İ›ØØ\ÛÜ™\ÉË]ŒŸNÃBˆ^XÔİYÙPXš[]J[™[ZY\ÖÌ_ßK˜ZÙTĞJNÃBˆÚÊ	ÚXš[YYHH˜\ÙH^Xİ]IËØİ[Y[œ]Y\TÙ[XİÜ[
	ÈØ›Ø\™˜Ù[	ÊK›[™İOOTÒV‘J”ÒV‘JNÃBˆÚÊ	ÌŒXš[YY\ÈH˜\ÙHYš[šY\ÉËÒS‘ÑÓTË™š[\ŠÏOšËœİYÙPXš[]I‰šËœİYÙPXš[]K››ÛYJK›[™İLŒ
NÃBˆÊˆ™Z[šXÚX\ˆ˜\ÙH•SĞH›ÛH0è[[È
Ü0èÛÈÈ0è›[›ÊH
‹ÃBˆ™\İ\İ\œ™[İYÙJ
NÃBˆ]ØZ]ØZ]
L
NÃBˆÛÛœİ›ÛY\Ñ[[ÏVÉÓ[[È°î›šXÛÉË	ÔÙ[[™[HHY˜IË	ÓØ›È˜]YÜ‰Ë	Ñ\ÜXİ›ÈY[›Ü‰Ë	ÔÙ\›È\È™]˜\ÉË	Ñ˜YğèÛÈØ\›Y\Ú[IË	Ñ˜YğèÛÈ\ÈÛÛXœ˜\É×NÃBˆÚÊ	Ü™Z[šXÚX\ˆ˜\ÙHšXØH›È][™ÈÙšXÚX[	ËÛÜ›[‹˜Xİ]™OOO]YH	‰ˆ[™[ZY\Ë™]™\JLOˆ[›ÛY\Ñ[[Ëš[˜ÛY\ÊL‹›˜[YJJJNÃBˆÚÊ	Ù°ìÜ›][HHLÌÌÌMIËQ‘’PÕSWÓUSË™˜XÚ[š˜XİÜOOML	‰ˆQ‘’PÕSWÓUSË››Ü›X[š˜XİÜOOLÌ	‰ˆQ‘’PÕSWÓUSËœ\ØY[Ëš˜XİÜOOLMJNÃBˆÊˆLˆ\ØØY\ÈğëXÛXØ\ÈHÛÜ™\È[XY\ÎˆØYH™Z[›È[šXÚXHH°ìÜšXH›İpéğèÛÈH
‹ÃBˆÚÊ	ÌLˆ[X[°éØ\ÈğëXÛXØ\ÈHÙ[X\ÉËØš™XİšÙ^\ÊSQQÓÔ‘TŠK›[™İOOLLˆ	‰ˆØš™Xİ™[šY\ÊSQQÓÔ‘TŠK™]™\J
ÚYÙ\WJOOœÙ\K›[™İOOM	‰œÙ\VÌOOOZY	‰œÙ\K™]™\JO’ÒS‘ÑÓTËœÛÛYJÏOšËšYOO\ŠJJJNÂˆÚÊ	ÙÙ[X\È\Ø[HHÛÜ‹X˜\ÙHÈ™Z[›ÈHğìÈ]Y[HÛÛH™\]péğèÛÉË


OOÂˆÛÛœİÜšYÚ[˜[VË‹‹PÕU‘WNÂˆÛÛœİ›İ™[ORÒS‘ÑÓTË™š[™[™^
ÏOšËšYOOIØ™\™[šXÙKZ›İ™[IÊNÂˆÛÛœİYšY[RÒS‘ÑÓTË™š[™[™^
ÏOšËšYOOIØYšY[Z›İ™[IÊNÂˆÛÛœİXÜ]XORÒS‘ÑÓTË™š[™[™^
ÏOšËšYOOIØXÜ]XKZ›İ™[IÊNÂˆÛÛœİ›ÙÛÏRÒS‘ÑÓTË™š[™[™^
ÏOšËšYOOIÙ›ÙÛÉÊNÂˆPÕU‘OVÚ›İ™[KXÜ]XK›ÙÛËÒS‘ÑÓTË™š[™[™^
ÏOšËšYOOIÙÙ[ÉÊWNÂˆÛÛ\]P˜]QÙ[PÛÛÜœÊ
NÂˆÛÛœİÛÛÏX˜]QÙ[PÛÛÜœÖÚ›İ™[WOË˜ÏOO\™X[SÜ˜Š	Ú[X[›ÜÉÊOË˜È	‰ˆ˜]QÙ[PÛÛÜœÖØXÜ]XWOË˜ÏOO\™X[SÜ˜Š	ØYİXIÊOË˜ÎÂˆPÕU‘OVÚ›İ™[KYšY[XÜ]XK›ÙÛ×NÂˆÛÛ\]P˜]QÙ[PÛÛÜœÊ
NÂˆÛÛœİ™\]YOX˜]QÙ[PÛÛÜœÖÚ›İ™[WOË˜ÏOO\™X[SÜ˜Š	Ú[X[›ÜÉÊOË˜È	‰ˆ˜]QÙ[PÛÛÜœÖØYšY[OË˜ÏOO\™X[SÜ˜Š	Û^‰ÊOË˜È	‰ˆ˜]QÙ[PÛÛÜœÖØYšY[OËšXÛÛOORÒS‘ÑÓTË™š[™
ÏOšËšYOOIÚ[X[›ÜÉÊOË˜ÛÛÜÂˆPÕU‘O[ÜšYÚ[˜[ÂˆÛÛ\]P˜]QÙ[PÛÛÜœÊ
NÂˆ™]\›ˆÛÛÉ‰œ™\]YNÂˆJJ
JNÂˆÊˆKŒˆ0­ÈÛÛ˜]ÜÈ›İ›ÜÈ
‹ÃBˆÚÊ	ÙYšXİ[YHY°ëXÚ[
°ë]™Z\ÊIËHQQ‘’PÕSWÓUSË™YšXÚ[	‰ˆQ‘’PÕSWÓUSË™YšXÚ[š˜XİÜOOLÌ	‰ˆ\[Ùˆ[[™[ZY\Ğ]XÚÓ[ÙOOOIÙ[˜İ[Û‰ÊNÃBˆÚÊ	ÌÈÜ˜[™\È[X[°éØ\È›ÛYXY\ÉËSPSÑTË›[™İOOLÈ	‰ˆSPSÑTË™]™\JOO˜K›Y[Xœ›ÜË›[™İOOM
H	‰ˆSPSÑTÖÌK››ÛYKš[˜ÛY\Ê	ÓYÛÉÊH	‰ˆSPSÑTÖÌWK››ÛYKš[˜ÛY\Ê	Ñ˜YğèÛÉÊH	‰ˆSPSÑTÖÌ—K››ÛYKš[˜ÛY\Ê	Ğ˜\š[Û‰ÊJNÃBˆÚÊ	ÛÚ˜HÛÛHŒÛÛœİ[pë]™Z\ÉËÒÔÒUSTË›[™İOOLŒ	‰ˆÒÔÒUSTË™š[\ŠOOšK\ÛÏOOIØ˜][IÊK›[™İLLˆ	‰ˆ\[Ùˆ\Ø\’][P˜][OOOIÙ[˜İ[Û‰ÊNÃBˆÚÊ	ÛÙÚ[ˆpè\š[ÎˆÚXÛÈHÈX\ÉËÑÒS—Ô‘UĞT‘Ë›[™İOOMÈ	‰ˆÑÒS—Ô‘UĞT‘ÖÍ—K˜ÏOON
NÃBˆÚÊ	ÕÜœ™HH]\›šYYNˆH\œÛÛ˜YÙ[KØ[™\ˆ
ÈÙ[°è\š[È˜\ÙHIË


OOÈÛÛœİXZ[İÙ\”İYÙJJNÈ™]\›ˆ‹™[™[ZY\Ë›[™İOOLH	‰ˆ‹˜™Õ\›OOIØ\ÜÙ]ËØ™ËÚ[X[›ÜËÙ˜\ÙKLKšœÉÈ	‰ˆZ[İÙ\”İYÙJJÒÒS‘ÑÓTË›[™İ
K™[™[ZY\ÖÌKš‹™[™[ZY\ÖÌKšÈJJ
JNÃBˆÚÊ	İ[Y\ˆHZ\ÜğèÛÈ
È[ØÚ[H[H˜][IËHYØİ[Y[™Ù][[Y[RY
	ÛZ\ÜÚ[Û•[Y\‰ÊH	‰ˆHYØİ[Y[™Ù][[Y[RY
	Û[ØÚ[P‰ÊH	‰ˆHYØİ[Y[™Ù][[Y[RY
	Û[ØÚ[TØÜ™Y[‰ÊJNÃBˆÚÊ	Û]™Z\›ÈH\İ0ìÜšXH
È\°èYÜ˜Y›ÜÊIËHYØİ[Y[™Ù][[Y[RY
	ØÜ˜]ÛØÜ›Û	ÊH	‰ˆ[›ÔİÜT\˜YÜ˜\Ê
K›[™İOOMÊNÃBˆÚÊ	Ù˜[\ÈH[˜YHÜÈ[š[ZYÛÜÉËØš™XİšÙ^\ÊS‘SVWÓS‘TÊK›[™İLŒÈ	‰ˆ\[Ùˆ[™[^S[™Q›ÜOOIÙ[˜İ[Û‰ÊNÃBˆÚÊ	ÓØ›È˜Z]›ÜÛÈ[˜Ø\˜HÈÙ[›ÈH\™[˜IËSPS“Ô×ÑUTTË›Ø›Ô˜Z]›ÜÛË™›\OO]YJNÂˆÚÊ	Û[ÙY\ÈHH\™š[Ü\˜[\ÉË\[ÙˆÛÚ[œÏOOIÛ[X™\‰É‰\[Ùˆ›Ùš[S]™[

OOOIÛ[X™\‰ÊNÂˆÊˆKŒÈ0­ÈÛÛ˜]ÜÈH\İXš[YYK\™\Ù[péğèÛÈHXÙ\ÜÚXš[YYH
‹ÂˆÚÊ	İKŒÈ\ØHÛÛ™šYİ\˜péğèÛÈÙ[˜[ÜÈLˆ™Z[›ÜÉËTÕ‘T”ÒSÓOOIİKŒÉÈ	‰ˆLËœ™X[\ÏË›[™İOOLLŠNÂˆÚÊ	ØÛÛÜ™[˜YÜˆH˜\Ù\ÈH˜][IË\[ÙˆØ[XØÙ\^Y\’[œ]OOIÙ[˜İ[Û‰È	‰ˆUWÔTÑTËš\Ê	ÚYIÊH	‰ˆUWÔTÑTËš\Ê	Ù[™[ZY\ÉÊH	‰ˆUWÔTÑTËš\Ê	Ü]\ÙY	ÊJNÂˆÚÊ	ğè]Y[ÈÙ\\˜YÈ[HpîœÚXØHHY™Z]ÜÉËHYØİ[Y[™Ù][[Y[RY
	Û]\ÚXÕ›Û[YT˜[™ÙIÊH	‰ˆHYØİ[Y[™Ù][[Y[RY
	ÜÙ›Û[YT˜[™ÙIÊJNÂˆÚÊ	Í\™š\ÈH]X[YYHÜ°èYšXØIËLËœ]X[]OË˜[Y\ÏË›[™İOOM	‰ˆHYØİ[Y[™Ù][[Y[RY
	Ü]X[]TÙ[Xİ	ÊJNÂˆÚÊ	ÌÈ™Xİ\œÛÜÈHXÙ\ÜÚXš[YYIËÉÚYÚÛÛ˜\İÙÙÛIË	Û\™ÙU^ÙÙÛIË	Ü™YXÙQ›\Ú\ÕÙÙÛI×K™]™\JYOˆHYØİ[Y[™Ù][[Y[RY
Y
JJNÂˆÚÊ	ÒQİ\\š[ÜˆH˜\œ˜HH[™›Ü›XpéğíY\ÈÛÛ™šYİ\°è]™Z\ÉËÉİš^•\›’[™›ÉË	İš^•ÜY	Ë	İš^’[™›Ğ˜\‰×K™]™\JYOˆHYØİ[Y[™Ù][[Y[RY
Y
JH	‰ˆHYØİ[Y[™Ù][[Y[RY
	ÛZ\ÜÚ[ÛÛØÚÑÜ›İ\	ÊJNÂˆÛÜ›[‹˜Xİ]™OY˜[ÙNÂˆXØ]Ú
J^ÃBˆ™\İ[Ëœ\Ú
Û˜[YN‰Ù^ÙpéğèÛÎˆ	ÊÙK›Y\ÜØYÙK\ÜÎ™˜[Ù_JNÃBˆCBˆÛÛœİ˜Z[Y\™\İ[Ë™š[\ŠOˆ\‹œ\ÜÊNÃBˆÛÛœİ˜[›™\YØİ[Y[˜Ü™X]Q[[Y[
	Ù]‰ÊNÃBˆ˜[›™\‹šYIÜÛ[ÚÙP˜[›™\‰ÎÃBˆ˜[›™\‹œİ[K˜ÜÜÕ^IÜÜÚ][Û™š^YİÜÛYL	Nİ˜[œÙ›Ü›N˜[œÛ]V
ML	JNŞ‹Z[™^NNNÜY[™ÎŒLNØ›Ü™\‹\˜Y]\ÎŒLÙ›ÛÌLÜÙ[Ü™ÚXKÙ\šYØÛÛÜˆÙ™™Ø›Ş\ÚYİÎŒN™Ø˜JŠNØ˜XÚÙÜ›İ[™‰ÊÊ˜Z[Y›[™İÉÈÎLXŒX‰Î‰ÈÌX™L™‰ÊNÃBˆ˜[›™\‹^ÛÛ[Y˜Z[Y›[™İØÓSÒÑHRS	Ù˜Z[Y›[™İKÉÜ™\İ[Ë›[™İNˆ
Ù˜Z[Y›X\
O™‹›˜[YJKš›Ú[Š	È	ÊN˜ÓSÒÑHTÔÈ	Ü™\İ[Ë›[™İKÉÜ™\İ[Ë›[™İXÃBˆ˜[›™\‹]OIÔ™[]0ìÜš[ÈÈ\İH]]ÛX]^˜YÈ
ÜXO\Û[ÚÙJKˆÜ]YH\˜H™XÚ\‹‰ÎÃBˆ˜[›™\‹œİ[K˜İ\œÛÜIÜÚ[\‰ÎÃBˆ˜[›™\‹˜Y]™[\İ[™\Š	ØÛXÚÉË

OO˜˜[›™\‹œ™[[İ™J
JNÃBˆÚ[™İËœÙ][Y[İ]


OO˜˜[›™\‹œ™[[İ™J
K
NÃBˆØİ[Y[˜›ÙK˜\[™Ú[
˜[›™\ŠNÃBˆÛÛœÛÛK›ÙÊ	ÖÔÓSÒÑWIË”ÓÓ‹œİš[™ÚYJ™\İ[ÊJNÃBˆØØ[İÜ˜YÙKœÙ]][J	ÌLœ—ÜÛ[ÚÙIË”ÓÓ‹œİš[™ÚYJİ‘]K››İÊ
K™\İ[ßJJNÃBˆ™]\›ˆ™\İ[ÎÃBŸCBœ™Yœ™\ÚÛÛ[YP]ÛŠ
NÈÊˆÓÔ“È°èH[šXÚX[^˜YÈ™\İHÛÈÈ\œ]Z]›È
‹ÃBšYŠ™]ÈT“ÙX\˜Ú\˜[\ÊØØ][Û‹œÙX\˜Ú
K™Ù]
	ÜXIÊOOOIÜÛ[ÚÙIÊ^ÃBˆÚ[™İË˜Y]™[\İ[™\Š	ÛØY	Ë

OOœÙ][Y[İ]
[”Û[ÚÙU\İ
JNÃBŸCBƒB‹ÊˆKŒH0­ÈĞNˆ™YÚ\İ˜HÈÙ\šXÙHÛÜšÙ\ˆ
\[˜\È[HÚÊH
‹ÃB‹ÊˆÈ›ÙÛÈ°èÛÈX[0ê[HØXÚHÙ™›[™H\˜[HH˜\ÙHH\Ù[›Ûš[Y[Ëˆ™[[İ™[[ÜÂˆÛÜšÙ\œËØØXÚH[YÛÜÈ\˜H]YHØYHX›XØpéğèÛÈÙZ˜HØ\œ™YØYH\™][Y[Kˆ
‹ÂšYˆ
	ÜÙ\šXÙUÛÜšÙ\‰È[ˆ˜]šYØ]Üˆ	‰ˆØØ][Û‹œ›İØÛÛœİ\ÕÚ]
	Ú	ÊJHÂˆÚ[™İË˜Y]™[\İ[™\Š	ÛØY	Ë

HOˆÂˆ˜]šYØ]Ü‹œÙ\šXÙUÛÜšÙ\‹™Ù]™YÚ\İ˜][ÛœÊ
K[Š™YÜÏOœ™YÜË™›Ü‘XXÚ
™YÏOœ™YË[œ™YÚ\İ\Š
JJK˜Ø]Ú


OOßJNÂˆYŠÚ[™İË˜ØXÚ\ÊHØXÚ\ËšÙ^\Ê
K[ŠÙ^\ÏOšÙ^\Ë™›Ü‘XXÚ
Ù^OO˜ØXÚ\Ë™[]JÙ^JJJK˜Ø]Ú


OOßJNÂˆJNÂŸB™[˜İ[ÛˆÜ[“Z\ÜÚ[Û”™\^J˜\ÙRY
^Âˆ[™[™Ô™\^T\ÙOY˜\ÙRYÂˆÛÛœİ™^[™^Y™šXİ[JY™šXİ[JNÂˆÛÛœİ\™YØİ[Y[™Ù][[Y[RY
	Ü™\^R\™‰ÊNÂˆÛÛœİ[YØİ[Y[™Ù][[Y[RY
	Ü™\^R\™[	ÊNÂˆYŠ\™
H\™™\ØX›YYY™šXİ[OOOIÜ\ØY[ÉÎÂˆYŠ[
H[^ÛÛ[YY™šXİ[OOOIÜ\ØY[ÉÂˆÈ	Õ›Øğêˆ°èH\İ0èH˜HYšXİ[YHpè^[XK‰Âˆˆ™\]\ˆH\İ0ìÜšXH[H	ÙY™šXİ[SX™[
™^
_K˜ÂˆÜ[”[™[
	ÛZ\ÜÚ[Û”™\^TØÜ™Y[‰ÊNÂŸB