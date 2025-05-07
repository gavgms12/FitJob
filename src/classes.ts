 export class Usuario {
    constructor(
      public id: string,
      public nome: string,
      public email: string,
      public senha: string,
      public criadoEm: Date
    ) {}
  }
  
  export class CaracteristicaVaga {
    constructor(
      public usuarioID: string,
      public modeloTrabalho: string,
      public localizacao: string,
      public salarioDesejadoMin: number,
      public salarioDesejadoMax: number
    ) {}
  }
  
  export class Curriculo {
    constructor(
      public id: string,
      public usuarioId: string,
      public conteudo: string,
      public habilidades: string[],
      public softSkills: string[],
      public criadoEm: Date
    ) {}
  }
  
  export class Vaga {
    constructor(
      public id: string,
      public titulo: string,
      public descricao: string,
      public empresa: string,
      public modeloTrabalho: string,
      public localizacao: string,
      public salario: number,
      public requisitosHardSkills: string[]
    ) {}
  }
  
  export class ResultadoAnalise {
    constructor(
      public id: string,
      public curriculoId: string,
      public vagaId: string,
      public porcentagemCompatibilidade: number,
      public palavrasChaveFaltando: string[],
      public sugestoesMelhoria: string[],
      public data: Date
    ) {}
  }
  
  export class Candidatura {
    constructor(
      public id: string,
      public usuarioId: string,
      public curriculoId: string,
      public vagaId: string,
      public dataCandidatura: Date,
      public status: string,
      public resultadoAnalise?: ResultadoAnalise
    ) {}
  }
  
  // ===================== DTOs =====================
  export class VagaDTO {
    constructor(
      public titulo: string,
      public descricao: string,
      public faixaSalarial: string
    ) {}
  }
  
  export class CurriculoDTO {
    constructor(
      public conteudo: string,
      public habilidades: string[],
      public softSkills: string[]
    ) {}
  }
  
  // ===================== INTERFACES =====================
  export interface IVagaRepositorio {
    buscarPorTitulo(titulo: string): Vaga[];
    buscarPorId(id: string): Vaga;
    salvar(vaga: Vaga): void;
  }
  
  // ===================== REPOSITÓRIOS =====================
   export class VagaRepositorioImpl implements IVagaRepositorio {
    buscarPorTitulo(titulo: string): Vaga[] {
      // lógica para buscar por título
      return [];
    }
  
    buscarPorId(id: string): Vaga {
      // lógica para buscar por ID
      return new Vaga('', '', '', '', '', '', 0, []);
    }
  
    salvar(vaga: Vaga): void {
      // lógica para salvar a vaga
    }
  }
  
  export class CurriculoRepositorioImpl {
    buscarPorCurriculo(usuarioId: string): Curriculo[] {
      return [];
    }
  
    salvar(curriculo: Curriculo): void {
      // lógica para salvar
    }
  }
  
  // ===================== SERVIÇOS =====================
  export class VagaServico {
    constructor(private repositorio: IVagaRepositorio) {}
  
    buscarVagas(titulo: string): VagaDTO[] {
      const vagas = this.repositorio.buscarPorTitulo(titulo);
      return vagas.map(v => new VagaDTO(v.titulo, v.descricao, `${v.salario}`));
    }
  
    detalhesDaVaga(id: string): VagaDTO {
      const vaga = this.repositorio.buscarPorId(id);
      return new VagaDTO(vaga.titulo, vaga.descricao, `${vaga.salario}`);
    }
  }
  
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
  