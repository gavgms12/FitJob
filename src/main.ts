import { Curriculo } from './models/Curriculo';
import { Vaga } from './models/Vaga';
import { HardSkills } from './models/enums/HardSkills';
import { SoftSkills } from './models/enums/SoftSkills';
import { analisarCompatibilidade } from './models/services/AnaliseServico';

async function testarAnalise() {
  // Criar currículo de teste
  const curriculo = new Curriculo(
    '001',
    'user123',
    `EXPERIÊNCIA PROFISSIONAL

    Desenvolvedor Full Stack Senior - TechCorp | 2020-2023
    - Desenvolvimento de aplicações web usando Node.js

    Desenvolvedor Full Stack - DevInc | 2018-2020
    - Desenvolvimento full stack com Node.js
    - Implementação de testes automatizados
    
    FORMAÇÃO
    Bacharel em Ciência da Computação - UNIFEI | 2018
    
    CERTIFICAÇÕES
    - AWS Certified Developer Associate
    - Docker Certified Associate
    - Scrum Master Certified`,
    [
      'TypeScript',
    ],
    [
      SoftSkills.COMUNICACAO,
    ],
    new Date()
  );

  // Criar vaga de teste
  const vaga = new Vaga(
    '002',
    'Desenvolvedor Full Stack Senior',
    `Procuramos um Desenvolvedor Full Stack Senior apaixonado por tecnologia e inovação.

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
    - Boa comunicação e trabalho em equipe

    Desejável:
    - Conhecimento em MongoDB
    - Experiência com CI/CD
    - Certificações AWS/Docker`,
    'TechCorp Brasil',
    'Híbrido',
    'São Paulo, SP',
    15000,
    [
      HardSkills.TYPESCRIPT,
      HardSkills.REACT,
      HardSkills.NODE_JS,
      HardSkills.POSTGRESQL,
      HardSkills.AWS,
      HardSkills.DOCKER
    ],
    [
      SoftSkills.COMUNICACAO,
      SoftSkills.TRABALHO_EQUIPE,
      SoftSkills.LIDERANCA,
      SoftSkills.RESOLUCAO_PROBLEMAS,
      SoftSkills.PROATIVIDADE
    ]
  );

  try {
    console.log('Iniciando análise de compatibilidade...\n');
    
    // Realizar análise
    const resultado = await analisarCompatibilidade(curriculo, vaga);

    // Exibir resultado detalhado
    console.log('=== Detalhes da Análise ===');
    console.log('ID da Análise:', resultado.id);
    console.log('Data:', resultado.data.toLocaleDateString());
    console.log('Compatibilidade:', resultado.porcentagemCompatibilidade + '%');
    
    console.log('\nPalavras-chave Faltantes:');
    if (resultado.palavrasChaveFaltando.length > 0) {
      resultado.palavrasChaveFaltando.forEach(palavra => console.log(`- ${palavra}`));
    } else {
      console.log('Nenhuma palavra-chave faltante');
    }

    console.log('\nSugestões de Melhoria:');
    if (resultado.sugestoesMelhoria.length > 0) {
      resultado.sugestoesMelhoria.forEach(sugestao => console.log(`- ${sugestao}`));
    } else {
      console.log('Nenhuma sugestão de melhoria');
    }

    // Exibir relatório formatado
    console.log('\n=== Relatório Formatado ===');
    console.log(resultado.gerarRelatorio());

  } catch (erro) {
    console.error('Erro durante a análise:', erro);
  }
}

// Executar o teste
testarAnalise().catch(console.error); 