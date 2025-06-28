import { Module, Global } from '@nestjs/common';
import { InertiaInterceptor } from './inertia.interceptor';
import { InertiaService } from './inertia.service';
import { InertiaAdapter } from './inertia.adapter';

@Global()
@Module({
  providers: [InertiaService, InertiaInterceptor, InertiaAdapter],
  exports: [InertiaService, InertiaInterceptor, InertiaAdapter],
})
export class InertiaModule {} 