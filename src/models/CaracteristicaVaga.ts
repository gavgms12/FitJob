import { Vaga } from './Vaga';

export class CaracteristicaVaga {
  constructor(
    public usuarioID: string,
    public modeloTrabalho: string,
    public localizacao: string,
    public salarioDesejadoMin: number,
    public salarioDesejadoMax: number
  ) {}

  // Calcula a compatibilidade com uma vaga (retorna uma porcentagem)
  public calcularCompatibilidade(vaga: Vaga): number {
    let pontuacao = 0;
    const pesoTotal = 3; // Número de critérios avaliados

    // Verifica modelo de trabalho (peso 1)
    if (this.verificarModeloTrabalho(vaga.modeloTrabalho)) {
      pontuacao += 1;
    }

    // Verifica localização (peso 1)
    if (this.verificarLocalizacao(vaga.localizacao)) {
      pontuacao += 1;
    }

    // Verifica salário (peso 1)
    if (this.verificarSalario(vaga.salario)) {
      pontuacao += 1;
    }

    return (pontuacao / pesoTotal) * 100;
  }

  private verificarModeloTrabalho(modeloVaga: string): boolean {
    if (this.modeloTrabalho.toLowerCase() === 'híbrido') {
      return true; // Aceita qualquer modelo
    }
    if (this.modeloTrabalho.toLowerCase() === 'remoto') {
      return ['remoto', 'híbrido'].includes(modeloVaga.toLowerCase());
    }
    return this.modeloTrabalho.toLowerCase() === modeloVaga.toLowerCase();
  }

  private verificarLocalizacao(localizacaoVaga: string): boolean {
    if (!this.localizacao || this.localizacao.trim() === '') {
      return true;
    }
    return localizacaoVaga.toLowerCase().includes(this.localizacao.toLowerCase());
  }

  private verificarSalario(salarioVaga: number): boolean {
    return salarioVaga >= this.salarioDesejadoMin && salarioVaga <= this.salarioDesejadoMax;
  }

  // Gera um relatório detalhado da compatibilidade
  public gerarRelatorioCompatibilidade(vaga: Vaga): { 
    compatibilidadeGeral: number;
    detalhes: {
      modeloTrabalho: boolean;
      localizacao: boolean;
      salario: boolean;
    };
    observacoes: string[];
  } {
    const modeloCompativel = this.verificarModeloTrabalho(vaga.modeloTrabalho);
    const localizacaoCompativel = this.verificarLocalizacao(vaga.localizacao);
    const salarioCompativel = this.verificarSalario(vaga.salario);

    const observacoes: string[] = [];
    
    if (!modeloCompativel) {
      observacoes.push(`Modelo de trabalho desejado: ${this.modeloTrabalho}, Vaga: ${vaga.modeloTrabalho}`);
    }
    if (!localizacaoCompativel) {
      observacoes.push(`Localização desejada: ${this.localizacao}, Vaga: ${vaga.localizacao}`);
    }
    if (!salarioCompativel) {
      observacoes.push(`Faixa salarial desejada: R$${this.salarioDesejadoMin}-R$${this.salarioDesejadoMax}, Vaga: R$${vaga.salario}`);
    }

    return {
      compatibilidadeGeral: this.calcularCompatibilidade(vaga),
      detalhes: {
        modeloTrabalho: modeloCompativel,
        localizacao: localizacaoCompativel,
        salario: salarioCompativel
      },
      observacoes
    };
  }
} 
