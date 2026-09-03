# 12 Reinos v10

Data: 2026-08-14

## v11.0.52 — Hierarquia dos destinos

- selo da abertura atualizado para o monograma de Ygdria;
- títulos dos destinos reduzidos em 10%, com ícone alinhado no topo;
- linha divisória sutil e subtítulos posicionados abaixo; História e Continuar agora têm larguras iguais.

## v11.0.51 — Destinos ilustrados e compactos

- home reorganizada sem moldura dominante: cada destino ganhou cenário próprio, borda artística e ícone VFX de ativação;
- cards compactos em celular, sem rolagem ou texto cortado;
- acesso de conta movido para o rodapé e Perfil concentrado em conquistas e jornada;
- cache renovado para impedir que a Biblioteca e a home anteriores sejam reutilizadas.

## v11.0.49 — Trilha final atualizada

- nomes dos reinos reduzidos em 10%, preservando posições e leitura em uma linha;
- música da missão 5 da Fase 10 substituída pela nova faixa fornecida;
- cache renovado para distribuir o áudio atualizado.

## v11.0.48 — Ícones centralizados nos reinos

- ícones dos reinos posicionados abaixo dos subtítulos;
- nomes e subtítulos centralizados sem alterar as coordenadas do mapa;
- cache renovado para distribuir a revisão.

## v11.0.45 — Seletor de fases revisado

- subtítulos do mapa e das fases ampliados, preservando a leitura do mapa vertical;
- fases reorganizadas em cabeçalho, conteúdo e rodapé;
- dificuldade F/N/D/P passou para cada fase, com estrelas por seleção e Pesadelo bloqueado até concluir a fase;
- removido o seletor global de dificuldade das opções e renovado o cache da publicação.

## v11.0.46 — Posições aprovadas e cores de dificuldade

- posições dos nomes e ícones do mapa restauradas ao layout aprovado;
- estrelas do rodapé agora seguem as cores de Bronze, Prata, Ouro, Cristal e Pesadelo;
- cache renovado para distribuir a correção.

## v11.0.47 — Subtítulos no tamanho aprovado

- subtítulos do mapa restaurados ao tamanho anterior aprovado;
- posições dos nomes e ícones preservadas;
- cache renovado para distribuir a auditoria final do mapa.

## v10.0.21 — Elenco humano completo animado

- inclusão do Soldado da Biblioteca 1 na matriz de animação própria;
- cache e smoke test de produção atualizados para a release final.

## v10.0.20 — Animação real de inimigos por identidade

- folhas 2×3 reais para todos os inimigos humanos e criaturas da campanha, partindo da arte oficial de cada identidade;
- sequências de idle, ataque, conjuração, dano e vitória por personagem, sem reutilizar o guarda genérico;
- QC com escala compartilhada, pés alinhados e rejeição de frames cortados.

## v10.0.19 — Identidade dos inimigos e arenas reforçadas

- Inimigos do Reino dos Humanos voltaram a usar sua arte oficial individual; o runtime não os substitui mais por um guarda genérico.
- As artes oficiais recebem idle, ataque, conjuração, impacto e vitória por movimento rígido, sem variar a escala corporal.
- Arenas receberam raios móveis, névoa em primeiro plano, motes ascendentes e presença de chefe mais intensa, com alternativa de movimento reduzido.
- Cache/PWA renovado para distribuir a correção.

## v10.0.18 — Direção épica de combate

- Inimigos exclusivos agora lutam com folhas 2×3 transparentes de seis arquétipos: guarda humano, slime rúnico, lobo sombrio, espectro amaldiçoado, sentinela de pedra e dragão carmesim.
- Cada arquétipo usa repouso, investida, conjuração, dano e vitória por sequência de quadros, sem ampliar o corpo entre ações. Terrestres são alinhados pelo contato com o chão; espectros preservam a suspensão.
- Impactos de ataque, acerto crítico, telegráfo de chefe e aura de carregamento passaram a ter leitura própria, sempre sob orçamento de partículas e movimento reduzido.
- A arena ganhou atmosfera viva por reino, presença de chefe e reforço visual de raridade/carga.
- Cache/PWA renovado para distribuir todos os novos assets.

## v10.0.17 — Estatura estável entre animações

- Corrigida a troca de escala entre as cinco ações do elenco, com Lucius como caso principal: a estatura é normalizada pelo idle e ancorada na linha dos pés.
- A vitrine de animações agora usa a mesma regra do runtime para revisão confiável das poses.
- Removidos máscara e recorte que suavizavam inimigos estáticos; a arte fonte preserva os pixels e a sombra é aplicada externamente.
- Cache/PWA renovado para distribuir a correção.

