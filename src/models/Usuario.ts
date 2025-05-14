export class Usuario {
  constructor(
    public id: string,
    public nome: string,
    public email: string,
    public senha: string,
    public criadoEm: Date
  ) {}

  temCurriculo(curriculos: any[]): boolean {
    return curriculos.some(curriculo => curriculo.usuarioId === this.id);
  }

  temCaracteristicasVaga(caracteristicas: any[]): boolean {
    return caracteristicas.some(
      caracteristica => caracteristica.usuarioId === this.id
    );
  }

  static validarNome(nome: string): boolean {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
    return regex.test(nome);
  }

  static validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validarSenha(senha: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  }

  alterarSenha(novaSenha: string): void {
    this.senha = novaSenha;
  }

  private obterDataCriacao(): Date {
    return new Date();
  }

  inicializarDataCriacao(): void {
    this.criadoEm = this.obterDataCriacao();
  }

  atualizarInformacoes(nome: string, email: string): void {
    this.nome = nome;
    this.email = email;
  }

  static fromDatabase(data: any): Usuario {
    return new Usuario(
      data.id,
      data.nome,
      data.email,
      data.senha,
      data.criadoEm
    );
  }
} 


 