import { SoftSkills } from './enums/SoftSkills';

export class Curriculo {
  constructor(
    public id: string,
    public usuarioId: string,
    public conteudo: string,
    public habilidades: string[],
    public softSkills: SoftSkills[],
    public criadoEm: Date
  ) { }

  adicionarHabilidade(habilidade: string): boolean {
    if (!this.habilidades.includes(habilidade)) {
      this.habilidades.push(habilidade);
      return true;
    }
    return false;
  }

  removerHabilidade(habilidade: string): boolean {
    if (this.habilidades.includes(habilidade)) {
      this.habilidades = this.habilidades.filter(h => h !== habilidade);
      return true;
    }
    return false;
  }

  adicionarSoftSkill(softSkill: SoftSkills): boolean {
    if (!this.softSkills.includes(softSkill)) {
      this.softSkills.push(softSkill);
      return true;
    }
    return false;
  }

  removerSoftSkill(softSkill: SoftSkills): boolean {
    if (this.softSkills.includes(softSkill)) {
      this.softSkills = this.softSkills.filter(s => s !== softSkill);
      return true;
    }
    return false;
  }

  atualizarConteudo(novoConteudo: string): void {
    this.conteudo = novoConteudo;
  }

  verificarHabilidade(habilidade: string): boolean {
    return this.habilidades.includes(habilidade);
  }

  verificarSoftSkill(softSkill: SoftSkills): boolean {
    return this.softSkills.includes(softSkill);
  }

  static validarConteudo(conteudo: string): boolean {
    const minimoCaracteres = 100;
    const possuiEstruturaBasica = conteudo.includes("Experiência") && conteudo.includes("Formação");
    return conteudo.length >= minimoCaracteres && possuiEstruturaBasica;
  }

  static fromDatabase(data: any): Curriculo {
    return new Curriculo(
      data.id,
      data.usuarioId,
      data.conteudo,
      data.habilidades,
      data.softSkills.map((s: string) => s as SoftSkills),
      data.criadoEm
    );
  }
}

