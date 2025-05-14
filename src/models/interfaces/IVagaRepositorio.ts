import { Vaga } from '../Vaga';

export interface IVagaRepositorio {
  buscarPorTitulo(titulo: string): Vaga[];
  buscarPorId(id: string): Vaga;
  salvar(vaga: Vaga): void;
} 