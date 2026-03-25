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
