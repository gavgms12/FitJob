import { SoftSkills } from '../enums/SoftSkills';

export class CurriculoDTO {
  constructor(
    public conteudo: string,
    public habilidades: string[],
    public softSkills: SoftSkills[]
  ) {}
} 