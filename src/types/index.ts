import { Request, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedResponse<T> extends Response {
  json: (body: T) => this
}

export interface CaracteristicaVagaDTO {
  usuarioId: string;
  modeloTrabalho: string;
  localizacao: string;
  salarioDesejadoMin: number;
  salarioDesejadoMax: number;
}

export interface UsuarioDTO {
  id: string;
  nome: string;
  email: string;
  senha: string;
  criadoEm: Date;
  caracteristicaVaga?: CaracteristicaVagaDTO;
}

export interface CurriculoDTO {
  id: string;
  usuarioId: string;
  conteudo: string;
  habilidades: string[];
  softSkills: string[];
  criadoEm: Date;
}

export interface VagaDTO {
  id: string;
  titulo: string;
  descricao: string;
  empresa: string;
  modeloTrabalho: string;
  localizacao: string;
  salario: number;
  requisitosHardSkills: string[];
  requisitosSoftSkills: string[];
}

export interface CandidaturaDTO {
  id: string;
  usuarioId: string;
  curriculoId: string;
  vagaId: string;
  dataCandidatura: Date;
  status: string;
  resultadoAnaliseId?: string;
}

export interface ResultadoAnaliseDTO {
  id: string;
  curriculoId: string;
  vagaId: string;
  porcentagemCompatibilidade: number;
  palavrasChaveFaltando: string[];
  sugestoesMelhoria: string[];
  data: Date;
} 