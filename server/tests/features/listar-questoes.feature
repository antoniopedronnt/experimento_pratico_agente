# language: pt
Funcionalidade: Listar Questões
  Como um professor
  Eu quero listar todas as questões cadastradas
  Para visualizar o banco de questões disponível

  Cenário: Listar questões quando não há questões cadastradas
    Dado que não existem questões cadastradas
    Quando eu listar todas as questões
    Então a resposta deve ter status 200
    E deve retornar uma lista vazia

  Cenário: Listar questões existentes
    Dado que existem 3 questões cadastradas
    Quando eu listar todas as questões
    Então a resposta deve ter status 200
    E deve retornar uma lista com 3 questões
    E cada questão deve ter ID, enunciado e alternativas
