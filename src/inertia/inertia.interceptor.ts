import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InertiaAdapter } from './inertia.adapter';

@Injectable()
export class InertiaInterceptor implements NestInterceptor {
  constructor(private readonly inertiaAdapter: InertiaAdapter) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        // If the response already has component and props, use it as is
        // Otherwise, wrap the data
        const page = data.component ? data : {
          component: 'DefaultComponent',
          props: data,
          url: request.url,
          version: '1.0',
        };

        // Use the Inertia adapter to render the response
        this.inertiaAdapter.render(request, response, page);
        
        // Return undefined to prevent NestJS from trying to render
        return;
      }),
    );
  }
} 