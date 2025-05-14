"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, nome, email, senha, criadoEm) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.criadoEm = criadoEm;
    }
    temCurriculo(curriculos) {
        return curriculos.some(curriculo => curriculo.usuarioId === this.id);
    }
    temCaracteristicasVaga(caracteristicas) {
        return caracteristicas.some(caracteristica => caracteristica.usuarioId === this.id);
    }
    static validarNome(nome) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
        return regex.test(nome);
    }
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static validarSenha(senha) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    }
    alterarSenha(novaSenha) {
        this.senha = novaSenha;
    }
    obterDataCriacao() {
        return new Date();
    }
    inicializarDataCriacao() {
        this.criadoEm = this.obterDataCriacao();
    }
    atualizarInformacoes(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    static fromDatabase(data) {
        return new Usuario(data.id, data.nome, data.email, data.senha, data.criadoEm);
    }
}
exports.Usuario = Usuario;
