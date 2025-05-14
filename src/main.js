"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VagaRepositorioImpl_1 = require("./models/repositories/VagaRepositorioImpl");
var VagaServico_1 = require("./models/services/VagaServico");
// 1. Instanciar o repositório (em memória ou banco real)
var repositorio = new VagaRepositorioImpl_1.VagaRepositorioImpl();
// 2. Instanciar o serviço passando o repositório
var vagaServico = new VagaServico_1.VagaServico(repositorio);
// 3. Criar dados da vaga com poucos campos
var vagaParcial = {
    id: '001',
    titulo: 'Desenvolvedor Backend Node.js',
    descricao: "\n    Procuramos desenvolvedor backend com experi\u00EAncia em Node.js, Docker e bancos de dados SQL.\n    Vaga remota, sal\u00E1rio de R$ 8.000,00. Valorizamos boa comunica\u00E7\u00E3o, trabalho em equipe e proatividade.\n  ",
    empresa: 'TechCorp',
};
// 4. Inserir vaga usando o método que faz a extração
vagaServico.criarVagaCompleta(vagaParcial);
console.log('✅ Vaga inserida com sucesso!');
