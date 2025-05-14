import { Curriculo } from '../Curriculo';
import { CurriculoDTO } from '../dtos/CurriculoDTO';
import { CurriculoRepositorioImpl } from '../repositories/CurriculoRepositorioImpl';

export class CurriculoServico {
  constructor(private repositorio: CurriculoRepositorioImpl) {}

  fazerUpload(curriculoDTO: CurriculoDTO): void {
    const novoCurriculo = new Curriculo(
      '',
      '',
      curriculoDTO.conteudo,
      curriculoDTO.habilidades,
      curriculoDTO.softSkills,
      new Date()
    );
    this.repositorio.salvar(novoCurriculo);
  }

  obterCurriculos(usuarioId: string): CurriculoDTO[] {
    const curriculos = this.repositorio.buscarPorCurriculo(usuarioId);
    return curriculos.map(c => new CurriculoDTO(c.conteudo, c.habilidades, c.softSkills));
  }
} 