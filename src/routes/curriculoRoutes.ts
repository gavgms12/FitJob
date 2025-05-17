import { Router } from 'express';
import CurriculoController from '../controllers/CurriculoController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas de currículo requerem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /api/curriculos:
 *   post:
 *     summary: Criar novo currículo
 *     description: Cria um novo currículo para o usuário autenticado
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do currículo
 *               habilidades:
 *                 type: string
 *                 description: Lista de habilidades técnicas em formato JSON
 *               softSkills:
 *                 type: string
 *                 description: Lista de soft skills em formato JSON
 *             required:
 *               - conteudo
 *               - habilidades
 *               - softSkills
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', CurriculoController.criar);

/**
 * @swagger
 * /api/curriculos:
 *   get:
 *     summary: Listar currículos do usuário
 *     description: Lista todos os currículos do usuário autenticado
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de currículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curriculo'
 *       401:
 *         description: Não autorizado
 */
router.get('/', CurriculoController.listarPorUsuario);

/**
 * @swagger
 * /api/curriculos/{id}:
 *   get:
 *     summary: Buscar currículo por ID
 *     description: Retorna os dados de um currículo específico
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Currículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curriculo'
 *       404:
 *         description: Currículo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', CurriculoController.buscarPorId);

/**
 * @swagger
 * /api/curriculos/{id}:
 *   put:
 *     summary: Atualizar currículo
 *     description: Atualiza os dados de um currículo específico
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do currículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do currículo
 *               habilidades:
 *                 type: string
 *                 description: Lista de habilidades técnicas em formato JSON
 *               softSkills:
 *                 type: string
 *                 description: Lista de soft skills em formato JSON
 *     responses:
 *       200:
 *         description: Currículo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Currículo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', CurriculoController.atualizar);

/**
 * @swagger
 * /api/curriculos/{id}:
 *   delete:
 *     summary: Deletar currículo
 *     description: Remove um currículo do sistema
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do currículo
 *     responses:
 *       204:
 *         description: Currículo deletado com sucesso
 *       404:
 *         description: Currículo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', CurriculoController.deletar);

/**
 * @swagger
 * /api/curriculos/habilidade/{habilidade}:
 *   get:
 *     summary: Buscar currículos por habilidade
 *     description: Retorna todos os currículos que contêm uma determinada habilidade técnica
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: habilidade
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Habilidade técnica a ser buscada
 *     responses:
 *       200:
 *         description: Lista de currículos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curriculo'
 *       401:
 *         description: Não autorizado
 */
router.get('/habilidade/:habilidade', CurriculoController.buscarPorHabilidade);

/**
 * @swagger
 * /api/curriculos/softskill/{softSkill}:
 *   get:
 *     summary: Buscar currículos por soft skill
 *     description: Retorna todos os currículos que contêm uma determinada soft skill
 *     tags:
 *       - Currículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: softSkill
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Soft skill a ser buscada
 *     responses:
 *       200:
 *         description: Lista de currículos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curriculo'
 *       401:
 *         description: Não autorizado
 */
router.get('/softskill/:softSkill', CurriculoController.buscarPorSoftSkill);

export default router; 