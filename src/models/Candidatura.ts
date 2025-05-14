import { ResultadoAnalise } from './ResultadoAnalise';

export class Candidatura {
  constructor(
    public id: string,
    public usuarioId: string,
    public curriculoId: string,
    public vagaId: string,
    public dataCandidatura: Date,
    public status: string,
    public resultadoAnalise?: ResultadoAnalise
  ) {}
} 