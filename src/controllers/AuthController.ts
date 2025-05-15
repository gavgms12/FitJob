import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import UsuarioRepository from '../repositories/UsuarioRepository';
import { CustomRequest } from '../types/express';

class AuthController {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'fitjob-default-secret';
  private readonly JWT_EXPIRATION = '1d';

  async login(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const usuario = await UsuarioRepository.findByEmail(email);

      if (!usuario) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      const senhaCorreta = await compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      const token = sign(
        { 
          userId: usuario.id,
          email: usuario.email 
        },
        this.JWT_SECRET,
        {
          expiresIn: this.JWT_EXPIRATION,
        }
      );

      return res.json({
        user: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async verificarToken(req: CustomRequest, res: Response): Promise<Response> {
    try {
      // O middleware de autenticação já verificou o token
      // e adicionou o usuário ao request
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      const usuario = await UsuarioRepository.findById(userId);

      if (!usuario) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      return res.json({
        user: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new AuthController(); 