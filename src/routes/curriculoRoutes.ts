import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CurriculoDTO } from '../types';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os currículos
router.get('/', async (_req: Request, res: Response) => {
  try {
    const curriculos = await prisma.curriculo.findMany({
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
    res.json(curriculos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar currículos' });
  }
});

// Buscar currículo por ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const curriculo = await prisma.curriculo.findUnique({
      where: { id: req.params.id },
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
    if (!curriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar currículo' });
  }
});

// Criar novo currículo
router.post('/', async (req: Request<{}, {}, CurriculoDTO>, res: Response) => {
  try {
    const { usuarioId, conteudo, habilidades, softSkills } = req.body;
    const curriculo = await prisma.curriculo.create({
      data: {
        usuarioId,
        conteudo,
        habilidades: JSON.stringify(habilidades),
        softSkills: JSON.stringify(softSkills)
      },
      include: {
        usuario: true
      }
    });
    res.status(201).json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar currículo' });
  }
});

// Atualizar currículo
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<CurriculoDTO>>, res: Response) => {
  try {
    const { conteudo, habilidades, softSkills } = req.body;
    const curriculo = await prisma.curriculo.update({
      where: { id: req.params.id },
      data: {
        conteudo,
        habilidades: habilidades ? JSON.stringify(habilidades) : undefined,
        softSkills: softSkills ? JSON.stringify(softSkills) : undefined
      },
      include: {
        usuario: true
      }
    });
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar currículo' });
  }
});

// Deletar currículo
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.curriculo.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar currículo' });
  }
});

export { router }; 