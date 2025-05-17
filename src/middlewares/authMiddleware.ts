import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/express';

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'sua_chave_secreta';
    const decoded = jwt.verify(token, secret);
    
    if (typeof decoded === 'object') {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        nome: decoded.nome
      };
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export default authMiddleware; 