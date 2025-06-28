import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
  } from '@nestjs/common'
  import { Observable } from 'rxjs'
  import { map } from 'rxjs/operators'
  import { InertiaService } from './inertia.service'
  
  const REFLECTOR = 'Reflector'
  
  @Injectable()
  export class InertiaInterceptor implements NestInterceptor {
    constructor(
      @Inject(REFLECTOR) protected readonly reflector: any,
      private readonly inertiaService: InertiaService,
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp()
      const req = ctx.getRequest()
      const res = ctx.getResponse()
      const component = this.reflector.get('inertia', context.getHandler())
  
      if (!component) return next.handle()
  
      return next
        .handle()
        .pipe(
          map((props) => {
            // Merge shared data with component props
            const sharedData = this.inertiaService.getSharedDataForRequest(req)
            const mergedProps = { ...sharedData, ...props }
            
            return res.inertia.render(component, mergedProps, { return: true })
          })
        )
    }
  }