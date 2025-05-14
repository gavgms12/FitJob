"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaRepositorioImpl = void 0;
class VagaRepositorioImpl {
    constructor() {
        this.vagas = [];
    }
    buscarPorTitulo(titulo) {
        return this.vagas.filter(v => v.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    buscarPorId(id) {
        return this.vagas.find(v => v.id === id);
    }
    salvar(vaga) {
        this.vagas.push(vaga);
    }
}
exports.VagaRepositorioImpl = VagaRepositorioImpl;
