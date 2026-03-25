# language: pt
Funcionalidade: Geração de Respostas Simuladas
  Como um professor
  Eu quero gerar respostas simuladas de alunos
  Para testar o sistema de correção

  Contexto:
    Dado que existe uma prova cadastrada com 5 questões

  Cenário: Gerar respostas simuladas com letras
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 10 alunos e 5 versões de prova
    Então a resposta deve ter status 200
    E deve ser gerado um arquivo CSV
    E o CSV deve ter cabeçalho "Prova,Questao_1,Questao_2,Questao_3,Questao_4,Questao_5"
    E o CSV deve conter 10 linhas de respostas

  Cenário: Gerar respostas simuladas com potências
    Dado que a prova usa identificação por "POTENCIAS"
    Quando eu solicitar a geração de respostas para 15 alunos e 3 versões de prova
    Então a resposta deve ter status 200
    E deve ser gerado um arquivo CSV
    E o CSV deve conter 15 linhas de respostas

  Cenário: Validar formato das respostas com letras
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 5 alunos e 2 versões de prova
    Então cada linha deve ter número de prova válido (1 ou 2)
    E as respostas devem conter apenas letras válidas (A-F)
    E letras múltiplas devem estar separadas por vírgula e espaço
    E valores com vírgulas devem estar entre aspas duplas

  Cenário: Validar formato das respostas com potências
    Dado que a prova usa identificação por "POTENCIAS"
    Quando eu solicitar a geração de respostas para 5 alunos e 2 versões de prova
    Então cada linha deve ter número de prova válido (1 ou 2)
    E as respostas devem ser números inteiros positivos

  Cenário: Validar distribuição de desempenho
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 100 alunos e 5 versões de prova
    Então aproximadamente 20% dos alunos devem ter desempenho excelente (90-100%)
    E aproximadamente 30% dos alunos devem ter desempenho bom (70-89%)
    E aproximadamente 30% dos alunos devem ter desempenho médio (50-69%)
    E aproximadamente 20% dos alunos devem ter desempenho baixo (0-49%)

  Cenário: Validar variação nas respostas
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 10 alunos e 3 versões de prova
    Então nem todas as respostas devem ser idênticas
    E deve haver respostas corretas e incorretas

  Cenário: Validar distribuição de versões de prova
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 20 alunos e 5 versões de prova
    Então os alunos devem estar distribuídos entre as diferentes versões
    E cada versão deve ter pelo menos 1 aluno

  Cenário: Validar nome do arquivo gerado
    Dado que a prova tem título "Prova de Matemática Básica"
    E a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 10 alunos e 5 versões de prova
    Então o arquivo deve ter nome "respostas_Prova_de_Matematica_Basica.csv"
    E o nome não deve conter caracteres especiais inválidos

  Cenário: Tentar gerar com número de alunos inválido (menor que 1)
    Quando eu tentar gerar respostas para 0 alunos e 5 versões de prova
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "número de alunos"

  Cenário: Tentar gerar com número de alunos inválido (maior que 100)
    Quando eu tentar gerar respostas para 150 alunos e 5 versões de prova
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "número de alunos"

  Cenário: Tentar gerar com número de provas inválido (menor que 1)
    Quando eu tentar gerar respostas para 10 alunos e 0 versões de prova
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "número de provas"

  Cenário: Tentar gerar com número de provas inválido (maior que 50)
    Quando eu tentar gerar respostas para 10 alunos e 60 versões de prova
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "número de provas"

  Cenário: Tentar gerar respostas de prova inexistente
    Quando eu tentar gerar respostas de uma prova que não existe
    Então deve retornar erro
    E a resposta deve ter status 404
    E a mensagem de erro deve mencionar "prova não encontrada"

  Cenário: Tentar gerar respostas de prova sem questões
    Dado que existe uma prova sem questões cadastradas
    Quando eu tentar gerar respostas para 10 alunos e 5 versões de prova
    Então deve retornar erro de validação
    E a resposta deve ter status 400
    E a mensagem de erro deve mencionar "não possui questões"

  Cenário: Validar compatibilidade com formato de correção
    Dado que a prova usa identificação por "LETRAS"
    Quando eu solicitar a geração de respostas para 10 alunos e 5 versões de prova
    Então o CSV gerado deve ser compatível com o parser de respostas
    E deve ser possível fazer upload para correção sem erros
