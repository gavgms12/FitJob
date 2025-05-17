import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Criar novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               caracteristicaVaga:
 *                 $ref: '#/components/schemas/Usuario/properties/caracteristicaVaga'
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', UsuarioController.criar);

// Rotas protegidas
router.use(authMiddleware);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuários
 *     description: Lista todos os usuários cadastrados
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', UsuarioController.listar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna os dados de um usuário específico
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', UsuarioController.buscarPorId);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário específico
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               caracteristicaVaga:
 *                 $ref: '#/components/schemas/Usuario/properties/caracteristicaVaga'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', UsuarioController.atualizar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     description: Remove um usuário do sistema
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', UsuarioController.deletar);

export default router; 