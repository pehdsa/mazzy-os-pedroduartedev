# Arquitetura é trade-off — carrossel Architecture

**Tag:** Architecture
**Data:** 2026-05-22
**Tipo:** carrossel texto, 6 slides
**Formatos:** instagram/ (1080x1350, 4:5) + linkedin/ (1080x1080, 1:1) — variantes específicas por plataforma

## Slide 01 — Capa
Eyebrow: `ARCHITECTURE · DEV`
Título: **Arquitetura é _trade-off_. Maturidade é saber o preço.**
Visual: balança Ganho ↔ Preço

## Slide 02 — A armadilha
Eyebrow: PERGUNTA ERRADA
Título: A armadilha em tech
- ✕ Qual o melhor banco?
- ✕ Qual o melhor framework?
- ✕ Qual a melhor arquitetura?

Transição: _Não existe melhor universal. Existe o melhor **para o contexto**._

✓ O que precisamos otimizar agora?
Pills: Velocidade · Simplicidade · Escala · Custo · Autonomia · Consistência · Manutenção

## Slide 03 — Bancos
Eyebrow: EXEMPLO
Título: **Qual o melhor banco? _Depende._**

4 cards:
- **PostgreSQL** — Consistência, transações, relacionamentos e queries complexas
- **MongoDB** — Modelo flexível, mudanças frequentes e dados orientados a documentos
- **Redis** — Cache, sessões, filas simples e baixa latência
- **Cassandra** — Escrita em larga escala, distribuição global e alta disponibilidade

Fecho: _Nenhum é melhor em absoluto. Cada um resolve melhor um tipo de problema._

## Slide 04 — Microsserviços vs Monolito
Eyebrow: COMPARATIVO
Título: Cada arquitetura tem seu preço

**Microsserviços:** ✓ Autonomia entre times · ✓ Deploys independentes · ✓ Escala isolada · ✗ Custo operacional · ✗ Observabilidade complexa · ✗ Consistência distribuída

**Monolito:** ✓ Simplicidade · ✓ Desenvolvimento mais rápido · ✓ Debug mais fácil · ✗ Menos autonomia em escala · ✗ Menor isolamento entre módulos · ✗ Escala menos granular

Rodapé: _A mesma lógica vale para filas, cache, arquitetura hexagonal, Clean Architecture, serverless, event-driven, CQRS, GraphQL e REST._

## Slide 05 — Maturidade
Eyebrow: A LINHA QUE SEPARA
Frase grande: **A maturidade técnica está em saber _qual preço vale a pena pagar_.**
Explicação: Uma boa decisão arquitetural não é a que parece mais sofisticada no diagrama. É a que torna o sistema mais adequado para evoluir dentro da realidade do produto, do time e do negócio.

## Slide 06 — CTA
Padrão (logo + "Curtiu? Siga para ver mais." + handle + topic pills). Cor Architecture: `#8B5CF6`.
