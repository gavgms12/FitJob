import express from 'express';
import type { Request as ExpressRequest, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import usuarioRoutes from './routes/usuarioRoutes';
import curriculoRoutes from './routes/curriculoRoutes';
import vagaRoutes from './routes/vagaRoutes';
import candidaturaRoutes from './routes/candidaturaRoutes';
import analiseRoutes from './routes/analiseRoutes';
import authRoutes from './routes/authRoutes';
// Configuração das variáveis de ambiente
dotenv.config();

// Inicialização do Express e Prisma
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Log de requisições
app.use((req: ExpressRequest, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/curriculos', curriculoRoutes);
app.use('/api/vagas', vagaRoutes);
app.use('/api/candidaturas', candidaturaRoutes);
app.use('/api/analises', analiseRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req: ExpressRequest, res: Response) => {
  res.json({ message: 'Bem-vindo à API do FitJob!' });
});

// Middleware de tratamento de erros
app.use((err: Error, req: ExpressRequest, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Middleware para rotas não encontradas
app.use((req: ExpressRequest, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
}); 