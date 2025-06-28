import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InertiaService } from './inertia.service';

@Injectable()
export class InertiaMiddleware implements NestMiddleware {
  constructor(private readonly inertiaService: InertiaService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Add Inertia headers
    res.setHeader('Vary', 'X-Inertia');

    // Handle Inertia version check
    if (
      req.method === 'GET' &&
      req.header('X-Inertia') === 'true' &&
      req.header('X-Inertia-Version') !== this.inertiaService.getVersion()
    ) {
      res.setHeader('X-Inertia-Location', this.inertiaService.getUrl(req));
      return res.status(409).end();
    }

    // Handle redirect status codes for Inertia
    const originalRedirect = res.redirect.bind(res);
    (res as any).redirect = function(...args: any[]): Response {
      if (req.header('X-Inertia')) {
        let redirectUrl: string;
        let status: number = 302;

        if (args.length === 1 && typeof args[0] === 'string') {
          redirectUrl = args[0];
        } else if (args.length === 2) {
          if (typeof args[0] === 'number') {
            status = args[0];
            redirectUrl = args[1];
          } else {
            redirectUrl = args[0];
            status = args[1];
          }
        } else {
          return originalRedirect.apply(res, args);
        }
        
        if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
          res.setHeader('X-Inertia-Location', redirectUrl);
          return res.status(303).end();
        }
      }
      
      return originalRedirect.apply(res, args);
    };

    next();
  }
} 