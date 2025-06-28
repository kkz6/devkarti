import { Injectable } from '@nestjs/common';

@Injectable()
export class InertiaService {
  render(component: string, props: any = {}) {
    return {
      component,
      props,
      url: '',
      version: '',
    };
  }
} 