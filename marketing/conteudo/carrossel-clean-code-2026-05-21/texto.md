# 5 ideias de Clean Code — carrossel

**Tag:** Concepts
**Data:** 2026-05-21
**Tipo:** carrossel texto puro, 7 slides, 1080x1350

## Slide 01 — Capa
Eyebrow: CONCEPTS
Título: **5 ideias de _Clean Code_**

Índice (5 cards numerados):
- 01 — Nomes que revelam intenção · Variáveis devem dizer o que fazem
- 02 — Funções pequenas e focadas · Faça uma coisa, e faça bem feita
- 03 — Evite comentários óbvios · O código deve se explicar sozinho
- 04 — DRY | Don't Repeat Yourself · Abstraia padrões repetidos
- 05 — Refatore sem medo · Sempre deixe melhor do que encontrou

## Slide 02 — Regra 01
Número: 01
Título: Nomes que revelam intenção
Subtítulo: Variáveis devem dizer o que fazem.

```js
// ❌ Antes
const d = 30;
const u = users.filter(x => x.a > d);

// ✅ Depois
const DIAS_PARA_INATIVAR = 30;
const usuariosInativos = users.filter(
  user => user.diasSemLogin > DIAS_PARA_INATIVAR
);
```

## Slide 03 — Regra 02
Número: 02
Título: Funções pequenas e focadas
Subtítulo: Faça uma coisa, e faça bem feita.

```js
// ❌ Antes
function processarPedido(pedido) {
  validarEstoque(pedido);
  calcularTotal(pedido);
  aplicarDesconto(pedido);
  enviarEmail(pedido);
  // ...mais 50 linhas
}

// ✅ Depois
function processarPedido(pedido) {
  validar(pedido);
  cobrar(pedido);
  notificar(pedido);
}
```

## Slide 04 — Regra 03
Número: 03
Título: Evite comentários óbvios
Subtítulo: O código deve se explicar sozinho.

```js
// ❌ Antes
// Incrementa o contador
contador++;

// Verifica se o usuário tá logado
if (usuario.logado) { /* ... */ }

// ✅ Depois
contador++;

if (usuario.logado) { /* ... */ }
```

## Slide 05 — Regra 04
Número: 04
Título: DRY | Don't Repeat Yourself
Subtítulo: Abstraia padrões repetidos.

```js
// ❌ Antes
if (user.role === 'admin' || user.role === 'owner') { /* ... */ }
// em outro arquivo, a mesma checagem:
if (user.role === 'admin' || user.role === 'owner') { /* ... */ }

// ✅ Depois
const podeEditar = (user) =>
  ['admin', 'owner'].includes(user.role);

if (podeEditar(user)) { /* ... */ }
```

## Slide 06 — Regra 05
Número: 05
Título: Refatore sem medo
Subtítulo: Sempre deixe melhor do que encontrou.

```js
// ❌ Antes
function calc(x, y) {
  if (x > 0 && y > 0) return x + y;
  else if (x < 0 && y < 0) return Math.abs(x) + Math.abs(y);
  return 0;
}

// ✅ Depois
function somaAbsolutos(a, b) {
  const mesmoSinal = Math.sign(a) === Math.sign(b);
  return mesmoSinal ? Math.abs(a) + Math.abs(b) : 0;
}
```

## Slide 07 — CTA final
Logo (SVG, 72px)
Headline: **Curtiu o post? _Siga para ver mais._**
Pílula do handle: @pedroduarte.dev (cyan)
Eyebrow: TODA SEMANA SOBRE
Topic pills: News · Concepts · Code · Architecture · AI · Career · Tools · DevOps
