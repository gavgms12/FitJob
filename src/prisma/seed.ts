import { PrismaClient } from '@prisma/client';
import { HardSkills } from '../models/enums/HardSkills';
import { SoftSkills } from '../models/enums/SoftSkills';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@example.com',
      senha: 'senha123', // Em produção, usar hash
      criadoEm: new Date(),
      caracteristicaVaga: {
        create: {
          modeloTrabalho: 'Híbrido',
          localizacao: 'São Paulo, SP',
          salarioDesejadoMin: 8000,
          salarioDesejadoMax: 15000
        }
      }
    }
  });

  // Criar currículo
  const curriculo = await prisma.curriculo.create({
    data: {
      usuarioId: usuario.id,
      conteudo: `EXPERIÊNCIA PROFISSIONAL

      Desenvolvedor Full Stack Senior - TechCorp | 2020-2023
      - Desenvolvimento de aplicações web usando React, TypeScript e Node.js
      - Implementação de microsserviços e APIs RESTful
      - Utilização de Docker e AWS para deploy
      - Liderança de equipe de 5 desenvolvedores
      
      Desenvolvedor Full Stack - DevInc | 2018-2020
      - Desenvolvimento full stack com Node.js e React
      - Trabalho com PostgreSQL e MongoDB
      - Implementação de testes automatizados
      
      FORMAÇÃO
      Bacharel em Ciência da Computação - UNIFEI | 2018
      
      CERTIFICAÇÕES
      - AWS Certified Developer Associate
      - Docker Certified Associate
      - Scrum Master Certified`,
      habilidades: JSON.stringify([
        HardSkills.TYPESCRIPT,
        HardSkills.REACT,
        HardSkills.NODE_JS,
        HardSkills.POSTGRESQL,
        HardSkills.AWS,
        HardSkills.DOCKER
      ]),
      softSkills: JSON.stringify([
        SoftSkills.COMUNICACAO,
        SoftSkills.TRABALHO_EQUIPE,
        SoftSkills.LIDERANCA,
        SoftSkills.RESOLUCAO_PROBLEMAS
      ])
    }
  });

  // Criar vaga
  const vaga = await prisma.vaga.create({
    data: {
      titulo: 'Desenvolvedor Full Stack Senior',
      descricao: `Procuramos um Desenvolvedor Full Stack Senior apaixonado por tecnologia e inovação.

      Responsabilidades:
      - Desenvolver e manter aplicações web complexas
      - Liderar time de desenvolvimento
      - Implementar boas práticas de desenvolvimento
      - Participar de decisões arquiteturais

      Requisitos:
      - Sólida experiência com TypeScript, React e Node.js
      - Conhecimento em PostgreSQL e AWS
      - Experiência com Docker e práticas DevOps
      - Experiência com liderança de equipe
      - Boa comunicação e trabalho em equipe`,
      empresa: 'TechCorp Brasil',
      modeloTrabalho: 'Híbrido',
      localizacao: 'São Paulo, SP',
      salario: 15000,
      requisitosHardSkills: JSON.stringify([
        HardSkills.TYPESCRIPT,
        HardSkills.REACT,
        HardSkills.NODE_JS,
        HardSkills.POSTGRESQL,
        HardSkills.AWS,
        HardSkills.DOCKER
      ]),
      requisitosSoftSkills: JSON.stringify([
        SoftSkills.COMUNICACAO,
        SoftSkills.TRABALHO_EQUIPE,
        SoftSkills.LIDERANCA,
        SoftSkills.RESOLUCAO_PROBLEMAS
      ])
    }
  });

  // Criar resultado de análise
  const resultadoAnalise = await prisma.resultadoAnalise.create({
    data: {
      curriculoId: curriculo.id,
      vagaId: vaga.id,
      porcentagemCompatibilidade: 85,
      palavrasChaveFaltando: JSON.stringify(['MongoDB', 'CI/CD']),
      sugestoesMelhoria: JSON.stringify([
        'Adicionar experiência com MongoDB',
        'Incluir projetos com CI/CD',
        'Detalhar mais as experiências de liderança'
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