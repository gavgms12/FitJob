import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as authRepository from '../repositories/AuthRepository';
import { CustomRequest } from '../types/express';

const prisma = new PrismaClient();

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    return;
  }

  const usuario = await authRepository.findUserByEmail(email);

  if (!usuario) {
    res.status(401).json({ message: 'Usuário não encontrado.' });
    return;
  }

  try {
    const senhaValida = await argon2.verify(usuario.senha, senha);
    
    if (!senhaValida) {
      res.status(401).json({ message: 'Senha inválida.' });
      return;
    }

    const token = jwt.sign(
      {
        userId: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      },
      process.env.JWT_SECRET || 'fitjob-default-secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const verificarToken = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'Token inválido.' });
      return;
    }

    const usuario = await authRepository.findUserById(userId);

    if (!usuario) {
      res.status(401).json({ message: 'Usuário não encontrado.' });
      return;
    }

    res.json({
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 