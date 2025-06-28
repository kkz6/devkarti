import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { InertiaInterceptor } from './inertia.interceptor'
import { FlashInterceptor } from './flash.interceptor'
import { InertiaService } from './inertia.service'

@Module({
  providers: [
    InertiaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InertiaInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FlashInterceptor,
    },
  ],
  exports: [InertiaService],
})
export class InertiaModule {}