import { Router } from 'express';
import CaracteristicaVagaController from '../controllers/CaracteristicaVagaController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /api/caracteristicas-vaga:
 *   post:
 *     summary: Criar características da vaga
 *     description: Cria ou atualiza as características da vaga para o usuário autenticado
 *     tags:
 *       - Características da Vaga
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modeloTrabalho:
 *                 type: string
 *                 enum: [remoto, presencial, hibrido]
 *                 description: Modelo de trabalho desejado
 *               localizacao:
 *                 type: string
 *                 description: Localização desejada
 *               salarioDesejadoMin:
 *                 type: number
 *                 description: Salário mínimo desejado
 *               salarioDesejadoMax:
 *                 type: number
 *                 description: Salário máximo desejado
 *             required:
 *               - modeloTrabalho
 *               - localizacao
 *     responses:
 *       201:
 *         description: Características da vaga criadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaracteristicaVaga'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', CaracteristicaVagaController.criar);

/**
 * @swagger
 * /api/caracteristicas-vaga:
 *   get:
 *     summary: Buscar características da vaga do usuário
 *     description: Retorna as características da vaga do usuário autenticado
 *     tags:
 *       - Características da Vaga
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Características da vaga encontradas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaracteristicaVaga'
 *       404:
 *         description: Características da vaga não encontradas
 *       401:
 *         description: Não autorizado
 */
router.get('/', CaracteristicaVagaController.buscarDoUsuario);

/**
 * @swagger
 * /api/caracteristicas-vaga:
 *   put:
 *     summary: Atualizar características da vaga
 *     description: Atualiza as características da vaga do usuário autenticado
 *     tags:
 *       - Características da Vaga
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modeloTrabalho:
 *                 type: string
 *                 enum: [remoto, presencial, hibrido]
 *                 description: Modelo de trabalho desejado
 *               localizacao:
 *                 type: string
 *                 description: Localização desejada
 *               salarioDesejadoMin:
 *                 type: number
 *                 description: Salário mínimo desejado
 *               salarioDesejadoMax:
 *                 type: number
 *                 description: Salário máximo desejado
 *     responses:
 *       200:
 *         description: Características da vaga atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaracteristicaVaga'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Características da vaga não encontradas
 *       401:
 *         description: Não autorizado
 */
router.put('/', CaracteristicaVagaController.atualizar);

/**
 * @swagger
 * /api/caracteristicas-vaga:
 *   delete:
 *     summary: Deletar características da vaga
 *     description: Remove as características da vaga do usuário autenticado
 *     tags:
 *       - Características da Vaga
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Características da vaga deletadas com sucesso
 *       404:
 *         description: Características da vaga não encontradas
 *       401:
 *         description: Não autorizado
 */
router.delete('/', CaracteristicaVagaController.deletar);

export default router; 