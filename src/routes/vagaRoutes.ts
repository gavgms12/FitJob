import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/vagas:
 *   get:
 *     summary: Listar todas as vagas
 *     description: Retorna uma lista de todas as vagas cadastradas no sistema
 *     tags:
 *       - Vagas
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaga'
 *       500:
 *         description: Erro ao buscar vagas
 */
router.get('/', async (req, res) => {
  try {
    const vagas = await prisma.vaga.findMany({
      include: {
        candidaturas: true,
        resultadosAnalise: true
      }
    });
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

/**
 * @swagger
 * /api/vagas/{id}:
 *   get:
 *     summary: Buscar vaga por ID
 *     description: Retorna os dados de uma vaga específica
 *     tags:
 *       - Vagas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro ao buscar vaga
 */
router.get('/:id', async (req, res) => {
  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id: req.params.id },
      include: {
        candidaturas: true,
        resultadosAnalise: true
      }
    });
    if (!vaga) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
});

/**
 * @swagger
 * /api/vagas:
 *   post:
 *     summary: Criar nova vaga
 *     description: Cria uma nova vaga no sistema
 *     tags:
 *       - Vagas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título da vaga
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada da vaga
 *               empresa:
 *                 type: string
 *                 description: Nome da empresa
 *               modeloTrabalho:
 *                 type: string
 *                 enum: [remoto, presencial, hibrido]
 *                 description: Modelo de trabalho da vaga
 *               localizacao:
 *                 type: string
 *                 description: Localização da vaga
 *               salario:
 *                 type: number
 *                 description: Salário oferecido
 *               requisitosHardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de habilidades técnicas requeridas
 *               requisitosSoftSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de soft skills requeridas
 *             required:
 *               - titulo
 *               - descricao
 *               - empresa
 *               - modeloTrabalho
 *               - localizacao
 *               - salario
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       500:
 *         description: Erro ao criar vaga
 */
router.post('/', async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      empresa,
      modeloTrabalho,
      localizacao,
      salario,
      requisitosHardSkills,
      requisitosSoftSkills
    } = req.body;

    const vaga = await prisma.vaga.create({
      data: {
        titulo,
        descricao,
        empresa,
        modeloTrabalho,
        localizacao,
        salario,
        requisitosHardSkills: JSON.stringify(requisitosHardSkills),
        requisitosSoftSkills: JSON.stringify(requisitosSoftSkills)
      }
    });
    res.status(201).json(vaga);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

/**
 * @swagger
 * /api/vagas/{id}:
 *   put:
 *     summary: Atualizar vaga
 *     description: Atualiza os dados de uma vaga específica
 *     tags:
 *       - Vagas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título da vaga
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada da vaga
 *               empresa:
 *                 type: string
 *                 description: Nome da empresa
 *               modeloTrabalho:
 *                 type: string
 *                 enum: [remoto, presencial, hibrido]
 *                 description: Modelo de trabalho da vaga
 *               localizacao:
 *                 type: string
 *                 description: Localização da vaga
 *               salario:
 *                 type: number
 *                 description: Salário oferecido
 *               requisitosHardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de habilidades técnicas requeridas
 *               requisitosSoftSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de soft skills requeridas
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro ao atualizar vaga
 */
router.put('/:id', async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      empresa,
      modeloTrabalho,
      localizacao,
      salario,
      requisitosHardSkills,
      requisitosSoftSkills
    } = req.body;

    const vaga = await prisma.vaga.update({
      where: { id: req.params.id },
      data: {
        titulo,
        descricao,
        empresa,
        modeloTrabalho,
        localizacao,
        salario,
        requisitosHardSkills: JSON.stringify(requisitosHardSkills),
        requisitosSoftSkills: JSON.stringify(requisitosSoftSkills)
      }
    });
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
});

/**
 * @swagger
 * /api/vagas/{id}:
 *   delete:
 *     summary: Deletar vaga
 *     description: Remove uma vaga do sistema
 *     tags:
 *       - Vagas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     responses:
 *       204:
 *         description: Vaga deletada com sucesso
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro ao deletar vaga
 */
router.delete('/:id', async (req, res) => {
  try {
    await prisma.vaga.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar vaga' });
  }
});

export default router; 