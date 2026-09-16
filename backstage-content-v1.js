/* Arquivo gerado pelo Backstage local de Ygdria. */
(function(root){
  'use strict';
  root.YGDRIA_BACKSTAGE_CONTENT=Object.freeze({
  "schema": 1,
  "generatedAt": "2026-09-16T23:18:16.576Z",
  "menus": [
    {
      "id": "playBtn",
      "label": "História",
      "hint": "Explore o mapa oficial de Ygdria",
      "visible": true,
      "order": 0
    },
    {
      "id": "continueBtn",
      "label": "Continuar",
      "hint": "Sem progresso salvo",
      "visible": true,
      "order": 1
    },
    {
      "id": "dailyBtn",
      "label": "Missões Especiais",
      "hint": "Desafios únicos e recompensas",
      "visible": true,
      "order": 2
    },
    {
      "id": "towerBtn",
      "label": "Torre de Acesso à Eternidade",
      "hint": "Suba os andares e sobreviva",
      "visible": true,
      "order": 3
    },
    {
      "id": "pvpBtn",
      "label": "PVP",
      "hint": "Em breve · duelos entre reinos",
      "visible": true,
      "order": 4
    },
    {
      "id": "achBtn",
      "label": "Perfil",
      "hint": "Sua lenda, conquistas e jornada",
      "visible": true,
      "order": 5
    },
    {
      "id": "shopBtn",
      "label": "Mercado Central dos Reinos",
      "hint": "Itens, poções e preparos",
      "visible": true,
      "order": 6
    },
    {
      "id": "optionsBtn",
      "label": "Opções",
      "hint": "Som, imagem e acessibilidade",
      "visible": true,
      "order": 7
    },
    {
      "id": "galleryBtn",
      "label": "Biblioteca da Eternidade",
      "hint": "Crônicas, criaturas, NPCs e cartas",
      "visible": true,
      "order": 8
    },
    {
      "id": "resumeBtn",
      "label": "Continuar batalha",
      "hint": "",
      "visible": true,
      "order": 9
    },
    {
      "id": "pauseOptionsBtn",
      "label": "Opções",
      "hint": "",
      "visible": true,
      "order": 10
    },
    {
      "id": "battleToolsToggle",
      "label": "Ferramentas táticas",
      "hint": "",
      "visible": true,
      "order": 11
    },
    {
      "id": "restartStageBtn",
      "label": "Reiniciar missão",
      "hint": "",
      "visible": true,
      "order": 12
    },
    {
      "id": "photoModeBtn",
      "label": "Modo foto",
      "hint": "",
      "visible": true,
      "order": 13
    },
    {
      "id": "returnMenuBtn",
      "label": "Menu principal",
      "hint": "",
      "visible": true,
      "order": 14
    }
  ],
  "items": [
    {
      "id": "regulacao",
      "reino": "humanos",
      "uso": "batalha",
      "raridade": "Comum",
      "nome": "Cristais de Regulação",
      "desc": "Embaralha o tabuleiro e cria 1 power-up aleatório.",
      "preco": 90,
      "icon": "crystal",
      "en": {
        "nome": "Regulation Crystals",
        "desc": "Shuffles the board and creates 1 random power-up."
      },
      "es": {
        "nome": "Cristales de Regulación",
        "desc": "Baraja el tablero y crea 1 potenciador aleatorio."
      },
      "effect": {
        "type": "shuffle",
        "powerUps": 1
      }
    },
    {
      "id": "regulacao-bernyce",
      "reino": "humanos",
      "uso": "batalha",
      "raridade": "Raro",
      "nome": "Cristal de Regulação de Bernyce",
      "desc": "Embaralha, cria 2 power-ups — incluindo 1 Estrela de Ygdria — e remove peças corrompidas.",
      "preco": 220,
      "icon": "bernyce-crystal",
      "en": {
        "nome": "Bernyce Regulation Crystal",
        "desc": "Shuffles, creates 2 power-ups — including 1 Star of Ygdria — and removes corrupted pieces."
      },
      "es": {
        "nome": "Cristal de Regulación de Bernyce",
        "desc": "Baraja, crea 2 potenciadores — incluida 1 Estrella de Ygdria — y elimina piezas corrompidas."
      },
      "effect": {
        "type": "royalShuffle",
        "powerUps": 1,
        "colorBombs": 1,
        "clearCorruption": true
      }
    },
    {
      "id": "flor-cerejeira",
      "reino": "humanos",
      "uso": "batalha",
      "raridade": "Incomum",
      "nome": "Flor de Cerejeira",
      "desc": "Recupera 25% da vida máxima do grupo.",
      "preco": 120,
      "icon": "sakura",
      "en": {
        "nome": "Cherry Blossom",
        "desc": "Restores 25% of the party maximum HP."
      },
      "es": {
        "nome": "Flor de Cerezo",
        "desc": "Restaura el 25% de la vida máxima del grupo."
      },
      "effect": {
        "type": "healPercent",
        "value": 0.25
      }
    },
    {
      "id": "espadas-lendarias",
      "reino": "humanos",
      "uso": "batalha",
      "raridade": "Raro",
      "nome": "Espadas do Guerreiro Lendário",
      "desc": "Aumenta o ataque do grupo em 50% até o fim da missão.",
      "preco": 180,
      "icon": "swords",
      "en": {
        "nome": "Legendary Warrior Swords",
        "desc": "Raises party attack by 50% until the mission ends."
      },
      "es": {
        "nome": "Espadas del Guerrero Legendario",
        "desc": "Aumenta el ataque del grupo un 50% hasta el final de la misión."
      },
      "effect": {
        "type": "attackMultiplier",
        "value": 1.5
      }
    },
    {
      "id": "bencao-eternidade",
      "reino": "humanos",
      "uso": "passiva",
      "raridade": "Lendário",
      "nome": "Benção da Eternidade",
      "desc": "Mantida na mochila, libera um único reinício de missão ao ser consumida.",
      "preco": 300,
      "icon": "eternity",
      "en": {
        "nome": "Blessing of Eternity",
        "desc": "While in the bag, enables one mission restart when consumed."
      },
      "es": {
        "nome": "Bendición de la Eternidad",
        "desc": "En la mochila, habilita un reinicio de misión al consumirse."
      },
      "effect": {
        "type": "restartMission"
      }
    },
    {
      "id": "elixir-divino",
      "reino": "luz",
      "uso": "batalha",
      "raridade": "Incomum",
      "nome": "Elixir Divino",
      "desc": "Recupera 25% da vida máxima e aumenta o ataque do grupo em 25% por 1 turno.",
      "preco": 150,
      "icon": "divine-elixir",
      "en": {
        "nome": "Divine Elixir",
        "desc": "Restores 25% maximum HP and raises party attack by 25% for 1 turn."
      },
      "es": {
        "nome": "Elixir Divino",
        "desc": "Restaura el 25% de la vida máxima y aumenta el ataque del grupo un 25% por 1 turno."
      },
      "effect": {}
    },
    {
      "id": "luz-protetora",
      "reino": "luz",
      "uso": "batalha",
      "raridade": "Raro",
      "nome": "Luz Protetora",
      "desc": "Ergue um escudo de 25% da vida máxima por 2 turnos.",
      "preco": 170,
      "icon": "protective-light",
      "en": {
        "nome": "Protective Light",
        "desc": "Raises a shield worth 25% maximum HP for 2 turns."
      },
      "es": {
        "nome": "Luz Protectora",
        "desc": "Crea un escudo del 25% de la vida máxima durante 2 turnos."
      },
      "effect": {}
    },
    {
      "id": "lanca-divina",
      "reino": "luz",
      "uso": "batalha",
      "raridade": "Raro",
      "nome": "Lança Divina",
      "desc": "Atinge o inimigo selecionado com 200 de dano.",
      "preco": 190,
      "icon": "divine-lance",
      "en": {
        "nome": "Divine Lance",
        "desc": "Deals 200 damage to the selected enemy."
      },
      "es": {
        "nome": "Lanza Divina",
        "desc": "Inflige 200 de daño al enemigo seleccionado."
      },
      "effect": {}
    },
    {
      "id": "espelho-ygdria",
      "reino": "luz",
      "uso": "batalha",
      "raridade": "Lendário",
      "nome": "Espelho de Ygdria",
      "desc": "Escolha um herói: sua cópia causa 100% do ATQ dele até o fim da missão.",
      "preco": 360,
      "icon": "ygdria-mirror",
      "en": {
        "nome": "Mirror of Ygdria",
        "desc": "Choose a hero: their copy deals 100% of their ATK until the mission ends."
      },
      "es": {
        "nome": "Espejo de Ygdria",
        "desc": "Elige un héroe: su copia inflige el 100% de su ATQ hasta el final de la misión."
      },
      "effect": {}
    },
    {
      "id": "esperanca",
      "reino": "luz",
      "uso": "global",
      "raridade": "Lendário",
      "nome": "Esperança",
      "desc": "Restaura 100% da Esperança para voltar à jornada imediatamente.",
      "preco": 360,
      "icon": "hope",
      "en": {
        "nome": "Hope",
        "desc": "Restores 100% Hope so you can return to the journey immediately."
      },
      "es": {
        "nome": "Esperanza",
        "desc": "Restaura el 100% de la Esperanza para volver a la aventura de inmediato."
      },
      "effect": {}
    }
  ],
  "characters": [
    {
      "id": "luz",
      "name": "Galatéia",
      "realmId": "luz",
      "rarity": "DIVINA",
      "card": "assets/cards/galateia-card.png",
      "cardThumb": "assets/thumbs/galateia-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/luz/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/luz/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/luz/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/luz/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/luz/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/luz/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "humanos",
      "name": "Berenice",
      "realmId": "humanos",
      "rarity": "DIVINA",
      "card": "assets/cards/berenice-card.png",
      "cardThumb": "assets/thumbs/berenice-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/humanos/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/humanos/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/humanos/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/humanos/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/humanos/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/humanos/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "agua",
      "name": "Maril",
      "realmId": "agua",
      "rarity": "DIVINA",
      "card": "assets/cards/maril-card.png",
      "cardThumb": "assets/thumbs/maril-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/agua/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/agua/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/agua/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/agua/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/agua/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/agua/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "fogo",
      "name": "Lucius",
      "realmId": "fogo",
      "rarity": "DIVINA",
      "card": "assets/cards/lucius-card.png",
      "cardThumb": "assets/thumbs/lucius-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/fogo/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/fogo/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/fogo/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/fogo/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/fogo/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/fogo/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "natureza",
      "name": "Ninfa Queen",
      "realmId": "natureza",
      "rarity": "DIVINA",
      "card": "assets/cards/ninfa-queen-card.png",
      "cardThumb": "assets/thumbs/ninfa-queen-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/natureza/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/natureza/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/natureza/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/natureza/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/natureza/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/natureza/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "terra",
      "name": "Kallendra",
      "realmId": "terra",
      "rarity": "DIVINA",
      "card": "assets/cards/kallendra-card.png",
      "cardThumb": "assets/cards/kallendra-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/terra/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/terra/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/terra/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/terra/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/terra/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/terra/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "areia",
      "name": "Rashid",
      "realmId": "areia",
      "rarity": "DIVINA",
      "card": "assets/cards/rashid-card.png",
      "cardThumb": "assets/thumbs/rashid-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/areia/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/areia/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/areia/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/areia/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/areia/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/areia/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "sombras",
      "name": "Berenice das Sombras",
      "realmId": "sombras",
      "rarity": "DIVINA",
      "card": "assets/cards/berenice-sombras-card.png",
      "cardThumb": "assets/thumbs/berenice-sombras-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/sombras/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/sombras/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/sombras/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/sombras/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/sombras/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/sombras/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "raio",
      "name": "Mardogear",
      "realmId": "raio",
      "rarity": "DIVINA",
      "card": "assets/cards/mardogear-card.png",
      "cardThumb": "assets/cards/mardogear-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/raio/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/raio/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/raio/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/raio/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/raio/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/raio/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "vento",
      "name": "Sophitia",
      "realmId": "vento",
      "rarity": "DIVINA",
      "card": "assets/cards/sophitia-card.png",
      "cardThumb": "assets/cards/sophitia-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/vento/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/vento/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/vento/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/vento/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/vento/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/vento/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "chuvas",
      "name": "Regnar",
      "realmId": "chuvas",
      "rarity": "DIVINA",
      "card": "assets/cards/regnar-card.png",
      "cardThumb": "assets/cards/regnar-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/chuvas/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/chuvas/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/chuvas/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/chuvas/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/chuvas/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/chuvas/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "gelo",
      "name": "Blizzardo",
      "realmId": "gelo",
      "rarity": "DIVINA",
      "card": "assets/cards/blizzardo-card.png",
      "cardThumb": "assets/cards/blizzardo-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/gelo/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/gelo/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/gelo/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/gelo/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/gelo/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/gelo/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "gareth",
      "name": "Gareth",
      "realmId": "humanos",
      "rarity": "NORMAL",
      "card": "assets/cards/enemies/gareth-card.png",
      "cardThumb": "assets/cards/enemies/gareth-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/gareth/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/gareth/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/gareth/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/gareth/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/gareth/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/gareth/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "cedric",
      "name": "Cedric",
      "realmId": "humanos",
      "rarity": "RARO",
      "card": "assets/cards/enemies/cedric-card.png",
      "cardThumb": "assets/cards/enemies/cedric-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/cedric/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/cedric/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/cedric/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/cedric/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/cedric/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/cedric/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "elizier",
      "name": "Elizier",
      "realmId": "humanos",
      "rarity": "RARO",
      "card": "assets/cards/enemies/elizier-card.png",
      "cardThumb": "assets/cards/enemies/elizier-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/elizier/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/elizier/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/elizier/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/elizier/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/elizier/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/elizier/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "roland",
      "name": "Roland",
      "realmId": "humanos",
      "rarity": "RARO",
      "card": "assets/cards/enemies/roland-card.png",
      "cardThumb": "assets/cards/enemies/roland-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/roland/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/roland/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/roland/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/roland/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/roland/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/roland/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "berenice-jovem",
      "name": "Berenice (Jovem)",
      "realmId": "humanos",
      "rarity": "NORMAL",
      "card": "assets/cards/berenice-jovem-card.webp",
      "cardThumb": "assets/cards/berenice-jovem-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/berenice-jovem/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/berenice-jovem/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/berenice-jovem/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/berenice-jovem/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/berenice-jovem/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/berenice-jovem/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "galateia-jovem",
      "name": "Galatéia (Jovem)",
      "realmId": "luz",
      "rarity": "NORMAL",
      "card": "assets/cards/galateia-jovem-card.webp",
      "cardThumb": "assets/cards/galateia-jovem-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/galateia-jovem/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/galateia-jovem/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/galateia-jovem/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/galateia-jovem/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/galateia-jovem/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/galateia-jovem/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "adriel-jovem",
      "name": "Adriel (Jovem)",
      "realmId": "humanos",
      "rarity": "NORMAL",
      "card": "assets/cards/adriel-jovem-card.webp",
      "cardThumb": "assets/cards/adriel-jovem-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/adriel-jovem/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/adriel-jovem/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/adriel-jovem/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/adriel-jovem/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/adriel-jovem/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/adriel-jovem/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "acqua-jovem",
      "name": "Acqua (Jovem)",
      "realmId": "agua",
      "rarity": "NORMAL",
      "card": "assets/cards/acqua-jovem-card.webp",
      "cardThumb": "assets/cards/acqua-jovem-card.webp",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/acqua-jovem/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/acqua-jovem/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/acqua-jovem/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/acqua-jovem/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/acqua-jovem/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/acqua-jovem/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "jules",
      "name": "Jules",
      "realmId": "humanos",
      "rarity": "SUPER RARO",
      "card": "assets/cards/enemies/jules-card.png",
      "cardThumb": "assets/cards/enemies/jules-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/jules/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/jules/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/jules/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/jules/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/jules/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/jules/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "kalander",
      "name": "Kalander",
      "realmId": "humanos",
      "rarity": "SUPER RARO",
      "card": "assets/cards/enemies/kalander-card.png",
      "cardThumb": "assets/cards/enemies/kalander-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/kalander/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/kalander/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/kalander/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/kalander/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/kalander/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/kalander/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "bernyce",
      "name": "Bernyce",
      "realmId": "humanos",
      "rarity": "SUPER RARO",
      "card": "assets/cards/enemies/bernyce-card.png",
      "cardThumb": "assets/cards/enemies/bernyce-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/bernyce/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/bernyce/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/bernyce/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/bernyce/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/bernyce/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/bernyce/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    },
    {
      "id": "julius",
      "name": "Julius",
      "realmId": "sombras",
      "rarity": "ULTRA RARO",
      "card": "assets/cards/enemies/julius-card.png",
      "cardThumb": "assets/cards/enemies/julius-card.png",
      "sprites": {
        "idle": {
          "src": "assets/characters/runtime-v10/julius/idle-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 7
        },
        "attack": {
          "src": "assets/characters/runtime-v10/julius/attack-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "cast": {
          "src": "assets/characters/runtime-v10/julius/cast-3x2.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 12
        },
        "hit": {
          "src": "assets/characters/runtime-v10/julius/hit-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "victory": {
          "src": "assets/characters/runtime-v10/julius/victory-2x2.png",
          "cols": 2,
          "rows": 2,
          "frames": 4,
          "fps": 12
        },
        "defeat": {
          "src": "assets/characters/runtime-v10/julius/defeat/processed/sheet-transparent.png",
          "cols": 3,
          "rows": 2,
          "frames": 6,
          "fps": 10
        }
      }
    }
  ],
  "settings": {
    "gameTitle": "Ygdria",
    "versionLabel": "VERSÃO 11",
    "previewPath": "/play.html?qa=1"
  },
  "realms": [
    {
      "id": "humanos",
      "name": "Reino dos Humanos",
      "status": "published",
      "color": "#ff6fa5",
      "phaseCount": 10
    }
  ]
});
})(typeof window!=='undefined'?window:globalThis);
