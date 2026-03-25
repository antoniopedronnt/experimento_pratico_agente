# language: pt
Funcionalidade: Gerenciamento de Questões
  Como um professor
  Eu quero gerenciar questões de provas
  Para criar avaliações para meus alunos

  Cenário: Criar uma nova questão válida
    Dado que não existem questões cadastradas
    Quando eu criar uma questão com enunciado "Qual é a capital do Brasil?"
    E adicionar alternativa "São Paulo" marcada como incorreta
    E adicionar alternativa "Rio de Janeiro" marcada como incorreta
    E adicionar alternativa "Brasília" marcada como correta
    E adicionar alternativa "Salvador" marcada como incorreta
    Então a questão deve ser criada com sucesso
    E a resposta deve ter status 201
    E a questão deve ter um ID único
    E a questão deve ter 4 alternativas

  Cenário: Tentar criar questão sem enunciado
    Quando eu tentar criar uma questão sem enunciado
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "enunciado"

  Cenário: Tentar criar questão com menos de 2 alternativas
    Quando eu criar uma questão com enunciado "Teste"
    E adicionar apenas 1 alternativa "Opção única" marcada como correta
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "pelo menos 2 alternativas"

  Cenário: Tentar criar questão sem alternativa correta
    Quando eu criar uma questão com enunciado "Teste"
    E adicionar alternativa "Opção 1" marcada como incorreta
    E adicionar alternativa "Opção 2" marcada como incorreta
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "pelo menos uma alternativa marcada como correta"
