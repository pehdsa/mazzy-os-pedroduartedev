Banco de dados continua sendo uma das decisões mais subestimadas em arquitetura.

A escolha não é entre SQL e NoSQL. É entre o que sustenta o problema e o que apenas parece moderno.

Três perguntas que importam mais que qualquer benchmark:

1. Qual o formato natural dos dados?

Altamente relacional pede integridade, transações e relatórios consistentes. PostgreSQL, MySQL e SQL Server costumam ser um default sólido pra esse cenário. Documento, key-value e grafo entram quando a estrutura do dado pede outra coisa.

2. Como a aplicação vai ler e escrever?

A pergunta que define o banco não é "qual é o melhor". É "como acessamos esse dado no dia a dia". Relacionamentos estruturados com joins pedem SQL. Travessias profundas pedem grafo. Acesso simples por chave e baixa latência pede key-value. Agregados flexíveis pedem banco de documento.

3. Quais garantias a arquitetura precisa?

Transação forte pede relacional. Schema flexível pede documento. Escala horizontal massiva pede bancos distribuídos. Cada propriedade tem seu preço.

E aí vem o erro mais comum: escolher banco por hype.

"Vamos usar Mongo porque é moderno."
"Microserviços com um banco compartilhado."
"Elasticsearch como fonte da verdade."
"Redis pra dado que não pode perder."

Hype não é decisão arquitetural. É falta de uma.

Banco bom é o que garante o que importa pro seu sistema. O resto é vocabulário de buzzword.

Esse é o primeiro de uma série sobre banco de dados na arquitetura. Próximos: ACID e BASE, CAP e PACELC, replication e sharding.

#SoftwareArchitecture #Database #BackendEngineering #SystemDesign #DataEngineering
