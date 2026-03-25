# language: pt
Funcionalidade: Correção de Provas
  Como professor
  Quero corrigir provas automaticamente
  Para gerar relatório de notas da turma

  Contexto:
    Dado que existe uma questão cadastrada com 4 alternativas
    E a questão tem alternativas "A" e "C" marcadas como corretas
    E existe uma prova com tipo de identificação "LETRAS"
    E a prova contém a questão cadastrada

  Cenário: Correção rigorosa com resposta totalmente correta
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "João Silva" com CPF "12345678900" respondeu "A, C" na prova 1
    Quando corrijo as provas no modo "RIGOROSO"
    Então o aluno "João Silva" deve ter nota final 100

  Cenário: Correção rigorosa com resposta parcialmente correta
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Maria Santos" com CPF "98765432100" respondeu "A" na prova 1
    Quando corrijo as provas no modo "RIGOROSO"
    Então o aluno "Maria Santos" deve ter nota final 0

  Cenário: Correção rigorosa com resposta incorreta
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Pedro Oliveira" com CPF "11122233344" respondeu "B, D" na prova 1
    Quando corrigo as provas no modo "RIGOROSO"
    Então o aluno "Pedro Oliveira" deve ter nota final 0

  Cenário: Correção proporcional com resposta parcialmente correta
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Ana Costa" com CPF "55566677788" respondeu "A" na prova 1
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno "Ana Costa" deve ter nota final 75

  Cenário: Correção proporcional com metade certa
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Carlos Lima" com CPF "99988877766" respondeu "A, B" na prova 1
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno "Carlos Lima" deve ter nota final 50

  Cenário: Correção proporcional com resposta totalmente correta
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Lucia Rocha" com CPF "12312312312" respondeu "A, C" na prova 1
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno "Lucia Rocha" deve ter nota final 100

  Cenário: Correção de múltiplos alunos
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Aluno 1" com CPF "11111111111" respondeu "A, C" na prova 1
    E o aluno "Aluno 2" com CPF "22222222222" respondeu "A" na prova 1
    E o aluno "Aluno 3" com CPF "33333333333" respondeu "B, D" na prova 1
    Quando corrigo as provas no modo "RIGOROSO"
    Então o relatório deve conter 3 alunos
    E a média da turma deve ser aproximadamente 33.33

  Cenário: Correção com tipo POTENCIAS rigoroso
    Dado que existe uma prova com tipo de identificação "POTENCIAS"
    E o gabarito da prova 2 é "5"
    E o aluno "Roberto Silva" com CPF "44455566677" respondeu "5" na prova 2
    Quando corrigo as provas no modo "RIGOROSO"
    Então o aluno "Roberto Silva" deve ter nota final 100

  Cenário: Correção com tipo POTENCIAS proporcional
    Dado que existe uma prova com tipo de identificação "POTENCIAS"
    E o gabarito da prova 2 é "5"
    E o aluno "Sandra Dias" com CPF "88899900011" respondeu "4" na prova 2
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno "Sandra Dias" deve ter nota final 75

  Cenário: Validar cálculo de estatísticas
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno "Aluno 1" respondeu "A, C" e deve tirar 100
    E o aluno "Aluno 2" respondeu "A, C" e deve tirar 100
    E o aluno "Aluno 3" respondeu "A" e deve tirar 0
    E o aluno "Aluno 4" respondeu "B" e deve tirar 0
    Quando corrijo as provas no modo "RIGOROSO"
    Então a média da turma deve ser 50
    E a mediana deve ser 50
    E a nota máxima deve ser 100
    E a nota mínima deve ser 0

  Cenário: Validar relatório com prova de múltiplas questões
    Dado que existe uma prova com 3 questões
    E o gabarito da prova 1 questão 1 é "A, C"
    E o gabarito da prova 1 questão 2 é "B"
    E o gabarito da prova 1 questão 3 é "A, B, D"
    E o aluno "João" respondeu corretamente as 3 questões
    Quando corrigo as provas no modo "RIGOROSO"
    Então o aluno "João" deve ter nota final 100

  Cenário: Validar detalhamento por questão no modo rigoroso
    Dado que existe uma prova com 3 questões
    E o aluno respondeu questão 1 correta, questão 2 errada, questão 3 correta
    Quando corrijo as provas no modo "RIGOROSO"
    Então o detalhamento deve mostrar questão 1 com 100 pontos
    E o detalhamento deve mostrar questão 2 com 0 pontos
    E o detalhamento deve mostrar questão 3 com 100 pontos
    E a nota final deve ser 66.67

  Cenário: Validar detalhamento por questão no modo proporcional
    Dado que existe uma prova com 2 questões de 4 alternativas
    E o aluno acertou 3 de 4 alternativas na questão 1
    E o aluno acertou 2 de 4 alternativas na questão 2
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o detalhamento deve mostrar questão 1 com 75 pontos
    E o detalhamento deve mostrar questão 2 com 50 pontos
    E a nota final deve ser 62.5

  Cenário: Tentar corrigir sem arquivo de gabarito
    Quando eu tentar corrigir provas sem enviar arquivo de gabarito
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "gabarito"

  Cenário: Tentar corrigir sem arquivo de respostas
    Quando eu tentar corrigir provas sem enviar arquivo de respostas
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "respostas"

  Cenário: Tentar corrigir com modo inválido
    Quando eu tentar corrigir provas com modo "INVALIDO"
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "modo de correção"

  Cenário: Tentar corrigir com CSV de gabarito vazio
    Quando eu tentar corrigir com arquivo de gabarito vazio
    Então deve retornar erro de validação
    E a mensagem de erro deve mencionar "CSV vazio"

  Cenário: Tentar corrigir com CSV de respostas vazio
    Quando eu tentar corrigir com arquivo de respostas vazio
    Então deve retornar erro de validação
    E a mensagem de erro deve mencionar "CSV vazio"

  Cenário: Tentar corrigir com formato CSV inválido
    Quando eu tentar corrigir com CSV de formato incorreto
    Então deve retornar erro de parsing
    E a mensagem deve explicar o formato esperado

  Cenário: Correção com aluno que respondeu prova inexistente no gabarito
    Dado que o gabarito contém apenas prova 1
    E o aluno respondeu prova 2
    Quando corrigo as provas no modo "RIGOROSO"
    Então deve retornar erro
    E a mensagem deve mencionar "gabarito não encontrado para prova 2"

  Cenário: Validar ordenação alfabética no relatório
    Dado que existem respostas de 3 alunos
    E os nomes são "Zélia", "Ana", "Maria"
    Quando corrijo as provas no modo "RIGOROSO"
    Então o relatório deve listar os alunos em ordem alfabética
    E o primeiro deve ser "Ana"
    E o último deve ser "Zélia"

  Cenário: Validar resposta com espaços extras
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno respondeu " A , C " (com espaços extras)
    Quando corrigo as provas no modo "RIGOROSO"
    Então o aluno deve ter nota final 100
    E os espaços extras devem ser ignorados

  Cenário: Validar case insensitive para letras
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno respondeu "a, c" (minúsculas)
    Quando corrigo as provas no modo "RIGOROSO"
    Então o aluno deve ter nota final 100

  Cenário: Correção proporcional com todas alternativas erradas
    Dado que o gabarito da prova 1 é "A, C"
    E o aluno respondeu "B, D" (todas erradas)
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno deve ter nota final 0

  Cenário: Correção proporcional com alternativa marcada indevidamente
    Dado que o gabarito da prova 1 é "A" (só A correta)
    E o aluno respondeu "A, B, C" (marcou outras)
    Quando corrigo as provas no modo "PROPORCIONAL"
    Então o aluno deve ter nota proporcional ao erro
    E a nota deve considerar as alternativas marcadas indevidamente

  Cenário: Validar relatório CSV exportado
    Dado que existe correção processada de 5 alunos
    Quando eu exportar o relatório em CSV
    Então o CSV deve conter cabeçalho com Nome, CPF, Prova, Nota
    E deve conter 5 linhas de dados
    E todas as notas devem estar formatadas com 2 casas decimais

