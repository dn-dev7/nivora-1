# NivoStudy

Aplicativo de estudo ativo, preparação para provas e progresso pessoal. Interface em português, com modo escuro e claro, sidebar no desktop e navegação inferior no mobile.

## Primeira versão

- Perfil e matérias com identidade autenticada do ChatGPT no ambiente Sites.
- Sessões de foco com tempo calculado no servidor, pausa, retomada e registro de aprendizado.
- Banco inicial de 40 questões originais: 20 de Matemática, 10 de Ciências, 5 de Português e 5 de História.
- Quiz, treino por assunto, simulado com limite de tempo e respostas persistidas.
- Correção de servidor, caderno de erros, flashcards com revisão espaçada simples.
- NivoStudy Score transparente, XP, níveis, sequência, progresso e recordes básicos.
- Provas com preparação estimada e priorização de assuntos.
- Atividades privadas por padrão, seguidores mútuos, feed, aplausos e comentários.
- Desafios pessoais e resumo semanal compartilhável como texto.

Não há integração de IA, uploads, clubes, rankings ou exportação de cards como imagem nesta etapa. A preparação é uma estimativa baseada na prática, não uma previsão de nota. O banco inicial é limitado e as equações de Matemática são exercícios de nível básico.

## Desenvolvimento

Requer Node 22.13+ e pnpm 10 (veja a versão em `package.json`).

```sh
pnpm install
pnpm dev
pnpm build
```

A aplicação usa Vinext e Cloudflare Workers. Em produção, perfis e estudos são armazenados no projeto NivoStudy do Supabase via uma Edge Function autenticada exclusivamente pelo servidor. O login usa código por e-mail (OTP) no Supabase Auth, com senha como alternativa, com validação online da identidade, cookies HttpOnly/Secure e renovação de sessão no backend. `SUPABASE_URL` e `SUPABASE_SERVER_TOKEN` são configurados no ambiente de hospedagem; nenhuma chave de serviço é enviada ao navegador. As tabelas têm RLS e acesso direto de clientes bloqueado. As consultas permitidas estão em `supabase/statements.json`, e `supabase/schema.sql` documenta o esquema PostgreSQL. Para alterar consultas, atualize também esse registro no banco.

Sem essas variáveis, o banco D1 permanece disponível para desenvolvimento local. O plugin de build configura o Worker e o binding D1 `DB` a partir de `.openai/hosting.json`. Gere mudanças de banco com `pnpm db:generate` e inspecione as migrações em `drizzle/`.

Para desenvolvimento local com banco, faça um build e aplique cada migração pendente uma única vez:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_empty_jubilee.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_good_angel.sql
```

No Supabase, configure **Authentication → URL Configuration** com Site URL `https://nivora.daniel-fe4.chatgpt.site` e Redirect URL `https://nivora.daniel-fe4.chatgpt.site/auth/confirm`. A página recebe links de confirmação e recuperação, valida a sessão no servidor e remove os tokens da URL. Mantenha a confirmação de e-mail habilitada e configure SMTP para envios a usuários fora da equipe do projeto. O envio padrão do Supabase é restrito e não serve para um lançamento geral.

A chave publishable no módulo de Auth não concede acesso às tabelas. A identidade usada em todas as consultas é o ID retornado por `/auth/v1/user`; cookies e metadados editáveis não são confiados para autorização. Perfis anteriores do ChatGPT permanecem preservados com seus IDs antigos; contas Supabase têm IDs próprios e não são vinculadas automaticamente por e-mail.

Em desenvolvimento, os cookies `__Host-` exigem HTTPS. Os testes em `tests/auth.mjs` verificam validação online, renovação, rejeição de tokens inválidos, proteção de origem, confirmação, recuperação e limpeza dos cookies usando um serviço Auth simulado. O teste de regras de estudo continua em `tests/core.mjs`.

## Privacidade e regras

As atividades começam privadas. Dados de aprendizado pessoais ficam nas consultas do proprietário; o feed contém apenas métricas e identificação pública. A leitura de atividades de amigos exige uma relação mútua verificada no servidor. Notas, escola e localização não são solicitadas.

XP é deduplicado por conclusão e por questão no dia UTC. O Score reflete rotina recente. Os dias desta primeira versão usam UTC de forma consistente; localização e fuso por perfil estão previstos para evolução.

Antes de liberar a comunidade para múltiplos usuários, implemente bloqueio, denúncia e moderação. A versão inicial é publicada com acesso privado.

Veja o briefing revisado em [docs/NIVORA-PROMPT.md](docs/NIVORA-PROMPT.md).

## Verificação do Supabase

`tests/supabase.mjs` faz uma verificação real da Edge Function usando `NIVO_TEST_SUPABASE_URL` e `NIVO_TEST_SUPABASE_TOKEN`, ambos fornecidos no ambiente. Verifica bloqueio de chamadas sem credencial, consultas registradas, parâmetros com aspas, perfil e sessão persistidos, filtros por proprietário e rollback do lote. Rode somente em ambiente de teste: o script imprime os IDs criados para remoção posterior; ele não possui privilégios de administração para excluir perfis. Os registros temporários usados na implantação inicial foram removidos.

O registro de consultas permite somente instruções já presentes no backend; o endpoint rejeita SQL arbitrário. Lotes de conclusões e revisões são transacionais. A credencial compartilhada fica apenas nos segredos do servidor; a Edge Function guarda somente seu hash e usa sua chave interna de serviço. RLS sem políticas nas tabelas é intencional: nega acesso direto de `anon` e `authenticated`; a autorização de cada usuário ocorre no backend autenticado do NivoStudy.


## Entrada e prévia visual

A entrada segue as proporções da gravação fornecida: mosaico original de estudos, mascote central, e-mail isolado, sugestões de domínio, código com seis posições e perguntas em conversa. Apple e Google aparecem desabilitados enquanto os provedores não estiverem configurados. Não simulam um login. Para ver as perguntas sem autenticar ou enviar dados, abra `/criar-conta?preview=1`; essa prévia é identificada na tela e não grava respostas.

Para ativar a entrada por código, configure posteriormente SMTP e o template Magic Link no Supabase incluindo `{{ .Token }}`. As configurações do painel foram deixadas para o proprietário, conforme solicitado. Não foi enviada mensagem de teste por e-mail nem criado usuário real nesta atualização.
