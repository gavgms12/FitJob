import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      user?: {
        id: string;
        email: string;
      };
      body: any;
      params: ParamsDictionary;
      query: ParsedQs;
      path: string;
      method: string;
    }

    interface Response extends ExpressResponse {
      json: (body: any) => this;
      status: (code: number) => this;
    }
  }
} 