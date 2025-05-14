export class ResultadoAnalise {
  constructor(
    public id: string,
    public curriculoId: string,
    public vagaId: string,
    public porcentagemCompatibilidade: number,
    public palavrasChaveFaltando: string[],
    public sugestoesMelhoria: string[],
    public data: Date,
  ) {}

  // Retorna um relatório formatado da análise
  public gerarRelatorio(): string {
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
  public obterStatus(): string {
    if (this.porcentagemCompatibilidade >= 80) {
      return 'Alta Compatibilidade';
    } else if (this.porcentagemCompatibilidade >= 60) {
      return 'Média Compatibilidade';
    } else {
      return 'Baixa Compatibilidade';
    }
  }

  // Verifica se a candidatura tem alta chance de sucesso
  public isAltaPrioridade(): boolean {
    return this.porcentagemCompatibilidade >= 80 && this.palavrasChaveFaltando.length <= 2;
  }

  // Retorna um resumo curto da análise
  public obterResumo(): string {
    return `${this.obterStatus()} (${this.porcentagemCompatibilidade}%) - ${this.palavrasChaveFaltando.length} competências faltantes`;
  }
} 