# Sistema de Gerenciamento de Questões e Provas

Sistema web full-stack para gerenciar questões fechadas e provas com múltiplas alternativas.

## 🎯 Funcionalidades

### ✅ Gerenciamento de Questões
- Criar, editar, listar e remover questões
- Questões com múltiplas alternativas
- Indicação de respostas corretas
- Validações automáticas

### ✅ Gerenciamento de Provas
- Criar provas selecionando questões existentes
- Dois tipos de identificação de alternativas:
  - **Letras (A, B, C, D...)**: Aluno indica letras das respostas
  - **Potências (1, 2, 4, 8, 16...)**: Aluno indica soma das respostas
- Visualização formatada da prova (preview)
- Opção de impressão
- CRUD completo de provas

### ✅ Geração de PDFs (NOVO!)
- **Gerar múltiplas provas com questões embaralhadas**
- **Cada prova tem ordem diferente de questões e alternativas**
- **Cabeçalho personalizável** (disciplina, professor, data, instituição)
- **Rodapé com número da prova** em cada página
- **Espaço para nome e CPF do aluno** no final
- **Geração de CSV com gabaritos** de todas as provas
- **Download em arquivo ZIP** (PDFs + CSV)

## 📋 Estrutura do Projeto

```
├── server/              # Backend (Node.js + TypeScript + Express)
├── client/              # Frontend (React + TypeScript + Vite)
├── setup_project.bat    # Setup inicial do servidor
├── setup_client.bat     # Setup inicial do cliente
├── update_server.bat    # Atualizar servidor
├── update_client.bat    # Atualizar cliente
├── start_all.bat        # Iniciar tudo (servidor + cliente)
├── run_server.bat       # Iniciar apenas servidor
└── run_tests.bat        # Executar testes Cucumber
```

## 🚀 Quick Start

### Opção 1: Iniciar Tudo (Recomendado)

```cmd
start_all.bat
```

Isso irá:
- Iniciar o servidor em http://localhost:3000
- Iniciar o cliente em http://localhost:5173
- Abrir duas janelas de terminal

### Opção 2: Iniciar Manualmente

**Terminal 1 - Servidor:**
```cmd
run_server.bat
```

**Terminal 2 - Cliente:**
```cmd
cd client
npm run dev
```

### Atualizar Dependências

Após clonar ou quando houver mudanças:

```cmd
update_server.bat
update_client.bat
```

### Executar Testes

```cmd
run_tests.bat
```

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
| `GET` | `/api/exams/:id/preview` | Visualizar prova formatada |
| `PUT` | `/api/exams/:id` | Atualizar prova |
| `DELETE` | `/api/exams/:id` | Remover prova |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Verificar status da API |

## 📝 Exemplos de Request

### Criar Questão

```json
POST http://localhost:3000/api/questions
Content-Type: application/json

{
  "enunciado": "Qual é a capital do Brasil?",
  "alternativas": [
    { "descricao": "São Paulo", "correta": false },
    { "descricao": "Rio de Janeiro", "correta": false },
    { "descricao": "Brasília", "correta": true },
    { "descricao": "Salvador", "correta": false }
  ]
}
```

### Criar Prova com Letras

```json
POST http://localhost:3000/api/exams
Content-Type: application/json

{
  "titulo": "Prova de Geografia",
  "questoes": ["uuid-1", "uuid-2", "uuid-3"],
  "tipoIdentificacao": "LETRAS"
}
```

### Criar Prova com Potências

```json
POST http://localhost:3000/api/exams
Content-Type: application/json

{
  "titulo": "Prova de Matemática",
  "questoes": ["uuid-1", "uuid-2"],
  "tipoIdentificacao": "POTENCIAS"
}
```

## 🎯 Tipos de Identificação de Alternativas

### LETRAS (A, B, C, D, E...)
- Alternativas identificadas por letras maiúsculas
- Aluno indica quais letras correspondem às respostas corretas
- Exemplo: "A, C, E"
- **Espaço na prova:** "Resposta (indique as letras das alternativas corretas): ___________"

### POTENCIAS (1, 2, 4, 8, 16, 32...)
- Alternativas identificadas por potências de 2
- Primeira alternativa = 1, segunda = 2, terceira = 4, etc.
- Aluno indica a **soma** das alternativas corretas
- Exemplo: Se corretas são 2 e 8, aluno escreve "10" (2+8)
- **Espaço na prova:** "Resposta (indique a soma das alternativas corretas): ___________"

**Por que potências de 2?**
- Cada soma representa uma combinação única de alternativas
- Facilita correção automática
- Evita ambiguidades

## ✅ Validações

### Questões
- ✓ Enunciado não pode ser vazio
- ✓ Mínimo de 2 alternativas
- ✓ Pelo menos 1 alternativa deve ser correta
- ✓ Descrições de alternativas não podem ser vazias

### Provas
- ✓ Título não pode ser vazio
- ✓ Pelo menos 1 questão deve ser selecionada
- ✓ Todas as questões devem existir no sistema
- ✓ Tipo de identificação deve ser válido (LETRAS ou POTENCIAS)

