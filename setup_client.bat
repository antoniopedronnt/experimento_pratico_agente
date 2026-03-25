@echo off
echo ========================================
echo Configurando projeto React + TypeScript
echo ========================================

REM Limpar diretório client se existir
if exist client\node_modules rmdir /s /q client\node_modules
if exist client\package.json del client\package.json
if exist client\package-lock.json del client\package-lock.json

REM Criar estrutura de diretórios
mkdir client\src\components 2>nul
mkdir client\src\services 2>nul
mkdir client\src\types 2>nul
mkdir client\src\pages 2>nul
mkdir client\public 2>nul

echo.
echo Criando arquivos de configuracao...

REM ==========================================
REM Criar package.json
REM ==========================================
(
echo {
echo   "name": "question-manager-client",
echo   "version": "1.0.0",
echo   "type": "module",
echo   "description": "Frontend para sistema de gerenciamento de questoes",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "tsc && vite build",
echo     "preview": "vite preview",
echo     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-router-dom": "^6.14.2",
echo     "axios": "^1.4.0"
echo   },
echo   "devDependencies": {
echo     "@types/react": "^18.2.15",
echo     "@types/react-dom": "^18.2.7",
echo     "@typescript-eslint/eslint-plugin": "^6.0.0",
echo     "@typescript-eslint/parser": "^6.0.0",
echo     "@vitejs/plugin-react": "^4.0.3",
echo     "eslint": "^8.45.0",
echo     "eslint-plugin-react-hooks": "^4.6.0",
echo     "eslint-plugin-react-refresh": "^0.4.3",
echo     "typescript": "^5.0.2",
echo     "vite": "^4.4.5"
echo   }
echo }
) > client\package.json

REM ==========================================
REM Criar tsconfig.json
REM ==========================================
(
echo {
echo   "compilerOptions": {
echo     "target": "ES2020",
echo     "useDefineForClassFields": true,
echo     "lib": ["ES2020", "DOM", "DOM.Iterable"],
echo     "module": "ESNext",
echo     "skipLibCheck": true,
echo     "moduleResolution": "bundler",
echo     "allowImportingTsExtensions": true,
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "noEmit": true,
echo     "jsx": "react-jsx",
echo     "strict": true,
echo     "noUnusedLocals": true,
echo     "noUnusedParameters": true,
echo     "noFallthroughCasesInSwitch": true
echo   },
echo   "include": ["src"],
echo   "references": [{ "path": "./tsconfig.node.json" }]
echo }
) > client\tsconfig.json

REM ==========================================
REM Criar tsconfig.node.json
REM ==========================================
(
echo {
echo   "compilerOptions": {
echo     "composite": true,
echo     "skipLibCheck": true,
echo     "module": "ESNext",
echo     "moduleResolution": "bundler",
echo     "allowSyntheticDefaultImports": true
echo   },
echo   "include": ["vite.config.ts"]
echo }
) > client\tsconfig.node.json

REM ==========================================
REM Criar vite.config.ts
REM ==========================================
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig^({
echo   plugins: [react^(^)],
echo   server: {
echo     port: 5173,
echo     proxy: {
echo       '/api': {
echo         target: 'http://localhost:3000',
echo         changeOrigin: true
echo       }
echo     }
echo   }
echo }^)
) > client\vite.config.ts

