import { Response } from 'express';
import { CustomRequest } from '../types/express';
import CurriculoRepository, { CreateCurriculoDTO, UpdateCurriculoDTO } from '../repositories/CurriculoRepository';
import UsuarioRepository from '../repositories/UsuarioRepository';
import { HardSkills } from '../models/enums/HardSkills';
import { SoftSkills } from '../models/enums/SoftSkills';

class CurriculoController {
  async criar(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const dados: CreateCurriculoDTO = req.body;
      const usuarioId = req.user?.id; // Obtém o ID do usuário autenticado

      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      // Verifica se o usuário existe
      const usuario = await UsuarioRepository.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Valida o conteúdo do currículo
      if (!dados.conteudo || dados.conteudo.length < 100) {
        return res.status(400).json({ 
          error: 'O conteúdo do currículo deve ter pelo menos 100 caracteres' 
        });
      }

      const curriculo = await CurriculoRepository.create({
        ...dados,
        usuarioId
      });

      return res.status(201).json(curriculo);
    } catch (error) {
      console.error('Erro ao criar currículo:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const curriculo = await CurriculoRepository.findById(id);

      if (!curriculo) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }

      // Verifica se o usuário tem permissão para ver este currículo
      if (curriculo.usuarioId !== req.user?.id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      return res.json(curriculo);
    } catch (error) {
      console.error('Erro ao buscar currículo:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listarPorUsuario(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const curriculos = await CurriculoRepository.findByUsuario(usuarioId);
      return res.json(curriculos);
    } catch (error) {
      console.error('Erro ao listar currículos:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atualizar(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dados: UpdateCurriculoDTO = req.body;
      const usuarioId = req.user?.id;

      const curriculo = await CurriculoRepository.findById(id);

      if (!curriculo) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }

      // Verifica se o usuário tem permissão para atualizar este currículo
      if (curriculo.usuarioId !== usuarioId) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const curriculoAtualizado = await CurriculoRepository.update(id, dados);
      return res.json(curriculoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deletar(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuarioId = req.user?.id;

      const curriculo = await CurriculoRepository.findById(id);

      if (!curriculo) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }

      // Verifica se o usuário tem permissão para deletar este currículo
      if (curriculo.usuarioId !== usuarioId) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      await CurriculoRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar currículo:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Métodos adicionais

  async buscarPorHabilidade(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { habilidade } = req.params;
      
      if (!Object.values(HardSkills).includes(habilidade as HardSkills)) {
        return res.status(400).json({ error: 'Habilidade inválida' });
      }

      const curriculos = await CurriculoRepository.findByHabilidade(habilidade as HardSkills);
      return res.json(curriculos);
    } catch (error) {
      console.error('Erro ao buscar currículos por habilidade:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorSoftSkill(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { softSkill } = req.params;
      
      if (!Object.values(SoftSkills).includes(softSkill as SoftSkills)) {
        return res.status(400).json({ error: 'Soft skill inválida' });
      }

      const curriculos = await CurriculoRepository.findBySoftSkill(softSkill as SoftSkills);
      return res.json(curriculos);
    } catch (error) {
      console.error('Erro ao buscar currículos por soft skill:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new CurriculoController(); 