import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { GraphqlLogger } from "./common/graphql/graphql.logger";

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new GraphqlLogger());
  await app.listen(3001);
}
bootstrap();
