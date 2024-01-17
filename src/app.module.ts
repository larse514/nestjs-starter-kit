import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { TracingMiddleware } from './logging/tracing.middleware';
import { LoggerModule } from './logging/logger.module';

@Module({
  imports: [
    OrganizationModule,
    LoggerModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        LOG_LEVEL: Joi.string().default('info'),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TracingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
