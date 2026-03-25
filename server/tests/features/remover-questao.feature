# language: pt
Funcionalidade: Remover Questão
  Como um professor
  Eu quero remover questões
  Para manter apenas questões relevantes no sistema

  Cenário: Remover uma questão existente
    Dado que existe uma questão cadastrada
    Quando eu remover a questão
    Então a resposta deve ter status 204
    E a questão não deve mais existir no sistema

  Cenário: Tentar remover questão inexistente
    Quando eu tentar remover uma questão com ID inexistente
    Então a resposta deve ter status 404
    E a mensagem deve indicar que a questão não foi encontrada
