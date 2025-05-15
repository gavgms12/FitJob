import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
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
    const senhaHash = await hash(data.senha, 8);

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
      updateData.senha = await hash(data.senha, 8);
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
}

export default new UsuarioRepository(); 