import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return prisma.usuario.findUnique({ 
    where: { email },
    select: {
      id: true,
      email: true,
      nome: true,
      senha: true
    }
  });
};

export const findUserById = async (id: string) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nome: true
    }
  });
}; 