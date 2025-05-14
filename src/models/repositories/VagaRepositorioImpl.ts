import { Vaga } from '../Vaga';
import { IVagaRepositorio } from '../interfaces/IVagaRepositorio';

export class VagaRepositorioImpl implements IVagaRepositorio {
  private vagas: Vaga[] = [];

  buscarPorTitulo(titulo: string): Vaga[] {
    return this.vagas.filter(v => v.titulo.toLowerCase().includes(titulo.toLowerCase()));
  }

  buscarPorId(id: string): Vaga {
    return this.vagas.find(v => v.id === id)!;
  }

  salvar(vaga: Vaga): void {
    this.vagas.push(vaga);
  }
} 