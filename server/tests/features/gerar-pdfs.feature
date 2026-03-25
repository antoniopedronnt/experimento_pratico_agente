# language: pt
Funcionalidade: Geração de PDFs e CSV
  Como um professor
  Eu quero gerar PDFs das provas e CSV dos gabaritos
  Para distribuir provas individualizadas aos alunos

  Contexto:
    Dado que existe uma prova cadastrada com 5 questões
    E a prova tem cabeçalho configurado com disciplina "Matemática", professor "João Silva" e data "25/03/2026"

  Cenário: Gerar PDFs de múltiplas provas com letras
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 3 provas individuais
    Então a resposta deve ter status 200
    E deve ser gerado um arquivo ZIP
    E o ZIP deve conter 3 arquivos PDF
    E o ZIP deve conter 1 arquivo CSV de gabarito
    E cada PDF deve ter número de prova diferente no rodapé

  Cenário: Gerar PDFs de múltiplas provas com potências
    Dado que a prova usa identificação por "POTENCIAS"
    Quando eu solicitar a geração de 5 provas individuais
    Então a resposta deve ter status 200
    E deve ser gerado um arquivo ZIP
    E o ZIP deve conter 5 arquivos PDF
    E o ZIP deve conter 1 arquivo CSV de gabarito

  Cenário: Validar embaralhamento das questões
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 3 provas individuais
    Então cada prova deve ter as questões em ordem diferente
    E cada prova deve manter o mesmo conjunto de questões

  Cenário: Validar embaralhamento das alternativas
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 2 provas individuais
    Então as alternativas de cada questão devem estar embaralhadas
    E os gabaritos devem refletir a nova ordem das alternativas

  Cenário: Validar formato do CSV de gabarito com letras
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 2 provas individuais
    Então o CSV de gabarito deve ter cabeçalho "Prova,Questao_1,Questao_2,Questao_3,Questao_4,Questao_5"
    E cada linha deve conter o número da prova seguido das letras corretas
    E letras múltiplas devem estar separadas por vírgula e espaço
    E valores com vírgulas devem estar entre aspas duplas

  Cenário: Validar formato do CSV de gabarito com potências
    Dado que a prova usa identificação por "POTENCIAS"
    Quando eu solicitar a geração de 2 provas individuais
    Então o CSV de gabarito deve ter cabeçalho "Prova,Questao_1,Questao_2,Questao_3,Questao_4,Questao_5"
    E cada linha deve conter o número da prova seguido da soma das potências corretas
    E as somas devem ser números inteiros

  Cenário: Validar conteúdo do PDF
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 1 prova individual
    Então o PDF deve conter o cabeçalho com disciplina "Matemática"
    E o PDF deve conter o professor "João Silva"
    E o PDF deve conter a data "25/03/2026"
    E cada página deve ter rodapé com número da prova
    E a última página deve ter espaço para nome e CPF do aluno

  Cenário: Gerar provas com espaço para resposta de letras
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 1 prova individual
    Então o PDF deve conter espaço para o aluno indicar as letras marcadas
    E deve haver instrução sobre como responder

  Cenário: Gerar provas com espaço para soma de potências
    Dado que a prova usa identificação por "POTENCIAS"
    Quando eu solicitar a geração de 1 prova individual
    Então o PDF deve conter espaço para o aluno indicar a soma das alternativas
    E deve haver instrução sobre potências de 2

  Cenário: Tentar gerar sem especificar quantidade
    Quando eu tentar gerar provas sem informar a quantidade
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "quantidade"

  Cenário: Tentar gerar quantidade inválida
    Quando eu tentar gerar 0 provas
    Então deve retornar erro de validação
    E a resposta deve ter status 400

  Cenário: Tentar gerar PDFs de prova sem cabeçalho
    Dado que a prova não tem cabeçalho configurado
    Quando eu solicitar a geração de 1 prova individual
    Então deve retornar erro de validação
    E a mensagem de erro deve mencionar "cabeçalho"

  Cenário: Validar unicidade dos números de prova
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de 10 provas individuais
    Então todos os números de prova devem ser únicos
    E os números devem estar entre 1 e 10
