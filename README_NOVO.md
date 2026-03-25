# 📝 Sistema Completo de Gerenciamento de Provas

Sistema web full-stack para gerenciar questões, criar provas, gerar PDFs com embaralhamento e corrigir automaticamente com relatórios de notas.

## 🎯 Funcionalidades

### ✅ 1. Gerenciamento de Questões
- Criar, editar, listar e remover questões
- Questões com múltiplas alternativas
- Indicação de respostas corretas
- Validações automáticas

### ✅ 2. Gerenciamento de Provas
- Criar provas selecionando questões existentes
- **Dois tipos de identificação de alternativas:**
  - **Letras (A, B, C, D...)**: Aluno indica letras das respostas
  - **Potências (1, 2, 4, 8, 16...)**: Aluno indica soma das respostas (cada soma é única!)
- Visualização formatada da prova (preview)
- Opção de impressão
- CRUD completo de provas

### ✅ 3. Geração de PDFs com Embaralhamento
- **Gerar múltiplas provas com questões embaralhadas**
- **Cada prova tem ordem diferente de questões e alternativas**
- **Cabeçalho personalizável** (disciplina, professor, data, instituição)
- **Rodapé com número da prova** em cada página
- **Espaço para nome e CPF do aluno** no final
- **Geração automática de CSV com gabaritos**
- **Download em arquivo ZIP** (PDFs + CSV)

### ✅ 4. Correção Automática e Relatório de Notas
- **Upload de CSVs**: Gabarito (gerado) + Respostas dos alunos
- **Dois modos de correção**:
  - **Rigoroso**: Qualquer erro na questão = nota zero (All-or-Nothing)
  - **Proporcional**: Nota proporcional ao % de acertos (Partial Credit)
- **Relatório interativo**: Tabela com notas, filtros, ordenação
- **Estatísticas da turma**: Média, mediana, maior/menor nota
- **Detalhes por aluno**: Modal com correção questão por questão
- **Código de cores**: Verde (≥70), Laranja (50-69), Vermelho (<50)

---

## 📋 Estrutura do Projeto

```
├── server/                  # Backend (Node.js + TypeScript + Express)
│   ├── src/
│   │   ├── models/         # Question, Exam, Correction
│   │   ├── services/       # Shuffle, PDF, CSV, Correction
│   │   ├── controllers/    # Question, Exam, Correction
│   │   ├── repositories/   # In-memory storage
│   │   ├── routes/         # API endpoints
│   │   └── middleware/     # Validation, error handling
│   └── tests/              # Cucumber (Gherkin em português)
├── client/                  # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── pages/          # QuestionList, ExamList, ExamCorrection, etc.
│   │   ├── components/     # GradingReport, StudentGradeDetail, etc.
│   │   └── services/       # API clients
├── setup_project.bat        # Setup inicial do servidor
├── setup_client.bat         # Setup inicial do cliente
├── update_server_pdf.bat    # Instalar dependências PDF
├── update_server_csv.bat    # Instalar dependências CSV ⭐ NOVO!
├── start_all.bat            # Iniciar tudo (servidor + cliente)
├── run_server.bat           # Iniciar apenas servidor
├── run_tests.bat            # Executar testes Cucumber
└── README.md                # Este arquivo
```

---

## 🚀 Quick Start

### 1. Primeira vez? Instale as dependências:
```cmd
REM Já instalou no passado? Pule para o passo 2
update_server_pdf.bat
update_server_csv.bat
```

### 2. Iniciar o sistema:
```cmd
start_all.bat
```

Isso irá:
- Iniciar o servidor em **http://localhost:3000**
- Iniciar o cliente em **http://localhost:5173**
- Abrir duas janelas de terminal

### 3. Acessar:
```
http://localhost:5173
```

---

## 🎓 Fluxo Completo de Uso

### 1️⃣ Criar Questões
```
Acessar "Questões" → "+ Nova Questão"
Preencher enunciado e alternativas
Marcar respostas corretas
Salvar
```

### 2️⃣ Criar Prova
```
Acessar "Provas" → "+ Nova Prova"
Selecionar questões
Escolher tipo (LETRAS ou POTENCIAS)
Salvar
```

### 3️⃣ Gerar PDFs
```
Lista de Provas → "👁️ Visualizar" → "📄 Gerar PDFs"
Informar quantidade e cabeçalho
Baixar ZIP com:
  ├─ prova_1.pdf, prova_2.pdf, ...
  └─ gabarito.csv
```

### 4️⃣ Aplicar Prova
```
Imprimir PDFs
Distribuir para alunos
Alunos respondem
```

### 5️⃣ Coletar Respostas
```
Criar CSV com respostas (pode usar Google Forms):
Nome,CPF,NumeroProva,Questao_1,Questao_2,...
João Silva,12345678900,1,"A, C","15"
Maria Santos,98765432100,2,"B","7"
```

### 6️⃣ Corrigir e Ver Relatório
```
Lista de Provas → "✅ Corrigir"
Upload CSV gabarito
Upload CSV respostas
Escolher modo (Rigoroso/Proporcional)
Ver relatório com:
  ├─ Tabela de notas
  ├─ Estatísticas da turma
  └─ Detalhes por aluno
```

---

## 📡 API Endpoints

