# Question Manager - Backend

Sistema de gerenciamento de questoes de provas - API REST com Node.js, TypeScript e Express.

## Instalacao

```bash
npm install
```

## Scripts Disponiveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor compilado
- `npm test` - Executa testes com Cucumber

## API Endpoints

- POST /api/questions - Criar questao
- GET /api/questions - Listar questoes
- GET /api/questions/:id - Buscar por ID
- PUT /api/questions/:id - Atualizar questao
- DELETE /api/questions/:id - Remover questao
- GET /health - Status da API
