## BUG-01: Nome do autores 

- **Passos para reproduzir:** 
1. Faça o Login correto no sistema.
2. Vá na parte de busca. 
3. Digite o nome do autor em minusculas.
- **Resultado esperado:** 
    O sistema achar o nome do autor, mesmo sendo digitado com letras minusculas
- **Resultado obtido:** O sistema não acha o autor
- **Severidade:** baixa / média / alta (justifique)
    Acredito que seja média, pois não apresenta nada crítico, mas se o usuário digitar o autor por um nome minisculo e não pesquisar o titulo do livro, ele poderá ficar frustrado pela falta de resultados.
- **Teste que reproduz:** nome do arquivo e do `it`
    Em toda atividade, não fiz nenhum que testasse exatamente isso, porém adicionei um em /acervo.cy.js, com o `it` intitulado "busca por autor em minusculas".