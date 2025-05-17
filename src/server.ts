import express from 'express';
import type { Request as ExpressRequest, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import usuarioRoutes from './routes/usuarioRoutes';
import curriculoRoutes from './routes/curriculoRoutes';
import vagaRoutes from './routes/vagaRoutes';
import candidaturaRoutes from './routes/candidaturaRoutes';
import analiseRoutes from './routes/analiseRoutes';
import authRoutes from './routes/authRoutes';
import caracteristicaVagaRoutes from './routes/caracteristicaVagaRoutes';
// Configuração das variáveis de ambiente
dotenv.config();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FitJob API',
      version: '1.0.0',
      description: 'API para o sistema FitJob de gerenciamento de currículos e vagas',
    },
    servers: [
      {
        url: '',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário',
            },
            nome: {
              type: 'string',
              description: 'Nome completo do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário (único)',
            },
            senha: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário (hash)',
            },
            criadoEm: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do usuário',
            },
            caracteristicaVaga: {
              type: 'object',
              properties: {
                modeloTrabalho: {
                  type: 'string',
                  description: 'Modelo de trabalho preferido (remoto, presencial, híbrido)',
                },
                localizacao: {
                  type: 'string',
                  description: 'Localização desejada',
                },
                salarioDesejadoMin: {
                  type: 'number',
                  description: 'Salário mínimo desejado',
                },
                salarioDesejadoMax: {
                  type: 'number',
                  description: 'Salário máximo desejado',
                },
              },
            },
          },
          required: ['nome', 'email', 'senha'],
        },
        Curriculo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do currículo',
            },
            usuarioId: {
              type: 'string',
              format: 'uuid',
              description: 'ID do usuário dono do currículo',
            },
            conteudo: {
              type: 'string',
              description: 'Conteúdo do currículo',
            },
            habilidades: {
              type: 'string',
              description: 'Lista de habilidades técnicas em formato JSON',
            },
            softSkills: {
              type: 'string',
              description: 'Lista de soft skills em formato JSON',
            },
            criadoEm: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do currículo',
            },
          },
          required: ['usuarioId', 'conteudo', 'habilidades', 'softSkills'],
        },
        CaracteristicaVaga: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da característica da vaga'
            },
            modeloTrabalho: {
              type: 'string',
              enum: ['remoto', 'presencial', 'hibrido'],
              description: 'Modelo de trabalho (remoto, presencial, híbrido)'
            },
            localizacao: {
              type: 'string',
              description: 'Localização da vaga'
            },
            salarioDesejadoMin: {
              type: 'number',
              description: 'Salário mínimo oferecido'
            },
            salarioDesejadoMax: {
              type: 'number',
              description: 'Salário máximo oferecido'
            },
            usuarioId: {
              type: 'string',
              format: 'uuid',
              description: 'ID do usuário associado a esta característica'
            },
            criadoEm: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da característica'
            }
          },
          required: ['modeloTrabalho', 'localizacao', 'usuarioId']
        },
        Vaga: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da vaga',
            },
            titulo: {
              type: 'string',
              description: 'Título da vaga',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da vaga',
            },
            empresa: {
              type: 'string',
              description: 'Nome da empresa',
            },
            modeloTrabalho: {
              type: 'string',
              enum: ['remoto', 'presencial', 'hibrido'],
              description: 'Modelo de trabalho da vaga',
            },
            localizacao: {
              type: 'string',
              description: 'Localização da vaga',
            },
            salario: {
              type: 'number',
              description: 'Salário oferecido',
            },
            requisitosHardSkills: {
              type: 'string',
              description: 'Lista de habilidades técnicas requeridas em formato JSON',
            },
            requisitosSoftSkills: {
              type: 'string',
              description: 'Lista de soft skills requeridas em formato JSON',
            },
            criadoEm: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da vaga',
            },
          },
          required: ['titulo', 'descricao', 'empresa', 'modeloTrabalho', 'localizacao', 'salario'],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './routes/*.ts'], // Arquivos que contêm as anotações do Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Inicialização do Express e Prisma
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Log de requisições
app.use((req: ExpressRequest, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/curriculos', curriculoRoutes);
app.use('/api/vagas', vagaRoutes);
app.use('/api/candidaturas', candidaturaRoutes);
app.use('/api/analises', analiseRoutes);
app.use('/api/caracteristicas-vaga', caracteristicaVagaRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req: ExpressRequest, res: Response) => {
  res.json({ message: 'Bem-vindo à API do FitJob!' });
});

// Middleware de tratamento de erros
app.use((err: Error, req: ExpressRequest, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Middleware para rotas não encontradas
app.use((req: ExpressRequest, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3500 ;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
}); 