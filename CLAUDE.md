# Pedro Duarte Dev — MazyOS

Operação da marca pessoal **Pedro Duarte Dev** (pedroduarte.dev). Aqui o
conteúdo é produzido, organizado, publicado e a autoridade na cena tech
é construída — uma publicação de cada vez.

## O que é esse workspace

Sistema operacional do criador solo Pedro Duarte. Tudo que sai pro
público (carrossel, post de blog, vídeo, newsletter) nasce, é
calibrado e ganha versão final aqui. As skills do MazyOS leem o
contexto desse repo antes de gerar qualquer coisa.

**Estrutura de pastas:**
- `_memoria/` — quem é o Pedro, como ele escreve, o que tá em foco
- `identidade/` — cores, fontes, logo, padrão visual (lido pelas skills visuais)
- `marketing/` — conteúdo produzido (carrosséis, posts, calendário editorial)
- `saidas/` — análises, emails, documentos pontuais
- `produtos/` — produtos próprios (cursos, ebooks, ofertas) — vazio por enquanto
- `audiencia/` — listas, dados, contatos da base
- `dados/` — arquivos a analisar (CSV, PDF, planilha)
- `scripts/` — utilitários (gerar imagem, postar, render)
- `tarefas.md` — o que tá em jogo agora

## Quem sou

Sou Pedro Duarte. Crio conteúdo sobre tecnologia, desenvolvimento e
engenharia de software pra comunidade dev — devs, estudantes e quem
tá entrando ou se aprofundando na área.

O que diferencia: foco em **clareza** e **utilidade real**. Sem
posição de guru, sem hype. Conteúdo de par pra par, organizado por
tags (Notícias, Estudos, Conceitos), pra quem quer acompanhar o que
importa de verdade na cena tech.

## O que produzo

- **Carrosséis no Instagram** — formato principal de distribuição
- **Posts no blog (pedroduarte.dev)** — versão longa e indexável do conteúdo
- **11 tags oficiais** organizando o conteúdo: News, Concepts, Code,
  Architecture, AI, Career, Tools, Study, Security, DevOps, Opinion
  (cada uma com ícone Lucide e cor própria em `identidade/design-guide.md`)

## Minha audiência

Comunidade tech ampla — devs em qualquer nível de carreira, estudantes
de TI, pessoas interessadas em tecnologia. Sem base pronta ainda — o
perfil tá no início.

Objetivo: posicionar como **autoridade** na cena tech. Conteúdo
educativo e informativo vem antes de qualquer CTA comercial.

## Tom de voz

Direto, conversacional, sem floreio. Frases curtas, português
brasileiro coloquial mas claro. Quando explica algo técnico, prioriza
a clareza pra qualquer pessoa entender — do estudante ao sênior.
Termos técnicos consagrados em inglês ficam em inglês (deploy, commit,
framework).

**Evitar:** linguagem de guru, jargão corporativo ("alavancar",
"sinergia"), motivacional vazio ("acredite no processo"), saudações
genéricas, emoji em contexto formal, tom de "expert que sabe tudo".

Detalhes completos em `_memoria/preferencias.md`.

## Posicionamento

O dev brasileiro que organiza e traduz o que importa na cena tech.
Notícia que vale a pena ler, conceito explicado sem encheção, estudo
que vira ponto de partida pra outras pessoas. Pra quem quer
acompanhar tech sem se afogar em ruído.

## Regras do sistema

- Conteúdo novo salvar em `marketing/conteudo/<tipo>-<tema>-<data>/`
- Todo carrossel ou post visual lê `identidade/design-guide.md` antes
  de gerar — paleta dark + Montserrat / Geist Mono
- Antes de publicar qualquer coisa, passar pela skill `/aprovar-post`
- O blog roda em `pedroduarte.dev` — pasta do site fora desse repo
  (será conectada via skills futuras)

## Ferramentas conectadas

- [x] Pencil (design system em `/Volumes/trabalho/projetos/layouts/pedroduarte.pen`)
- [x] GitHub (via `/salvar`)
- [ ] Notion
- [ ] Canva
- [ ] Google Calendar
- [ ] Meta Ads
- [ ] Google Ads
- [ ] Meta Graph API (pra publicação automática — usada por `/aprovar-post`)

*(Marcar conforme for instalando os MCPs.)*

---

## Contexto do negócio (regras herdadas do MazyOS)

No início de toda conversa, ler os seguintes arquivos:

1. `_memoria/empresa.md` — quem é o Pedro, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Pra
qualquer tarefa visual, consultar `identidade/design-guide.md`.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill.

Ao concluir uma tarefa que não tinha skill mas parece repetível,
perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

---

## Aprender com correções

Quando o usuário corrigir algo ou der uma instrução permanente ("na
verdade é assim", "não faça mais isso", "prefiro assim", "sempre que..."),
perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:
- **Sobre o negócio** → `_memoria/empresa.md`
- **Sobre preferências e estilo** → `_memoria/preferencias.md`
- **Sobre prioridades e foco** → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, ferramenta instalada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`
2. Perguntar se é específica desse projeto ou universal:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md`
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md`
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
4. Seguir o fluxo da skill-creator nativa do Claude Code
