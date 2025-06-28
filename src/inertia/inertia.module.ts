import { Module, Global } from '@nestjs/common';
import { InertiaService } from './inertia.service';

@Global()
@Module({
  providers: [InertiaService],
  exports: [InertiaService],
})
export class InertiaModule {} 