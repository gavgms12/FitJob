import { PrismaClient } from '@prisma/client';
import { HardSkills } from '../models/enums/HardSkills';
import { SoftSkills } from '../models/enums/SoftSkills';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      senha: 'senha456', // Em produção, usar hash
      criadoEm: new Date(),
      caracteristicaVaga: {
        create: {
          modeloTrabalho: 'Remoto',
          localizacao: 'Belo Horizonte, MG',
          salarioDesejadoMin: 6000,
          salarioDesejadoMax: 12000
        }
      }
    }
  });

  // Criar currículo
  const curriculo = await prisma.curriculo.create({
    data: {
      usuarioId: usuario.id,
      conteudo: `EXPERIÊNCIA PROFISSIONAL

      UX/UI Designer Senior - DesignLab | 2021-2024
      - Design de interfaces para aplicativos móveis e web
      - Condução de pesquisas de usuário e testes de usabilidade
      - Criação de protótipos interativos usando Figma
      - Mentoria de designers júnior
      
      Product Designer - CreativeTech | 2019-2021
      - Design de produtos digitais
      - Colaboração com times de desenvolvimento
      - Implementação de design system
      
      FORMAÇÃO
      Bacharel em Design Digital - UFMG | 2019
      
      CERTIFICAÇÕES
      - Google UX Design Professional Certificate
      - Design Thinking Professional
      - Agile UX Practitioner`,
      habilidades: JSON.stringify([
        HardSkills.FIGMA,
        HardSkills.HTML,
        HardSkills.CSS,
        HardSkills.REACT,
        HardSkills.TYPESCRIPT,
        HardSkills.AGILE
      ]),
      softSkills: JSON.stringify([
        SoftSkills.CRIATIVIDADE,
        SoftSkills.COMUNICACAO,
        SoftSkills.EMPATIA,
        SoftSkills.PENSAMENTO_CRITICO
      ])
    }
  });

  // Criar vaga
  const vaga = await prisma.vaga.create({
    data: {
      titulo: 'UX/UI Designer Senior',
      descricao: `Estamos em busca de um(a) UX/UI Designer Senior para liderar projetos de design.

      Responsabilidades:
      - Criar interfaces intuitivas e atraentes
      - Conduzir pesquisas com usuários
      - Desenvolver e manter design system
      - Mentoria de designers júnior
      - Colaborar com times multidisciplinares

      Requisitos:
      - Experiência sólida com Figma e ferramentas de design
      - Conhecimento em metodologias ágeis
      - Portfolio comprovando experiência
      - Habilidade em conduzir workshops de design
      - Experiência com design responsivo`,
      empresa: 'DesignLab Brasil',
      modeloTrabalho: 'Remoto',
      localizacao: 'Belo Horizonte, MG',
      salario: 12000,
      requisitosHardSkills: JSON.stringify([
        HardSkills.FIGMA,
        HardSkills.HTML,
        HardSkills.CSS,
        HardSkills.REACT,
        HardSkills.TYPESCRIPT,
        HardSkills.AGILE
      ]),
      requisitosSoftSkills: JSON.stringify([
        SoftSkills.CRIATIVIDADE,
        SoftSkills.COMUNICACAO,
        SoftSkills.EMPATIA,
        SoftSkills.PENSAMENTO_CRITICO
      ])
    }
  });

  // Criar resultado de análise
  const resultadoAnalise = await prisma.resultadoAnalise.create({
    data: {
      curriculoId: curriculo.id,
      vagaId: vaga.id,
      porcentagemCompatibilidade: 90,
      palavrasChaveFaltando: JSON.stringify(['Sketch', 'Design Sprint']),
      sugestoesMelhoria: JSON.stringify([
        'Adicionar experiência com Sketch',
        'Incluir facilitação de Design Sprints',
        'Detalhar projetos de design system'
      ]),
      data: new Date()
    }
  });

  // Criar candidatura
  await prisma.candidatura.create({
    data: {
      usuarioId: usuario.id,
      curriculoId: curriculo.id,
      vagaId: vaga.id,
      dataCandidatura: new Date(),
      status: 'Em Análise',
      resultadoAnaliseId: resultadoAnalise.id
    }
  });

  console.log('Dados de teste inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 