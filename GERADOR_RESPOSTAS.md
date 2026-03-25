# 📝 Gerador de Respostas Simuladas

## Nova Funcionalidade Implementada

Agora o sistema permite **gerar automaticamente** um CSV com respostas simuladas de alunos para facilitar os testes do sistema de correção!

## 🎯 Como Usar

### 1. **Na Interface Web**

1. Acesse a lista de provas
2. Clique no botão **"📝 Gerar Respostas"** da prova desejada
3. Informe:
   - **Quantidade de alunos** a simular (1-100)
   - **Quantidade de versões de prova** (1-50)
4. O sistema baixará automaticamente o arquivo `respostas_[nome_da_prova].csv`

### 2. **Formato do CSV Gerado**

O CSV de respostas tem o **mesmo formato do gabarito**:

```csv
Prova,Questao_1,Questao_2,Questao_3,Questao_4,Questao_5
1,"A, C",B,"A, B, D",C,"A, C, D"
1,"A, C",B,"A, B",C,"A, C"
2,"A, C",B,"A, D",C,"B, D"
```

- **Sem colunas de Nome e CPF** (são gerados automaticamente como "Aluno 1", "Aluno 2", etc.)
- **Compatível com o parser** que espera `Prova,Questao_1,Questao_2,...`
- **Fácil de editar** no Excel/LibreOffice para testar cenários específicos

## 🧠 Algoritmo de Simulação

O gerador cria respostas **variadas e realistas**:

### **Distribuição de Desempenho**

- **20% dos alunos**: Excelente (90-100% de acerto)
- **30% dos alunos**: Bom (70-89% de acerto)
- **30% dos alunos**: Médio (50-69% de acerto)
- **20% dos alunos**: Baixo (0-49% de acerto)

### **Questões Erradas**

Quando um aluno erra uma questão, o sistema:

#### Para LETRAS:
- Mantém algumas letras corretas (baseado no percentual de acerto parcial)
- Adiciona letras incorretas aleatórias
- Exemplo: Gabarito "A, C" pode virar "A, B" ou "C, D"

#### Para POTÊNCIAS:
- Mantém algumas potências corretas
- Adiciona potências incorretas
- Recalcula a soma
- Exemplo: Gabarito "13" (1+4+8) pode virar "7" (1+2+4) ou "15" (1+2+4+8)

## 📊 Exemplo de Uso Completo

### Passo a Passo:

1. **Gere o gabarito e PDFs:**
   - Acesse "👁️ Visualizar" da prova
   - Clique em "📄 Gerar PDF"
   - Defina quantidade de provas (ex: 5)
   - Baixe o gabarito (`gabarito_[prova].csv`)

2. **Gere as respostas simuladas:**
   - Volte para a lista de provas
   - Clique em "📝 Gerar Respostas"
   - Defina: 10 alunos, 5 versões de prova
   - Baixe o arquivo `respostas_[prova].csv`

3. **Corrija as provas:**
   - Clique em "✅ Corrigir"
   - Faça upload do gabarito
   - Faça upload das respostas
   - Escolha modo de correção (Rigoroso ou Proporcional)
   - Veja o relatório com notas e estatísticas!

## 🔧 Arquivos Modificados

### Backend:
- `server/src/services/respostaGeneratorService.ts` ✨ **NOVO**
- `server/src/controllers/ExamController.ts` - Novo método `generateResponses()`
- `server/src/routes/exams.ts` - Nova rota

### Frontend:
- `client/src/services/examService.ts` - Novo método `generateResponses()`
- `client/src/pages/ExamList.tsx` - Novo botão "📝 Gerar Respostas"
- `client/src/pages/ExamList.css` - Estilo do novo botão

## 🚀 Para Reiniciar o Sistema

Execute: `start_all.bat`

## 💡 Dicas

- **Teste diferentes cenários**: Edite o CSV gerado para criar casos específicos
- **Varie a quantidade**: Teste com poucos alunos (debugging) e muitos alunos (performance)
- **Compare modos de correção**: Veja a diferença entre Rigoroso e Proporcional
- **CSV aberto?** Feche o Excel antes de gerar novamente
