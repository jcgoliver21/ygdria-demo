# 12 Reinos v10

Data: 2026-08-13

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