## v10.0.16 — Escala corporal revisada

- Equalizadas as referências aprovadas da Ninfa e de Adriel Jovem.
- Corrigidos Lucius, Mardogear, Blizzardo e os jovens selecionados.
- Invocações mantidas na escala `1.00`.
- Cache/PWA renovado para a publicação.

## v10.0.15 — Nova escala visual de unidades

- Ajustadas as escalas canônicas de cartas jovens, soldados, capitães e criaturas.
- Mantida a escala adulta em 1.30 e gigante em 2.00.
- Cache/PWA renovado para distribuir a alteração aos jogadores.

## v10.0.8 — Ajustes finais de animação e vitrine pública

- Atualizadas somente as animações aprovadas: ataques e conjurações de reinos específicos, o ritmo do idle de Rashid e a nova Conjuração de Lucius com cetro e fogo.
- A vitrine em movimento passa a acompanhar a publicação para revisão direta das 120 ações.
- Cache/PWA renovado para que instalações existentes baixem as folhas desta revisão.

## v10.0.7 — Animações aprovadas promovidas

- Promovidas para o runtime público as 120 folhas aprovadas da matriz v10 (24 personagens × idle, ataque, conjuração, impacto e vitória).
- Cada folha é validada como PNG RGBA com transparência, grade, âncora e escala consistentes antes da publicação.
- URLs dos sprites e cache/PWA receberam revisão própria para forçar a atualização em instalações já existentes.

## v10.0.6 — Torre aterrissada e animações publicadas

- A Torre de Acesso à Eternidade agora usa a faixa real do pátio da arte: heróis e inimigos ficam ancorados no mármore, com perspectiva e grade tática próprias.
- Publicada a matriz completa de animações v10: 24 personagens, cinco movimentos por personagem (idle, ataque, conjuração, impacto e vitória), incluindo quando cartas aparecem como inimigas.
- Cache/PWA renovado para garantir que o navegador baixe a atualização.

## v10.0.1 — Arena e inimigos animados

- Escala de combate restaurada para os chibis, mantendo os pés ancorados no cenário em desktop e celular.
- Personagens enfrentados como inimigos agora usam suas folhas v10 de idle, ataque, conjuração, impacto e vitória.
- Inimigos exclusivos recebem idle, investida, conjuração e impacto com movimento de combate, sem custo extra de download.
- A habilidade carregada agora emite uma aura viva do corpo com partículas ascendentes; a moldura quadrada foi removida.

## Destaques

- Cinco movimentos corporais em folhas 2.5D para os 24 personagens jogáveis: idle, ataque, conjuração, impacto e vitória.
- VFX de reino separados do corpo, com orçamento adaptativo e pooling de elementos.
- Vitrine de movimentos dentro do catálogo de cartas.
- Carregamento sob demanda do time ativo, fallback para a ilustração estática e cache offline versionado.
- Agendador de combate seguro ao pausar, reiniciar e trocar de fase.
- Reviver pela Lágrima da Eternidade ou pelo Chamariz volta corretamente ao turno do jogador.
- Backup v10 exporta apenas progresso e preferências; dados de conta nunca entram no código de backup.
- Importação de progresso validada antes da gravação, com reversão do lote em falhas e limites seguros para moedas, XP e inventário.
- Contas locais usam PBKDF2-SHA-256 com salt aleatório e migram hashes legados após o login correto.
- Campanha, Torre, Desafio Diário e Boss Rush agora são isolados; uma derrota reinicia sequências especiais desde o primeiro confronto.
- Loops visuais e relógios são interrompidos ao sair da batalha, reduzindo trabalho oculto e consumo de bateria.
- Barra de HP com valores acessíveis corretos e redução de flashes ampliada.
- Sorteios de gameplay de Julius agora respeitam a semente determinística da partida.

## Compatibilidade

- Saves locais da v9.3 continuam sendo lidos pelo jogo.
- O novo formato de backup usa esquema explícito `12r-progress`, versão 10.
- O bloqueio da página inicial continua sendo uma barreira de conveniência no navegador, não autenticação de servidor.
- Os arquivos v9.3 permanecem no histórico Git para rollback.
## v11.0.53 — Emblemas ilustrados do menu

- Aplicados oito emblemas desenhados e o novo tomo da Biblioteca da Eternidade.
- Revisados títulos e subtítulos para refletir a identidade visual de cada destino.
