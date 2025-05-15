import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Rota de login
router.post('/login', AuthController.login);

// Rota para verificar token
router.get('/verify', authMiddleware, AuthController.verificarToken);

export default router; 