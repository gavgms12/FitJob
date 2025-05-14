"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vaga = void 0;
class Vaga {
    constructor(id, titulo, descricao, empresa, modeloTrabalho, localizacao, salario, requisitosHardSkills, requisitosSoftSkills) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salario = salario;
        this.requisitosHardSkills = requisitosHardSkills;
        this.requisitosSoftSkills = requisitosSoftSkills;
    }
}
exports.Vaga = Vaga;
