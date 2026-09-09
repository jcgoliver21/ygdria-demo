# HUD ilustrado — referência aprovada

## Direção visual

Referência do usuário: `exec-076e045d-ed10-4ae6-be39-d5e7c37c66a2.png`.
Arte escura de fantasia: tinta preta (#09080b), metal bronze rosado (#c89878), reflexos marfim (#f3e9dc), joias humanas rosa (#ef7ab1). Serifas clássicas, sem títulos em blocos coloridos ou cantos genéricos arredondados.

## Composição e dados

- Cabeçalho: identidade, relógio geral, prazo de ataque, estado real do turno, objetivo, recorde, quatro controles existentes.
- Cenário: aproximadamente 60% da altura útil em retrato, além do cabeçalho. O cenário canônico de cada missão continua em uso; a Torre conserva sua arte exclusiva.
- Console: 29% da altura. HP único à esquerda; grade de seis por seis ao centro; quatro cartas empilhadas e controles individuais à direita.
- Histórico: rodapé estreito e ilustrado.
- As cartas são mostradas inteiras, conforme o pedido funcional do usuário. A referência conceitual usava recortes de retrato.
- Os botões mantêm Mochila, Formação, Tela cheia e Menu; não introduzem as ações fictícias Atacar/Defender/Fugir do desenho conceitual.
- Em paisagem curta, a arena e o console dividem a largura, mantendo as peças utilizáveis.

## Pipeline de arte

`assets/ui/hud-ornament-atlas-v1.png`: arte raster gerada anteriormente a partir da referência aprovada, sem conteúdo de jogo. `battle-hud.js` utiliza partes independentes da imagem como ornamentos SVG locais. Máscara de luminância remove o fundo técnico da arte somente durante a composição. Nada é esticado sobre a arena inteira.

As joias são desenhos vetoriais com vidro, aro, iluminação e os caminhos de `KINGDOM_ICON`. Materiais mudam; símbolos, cores de combate, coordenadas, eventos e regras permanecem canônicos. Cristais ocultam a casca circular; Simples mantém as esferas anteriores. As marcas de power-ups ficam acima dos materiais.

## VFX e custo

Seleção: brilho confinado à peça selecionada, sem emissão contínua sobre o tabuleiro. Existe apenas enquanto a seleção está ativa e desaparece com a seleção. Nenhuma partícula é criada pelo HUD. Reflexos e iluminação das joias são estáticos; reduced-motion não perde informação. Os contadores atualizam nós de texto estáveis e mantêm o painel ilustrado montado.

## Validação

Capturas do jogo real em 390×844 e 1024×1536; testes de geometria/interação também em 360×800 e paisagem 844×390. Comparar a arte e a diagramação separadamente de valores, posições de formação, número de personagens e adversários, que dependem do estado real da partida. Testes verdes não equivalem a identidade pixel a pixel com uma ilustração estática.
