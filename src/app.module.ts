import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [OrganizationModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
