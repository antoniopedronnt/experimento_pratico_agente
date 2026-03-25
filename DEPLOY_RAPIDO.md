# 🚀 Deploy Rápido - 3 Opções

## 🎯 Qual opção escolher?

### Para Testar Localmente:
```bash
deploy_local.bat
```
👉 **Acesse:** http://localhost:3000

---

### Para Colocar Online (Produção Real):

#### ⭐ **OPÇÃO FÁCIL: Render.com** (15 minutos)
1. Criar conta em https://render.com
2. Conectar GitHub
3. Deploy backend + frontend
4. **Pronto!** ✅

👉 **Leia:** [PRODUCAO.md](PRODUCAO.md) - Guia completo passo-a-passo

---

#### 🐳 **OPÇÃO INTERMEDIÁRIA: Docker Local**
```bash
deploy_docker.bat
```
👉 **Acesse:** http://localhost

---

#### 💻 **OPÇÃO AVANÇADA: Servidor VPS**
- DigitalOcean, AWS, Azure
- Controle total
- ~$6/mês

👉 **Leia:** [PRODUCAO.md](PRODUCAO.md) - Seção VPS

---

## 📚 Documentação Completa

- **[PRODUCAO.md](PRODUCAO.md)** ⭐ - **Deploy em produção (passo-a-passo)**
- **[DEPLOY.md](DEPLOY.md)** - Guia técnico detalhado
- **[README.md](README.md)** - Documentação do projeto
- **[SCRIPTS_TESTES.md](SCRIPTS_TESTES.md)** - Como rodar testes

---

## 🔍 Verificar se está funcionando

```bash
# Health check
curl http://localhost:3000/health

# Ou abra no navegador:
http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "message": "Question Manager API is running",
  "environment": "production"
}
```

---

## ⚠️ IMPORTANTE

### Dados em Memória:
- ❌ Todos os dados são armazenados em RAM
- ❌ Reiniciar = perder dados
- ✅ Para produção real: implementar banco de dados

### Plataformas Gratuitas (começar):
- ✅ **Render.com** - Grátis para começar (recomendado)
- ✅ **Vercel** - Grátis para frontend
- ✅ **Railway** - $5 crédito grátis/mês

---

## 🚀 Começar Agora

### 1️⃣ Testar Local:
```bash
deploy_local.bat
```

### 2️⃣ Colocar Online:
Leia **[PRODUCAO.md](PRODUCAO.md)** e escolha:
- Render.com (mais fácil)
- Vercel + Railway (mais rápido)
- VPS (mais controle)

---

**Dúvidas?** Consulte a documentação ou abra uma issue!
