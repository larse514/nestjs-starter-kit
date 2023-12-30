import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import * as Joi from 'joi';

@Module({
  imports: [OrganizationModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .default('development'),
      HELLO_VARIABLE: Joi.string()
        .required(),
    }),
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
