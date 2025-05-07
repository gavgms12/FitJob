FROM node:18-alpine AS builder

# Defining the working directory inside the container
WORKDIR /app

# Copying package.json and tsconfig.json files
COPY package*.json tsconfig*.json ./

# Installing dependencies
RUN npm ci

# Copying the source code
COPY . .

# Build the application
RUN npm run build

# 2) Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set the environment variable to production
ENV NODE_ENV=production

# Copying only the necessary files for production
COPY package*.json ./
RUN npm ci --only=production

# Copying the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copying the public directory
EXPOSE 3000
CMD ["node", "dist/main.ts"]