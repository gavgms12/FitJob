import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Rotas públicas
router.post('/', UsuarioController.criar);

// Rotas protegidas
router.use(authMiddleware);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router; 