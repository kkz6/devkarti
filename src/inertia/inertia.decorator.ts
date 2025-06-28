import { Request, Response } from 'express';
import { InertiaService } from './inertia.service';
import { InertiaResponse } from './inertia.response';

export class InertiaHelper {
  constructor(
    private readonly inertiaService: InertiaService,
    private readonly request: Request,
    private readonly response: Response,
  ) {}

  render(component: string, props: Record<string, any> = {}): void {
    const page = this.inertiaService.buildPage(component, props, this.request);
    const inertiaResponse = new InertiaResponse(this.inertiaService, this.response, page);
    inertiaResponse.toResponse();
  }

  share(key: string, value: any): void;
  share(data: Record<string, any>): void;
  share(keyOrData: string | Record<string, any>, value?: any): void {
    this.inertiaService.share(keyOrData as any, value);
  }
} 