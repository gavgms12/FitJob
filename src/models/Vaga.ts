import { SoftSkills } from "./enums/SoftSkills";
import { HardSkills } from "./enums/HardSkills";

export class Vaga {
  constructor(
    public id: string,
    public titulo: string,
    public descricao: string,
    public empresa: string,
    public modeloTrabalho: string,
    public localizacao: string,
    public salario: number,
    public requisitosHardSkills: HardSkills[],
    public requisitosSoftSkills: SoftSkills[],
  ) {}
} 