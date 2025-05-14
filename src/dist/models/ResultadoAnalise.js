"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoAnalise = void 0;
class ResultadoAnalise {
    constructor(id, curriculoId, vagaId, porcentagemCompatibilidade, palavrasChaveFaltando, sugestoesMelhoria, data) {
        this.id = id;
        this.curriculoId = curriculoId;
        this.vagaId = vagaId;
        this.porcentagemCompatibilidade = porcentagemCompatibilidade;
        this.palavrasChaveFaltando = palavrasChaveFaltando;
        this.sugestoesMelhoria = sugestoesMelhoria;
        this.data = data;
    }
    // Retorna um relatório formatado da análise
    gerarRelatorio() {
        let relatorio = `Análise de Compatibilidade - ${this.data.toLocaleDateString()}\n\n`;
        // Seção de compatibilidade geral
        relatorio += `Compatibilidade Geral: ${this.porcentagemCompatibilidade}%\n\n`;
        // Seção de palavras-chave faltantes
        if (this.palavrasChaveFaltando.length > 0) {
            relatorio += 'Competências/Habilidades Faltantes:\n';
            this.palavrasChaveFaltando.forEach(palavra => {
                relatorio += `• ${palavra}\n`;
            });
            relatorio += '\n';
        }
        // Seção de sugestões
        if (this.sugestoesMelhoria.length > 0) {
            relatorio += 'Sugestões para Aumentar Compatibilidade:\n';
            this.sugestoesMelhoria.forEach(sugestao => {
                relatorio += `• ${sugestao}\n`;
            });
        }
        return relatorio;
    }
    // Retorna o status baseado na porcentagem de compatibilidade
    obterStatus() {
        if (this.porcentagemCompatibilidade >= 80) {
            return 'Alta Compatibilidade';
        }
        else if (this.porcentagemCompatibilidade >= 60) {
            return 'Média Compatibilidade';
        }
        else {
            return 'Baixa Compatibilidade';
        }
    }
    // Verifica se a candidatura tem alta chance de sucesso
    isAltaPrioridade() {
        return this.porcentagemCompatibilidade >= 80 && this.palavrasChaveFaltando.length <= 2;
    }
    // Retorna um resumo curto da análise
    obterResumo() {
        return `${this.obterStatus()} (${this.porcentagemCompatibilidade}%) - ${this.palavrasChaveFaltando.length} competências faltantes`;
    }
}
exports.ResultadoAnalise = ResultadoAnalise;
