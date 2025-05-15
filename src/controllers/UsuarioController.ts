import { Request, Response } from 'express';
import UsuarioRepository, { CreateUsuarioDTO, UpdateUsuarioDTO } from '../repositories/UsuarioRepository';
import '../types/usuario';

class UsuarioController {
  async criar(req: Request, res: Response): Promise<Response> {
    try {
      const dados: CreateUsuarioDTO = req.body;

      if (!dados.nome || !dados.email || !dados.senha) {
        return res.status(400).json({ 
          error: 'Nome, email e senha são obrigatórios' 
        });
      }

      const usuarioExistente = await UsuarioRepository.findByEmail(dados.email);
      if (usuarioExistente) {
        return res.status(400).json({ 
          error: 'Já existe um usuário com este email' 
        });
      }

      const usuario = await UsuarioRepository.create(dados);

      return res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        caracteristicaVaga: usuario.caracteristicaVaga
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuario = await UsuarioRepository.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        caracteristicaVaga: usuario.caracteristicaVaga,
        curriculos: usuario.curriculos
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listar(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await UsuarioRepository.findAll();
      return res.json(usuarios.map(usuario => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        caracteristicaVaga: usuario.caracteristicaVaga,
        curriculos: usuario.curriculos
      })));
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atualizar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dados: UpdateUsuarioDTO = req.body;

      const usuarioExistente = await UsuarioRepository.findById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (dados.email && dados.email !== usuarioExistente.email) {
        const emailEmUso = await UsuarioRepository.findByEmail(dados.email);
        if (emailEmUso) {
          return res.status(400).json({ error: 'Este email já está em uso' });
        }
      }

      const usuario = await UsuarioRepository.update(id, dados);

      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        caracteristicaVaga: usuario.caracteristicaVaga
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deletar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const usuarioExistente = await UsuarioRepository.findById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await UsuarioRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new UsuarioController(); 