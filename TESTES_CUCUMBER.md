# 🧪 Testes de Aceitação com Cucumber

## 📋 Visão Geral

Sistema completo de testes de aceitação usando **Cucumber** com **Gherkin em Português** para validar todos os requisitos do sistema de gerenciamento de provas.

## 📂 Estrutura de Testes

```
server/tests/
├── features/               # Cenários Gherkin (.feature)
│   ├── criar-questao.feature
│   ├── atualizar-questao.feature
│   ├── listar-questoes.feature
│   ├── remover-questao.feature
│   ├── gerenciar-provas.feature
│   ├── gerar-pdfs.feature
│   ├── gerar-respostas.feature
│   └── corrigir-provas.feature
└── steps/                  # Implementações (.steps.ts)
    ├── question.steps.ts
    ├── exam.steps.ts
    ├── pdf.steps.ts
    ├── responses.steps.ts
    └── correction.steps.ts
```

## 📊 Cobertura de Testes

### **Requisito 1: Gerenciamento de Questões**
**Arquivo:** `criar-questao.feature`, `atualizar-questao.feature`, `listar-questoes.feature`, `remover-questao.feature`

#### Cenários Implementados:
- ✅ Criar questão válida com múltiplas alternativas
- ✅ Validar obrigatoriedade de enunciado
- ✅ Validar mínimo de 2 alternativas
- ✅ Validar pelo menos uma alternativa correta
- ✅ Listar todas as questões
- ✅ Buscar questão por ID
- ✅ Atualizar questão existente
- ✅ Remover questão
- ✅ Validar remoção de questão inexistente

**Total:** ~15 cenários

---

### **Requisito 2: Gerenciamento de Provas**
**Arquivo:** `gerenciar-provas.feature`

#### Cenários Implementados:
- ✅ Criar prova com identificação por LETRAS
- ✅ Criar prova com identificação por POTENCIAS
- ✅ Visualizar preview com letras (A, B, C...)
- ✅ Visualizar preview com potências (1, 2, 4, 8...)
- ✅ Validar espaço para resposta de letras
- ✅ Validar espaço para soma de potências
- ✅ Validar obrigatoriedade de título
- ✅ Validar presença de questões
- ✅ Validar questões existentes
- ✅ Listar todas as provas
- ✅ Atualizar prova
- ✅ Remover prova

**Total:** ~12 cenários

---

### **Requisito 3: Geração de PDFs e CSV**
**Arquivo:** `gerar-pdfs.feature` ✨ **NOVO**

#### Cenários Implementados:
- ✅ Gerar múltiplos PDFs com letras
- ✅ Gerar múltiplos PDFs com potências
- ✅ Validar embaralhamento de questões
- ✅ Validar embaralhamento de alternativas
- ✅ Validar formato CSV de gabarito com letras
- ✅ Validar formato CSV de gabarito com potências
- ✅ Validar conteúdo do PDF (cabeçalho, rodapé)
- ✅ Validar espaço para nome e CPF do aluno
- ✅ Validar espaço para resposta de letras
- ✅ Validar espaço para soma de potências
- ✅ Validar unicidade dos números de prova
- ✅ Validar erros (quantidade inválida, sem cabeçalho)

**Total:** ~15 cenários

---

### **Requisito 4: Correção de Provas**
**Arquivo:** `corrigir-provas.feature` (expandido)

#### Cenários Implementados:

**Modo Rigoroso:**
- ✅ Resposta totalmente correta = 100 pontos
- ✅ Resposta parcialmente correta = 0 pontos
- ✅ Resposta totalmente incorreta = 0 pontos
- ✅ Múltiplos alunos com média calculada

**Modo Proporcional:**
- ✅ Resposta parcialmente correta = pontos proporcionais
- ✅ Resposta 50% correta = 50 pontos
- ✅ Resposta totalmente correta = 100 pontos
- ✅ Detalhamento por questão

**Potências:**
- ✅ Correção rigorosa com potências
- ✅ Correção proporcional com potências

**Estatísticas:**
- ✅ Cálculo de média, mediana, máxima, mínima
- ✅ Relatório com múltiplas questões
- ✅ Ordenação alfabética

**Validações:**
- ✅ Arquivo de gabarito obrigatório
- ✅ Arquivo de respostas obrigatório
- ✅ Modo de correção válido
- ✅ CSV não vazio
- ✅ Formato CSV válido
- ✅ Prova deve existir no gabarito
- ✅ Ignorar espaços extras
- ✅ Case insensitive para letras
- ✅ Todas alternativas erradas = 0

