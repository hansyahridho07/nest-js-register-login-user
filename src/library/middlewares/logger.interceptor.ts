import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { url, method } = req;
    const logger = new Logger('LoggerInterceptor');
    logger.log(`🔥 Request URL ${method} : ${url}`);

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          logger.log(
            `✅ DONE on ${Date.now() - now} ms Request URL ${method} : ${url}`,
          ),
        ),
      );
  }
}
