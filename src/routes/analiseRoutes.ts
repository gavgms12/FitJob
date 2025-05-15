import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResultadoAnaliseDTO } from '../types';
import { analisarCompatibilidade } from '../models/services/AnaliseServico';
import { Curriculo } from '../models/Curriculo';
import { Vaga } from '../models/Vaga';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas as análises
router.get('/', async (_req: Request, res: Response) => {
  try {
    const analises = await prisma.resultadoAnalise.findMany({
      include: {
        curriculo: true,
        vaga: true,
        candidatura: true
      }
    });
    res.json(analises);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar análises' });
  }
});

// Buscar análise por ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const analise = await prisma.resultadoAnalise.findUnique({
      where: { id: req.params.id },
      include: {
        curriculo: true,
        vaga: true,
        candidatura: true
      }
    });
    if (!analise) {
      return res.status(404).json({ error: 'Análise não encontrada' });
    }
    res.json(analise);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar análise' });
  }
});

// Criar nova análise
router.post('/', async (req: Request<{}, {}, { curriculoId: string; vagaId: string }>, res: Response) => {
  try {
    const { curriculoId, vagaId } = req.body;

    // Buscar currículo e vaga
    const curriculoData = await prisma.curriculo.findUnique({
      where: { id: curriculoId }
    });
    const vagaData = await prisma.vaga.findUnique({
      where: { id: vagaId }
    });

    if (!curriculoData || !vagaData) {
      return res.status(404).json({ error: 'Currículo ou vaga não encontrados' });
    }

    // Converter dados do Prisma para instâncias das classes
    const curriculo = Curriculo.fromDatabase({
      ...curriculoData,
      habilidades: JSON.parse(curriculoData.habilidades),
      softSkills: JSON.parse(curriculoData.softSkills)
    });
    
    const vaga = new Vaga(
      vagaData.id,
      vagaData.titulo,
      vagaData.descricao,
      vagaData.empresa,
      vagaData.modeloTrabalho,
      vagaData.localizacao,
      vagaData.salario,
      JSON.parse(vagaData.requisitosHardSkills),
      JSON.parse(vagaData.requisitosSoftSkills)
    );

    // Realizar análise de compatibilidade
    const resultadoAnalise = await analisarCompatibilidade(curriculo, vaga);

    // Salvar resultado no banco
    const analise = await prisma.resultadoAnalise.create({
      data: {
        curriculoId,
        vagaId,
        porcentagemCompatibilidade: resultadoAnalise.porcentagemCompatibilidade,
        palavrasChaveFaltando: JSON.stringify(resultadoAnalise.palavrasChaveFaltando),
        sugestoesMelhoria: JSON.stringify(resultadoAnalise.sugestoesMelhoria),
        data: new Date()
      },
      include: {
        curriculo: true,
        vaga: true
      }
    });

    res.status(201).json(analise);
  } catch (error) {
    console.error('Erro ao criar análise:', error);
    res.status(500).json({ error: 'Erro ao criar análise' });
  }
});

// Deletar análise
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.resultadoAnalise.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar análise' });
  }
});

export default router; 