import { Request } from 'express';

interface UserPayload {
  id: string;
  email: string;
  nome: string;
}

export interface CustomRequest extends Request {
  user?: UserPayload;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
} 