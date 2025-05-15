import { PrismaClient, Curriculo } from '@prisma/client';
import { HardSkills } from '../models/enums/HardSkills';
import { SoftSkills } from '../models/enums/SoftSkills';

export interface CreateCurriculoDTO {
  usuarioId: string;
  conteudo: string;
  habilidades: HardSkills[];
  softSkills: SoftSkills[];
}

export interface UpdateCurriculoDTO {
  conteudo?: string;
  habilidades?: HardSkills[];
  softSkills?: SoftSkills[];
}

class CurriculoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Criar currículo
  async create(data: CreateCurriculoDTO): Promise<Curriculo> {
    return this.prisma.curriculo.create({
      data: {
        usuarioId: data.usuarioId,
        conteudo: data.conteudo,
        habilidades: JSON.stringify(data.habilidades),
        softSkills: JSON.stringify(data.softSkills)
      },
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
  }

  // Buscar currículo por ID
  async findById(id: string): Promise<Curriculo | null> {
    return this.prisma.curriculo.findUnique({
      where: { id },
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
  }

  // Listar currículos por usuário
  async findByUsuario(usuarioId: string): Promise<Curriculo[]> {
    return this.prisma.curriculo.findMany({
      where: { usuarioId },
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
  }

  // Listar todos os currículos
  async findAll(): Promise<Curriculo[]> {
    return this.prisma.curriculo.findMany({
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
  }

  // Atualizar currículo
  async update(id: string, data: UpdateCurriculoDTO): Promise<Curriculo> {
    const updateData: any = {};

    if (data.conteudo) {
      updateData.conteudo = data.conteudo;
    }

    if (data.habilidades) {
      updateData.habilidades = JSON.stringify(data.habilidades);
    }

    if (data.softSkills) {
      updateData.softSkills = JSON.stringify(data.softSkills);
    }

    return this.prisma.curriculo.update({
      where: { id },
      data: updateData,
      include: {
        usuario: true,
        candidaturas: true,
        resultadosAnalise: true
      }
    });
  }

  // Deletar currículo
  async delete(id: string): Promise<void> {
    await this.prisma.curriculo.delete({
      where: { id }
    });
  }

  // Métodos adicionais específicos

  // Buscar currículos por habilidade
  async findByHabilidade(habilidade: HardSkills): Promise<Curriculo[]> {
    const curriculos = await this.prisma.curriculo.findMany();
    return curriculos.filter(curriculo => {
      const habilidades = JSON.parse(curriculo.habilidades as string) as HardSkills[];
      return habilidades.includes(habilidade);
    });
  }

  // Buscar currículos por soft skill
  async findBySoftSkill(softSkill: SoftSkills): Promise<Curriculo[]> {
    const curriculos = await this.prisma.curriculo.findMany();
    return curriculos.filter(curriculo => {
      const softSkills = JSON.parse(curriculo.softSkills as string) as SoftSkills[];
      return softSkills.includes(softSkill);
    });
  }
}

export default new CurriculoRepository(); 