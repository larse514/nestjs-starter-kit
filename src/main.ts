import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { LoggerProvider } from './logging/logger.provider';
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LoggerProvider)
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Starter Kit API')
    .setDescription('')
    .setVersion('1.0')  
    .addTag('startkit')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: '',
          tokenUrl: '',
          scopes: {
            'email': 'Email Scope', 'profile': "Profile Scope", 'openid': "OpenID Scope"
          },
        },
        // ... other flows if needed
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  if (process.env.GENERATE_SPEC) {
    fs.writeFileSync('./client/openapi/swagger.json', JSON.stringify(document))
    return
  }

  await app.listen(3000);
}
bootstrap();
