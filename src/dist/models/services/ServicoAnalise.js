"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoAnalise = void 0;
const ResultadoAnalise_1 = require("../ResultadoAnalise");
class ServicoAnalise {
    analisar(curriculo, vaga) {
        return new ResultadoAnalise_1.ResultadoAnalise('', curriculo.id, vaga.id, 85, ['Java', 'Docker'], ['Adicionar mais detalhes nas experiências'], new Date());
    }
    extrairPalavrasComuns(titulo) {
        return titulo.split(' ');
    }
    gerarFeedbackSoftSkills(curriculo) {
        return ['Desenvolver comunicação', 'Trabalhar em equipe'];
    }
}
exports.ServicoAnalise = ServicoAnalise;
