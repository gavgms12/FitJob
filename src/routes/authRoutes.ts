import { Router } from 'express';
import { loginController, verificarToken } from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';
import UsuarioRepository from '../repositories/UsuarioRepository';

const router = Router();

// Rota de login
router.post('/login', loginController);

// Rota para verificar token
router.get('/verify', authMiddleware, verificarToken);

// Rota administrativa temporária para corrigir hashes
router.post('/admin/corrigir-senhas', async (req, res) => {
  try {
    await UsuarioRepository.corrigirHashSenhas();
    res.json({ message: 'Processo de correção de hashes concluído com sucesso' });
  } catch (error) {
    console.error('Erro ao executar correção de hashes:', error);
    res.status(500).json({ error: 'Erro ao corrigir hashes das senhas' });
  }
});

export default router; 