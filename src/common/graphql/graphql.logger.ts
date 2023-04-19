import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { catchError, Observable, tap } from 'rxjs';

export class GraphqlLogger implements NestInterceptor {

  private readonly logger = new Logger(GraphqlLogger.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {

    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    const requestArgs = ctx.req.body.query.replace(/\n/g, '').replace(/\s+/g, ' ');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(json => {
          this.logger.log(`RequestArgs: ${requestArgs} After: ${Date.now() - now}ms`);
          this.logger.log(`Response: ${JSON.stringify(json).substring(0, 150)}...`);
        }),
        catchError(err => {
          this.logger.error(`RequestArgs: ${requestArgs.substring(0, 150)}... After: ${Date.now() - now}ms`);
          this.logger.error(`ErrorMessage: ${err.message}...`);
          throw err;
        }),
      );
  }

}
