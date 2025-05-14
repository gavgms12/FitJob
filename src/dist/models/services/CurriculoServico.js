"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculoServico = void 0;
const Curriculo_1 = require("../Curriculo");
const CurriculoDTO_1 = require("../dtos/CurriculoDTO");
class CurriculoServico {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    fazerUpload(curriculoDTO) {
        const novoCurriculo = new Curriculo_1.Curriculo('', '', curriculoDTO.conteudo, curriculoDTO.habilidades, curriculoDTO.softSkills, new Date());
        this.repositorio.salvar(novoCurriculo);
    }
    obterCurriculos(usuarioId) {
        const curriculos = this.repositorio.buscarPorCurriculo(usuarioId);
        return curriculos.map(c => new CurriculoDTO_1.CurriculoDTO(c.conteudo, c.habilidades, c.softSkills));
    }
}
exports.CurriculoServico = CurriculoServico;
