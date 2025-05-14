"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaServico = void 0;
var VagaDTO_1 = require("../dtos/VagaDTO");
var extrairDadosVaga_1 = require("../utils/extrairDadosVaga");
var Vaga_1 = require("../Vaga");
var HardSkills_1 = require("../enums/HardSkills");
var SoftSkills_1 = require("../enums/SoftSkills");
var VagaServico = /** @class */ (function () {
    function VagaServico(repositorio) {
        this.repositorio = repositorio;
    }
    VagaServico.prototype.buscarVagas = function (titulo) {
        var vagas = this.repositorio.buscarPorTitulo(titulo);
        return vagas.map(function (v) { return new VagaDTO_1.VagaDTO(v.titulo, v.descricao, "".concat(v.salario)); });
    };
    VagaServico.prototype.detalhesDaVaga = function (id) {
        var vaga = this.repositorio.buscarPorId(id);
        return new VagaDTO_1.VagaDTO(vaga.titulo, vaga.descricao, "".concat(vaga.salario));
    };
    VagaServico.prototype.criarVagaCompleta = function (vagaParcial) {
        var _a, _b, _c;
        var dadosExtraidos = (0, extrairDadosVaga_1.extrairInformacoesVaga)(vagaParcial.descricao);
        var novaVaga = new Vaga_1.Vaga(vagaParcial.id, vagaParcial.titulo, vagaParcial.descricao, vagaParcial.empresa, (_a = dadosExtraidos.modeloTrabalho) !== null && _a !== void 0 ? _a : '', (_b = dadosExtraidos.localizacao) !== null && _b !== void 0 ? _b : '', parseFloat(((_c = dadosExtraidos.salario) === null || _c === void 0 ? void 0 : _c.replace(/[^\d]/g, '')) || '0'), dadosExtraidos.requisitosHardSkills.map(function (skill) { return HardSkills_1.HardSkills[skill]; }), dadosExtraidos.requisitosSoftSkills.map(function (skill) { return SoftSkills_1.SoftSkills[skill]; }));
        this.repositorio.salvar(novaVaga);
    };
    return VagaServico;
}());
exports.VagaServico = VagaServico;
