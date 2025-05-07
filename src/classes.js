"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoAnalise = exports.CurriculoServico = exports.VagaServico = exports.CurriculoRepositorioImpl = exports.VagaRepositorioImpl = exports.CurriculoDTO = exports.VagaDTO = exports.Candidatura = exports.ResultadoAnalise = exports.Vaga = exports.Curriculo = exports.CaracteristicaVaga = exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(id, nome, email, senha, criadoEm) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.criadoEm = criadoEm;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
var CaracteristicaVaga = /** @class */ (function () {
    function CaracteristicaVaga(usuarioID, modeloTrabalho, localizacao, salarioDesejadoMin, salarioDesejadoMax) {
        this.usuarioID = usuarioID;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salarioDesejadoMin = salarioDesejadoMin;
        this.salarioDesejadoMax = salarioDesejadoMax;
    }
    return CaracteristicaVaga;
}());
exports.CaracteristicaVaga = CaracteristicaVaga;
var Curriculo = /** @class */ (function () {
    function Curriculo(id, usuarioId, conteudo, habilidades, softSkills, criadoEm) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.conteudo = conteudo;
        this.habilidades = habilidades;
        this.softSkills = softSkills;
        this.criadoEm = criadoEm;
    }
    return Curriculo;
}());
exports.Curriculo = Curriculo;
var Vaga = /** @class */ (function () {
    function Vaga(id, titulo, descricao, empresa, modeloTrabalho, localizacao, salario, requisitosHardSkills) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salario = salario;
        this.requisitosHardSkills = requisitosHardSkills;
    }
    return Vaga;
}());
exports.Vaga = Vaga;
var ResultadoAnalise = /** @class */ (function () {
    function ResultadoAnalise(id, curriculoId, vagaId, porcentagemCompatibilidade, palavrasChaveFaltando, sugestoesMelhoria, data) {
        this.id = id;
        this.curriculoId = curriculoId;
        this.vagaId = vagaId;
        this.porcentagemCompatibilidade = porcentagemCompatibilidade;
        this.palavrasChaveFaltando = palavrasChaveFaltando;
        this.sugestoesMelhoria = sugestoesMelhoria;
        this.data = data;
    }
    return ResultadoAnalise;
}());
exports.ResultadoAnalise = ResultadoAnalise;
var Candidatura = /** @class */ (function () {
    function Candidatura(id, usuarioId, curriculoId, vagaId, dataCandidatura, status, resultadoAnalise) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.curriculoId = curriculoId;
        this.vagaId = vagaId;
        this.dataCandidatura = dataCandidatura;
        this.status = status;
        this.resultadoAnalise = resultadoAnalise;
    }
    return Candidatura;
}());
exports.Candidatura = Candidatura;
// ===================== DTOs =====================
var VagaDTO = /** @class */ (function () {
    function VagaDTO(titulo, descricao, faixaSalarial) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.faixaSalarial = faixaSalarial;
    }
    return VagaDTO;
}());
exports.VagaDTO = VagaDTO;
var CurriculoDTO = /** @class */ (function () {
    function CurriculoDTO(conteudo, habilidades, softSkills) {
        this.conteudo = conteudo;
        this.habilidades = habilidades;
        this.softSkills = softSkills;
    }
    return CurriculoDTO;
}());
exports.CurriculoDTO = CurriculoDTO;
// ===================== REPOSITÓRIOS =====================
var VagaRepositorioImpl = /** @class */ (function () {
    function VagaRepositorioImpl() {
    }
    VagaRepositorioImpl.prototype.buscarPorTitulo = function (titulo) {
        // lógica para buscar por título
        return [];
    };
    VagaRepositorioImpl.prototype.buscarPorId = function (id) {
        // lógica para buscar por ID
        return new Vaga('', '', '', '', '', '', 0, []);
    };
    VagaRepositorioImpl.prototype.salvar = function (vaga) {
        // lógica para salvar a vaga
    };
    return VagaRepositorioImpl;
}());
exports.VagaRepositorioImpl = VagaRepositorioImpl;
var CurriculoRepositorioImpl = /** @class */ (function () {
    function CurriculoRepositorioImpl() {
    }
    CurriculoRepositorioImpl.prototype.buscarPorCurriculo = function (usuarioId) {
        return [];
    };
    CurriculoRepositorioImpl.prototype.salvar = function (curriculo) {
        // lógica para salvar
    };
    return CurriculoRepositorioImpl;
}());
exports.CurriculoRepositorioImpl = CurriculoRepositorioImpl;
// ===================== SERVIÇOS =====================
var VagaServico = /** @class */ (function () {
    function VagaServico(repositorio) {
        this.repositorio = repositorio;
    }
    VagaServico.prototype.buscarVagas = function (titulo) {
        var vagas = this.repositorio.buscarPorTitulo(titulo);
        return vagas.map(function (v) { return new VagaDTO(v.titulo, v.descricao, "".concat(v.salario)); });
    };
    VagaServico.prototype.detalhesDaVaga = function (id) {
        var vaga = this.repositorio.buscarPorId(id);
        return new VagaDTO(vaga.titulo, vaga.descricao, "".concat(vaga.salario));
    };
    return VagaServico;
}());
exports.VagaServico = VagaServico;
var CurriculoServico = /** @class */ (function () {
    function CurriculoServico(repositorio) {
        this.repositorio = repositorio;
    }
    CurriculoServico.prototype.fazerUpload = function (curriculoDTO) {
        var novoCurriculo = new Curriculo('', '', curriculoDTO.conteudo, curriculoDTO.habilidades, curriculoDTO.softSkills, new Date());
        this.repositorio.salvar(novoCurriculo);
    };
    CurriculoServico.prototype.obterCurriculos = function (usuarioId) {
        var curriculos = this.repositorio.buscarPorCurriculo(usuarioId);
        return curriculos.map(function (c) { return new CurriculoDTO(c.conteudo, c.habilidades, c.softSkills); });
    };
    return CurriculoServico;
}());
exports.CurriculoServico = CurriculoServico;
var ServicoAnalise = /** @class */ (function () {
    function ServicoAnalise() {
    }
    ServicoAnalise.prototype.analisar = function (curriculo, vaga) {
        return new ResultadoAnalise('', curriculo.id, vaga.id, 85, ['Java', 'Docker'], ['Adicionar mais detalhes nas experiências'], new Date());
    };
    ServicoAnalise.prototype.extrairPalavrasComuns = function (titulo) {
        return titulo.split(' ');
    };
    ServicoAnalise.prototype.gerarFeedbackSoftSkills = function (curriculo) {
        return ['Desenvolver comunicação', 'Trabalhar em equipe'];
    };
    return ServicoAnalise;
}());
exports.ServicoAnalise = ServicoAnalise;
