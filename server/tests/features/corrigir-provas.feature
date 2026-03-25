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
