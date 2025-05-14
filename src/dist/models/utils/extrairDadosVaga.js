"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extrairInformacoesVaga = extrairInformacoesVaga;
function extrairInformacoesVaga(descricao) {
    const salarioRegex = /R\$ ?[\d.]+/gi;
    const trabalhoRegex = /(remoto|híbrido|presencial)/gi;
    const localizacaoRegex = /(São Paulo|Rio de Janeiro|[A-Z][a-z]+(?: [A-Z][a-z]+)*?)/gi;
    const salario = descricao.match(salarioRegex)?.[0] ?? null;
    const modeloTrabalho = descricao.match(trabalhoRegex)?.[0] ?? null;
    const localizacao = descricao.match(localizacaoRegex)?.[0] ?? null;
    const hardSkillsBase = ['JavaScript', 'TypeScript', 'Node.js', 'React', 'Docker'];
    const softSkillsBase = ['comunicação', 'trabalho em equipe', 'proatividade'];
    const requisitosHardSkills = hardSkillsBase.filter(skill => descricao.toLowerCase().includes(skill.toLowerCase()));
    const requisitosSoftSkills = softSkillsBase.filter(skill => descricao.toLowerCase().includes(skill.toLowerCase()));
    return {
        salario,
        modeloTrabalho,
        localizacao,
        requisitosHardSkills,
        requisitosSoftSkills,
    };
}
