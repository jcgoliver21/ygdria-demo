/* 12 Reinos v10 — configuração pública e centralizada.
   Regras de interface e qualidade ficam aqui para evitar valores divergentes. */
(function exposeV10Config(){
  const config={
    version:'v11.0.7',
    label:'VERSÃO 11',
    release:'2026-08-27',
    battle:{
      phases:['idle','resolving','heroes','enemies','transition','paused'],
      defaultPhase:'idle'
    },
    audio:{master:70,music:65,sfx:85},
    quality:{
      values:['auto','high','medium','economy'],
      particles:{high:28,medium:18,economy:8},
      preload:{high:32,medium:16,economy:8},
      arenaEffects:{high:true,medium:true,economy:false}
    },
    visuals:{
      arenaProfiles:{
        'cherry-petals':{mood:'cerejeiras',light:'#ffd2e4',depth:'#5f3249'},
        'cold-mist':{mood:'neblina fria',light:'#bde9ff',depth:'#314b64'},
        'arcane-threads':{mood:'fios arcanos',light:'#b79cff',depth:'#3b3260'},
        'market-dust':{mood:'poeira dourada',light:'#f2ca8c',depth:'#60452f'},
        'essence-ribbons':{mood:'fitas de essência',light:'#f0a7e9',depth:'#57345b'},
        'library-pages':{mood:'páginas ao vento',light:'#ffe6a7',depth:'#554b36'},
        'wall-wind':{mood:'vento das muralhas',light:'#a9d8f4',depth:'#345064'},
        'ember-ash':{mood:'cinzas e brasas',light:'#ffae70',depth:'#633b2e'},
        'scene-drift':{mood:'energia ambiente',light:'#d4b7ff',depth:'#403454'}
      },
      defeat:{anchor:'feet-and-eyes',noHorizontalFlip:true,equipmentFollowsGravity:true,holdRestingFrame:true}
    },
    accessibility:{highContrast:false,largeText:false,reduceFlashes:false},
    difficulty:{
      facil:{boardPersists:true,enemyObstaclesPersist:false},
      normal:{boardPersists:false,enemyObstaclesPersist:false},
      dificil:{boardPersists:false,enemyObstaclesPersist:false},
      pesadelo:{boardPersists:false,enemyObstaclesPersist:true}
    },
    realms:['luz','humanos','agua','fogo','natureza','terra','areia','sombras','raio','vento','chuvas','gelo']
  };
  window.YGDRIA_V10=Object.freeze(config);
})();
