# language: pt
Funcionalidade: Atualizar Questão
  Como um professor
  Eu quero atualizar questões existentes
  Para corrigir erros ou melhorar o conteúdo

  Cenário: Atualizar enunciado de uma questão
    Dado que existe uma questão cadastrada com enunciado "Enunciado antigo"
    Quando eu atualizar o enunciado para "Enunciado novo"
    Então a resposta deve ter status 200
    E a questão deve ter o novo enunciado "Enunciado novo"

  Cenário: Atualizar alternativas de uma questão
    Dado que existe uma questão cadastrada
    Quando eu atualizar as alternativas da questão
    Então a resposta deve ter status 200
    E a questão deve ter as novas alternativas

  Cenário: Tentar atualizar questão inexistente
    Quando eu tentar atualizar uma questão com ID inexistente
    Então a resposta deve ter status 404
    E a mensagem deve indicar que a questão não foi encontrada
