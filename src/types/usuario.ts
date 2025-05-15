import { Prisma } from '@prisma/client';

export type Usuario = Prisma.UsuarioGetPayload<{
  include: {
    caracteristicaVaga: true;
    curriculos: true;
  };
}>; 