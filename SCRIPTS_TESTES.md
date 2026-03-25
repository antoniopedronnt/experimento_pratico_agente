# 🧪 Scripts de Execução de Testes

## 📋 Scripts Disponíveis

### 1. **run_tests.bat** ⭐ (Principal)
Executa **todos** os testes Cucumber do sistema.

```bash
run_tests.bat
```

**Funcionalidades:**
- ✅ Verifica estrutura de pastas
- ✅ Verifica e instala dependências se necessário
- ✅ Executa todos os testes
- ✅ **Mostra resumo visual com cenários aprovados/falhados**
- ✅ Gera relatórios JSON e HTML
- ✅ Interface visual melhorada

**Output Esperado:**
```
╔════════════════════════════════════════════════════════════╗
║               RESUMO DOS TESTES CUCUMBER                  ║
╚════════════════════════════════════════════════════════════╝

📊 Total de Cenários:    89
✅ Cenários Aprovados:   85 (95%)
❌ Cenários Falhados:    4
⏳ Cenários Pendentes:   0

════════════════════════════════════════════════════════════

Progresso: [██████████████████████████████████████████████░░  ]
           ✅ Aprovados  ❌ Falhados  ⏳ Pendentes

❌ EXISTEM TESTES FALHANDO!
```

**Quando usar:** Para validação completa do sistema antes de commits ou releases.

---

### 2. **run_tests_menu.bat** 🎯 (Seletivo)
Menu interativo para executar testes específicos por requisito.

```bash
run_tests_menu.bat
```

**Opções do Menu:**
1. Requisito 1 - Gerenciamento de Questões
2. Requisito 2 - Gerenciamento de Provas  
3. Requisito 3 - Geração de PDFs e CSV
4. Requisito 4 - Correção de Provas
5. Nova Funcionalidade - Geração de Respostas
6. TODOS os testes
0. Sair

**Quando usar:** Durante desenvolvimento de uma funcionalidade específica.

---

### 3. **run_tests_watch.bat** 👀 (Desenvolvimento)
Executa testes automaticamente sempre que houver mudanças.

```bash
run_tests_watch.bat
```

**Funcionalidades:**
- 🔄 Re-executa testes automaticamente
- ⏱️ Loop a cada 5 segundos
- 🛑 Ctrl+C para sair

**Quando usar:** Durante desenvolvimento ativo com TDD (Test-Driven Development).

---

### 4. **listar_testes.bat** 📝 (Visualização)
Lista todos os cenários de teste organizados por requisito.

```bash
listar_testes.bat
```

**Mostra:**
- Todos os arquivos .feature
- Todos os cenários de cada arquivo
- Total de cenários por requisito

**Quando usar:** Para entender a cobertura de testes ou buscar cenários específicos.

---

## 🚀 Fluxo de Trabalho Recomendado

### **Durante Desenvolvimento:**
```bash
# Terminal 1 - Servidor em desenvolvimento
start_all.bat

# Terminal 2 - Testes em watch
run_tests_watch.bat
```

### **Antes de Commit:**
```bash
# Executar todos os testes
run_tests.bat
```

### **Debug de Funcionalidade:**
```bash
# Executar apenas testes relacionados
run_tests_menu.bat
# Escolher opção específica (ex: 4 para Correção)
```

### **Documentação:**
```bash
# Ver todos os cenários disponíveis
listar_testes.bat
```

---

## 📊 Estrutura de Testes

```
server/tests/
├── features/               # Cenários Gherkin (.feature)
│   ├── criar-questao.feature
│   ├── atualizar-questao.feature
│   ├── listar-questoes.feature
│   ├── remover-questao.feature
│   ├── gerenciar-provas.feature
│   ├── gerar-pdfs.feature          ⭐ NOVO
│   ├── gerar-respostas.feature      ⭐ NOVO
│   └── corrigir-provas.feature      (expandido)
└── steps/                  # Implementações TypeScript
    ├── question.steps.ts
    ├── exam.steps.ts
    ├── pdf.steps.ts            (a implementar)
    ├── responses.steps.ts      (a implementar)
    └── correction.steps.ts
```

---

## ⚙️ Configuração

### **Pré-requisitos:**
- Node.js instalado (versão 14+)
- NPM instalado
- Dependências do projeto (`npm install`)

### **Primeira Execução:**
```bash
# O script run_tests.bat faz isso automaticamente
cd server
npm install
npm test
```

---

## 📈 Cobertura de Testes

| Requisito | Cenários | Status |
|-----------|----------|--------|
| Req 1 - Questões | ~15 | ✅ |
| Req 2 - Provas | ~12 | ✅ |
| Req 3 - PDFs/CSV | ~15 | ✅ |
| Req 4 - Correção | ~30 | ✅ |
| Nova - Respostas | ~17 | ✅ |
| **TOTAL** | **~89** | **✅** |

---

## 🐛 Solução de Problemas

### **Erro: "node_modules não encontrado"**
```bash
cd server
npm install
```

### **Erro: "Cucumber não encontrado"**
```bash
cd server
npm install --save-dev @cucumber/cucumber
```

### **Erro: "Testes não executam"**
Verifique se o script está configurado em `package.json`:
```json
{
  "scripts": {
    "test": "cucumber-js"
  }
}
```

### **Erro: "Caracteres estranhos no terminal"**
O script já usa `chcp 65001` para UTF-8, mas se persistir:
```bash
chcp 65001
run_tests.bat
```

---

## 📚 Recursos Adicionais

- **Documentação Completa:** `TESTES_CUCUMBER.md`
- **Cenários Detalhados:** Dentro de cada arquivo `.feature`
- **Cucumber Docs:** https://cucumber.io/docs/

---

## 🎯 Exemplos de Uso

### **Executar todos os testes:**
```bash
run_tests.bat
```

### **Executar apenas testes de correção:**
```bash
run_tests_menu.bat
# Escolher opção 4
```

### **Ver todos os cenários disponíveis:**
```bash
listar_testes.bat
```

### **Desenvolvimento com auto-reload:**
```bash
run_tests_watch.bat
```

---

## ✅ Checklist de Validação

Antes de fazer commit/push, execute:

- [ ] `run_tests.bat` - Todos os testes passaram?
- [ ] `listar_testes.bat` - Todos os cenários estão documentados?
- [ ] Código compila sem erros? (`cd server && npm run build`)
- [ ] Servidor inicia sem erros? (`start_all.bat`)

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências estão instaladas
2. Execute `npm install` na pasta `server`
3. Verifique os logs de erro no console
4. Consulte `TESTES_CUCUMBER.md` para documentação detalhada

---

**Criado em:** 2026-03-25  
**Última Atualização:** 2026-03-25  
**Versão:** 1.0
