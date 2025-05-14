"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaServico = void 0;
const VagaDTO_1 = require("../dtos/VagaDTO");
class VagaServico {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    buscarVagas(titulo) {
        const vagas = this.repositorio.buscarPorTitulo(titulo);
        return vagas.map(v => new VagaDTO_1.VagaDTO(v.titulo, v.descricao, `${v.salario}`, v.modeloTrabalho, v.localizacao, v.requisitosHardSkills, v.requisitosSoftSkills));
    }
    detalhesDaVaga(id) {
        const vaga = this.repositorio.buscarPorId(id);
        return new VagaDTO_1.VagaDTO(vaga.titulo, vaga.descricao, `${vaga.salario}`, vaga.modeloTrabalho, vaga.localizacao, vaga.requisitosHardSkills, vaga.requisitosSoftSkills);
    }
}
exports.VagaServico = VagaServico;
