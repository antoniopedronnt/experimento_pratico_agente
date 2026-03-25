# 🚀 Guia de Deploy - Sistema de Gerenciamento de Provas

## 📋 Visão Geral

Este guia apresenta diferentes formas de fazer deploy do sistema completo (Backend + Frontend).

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                      │
│            React + TypeScript + Vite            │
│              Porta: 5173 (dev)                  │
│              Porta: 80/443 (prod)               │
└────────────────┬────────────────────────────────┘
                 │
                 │ HTTP/REST API
                 │
┌────────────────▼────────────────────────────────┐
│                   BACKEND                       │
│           Node.js + Express + TypeScript        │
│                Porta: 3000                      │
│        Repositórios em Memória (RAM)            │
└─────────────────────────────────────────────────┘
```

**⚠️ IMPORTANTE:** O sistema usa **repositórios em memória**. Todos os dados são perdidos quando o servidor reinicia. Para produção, considere implementar persistência (banco de dados).

---

## 🎯 Opção 1: Deploy Local/Produção Simples

### **1.1 Build do Projeto**

#### Backend:
```bash
cd server
npm install
npm run build
```
Isso gera a pasta `dist/` com código JavaScript compilado.

#### Frontend:
```bash
cd client
npm install
npm run build
```
Isso gera a pasta `dist/` com arquivos estáticos otimizados.

### **1.2 Executar em Produção**

#### Script Automatizado:

Crie o arquivo `deploy_local.bat`:

```batch
@echo off
echo ========================================
echo    DEPLOY LOCAL - MODO PRODUCAO
echo ========================================
echo.

REM Build do servidor
echo [1/4] Compilando servidor...
cd server
call npm install --production
call npm run build
if errorlevel 1 (
    echo ERRO ao compilar servidor!
    pause
    exit /b 1
)
cd ..

REM Build do cliente
echo [2/4] Compilando cliente...
cd client
call npm install
call npm run build
if errorlevel 1 (
    echo ERRO ao compilar cliente!
    pause
    exit /b 1
)
cd ..

REM Copiar build do cliente para o servidor
echo [3/4] Copiando arquivos do cliente...
if not exist "server\public" mkdir server\public
xcopy /E /Y client\dist\* server\public\

echo [4/4] Iniciando servidor...
cd server
set NODE_ENV=production
set PORT=3000
node dist\server.js

pause
```

### **1.3 Servir Frontend pelo Backend**

Modifique `server/src/server.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import path from 'path';
import { questionRoutes, examRoutes, correctionRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Question Manager API is running' });
});

// API Routes
app.use('/api', questionRoutes);
app.use('/api', examRoutes);
app.use('/api/exams', correctionRoutes);

// Servir frontend em produção
if (isProduction) {
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

// Só inicia o servidor se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (isProduction) {
      console.log('Running in PRODUCTION mode');
    }
  });
}

export default app;
```

---

## 🐳 Opção 2: Deploy com Docker

### **2.1 Dockerfile do Backend**

Crie `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Variável de ambiente
ENV NODE_ENV=production

# Comando de inicialização
CMD ["node", "dist/server.js"]
```

### **2.2 Dockerfile do Frontend**

Crie `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio de produção com nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### **2.3 Nginx Config**

Crie `client/nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **2.4 Docker Compose**

Crie `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./server
    container_name: exam-backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped

  frontend:
    build: ./client
    container_name: exam-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

### **2.5 Comandos Docker**

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## ☁️ Opção 3: Deploy em Cloud

### **3.1 Heroku**

#### Backend:

Crie `server/Procfile`:
```
web: node dist/server.js
```

Crie `server/heroku-postbuild` em `package.json`:
```json
{
  "scripts": {
    "heroku-postbuild": "npm run build"
  }
}
```

Comandos:
```bash
heroku create nome-do-app-backend
heroku config:set NODE_ENV=production
git subtree push --prefix server heroku main
```

#### Frontend (Vercel):

```bash
cd client
vercel --prod
```

Configure variável de ambiente:
```
VITE_API_URL=https://seu-app-backend.herokuapp.com
```

### **3.2 Railway**

1. Conecte o repositório GitHub
2. Crie dois serviços:
   - Backend: Pasta `server`, comando `npm start`
   - Frontend: Pasta `client`, comando `npm run preview`
3. Configure variáveis de ambiente

### **3.3 Render**

**Backend:**
- Build Command: `npm install && npm run build`
- Start Command: `node dist/server.js`
- Environment: Node

**Frontend:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment: Static Site

---

## ⚙️ Configurações Importantes

### **1. Variáveis de Ambiente**

#### Backend (.env):
```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-frontend.com
```

#### Frontend (.env.production):
```env
VITE_API_URL=https://seu-backend.com/api
```

### **2. CORS**

Atualize `server/src/server.ts`:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

### **3. API URL do Frontend**

Crie `client/src/config.ts`:
```typescript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

Atualize `client/src/services/*.ts`:
```typescript
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL
});
```

---

## 📝 Checklist de Deploy

### Antes do Deploy:

- [ ] Todos os testes passando (`run_tests.bat`)
- [ ] Build funciona localmente
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] URLs da API atualizadas no frontend

### Após o Deploy:

- [ ] Health check funcionando (`/health`)
- [ ] Frontend carrega corretamente
- [ ] API responde às requisições
- [ ] Criar questão funciona
- [ ] Criar prova funciona
- [ ] Gerar PDFs funciona
- [ ] Correção funciona

---

## 🔍 Troubleshooting

### Problema: "Cannot GET /api/..."
**Solução:** Verifique se o backend está rodando e se a URL está correta.

### Problema: CORS error
**Solução:** Configure `CORS_ORIGIN` no backend com a URL do frontend.

### Problema: Dados perdidos após reinício
**Solução:** Normal - sistema usa memória RAM. Implemente persistência.

### Problema: PDFs não são gerados
**Solução:** Verifique se as dependências `pdfkit` e `archiver` estão instaladas.

---

## 🎯 Recomendações de Produção

### **Imediatas:**
1. ✅ Use HTTPS (Let's Encrypt gratuito)
2. ✅ Configure CORS apropriadamente
3. ✅ Use variáveis de ambiente
4. ✅ Implemente logs (Winston, Pino)
5. ✅ Configure rate limiting

### **Futuras:**
1. 💾 Implementar banco de dados (PostgreSQL, MongoDB)
2. 🔐 Adicionar autenticação (JWT)
3. 📊 Monitoramento (Sentry, New Relic)
4. 🚀 CDN para assets estáticos
5. 🔄 CI/CD (GitHub Actions)

---

## 📚 Recursos Adicionais

- **Docker:** https://docs.docker.com/
- **Heroku:** https://devcenter.heroku.com/
- **Vercel:** https://vercel.com/docs
- **Railway:** https://docs.railway.app/
- **Render:** https://render.com/docs

---

**Criado em:** 2026-03-25  
**Última Atualização:** 2026-03-25  
**Versão:** 1.0
