"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VagaRepositorioImpl_1 = require("./models/repositories/VagaRepositorioImpl");
const VagaServico_1 = require("./models/services/VagaServico");
const Vaga_1 = require("./models/Vaga");
const HardSkills_1 = require("./models/enums/HardSkills");
const SoftSkills_1 = require("./models/enums/SoftSkills");
const Curriculo_1 = require("./models/Curriculo");
const AnaliseServico_1 = require("./models/services/AnaliseServico");
// 1. Instanciar o repositório
const repositorio = new VagaRepositorioImpl_1.VagaRepositorioImpl();
// 2. Instanciar o serviço
const vagaServico = new VagaServico_1.VagaServico(repositorio);
// 3. Criar uma vaga completa
const vagaCompleta = new Vaga_1.Vaga('002', // id
'Desenvolvedor Full Stack Senior', // titulo
`Estamos procurando um Desenvolvedor Full Stack Senior para se juntar ao nosso time de tecnologia.
   O profissional será responsável por desenvolver e manter aplicações web complexas, utilizando
   tecnologias modernas e práticas ágeis de desenvolvimento.
   
   Requisitos:
   - Experiência sólida com TypeScript, React e Node.js
   - Conhecimento em PostgreSQL e AWS
   - Experiência com Docker e práticas DevOps
   - Capacidade de liderar equipes e projetos
   `, // descricao
'TechCorp Brasil', // empresa
'Híbrido', // modeloTrabalho
'São Paulo, SP', // localizacao
15000, // salario
[
    HardSkills_1.HardSkills.TYPESCRIPT,
    HardSkills_1.HardSkills.REACT,
    HardSkills_1.HardSkills.NODE_JS,
    HardSkills_1.HardSkills.POSTGRESQL,
    HardSkills_1.HardSkills.AWS,
    HardSkills_1.HardSkills.DOCKER
], [
    SoftSkills_1.SoftSkills.COMUNICACAO,
    SoftSkills_1.SoftSkills.TRABALHO_EQUIPE,
    SoftSkills_1.SoftSkills.LIDERANCA,
    SoftSkills_1.SoftSkills.RESOLUCAO_PROBLEMAS,
    SoftSkills_1.SoftSkills.PROATIVIDADE
]);
// 4. Salvar a vaga no repositório
repositorio.salvar(vagaCompleta);
// 5. Buscar e imprimir os detalhes da vaga
const vagaSalva = vagaServico.detalhesDaVaga('002');
console.log('\nDetalhes da Vaga:');
console.log('Título:', vagaSalva.titulo);
console.log('Modelo de Trabalho:', vagaSalva.modeloTrabalho);
console.log('Localização:', vagaSalva.localizacao);
console.log('Faixa Salarial: R$', vagaSalva.faixaSalarial);
console.log('\nRequisitos Hard Skills:');
vagaSalva.requisitosHardSkills.forEach(skill => console.log(`- ${skill}`));
console.log('\nRequisitos Soft Skills:');
vagaSalva.requisitosSoftSkills.forEach(skill => console.log(`- ${skill}`));
console.log('\n✅ Vaga inserida com sucesso!');
async function main() {
    // 2. Criar um currículo para teste
    const curriculo = new Curriculo_1.Curriculo('001', 'user123', `EXPERIÊNCIA PROFISSIONAL

    Senior Software Developer - TechStart | 2020-2023
    - Liderança técnica em projetos full-stack usando React e Node.js
    - Implementação de arquitetura em nuvem usando AWS
    - Mentoria de desenvolvedores júnior

    Full Stack Developer - CodeCorp | 2018-2020
    - Desenvolvimento de aplicações web com TypeScript
    - Trabalho com bancos de dados PostgreSQL
    
    FORMAÇÃO
    Bacharel em Ciência da Computação - Universidade Tech | 2018
    
    CERTIFICAÇÕES
    - AWS Certified Developer
    - Docker Certified Associate`, [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'Docker'
    ], [
        SoftSkills_1.SoftSkills.COMUNICACAO,
        SoftSkills_1.SoftSkills.TRABALHO_EQUIPE,
        SoftSkills_1.SoftSkills.LIDERANCA,
        SoftSkills_1.SoftSkills.RESOLUCAO_PROBLEMAS
    ], new Date());
    try {
        // 3. Realizar a análise de compatibilidade
        console.log('\nIniciando análise de compatibilidade...');
        const resultado = await (0, AnaliseServico_1.analisarCompatibilidade)(curriculo, vagaCompleta);
        // 4. Exibir resultados
        console.log('\n=== Resultado da Análise ===');
        console.log(resultado.gerarRelatorio());
        // 5. Exibir status e prioridade
        console.log('\n=== Resumo ===');
        console.log('Status:', resultado.obterStatus());
        console.log('É alta prioridade?', resultado.isAltaPrioridade() ? 'Sim' : 'Não');
        console.log('Resumo:', resultado.obterResumo());
    }
    catch (erro) {
        console.error('\nErro ao realizar análise:', erro);
    }
}
// Executar o programa
main().catch(console.error);
