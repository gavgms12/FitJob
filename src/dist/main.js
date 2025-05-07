"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes"); // ajuste os caminhos conforme necessário
const vagaRepo = new classes_1.VagaRepositorioImpl();
const vagaServico = new classes_1.VagaServico(vagaRepo);
const vagas = vagaServico.buscarVagas('Desenvolvedor');
console.log(vagas);
