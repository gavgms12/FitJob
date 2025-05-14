import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas as vagas
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

// Buscar vaga por ID
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

// Criar nova vaga
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

// Atualizar vaga
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

// Deletar vaga
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

export { router }; 