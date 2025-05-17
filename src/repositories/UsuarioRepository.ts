import { PrismaClient, Prisma } from '@prisma/client';
import argon2 from 'argon2';
import type { Usuario as UsuarioType } from '../types/usuario.js';

export interface CreateUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  caracteristicaVaga?: {
    modeloTrabalho: string;
    localizacao: string;
    salarioDesejadoMin: number;
    salarioDesejadoMax: number;
  };
}

export interface UpdateUsuarioDTO {
  nome?: string;
  email?: string;
  senha?: string;
  caracteristicaVaga?: {
    modeloTrabalho?: string;
    localizacao?: string;
    salarioDesejadoMin?: number;
    salarioDesejadoMax?: number;
  };
}

class UsuarioRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Criar usuário
  async create(data: CreateUsuarioDTO): Promise<UsuarioType> {
    const senhaHash = await argon2.hash(data.senha, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    });

    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
        caracteristicaVaga: data.caracteristicaVaga ? {
          create: data.caracteristicaVaga
        } : undefined
      },
      include: {
        caracteristicaVaga: true,
        curriculos: true
      }
    });
  }

  // Buscar usuário por ID
  async findById(id: string): Promise<UsuarioType | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        caracteristicaVaga: true,
        curriculos: true
      }
    });
  }

  // Buscar usuário por email
  async findByEmail(email: string): Promise<UsuarioType | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
      include: {
        caracteristicaVaga: true,
        curriculos: true
      }
    });
  }

  // Listar todos os usuários
  async findAll(): Promise<UsuarioType[]> {
    return this.prisma.usuario.findMany({
      include: {
        caracteristicaVaga: true,
        curriculos: true
      }
    });
  }

  // Atualizar usuário
  async update(id: string, data: UpdateUsuarioDTO): Promise<UsuarioType> {
    const updateData: any = { ...data };
    
    if (data.senha) {
      updateData.senha = await argon2.hash(data.senha, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
      });
    }

    if (data.caracteristicaVaga) {
      updateData.caracteristicaVaga = {
        upsert: {
          create: data.caracteristicaVaga,
          update: data.caracteristicaVaga
        }
      };
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateData,
      include: {
        caracteristicaVaga: true,
        curriculos: true
      }
    });
  }

  // Deletar usuário
  async delete(id: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id }
    });
  }

  // Função para verificar e corrigir o hash das senhas
  async corrigirHashSenhas(): Promise<void> {
    try {
      // Busca todos os usuários
      const usuarios = await this.prisma.usuario.findMany({
        select: {
          id: true,
          senha: true
        }
      });

      for (const usuario of usuarios) {
        // Verifica se o hash começa com $
        if (!usuario.senha.startsWith('$')) {
          // Se não estiver no formato correto, cria um novo hash
          const novoHash = await argon2.hash(usuario.senha, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
          });

          // Atualiza a senha do usuário
          await this.prisma.usuario.update({
            where: { id: usuario.id },
            data: { senha: novoHash }
          });

          console.log(`Hash da senha corrigido para o usuário ${usuario.id}`);
        }
      }

      console.log('Processo de correção de hashes concluído');
    } catch (error) {
      console.error('Erro ao corrigir hashes das senhas:', error);
      throw error;
    }
  }
}

export default new UsuarioRepository(); 