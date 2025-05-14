"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Curriculo_1 = require("./models/Curriculo");
const Vaga_1 = require("./models/Vaga");
const HardSkills_1 = require("./models/enums/HardSkills");
const SoftSkills_1 = require("./models/enums/SoftSkills");
const AnaliseServico_1 = require("./models/services/AnaliseServico");
async function testarAnalise() {
    // Criar currículo de teste
    const curriculo = new Curriculo_1.Curriculo('001', 'user123', `EXPERIÊNCIA PROFISSIONAL

    Desenvolvedor Full Stack Senior - TechCorp | 2020-2023
    - Desenvolvimento de aplicações web usando React, TypeScript e Node.js
    - Implementação de microsserviços e APIs RESTful
    - Utilização de Docker e AWS para deploy
    - Liderança de equipe de 5 desenvolvedores
    - Implementação de CI/CD com GitHub Actions

    Desenvolvedor Full Stack - DevInc | 2018-2020
    - Desenvolvimento full stack com Node.js e React
    - Trabalho com PostgreSQL e MongoDB
    - Implementação de testes automatizados
    
    FORMAÇÃO
    Bacharel em Ciência da Computação - UNIFEI | 2018
    
    CERTIFICAÇÕES
    - AWS Certified Developer Associate
    - Docker Certified Associate
    - Scrum Master Certified`, [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'Docker',
        'GitHub Actions',
        'MongoDB'
    ], [
        SoftSkills_1.SoftSkills.COMUNICACAO,
        SoftSkills_1.SoftSkills.TRABALHO_EQUIPE,
        SoftSkills_1.SoftSkills.LIDERANCA,
        SoftSkills_1.SoftSkills.RESOLUCAO_PROBLEMAS,
        SoftSkills_1.SoftSkills.PROATIVIDADE
    ], new Date());
    // Criar vaga de teste
    const vaga = new Vaga_1.Vaga('002', 'Desenvolvedor Full Stack Senior', `Procuramos um Desenvolvedor Full Stack Senior apaixonado por tecnologia e inovação.

    Responsabilidades:
    - Desenvolver e manter aplicações web complexas
    - Liderar time de desenvolvimento
    - Implementar boas práticas de desenvolvimento
    - Participar de decisões arquiteturais

    Requisitos:
    - Sólida experiência com TypeScript, React e Node.js
    - Conhecimento em PostgreSQL e AWS
    - Experiência com Docker e práticas DevOps
    - Experiência com liderança de equipe
    - Boa comunicação e trabalho em equipe

    Desejável:
    - Conhecimento em MongoDB
    - Experiência com CI/CD
    - Certificações AWS/Docker`, 'TechCorp Brasil', 'Híbrido', 'São Paulo, SP', 15000, [
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
    try {
        console.log('Iniciando análise de compatibilidade...\n');
        // Realizar análise
        const resultado = await (0, AnaliseServico_1.analisarCompatibilidade)(curriculo, vaga);
        // Exibir resultado detalhado
        console.log('=== Detalhes da Análise ===');
        console.log('ID da Análise:', resultado.id);
        console.log('Data:', resultado.data.toLocaleDateString());
        console.log('Compatibilidade:', resultado.porcentagemCompatibilidade + '%');
        console.log('\nPalavras-chave Faltantes:');
        if (resultado.palavrasChaveFaltando.length > 0) {
            resultado.palavrasChaveFaltando.forEach(palavra => console.log(`- ${palavra}`));
        }
        else {
            console.log('Nenhuma palavra-chave faltante');
        }
        console.log('\nSugestões de Melhoria:');
        if (resultado.sugestoesMelhoria.length > 0) {
            resultado.sugestoesMelhoria.forEach(sugestao => console.log(`- ${sugestao}`));
        }
        else {
            console.log('Nenhuma sugestão de melhoria');
        }
        // Exibir relatório formatado
        console.log('\n=== Relatório Formatado ===');
        console.log(resultado.gerarRelatorio());
    }
    catch (erro) {
        console.error('Erro durante a análise:', erro);
    }
}
// Executar o teste
testarAnalise().catch(console.error);
