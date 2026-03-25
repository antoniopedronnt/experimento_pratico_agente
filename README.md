# Sistema de Gerenciamento de Questões de Provas

Sistema web full-stack para gerenciar questões fechadas de provas com múltiplas alternativas.

## 📋 Estrutura do Projeto

```
├── server/          # Backend (Node.js + TypeScript + Express)
├── client/          # Frontend (React + TypeScript) - Em desenvolvimento
├── setup_project.bat    # Script de setup inicial
├── run_server.bat       # Inicia o servidor em modo dev
└── run_tests.bat        # Executa testes Cucumber
```

## 🚀 Quick Start

### 1. Atualizar dependências do servidor

Se você acabou de clonar o projeto ou adicionou novas dependências:

```cmd
cd server
npm install
```

### 2. Iniciar o servidor em modo desenvolvimento

```cmd
run_server.bat
```

Ou manualmente:
```cmd
cd server
npm run dev
```

O servidor estará rodando em: **http://localhost:3000**

### 3. Executar testes de aceitação

```cmd
run_tests.bat
```

Ou manualmente:
```cmd
cd server
npm test
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
| `GET` | `/health` | Health check |

### Exemplo de Request - Criar Questão

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

### Exemplo de Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "enunciado": "Qual é a capital do Brasil?",
  "alternativas": [
    {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "descricao": "São Paulo",
      "correta": false
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440002",
      "descricao": "Rio de Janeiro",
      "correta": false
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440003",
      "descricao": "Brasília",
      "correta": true
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440004",
      "descricao": "Salvador",
      "correta": false
    }
  ]
}
```

## ✅ Regras de Validação

- **Enunciado**: não pode ser vazio
- **Alternativas**: mínimo de 2 alternativas
- **Resposta correta**: pelo menos 1 alternativa deve ser marcada como correta
- **Descrição**: alternativas não podem ter descrição vazia

## 🧪 Testes

Os testes de aceitação são escritos em Gherkin (português) usando Cucumber.

### Cenários cobertos:

✅ Criar questão válida  
✅ Validações (enunciado vazio, poucas alternativas, sem resposta correta)  
✅ Listar questões  
✅ Atualizar questão existente  
✅ Remover questão  
✅ Tratar erros (questão não encontrada)

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

### Frontend (em desenvolvimento)
- **React** + **TypeScript**
- **Vite** - Build tool

## 📁 Estrutura do Backend

```
server/
├── src/
│   ├── models/          # Interfaces Question e Alternative
│   ├── repositories/    # InMemoryQuestionRepository
│   ├── routes/          # Rotas da API
│   ├── controllers/     # QuestionController
│   ├── middleware/      # Validação e error handling
│   └── server.ts        # Entry point
├── tests/
│   ├── features/        # Arquivos .feature (Gherkin)
│   └── steps/           # Step definitions
├── package.json
└── tsconfig.json
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

## 🔄 Status do Projeto

- ✅ Backend API REST completo
- ✅ Testes de aceitação com Cucumber
- ✅ Validações de regras de negócio
- ⏳ Frontend React (próxima fase)

## 📄 Licença

ISC
