/* Reino da Luz · elenco jogável com animações corporais quadro a quadro.
   O contrato replica o padrão aprovado de Galatéia Jovem do Reino dos Humanos:
   idle/hit/victory/defeat 2×2, attack/cast 3×2 e VFX em camada separada. */
(function exposeLightRealmRoster(){
  const asset=(id)=>`assets/characters/runtime-v11/light/${id}/base.webp`;
  const card=(id)=>`assets/cards/light/${id}.webp`;
  const thumb=(id)=>`assets/cards/light/${id}-thumb.webp`;
  const motionSheet=(id,action)=>`assets/characters/light-v1/${id}/${action}/processed/sheet-transparent.png`;
  const motions=(id)=>({
    idle:{src:motionSheet(id,'idle'),format:'sheet',frames:4,cols:2,rows:2,duration:2400,loop:true,displayScale:.88},
    attack:{src:motionSheet(id,'attack'),format:'sheet',frames:6,cols:3,rows:2,duration:720,displayScale:.88},
    cast:{src:motionSheet(id,'cast'),format:'sheet',frames:6,cols:3,rows:2,duration:840,displayScale:.88},
    hit:{src:motionSheet(id,'hit'),format:'sheet',frames:4,cols:2,rows:2,duration:360,displayScale:.88},
    victory:{src:motionSheet(id,'victory'),format:'sheet',frames:4,cols:2,rows:2,duration:1200,hold:true,displayScale:.88},
    defeat:{src:motionSheet(id,'defeat'),format:'sheet',frames:4,cols:2,rows:2,duration:900,hold:true}
  });
  const base=(id,fields)=>({
    id,iconId:'luz',deck:'luz',reino:'Reino da Luz',
    color:'#f0eadc',colorLight:'#fffdf2',colorDark:'#8d7945',gem:'gemDiamond',
    img:card(id),cardThumb:thumb(id),sprite:asset(id),sprites:motions(id),
    fxTheme:'radiant',motionFamily:'light-realm',...fields
  });

  const roster=[
    base('cael',{
      nome:'Cael',classe:'Guarda da Alvorada · Cavaleiro',atk:2,
      rarity:'NORMAL',stars:1,motionRole:'melee',
      frase:'Protegerei meu reino com a minha vida.',abilities:[]
    }),
    base('aelius',{
      nome:'Aelius',classe:'O Sábio da Aurora · Mago',atk:2,
      rarity:'NORMAL',stars:1,motionRole:'magic',
      frase:'A luz é a essência do mundo.',abilities:[]
    }),
    base('orion',{
      nome:'Orion',classe:'Olhos do Amanhecer · Arqueiro',atk:2,
      rarity:'NORMAL',stars:1,motionRole:'ranged',
      frase:'Minhas flechas de luz protegerão o reino.',abilities:[]
    }),
    base('adriel-aspirante',{
      nome:'Adriel',classe:'O Aspirante Refugiado · Cavaleiro',atk:4,
      rarity:'RARO',stars:2,motionRole:'melee',
      frase:'Perdi meu lar... mas encontrarei um reino para proteger.',
      abilities:[
        {kind:'passive',at:[25,50,75,100],name:'Força de Vontade',tipo:'nextAttackMult',valor:1.25,desc:'Sempre que ativa, ele ganha mais 1 de ataque base.'}
      ]
    }),
    base('arneth',{
      nome:'Arneth',classe:'Sentinela da Luz · Cavaleiro',atk:4,
      rarity:'RARO',stars:2,motionRole:'guard',
      frase:'Vingarei a morte de meu irmão Gareth.',
      abilities:[
        {kind:'passive',at:[25,50,75,100],name:'Defesa Impenetrável',tipo:'invulnerableTurns',turnos:1,desc:'Ativa um escudo que anula 100% do próximo ataque recebido.'}
      ]
    }),
    base('leonis',{
      nome:'Leonis',classe:'Espada Feroz do Alvorecer · Cavaleiro',atk:4,
      rarity:'RARO',stars:2,motionRole:'dual',
      frase:'A cavaleira mais feroz do reino.',
      abilities:[
        {kind:'passive',at:[25,50,75,100],name:'Lâminas do Alvorecer',tipo:'stunAndDamageFromLast',turnos:1,mult:1.1,desc:'O brilho das lâminas causa 10% de dano e cega o inimigo por 1 turno.'}
      ]
    }),
    base('aarthas',{
      nome:'Aarthas',classe:'Cavaleiro Mago da Luz',atk:6,
      rarity:'SUPER RARO',stars:3,motionRole:'magicblade',
      frase:'Minha luz protege todo o reino.',
      abilities:[
        {kind:'passive',at:[25,75],name:'Espada de Luz',tipo:'critBase',mult:3,desc:'Sua espada vira de luz, gerando um ataque crítico de 3× o ataque base.'},
        {kind:'passive',at:[50,100],name:'Invocação das Espadas Sagradas',tipo:'critBaseAll',mult:5,desc:'Espadas caem do céu, com 30% de chances de acertar algum dos inimigos na arena, infligindo 5× o ataque base.'}
      ]
    }),
    base('galatas',{
      nome:'Gálatas',classe:'O Rei Mago da Luz',atk:6,
      rarity:'SUPER RARO',stars:3,motionRole:'magic',
      frase:'Passo a ti, minha filha, minha luz divina.',
      abilities:[
        {kind:'passive',at:[25,75],name:'Luz Eterna',tipo:'reducaoDano',valor:.1,desc:'Envolve os aliados e a si mesmo de luz, fazendo todos os golpes dos adversários perderem 10% do dano. Dura a fase toda e é acumulativa.'},
        {kind:'passive',at:[50,100],name:'Luz Divina',tipo:'impetoRainha',valor:.1,desc:'Aumenta o ataque dos aliados e de si mesmo em 10%. É acumulativo até o final da fase.'}
      ]
    }),
    base('adriel-cavaleiro',{
      nome:'Adriel',classe:'Cavaleiro da Luz',atk:6,
      rarity:'SUPER RARO',stars:3,motionRole:'melee',
      frase:'Reconstruirei meu reino, com minha luz.',
      abilities:[
        {kind:'passive',at:[25,75],name:'Força de Vontade do Herói',tipo:'nextAttackMult',valor:1.5,desc:'Sempre que ativa, ele é envolvido com uma aura rosa e ganha mais 2 de ataque base.'},
        {kind:'passive',at:[50,100],name:'Espada Lendária do Reino dos Humanos',tipo:'empowerAttacks',cargas:3,mult:2.5,desc:'Ao trocar de espada, ele infringe um crítico de 2,5× do ataque base em todos os ataques. É acumulativo.'}
      ]
    }),
    base('galateia-rainha',{
      nome:'Galatéia',classe:'Rainha Maga da Luz',atk:8,
      rarity:'ULTRA RARO',stars:4,motionRole:'magic',artKit:true,
      frase:'Vou te purificar com a luz divina.',
      abilities:[
        {kind:'passive',at:[25],name:'Brilho Intenso',tipo:'blind',turnos:2,desc:'Cega todos os inimigos por 2 turnos.'},
        {kind:'passive',at:[50],name:'Escudo de Luz',tipo:'reflectTurns',turnos:1,desc:'Adiciona um escudo de luz que reflete todo o dano recebido, dura apenas 1 turno.'},
        {kind:'passive',at:[75],name:'Cura Divina',tipo:'healPercent',valor:.2,desc:'Recupera 20% da vida total.'},
        {kind:'active',gems:100,name:'Explosão de Luz de Ygdria',tipo:'damageAllFromLast',mult:3,desc:'Atinge todos os inimigos com 3× o valor de seu último ataque realizado.'}
      ]
    }),
    base('aarthas-darke',{
      nome:'Aarthas & Darke',classe:'Gêmeos da Luz Branca e Negra · Cavaleiro Mago',atk:8,
      rarity:'ULTRA RARO',stars:4,motionRole:'eclipse',artKit:true,
      frase:'Destruiremos toda a luz desse mundo.',
      abilities:[
        {kind:'passive',at:[25],name:'Espada de Luz e Sombras',tipo:'critBase',mult:3,desc:'Sua espada vira uma aura de luz e outra de sombras, gerando um ataque crítico de 3× o ataque base.'},
        {kind:'passive',at:[50],name:'Invocação das Espadas Sagradas',tipo:'critBaseAll',mult:5,desc:'Espadas de luz e sombra caem do céu, com 30% de chances de acertar algum dos inimigos na arena, infligindo 5× o ataque base.'},
        {kind:'passive',at:[75],name:'Vínculo Sombrio',tipo:'empowerAttacks',cargas:99,mult:1.5,desc:'Darke assume totalmente a aparência, aumentando o ataque base em 50% durante toda a fase.'},
        {kind:'active',gems:100,name:'Eclipse Negativo',tipo:'lifestealCharges',cargas:99,mult:1,desc:'Deixa tudo em negativo e todos os ataques recuperam de vida a mesma quantidade de dano. Dura durante toda a fase.'}
      ]
    })
  ];

  window.YGDRIA_LIGHT_ROSTER=Object.freeze(roster.map(character=>Object.freeze(character)));
})();
