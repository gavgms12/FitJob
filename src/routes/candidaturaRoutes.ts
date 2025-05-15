import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { CandidaturaDTO } from '../types';

const router = Router();
const prisma = new PrismaClient();

// Listar todas as candidaturas
router.get('/', async (_req: Request, res: Response) => {
  try {
    const candidaturas = await prisma.candidatura.findMany({
      include: {
        usuario: true,
        curriculo: true,
        vaga: true,
        resultadoAnalise: true
      }
    });
    res.json(candidaturas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidaturas' });
  }
});

// Buscar candidatura por ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const candidatura = await prisma.candidatura.findUnique({
      where: { id: req.params.id },
      include: {
        usuario: true,
        curriculo: true,
        vaga: true,
        resultadoAnalise: true
      }
    });
    if (!candidatura) {
      return res.status(404).json({ error: 'Candidatura não encontrada' });
    }
    res.json(candidatura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidatura' });
  }
});

// Criar nova candidatura
router.post('/', async (req: Request<{}, {}, CandidaturaDTO>, res: Response) => {
  try {
    const { usuarioId, curriculoId, vagaId } = req.body;
    const candidatura = await prisma.candidatura.create({
      data: {
        usuarioId,
        curriculoId,
        vagaId,
        status: 'Em Análise',
        dataCandidatura: new Date()
      },
      include: {
        usuario: true,
        curriculo: true,
        vaga: true
      }
    });
    res.status(201).json(candidatura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar candidatura' });
  }
});

// Atualizar status da candidatura
router.put('/:id/status', async (req: Request<{ id: string }, {}, { status: string }>, res: Response) => {
  try {
    const { status } = req.body;
    const candidatura = await prisma.candidatura.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        usuario: true,
        curriculo: true,
        vaga: true,
        resultadoAnalise: true
      }
    });
    res.json(candidatura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da candidatura' });
  }
});

// Deletar candidatura
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.candidatura.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar candidatura' });
  }
});

export default router; 