import { Router } from 'express';
import CurriculoController from '../controllers/CurriculoController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas de currículo requerem autenticação
router.use(authMiddleware);

// Rotas básicas CRUD
router.post('/', CurriculoController.criar);
router.get('/', CurriculoController.listarPorUsuario);
router.get('/:id', CurriculoController.buscarPorId);
router.put('/:id', CurriculoController.atualizar);
router.delete('/:id', CurriculoController.deletar);

// Rotas de busca específicas
router.get('/habilidade/:habilidade', CurriculoController.buscarPorHabilidade);
router.get('/softskill/:softSkill', CurriculoController.buscarPorSoftSkill);

export default router; 