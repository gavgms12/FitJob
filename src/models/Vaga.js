"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vaga = void 0;
var Vaga = /** @class */ (function () {
    function Vaga(id, titulo, descricao, empresa, modeloTrabalho, localizacao, salario, requisitosHardSkills, requisitosSoftSkills) {
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
    return Vaga;
}());
exports.Vaga = Vaga;