## 🧪 Testes

Testes de aceitação escritos em **Gherkin** (português) usando **Cucumber**.

### Cenários cobertos:

**Questões (4 arquivos .feature):**
- ✅ Criar questão válida
- ✅ Validações (enunciado, alternativas, resposta correta)
- ✅ Listar questões
- ✅ Atualizar e remover questões

**Provas (1 arquivo .feature):**
- ✅ Criar prova com identificação por letras
- ✅ Criar prova com identificação por potências
- ✅ Visualizar preview formatado
- ✅ Validações (título, questões, tipo)
- ✅ Listar, atualizar e remover provas

### Executar testes

```cmd
cd server
npm test
```

## 🛠 Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework web
- **UUID** - Geração de IDs únicos
- **CORS** - Requisições cross-origin
- **Cucumber** - Testes BDD
- **Supertest** + **Chai** - Testes de API

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool moderna
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização

## 📁 Estrutura

### Backend (server/)
```
server/
├── src/
│   ├── models/
│   │   ├── Question.ts          # Modelo de questão
│   │   ├── Alternative.ts       # Modelo de alternativa
│   │   └── Exam.ts              # Modelo de prova
│   ├── repositories/
│   │   ├── QuestionRepository.ts  # Repositório de questões
│   │   └── ExamRepository.ts      # Repositório de provas
│   ├── routes/
│   │   ├── questions.ts         # Rotas de questões
│   │   └── exams.ts             # Rotas de provas
│   ├── controllers/
│   │   ├── QuestionController.ts
│   │   └── ExamController.ts
│   ├── middleware/
│   │   ├── validation.ts        # Validações
│   │   └── errorHandler.ts      # Tratamento de erros
│   └── server.ts                # Entry point
├── tests/
│   ├── features/                # Arquivos .feature (Gherkin)
│   └── steps/                   # Step definitions
└── package.json
```

### Frontend (client/)
```
client/
├── src/
│   ├── pages/
│   │   ├── QuestionList.tsx     # Lista de questões
│   │   ├── QuestionForm.tsx     # Formulário de questão
│   │   ├── ExamList.tsx         # Lista de provas
│   │   ├── ExamForm.tsx         # Formulário de prova
│   │   └── ExamPreview.tsx      # Visualização da prova
│   ├── services/
│   │   ├── questionService.ts   # API de questões
│   │   └── examService.ts       # API de provas
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── App.tsx                  # Componente raiz
│   └── main.tsx                 # Entry point
└── package.json
```

## 📝 Modelo de Dados

### Question (Questão)
```typescript
interface Question {
  id: string;
  enunciado: string;
  alternativas: Alternative[];
}
```

### Alternative (Alternativa)
```typescript
interface Alternative {
  id: string;
  descricao: string;
  correta: boolean;
}
```

### Exam (Prova)
```typescript
interface Exam {
  id: string;
  titulo: string;
  questoes: string[];  // Array de IDs de questões
  tipoIdentificacao: 'LETRAS' | 'POTENCIAS';
  criadaEm: Date;
}
```

### ExamPreview (Preview da Prova)
```typescript
interface ExamPreview extends Exam {
  questoesCompletas: Array<{
    ordem: number;
    enunciado: string;
    alternativas: Array<{
      identificador: string;  // 'A' ou '1', '2', '4'...
      descricao: string;
      correta: boolean;
    }>;
  }>;
  espacoResposta: string;
}
```

## 🎨 Interface do Usuário

### Tela de Questões
- Listagem com cards
- Botões de editar e remover
- Formulário dinâmico para alternativas
- Indicação visual de alternativas corretas

### Tela de Provas
- Listagem com informações resumidas
- Badge indicando tipo de identificação
- Seleção de questões via checkboxes
- Escolha de tipo de identificação via radio buttons

### Preview da Prova
- Layout profissional para impressão
- Questões numeradas
- Alternativas identificadas conforme tipo escolhido
- Espaço para nome do aluno
- Espaço apropriado para resposta
- Botão de impressão

## 🔄 Status do Projeto

- ✅ **Requisito 1**: Gerenciamento de Questões (100%)
- ✅ **Requisito 2**: Gerenciamento de Provas (100%)
- ✅ Backend completo com API REST
- ✅ Frontend completo com React
- ✅ Testes de aceitação com Cucumber
- ✅ Validações de regras de negócio
- ✅ Interface responsiva

**Progresso:** 29/29 tarefas concluídas (100%) 🎉

## 📄 Licença

ISC

---

Desenvolvido como parte do primeiro experimento prático de IA

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
| `GET` | `/api/exams/:id/preview` | Visualizar prova formatada |
| `PUT` | `/api/exams/:id` | Atualizar prova |
| `DELETE` | `/api/exams/:id` | Remover prova |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Verificar status da API |

## 📝 Exemplos de Request

### Criar Questão

