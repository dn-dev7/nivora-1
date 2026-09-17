# NivoAI

NivoAI é um projeto de inteligência artificial com foco em uma experiência simples, rápida e consistente em web e mobile.

O projeto reúne interface, autenticação, persistência de dados, infraestrutura e uma API própria para os recursos de IA.

## Arquitetura

- Next.js + React + TypeScript
- API e lógica de servidor integradas à aplicação
- Supabase para autenticação e dados
- Cloudflare Workers para execução e infraestrutura
- suporte a PWA e integração mobile

## API do NivoAI

O NivoAI utiliza uma API própria para centralizar a comunicação entre a aplicação e os recursos de inteligência artificial.

Essa camada permite manter a lógica do produto no servidor, organizar integrações, controlar o fluxo das requisições e evoluir os recursos de IA sem acoplar a interface diretamente à infraestrutura interna.

## Segurança

A autenticação é validada no servidor. Sessões, cookies e operações protegidas são tratados no backend, e credenciais privadas não são enviadas para o navegador.

As configurações sensíveis devem permanecer em variáveis de ambiente e nunca ser commitadas no repositório.

## Desenvolvimento

Requisitos:

- Node.js 22.13+
- pnpm

```bash
pnpm install
pnpm dev
```

Build de produção:

```bash
pnpm build
```

## Estrutura

```text
app/          interface e rotas da aplicação
components/   componentes reutilizáveis
lib/          serviços e utilitários
supabase/     configuração de banco e funções
mobile/       integração mobile
tests/        testes automatizados
```

## DN DEV

Projeto desenvolvido e mantido como parte dos produtos da DN DEV.
