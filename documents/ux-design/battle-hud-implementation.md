# Implementação da referência aprovada

Aplicar `documents/designs/battle-hud-reference.md` ao jogo existente. Manter motor, cenas narrativas, APIs dos controles, inventário e progressão. Nenhuma migração para React, Tailwind ou novo motor: a referência aprovada, e não variações de SaaS, define o escopo.

Componentes: identidade e emblema, relógios, estado da vez, objetivo, recorde, quatro ações, moldura de HP, tabuleiro, carta completa, lupa, orientação e histórico. O módulo de arte pode decorar esses componentes, nunca assumir estado de combate. As constantes canônicas continuam a fornecer símbolos e valores.

Comparar capturas reais na proporção de 1024×1536 e testar adaptação a 390×844. Rejeitar recortes de cartas, sobreposições, símbolos trocados, cronômetros ilegíveis e power-ups sem diferenciação. Testar cada controle com cliques reais, pausa, retorno ao jogo e fim de batalha antes de considerar a publicação.
