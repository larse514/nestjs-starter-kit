import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationController } from './organization/organization.controller';

@Module({
  imports: [],
  controllers: [AppController, OrganizationController],
  providers: [AppService],
})
export class AppModule {}
