/* Arquivo gerado por tools/sync-humanos-lore.mjs.
   Fonte canônica: docs/REINO-HUMANOS-FASES-EDITAVEL.md. Não edite à mão. */
(function(root){
  'use strict';
  root.YGDRIA_HUMANOS_LORE=Object.freeze({
  "schema": 1,
  "source": "docs/REINO-HUMANOS-FASES-EDITAVEL.md",
  "sourceHash": "37aaeacbf432d9c6d3c2133175b15ffbf427bcc7c3c0e1879038c59a213878e5",
  "generatedAt": "deterministic",
  "phases": [
    {
      "number": 1,
      "name": "Cidade das Cerejeiras",
      "subtitle": "O Encontro Predestinado na Capital de Ygdria",
      "bosses": [
        "Gareth"
      ],
      "visual": {
        "description": "Petalas de Cerejeira caem, algumas vão se acumulam no chão e duram a fase toda.",
        "key": "cherry-petals",
        "accumulates": true
      },
      "before": "As 3 jovens aspirantes a rainhas magas herdeiras de seus reinos, Berenice herdeira do Reino dos Humanos, Galatéia herdeira do Reino da Luz e Acqua, a pricesa herdeira do Reino da Aguá que quer fugir das responsabilidades e se tornar uma cantora barda, brincam as margens da cidade e são atacadas por um slime e alguns lobos ferozes. Quando um jovem com uma espada de madeira aparece para ajudá-las.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Slime de Cerejeira",
          "enemies": [
            "slimeCereja"
          ],
          "lines": [
            {
              "speaker": "Slime",
              "heroId": "",
              "text": "Blub... ploc-ploc... splash!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Fiquem Atrás de mim, vou protegê-las"
            },
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Nos também sabemos lutar"
            }
          ]
        },
        {
          "number": 2,
          "title": "Slime de Cerejeira + Lobo Raivoso",
          "enemies": [
            "slimeCereja",
            "loboRaivoso"
          ],
          "lines": [
            {
              "speaker": "Slime",
              "heroId": "",
              "text": "Blub... ploc-ploc... splash!"
            },
            {
              "speaker": "Lobo",
              "heroId": "",
              "text": "Grrrr... auuuuu!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Lobo Raivoso ×2",
          "enemies": [
            "loboRaivoso",
            "loboRaivoso"
          ],
          "lines": [
            {
              "speaker": "Lobo",
              "heroId": "",
              "text": "Grrrr... auuuuu!"
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado 1 + Soldado 2",
          "enemies": [
            "soldado1",
            "soldado2"
          ],
          "lines": [
            {
              "speaker": "Soldado 1",
              "heroId": "",
              "text": "O que está fazendo? Fique longe das princesas!!!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Soldado 1 + Soldado 2 + Gareth",
          "enemies": [
            "soldado1",
            "soldado2",
            "gareth"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Está é minha chance de mostrar que posso me tornar um cavaleiro!"
            },
            {
              "speaker": "Gareth",
              "heroId": "",
              "text": "Só se me derrotar primeiro, moleque!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Após derrotar Gareth, Adriel e as meninas se esconde na Catedral de Ygdria..."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 2,
      "name": "Catedral de Ygdria",
      "subtitle": "A Fuga",
      "bosses": [
        "Cedric"
      ],
      "visual": {
        "description": "Brilhos e raios de luz rosa, piscando na fase como se ela emanasse uma paz absoluta",
        "key": "sacred-pink-light"
      },
      "before": "O capitão dos soldados chama as crianças pra fora da catedral pois o lugar é sagrado, elas dizem que Adriel não é um inimigo, mas o jovem está tomado pelo desejo de se tornar um cavaleiro e desafia todo mundo.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado 1 + Soldado 2",
          "enemies": [
            "soldado1",
            "soldado2"
          ],
          "lines": [
            {
              "speaker": "Soldado 2",
              "heroId": "",
              "text": "Você nunca será um cavaleiro!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Venham pra cima!!!"
            }
          ]
        },
        {
          "number": 2,
          "title": "Capitão dos Soldados",
          "enemies": [
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão",
              "heroId": "",
              "text": "Mostre-me do que é capaz, e quem sabe vira meu subordinado!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Soldado 2",
              "heroId": "",
              "text": "Deixe-me ter uma revanche capitão."
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado 1 + Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão",
              "heroId": "",
              "text": "Peguem-no!!!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Soldado 1 + Capitão dos Soldados + Cedric",
          "enemies": [
            "soldado1",
            "capitao",
            "cedric"
          ],
          "lines": [
            {
              "speaker": "Cedric",
              "heroId": "",
              "text": "Que confusão é essa na frente da Catedral sagrada!!! Terei de Punir essas crianças malcriadas!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Pode vir velhote!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Adriel derrota o mago Cedric na força bruta e deixa todos os soldados boquiabertos..."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 3,
      "name": "Palácio dos Reguladores",
      "subtitle": "A Arqueira Boa de Mira",
      "bosses": [
        "Elizier"
      ],
      "visual": {
        "description": "Nada",
        "key": "none"
      },
      "before": "As crianças parecem se divertir com a situação, mas todos os guardas e cavaleiros do castelo foram mobilizados. Agora estão na entrada do Palácio dos Reguladores, lugar aonde todas as decisões dos 12 reinos são tomadas pela Rainha Bernyce, que parece estar ausente.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado 1 + Soldado 2",
          "enemies": [
            "soldado1",
            "soldado2"
          ],
          "lines": [
            {
              "speaker": "Soldado 1",
              "heroId": "",
              "text": "Capturem esse fedelho!"
            }
          ]
        },
        {
          "number": 2,
          "title": "Capitão dos Soldados",
          "enemies": [
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão dos Soldados",
              "heroId": "",
              "text": "Dessa vez você será executado."
            }
          ]
        },
        {
          "number": 3,
          "title": "Soldado 1 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Derrotarei todos vocês e me tornarei um cavaleiro."
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado 1 + Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão dos Soldados",
              "heroId": "",
              "text": "Chamem reforços!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Soldado 1 + Soldado 2 + Capitão dos Soldados + Elizier",
          "enemies": [
            "soldado1",
            "soldado2",
            "capitao",
            "elizier"
          ],
          "lines": [
            {
              "speaker": "Elizier",
              "heroId": "",
              "text": "Tolos, foram derrotados por uma criança! Vou mostrar como é que se faz!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Adriel é ferido no braço por uma flecha e cai no chão exausto... Elizier fica animada com a audácia do jovem, e leva ele para a Academia Real de Magia e Combate."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 4,
      "name": "Academia Real de Magia e Combate",
      "subtitle": "O Início da Jornada do Herói",
      "bosses": [
        "Roland"
      ],
      "visual": {
        "description": "Nada",
        "key": "none"
      },
      "before": "Fim de tarde, Acqua já retornou para sua casa, o grande Lago de Ygdria para fugir mais uma vez de suas obrigações reais. Adriel vai passar pelo treinamento junto de Berenice e Galatéia e Gareth que acha que precisa evoluir depois de ter perdido para Adriel.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado 1 + Soldado 2",
          "enemies": [
            "soldado1",
            "soldado2"
          ],
          "lines": [
            {
              "speaker": "Soldado 2",
              "heroId": "",
              "text": "Vou me conter um pouco, pode vir com tudo!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Não pegue leve."
            }
          ]
        },
        {
          "number": 2,
          "title": "Capitão dos Soldados",
          "enemies": [
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão dos Soldados",
              "heroId": "",
              "text": "Você tem potencial garoto."
            }
          ]
        },
        {
          "number": 3,
          "title": "Soldado 1 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Soldado 1",
              "heroId": "",
              "text": "Agora verá meu verdadeiro poder"
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado 1 + Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Vocês são bem mais fortes do que pensei, mas vou conseguir."
            }
          ]
        },
        {
          "number": 5,
          "title": "Soldado 2 + Capitão dos Soldados + Roland",
          "enemies": [
            "soldado2",
            "capitao",
            "roland"
          ],
          "lines": [
            {
              "speaker": "Roland",
              "heroId": "",
              "text": "Muito bem jovenzinho, quero ver do que é capaz, contra um cavaleiro de verdade!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Após o final do dia todos vão descansar no alojamento e as crianças vão para o castelo."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 5,
      "name": "Mercado Central dos Reinos",
      "subtitle": "Tudo tem seu Preço",
      "bosses": [
        "Cedric",
        "Elizier",
        "Roland"
      ],
      "visual": {
        "description": "Confetes coloridos caindo, alguns vão se acumulam no chão e duram a fase toda.",
        "key": "festival-confetti",
        "accumulates": true
      },
      "before": "Adriel, Gareth, Berenice, Galatéia vão ao Mercado Central e são cercados pelos soldados.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado 1 + Soldado 2",
          "enemies": [
            "soldado1",
            "soldado2"
          ],
          "lines": [
            {
              "speaker": "Soldado 1",
              "heroId": "",
              "text": "Hora do treinamento final..."
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "O que? Aqui no meio do mercado?!"
            }
          ]
        },
        {
          "number": 2,
          "title": "Capitão dos Soldados",
          "enemies": [
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Capitão dos Soldados",
              "heroId": "",
              "text": "O inimigo não escolhe lugar para atacar..."
            },
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Deixa comigo. Eu cuido deles!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Galatéia",
              "heroId": "galateia-jovem",
              "text": "Estamos bem mais fortes."
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado 1 + Soldado 2 + Capitão dos Soldados",
          "enemies": [
            "soldado1",
            "soldado2",
            "capitao"
          ],
          "lines": [
            {
              "speaker": "Gareth",
              "heroId": "gareth",
              "text": "Tragam os mais fortes do reino... Glup"
            }
          ]
        },
        {
          "number": 5,
          "title": "Cedric + Elizier + Roland",
          "enemies": [
            "cedric",
            "elizier",
            "roland"
          ],
          "lines": [
            {
              "speaker": "Roland",
              "heroId": "",
              "text": "Vocês que pediram..."
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Pra que foi abrir essa boca Gareth"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Após o treinamento surpresa, todos fazem uma refeição nos arredores do mercado. Adriel está feliz com o seu progresso na caminhada como cavaleiro do reino."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 6,
      "name": "Praça das Doze Essências",
      "subtitle": "Doze pilares, doze reinos",
      "bosses": [
        "Jules",
        "The Joker"
      ],
      "visual": {
        "description": "Nevoa",
        "key": "shadow-fog"
      },
      "before": "Depois do treinamento pesado, os jovens vão até a Praça das Doze Essências curtirem o final do dia e se divertirem, mas não imaginam que um mal estaria por vir... Uma nevoa sombria cobre a praça.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Vulto Sombrio",
          "enemies": [
            "vulto"
          ],
          "lines": [
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Que frio, por que escureceu de repente."
            },
            {
              "speaker": "Galatéia",
              "heroId": "galateia-jovem",
              "text": "Um Fantasma!!!"
            },
            {
              "speaker": "Vulto Sombrio",
              "heroId": "",
              "text": "Huahuahuahua..."
            }
          ]
        },
        {
          "number": 2,
          "title": "Espectro Sombrio",
          "enemies": [
            "espectro"
          ],
          "lines": [
            {
              "speaker": "Gareth",
              "heroId": "gareth",
              "text": "Não estou gostando nada disso pessoal."
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Vamos dar conta desse aqui também."
            },
            {
              "speaker": "Espectro Sombrio",
              "heroId": "",
              "text": "Vocês não são páreo para nós!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Vulto Sombrio + Espectro Sombrio",
          "enemies": [
            "vulto",
            "espectro"
          ],
          "lines": [
            {
              "speaker": "Gareth",
              "heroId": "gareth",
              "text": "Tá vindo mais..."
            }
          ]
        },
        {
          "number": 4,
          "title": "Cavaleiro Morto-Vivo",
          "enemies": [
            "morto"
          ],
          "lines": [
            {
              "speaker": "Cavaleiro Morto-Vivo",
              "heroId": "",
              "text": "Todos vocês morrerão!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Jules",
          "enemies": [
            "jules"
          ],
          "lines": [
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Eba... É o Jules nosso bobo da corte, ele vai nos ajudar..."
            },
            {
              "speaker": "Jules",
              "heroId": "",
              "text": "Princesa tola... Não estou aqui por vocês!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Jules derrota os jovens, mas foge quando a nevoa se dissipa. Os jovens correm em busca de ajuda e entram na biblioteca."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 7,
      "name": "Biblioteca da Eternidade",
      "subtitle": "Estado de Emergência",
      "bosses": [
        "Bernyce"
      ],
      "visual": {
        "description": "Folhas de livros caidas pelo chão, aumenta muito a quantidade de acordo conforme for passando das missões.",
        "key": "library-pages",
        "progressive": true
      },
      "before": "Ao chagarem na biblioteca, são barrados pelos soldados. Berenice diz que precisa falar com mãe dela, mas os soldados impedem a entrada.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "gareth"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado da Biblioteca 1",
          "enemies": [
            "soldBib1"
          ],
          "lines": [
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Rápido, nos deixem passar, preciso ver a minha mãe!"
            },
            {
              "speaker": "Soldado da Biblioteca 1",
              "heroId": "",
              "text": "Vocês precisam ser repreendidos, não pensem que somos aqueles soldadinhos da cidade."
            }
          ]
        },
        {
          "number": 2,
          "title": "Soldado da Biblioteca 1 + Soldado da Biblioteca 2",
          "enemies": [
            "soldBib1",
            "soldBib2"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Se não saírem da frente, vamos derrubar geral!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Soldado da Biblioteca 1 + Soldado da Biblioteca 2 + Soldado da Biblioteca 3",
          "enemies": [
            "soldBib1",
            "soldBib2",
            "soldBib3"
          ],
          "lines": [
            {
              "speaker": "Soldado da Biblioteca 3",
              "heroId": "",
              "text": "Prendam eles!!!"
            }
          ]
        },
        {
          "number": 4,
          "title": "Cedric + Elizier + Roland",
          "enemies": [
            "cedric",
            "elizier",
            "roland"
          ],
          "lines": [
            {
              "speaker": "Cedric",
              "heroId": "",
              "text": "O que está acontecendo aqui, que confusão é essa?"
            }
          ]
        },
        {
          "number": 5,
          "title": "Bernyce",
          "enemies": [
            "bernyce"
          ],
          "lines": [
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Mamãe!"
            },
            {
              "speaker": "Bernyce",
              "heroId": "",
              "text": "Você precisa se comportar como a futura rainha maga!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Após toda a confusão na biblioteca, Berenice explica a rainha que Jules os atacou. A rainha fica apreensiva e os leva até o Cavaleiro Mago Kalander, que sugere treiná-los. O Reino fica em estado de Emergência!"
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 8,
      "name": "Muralha dos Heróis",
      "subtitle": "Do que um Herói de Verdade Precisa?",
      "bosses": [
        "Kalander"
      ],
      "visual": {
        "description": "Fogos de Artificio",
        "key": "fireworks"
      },
      "before": "Alguns dias se passaram, o Cavaleiro Mago, o cavaleiro mais poderoso do Reino dos Humanos, Kalander, treina os jovens para que possam se defender de qualquer perigo, enquanto a rainha Bernyce voltou para o castelo para buscar uma explicação para os últimos acontecimentos. Acqua retornou para brincar, mas acabou entrando no treinamento também.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado de Infantaria",
          "enemies": [
            "infantaria"
          ],
          "lines": [
            {
              "speaker": "Soldado de Infantaria",
              "heroId": "",
              "text": "Preparem-se, agora o treino sobe de nível."
            }
          ]
        },
        {
          "number": 2,
          "title": "Soldado de Cavalaria",
          "enemies": [
            "cavalaria"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "É impossível... Ele tem um cavalo!"
            }
          ]
        },
        {
          "number": 3,
          "title": "Comandante dos Soldados",
          "enemies": [
            "comandante"
          ],
          "lines": [
            {
              "speaker": "Comandante dos Soldados",
              "heroId": "",
              "text": "Mostrem todo o seu potencial!"
            }
          ]
        },
        {
          "number": 4,
          "title": "Soldado de Infantaria + Soldado de Cavalaria + Comandante dos Soldados",
          "enemies": [
            "infantaria",
            "cavalaria",
            "comandante"
          ],
          "lines": [
            {
              "speaker": "Galatéia",
              "heroId": "galateia-jovem",
              "text": "Vamos unir nossos ataques!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Kalander",
          "enemies": [
            "kalander"
          ],
          "lines": [
            {
              "speaker": "Kalander",
              "heroId": "",
              "text": "Muito bem, se me fizerem sair do lugar, vocês vencem!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Depois de mais um dia de treinamento e muitos golpes, os jovens conseguem fazer Kalander sair do lugar, usando uma trapaça estratégia (Berenice fingiu que se machucou enquantos os outros o atacaram de surpresa)."
        },
        {
          "speaker": "Kalander",
          "heroId": "",
          "text": "Hahahaha... Esses pirralhos!"
        }
      ],
      "afterSceneCues": [
        "Kalander aparece no cenário"
      ]
    },
    {
      "number": 9,
      "name": "Lendária Torre de Acesso à Eternidade",
      "subtitle": "O Prólogo do Fim",
      "bosses": [
        "Julius"
      ],
      "visual": {
        "description": "Escuridão",
        "key": "darkness"
      },
      "before": "Os jovens estão felizes e despreocupados andando pela cidade, depois de serem aceitos por Kalander. Mas uma vez tudo fica escuro de repente.",
      "allowed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem",
        "acqua-jovem",
        "gareth"
      ],
      "fixed": [
        "adriel-jovem",
        "berenice-jovem",
        "galateia-jovem"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Vulto Sombrio + Espectro Sombrio",
          "enemies": [
            "vulto",
            "espectro"
          ],
          "lines": [
            {
              "speaker": "Espectro Sombrio",
              "heroId": "",
              "text": "Agora vocês não escapam!!!"
            },
            {
              "speaker": "Galatéia",
              "heroId": "galateia-jovem",
              "text": "De novo não!"
            }
          ]
        },
        {
          "number": 2,
          "title": "Cavaleiro Morto-Vivo",
          "enemies": [
            "morto"
          ],
          "lines": [
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Vamos dar uma surra nesse puro ossos."
            }
          ]
        },
        {
          "number": 3,
          "title": "Vulto Sombrio + Espectro Sombrio + Cavaleiro Morto-Vivo",
          "enemies": [
            "vulto",
            "espectro",
            "morto"
          ],
          "lines": [
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Podem vir todos de uma vez!"
            }
          ]
        },
        {
          "number": 4,
          "title": "Jules",
          "enemies": [
            "jules"
          ],
          "lines": [
            {
              "speaker": "Jules",
              "heroId": "",
              "text": "Dessa vez vou cumprir com a minha missão."
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Somos mais fortes do que antes, seu palhaço!"
            }
          ]
        },
        {
          "number": 5,
          "title": "Julius",
          "enemies": [
            "julius"
          ],
          "lines": [
            {
              "speaker": "???",
              "heroId": "",
              "text": "Berenice! Venha comigo..."
            },
            {
              "speaker": "Berenice",
              "heroId": "berenice-jovem",
              "text": "Quem é você?"
            },
            {
              "speaker": "???",
              "heroId": "",
              "text": "Seu pai quer vê-la."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Todos são derrotados por Julius, poucos soldados sobreviveram, se não fosse a chegada de Roland e Elizier, os jovens estariam todos mortos. Mas nem todas as notícias são boas. Berenice foi levada. Um soldado sobrevivente levou Galatéia e Acqua aos seus reinos, e Adriel parte junto a Gareth e os Cavaleiros até o castelo da Rainha para dar a notícia."
        }
      ],
      "afterSceneCues": []
    },
    {
      "number": 10,
      "name": "Castelo da Coroa Humana",
      "subtitle": "A Sombra que Devora Tudo",
      "bosses": [
        "Julius"
      ],
      "visual": {
        "description": "Nada / Escuridão total na missão 5",
        "key": "none",
        "missionFive": "total-darkness"
      },
      "before": "Ao chegarem no castelo, todos os soldados já sabem do ocorrido, e acusam o grupo de terem arquitetado o sequestro da princesa. Jules havia articulado tudo. E uma batalha começa!",
      "allowed": [
        "adriel-jovem",
        "gareth",
        "roland",
        "elizier"
      ],
      "fixed": [
        "adriel-jovem",
        "gareth",
        "roland",
        "elizier"
      ],
      "missions": [
        {
          "number": 1,
          "title": "Soldado do Trono Real",
          "enemies": [
            "trono"
          ],
          "lines": [
            {
              "speaker": "Soldado do Trono Real",
              "heroId": "",
              "text": "Serão todos executados!"
            }
          ]
        },
        {
          "number": 2,
          "title": "Cedric + Jules",
          "enemies": [
            "cedric",
            "jules"
          ],
          "lines": [
            {
              "speaker": "Roland",
              "heroId": "roland",
              "text": "Cedric, afaste-se. Jules é o inimigo!"
            },
            {
              "speaker": "Cedric",
              "heroId": "",
              "text": "Roland! E pensar que seu pai também foi um cavaleiro."
            }
          ]
        },
        {
          "number": 3,
          "title": "Kalander + Cedric + Jules",
          "enemies": [
            "kalander",
            "cedric",
            "jules"
          ],
          "lines": [
            {
              "speaker": "Jules",
              "heroId": "",
              "text": "Libertem a princesa, desertores!"
            },
            {
              "speaker": "Kalander",
              "heroId": "",
              "text": "Não acredito, eu confiei e treinei vocês!"
            }
          ]
        },
        {
          "number": 4,
          "title": "Kalander + Bernyce",
          "enemies": [
            "kalander",
            "bernyce"
          ],
          "lines": [
            {
              "speaker": "Bernyce",
              "heroId": "",
              "text": "Devolvam minha filha!!!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Rainha! O Jules que é o culpado, e tem outro inimigo também."
            }
          ]
        },
        {
          "number": 5,
          "title": "Julius",
          "enemies": [
            "julius"
          ],
          "lines": [
            {
              "speaker": "Julius",
              "heroId": "",
              "text": "Morram todos! Corte Sombrio!"
            },
            {
              "speaker": "Adriel",
              "heroId": "adriel-jovem",
              "text": "Rainha!!! Kalander!!!"
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Adriel achou que havia vencido Julius, mas era apenas uma sombra dele. Uma sombra cobre totalmente ao castelo e todos são derrotados e mortos pela lâmina sombria de Julius. Adriel é o único sobrevivente, graças ao sacrifício de Gareth, que entra na frente do golpe final, Cedric o envolve com uma magia e o teletransporta para longe."
        },
        {
          "speaker": "Cedric",
          "heroId": "",
          "text": "Viva Jovem!!! Seja nossa esperança!"
        },
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "E assim termina a primeira parte de nossa aventura! O que acontecerá com Adriel? Qual o paradeiro de Berenice? Quem é Julius?"
        },
        {
          "speaker": "Narrador",
          "heroId": "",
          "text": "Não percam o próximo capitulo dessa aventura!"
        }
      ],
      "afterSceneCues": []
    }
  ]
});
})(typeof window!=='undefined'?window:globalThis);
