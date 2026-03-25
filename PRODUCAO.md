# 🌐 Deploy em Produção - Guia Passo a Passo

## 🎯 Opções Recomendadas (Gratuitas/Baratas)

Este guia mostra **3 formas práticas** de colocar seu sistema online para acesso público.

---

## ✅ Opção 1: Render.com (MAIS FÁCIL - Recomendado)

### **Por que Render?**
- ✅ Gratuito para começar
- ✅ Deploy automático via GitHub
- ✅ Suporta backend e frontend
- ✅ HTTPS automático
- ✅ Fácil de configurar

### **Passo a Passo Completo:**

#### **1. Preparar o Repositório**

```bash
# Criar .gitignore se não existir
echo node_modules/ > .gitignore
echo dist/ >> .gitignore
echo .env >> .gitignore

# Fazer commit
git add .
git commit -m "Preparar para deploy"
git push origin main
```

#### **2. Deploy do Backend**

1. Acesse https://render.com e faça login com GitHub
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório
4. Configure:

```
Name: exam-backend
Region: Oregon (US West)
Branch: main
Root Directory: server
Build Command: npm install && npm run build
Start Command: node dist/server.js
```

5. **Environment Variables** (adicione):
```
NODE_ENV=production
PORT=3000
```

6. Clique em **"Create Web Service"**
7. Aguarde o build (5-10 minutos)
8. Copie a URL gerada (ex: `https://exam-backend-xxx.onrender.com`)

#### **3. Deploy do Frontend**

1. No Render, clique em **"New +"** → **"Static Site"**
2. Selecione o mesmo repositório
3. Configure:

```
Name: exam-frontend
Branch: main
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
```

4. **Environment Variables**:
```
VITE_API_URL=https://exam-backend-xxx.onrender.com/api
```
(Use a URL do backend copiada no passo anterior)

5. Clique em **"Create Static Site"**
6. Aguarde o build (5-10 minutos)
7. Acesse a URL gerada!

#### **4. Atualizar CORS no Backend**

No Render, vá até o backend → **Environment** → Adicionar:
```
CORS_ORIGIN=https://exam-frontend-xxx.onrender.com
```

Clique em **"Save Changes"** (vai fazer redeploy automático)

### **✅ Pronto! Seu sistema está online!**

**URLs de exemplo:**
- Frontend: `https://exam-frontend-xxx.onrender.com`
- Backend: `https://exam-backend-xxx.onrender.com`
- API: `https://exam-backend-xxx.onrender.com/api`

---

## 🚀 Opção 2: Vercel (Frontend) + Railway (Backend)

### **Por que esta combinação?**
- ✅ Vercel = melhor para React/Frontend
- ✅ Railway = fácil para backend Node.js
- ✅ Ambos têm plano gratuito

### **Passo a Passo:**

#### **A) Deploy do Backend no Railway**

1. Acesse https://railway.app e faça login com GitHub
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione seu repositório
4. Clique em **"Add Service"** → **"GitHub Repo"**
5. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`

6. Vá em **"Variables"** e adicione:
```
NODE_ENV=production
PORT=3000
```

7. Clique em **"Settings"** → **"Networking"** → **"Generate Domain"**
8. Copie a URL (ex: `https://exam-backend.up.railway.app`)

#### **B) Deploy do Frontend no Vercel**

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. No terminal, vá para a pasta do projeto:
```bash
cd client
```

3. Configure a variável de ambiente:
Crie arquivo `client/.env.production`:
```
VITE_API_URL=https://exam-backend.up.railway.app/api
```

4. Execute deploy:
```bash
vercel --prod
```

5. Siga as instruções:
```
? Set up and deploy "~/client"? Yes
? Which scope? (seu usuário)
? Link to existing project? No
? What's your project's name? exam-frontend
? In which directory is your code located? ./
? Want to override the settings? No
```

6. Aguarde o deploy (2-3 minutos)
7. Vercel mostrará a URL: `https://exam-frontend.vercel.app`

#### **C) Atualizar CORS no Railway**

No Railway, vá em **Variables** e adicione:
```
CORS_ORIGIN=https://exam-frontend.vercel.app
```

### **✅ Pronto!**

**URLs:**
- Frontend: `https://exam-frontend.vercel.app`
- Backend: `https://exam-backend.up.railway.app`

---

## 📦 Opção 3: Servidor VPS (AWS, DigitalOcean, etc.)

### **Para quem?**
- Quem quer controle total
- Quem precisa de mais recursos
- Quem quer usar Docker

### **Passo a Passo:**

#### **1. Criar Servidor**

**DigitalOcean (Recomendado):**
- Criar conta em https://digitalocean.com
- Criar Droplet Ubuntu 22.04 ($6/mês)
- Escolher região mais próxima
- Adicionar sua chave SSH

