@echo off
echo ========================================
echo Criando estrutura do projeto...
echo ========================================

REM Criar diretorios do servidor
mkdir server\src\models 2>nul
mkdir server\src\repositories 2>nul
mkdir server\src\routes 2>nul
mkdir server\src\controllers 2>nul
mkdir server\src\middleware 2>nul
mkdir server\tests\features 2>nul
mkdir server\tests\steps 2>nul

REM Criar diretorios do cliente
mkdir client\src\components 2>nul
mkdir client\src\services 2>nul
mkdir client\src\types 2>nul

echo.
echo Diretorios criados!
echo.
echo Criando arquivos do servidor...

REM ==========================================
REM Criar package.json do servidor
REM ==========================================
(
echo {
echo   "name": "question-manager-server",
echo   "version": "1.0.0",
echo   "description": "Backend para sistema de gerenciamento de questoes de provas",
echo   "main": "dist/server.js",
echo   "scripts": {
echo     "build": "tsc",
echo     "start": "node dist/server.js",
echo     "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
echo     "test": "cucumber-js"
echo   },
echo   "keywords": ["typescript", "express", "api", "questions"],
echo   "author": "",
echo   "license": "ISC",
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "cors": "^2.8.5",
echo     "uuid": "^9.0.0"
echo   },
echo   "devDependencies": {
echo     "@types/express": "^4.17.17",
echo     "@types/cors": "^2.8.13",
echo     "@types/uuid": "^9.0.2",
echo     "@types/node": "^20.4.2",
echo     "typescript": "^5.1.6",
echo     "ts-node": "^10.9.1",
echo     "ts-node-dev": "^2.0.0",
echo     "@cucumber/cucumber": "^9.3.0",
echo     "supertest": "^6.3.3",
echo     "@types/supertest": "^2.0.12"
echo   }
echo }
) > server\package.json

REM ==========================================
REM Criar tsconfig.json do servidor
REM ==========================================
(
echo {
echo   "compilerOptions": {
echo     "target": "ES2020",
echo     "module": "commonjs",
echo     "lib": ["ES2020"],
echo     "outDir": "./dist",
echo     "rootDir": "./src",
echo     "strict": true,
echo     "esModuleInterop": true,
echo     "skipLibCheck": true,
echo     "forceConsistentCasingInFileNames": true,
echo     "resolveJsonModule": true,
echo     "moduleResolution": "node",
echo     "declaration": true,
echo     "declarationMap": true,
echo     "sourceMap": true
echo   },
echo   "include": ["src/**/*"],
echo   "exclude": ["node_modules", "dist", "tests"]
echo }
) > server\tsconfig.json

REM ==========================================
REM Criar .gitignore do servidor
REM ==========================================
(
echo node_modules/
echo dist/
echo *.log
echo .env
echo .DS_Store
echo coverage/
) > server\.gitignore

REM ==========================================
REM Criar README.md do servidor
REM ==========================================
(
echo # Question Manager - Backend
echo.
echo Sistema de gerenciamento de questoes de provas - API REST com Node.js, TypeScript e Express.
echo.
echo ## Instalacao
echo.
echo ```bash
echo npm install
echo ```
echo.
echo ## Scripts Disponiveis
echo.
echo - `npm run dev` - Inicia o servidor em modo desenvolvimento
echo - `npm run build` - Compila o TypeScript
echo - `npm start` - Inicia o servidor compilado
echo - `npm test` - Executa testes com Cucumber
echo.
echo ## API Endpoints
echo.
echo - POST /api/questions - Criar questao
echo - GET /api/questions - Listar questoes
echo - GET /api/questions/:id - Buscar por ID
echo - PUT /api/questions/:id - Atualizar questao
echo - DELETE /api/questions/:id - Remover questao
echo - GET /health - Status da API
) > server\README.md

REM ==========================================
REM Criar server.ts
REM ==========================================
(
echo import express from 'express';
echo import cors from 'cors';
echo.
echo const app = express^(^);
echo const PORT = process.env.PORT ^|^| 3000;
echo.
echo // Middleware
echo app.use^(cors^(^)^);
echo app.use^(express.json^(^)^);
echo.
echo // Health check
echo app.get^('/health', ^(req, res^) =^> {
echo   res.json^({ status: 'ok', message: 'Question Manager API is running' }^);
echo }^);
echo.
echo // Placeholder for routes
echo app.get^('/api/questions', ^(req, res^) =^> {
echo   res.json^({ message: 'Questions endpoint - coming soon' }^);
echo }^);
echo.
echo app.listen^(PORT, ^(^) =^> {
echo   console.log^(`Server is running on http://localhost:${PORT}`^);
echo }^);
echo.
echo export default app;
) > server\src\server.ts

echo.
echo ========================================
echo Arquivos criados com sucesso!
echo ========================================
echo.
echo Instalando dependencias do servidor...
echo.

cd server
call npm install

cd ..

echo.
echo ========================================
echo Setup completo! 
echo ========================================
echo.
echo Para iniciar o servidor em modo dev:
echo   cd server
echo   npm run dev
echo.
pause
