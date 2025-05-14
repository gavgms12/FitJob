"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analisarCompatibilidade = analisarCompatibilidade;
const ResultadoAnalise_1 = require("../ResultadoAnalise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
async function analisarCompatibilidade(curriculo, vaga) {
    const prompt = `
Atue como um especialista em recrutamento e seleção. Compare o currículo do candidato com a vaga e forneça uma análise detalhada.

CURRÍCULO DO CANDIDATO:
${curriculo.conteudo}

Habilidades Técnicas do Candidato: ${curriculo.habilidades.join(', ')}
Soft Skills do Candidato: ${curriculo.softSkills.join(', ')}

DESCRIÇÃO DA VAGA:
${vaga.descricao}

Requisitos Técnicos da Vaga: ${vaga.requisitosHardSkills.join(', ')}
Soft Skills Requeridas: ${vaga.requisitosSoftSkills.join(', ')}

Por favor, forneça uma análise no seguinte formato:

PORCENTAGEM DE COMPATIBILIDADE: [número entre 0 e 100]%

COMPETÊNCIAS FALTANTES:
- [listar cada competência que falta no currículo]

SUGESTÕES DE MELHORIA:
- [listar sugestões específicas para aumentar a compatibilidade]

Seja específico e detalhado em sua análise.`;
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const textoResposta = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        // Melhorar o parsing da resposta
        const porcentagemMatch = textoResposta.match(/PORCENTAGEM DE COMPATIBILIDADE:\s*(\d+)%/i);
        const porcentagem = porcentagemMatch ? parseInt(porcentagemMatch[1]) : 0;
        // Extrair competências faltantes
        const competenciasFaltantes = textoResposta
            .split('COMPETÊNCIAS FALTANTES:')[1]
            ?.split('SUGESTÕES')[0]
            ?.split('\n')
            .filter((linha) => linha.trim().startsWith('-'))
            .map((linha) => linha.replace('-', '').trim())
            .filter(Boolean) || [];
        // Extrair sugestões
        const sugestoes = textoResposta
            .split('SUGESTÕES DE MELHORIA:')[1]
            ?.split('\n')
            .filter((linha) => linha.trim().startsWith('-'))
            .map((linha) => linha.replace('-', '').trim())
            .filter(Boolean) || [];
        return new ResultadoAnalise_1.ResultadoAnalise(crypto.randomUUID(), curriculo.id, vaga.id, porcentagem, competenciasFaltantes, sugestoes, new Date());
    }
    catch (erro) {
        console.error('Erro ao analisar compatibilidade:', erro);
        throw erro;
    }
}