**AWS EC2:**
- Criar conta AWS
- Lançar instância t2.micro (free tier)
- Ubuntu 22.04
- Configurar security group (portas 80, 443, 22)

#### **2. Conectar ao Servidor**

```bash
ssh root@SEU_IP_SERVIDOR
```

#### **3. Instalar Dependências**

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Instalar Nginx
apt install -y nginx

# Instalar Docker (opcional)
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose

# Instalar Git
apt install -y git
```

#### **4. Clonar Repositório**

```bash
# Ir para pasta web
cd /var/www

# Clonar projeto
git clone https://github.com/SEU_USUARIO/SEU_REPO.git exam-system
cd exam-system
```

#### **5. Opção A: Deploy sem Docker**

```bash
# Backend
cd server
npm install --production
npm run build
cp .env.production .env

# Instalar PM2 para gerenciar processo
npm install -g pm2

# Iniciar backend
pm2 start dist/server.js --name exam-backend
pm2 save
pm2 startup

# Frontend
cd ../client
npm install
npm run build

# Copiar build para Nginx
cp -r dist /var/www/exam-frontend
```

#### **6. Configurar Nginx**

Criar arquivo `/etc/nginx/sites-available/exam-system`:

```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.com;

    # Frontend
    location / {
        root /var/www/exam-frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ativar site:
```bash
ln -s /etc/nginx/sites-available/exam-system /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### **7. Opção B: Deploy com Docker**

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Atualizar
git pull
docker-compose up -d --build
```

#### **8. Configurar HTTPS (Importante!)**

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado SSL (gratuito)
certbot --nginx -d SEU_DOMINIO.com

# Certbot configura renovação automática
```

### **✅ Pronto! Sistema online com HTTPS!**

---

## 🔐 Configurações Importantes

### **1. Variáveis de Ambiente**

**Backend (.env):**
```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-frontend.com
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://seu-backend.com/api
```

### **2. Segurança**

#### **Backend:**
- Configurar rate limiting
- Validar todas as entradas
- Usar HTTPS sempre
- Não expor erros detalhados

#### **Servidor VPS:**
```bash
# Firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Atualizar regularmente
apt update && apt upgrade -y
```

---

## 📊 Comparação de Opções

| Aspecto | Render | Vercel+Railway | VPS |
|---------|--------|----------------|-----|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Custo (início)** | Grátis | Grátis | ~$6/mês |
| **Performance** | Boa | Excelente | Depende |
| **Controle** | Limitado | Limitado | Total |
| **Escalabilidade** | Automática | Automática | Manual |
| **HTTPS** | Automático | Automático | Manual |
| **Tempo Setup** | 15 min | 20 min | 1-2h |

---

## 🎯 Recomendação

**Para começar:**
→ Use **Render.com** (Opção 1)
- Mais fácil
- Deploy automático
- Gratuito para começar

**Para produção séria:**
→ Use **VPS com Docker** (Opção 3)
- Mais controle
- Melhor performance
- Mais barato no longo prazo

---

## ⚠️ Avisos Importantes

### **1. Dados em Memória**
O sistema atual **armazena tudo em RAM**. Isso significa:
- ❌ Reiniciar = perder dados
- ❌ Escalar = perder sincronização
- ❌ Não adequado para produção real

**Solução:** Implementar banco de dados:
- PostgreSQL (recomendado)
- MongoDB
- MySQL

### **2. Limitações do Plano Gratuito**

**Render Free:**
- Servidor "dorme" após 15min inativo
- Primeira requisição lenta (cold start)
- 750 horas/mês

**Vercel Free:**
- 100GB bandwidth/mês
- Builds ilimitados

**Railway Free:**
- $5 crédito/mês
- Depois disso paga por uso

### **3. Domínio Personalizado**

Para usar seu próprio domínio (ex: `minhaprova.com`):

1. Compre domínio (Registro.br, GoDaddy, Namecheap)
2. Configure DNS:
   - **Render/Vercel:** Siga instruções na plataforma
   - **VPS:** Apontar A record para IP do servidor

---

## 🔄 Atualizações Futuras

### **Deploy Automático (CI/CD)**

**GitHub Actions:**
Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/deploy/...
```

---

## 📞 Precisa de Ajuda?

1. **Render**: https://render.com/docs
2. **Vercel**: https://vercel.com/docs
3. **Railway**: https://docs.railway.app
4. **DigitalOcean**: https://docs.digitalocean.com

---

## ✅ Checklist Final

Antes de considerar "em produção":

- [ ] Sistema funciona localmente
- [ ] Testes passando
- [ ] HTTPS configurado
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente definidas
- [ ] Backup strategy (quando implementar BD)
- [ ] Monitoramento configurado
- [ ] Domínio personalizado (opcional)

---

**Sucesso com seu deploy! 🚀**

Se tiver dúvidas, consulte a documentação da plataforma escolhida ou abra uma issue no GitHub.
