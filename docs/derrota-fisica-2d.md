# Física permanente de derrota 2D

Esta é a regra oficial para personagens, inimigos, invocações e novos assets de Ygdria/12 Reinos. Ela vale a partir da v10.0.33 e deve ser aplicada a qualquer identidade nova antes de entrar no jogo.

## O que a física garante

- A personagem mantém a arte original, a silhueta, a paleta, os olhos, os equipamentos e a escala aprovados.
- A queda é uma ação desenhada em quatro quadros: perda de equilíbrio, descida, contato com o chão e repouso.
- Os pés e os olhos continuam sendo os parâmetros de comparação com o idle. O quadro final precisa tocar a mesma linha de chão da unidade viva; não pode flutuar.
- Cabelo, capas, asas, caudas, armas e peças soltas respondem à gravidade. Uma asa ou personagem voando pode iniciar acima do chão, mas deve descer e repousar corretamente.
- A pose não pode ser criada apenas com rotação, espelhamento horizontal ou transform CSS.

## Regras de runtime

O runtime usa uma folha transparente 2×2 por identidade. A animação troca os quatro quadros e mantém o último quadro. Depois do contato:

- não há retorno ao idle, ataque ou RAF de idle;
- a opacidade permanece integral;
- a sombra fica estática;
- não existe pulsação, crescimento, encolhimento ou piscada de dano;
- desktop, celular e `prefers-reduced-motion` terminam na mesma leitura de repouso.

## Checklist obrigatório para novos personagens

1. Partir da arte original aprovada, sem reutilizar o sprite de outro personagem.
2. Gerar e processar a folha com `align=feet`, `scale_strategy=preserve` e componente principal preservado.
3. Reprovar qualquer saída cortada, quadro preso na borda ou contato inconsistente com o chão.
4. Registrar a folha no mapa de ações do runtime.
5. Testar a derrota no navegador em desktop, viewport móvel e movimento reduzido.
6. Conferir visualmente os olhos, os pés, os equipamentos caídos e a sombra no quadro final.

O contrato legível por máquina está em [`assets/characters/defeat-physics-contract.json`](../assets/characters/defeat-physics-contract.json). A galeria de referência desta publicação está em [`previews/comparativo-derrotas-v11.html`](../previews/comparativo-derrotas-v11.html).