REM ==========================================
REM Criar index.html
REM ==========================================
(
echo ^<!DOCTYPE html^>
echo ^<html lang="pt-BR"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<link rel="icon" type="image/svg+xml" href="/vite.svg" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Gerenciador de Questoes^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/main.tsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > client\index.html

REM ==========================================
REM Criar .gitignore
REM ==========================================
(
echo node_modules
echo dist
echo dist-ssr
echo *.local
echo .env
echo .DS_Store
) > client\.gitignore

REM ==========================================
REM Criar vite-env.d.ts
REM ==========================================
(
echo /// ^<reference types="vite/client" /^>
) > client\src\vite-env.d.ts

REM ==========================================
REM Criar types/index.ts
REM ==========================================
(
echo export interface Alternative {
echo   id: string;
echo   descricao: string;
echo   correta: boolean;
echo }
echo.
echo export interface Question {
echo   id: string;
echo   enunciado: string;
echo   alternativas: Alternative[];
echo }
echo.
echo export interface QuestionInput {
echo   enunciado: string;
echo   alternativas: AlternativeInput[];
echo }
echo.
echo export interface AlternativeInput {
echo   descricao: string;
echo   correta: boolean;
echo }
) > client\src\types\index.ts

REM ==========================================
REM Criar main.tsx
REM ==========================================
(
echo import React from 'react'
echo import ReactDOM from 'react-dom/client'
echo import App from './App.tsx'
echo import './index.css'
echo.
echo ReactDOM.createRoot^(document.getElementById^('root'^)!^).render^(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>,
echo ^)
) > client\src\main.tsx

REM ==========================================
REM Criar App.tsx
REM ==========================================
(
echo import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
echo import QuestionList from './pages/QuestionList';
echo import QuestionForm from './pages/QuestionForm';
echo import './App.css';
echo.
echo function App^(^) {
echo   return ^(
echo     ^<Router^>
echo       ^<div className="app"^>
echo         ^<header className="app-header"^>
echo           ^<h1^>Gerenciador de Questoes de Provas^</h1^>
echo           ^<nav^>
echo             ^<Link to="/"^>Questoes^</Link^>
echo             ^<Link to="/new"^>Nova Questao^</Link^>
echo           ^</nav^>
echo         ^</header^>
echo         ^<main className="app-main"^>
echo           ^<Routes^>
echo             ^<Route path="/" element={^<QuestionList /^>} /^>
echo             ^<Route path="/new" element={^<QuestionForm /^>} /^>
echo             ^<Route path="/edit/:id" element={^<QuestionForm /^>} /^>
echo           ^</Routes^>
echo         ^</main^>
echo       ^</div^>
echo     ^</Router^>
echo   ^);
echo }
echo.
echo export default App;
) > client\src\App.tsx

REM ==========================================
REM Criar App.css
REM ==========================================
(
echo .app {
echo   min-height: 100vh;
echo   background: #f5f5f5;
echo }
echo.
echo .app-header {
echo   background: #282c34;
echo   color: white;
echo   padding: 1rem 2rem;
echo   box-shadow: 0 2px 4px rgba^(0,0,0,0.1^);
echo }
echo.
echo .app-header h1 {
echo   margin: 0 0 1rem 0;
echo   font-size: 1.8rem;
echo }
echo.
echo .app-header nav {
echo   display: flex;
echo   gap: 1rem;
echo }
echo.
echo .app-header nav a {
echo   color: white;
echo   text-decoration: none;
echo   padding: 0.5rem 1rem;
echo   border-radius: 4px;
echo   transition: background 0.3s;
echo }
echo.
echo .app-header nav a:hover {
echo   background: rgba^(255, 255, 255, 0.1^);
echo }
echo.
echo .app-main {
echo   max-width: 1200px;
echo   margin: 2rem auto;
echo   padding: 0 1rem;
echo }
) > client\src\App.css

REM ==========================================
REM Criar index.css
REM ==========================================
(
echo * {
echo   box-sizing: border-box;
echo }
echo.
echo body {
echo   margin: 0;
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
echo     sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo }
echo.
echo code {
echo   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
echo }
echo.
echo button {
echo   cursor: pointer;
echo   font-family: inherit;
echo }
) > client\src\index.css

REM ==========================================
REM Criar placeholder para páginas
REM ==========================================
(
echo import { useState, useEffect } from 'react';
echo import { Link } from 'react-router-dom';
echo import { questionService } from '../services/questionService';
echo import { Question } from '../types';
echo import './QuestionList.css';
echo.
echo function QuestionList^(^) {
echo   const [questions, setQuestions] = useState^<Question[]^>^([^]^);
echo   const [loading, setLoading] = useState^(true^);
echo   const [error, setError] = useState^<string ^| null^>^(null^);
echo.
echo   useEffect^(^(^) =^> {
echo     loadQuestions^(^);
echo   }, [^]^);
echo.
echo   const loadQuestions = async ^(^) =^> {
echo     try {
echo       setLoading^(true^);
echo       const data = await questionService.getAll^(^);
echo       setQuestions^(data^);
echo       setError^(null^);
echo     } catch ^(err^) {
echo       setError^('Erro ao carregar questoes'^);
echo       console.error^(err^);
echo     } finally {
echo       setLoading^(false^);
echo     }
echo   };
echo.
echo   const handleDelete = async ^(id: string^) =^> {
echo     if ^(!window.confirm^('Tem certeza que deseja remover esta questao?'^)^) return;
echo     try {
echo       await questionService.delete^(id^);
echo       await loadQuestions^(^);
echo     } catch ^(err^) {
echo       alert^('Erro ao remover questao'^);
echo     }
echo   };
echo.
echo   if ^(loading^) return ^<div className="loading"^>Carregando...^</div^>;
echo   if ^(error^) return ^<div className="error"^>{error}^</div^>;
echo.
echo   return ^(
echo     ^<div className="question-list"^>
echo       ^<h2^>Questoes Cadastradas^</h2^>
echo       {questions.length === 0 ? ^(
echo         ^<p className="empty-message"^>Nenhuma questao cadastrada.^</p^>
echo       ^) : ^(
echo         ^<div className="questions"^>
echo           {questions.map^(question =^> ^(
echo             ^<div key={question.id} className="question-card"^>
echo               ^<h3^>{question.enunciado}^</h3^>
echo               ^<ul^>
echo                 {question.alternativas.map^(alt =^> ^(
echo                   ^<li key={alt.id} className={alt.correta ? 'correct' : ''}^>
echo                     {alt.descricao}
echo                   ^</li^>
echo                 ^)^)}
echo               ^</ul^>
echo               ^<div className="actions"^>
echo                 ^<Link to={`/edit/${question.id}`} className="btn btn-edit"^>Editar^</Link^>
echo                 ^<button onClick={^(^) =^> handleDelete^(question.id^)} className="btn btn-delete"^>Remover^</button^>
echo               ^</div^>
echo             ^</div^>
echo           ^)^)}
echo         ^</div^>
echo       ^)}
echo     ^</div^>
echo   ^);
echo }
echo.
echo export default QuestionList;
) > client\src\pages\QuestionList.tsx

REM ==========================================
REM Criar QuestionForm.tsx
REM ==========================================
(
echo import { useState, useEffect } from 'react';
echo import { useNavigate, useParams } from 'react-router-dom';
echo import { questionService } from '../services/questionService';
echo import { AlternativeInput } from '../types';
echo import './QuestionForm.css';
echo.
echo function QuestionForm^(^) {
echo   const navigate = useNavigate^(^);
echo   const { id } = useParams^(^);
echo   const [enunciado, setEnunciado] = useState^(''^);
echo   const [alternativas, setAlternativas] = useState^<AlternativeInput[]^>^([
echo     { descricao: '', correta: false },
echo     { descricao: '', correta: false }
echo   ^]^);
echo   const [loading, setLoading] = useState^(false^);
echo.
echo   useEffect^(^(^) =^> {
echo     if ^(id^) {
echo       loadQuestion^(id^);
echo     }
echo   }, [id]^);
echo.
echo   const loadQuestion = async ^(questionId: string^) =^> {
echo     try {
echo       const question = await questionService.getById^(questionId^);
echo       setEnunciado^(question.enunciado^);
echo       setAlternativas^(question.alternativas.map^(alt =^> ^(^{
echo         descricao: alt.descricao,
echo         correta: alt.correta
echo       }^)^)^);
echo     } catch ^(err^) {
echo       alert^('Erro ao carregar questao'^);
echo     }
echo   };
echo.
echo   const handleSubmit = async ^(e: React.FormEvent^) =^> {
echo     e.preventDefault^(^);
echo     setLoading^(true^);
echo     try {
echo       if ^(id^) {
echo         await questionService.update^(id, { enunciado, alternativas }^);
echo       } else {
echo         await questionService.create^({ enunciado, alternativas }^);
echo       }
echo       navigate^('/'^);
echo     } catch ^(err: any^) {
echo       alert^(err.response?.data?.error ^|^| 'Erro ao salvar questao'^);
echo     } finally {
echo       setLoading^(false^);
echo     }
echo   };
echo.
echo   const addAlternativa = ^(^) =^> {
echo     setAlternativas^([...alternativas, { descricao: '', correta: false }]^);
echo   };
echo.
echo   const removeAlternativa = ^(index: number^) =^> {
echo     setAlternativas^(alternativas.filter^(^(_, i^) =^> i !== index^)^);
echo   };
echo.
echo   const updateAlternativa = ^(index: number, field: 'descricao' ^| 'correta', value: any^) =^> {
echo     const updated = [...alternativas];
echo     updated[index] = { ...updated[index], [field]: value };
echo     setAlternativas^(updated^);
echo   };
echo.
echo   return ^(
echo     ^<div className="question-form"^>
echo       ^<h2^>{id ? 'Editar Questao' : 'Nova Questao'}^</h2^>
echo       ^<form onSubmit={handleSubmit}^>
echo         ^<div className="form-group"^>
echo           ^<label^>Enunciado:^</label^>
echo           ^<textarea
echo             value={enunciado}
echo             onChange={^(e^) =^> setEnunciado^(e.target.value^)}
echo             required
echo             rows={3}
echo           /^>
echo         ^</div^>
echo         ^<div className="form-group"^>
echo           ^<label^>Alternativas:^</label^>
echo           {alternativas.map^(^(alt, index^) =^> ^(
echo             ^<div key={index} className="alternativa-item"^>
echo               ^<input
echo                 type="text"
echo                 value={alt.descricao}
echo                 onChange={^(e^) =^> updateAlternativa^(index, 'descricao', e.target.value^)}
echo                 placeholder={`Alternativa ${index + 1}`}
echo                 required
echo               /^>
echo               ^<label className="checkbox-label"^>
echo                 ^<input
echo                   type="checkbox"
echo                   checked={alt.correta}
echo                   onChange={^(e^) =^> updateAlternativa^(index, 'correta', e.target.checked^)}
echo                 /^>
echo                 Correta
echo               ^</label^>
echo               {alternativas.length ^> 2 ^&^& ^(
echo                 ^<button type="button" onClick={^(^) =^> removeAlternativa^(index^)} className="btn-remove"^>
echo                   Remover
echo                 ^</button^>
echo               ^)}
echo             ^</div^>
echo           ^)^)}
echo           ^<button type="button" onClick={addAlternativa} className="btn btn-add"^>
echo             + Adicionar Alternativa
echo           ^</button^>
echo         ^</div^>
echo         ^<div className="form-actions"^>
echo           ^<button type="submit" disabled={loading} className="btn btn-primary"^>
echo             {loading ? 'Salvando...' : 'Salvar'}
echo           ^</button^>
echo           ^<button type="button" onClick={^(^) =^> navigate^('/'^)} className="btn btn-secondary"^>
echo             Cancelar
echo           ^</button^>
echo         ^</div^>
echo       ^</form^>
echo     ^</div^>
echo   ^);
echo }
echo.
echo export default QuestionForm;
) > client\src\pages\QuestionForm.tsx

echo.
echo Criando estilos das paginas...

REM ==========================================
REM Criar QuestionList.css
REM ==========================================
(
echo .question-list {
echo   background: white;
echo   padding: 2rem;
echo   border-radius: 8px;
echo   box-shadow: 0 2px 8px rgba^(0,0,0,0.1^);
echo }
echo.
echo .question-list h2 {
echo   margin-top: 0;
echo   color: #282c34;
echo }
echo.
echo .loading, .error, .empty-message {
echo   text-align: center;
echo   padding: 2rem;
echo   font-size: 1.1rem;
echo }
echo.
echo .error {
echo   color: #d32f2f;
echo }
echo.
echo .questions {
echo   display: grid;
echo   gap: 1.5rem;
echo }
echo.
echo .question-card {
echo   border: 1px solid #ddd;
echo   padding: 1.5rem;
echo   border-radius: 8px;
echo   background: #fafafa;
echo }
echo.
echo .question-card h3 {
echo   margin-top: 0;
echo   color: #282c34;
echo }
echo.
echo .question-card ul {
echo   list-style: none;
echo   padding: 0;
echo   margin: 1rem 0;
echo }
echo.
echo .question-card li {
echo   padding: 0.5rem;
echo   margin: 0.25rem 0;
echo   background: white;
echo   border-radius: 4px;
echo   border-left: 3px solid #ddd;
echo }
echo.
echo .question-card li.correct {
echo   border-left-color: #4caf50;
echo   font-weight: bold;
echo }
echo.
echo .actions {
echo   display: flex;
echo   gap: 0.5rem;
echo   margin-top: 1rem;
echo }
echo.
echo .btn {
echo   padding: 0.5rem 1rem;
echo   border: none;
echo   border-radius: 4px;
echo   font-size: 0.9rem;
echo   transition: all 0.3s;
echo   text-decoration: none;
echo   display: inline-block;
echo }
echo.
echo .btn-edit {
echo   background: #2196f3;
echo   color: white;
echo }
echo.
echo .btn-edit:hover {
echo   background: #1976d2;
echo }
echo.
echo .btn-delete {
echo   background: #f44336;
echo   color: white;
echo }
echo.
echo .btn-delete:hover {
echo   background: #d32f2f;
echo }
) > client\src\pages\QuestionList.css

REM ==========================================
REM Criar QuestionForm.css
REM ==========================================
(
echo .question-form {
echo   background: white;
echo   padding: 2rem;
echo   border-radius: 8px;
echo   box-shadow: 0 2px 8px rgba^(0,0,0,0.1^);
echo   max-width: 800px;
echo }
echo.
echo .question-form h2 {
echo   margin-top: 0;
echo   color: #282c34;
echo }
echo.
echo .form-group {
echo   margin-bottom: 1.5rem;
echo }
echo.
echo .form-group label {
echo   display: block;
echo   margin-bottom: 0.5rem;
echo   font-weight: bold;
echo   color: #282c34;
echo }
echo.
echo .form-group textarea,
echo .form-group input[type="text"] {
echo   width: 100%%;
echo   padding: 0.75rem;
echo   border: 1px solid #ddd;
echo   border-radius: 4px;
echo   font-size: 1rem;
echo   font-family: inherit;
echo }
echo.
echo .alternativa-item {
echo   display: flex;
echo   gap: 0.5rem;
echo   align-items: center;
echo   margin-bottom: 0.75rem;
echo }
echo.
echo .alternativa-item input[type="text"] {
echo   flex: 1;
echo }
echo.
echo .checkbox-label {
echo   display: flex;
echo   align-items: center;
echo   gap: 0.25rem;
echo   white-space: nowrap;
echo   font-weight: normal;
echo }
echo.
echo .btn-remove {
echo   background: #f44336;
echo   color: white;
echo   border: none;
echo   padding: 0.5rem 0.75rem;
echo   border-radius: 4px;
echo   font-size: 0.85rem;
echo }
echo.
echo .btn-add {
echo   background: #4caf50;
echo   color: white;
echo   margin-top: 0.5rem;
echo }
echo.
echo .btn-add:hover {
echo   background: #45a049;
echo }
echo.
echo .form-actions {
echo   display: flex;
echo   gap: 1rem;
echo   margin-top: 2rem;
echo }
echo.
echo .btn-primary {
echo   background: #2196f3;
echo   color: white;
echo   padding: 0.75rem 2rem;
echo }
echo.
echo .btn-primary:hover:not^(:disabled^) {
echo   background: #1976d2;
echo }
echo.
echo .btn-primary:disabled {
echo   opacity: 0.6;
echo   cursor: not-allowed;
echo }
echo.
echo .btn-secondary {
echo   background: #757575;
echo   color: white;
echo   padding: 0.75rem 2rem;
echo }
echo.
echo .btn-secondary:hover {
echo   background: #616161;
echo }
) > client\src\pages\QuestionForm.css

REM ==========================================
REM Criar questionService.ts
REM ==========================================
(
echo import axios from 'axios';
echo import { Question, QuestionInput } from '../types';
echo.
echo const API_URL = 'http://localhost:3000/api';
echo.
echo const api = axios.create^({
echo   baseURL: API_URL,
echo   headers: {
echo     'Content-Type': 'application/json'
echo   }
echo }^);
echo.
echo export const questionService = {
echo   async getAll^(^): Promise^<Question[]^> {
echo     const response = await api.get^<Question[]^>^('/questions'^);
echo     return response.data;
echo   },
echo.
echo   async getById^(id: string^): Promise^<Question^> {
echo     const response = await api.get^<Question^>^(`/questions/${id}`^);
echo     return response.data;
echo   },
echo.
echo   async create^(data: QuestionInput^): Promise^<Question^> {
echo     const response = await api.post^<Question^>^('/questions', data^);
echo     return response.data;
echo   },
echo.
echo   async update^(id: string, data: Partial^<QuestionInput^>^): Promise^<Question^> {
echo     const response = await api.put^<Question^>^(`/questions/${id}`, data^);
echo     return response.data;
echo   },
echo.
echo   async delete^(id: string^): Promise^<void^> {
echo     await api.delete^(`/questions/${id}`^);
echo   }
echo };
) > client\src\services\questionService.ts

echo.
echo ========================================
echo Arquivos criados com sucesso!
echo ========================================
echo.
echo Instalando dependencias...
echo.

cd client
call npm install

cd ..

echo.
echo ========================================
echo Cliente configurado com sucesso!
echo ========================================
echo.
echo Para iniciar o cliente em modo dev:
echo   cd client
echo   npm run dev
echo.
echo O cliente estara rodando em http://localhost:5173
echo.
pause
