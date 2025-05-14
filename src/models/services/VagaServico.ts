import { IVagaRepositorio } from '../interfaces/IVagaRepositorio';
import { VagaDTO } from '../dtos/VagaDTO';

export class VagaServico {
  constructor(private repositorio: IVagaRepositorio) { }

  buscarVagas(titulo: string): VagaDTO[] {
    const vagas = this.repositorio.buscarPorTitulo(titulo);
    return vagas.map(v => new VagaDTO(v.titulo, v.descricao, `${v.salario}`, v.modeloTrabalho, v.localizacao, v.requisitosHardSkills, v.requisitosSoftSkills));
  }

  detalhesDaVaga(id: string): VagaDTO {
    const vaga = this.repositorio.buscarPorId(id);
    return new VagaDTO(vaga.titulo, vaga.descricao, `${vaga.salario}`, vaga.modeloTrabalho, vaga.localizacao, vaga.requisitosHardSkills, vaga.requisitosSoftSkills);
  }
} 