# Legenda LinkedIn — SOLID sem complicar

SOLID é um daqueles tópicos que parece complicado no começo. Mas a ideia central é mais simples do que muita gente vende: escrever código que aguenta mudança sem virar um caos.

São 5 princípios de design de software que atacam dores reais do dia a dia:

Single Responsibility. Uma classe, uma razão pra mudar. Quando o Relatorio gera dados, formata PDF e manda email, qualquer ajuste em um desses três quebra coisa que não devia ter conexão. Separar resolve.

Open/Closed. Aberto pra extensão, fechado pra modificação. Em vez de editar uma função gigante toda vez que aparece um novo tipo de desconto, você cria estratégias. O código que já funciona não precisa ser tocado.

Liskov Substitution. Uma classe filha precisa substituir a classe pai sem quebrar comportamento. O exemplo clássico: Pinguim herdando de Pato com método voar(). O erro tá no modelo, não no pinguim.

Interface Segregation. Não força uma classe a implementar métodos que não usa. Interfaces pequenas e específicas valem mais que uma interface inchada que serve pra todo mundo e não serve bem pra ninguém.

Dependency Inversion. Depende de abstrações, não de implementações concretas. Quando seu código depende de uma interface Database em vez de MySQLDatabase direto, trocar pra PostgreSQL ou MongoDB vira detalhe.

SOLID não é sobre deixar o código bonito. É sobre reduzir dor quando o sistema muda. Você não precisa aplicar perfeito em tudo. Mas entender esses princípios muda a forma como você enxerga código.

Qual desses 5 você sente que quebra com mais frequência no dia a dia? Curioso pra ouvir.

#softwareengineering #cleancode #solid #softwarearchitecture
