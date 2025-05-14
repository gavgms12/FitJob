"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaracteristicaVaga = void 0;
class CaracteristicaVaga {
    constructor(usuarioID, modeloTrabalho, localizacao, salarioDesejadoMin, salarioDesejadoMax) {
        this.usuarioID = usuarioID;
        this.modeloTrabalho = modeloTrabalho;
        this.localizacao = localizacao;
        this.salarioDesejadoMin = salarioDesejadoMin;
        this.salarioDesejadoMax = salarioDesejadoMax;
    }
    // Calcula a compatibilidade com uma vaga (retorna uma porcentagem)
    calcularCompatibilidade(vaga) {
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
    verificarModeloTrabalho(modeloVaga) {
        if (this.modeloTrabalho.toLowerCase() === 'híbrido') {
            return true; // Aceita qualquer modelo
        }
        if (this.modeloTrabalho.toLowerCase() === 'remoto') {
            return ['remoto', 'híbrido'].includes(modeloVaga.toLowerCase());
        }
        return this.modeloTrabalho.toLowerCase() === modeloVaga.toLowerCase();
    }
    verificarLocalizacao(localizacaoVaga) {
        if (!this.localizacao || this.localizacao.trim() === '') {
            return true;
        }
        return localizacaoVaga.toLowerCase().includes(this.localizacao.toLowerCase());
    }
    verificarSalario(salarioVaga) {
        return salarioVaga >= this.salarioDesejadoMin && salarioVaga <= this.salarioDesejadoMax;
    }
    // Gera um relatório detalhado da compatibilidade
    gerarRelatorioCompatibilidade(vaga) {
        const modeloCompativel = this.verificarModeloTrabalho(vaga.modeloTrabalho);
        const localizacaoCompativel = this.verificarLocalizacao(vaga.localizacao);
        const salarioCompativel = this.verificarSalario(vaga.salario);
        const observacoes = [];
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
exports.CaracteristicaVaga = CaracteristicaVaga;
