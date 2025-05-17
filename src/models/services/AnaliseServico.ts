import { Curriculo } from '../Curriculo';
import { Vaga } from '../Vaga';
import { ResultadoAnalise } from '../ResultadoAnalise';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function analisarCompatibilidade(curriculo: Curriculo, vaga: Vaga): Promise<ResultadoAnalise> {
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
        contents: [{
          parts: [{ text: prompt }]
        }]
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
      .filter((linha: string) => linha.trim().startsWith('-'))
      .map((linha: string) => linha.replace('-', '').trim())
      .filter(Boolean) || [];

    // Extrair sugestões
    const sugestoes = textoResposta
      .split('SUGESTÕES DE MELHORIA:')[1]
      ?.split('\n')
      .filter((linha: string) => linha.trim().startsWith('-'))
      .map((linha: string) => linha.replace('-', '').trim())
      .filter(Boolean) || [];

    return new ResultadoAnalise(
      crypto.randomUUID(),
      curriculo.id,
      vaga.id,
      porcentagem,
      competenciasFaltantes,
      sugestoes,
      new Date()
    );

  } catch (erro) {
    console.error('Erro ao analisar compatibilidade:', erro);
    throw erro;
  }
}
