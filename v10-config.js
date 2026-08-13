/* 12 Reinos v10 — configuração pública e centralizada.
   Regras de interface e qualidade ficam aqui para evitar valores divergentes. */
(function exposeV10Config(){
  const config={
    version:'v10',
    label:'VERSÃO 10',
    release:'2026-08-13',
    battle:{
      phases:['idle','resolving','heroes','enemies','transition','paused'],
      defaultPhase:'idle'
    },
    audio:{master:70,music:65,sfx:85},
    quality:{
      values:['auto','high','medium','economy'],
      particles:{high:28,medium:18,economy:8},
      preload:{high:32,medium:16,economy:8}
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
