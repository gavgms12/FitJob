import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UsuarioDTO } from '../types';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os usuários
router.get('/', async (_req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        caracteristicaVaga: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.params.id },
      include: {
        caracteristicaVaga: true,
        curriculos: true,
        candidaturas: true
      }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Criar novo usuário
router.post('/', async (req: Request<{}, {}, UsuarioDTO>, res: Response) => {
  try {
    const { nome, email, senha, caracteristicaVaga } = req.body;
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha, // Em produção, usar hash
        caracteristicaVaga: caracteristicaVaga ? {
          create: caracteristicaVaga
        } : undefined
      },
      include: {
        caracteristicaVaga: true
      }
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<UsuarioDTO>>, res: Response) => {
  try {
    const { nome, email, senha, caracteristicaVaga } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id: req.params.id },
      data: {
        nome,
        email,
        senha,
        caracteristicaVaga: caracteristicaVaga ? {
          upsert: {
            create: caracteristicaVaga,
            update: caracteristicaVaga
          }
        } : undefined
      },
      include: {
        caracteristicaVaga: true
      }
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.usuario.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export { router }; 