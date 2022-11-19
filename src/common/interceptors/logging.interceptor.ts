import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        Logger.debug(`${context.getClass().name}.${context.getHandler().name}()`, 'LoggingInterceptor');
        return next.handle();
    }
}
