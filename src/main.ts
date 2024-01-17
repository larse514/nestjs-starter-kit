import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerProvider } from './logging/logger.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LoggerProvider)
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
