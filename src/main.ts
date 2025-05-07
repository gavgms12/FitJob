import { VagaRepositorioImpl, VagaServico } from './classes'; // ajuste os caminhos conforme necessário

const vagaRepo = new VagaRepositorioImpl();
const vagaServico = new VagaServico(vagaRepo);
const vagas = vagaServico.buscarVagas('Desenvolvedor');
console.log(vagas);