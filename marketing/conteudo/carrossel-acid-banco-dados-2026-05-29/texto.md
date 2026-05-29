# ACID em bancos de dados — carrossel Concepts

**Tag:** Concepts
**Data:** 2026-05-29
**Tipo:** carrossel texto, 8 slides
**Formatos:** instagram/ (1080x1350, 4:5) + linkedin/ (1080x1080, 1:1)
**Série:** "Banco de Dados na Arquitetura" #2 de 4 (este foca em conceito)

## Frase guia
Toda transação confiável em um banco passa por 4 garantias: Atomicidade, Consistência, Isolamento, Durabilidade. Sem ACID, sistema fica em estado quebrado.

## Slide 01 — Capa
Eyebrow: CONCEPTS · DATABASE
Título: **ACID. Por que importa quando seus dados _não podem quebrar_.**
Subtítulo: O que sustenta toda transação confiável em um banco de dados.
Visual: 4 cards (A, C, I, D)

## Slide 02 — O cenário
Eyebrow: 01 · O CENÁRIO
Título: **Sua aplicação raramente faz _uma coisa só_**
Lista de operações compostas (criar pedido, atualizar estoque, registrar pagamento, gravar log, mudar status)
Rodapé: Esse conjunto é uma transação. Uma unidade lógica de trabalho.

## Slide 03 — A · Atomicidade
Eyebrow: 02 · ATOMICIDADE
Título: **Tudo, ou _nada_.**
Visual 2 colunas: sucesso (COMMIT ✓) vs falha (ROLLBACK ✗)
Exemplo: transferência bancária (debita A → credita B)
Rodapé: Atomicidade evita estado inconsistente.

## Slide 04 — C · Consistência
Eyebrow: 03 · CONSISTÊNCIA
Título: **A transação respeita _as regras_ do banco**
Lista: constraints, chaves estrangeiras, tipos, unicidade, validações de integridade
Rodapé: Sai de um estado válido. Vai para outro estado válido.

## Slide 05 — I · Isolamento
Eyebrow: 04 · ISOLAMENTO
Título: **Muitas transações ao mesmo tempo, _sem se atrapalhar_**
3 problemas sem isolamento:
- Dirty read (leitura de dados não confirmados)
- Lost update (duas transações atualizando o mesmo dado)
- Non-repeatable read (mesma query, resultado diferente)
Níveis: READ COMMITTED · REPEATABLE READ · SERIALIZABLE
Rodapé: Cada nível equilibra segurança e desempenho.

## Slide 06 — D · Durabilidade
Eyebrow: 05 · DURABILIDADE
Título: **COMMIT é _COMMIT_. Não some.**
Mecanismos: WAL, logs de transação, escrita em disco, recovery
Rodapé: Servidor caiu? Os dados confirmados continuam lá.

## Slide 07 — Por que importa
Eyebrow: 06 · NO MUNDO REAL
Título: **Sistemas críticos não toleram _estado quebrado_**
Exemplo e-commerce (5 etapas) + reforço
Rodapé: ACID é a base de sistemas que mexem com dinheiro, estoque, contratos e dados sensíveis.

## Slide 08 — CTA
Padrão Concepts (4 tags ativas: News, Concepts, Architecture, AI). Cor: `#06B6D4`.

## Próximos da série
- #3 CAP e PACELC: o que você troca quando escala
- #4 Replication, sharding e escala horizontal de verdade
