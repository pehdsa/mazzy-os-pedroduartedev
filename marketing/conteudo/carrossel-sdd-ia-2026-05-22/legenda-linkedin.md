# Legenda LinkedIn — SDD com IA

Tem uma diferença gritante entre "pedir um login pra IA" e "especificar um login". Essa diferença muda completamente o que sai do outro lado.

Spec-Driven Development (SDD) é o nome dessa prática. Você descreve comportamento, regras, restrições e casos de borda em um documento estruturado. A IA usa isso pra gerar código, testes e documentação. A spec vira fonte da verdade.

Por que isso importa agora?

1. IA precisa de contexto. Spec é contexto estruturado, não vibes.
2. A mesma spec pode gerar implementações em diferentes stacks. Trocou de framework? Roda de novo.
3. Mudou a regra de negócio? Edita a spec primeiro. Depois regenera ou ajusta o código.

O fluxo na prática:

1. Escreve a spec em markdown (requisitos, constraints, edge cases).
2. A IA gera o código e os testes.
3. Você revisa. Se o comportamento está errado, corrige primeiro a spec.
4. Regenera ou ajusta.

E aí vem a pergunta que sempre aparece nos comentários: "se a IA escreve o código, o que sobra pro dev?"

Sobra o que sempre foi a parte difícil. Definir as regras, validar a arquitetura, revisar trade-offs, garantir qualidade. A IA executa. Você dirige.

Algumas ferramentas maduras: GitHub Spec Kit (toolkit do GitHub), Claude Code (specs em markdown como contexto), Cursor (`.cursorrules` como spec de projeto), Aider (terminal-first), ou plain markdown com qualquer LLM.

O dev que sobe de nível não é o que digita mais rápido. É o que pensa melhor antes de escrever a primeira linha.

Você já usa spec-driven no teu fluxo, ou ainda parte direto pro prompt? Curioso pra ouvir.

#softwareengineering #ai #devops #specdrivendevelopment
