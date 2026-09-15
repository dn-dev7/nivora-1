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

A aplicação usa Vinext e Cloudflare Workers. Em produção, perfis e estudos são armazenados no projeto NivoStudy do Supabase via uma Edge Function autenticada exclusivamente pelo servidor. O login atual continua com ChatGPT. `SUPABASE_URL` e `SUPABASE_SERVER_TOKEN` são configurados no ambiente de hospedagem; nenhuma chave de serviço é enviada ao navegador. As tabelas têm RLS e acesso direto de clientes bloqueado. As consultas permitidas estão em `supabase/statements.json`, e `supabase/schema.sql` documenta o esquema PostgreSQL. Para alterar consultas, atualize também esse registro no banco.

Sem essas variáveis, o banco D1 permanece disponível para desenvolvimento local. O plugin de build configura o Worker e o binding D1 `DB` a partir de `.openai/hosting.json`. Gere mudanças de banco com `pnpm db:generate` e inspecione as migrações em `drizzle/`.

Para desenvolvimento local com banco, faça um build e aplique cada migração pendente uma única vez:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_empty_jubilee.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_good_angel.sql
```

A autenticação hospedada depende dos headers de identidade encaminhados pelo ambiente Sites. Um lançamento independente precisa integrar um provedor real de autenticação e disponibilizar D1; não basta publicar como página estática. Não exponha um servidor que aceite esses headers diretamente de visitantes sem uma camada confiável de autenticação.

## Privacidade e regras

As atividades começam privadas. Dados de aprendizado pessoais ficam nas consultas do proprietário; o feed contém apenas métricas e identificação pública. A leitura de atividades de amigos exige uma relação mútua verificada no servidor. Notas, escola e localização não são solicitadas.

XP é deduplicado por conclusão e por questão no dia UTC. O Score reflete rotina recente. Os dias desta primeira versão usam UTC de forma consistente; localização e fuso por perfil estão previstos para evolução.

Antes de liberar a comunidade para múltiplos usuários, implemente bloqueio, denúncia e moderação. A versão inicial é publicada com acesso privado.

Veja o briefing revisado em [docs/NIVORA-PROMPT.md](docs/NIVORA-PROMPT.md).

## Verificação do Supabase

`tests/supabase.mjs` faz uma verificação real da Edge Function usando `NIVO_TEST_SUPABASE_URL` e `NIVO_TEST_SUPABASE_TOKEN`, ambos fornecidos no ambiente. Verifica bloqueio de chamadas sem credencial, consultas registradas, parâmetros com aspas, perfil e sessão persistidos, filtros por proprietário e rollback do lote. Rode somente em ambiente de teste: o script imprime os IDs criados para remoção posterior; ele não possui privilégios de administração para excluir perfis. Os registros temporários usados na implantação inicial foram removidos.

O registro de consultas permite somente instruções já presentes no backend; o endpoint rejeita SQL arbitrário. Lotes de conclusões e revisões são transacionais. A credencial compartilhada fica apenas nos segredos do servidor; a Edge Function guarda somente seu hash e usa sua chave interna de serviço. RLS sem políticas nas tabelas é intencional: nega acesso direto de `anon` e `authenticated`; a autorização de cada usuário ocorre no backend autenticado do NivoStudy.
