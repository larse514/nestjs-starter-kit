import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { LoggerProvider } from './logging/logger.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LoggerProvider)
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Starter Kit API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('startkit')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