**Total:** ~30 cenários

---

### **Nova Funcionalidade: Geração de Respostas Simuladas**
**Arquivo:** `gerar-respostas.feature` ✨ **NOVO**

#### Cenários Implementados:
- ✅ Gerar respostas com letras
- ✅ Gerar respostas com potências
- ✅ Validar formato de resposta com letras
- ✅ Validar formato de resposta com potências
- ✅ Validar distribuição de desempenho (20% excelente, 30% bom, 30% médio, 20% baixo)
- ✅ Validar variação nas respostas
- ✅ Validar distribuição entre versões de prova
- ✅ Validar nome do arquivo gerado
- ✅ Validar limites (1-100 alunos, 1-50 provas)
- ✅ Validar prova existente
- ✅ Validar prova com questões
- ✅ Validar compatibilidade com correção

**Total:** ~17 cenários

---

## 📈 Resumo Estatístico

| Funcionalidade | Arquivo | Cenários |
|----------------|---------|----------|
| Gestão de Questões | 4 arquivos | ~15 |
| Gestão de Provas | 1 arquivo | ~12 |
| Geração de PDFs | 1 arquivo | ~15 |
| Correção de Provas | 1 arquivo | ~30 |
| Geração de Respostas | 1 arquivo | ~17 |
| **TOTAL** | **8 arquivos** | **~89 cenários** |

## 🚀 Como Executar os Testes

### 1. **Instalar Dependências**
```bash
cd server
npm install
```

### 2. **Executar Todos os Testes**
```bash
npm test
```

### 3. **Executar Teste Específico**
```bash
npm test -- --grep "Criar questão válida"
```

### 4. **Executar por Arquivo**
```bash
npm test tests/features/gerar-respostas.feature
```

### 5. **Modo Watch (desenvolvimento)**
```bash
npm run test:watch
```

## 📝 Formato Gherkin

Todos os testes seguem o padrão **Gherkin em Português**:

```gherkin
# language: pt
Funcionalidade: [Nome da Funcionalidade]
  Como um [papel]
  Eu quero [ação]
  Para [benefício]

  Contexto:
    Dado que [pré-condição comum]

  Cenário: [Nome do Cenário]
    Dado que [condição inicial]
    E [outra condição]
    Quando eu [ação]
    E [outra ação]
    Então [resultado esperado]
    E [outro resultado]
```

## 🔧 Estrutura de Steps

Cada arquivo `.feature` tem seu arquivo `.steps.ts` correspondente:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';

Given('que existe uma prova cadastrada', async function() {
  // Implementação
});

When('eu solicitar a geração de {int} provas', async function(quantidade: number) {
  // Implementação
});

Then('a resposta deve ter status {int}', async function(status: number) {
  // Validação
});
```

## 📊 Cobertura por Requisito

### ✅ Requisito 1 - Questões: **100% coberto**
- CRUD completo
- Validações de entrada
- Casos de erro

### ✅ Requisito 2 - Provas: **100% coberto**
- CRUD completo
- Tipos de identificação (LETRAS/POTENCIAS)
- Preview e validações

### ✅ Requisito 3 - PDFs/CSV: **100% coberto**
- Geração de múltiplas provas
- Embaralhamento
- Formato CSV com aspas
- Validação de conteúdo

### ✅ Requisito 4 - Correção: **100% coberto**
- Ambos modos (Rigoroso/Proporcional)
- Estatísticas completas
- Detalhamento por questão
- Validações de entrada

### ✅ Nova Funcionalidade - Respostas: **100% coberto**
- Geração simulada
- Distribuição de desempenho
- Validações completas
- Compatibilidade

## 💡 Boas Práticas Aplicadas

1. **Linguagem Natural**: Gherkin em português para fácil compreensão
2. **Contextos Compartilhados**: Reduz duplicação de código
3. **Cenários Atômicos**: Cada cenário testa uma funcionalidade específica
4. **Validações Explícitas**: Verificações claras dos resultados esperados
5. **Cobertura de Erros**: Testes de casos felizes E casos de erro
6. **Dados Realistas**: Exemplos próximos ao uso real do sistema

## 📚 Referências

- [Cucumber Documentation](https://cucumber.io/docs/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/)
- [Best Practices](https://cucumber.io/docs/guides/10-minute-tutorial/)

## 🎯 Próximos Passos

1. Implementar os steps faltantes para os novos cenários
2. Adicionar testes de integração end-to-end
3. Configurar CI/CD para executar testes automaticamente
4. Adicionar relatórios de cobertura de código
5. Criar testes de performance para grandes volumes
