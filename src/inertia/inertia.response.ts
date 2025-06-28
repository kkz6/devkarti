import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InertiaService, InertiaPage } from './inertia.service';

@Injectable()
export class InertiaResponse {
  constructor(
    private readonly inertiaService: InertiaService,
    private readonly response: Response,
    private readonly page: InertiaPage,
  ) {}

  toResponse(): void {
    if (this.response.req.header('X-Inertia')) {
      this.response.setHeader('X-Inertia', 'true');
      this.response.json(this.page);
    } else {
      this.response.render(this.inertiaService.getRootView(), {
        page: this.page,
      });
    }
  }
} 