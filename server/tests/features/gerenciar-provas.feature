# language: pt
Funcionalidade: Gerenciamento de Provas
  Como um professor
  Eu quero gerenciar provas
  Para aplicar avaliações aos alunos

  Contexto:
    Dado que existem questões cadastradas no sistema

  Cenário: Criar prova com identificação por letras
    Quando eu criar uma prova com título "Prova de Matemática"
    E selecionar 3 questões
    E escolher identificação por "LETRAS"
    Então a prova deve ser criada com sucesso
    E a resposta deve ter status 201
    E a prova deve ter tipo de identificação "LETRAS"
    E a prova deve ter 3 questões

  Cenário: Criar prova com identificação por potências
    Quando eu criar uma prova com título "Prova de História"
    E selecionar 2 questões
    E escolher identificação por "POTENCIAS"
    Então a prova deve ser criada com sucesso
    E a resposta deve ter status 201
    E a prova deve ter tipo de identificação "POTENCIAS"

  Cenário: Visualizar preview da prova com letras
    Dado que existe uma prova com identificação por "LETRAS"
    Quando eu visualizar o preview da prova
    Então a resposta deve ter status 200
    E as alternativas devem estar identificadas como "A", "B", "C", "D"
    E deve conter espaço para resposta com texto "indique as letras"

  Cenário: Visualizar preview da prova com potências
    Dado que existe uma prova com identificação por "POTENCIAS"
    Quando eu visualizar o preview da prova
    Então a resposta deve ter status 200
    E as alternativas devem estar identificadas como "1", "2", "4", "8"
    E deve conter espaço para resposta com texto "indique a soma"

  Cenário: Tentar criar prova sem título
    Quando eu tentar criar uma prova sem título
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "título"

  Cenário: Tentar criar prova sem questões
    Quando eu criar uma prova com título "Prova Teste"
    E não selecionar nenhuma questão
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "pelo menos uma questão"

  Cenário: Tentar criar prova com questão inexistente
    Quando eu criar uma prova com título "Prova Teste"
    E selecionar uma questão que não existe
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "não encontrada"

  Cenário: Listar todas as provas
    Dado que existem 2 provas cadastradas
    Quando eu listar todas as provas
    Então a resposta deve ter status 200
    E deve retornar uma lista com 2 provas

  Cenário: Atualizar título de uma prova
    Dado que existe uma prova cadastrada
    Quando eu atualizar o título para "Prova Revisada"
    Então a resposta deve ter status 200
    E a prova deve ter o novo título "Prova Revisada"

  Cenário: Remover uma prova
    Dado que existe uma prova cadastrada
    Quando eu remover a prova
    Então a resposta deve ter status 204
    E a prova não deve mais existir no sistema
