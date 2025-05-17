import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../types/express';

const prisma = new PrismaClient();

class CaracteristicaVagaController {
  /**
   * Cria ou atualiza as características da vaga para o usuário autenticado
   */
  async criar(req: AuthenticatedRequest, res: Response) {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { modeloTrabalho, localizacao, salarioDesejadoMin, salarioDesejadoMax } = req.body;

      // Validar modelo de trabalho
      if (!['remoto', 'presencial', 'hibrido'].includes(modeloTrabalho)) {
        return res.status(400).json({ error: 'Modelo de trabalho inválido' });
      }

      // Validar salários
      if (salarioDesejadoMin && salarioDesejadoMax && salarioDesejadoMin > salarioDesejadoMax) {
        return res.status(400).json({ error: 'Salário mínimo não pode ser maior que o máximo' });
      }

      // Criar ou atualizar características
      const caracteristicas = await prisma.caracteristicaVaga.upsert({
        where: {
          usuarioId
        },
        update: {
          modeloTrabalho,
          localizacao,
          salarioDesejadoMin: salarioDesejadoMin || null,
          salarioDesejadoMax: salarioDesejadoMax || null
        },
        create: {
          usuarioId,
          modeloTrabalho,
          localizacao,
          salarioDesejadoMin: salarioDesejadoMin || 0,
          salarioDesejadoMax: salarioDesejadoMax || 0
        }
      });

      res.status(201).json(caracteristicas);
    } catch (error) {
      console.error('Erro ao criar características da vaga:', error);
      res.status(500).json({ error: 'Erro ao criar características da vaga' });
    }
  }

  /**
   * Busca as características da vaga do usuário autenticado
   */
  async buscarDoUsuario(req: AuthenticatedRequest, res: Response) {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const caracteristicas = await prisma.caracteristicaVaga.findUnique({
        where: {
          usuarioId
        }
      });

      if (!caracteristicas) {
        return res.status(404).json({ error: 'Características da vaga não encontradas' });
      }

      res.json(caracteristicas);
    } catch (error) {
      console.error('Erro ao buscar características da vaga:', error);
      res.status(500).json({ error: 'Erro ao buscar características da vaga' });
    }
  }

  /**
   * Atualiza as características da vaga do usuário autenticado
   */
  async atualizar(req: AuthenticatedRequest, res: Response) {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { modeloTrabalho, localizacao, salarioDesejadoMin, salarioDesejadoMax } = req.body;

      // Verificar se as características existem
      const caracteristicasExistentes = await prisma.caracteristicaVaga.findUnique({
        where: {
          usuarioId
        }
      });

      if (!caracteristicasExistentes) {
        return res.status(404).json({ error: 'Características da vaga não encontradas' });
      }

      // Validar modelo de trabalho
      if (modeloTrabalho && !['remoto', 'presencial', 'hibrido'].includes(modeloTrabalho)) {
        return res.status(400).json({ error: 'Modelo de trabalho inválido' });
      }

      // Validar salários
      if (salarioDesejadoMin && salarioDesejadoMax && salarioDesejadoMin > salarioDesejadoMax) {
        return res.status(400).json({ error: 'Salário mínimo não pode ser maior que o máximo' });
      }

      // Atualizar características
      const caracteristicasAtualizadas = await prisma.caracteristicaVaga.update({
        where: {
          usuarioId
        },
        data: {
          ...(modeloTrabalho && { modeloTrabalho }),
          ...(localizacao && { localizacao }),
          ...(salarioDesejadoMin !== undefined && { salarioDesejadoMin }),
          ...(salarioDesejadoMax !== undefined && { salarioDesejadoMax })
        }
      });

      res.json(caracteristicasAtualizadas);
    } catch (error) {
      console.error('Erro ao atualizar características da vaga:', error);
      res.status(500).json({ error: 'Erro ao atualizar características da vaga' });
    }
  }

  /**
   * Remove as características da vaga do usuário autenticado
   */
  async deletar(req: AuthenticatedRequest, res: Response) {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      // Verificar se as características existem
      const caracteristicas = await prisma.caracteristicaVaga.findUnique({
        where: {
          usuarioId
        }
      });

      if (!caracteristicas) {
        return res.status(404).json({ error: 'Características da vaga não encontradas' });
      }

      // Deletar características
      await prisma.caracteristicaVaga.delete({
        where: {
          usuarioId
        }
      });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar características da vaga:', error);
      res.status(500).json({ error: 'Erro ao deletar características da vaga' });
    }
  }
}

export default new CaracteristicaVagaController(); 