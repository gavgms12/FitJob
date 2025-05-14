"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curriculo = void 0;
class Curriculo {
    constructor(id, usuarioId, conteudo, habilidades, softSkills, criadoEm) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.conteudo = conteudo;
        this.habilidades = habilidades;
        this.softSkills = softSkills;
        this.criadoEm = criadoEm;
    }
    adicionarHabilidade(habilidade) {
        if (!this.habilidades.includes(habilidade)) {
            this.habilidades.push(habilidade);
            return true;
        }
        return false;
    }
    removerHabilidade(habilidade) {
        if (this.habilidades.includes(habilidade)) {
            this.habilidades = this.habilidades.filter(h => h !== habilidade);
            return true;
        }
        return false;
    }
    adicionarSoftSkill(softSkill) {
        if (!this.softSkills.includes(softSkill)) {
            this.softSkills.push(softSkill);
            return true;
        }
        return false;
    }
    removerSoftSkill(softSkill) {
        if (this.softSkills.includes(softSkill)) {
            this.softSkills = this.softSkills.filter(s => s !== softSkill);
            return true;
        }
        return false;
    }
    atualizarConteudo(novoConteudo) {
        this.conteudo = novoConteudo;
    }
    verificarHabilidade(habilidade) {
        return this.habilidades.includes(habilidade);
    }
    verificarSoftSkill(softSkill) {
        return this.softSkills.includes(softSkill);
    }
    static validarConteudo(conteudo) {
        const minimoCaracteres = 100;
        const possuiEstruturaBasica = conteudo.includes("Experiência") && conteudo.includes("Formação");
        return conteudo.length >= minimoCaracteres && possuiEstruturaBasica;
    }
    static fromDatabase(data) {
        return new Curriculo(data.id, data.usuarioId, data.conteudo, data.habilidades, data.softSkills.map((s) => s), data.criadoEm);
    }
}
exports.Curriculo = Curriculo;
