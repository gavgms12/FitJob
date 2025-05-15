import { Usuario as PrismaUsuario, CaracteristicaVaga } from '@prisma/client';

declare global {
  type Usuario = PrismaUsuario & {
    caracteristicaVaga?: CaracteristicaVaga | null;
    curriculos?: any[];
  }
} 