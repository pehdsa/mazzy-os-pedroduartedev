ACID continua sendo a base de toda discussão séria sobre banco de dados, mesmo em arquiteturas modernas que falam de eventual consistency.

Toda transação confiável em um banco transacional cumpre quatro garantias:

1. Atomicidade

A transação acontece por completo ou não acontece. Se o sistema debita R$ 100 da conta A e falha antes de creditar na conta B, o ROLLBACK desfaz tudo. Sem isso, o banco fica em estado inconsistente.

2. Consistência

A transação respeita as regras do schema: constraints, chaves estrangeiras, tipos, unicidade, integridade referencial. Sai de um estado válido e vai para outro estado válido. Se quebra regra, falha.

3. Isolamento

Várias transações acontecem ao mesmo tempo sem se atrapalhar. Sem isolamento adequado, aparecem dirty reads, lost updates e non-repeatable reads. Por isso existem níveis: READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Cada um equilibra segurança e desempenho.

4. Durabilidade

Depois do COMMIT, o dado precisa sobreviver a queda de servidor. Bancos usam WAL, logs de transação, fsync e mecanismos de recovery pra garantir isso.

Por que isso ainda importa hoje?

Em sistemas críticos, uma compra simples num e-commerce envolve criar pedido, reservar estoque, registrar pagamento, gerar nota fiscal e atualizar status da entrega. Se uma etapa falha, talvez nenhuma deva valer. Sem ACID, você fica refém de inconsistências silenciosas em produção.

Esse é o segundo da série sobre banco de dados na arquitetura. O primeiro foi sobre como escolher um banco. Próximos: CAP e PACELC, replication e sharding.

#SoftwareArchitecture #Database #BackendEngineering #SystemDesign #DataEngineering
