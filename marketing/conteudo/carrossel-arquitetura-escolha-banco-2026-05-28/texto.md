# Como escolher um banco de dados — carrossel Architecture

**Tag:** Architecture
**Data:** 2026-05-28
**Tipo:** carrossel texto, 8 slides
**Formatos:** instagram/ (1080x1350, 4:5) + linkedin/ (1080x1080, 1:1)
**Série:** "Banco de Dados na Arquitetura" #1 de 4

## Frase guia
"Banco de dados não se escolhe por popularidade. Se escolhe pelo formato do problema, pelos acessos e pelas garantias que a arquitetura precisa."

## Slide 01 — Capa
Eyebrow: ARCHITECTURE · DATABASE
Título: **Banco de dados não se escolhe por _popularidade_.**
Subtítulo: Se escolhe pelo problema, pelo acesso e pelas garantias.
Visual: linha de bancos icônicos (Postgres, Mongo, Redis, Cassandra) com um destaque "?"

## Slide 02 — Modelo de dados
Eyebrow: 01 · COMECE PELO MODELO
Título: **Como esses dados _se relacionam_?**
Reframe: Antes de pensar em banco, pensa na natureza dos dados.
Bloco grande:
- Altamente relacional, integridade forte, transações, relatórios consistentes → **relacional**
- Postgres, MySQL, SQL Server
- Exemplo: financeiro, pedidos, faturamento, CRM, estoque

## Slide 03 — Padrão de acesso
Eyebrow: 02 · PADRÃO DE ACESSO
Título: **A pergunta certa: _como_ a aplicação lê e escreve?**
Grid 2x2 com pergunta + resposta:
- Relacionamentos estruturados, joins e transações? → SQL (PostgreSQL, MySQL)
- Agregados flexíveis e dados semi-estruturados? → Documento (MongoDB, CouchDB)
- Acesso simples por chave e baixa latência? → Key-value (Redis, DynamoDB)
- Travessias profundas entre relações? → Grafo (Neo4j, ArangoDB)
Rodapé: O modo de acesso revela o banco antes do hype.

## Slide 04 — Banco × estilo arquitetural
Eyebrow: 03 · BANCO × ARQUITETURA
Título: **Casamento com o estilo do sistema**
Lista de combinações:
- Monólito modular → Relacional resolve bem. PostgreSQL costuma ser um default sólido
- Microserviços → cada serviço escolhe seu banco conforme o domínio, não conforme o time vizinho
- Event-driven → Banco transacional + broker para integração. Event store quando histórico é parte do modelo
- Analytics → banco operacional separado de data warehouse ou lakehouse
- Tempo real → Redis pra baixa latência, séries temporais pra métricas, streaming pra fluxos contínuos
- Busca textual → Elasticsearch como motor de busca. Evite como fonte principal da verdade

## Slide 05 — Vertical vs Horizontal
Eyebrow: 04 · COMO ESSE BANCO ESCALA
Título: **Vertical ou _horizontal_?**
Visual 2 colunas:
- Esquerda: 1 servidor crescendo (CPU ↑, RAM ↑, DISK ↑) — Vertical → Postgres e MySQL costumam começar vertical, escalam com réplicas de leitura
- Direita: vários servidores em grid (replicação) — Horizontal → Cassandra e DynamoDB nasceram horizontal. MongoDB também suporta sharding e distribuição
Rodapé: A pergunta não é só "quanto cresce". É "pra onde cresce".

## Slide 06 — Garantias
Eyebrow: 05 · GARANTIAS DA ARQUITETURA
Título: **Cada sistema pede garantias diferentes**
Grid 2x2:
- Transação forte? → relacional
- Escala horizontal massiva? → bancos distribuídos / NoSQL
- Baixa latência por chave? → cache / key-value
- Schema flexível? → documento
Rodapé: Banco bom é o que garante o que importa pro seu sistema.

## Slide 07 — Erros por hype
Eyebrow: 06 · O ERRO MORA NO HYPE
Título: **Escolher banco por _moda_ é dívida técnica disfarçada**
4 anti-padrões reais:
- "Vamos usar Mongo porque é moderno"
- "Microserviços com um banco compartilhado"
- "Elasticsearch como fonte da verdade"
- "Redis pra dado que não pode perder"
Rodapé: Hype não é decisão arquitetural. É falta de uma.

## Slide 08 — CTA
Padrão Architecture (logo + "Curtiu? Siga para ver mais." + handle + topic pills). Cor: `#8B5CF6`.

## Próximos da série
- #2 ACID, BASE e o que sua aplicação precisa garantir
- #3 CAP e PACELC: o que você troca quando escala
- #4 Replication, sharding e escala horizontal de verdade