### Questões
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/questions` | Criar nova questão |
| `GET` | `/api/questions` | Listar todas as questões |
| `GET` | `/api/questions/:id` | Buscar questão por ID |
| `PUT` | `/api/questions/:id` | Atualizar questão |
| `DELETE` | `/api/questions/:id` | Remover questão |

### Provas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/exams` | Criar nova prova |
| `GET` | `/api/exams` | Listar todas as provas |
| `GET` | `/api/exams/:id` | Buscar prova por ID |
| `GET` | `/api/exams/:id/preview` | Preview formatado da prova |
| `POST` | `/api/exams/:id/generate` | Gerar PDFs e CSV das provas |
| `POST` | `/api/exams/:id/correct` | Corrigir provas e gerar relatório ⭐ |
| `PUT` | `/api/exams/:id` | Atualizar prova |
| `DELETE` | `/api/exams/:id` | Remover prova |

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework web
- **UUID** - Geração de IDs únicos
- **CORS** - Configuração de CORS
- **PDFKit** - Geração de PDFs profissionais
- **Archiver** - Compactação em ZIP
- **csv-parse** - Parsing robusto de CSV
- **Cucumber** - Testes BDD com Gherkin em português
- **Supertest** + **Chai** - Testes de API

### Frontend
- **React 18** + **TypeScript**
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP
- **Vite** - Build tool rápido
- **CSS Modules** - Estilização componentizada

### Padrões e Arquitetura
- **Repository Pattern** - Abstração de dados (in-memory)
- **Controller Pattern** - Lógica de negócio
- **Service Layer** - Lógica complexa (shuffle, PDF, CSV, correção)
- **Middleware** - Validação e tratamento de erros
- **BDD** - Testes em linguagem natural (Gherkin)

---

## 🧮 Algoritmos de Correção

### Modo RIGOROSO (All-or-Nothing)
Qualquer erro = nota zero

**Exemplo (Gabarito: "A, C" em questão com 4 alternativas):**
- Responde "A, C" → **100 pontos** ✓
- Responde "A" → **0 pontos** ✗ (faltou C)
- Responde "A, B, C" → **0 pontos** ✗ (marcou B errado)

### Modo PROPORCIONAL (Partial Credit)
Nota proporcional aos acertos nas alternativas

**Lógica:**
```
Para cada alternativa:
  - Correta E marcada: +1 acerto
  - Incorreta E NÃO marcada: +1 acerto
  - Caso contrário: erro

Pontuação = (acertos / total_alternativas) * 100
```

**Exemplo (Gabarito: "A, C" em questão com 4 alternativas A,B,C,D):**
- Responde "A, C" → 4/4 = **100%** ✓✓✓✓ (marcou A✓, não marcou B✓, marcou C✓, não marcou D✓)
- Responde "A" → 3/4 = **75%** (marcou A✓, não marcou B✓, NÃO marcou C✗, não marcou D✓)
- Responde "A, B" → 2/4 = **50%** (marcou A✓, MARCOU B✗, NÃO marcou C✗, não marcou D✓)
- Responde "B, D" → 0/4 = **0%** ✗✗✗✗

---

## 🧪 Testes

**30+ cenários** de teste em Gherkin (português) com Cucumber:

### Questões (4 arquivos .feature)
- ✅ Criar, listar, atualizar, remover
- ✅ Validações (enunciado, alternativas, resposta correta)

### Provas (1 arquivo .feature)
- ✅ Criar com LETRAS e POTENCIAS
- ✅ Preview formatado
- ✅ Validações

### Correção (1 arquivo .feature) ⭐ NOVO
- ✅ Correção rigorosa (certo/errado)
- ✅ Correção proporcional (crédito parcial)
- ✅ Múltiplos alunos e estatísticas
- ✅ Ambos tipos (LETRAS e POTENCIAS)

### Executar testes
```cmd
run_tests.bat
```

---

## 📚 Documentação Adicional

- **[PROJETO_COMPLETO.md](PROJETO_COMPLETO.md)** - Documentação técnica completa
- **[REQUISITO_3_PDFS.md](REQUISITO_3_PDFS.md)** - Detalhes da geração de PDFs
- **[REQUISITO_4_CORRECAO.md](REQUISITO_4_CORRECAO.md)** - Detalhes do sistema de correção

---

## 🏆 Status do Projeto

### ✅ PROJETO 100% COMPLETO!

- ✅ **Requisito 1**: Gerenciamento de Questões
- ✅ **Requisito 2**: Gerenciamento de Provas  
- ✅ **Requisito 3**: Geração de PDFs com Embaralhamento
- ✅ **Requisito 4**: Correção Automática e Relatórios

**Total:** 55/55 tarefas concluídas 🎉

### Estatísticas
- **Backend**: 25 arquivos criados/modificados
- **Frontend**: 16 arquivos criados/modificados
- **Testes**: 6 arquivos .feature + steps
- **Total de código novo**: ~3,500 linhas
- **Funcionalidades**: 4 requisitos completos
- **Cobertura de testes**: 30+ cenários Cucumber

---

## 📝 Notas

- O sistema usa armazenamento **em memória** (dados são perdidos ao reiniciar)
- Provas são geradas com questões e alternativas em **ordem aleatória**
- Gabaritos são gerados **automaticamente** no CSV
- PDFs têm **layout profissional** pronto para impressão
- Correção suporta **dois algoritmos** (rigoroso e proporcional)
- Interface **totalmente responsiva** e moderna

---

## 📄 Licença

ISC

---

**Desenvolvido como parte do primeiro experimento prático de IA** 🤖  
Sistema completo end-to-end de gerenciamento de provas educacionais.
