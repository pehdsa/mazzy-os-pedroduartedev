# SOLID sem complicar — carrossel Concepts

**Tag:** Concepts
**Data:** 2026-05-22
**Tipo:** carrossel texto, 8 slides
**Formatos:** instagram/ (1080x1350, 4:5) + linkedin/ (1080x1080, 1:1)

## Slide 01 — Capa (merged com contexto)
Eyebrow: CONCEPTS · DEV
Título: **SOLID sem _complicar_**
Subtítulo: 5 princípios de design popularizados por **Robert C. Martin** pra escrever código mais fácil de manter.
Visual: 5 letter cards S O L I D

## Slide 02 — S
Letra grande: **S**
Nome: Single Responsibility (Responsabilidade Única)
Definição: Uma classe, função ou módulo deve ter um único motivo pra mudar.
Exemplo: Em vez de `Relatorio` faz tudo, separa em: GeradorRelatorio · FormatadorPDF · EnviadorEmail

## Slide 03 — O
Letra grande: **O**
Nome: Open/Closed (Aberto pra Extensão, Fechado pra Modificação)
Definição: Adicionar comportamentos novos sem alterar código que já funciona.
Exemplo: Em vez de função com vários `if` por tipo de desconto: DescontoClienteComum · DescontoClienteVIP · DescontoCupom

## Slide 04 — L
Letra grande: **L**
Nome: Liskov Substitution (Substituição de Liskov)
Definição: Classe filha deve substituir a pai sem quebrar comportamento.
Exemplo: `Pinguim extends Pato` com `voar()` quebra. O erro está no modelo, não no pinguim.

## Slide 05 — I
Letra grande: **I**
Nome: Interface Segregation (Segregação de Interfaces)
Definição: Não force uma classe a implementar métodos que não usa.
Exemplo: Em vez de interface `Funcionario` com `programar()`, `vender()`, `limpar()`, cria interfaces menores: Programador · Vendedor · AuxiliarLimpeza

## Slide 06 — D
Letra grande: **D**
Nome: Dependency Inversion (Inversão de Dependência)
Definição: Depende de abstrações, não de implementações concretas.
Exemplo: Em vez de depender de `MySQLDatabase`, depende da interface `Database`. Trocar pra MySQL · PostgreSQL · MongoDB vira detalhe.

## Slide 07 — Resumo + Fechamento (merged)
Eyebrow: RESUMO PRÁTICO
Título: **Pra que serve SOLID?**
Intro: Não é sobre código "bonito". É sobre reduzir dor quando o sistema muda.
Bullets:
- Separar responsabilidades
- Evitar alterações perigosas
- Facilitar testes
- Reduzir acoplamento
- Tornar o código mais flexível
Closing quote: _Se seu código é fácil de mudar, provavelmente está no caminho certo._

## Slide 08 — CTA
Padrão (logo + "Curtiu? Siga para ver mais." + handle + topic pills). Cor Concepts: `#06B6D4`.
