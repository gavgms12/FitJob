import { Curriculo } from '../Curriculo';
import { Vaga } from '../Vaga';
import { ResultadoAnalise } from '../ResultadoAnalise';

export class ServicoAnalise {
  analisar(curriculo: Curriculo, vaga: Vaga): ResultadoAnalise {
    return new ResultadoAnalise(
      '',
      curriculo.id,
      vaga.id,
      85,
      ['Java', 'Docker'],
      ['Adicionar mais detalhes nas experiências'],
      new Date()
    );
  }

  extrairPalavrasComuns(titulo: string): string[] {
    return titulo.split(' ');
  }

  gerarFeedbackSoftSkills(curriculo: Curriculo): string[] {
    return ['Desenvolver comunicação', 'Trabalhar em equipe'];
  }
} 