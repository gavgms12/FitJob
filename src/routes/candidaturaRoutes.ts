import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { CandidaturaDTO } from '../types';

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidatura:
 *       type: object
 *       required:
 *         - usuarioId
 *         - curriculoId
 *         - vagaId
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da candidatura
 *         usuarioId:
 *           type: string
 *           description: ID do usuário candidato
 *         curriculoId:
 *           type: string
 *           description: ID do currículo enviado
 *         vagaId:
 *           type: string
 *           description: ID da vaga
 *         status:
 *           type: string
 *           enum: [Em Análise, Aprovado, Reprovado]
 *           description: Status atual da candidatura
 *         dataCandidatura:
 *           type: string
 *           format: date-time
 *           description: Data e hora da candidatura
 */

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/candidaturas:
 *   get:
 *     summary: Lista todas as candidaturas
 *     tags: [Candidaturas]
 *     responses:
 *       200:
 *         description: Lista de candidaturas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidatura'
 *       500:
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /api/candidaturas/{id}:
 *   get:
 *     summary: Busca uma candidatura pelo ID
 *     tags: [Candidaturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da candidatura
 *     responses:
 *       200:
 *         description: Candidatura encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidatura'
 *       404:
 *         description: Candidatura não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /api/candidaturas:
 *   post:
 *     summary: Cria uma nova candidatura
 *     tags: [Candidaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - curriculoId
 *               - vagaId
 *             properties:
 *               usuarioId:
 *                 type: string
 *               curriculoId:
 *                 type: string
 *               vagaId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidatura'
 *       500:
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /api/candidaturas/{id}/status:
 *   put:
 *     summary: Atualiza o status de uma candidatura
 *     tags: [Candidaturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da candidatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Em Análise, Aprovado, Reprovado]
 *     responses:
 *       200:
 *         description: Status da candidatura atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidatura'
 *       500:
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /api/candidaturas/{id}:
 *   delete:
 *     summary: Remove uma candidatura
 *     tags: [Candidaturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da candidatura
 *     responses:
 *       204:
 *         description: Candidatura removida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
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