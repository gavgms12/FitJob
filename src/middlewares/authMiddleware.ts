import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomRequest } from '../types/express';

interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fitjob-default-secret');
    const { userId, email } = decoded as TokenPayload;

    req.user = {
      id: userId,
      email
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
} 