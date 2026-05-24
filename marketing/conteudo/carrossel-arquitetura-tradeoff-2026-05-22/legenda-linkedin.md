# Legenda LinkedIn — Arquitetura é trade-off

Toda decisão arquitetural é um trade-off.

Uma das armadilhas mais comuns em tech é buscar "a melhor arquitetura", "o melhor banco", "o melhor framework". Na prática, quase nunca existe uma melhor escolha universal. Existe a melhor pro contexto.

Qual o melhor banco? Depende.

PostgreSQL costuma ser ótima escolha quando você precisa de consistência, transações, relacionamentos bem definidos e queries complexas.

MongoDB pode fazer sentido quando o modelo de dados é flexível, muda com frequência e documentos representam bem o domínio.

Redis brilha em cache, filas simples, sessões e cenários onde baixa latência importa mais que persistência relacional.

Cassandra é o caminho quando você precisa de escrita em larga escala, distribuição global e alta disponibilidade.

Nenhum deles é "melhor" em absoluto. Cada escolha entrega algo e cobra algo em troca.

Quando você escolhe microsserviços, ganha autonomia entre times, deploys independentes, escala isolada. Mas assume custo operacional, observabilidade complexa, consistência distribuída, mais pontos de falha.

Quando você escolhe monolito, ganha simplicidade, dev mais rápido, debug fácil, menos infra. Pode perder autonomia em escala e isolamento entre módulos.

A mesma lógica vale pra filas, cache, hexagonal, Clean Architecture, serverless, event-driven, CQRS, GraphQL, REST. Praticamente qualquer decisão técnica.

Arquitetura de software não é sobre escolher a tech mais popular. É sobre entender quais problemas você tem, quais problemas você aceita criar, e quais custos fazem sentido pro momento do produto, do time e do negócio.

Uma boa decisão arquitetural não é a que parece sofisticada no diagrama. É a que torna o sistema mais adequado pra evoluir dentro da realidade em que existe.

No fim, arquitetura é menos sobre respostas prontas e mais sobre fazer as perguntas certas:

O que precisamos otimizar agora? Velocidade? Simplicidade? Escala? Custo? Autonomia? Consistência? Manutenção?

Toda escolha tem um preço. A maturidade técnica está em saber qual preço vale a pena pagar.

Você já fez uma escolha arquitetural achando que era "a melhor" e descobriu depois que era trade-off? Curioso pra ouvir os casos.

#softwarearchitecture #softwareengineering #systemdesign #tradeoffs
