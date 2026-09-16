# Ygdria Backstage 2 — local e web

Painel de conteúdo sem banco de dados. Os dados ficam em `backstage/data/content.json` e são compilados para os arquivos consumidos pelo jogo.

## Painel publicado

Abra https://jcgoliver21.github.io/ygdria-demo/backstage/public/ no computador ou celular. Rascunhos e arquivos enviados ficam no armazenamento deste navegador. Depois do primeiro acesso, o editor pode abrir offline; imagens originais ainda não visitadas exigem conexão. Navegadores limitam o espaço local: use o painel local para mídias grandes.

Na **Oficina**, baixe um pacote JSON com o conteúdo e as mídias enviadas. Importe esse pacote no Backstage local, revise, salve e publique. O painel público não recebe credenciais, não modifica o site de outros usuários e não executa Git. A prévia na web abre a versão publicada, enquanto a prévia local mostra o conteúdo salvo.

## Recursos de revisão

- Histórico de oito pontos de recuperação neste navegador e backups anteriores a cada gravação local em `backstage/backups/` (pasta privada, fora do Git).
- Importação validada como rascunho; exportação com mídias enviadas. Arquivos originais do jogo continuam referenciados pelos caminhos do projeto.
- Duplicação de personagens, itens e fases. Um personagem novo é um registro editorial; suas regras de combate ainda precisam ser integradas ao motor. Fases humanas continuam limitadas a dez.
- Prévia animada de folhas, controle de grade e FPS, prévias de imagens e áudio na biblioteca, contagem de referências de mídia.
- Checklist de campos incompletos, IDs repetidos, valores de efeito, caminhos e arquivos ausentes. Caderno de produção com sugestões editoriais.
- Dez itens atuais dos Humanos e da Luz. Itens integrados podem ser ocultados da loja; a exclusão é bloqueada para preservar recompensas e inventários existentes.
- Atalho Ctrl/Cmd+S. Salvamento explícito no projeto e rascunho automático no navegador.

Não há monitoramento global de contas, jogadores online, ranking ou gastos sem um serviço conectado.

## Abrir no computador

Na raiz de `ygdria-demo`, execute:

```powershell
pnpm run backstage
```

No Windows, também é possível abrir `backstage/start-backstage.cmd` com dois cliques.

Abra `http://localhost:4399`. O servidor imprime também um endereço protegido para abrir no celular conectado à mesma rede Wi-Fi.

## Fluxo editorial

1. Edite reinos, fases, missões, falas, itens ou menus.
2. Use **Salvar** para gravar e compilar os arquivos locais.
3. Use **Abrir prévia** para conferir o jogo.
4. Em **Publicar**, execute **Validar e preparar**.
5. Use **Publicar no site** somente depois que o relatório estiver aprovado.

O envio é bloqueado se os testes falharem, se a cópia local não partir da versão atual de `main` ou se houver arquivos inesperados na área preparada. O painel nunca força a substituição do histórico remoto.

## Limites atuais

- O Reino dos Humanos é jogável e deve conservar dez fases nesta versão do runtime.
- Novos reinos podem ser estruturados no painel como rascunhos; torná-los jogáveis exige os cenários, inimigos, personagens e regras correspondentes no runtime.
- Imagens e músicas enviadas pelo painel ficam em `assets/backstage/` e podem ser vinculadas por seus caminhos.
- O catálogo inicial contém os 24 personagens já presentes no jogo. Cada registro aceita carta e folhas de repouso, ataque, conjuração, dano, vitória e derrota.
- Uma folha de animação só substitui a publicada quando sua grade for informada, a opção de ativação for marcada e a validação for aprovada.
- Itens novos podem reutilizar efeitos suportados: `shuffle`, `royalShuffle`, `healPercent` e `attackMultiplier`. O reinício continua exclusivo da Benção da Eternidade.
- Uma mecânica inédita precisa ser programada uma vez antes de ter seus parâmetros expostos no painel.
