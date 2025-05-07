"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoAnalise = exports.CurriculoServico = exports.VagaServico = exports.CurriculoRepositorioImpl = exports.VagaRepositorioImpl = exports.CurriculoDTO = exports.VagaDTO = exports.Candidatura = exports.ResultadoAnalise = exports.Vaga = exports.Curriculo = exports.CaracteristicaVaga = exports.Usuario = void 0;
class Usuario {
    constructor(id, nome, email, senha, criadoEm) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.criadoEm = criadoEm;
    }
}
exports.Usuario = Usuario;
class CaracteristicaVaga {
    constructor(usuarioID, modeloTrabalho, localizacao, salarioDesejadoMin, salarioDesejadoMax) {
        this.usuarioID = usuarioID;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salarioDesejadoMin = salarioDesejadoMin;
        this.salarioDesejadoMax = salarioDesejadoMax;
    }
}
exports.CaracteristicaVaga = CaracteristicaVaga;
class Curriculo {
    constructor(id, usuarioId, conteudo, habilidades, softSkills, criadoEm) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.conteudo = conteudo;
        this.habilidades = habilidades;
        this.softSkills = softSkills;
        this.criadoEm = criadoEm;
    }
}
exports.Curriculo = Curriculo;
class Vaga {
    constructor(id, titulo, descricao, empresa, modeloTrabalho, localizacao, salario, requisitosHardSkills) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salario = salario;
        this.requisitosHardSkills = requisitosHardSkills;
    }
}
exports.Vaga = Vaga;
class ResultadoAnalise {
    constructor(id, curriculoId, vagaId, porcentagemCompatibilidade, palavrasChaveFaltando, sugestoesMelhoria, data) {
        this.id = id;
        this.curriculoId = curriculoId;
        this.vagaId = vagaId;
        this.porcentagemCompatibilidade = porcentagemCompatibilidade;
        this.palavrasChaveFaltando = palavrasChaveFaltando;
        this.sugestoesMelhoria = sugestoesMelhoria;
        this.data = data;
    }
}
exports.ResultadoAnalise = ResultadoAnalise;
class Candidatura {
    constructor(id, usuarioId, curriculoId, vagaId, dataCandidatura, status, resultadoAnalise) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.curriculoId = curriculoId;
        this.vagaId = vagaId;
        this.dataCandidatura = dataCandidatura;
        this.status = status;
        this.resultadoAnalise = resultadoAnalise;
    }
}
exports.Candidatura = Candidatura;
// ===================== DTOs =====================
class VagaDTO {
    constructor(titulo, descricao, faixaSalarial) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.faixaSalarial = faixaSalarial;
    }
}
exports.VagaDTO = VagaDTO;
class CurriculoDTO {
    constructor(conteudo, habilidades, softSkills) {
        this.conteudo = conteudo;
        this.habilidades = habilidades;
        this.softSkills = softSkills;
    }
}
exports.CurriculoDTO = CurriculoDTO;
// ===================== REPOSITÓRIOS =====================
class VagaRepositorioImpl {
    buscarPorTitulo(titulo) {
        // lógica para buscar por título
        return [];
    }
    buscarPorId(id) {
        // lógica para buscar por ID
        return new Vaga('', '', '', '', '', '', 0, []);
    }
    salvar(vaga) {
        // lógica para salvar a vaga
    }
}
exports.VagaRepositorioImpl = VagaRepositorioImpl;
class CurriculoRepositorioImpl {
    buscarPorCurriculo(usuarioId) {
        return [];
    }
    salvar(curriculo) {
        // lógica para salvar
    }
}
exports.CurriculoRepositorioImpl = CurriculoRepositorioImpl;
// ===================== SERVIÇOS =====================
class VagaServico {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    buscarVagas(titulo) {
        const vagas = this.repositorio.buscarPorTitulo(titulo);
        return vagas.map(v => new VagaDTO(v.titulo, v.descricao, `${v.salario}`));
    }
    detalhesDaVaga(id) {
        const vaga = this.repositorio.buscarPorId(id);
        return new VagaDTO(vaga.titulo, vaga.descricao, `${vaga.salario}`);
    }
}
exports.VagaServico = VagaServico;
class CurriculoServico {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    fazerUpload(curriculoDTO) {
        const novoCurriculo = new Curriculo('', '', curriculoDTO.conteudo, curriculoDTO.habilidades, curriculoDTO.softSkills, new Date());
        this.repositorio.salvar(novoCurriculo);
    }
    obterCurriculos(usuarioId) {
        const curriculos = this.repositorio.buscarPorCurriculo(usuarioId);
        return curriculos.map(c => new CurriculoDTO(c.conteudo, c.habilidades, c.softSkills));
    }
}
exports.CurriculoServico = CurriculoServico;
class ServicoAnalise {
    analisar(curriculo, vaga) {
        return new ResultadoAnalise('', curriculo.id, vaga.id, 85, ['Java', 'Docker'], ['Adicionar mais detalhes nas experiências'], new Date());
    }
    extrairPalavrasComuns(titulo) {
        return titulo.split(' ');
    }
    gerarFeedbackSoftSkills(curriculo) {
        return ['Desenvolver comunicação', 'Trabalhar em equipe'];
    }
}
exports.ServicoAnalise = ServicoAnalise;
