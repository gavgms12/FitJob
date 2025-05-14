import { HardSkills } from "../enums/HardSkills";
import { SoftSkills } from "../enums/SoftSkills";

export class VagaDTO {
  constructor(
    public titulo: string,
    public descricao: string,
    public faixaSalarial: string,
    public modeloTrabalho: string,
    public localizacao: string,
    public requisitosHardSkills: HardSkills[],
    public requisitosSoftSkills: SoftSkills[]
  ) {}
} 