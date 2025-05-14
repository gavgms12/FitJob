"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidatura = void 0;
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
