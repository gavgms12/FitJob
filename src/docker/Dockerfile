FROM node:18

WORKDIR /app

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências
RUN npm ci

# Copiar o schema do Prisma
COPY prisma ./prisma/

# Copiar o resto do código
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate

# Construir a aplicação
RUN npm run build

# Expor a porta
EXPOSE 3500

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx prisma generate && npm run dev"]