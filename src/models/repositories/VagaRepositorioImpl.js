"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaRepositorioImpl = void 0;
var VagaRepositorioImpl = /** @class */ (function () {
    function VagaRepositorioImpl() {
        this.vagas = [];
    }
    VagaRepositorioImpl.prototype.buscarPorTitulo = function (titulo) {
        return this.vagas.filter(function (v) { return v.titulo.toLowerCase().includes(titulo.toLowerCase()); });
    };
    VagaRepositorioImpl.prototype.buscarPorId = function (id) {
        return this.vagas.find(function (v) { return v.id === id; });
    };
    VagaRepositorioImpl.prototype.salvar = function (vaga) {
        this.vagas.push(vaga);
    };
    return VagaRepositorioImpl;
}());
exports.VagaRepositorioImpl = VagaRepositorioImpl;