```bash
POST http://localhost:3000/api/questions
Content-Type: application/json

{
  "enunciado": "Qual é a capital do Brasil?",
  "alternativas": [
    { "descricao": "São Paulo", "correta": false },
    { "descricao": "Rio de Janeiro", "correta": false },
    { "descricao": "Brasília", "correta": true },
    { "descricao": "Salvador", "correta": false }
  ]
}
```

### Criar Prova com Identificação por Letras

```bash
POST http://localhost:3000/api/exams
Content-Type: application/json

{
  "titulo": "Prova de Geografia",
  "questoes": ["id-questao-1", "id-questao-2", "id-questao-3"],
  "tipoIdentificacao": "LETRAS"
}
```

### Criar Prova com Identificação por Potências

```bash
POST http://localhost:3000/api/exams
Content-Type: application/json

{
  "titulo": "Prova de Matemática",
  "questoes": ["id-questao-1", "id-questao-2"],
  "tipoIdentificacao": "POTENCIAS"
}
```

### Visualizar Preview da Prova

```bash
GET http://localhost:3000/api/exams/{id}/preview
```

Retorna a prova formatada com:
- Questões numeradas
- Alternativas identificadas por letras (A, B, C...) ou potências (1, 2, 4, 8...)
- Espaço para resposta apropriado ao tipo escolhido

## ✅ Regras de Validação

### Questões
- **Enunciado**: não pode ser vazio
- **Alternativas**: mínimo de 2 alternativas
- **Resposta correta**: pelo menos 1 alternativa deve ser marcada como correta
- **Descrição**: alternativas não podem ter descrição vazia

### Provas
- **Título**: não pode ser vazio
- **Questões**: pelo menos 1 questão deve ser selecionada
- **Questões válidas**: todas as questões devem existir no sistema
- **Tipo de identificação**: deve ser "LETRAS" ou "POTENCIAS"

## 🎯 Tipos de Identificação

### LETRAS
- Alternativas são identificadas como: **A, B, C, D, E...**
- O aluno deve indicar as letras das alternativas corretas
- Exemplo de espaço para resposta: "Resposta (indique as letras das alternativas corretas): ___________"

### POTENCIAS
- Alternativas são identificadas como: **1, 2, 4, 8, 16, 32...**
- O aluno deve indicar a **soma** das alternativas corretas
- Exemplo: Se as alternativas corretas são 2 e 8, o aluno escreve "10"
- Exemplo de espaço para resposta: "Resposta (indique a soma das alternativas corretas): ___________"

## 🧪 Testes

Os testes de aceitação são escritos em Gherkin (português) usando Cucumber.

### Cenários cobertos:

**Questões:**
✅ Criar, listar, atualizar e remover questões  
✅ Validações (enunciado, alternativas, respostas corretas)

**Provas:**
✅ Criar prova com identificação por letras  
✅ Criar prova com identificação por potências  
✅ Visualizar preview da prova formatada  
✅ Listar, atualizar e remover provas  
✅ Validações (título, questões, tipo de identificação)

### Executar testes

```cmd
cd server
npm test
```

## 🛠 Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework web
- **UUID** - Geração de IDs únicos
- **CORS** - Requisições cross-origin

### Testes
- **Cucumber** - BDD com Gherkin
- **Supertest** - Testes de API HTTP
- **Chai** - Assertions

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Navegação
- **Axios** - Cliente HTTP

## 📁 Estrutura do Backend

```
server/
├── src/
│   ├── models/
│   │   ├── Question.ts      # Modelo de questão
│   │   ├── Alternative.ts   # Modelo de alternativa
│   │   └── Exam.ts          # Modelo de prova
│   ├── repositories/
│   │   ├── QuestionRepository.ts  # Repositório de questões
│   │   └── ExamRepository.ts      # Repositório de provas
│   ├── routes/
│   │   ├── questions.ts     # Rotas de questões
│   │   └── exams.ts         # Rotas de provas
│   ├── controllers/
│   │   ├── QuestionController.ts  # Controlador de questões
│   │   └── ExamController.ts      # Controlador de provas
│   ├── middleware/
│   │   ├── validation.ts    # Validações
│   │   └── errorHandler.ts  # Tratamento de erros
│   └── server.ts            # Entry point
├── tests/
│   ├── features/            # Arquivos .feature (Gherkin)
│   └── steps/               # Step definitions
└── package.json
```

## 📝 Modelo de Dados

### Question (Questão)
```typescript
interface Question {
  id: string;
  enunciado: string;
  alternativas: Alternative[];
}
```

### Alternative (Alternativa)
```typescript
interface Alternative {
  id: string;
  descricao: string;
  correta: boolean;
}
```

### Exam (Prova)
```typescript
interface Exam {
  id: string;
  titulo: string;
  questoes: string[];  // Array de IDs
  tipoIdentificacao: 'LETRAS' | 'POTENCIAS';
  criadaEm: Date;
}
```

## 🔄 Status do Projeto

- ✅ **Requisito 1**: Gerenciamento de Questões (COMPLETO)
- ✅ **Requisito 2**: Gerenciamento de Provas (Backend COMPLETO)
- ⏳ **Requisito 2**: Frontend para Provas (Em desenvolvimento)

## 📄 Licença

ISC
